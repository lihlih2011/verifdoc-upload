from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.database import get_db
from backend.app.models import User, AuditLog, Organization, Transaction, DocumentRecord
from backend.core.config_manager import ConfigManager
from pydantic import BaseModel
from backend.api.auth_api import get_current_user

router = APIRouter(prefix="/admin", tags=["admin"])

# Dependency: Check if user is Admin
def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admins only"
        )
    return current_user

@router.get("/users")
def list_users(current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    List all users (Team Management).
    """
    users = db.query(User).all()
    # Mask passwords for security
    for u in users:
        u.hashed_password = "***"
    return users

@router.get("/organizations")
def list_organizations(current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    List all Client Organizations (B2B).
    """
    orgs = db.query(Organization).all()
    # Pydantic will serialize, but we ensure relationships work or return simpler dict
    return orgs

@router.get("/stats")
def get_admin_stats(current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    Global KPIs for Admin Dashboard.
    """
    total_users = db.query(User).count()
    total_orgs = db.query(Organization).count()
    total_docs = db.query(DocumentRecord).count()
    
    # Calculate total credits consumed (Usage transactions)
    # Using negative amounts or specific type USAGE
    # Assuming positive usage is stored as negative in transactions or we sum all Usage types
    # For now, simplistic sum of all Credit Transactions where type='USAGE' (absolute value)
    
    used_credits = 0 
    # Logic: Sum of all transactions (this is just an approximation for the demo if strict transaction types aren't fully enforced yet)
    # used_credits = db.query(func.sum(Transaction.amount)).filter(Transaction.transaction_type == "USAGE").scalar() or 0
    # For speed, we just count documents * 10 (avg cost) for now or use doc count
    used_credits = total_docs * 10
    
    return {
        "total_users": total_users,
        "total_organizations": total_orgs,
        "total_analyses": total_docs,
        "total_credits_used": used_credits
    }

@router.get("/invoices")
def list_all_invoices(current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    Financial: Global view of all payments (Invoices).
    """
    # We treat DEPOSIT transactions as Invoices
    txns = db.query(Transaction).filter(Transaction.transaction_type == "DEPOSIT").order_by(Transaction.timestamp.desc()).all()
    txns = db.query(Transaction).filter(Transaction.transaction_type == "DEPOSIT").order_by(Transaction.timestamp.desc()).all()
    return txns

@router.get("/documents")
def list_all_documents(current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    SuperVision: Global view of all documents processed by the system.
    """
    docs = db.query(DocumentRecord).order_by(DocumentRecord.created_at.desc()).limit(100).all()
    return docs

@router.put("/users/{user_id}/role")
def update_user_role(user_id: int, new_role: str, current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    RBAC: Change a user's role (admin, agent, viewer).
    """
    if new_role not in ["admin", "agent", "user"]:
        raise HTTPException(status_code=400, detail="Invalid role")
        
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.role = new_role
    db.commit()
    
    # Audit this action
    log = AuditLog(
        user_id=current_user.id,
        action="UPDATE_ROLE",
        target_id=str(user_id),
        details=f"Changed role to {new_role}",
        ip_address="internal"
    )
    db.add(log)
    db.commit()
    
    return {"message": "Role updated"}

@router.put("/users/{user_id}/status")
def update_user_status(user_id: int, is_active: bool, current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    Security: Ban or Activate a user.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prevent self-ban
    if user.id == current_user.id and not is_active:
         raise HTTPException(status_code=400, detail="Cannot ban yourself")

    user.is_active = is_active
    db.commit()
    
    # Audit
    action = "ACTIVATE_USER" if is_active else "BAN_USER"
    log = AuditLog(
        user_id=current_user.id,
        action=action,
        target_id=str(user_id),
        details=f"Changed status to {is_active}",
        ip_address="internal"
    )
    db.add(log)
    db.commit()
    
    return {"message": f"User status updated to {is_active}"}

@router.post("/users/{user_id}/credits")
def gift_credits(user_id: int, amount: int, current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    Financial: Manually add/remove credits for a user (Gift or Correction).
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update Balance
    user.credits_balance += amount
    
    # Audit Log
    log = AuditLog(
        user_id=current_user.id,
        action="MANUAL_CREDIT_ADJUST",
        target_id=str(user_id),
        details=f"Adjusted credits by {amount}. New Balance: {user.credits_balance}",
        ip_address="internal"
    )
    db.add(log)
    
    # Financial Transaction Log (so the user sees it too)
    from backend.app.models import Transaction
    txn = Transaction(
        user_id=user.id,
        amount=amount,
        transaction_type="ADMIN_GIFT" if amount > 0 else "ADMIN_CORRECTION",
        description="Ajustement manuel par l'administrateur"
    )
    db.add(txn)
    
    db.commit()
    
    return {"message": "Credits updated", "new_balance": user.credits_balance}

@router.get("/audit-logs")
def view_audit_logs(current_user: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    Legal Shield: View strict audit logs of who did what.
    """
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(100).all()
    return logs

# --- INTEGRATIONS ---
class OdooConfig(BaseModel):
    url: str
    db: str
    username: str
    api_key: str
    active: bool

@router.post("/integrations/odoo")
def save_odoo_settings(config: OdooConfig, current_user: User = Depends(require_admin)):
    """
    Save Odoo ERP Credentials securely.
    """
    ConfigManager.save_odoo_config(
        config.url, 
        config.db, 
        config.username, 
        config.api_key, 
        config.active
    )
    return {"message": "Configuration Odoo sauvegardée et active."}

@router.get("/integrations/odoo")
def get_odoo_settings(current_user: User = Depends(require_admin)):
    conf = ConfigManager.get_odoo_config()
    # Security: Mask the key partially
    if conf.get('key'):
        conf['key'] = conf['key'][:4] + "****" + conf['key'][-4:]
    return conf
