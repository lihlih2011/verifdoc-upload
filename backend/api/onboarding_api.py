from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from backend.app.database import get_db
from backend.app.models import User, Organization
from backend.api.auth_api import get_current_user

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

class OnboardingRequest(BaseModel):
    # Company
    companyName: str
    employees: str
    sector: str
    country: str
    website: Optional[str] = None
    
    # Profile
    firstName: str
    lastName: str
    role: str # Job Title
    phone: Optional[str] = None
    
    # Needs
    monthlyVolume: str
    useCase: str
    integration: str

@router.post("/submit")
def submit_onboarding(data: OnboardingRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Finalise le profil utilisateur et crée/met à jour l'Organisation.
    """
    
    # 1. Update User Profile
    user.full_name = f"{data.firstName} {data.lastName}"
    user.job_title = data.role
    user.phone = data.phone
    
    # 2. Handle Organization
    # Si l'user a déjà une org (créée à l'inscription default), on la met à jour.
    # Sinon on en crée une.
    
    org = None
    if user.organization_id:
        org = db.query(Organization).filter(Organization.id == user.organization_id).first()
    
    if not org:
        # Create new org
        org = Organization(
            name=data.companyName,
            sector=data.sector,
            size_range=data.employees,
            website=data.website,
            country=data.country,
            subscription_plan="freemium" # Start Free
        )
        db.add(org)
        db.commit()
        db.refresh(org)
        
        # Link user
        user.organization_id = org.id
        # Add to OrganizationUser if logic exists there too
    else:
        # Update existing
        org.name = data.companyName
        org.sector = data.sector
        org.size_range = data.employees
        org.website = data.website
        org.country = data.country
    
    # 3. Save "Needs" (Optional: Could be stored in a 'Survey' table or generic JSON field in Org)
    # For now, we assume these fields influence the setup but aren't strictly stored in columns 
    # unless we add 'use_case' to Organization. 
    # Let's save them as a note or log if needed, or simply acknowledge them.
    # For MVP, updating the core Org info is sufficient.
    
    db.commit()
    
    return {
        "message": "Onboarding completed successfully",
        "organization_id": org.id,
        "user_id": user.id
    }
