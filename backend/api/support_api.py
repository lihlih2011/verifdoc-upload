from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, SupportTicket
from backend.api.auth_api import get_current_user

router = APIRouter(prefix="/support", tags=["support"])

@router.post("/tickets")
def create_ticket(subject: str, message: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ticket = SupportTicket(
        user_id=current_user.id,
        subject=subject,
        message=message
    )
    db.add(ticket)
    db.commit()
    return {"message": "Ticket created", "ticket_id": ticket.id}

@router.get("/tickets")
def list_my_tickets(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(SupportTicket).filter(SupportTicket.user_id == current_user.id).all()
