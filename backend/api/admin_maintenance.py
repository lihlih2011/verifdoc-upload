from fastapi import APIRouter, Depends
from backend.api.auth_api import check_admin
from backend.app.models import User

router = APIRouter(prefix="/admin", tags=["admin"])

# Simple flag en mémoire – à persister dans DB ou fichier selon vos besoins
maintenance_enabled = False

@router.get("/maintenance")
def get_maintenance(admin: User = Depends(check_admin)):
    return {"enabled": maintenance_enabled}

@router.post("/maintenance")
def set_maintenance(payload: dict, admin: User = Depends(check_admin)):
    global maintenance_enabled
    maintenance_enabled = payload.get("enabled", False)
    return {"enabled": maintenance_enabled}
