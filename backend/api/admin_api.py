from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
import psutil
import shutil
import os
from typing import List
from pydantic import BaseModel

from backend.app.database import get_db
from backend.app.models import User, DocumentRecord, Organization
from backend.api.auth_api import get_current_user
from backend.app.utils.email_service import email_service

router = APIRouter(prefix="/admin", tags=["admin"])

# --- Models ---
class SystemStats(BaseModel):
    cpu_usage: float
    ram_usage: float
    disk_total: int
    disk_used: int
    disk_free: int
    db_status: bool
    db_latency_ms: float

class EmailTestRequest(BaseModel):
    target_email: str

def check_admin(user: User = Depends(get_current_user)):
    if user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Accès réservé aux administrateurs (God Mode)")
    return user

@router.get("/health", response_model=SystemStats)
def get_system_health(user: User = Depends(check_admin), db: Session = Depends(get_db)):
    # 1. CPU & RAM
    cpu = psutil.cpu_percent(interval=None)
    ram = psutil.virtual_memory().percent
    
    # 2. Disk
    total, used, free = shutil.disk_usage("/")
    
    # 3. DB Check
    import time
    start = time.time()
    db_status = False
    try:
        db.execute(text("SELECT 1"))
        db_status = True
    except:
        pass
    latency = (time.time() - start) * 1000
    
    return SystemStats(
        cpu_usage=cpu,
        ram_usage=ram,
        disk_total=total,
        disk_used=used,
        disk_free=free,
        db_status=db_status,
        db_latency_ms=round(latency, 2)
    )

@router.post("/test-email")
def test_email_system(req: EmailTestRequest, user: User = Depends(check_admin)):
    """Force l'envoi d'un email de test pour vérifier SMTP"""
    success = email_service._send_email(
        req.target_email, 
        "TEST ADMIN VERIFDOC", 
        "Si vous recevez ceci, le système SMTP fonctionne parfaitement !",
        "<html><body><h1 style='color:green'>Succès !</h1><p>Le système mail est opérationnel.</p></body></html>"
    )
    if not success:
        raise HTTPException(status_code=500, detail="Échec de l'envoi SMTP (Vérifier logs serveur)")
    return {"message": "Email envoyé avec succès"}

@router.get("/recent-activity")
def get_recent_activity(db: Session = Depends(get_db), user: User = Depends(check_admin)):
    """Récupère les 10 dernières analyses et les 5 derniers inscrits"""
    last_scans = db.query(DocumentRecord).order_by(DocumentRecord.created_at.desc()).limit(10).all()
    # Limiter les champs retournés pour les users si nécessaire
    last_users = db.query(User).order_by(User.created_at.desc()).limit(5).all()
    
    return {
        "scans": last_scans,
        "users": last_users
    }

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db), user: User = Depends(check_admin)):
    """Retourne les stats globales pour le dashboard"""
    total_users = db.query(User).count()
    total_orgs = db.query(Organization).count()
    total_analyses = db.query(DocumentRecord).count()
    # TODO: Use proper credit transaction summation. Using analysis count as proxy for now.
    total_credits = total_analyses 
    
    return {
        "total_users": total_users,
        "total_organizations": total_orgs,
        "total_analyses": total_analyses,
        "total_credits_used": total_credits
    }

@router.get("/users")
def get_all_users(skip: int = 0, limit: int = 50, search: str = "", db: Session = Depends(get_db), user: User = Depends(check_admin)):
    """Liste tous les utilisateurs (God Mode)"""
    query = db.query(User)
    if search:
        query = query.filter(User.email.ilike(f"%{search}%"))
    
    total = query.count()
    users = query.order_by(User.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "users": users
    }

@router.post("/users/{user_id}/role")
def change_user_role(user_id: int, role: str, db: Session = Depends(get_db), admin: User = Depends(check_admin)):
    """Changer le rôle d'un user (ex: 'admin', 'user')"""
    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    target.role = role
    db.commit()
    return {"message": f"Rôle de {target.email} changé en {role}"}

@router.post("/users/{user_id}/credits")
def add_user_credits(user_id: int, amount: int, db: Session = Depends(get_db), admin: User = Depends(check_admin)):
    """Ajouter ou retirer des crédits"""
    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    target.credits_balance += amount
    db.commit()
    return {"message": "Solde mis à jour", "new_balance": target.credits_balance}

@router.put("/users/{user_id}/status")
def update_user_status(user_id: int, is_active: bool, db: Session = Depends(get_db), admin: User = Depends(check_admin)):
    """Activer ou désactiver un compte"""
    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    target.is_active = is_active
    db.commit()
    return {"message": f"Statut de {target.email} mis à jour"}

