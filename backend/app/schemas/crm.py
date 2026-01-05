"""Pydantic schemas for the VerifDoc CRM module"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

# ---------- Organization ----------
class OrganizationBase(BaseModel):
    name: str
    siret: Optional[str] = None
    sector: Optional[str] = None
    size: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationOut(OrganizationBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------- Contact ----------
class ContactBase(BaseModel):
    organization_id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    position: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactOut(ContactBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------- Lead ----------
class LeadBase(BaseModel):
    organization_id: int
    contact_id: Optional[int] = None
    source: Optional[str] = None
    status: Optional[str] = "new"
    interest_score: Optional[float] = 0.0

class LeadCreate(LeadBase):
    pass

class LeadOut(LeadBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------- Deal ----------
class DealBase(BaseModel):
    organization_id: int
    lead_id: int
    name: str
    amount: float
    currency: Optional[str] = "EUR"
    status: Optional[str] = "pending"
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class DealCreate(DealBase):
    pass

class DealOut(DealBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------- Ticket ----------
class TicketBase(BaseModel):
    organization_id: int
    contact_id: int
    subject: str
    description: str
    status: Optional[str] = "open"
    priority: Optional[str] = "medium"

class TicketCreate(TicketBase):
    pass

class TicketOut(TicketBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# ---------- Token Usage ----------
class TokenUsageBase(BaseModel):
    organization_id: int
    tokens: int
    period_start: datetime
    period_end: datetime

class TokenUsageOut(TokenUsageBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------- Email Sequence ----------
class EmailSequenceBase(BaseModel):
    organization_id: int
    name: str
    steps: List[Dict[str, Any]]  # e.g. [{"delay_days":0,"template_id":1}]

class EmailSequenceCreate(EmailSequenceBase):
    pass

class EmailSequenceOut(EmailSequenceBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

