from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import csv
import io
from backend.app.database import get_db
from backend.api.auth_api import check_admin

router = APIRouter(prefix="/admin/export", tags=["admin"])

@router.get("/users")
def export_users(db: Session = Depends(get_db), admin: Depends = Depends(check_admin)):
    def iter_csv():
        header = ["id", "email", "full_name", "role", "is_active", "credits_balance", "created_at"]
        yield ",".join(header) + "\n"
        for user in db.query(User).order_by(User.id).all():
            row = [
                str(user.id),
                user.email,
                user.full_name or "",
                user.role,
                str(user.is_active),
                str(user.credits_balance),
                user.created_at.isoformat() if hasattr(user.created_at, "isoformat") else str(user.created_at),
            ]
            yield ",".join(row) + "\n"
    return StreamingResponse(iter_csv(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=users.csv"})
