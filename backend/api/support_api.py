from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, SupportTicket
from backend.api.auth_api import get_current_user
import json
import os
import unicodedata
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/support", tags=["support"])

# --- MODELS ---
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str
    confidence: float

class TicketCreate(BaseModel):
    subject: str
    message: str
    category: str = "technical"
    priority: str = "medium"

class TicketResponse(BaseModel):
    id: int
    subject: str
    message: str
    status: str
    category: str
    priority: str
    created_at: datetime
    user_email: str
    
    class Config:
        orm_mode = True

# --- LOGIC ---
KNOWLEDGE_BASE_PATH = "backend/data/faq_knowledge_base.json"

def load_knowledge_base():
    if not os.path.exists(KNOWLEDGE_BASE_PATH):
        return []
    with open(KNOWLEDGE_BASE_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def normalize_text(text: str) -> str:
    """Retire les accents et met en minuscule pour une meilleure recherche"""
    text = text.lower()
    text = ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')
    return text

@router.post("/ask", response_model=ChatResponse)
def ask_chatbot(request: ChatRequest):
    """
    Endpoint simple de Chatbot basé sur mots-clés.
    Retourne la meilleure réponse trouvée dans la Knowledge Base.
    """
    user_msg = normalize_text(request.message)
    knowledge_base = load_knowledge_base()
    
    best_response = None
    max_score = 0
    
    for item in knowledge_base:
        score = 0
        for keyword in item['keywords']:
            normalized_keyword = normalize_text(keyword)
            if normalized_keyword in user_msg:
                score += 1
        
        # Bonus pour les correspondances exactes/multiples
        if score > max_score:
            max_score = score
            best_response = item['answer']
            
    # Seuil de confiance (si 0 mot clé trouvé => fallback)
    if max_score > 0 and best_response:
        return {"answer": best_response, "confidence": 1.0}
    else:
        return {
            "answer": "Je ne suis pas sûr de comprendre votre demande. 🤔\nPouvez-vous reformuler ? Ou contactez notre équipe humaine à support@verifdoc.io.",
            "confidence": 0.0
        }

# --- TICKET SYSTEM ---

@router.post("/tickets", response_model=TicketResponse)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """User creates a new ticket"""
    new_ticket = SupportTicket(
        user_id=user.id,
        organization_id=user.organization_id,
        subject=ticket.subject,
        message=ticket.message,
        category=ticket.category,
        priority=ticket.priority,
        status="OPEN"
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    
    return {
        "id": new_ticket.id,
        "subject": new_ticket.subject,
        "message": new_ticket.message,
        "status": new_ticket.status,
        "category": new_ticket.category,
        "priority": new_ticket.priority,
        "created_at": new_ticket.created_at,
        "user_email": user.email
    }

@router.get("/tickets", response_model=List[TicketResponse])
def get_tickets(skip: int = 0, limit: int = 50, status: Optional[str] = None, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    User: sees his tickets.
    Admin: sees ALL tickets.
    """
    query = db.query(SupportTicket)
    
    if user.role not in ["admin", "superadmin"]:
        query = query.filter(SupportTicket.user_id == user.id)
    
    if status:
        query = query.filter(SupportTicket.status == status)
        
    tickets = query.order_by(SupportTicket.created_at.desc()).offset(skip).limit(limit).all()
    
    # Enrich response with user email manually since standard Pydantic might miss relationship lazy load if not joined
    results = []
    for t in tickets:
        # Fetch user email if admin
        email = t.user.email if t.user else "Unknown"
        results.append({
            "id": t.id,
            "subject": t.subject,
            "message": t.message,
            "status": t.status,
            "category": t.category,
            "priority": t.priority,
            "created_at": t.created_at,
            "user_email": email
        })
    return results

@router.patch("/tickets/{ticket_id}/status")
def update_ticket_status(ticket_id: int, status: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Admin only: Close or In-Progress a ticket"""
    if user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Admin only")
        
    ticket = db.query(SupportTicket).filter(SupportTicket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
        
    ticket.status = status
    db.commit()
    return {"message": "Status updated"}
