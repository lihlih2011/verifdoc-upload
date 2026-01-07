from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, field_validator

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard Settings"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    return {
        "user_id": "user_42",
        "organization_id": "org_7",
        "subscription": "business",
        "sector": "finance",
    }

class UpdateProfile(BaseModel):
    email: EmailStr | None = None
    password: str | None = None

    @field_validator("password")
    @classmethod
    def pwd_strength(cls, v):
        if v and len(v) < 8:
            raise ValueError("Le mot de passe doit contenir au moins 8 caractères")
        return v

@router.put("/settings/profile")
async def update_profile(data: UpdateProfile, user: dict = Depends(get_current_user)):
    return {"msg": "Profil mis à jour", "user": user}
