'''SQLAlchemy models for the VerifDoc CRM module'''

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.database import Base

# ---------------------------------------------------------------------------
# 1️⃣  Account & Organization (multi‑tenant)
# ---------------------------------------------------------------------------
# Organization is defined in backend/app/models.py to avoid circular imports
# We use string-based relationship references where possible.


# ---------------------------------------------------------------------------
# 2️⃣  Contact (person within an organization)
# ---------------------------------------------------------------------------
class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    position = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    # Relations
    organization = relationship("Organization", back_populates="contacts")
    # Optional: link to tickets / activities later

# ---------------------------------------------------------------------------
# 3️⃣  Lead & Deal (pipeline)
# ---------------------------------------------------------------------------
class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=True)
    source = Column(String, nullable=True)  # e.g. "LandingPage", "Referral"
    status = Column(String, default="new")  # new, contacted, qualified, converted
    interest_score = Column(Float, default=0.0)  # computed from usage patterns
    created_at = Column(DateTime, default=datetime.utcnow)
    # Relations
    organization = relationship("Organization", back_populates="leads")
    contact = relationship("Contact")
    deal = relationship("Deal", uselist=False, back_populates="lead")

class Deal(Base):
    __tablename__ = "deals"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    name = Column(String, nullable=False)  # e.g. "Standard Plan"
    amount = Column(Float, nullable=False)
    currency = Column(String, default="EUR")
    status = Column(String, default="pending")  # pending, won, lost
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    # Relations
    organization = relationship("Organization", back_populates="deals")
    lead = relationship("Lead", back_populates="deal")

# ---------------------------------------------------------------------------
# 4️⃣  Email Sequences (marketing automation)
# ---------------------------------------------------------------------------
class EmailSequence(Base):
    __tablename__ = "email_sequences"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # e.g. "Welcome Series"
    steps = Column(JSON, nullable=False)  # [{"delay_days":0,"template_id":1}, ...]
    created_at = Column(DateTime, default=datetime.utcnow)

class SentEmailLog(Base):
    __tablename__ = "sent_email_logs"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=False)
    sequence_id = Column(Integer, ForeignKey("email_sequences.id"), nullable=False)
    step_index = Column(Integer, nullable=False)
    sent_at = Column(DateTime, default=datetime.utcnow)
    # Relations
    organization = relationship("Organization")
    contact = relationship("Contact")
    sequence = relationship("EmailSequence")

# ---------------------------------------------------------------------------
# 5️⃣  Token Usage & Billing
# ---------------------------------------------------------------------------
class TokenUsage(Base):
    __tablename__ = "token_usages"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    tokens = Column(Integer, nullable=False)
    period_start = Column(DateTime, nullable=False)
    period_end = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    organization = relationship("Organization", back_populates="token_usages")

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="EUR")
    status = Column(String, default="draft")  # draft, paid, overdue
    period_start = Column(DateTime, nullable=False)
    period_end = Column(DateTime, nullable=False)
    stripe_invoice_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    organization = relationship("Organization", back_populates="invoices")

# ---------------------------------------------------------------------------
# 6️⃣  Support & Knowledge Base
# ---------------------------------------------------------------------------
class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String, default="open")  # open, pending, solved, closed
    priority = Column(String, default="medium")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relations
    organization = relationship("Organization", back_populates="tickets")
    contact = relationship("Contact")
    # Optional: link to logs (see LogEntry model below)

class KnowledgeBaseArticle(Base):
    __tablename__ = "kb_articles"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    content = Column(Text, nullable=False)  # markdown or HTML stored as text
    tags = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# ---------------------------------------------------------------------------
# 7️⃣  Analytics & Prediction (auxiliary tables)
# ---------------------------------------------------------------------------
class ChurnPrediction(Base):
    __tablename__ = "churn_predictions"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    probability = Column(Float, nullable=False)  # 0‑1
    model_version = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    organization = relationship("Organization")

class RoiMetric(Base):
    __tablename__ = "roi_metrics"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    revenue = Column(Float, nullable=False)
    cost = Column(Float, nullable=False)  # e.g. Gemini token cost, infra cost
    period_start = Column(DateTime, nullable=False)
    period_end = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    organization = relationship("Organization")

# ---------------------------------------------------------------------------
# 8️⃣  Activity Log (audit trail for CRM actions)
# ---------------------------------------------------------------------------
class CrmActivityLog(Base):
    __tablename__ = "crm_activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String, nullable=False)  # e.g. "created_lead", "sent_email"
    details = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    organization = relationship("Organization")
    # User relationship defined in backend/app/models.py
