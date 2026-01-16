from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.database import Base
import enum


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    job_title = Column(String, nullable=True) # Added for Onboarding
    phone = Column(String, nullable=True) # Added for Onboarding
    role = Column(String, default="user") # "user", "admin", "agent", "superadmin"
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    
    # Billing
    credits_balance = Column(Integer, default=10) # Freemium Start: 10 Credits
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    transactions = relationship("Transaction", back_populates="owner")
    org_link = relationship("OrganizationUser", back_populates="user", uselist=False)
    organization = relationship("Organization", back_populates="users")
    documents = relationship("DocumentRecord", back_populates="user")
    tickets = relationship("SupportTicket", back_populates="user")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Integer)  # +50 or -1
    transaction_type = Column(String)  # "DEPOSIT", "USAGE", "REFUND"
    description = Column(String, nullable=True)  # "Stripe Payment", "Document Analysis"
    timestamp = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="transactions")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String)  # "LOGIN", "ANALYSIS_VDS", "EXPORT_REPORT"
    target_id = Column(String, nullable=True)  # ID of document or entity affected
    details = Column(String, nullable=True)  # JSON or text details
    ip_address = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")

class SupportTicket(Base):
    __tablename__ = "support_tickets"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    subject = Column(String)
    message = Column(String)
    category = Column(String, default="technical") # technical, billing, other
    priority = Column(String, default="medium") # low, medium, high, urgent
    status = Column(String, default="OPEN")  # OPEN, IN_PROGRESS, CLOSED
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="tickets")
    organization = relationship("Organization", back_populates="tickets")

class ApiKey(Base):
    __tablename__ = "api_keys"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    key_hash = Column(String, unique=True, index=True)  # Stored hashed
    preview = Column(String)  # "sk_live_...1234"
    name = Column(String, nullable=True)  # "Dev Key"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# ---------- NEW MULTI‑TENANT MODELS ----------

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    
    # Extended Profile (Onboarding)
    sector = Column(String, nullable=True)
    size_range = Column(String, nullable=True) # 1-10, 11-50...
    website = Column(String, nullable=True)
    country = Column(String, default="France")
    phone = Column(String, nullable=True)
    
    credits_balance = Column(Integer, default=10) # 10 crédits offerts
    subscription_plan = Column(String, default="freemium") # freemium, pro, enterprise
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="organization")
    members = relationship("OrganizationUser", back_populates="organization")
    documents = relationship("DocumentRecord", back_populates="organization")
    
    # CRM Relationships (deferred import resolution via string)
    contacts = relationship("Contact", back_populates="organization")
    leads = relationship("Lead", back_populates="organization")
    deals = relationship("Deal", back_populates="organization")
    token_usages = relationship("TokenUsage", back_populates="organization")
    invoices = relationship("Invoice", back_populates="organization")
    tickets = relationship("SupportTicket", back_populates="organization")

class OrganizationUser(Base):
    __tablename__ = "organization_users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    role = Column(String, default="user")  # owner, admin, agent, viewer
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="org_link")
    organization = relationship("Organization", back_populates="members")

class PricingPlan(Base):
    __tablename__ = "pricing_plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    monthly_price = Column(Integer)  # in cents
    annual_price = Column(Integer)   # in cents
    credit_quota = Column(Integer)   # total credits per month

class CreditTransaction(Base):
    __tablename__ = "credit_transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    amount = Column(Integer)  # positive = credit, negative = debit
    transaction_type = Column(String)  # DEPOSIT, USAGE, REFUND
    description = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)


# ---------- CRM & CONTRACTS MODELS ----------
import enum

class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    WON = "won"
    LOST = "lost"

class DealStage(str, enum.Enum):
    DISCOVERY = "discovery"
    DEMO = "demo"
    CONTRACT_SENT = "contract_sent"
    SIGNED = "signed"

class Contact(Base):
    __tablename__ = "crm_contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String, nullable=True)
    position = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization", back_populates="contacts")
    leads = relationship("Lead", back_populates="contact")

class Lead(Base):
    __tablename__ = "crm_leads"
    
    id = Column(Integer, primary_key=True, index=True)
    contact_id = Column(Integer, ForeignKey("crm_contacts.id"))
    source = Column(String) 
    company_name = Column(String)
    status = Column(String, default=LeadStatus.NEW)
    score = Column(Integer, default=0)
    notes = Column(String, nullable=True) # Text -> String for sqlite compat simplicity or use Text
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)

    contact = relationship("Contact", back_populates="leads")
    deals = relationship("Deal", back_populates="lead")
    organization = relationship("Organization", back_populates="leads")

class Deal(Base):
    __tablename__ = "crm_deals"
    
    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("crm_leads.id"), nullable=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    name = Column(String)
    amount = Column(Float)
    stage = Column(String, default=DealStage.DISCOVERY)
    probability = Column(Integer, default=10)
    close_date = Column(DateTime, nullable=True)
    
    lead = relationship("Lead", back_populates="deals")
    organization = relationship("Organization", back_populates="deals")
    contract = relationship("Contract", uselist=False, back_populates="deal")

class Contract(Base):
    __tablename__ = "crm_contracts"
    
    id = Column(Integer, primary_key=True, index=True)
    deal_id = Column(Integer, ForeignKey("crm_deals.id"))
    title = Column(String)
    content_html = Column(String) # Text
    pdf_path = Column(String, nullable=True)
    
    is_signed = Column(Boolean, default=False)
    signed_at = Column(DateTime, nullable=True)
    signer_ip = Column(String, nullable=True)
    signature_data = Column(String, nullable=True) 
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    deal = relationship("Deal", back_populates="contract")

# Placeholder classes for relationships defined in Organization but not implemented yet
class TokenUsage(Base):
    __tablename__ = "token_usages"
    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    organization = relationship("Organization", back_populates="token_usages")

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    organization = relationship("Organization", back_populates="invoices")

# REMOVED DUPLICATE Ticket Class, merged into SupportTicket


class DocumentRecord(Base):
    __tablename__ = "document_records"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Ownership
    user_id = Column(Integer, ForeignKey("users.id"))
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    
    # Identification
    filename = Column(String)
    file_hash = Column(String, index=True) # SHA-256 for duplicate check
    
    # Result
    verdict = Column(String) # verdict_valid, verdict_reject
    confidence = Column(Float)
    message = Column(String, nullable=True)
    
    # Storage
    report_path = Column(String, nullable=True) # Path to PDF/JSON
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="documents")
    organization = relationship("Organization", back_populates="documents")


# ---------- MISSING SAAS MODELS FOR SUPER ADMIN ----------

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    plan_id = Column(Integer, ForeignKey("pricing_plans.id"))
    stripe_subscription_id = Column(String, nullable=True)
    status = Column(String, default="active")  # active, past_due, canceled
    current_period_end = Column(DateTime, nullable=True)
    
    organization = relationship("Organization")
    plan = relationship("PricingPlan")

class FeatureFlag(Base):
    __tablename__ = "feature_flags"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    is_enabled = Column(Boolean, default=False)
    description = Column(String, nullable=True)

class BlocklistEntry(Base):
    __tablename__ = "blocklist"
    id = Column(Integer, primary_key=True, index=True)
    ip_or_country = Column(String, index=True)
    reason = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User")

class ScheduledJob(Base):
    __tablename__ = "scheduled_jobs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    last_run = Column(DateTime, nullable=True)
    status = Column(String, default="idle") # idle, running, failed
    next_run = Column(DateTime, nullable=True)

class EmailTemplate(Base):
    __tablename__ = "email_templates"
    id = Column(Integer, primary_key=True, index=True) # e.g. 1 for "welcome"
    slug = Column(String, unique=True) # welcome_email, reset_password
    subject = Column(String)
    html_content = Column(String) # Text
    updated_at = Column(DateTime, default=datetime.utcnow)
