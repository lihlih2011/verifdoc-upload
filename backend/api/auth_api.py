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

from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

@router.post("/register")
def register(user: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # Check existing
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash Password
    hashed_pwd = SecurityUtils.get_password_hash(user.password)
    
    # Create User
    new_user = User(email=user.email, hashed_password=hashed_pwd, full_name=user.full_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Sync to External CRM (HubSpot/Brevo/Log)
    if background_tasks:
        background_tasks.add_task(
            crm_client.create_lead, 
            email=new_user.email, 
            first_name=new_user.full_name or "Utilisateur", 
            source="Signup Flow"
        )

    return {"message": "User created successfully", "user_id": new_user.id}

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
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
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
