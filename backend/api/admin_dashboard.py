from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.database import get_db
from backend.app.models import CreditTransaction, Organization, User
from backend.app.services.credit_service import CreditSystem
from typing import List
from pydantic import BaseModel
from datetime import datetime
import traceback

router = APIRouter(prefix="/api/admin", tags=["Super Admin"])

# --- SCHEMAS ---
class AdminStats(BaseModel):
    total_organizations: int
    total_analyses: int
    total_credits_used: int

class AddCreditRequest(BaseModel):
    organization_id: int
    amount: int
    description: str

class OrganizationSummary(BaseModel):
    id: int
    name: str
    user_count: int
    credit_balance: int
    created_at: datetime

# --- ENDPOINTS ---

@router.get("/stats", response_model=AdminStats)
def get_global_stats(db: Session = Depends(get_db)):
    """Aperçu global de l'activité pour le Super Admin."""
    try:
        # Nb Org
        org_count = db.query(Organization).count()
        
        # Nb Analyses (Transaction type Usage)
        analysis_count = db.query(CreditTransaction).filter(
            CreditTransaction.transaction_type == "usage"
        ).count()
        
        # Total Crédits Consommés (Somme absolue des usages)
        used_credits = db.query(func.sum(CreditTransaction.amount)).filter(
            CreditTransaction.transaction_type == "usage"
        ).scalar() or 0
        
        return AdminStats(
            total_organizations=org_count,
            total_analyses=analysis_count,
            total_credits_used=abs(used_credits)
        )
    except Exception as e:
        print(traceback.format_exc())
        return JSONResponse(status_code=500, content={"error": str(e), "trace": traceback.format_exc()})

@router.get("/organizations", response_model=List[OrganizationSummary])
def list_organizations(db: Session = Depends(get_db)):
    """Liste tous les clients avec leur solde."""
    orgs = db.query(Organization).all()
    credit_sys = CreditSystem(db)
    
    results = []
    for org in orgs:
        balance = credit_sys.get_balance(org.id)
        u_count = len(org.users)
        results.append(OrganizationSummary(
            id=org.id,
            name=org.name,
            user_count=u_count,
            credit_balance=balance,
            created_at=org.created_at
        ))
    return results

@router.post("/credits/add")
def manual_add_credit(payload: AddCreditRequest, db: Session = Depends(get_db)):
    """Le Boss ajoute des crédits manuellement."""
    credit_sys = CreditSystem(db)
    new_balance = credit_sys.add_credit(
        organization_id=payload.organization_id,
        amount=payload.amount,
        user_id=1, # Admin ID fixed for now
        description=f"ADMIN AJOUT: {payload.description}"
    )
    return {"status": "success", "new_balance": new_balance}
