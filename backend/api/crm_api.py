from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from backend.core.crm import crm_client
from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.requests import Request

# Setup Rate Limiter specific for leads to prevent spam
limiter = Limiter(key_func=get_remote_address)

router = APIRouter(
    prefix="/api/leads",
    tags=["CRM & Leads"],
    responses={404: {"description": "Not found"}},
)

class LeadCreate(BaseModel):
    email: EmailStr
    company: str
    siret: Optional[str] = None
    source: str = "Demo Form"

@router.post("/")
@limiter.limit("5/hour") # Anti-Spam: Max 5 leads per IP per hour
async def create_new_lead(request: Request, lead: LeadCreate):
    """
    Public endpoint to capture leads from Landing Page.
    """
    try:
        # 1. Send to CRM (Adapter handles HubSpot/Brevo/Log)
        result = await crm_client.create_lead(
            email=lead.email, 
            first_name=lead.company, # Mapping Company as First Name for simplicity in early stage
            source=f"{lead.source} (Siret: {lead.siret})"
        )
        
        return {"status": "success", "crm_id": result.get("id", "queued")}
    except Exception as e:
        print(f"Lead Error: {e}")
        # Return success to frontend even if CRM fails, to not discourage user
        # But log it critically on backend
        return {"status": "queued_locally"}
