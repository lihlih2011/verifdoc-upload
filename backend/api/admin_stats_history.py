from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.api.auth_api import check_admin
from backend.app.models import User

router = APIRouter(prefix="/admin/stats", tags=["admin"])

@router.get("/history")
def stats_history(db: Session = Depends(get_db), admin: User = Depends(check_admin)):
    """
    Retourne l’historique des statistiques pour les graphiques.
    Exemple de données mockées – à remplacer par de vraies agrégations.
    """
    data = [
        {"date": "2025-12-01", "total_users": 900, "total_analyses": 12000},
        {"date": "2025-12-15", "total_users": 1100, "total_analyses": 14000},
        {"date": "2026-01-01", "total_users": 1248, "total_analyses": 15420},
        {"date": "2026-01-15", "total_users": 1350, "total_analyses": 16500},
        {"date": "2026-02-01", "total_users": 1500, "total_analyses": 18000},
    ]
    return data
