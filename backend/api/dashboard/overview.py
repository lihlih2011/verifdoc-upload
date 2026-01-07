# backend/api/dashboard/overview.py
"""Endpoint d'overview du tableau de bord.
Fournit des statistiques globales :
- nombre total d'analyses
- nombre d'utilisateurs actifs
- utilisation du quota Gemini (exemple)
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime
from pathlib import Path
import json

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard Overview"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# -----------------------------------------------------------------
# Fonction fictive d'obtention de l'utilisateur – à remplacer par votre logique JWT
# -----------------------------------------------------------------
def get_current_user(token: str = Depends(oauth2_scheme)):
    # Exemple de payload décodé – à adapter
    return {
        "user_id": "user_42",
        "organization_id": "org_7",
        "subscription": "business",
        "sector": "finance",
    }

@router.get("/overview")
async def get_overview(user: dict = Depends(get_current_user)):
    """Retourne un dictionnaire de statistiques agrégées.
    Les valeurs sont calculées à la volée ; dans un vrai projet on les mettrait en cache.
    """
    # Nombre total d'analyses (nombre de fichiers JSON dans results/…) :
    base = Path("results")
    total_analyses = sum(1 for _ in base.rglob("*.json"))

    # Utilisateurs actifs – on compte les dossiers utilisateurs distincts
    active_users = len({p.parts[4] for p in base.rglob("*.json") if len(p.parts) > 5})

    # Exemple de quota Gemini (valeur fixe) – à remplacer par un appel réel
    gemini_quota_used = 42.7  # pourcentage

    return {
        "total_analyses": total_analyses,
        "active_users": active_users,
        "gemini_quota_used": gemini_quota_used,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
