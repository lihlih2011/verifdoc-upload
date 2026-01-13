from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User
import json
import os
import unicodedata

router = APIRouter()

# --- MODELS ---
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str
    confidence: float

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
