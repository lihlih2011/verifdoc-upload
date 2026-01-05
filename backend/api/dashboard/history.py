# backend/api/dashboard/history.py
"""Endpoint d'historique du tableau de bord.
Renvoie la liste paginée des rapports d'analyse d'un utilisateur.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer
from pathlib import Path
import json
from datetime import datetime
from typing import List

from backend.app.schemas.report import ReportMetadata

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard History"])

auth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user(token: str = Depends(auth2_scheme)):
    # TODO : remplacer par décodage JWT réel
    return {
        "user_id": "user_42",
        "organization_id": "org_7",
        "subscription": "business",
        "sector": "finance",
    }

@router.get("/history", response_model=List[ReportMetadata])
async def get_history(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    start: datetime | None = None,
    end: datetime | None = None,
    user: dict = Depends(get_current_user),
):
    """Renvoie les rapports paginés de l'utilisateur.
    Les fichiers sont recherchés dans le répertoire ``results``.
    """
    base = Path("results") / user["organization_id"] / user["subscription"] / user["sector"] / user["user_id"]
    if not base.is_dir():
        return []

    # Récupérer tous les JSON
    all_files = sorted(base.rglob("*.json"), key=lambda p: p.stat().st_mtime, reverse=True)

    # Filtrer par dates si fourni
    if start or end:
        filtered = []
        for f in all_files:
            ts_str = f.name.split("_")[0]
            ts = datetime.strptime(ts_str, "%Y%m%dT%H%M%SZ")
            if start and ts < start:
                continue
            if end and ts > end:
                continue
            filtered.append(f)
        all_files = filtered

    # Pagination
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    page_files = all_files[start_idx:end_idx]

    results: List[ReportMetadata] = []
    for f in page_files:
        data = json.loads(f.read_text(encoding="utf-8"))
        parts = f.relative_to("results").parts
        org, sub, sec, usr, doc, filename = parts
        ts, typ_ext = filename.split("_")
        typ, ext = typ_ext.rsplit(".", 1)
        results.append(
            ReportMetadata(
                organization_id=org,
                user_id=usr,
                document_id=doc,
                result_type=typ,
                subscription=sub,
                sector=sec,
                created_at=datetime.strptime(ts, "%Y%m%dT%H%M%SZ"),
                file_path=str(f),
                **data,
            )
        )
    return results
