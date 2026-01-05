from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard Billing"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    return {
        "user_id": "user_42",
        "organization_id": "org_7",
        "subscription": "business",
        "sector": "finance",
    }

@router.get("/billing")
async def get_billing(user: dict = Depends(get_current_user)):
    return {
        "subscription": user["subscription"],
        "plan_name": {
            "free": "Free",
            "starter": "Starter",
            "business": "Business",
            "enterprise": "Enterprise",
        }[user["subscription"]],
        "credits_remaining": 1245,
        "next_renewal": (datetime.utcnow().replace(day=1) + 
                         timedelta(days=32)).replace(day=1).isoformat() + "Z",
        "billing_history": [
            {"date": "2025-10-01", "amount": "$0", "description": "Plan Free"},
            {"date": "2025-11-01", "amount": "$49", "description": "Plan Business"},
        ],
    }
