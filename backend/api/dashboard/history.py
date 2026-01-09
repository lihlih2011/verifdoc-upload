from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from backend.app.database import get_db
from backend.app.models import User, DocumentRecord
from backend.api.auth_api import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard History"])

@router.get("/history")
async def get_history(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Renvoie l'historique des documents analysés par l'utilisateur connecté via la Database.
    """
    query = db.query(DocumentRecord).filter(DocumentRecord.user_id == current_user.id)
    
    # Filtrage (Recherche par nom de fichier)
    if search:
        query = query.filter(DocumentRecord.filename.ilike(f"%{search}%"))
        
    # Tri par date décroissante
    query = query.order_by(DocumentRecord.created_at.desc())
    
    # Pagination
    total = query.count()
    offset = (page - 1) * page_size
    docs = query.offset(offset).limit(page_size).all()
    
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "data": [
            {
                "id": doc.id,
                "filename": doc.filename,
                "verdict": doc.verdict,
                "confidence": doc.confidence,
                "created_at": doc.created_at,
                "file_hash": doc.file_hash,
                "report_path": doc.report_path
            }
            for doc in docs
        ]
    }
