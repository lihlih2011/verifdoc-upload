from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Optional

from backend.app.database import get_db
from backend.app.models import User
from backend.core.security_utils import SecurityUtils
from backend.core.crm import crm_client

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

from typing import Optional
from backend.app.utils.email_service import email_service
import uuid
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class ForgotPasswordModel(BaseModel):
    email: str

@router.post("/register")
def register(user: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # 0. Check Email Professionnel (Blacklist)
    personal_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "orange.fr", "free.fr", "sfr.fr", "wanadoo.fr"]
    email_domain = user.email.split("@")[-1].lower()
    
    if email_domain in personal_domains:
        raise HTTPException(
            status_code=400, 
            detail="⚠️ Inscription réservée aux professionnels. Veuillez utiliser une adresse email professionnelle."
        )

    # Check existing
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash Password
    hashed_pwd = SecurityUtils.get_password_hash(user.password)
    
    # Create User with Verification Token
    token = str(uuid.uuid4())
    new_user = User(
        email=user.email, 
        hashed_password=hashed_pwd, 
        full_name=user.full_name,
        credits_balance=10, 
        organization_id=1,
        is_verified=False,
        verification_token=token
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send Verification Email
    background_tasks.add_task(email_service.send_verification_email, user.email, token)

    # 🚀 NEW: SALES AUTOMATION
    # 1. Send PERSUASIVE welcome email with demo offer
    background_tasks.add_task(email_service.send_welcome_sales_email, user.email, name=user.full_name or "Partenaire")
    
    # 2. Notify ADMIN (You) immediately so you can grab the lead
    background_tasks.add_task(email_service.notify_admin_new_lead, lead_email=user.email)

    # Sync to External CRM (HubSpot/Brevo/Log)
    if background_tasks:
        background_tasks.add_task(
            crm_client.create_lead, 
            email=new_user.email, 
            first_name=new_user.full_name or "Utilisateur", 
            source="Signup Flow"
        )

    return {"message": "Utilisateur créé. Veuillez vérifier votre email pour activer votre compte.", "user_id": new_user.id}

@router.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Lien de vérification invalide ou expiré.")
    
    user.is_verified = True
    user.verification_token = None # Clear token
    db.commit()
    
    return {"message": "Email vérifié avec succès ! Vous pouvez maintenant vous connecter."}

from datetime import datetime, timedelta

# Simple In-Memory Rate Limiter (Email -> List of timestamps)
RESET_LIMITS = {}

def check_rate_limit(email: str):
    """
    Bloque si > 3 tentatives en 30 minutes.
    """
    now = datetime.now()
    if email not in RESET_LIMITS:
        RESET_LIMITS[email] = []
    
    # 1. Nettoyer l'historique (> 30 mins)
    RESET_LIMITS[email] = [t for t in RESET_LIMITS[email] if t > now - timedelta(minutes=30)]
    
    # 2. Vérifier la limite (3 essais)
    if len(RESET_LIMITS[email]) >= 3:
        wait_time = "30 minutes"
        raise HTTPException(
            status_code=429, 
            detail=f"Sécurité : Trop de demandes. Veuillez attendre {wait_time} avant de réessayer."
        )
    
    # 3. Ajouter la tentative
    RESET_LIMITS[email].append(now)

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordModel, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Simule l'envoi d'un lien de réinitialisation si l'email existe.
    Protect: Rate Limit 3/30min.
    """
    # Check Rate Limit FIRST to prevent spam
    check_rate_limit(data.email)

    user = db.query(User).filter(User.email == data.email).first()
    if user:
        # Generate token (in real app, save to DB)
        reset_token = str(uuid.uuid4())
        background_tasks.add_task(email_service.send_password_reset_email, user.email, reset_token)
    
    return {"message": "Si cet email existe, un lien a été envoyé."}

@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"DEBUG: Login Attempt: {form_data.username}")
    try:
        user = db.query(User).filter(User.email == form_data.username).first()
        print(f"DEBUG: User Found: {user}")
    except Exception as e:
        print(f"DEBUG: DB Error during login: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
    if not user or not SecurityUtils.verify_password(form_data.password, user.hashed_password):
        print("DEBUG: Invalid Credentials")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiants incorrects.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Votre compte n'est pas encore vérifié. Veuillez cliquer sur le lien envoyé par email."
        )
    
    access_token_expires = timedelta(minutes=30)
    access_token = SecurityUtils.create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "credits": user.credits_balance,
        "role": user.role,
        "full_name": user.full_name
    }

# Dependency for other routes
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = SecurityUtils.decode_token(token)
    if not payload:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid Token")
        
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user

def check_admin(user: User = Depends(get_current_user)):
    if user.role not in ["admin", "superadmin"]:
         raise HTTPException(status_code=403, detail="Admin privileges required")
    return user
