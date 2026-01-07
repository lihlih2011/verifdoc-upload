from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import secrets
from backend.app.database import get_db
from backend.app.models import User, ApiKey
from backend.api.auth_api import get_current_user
from backend.core.security_utils import SecurityUtils

router = APIRouter(prefix="/developer", tags=["developer"])

@router.post("/api-keys")
def generate_api_key(name: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Generate a new sk_live_... key.
    We show it ONCE, then store only the hash.
    """
    # Generate random key
    raw_key = f"sk_live_{secrets.token_urlsafe(32)}"
    
    # Hash it for storage
    hashed_key = SecurityUtils.get_password_hash(raw_key)
    
    new_key = ApiKey(
        user_id=current_user.id,
        key_hash=hashed_key,
        preview=f"{raw_key[:10]}...{raw_key[-4:]}",
        name=name
    )
    db.add(new_key)
    db.commit()
    
    return {"api_key": raw_key, "message": "Save this key now! You won't see it again."}

@router.get("/api-keys")
def list_api_keys(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(ApiKey).filter(ApiKey.user_id == current_user.id).all()
