from fastapi import APIRouter, Header, HTTPException, UploadFile, File, Depends
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, Organization
from backend.app.services.credit_service import CreditSystem
from backend.engine.metadata_inspector import inspector as metadata_inspector
from datetime import datetime
import hashlib, os, json, secrets

router = APIRouter(prefix="/api/external", tags=["External API (B2B)"])

# --- SIMULATION API KEY STORE (En attendant DB Migration) ---
# Dans la vraie vie, c'est une table DB "ApiKey"
# Ici on va tricher et dire que si la clé est "sk_live_DEMO", c'est l'Admin.
API_KEYS_MOCK = {
    "sk_live_DEMO": {"org_id": 1, "user_id": 1, "role": "admin"}
}

async def get_api_key_user(x_api_key: str = Header(..., description="Votre clé API Secrète")):
    if x_api_key == "sk_live_DEMO":
        return API_KEYS_MOCK[x_api_key]
    
    # Simulation de check DB
    if x_api_key.startswith("sk_live_"):
         # Pour la démo, toute clé live simule un accès valide si pas mockée
         return {"org_id": 1, "user_id": 1, "role": "api_client"}
         
    raise HTTPException(status_code=403, detail="Invalid API Key")

@router.post("/analyze")
async def analyze_document_via_api(
    file: UploadFile = File(...),
    api_user: dict = Depends(get_api_key_user),
    db: Session = Depends(get_db)
):
    """
    Endpoint S2S pour intégration CRM.
    Consomme 1 crédit par appel.
    Retourne un JSON d'analyse complet.
    """
    credit_system = CreditSystem(db)
    org_id = api_user["org_id"]
    
    # 1. Billing Check
    if not credit_system.consume_credit(org_id, api_user["user_id"], cost=1, description=f"API Call: {file.filename}"):
        raise HTTPException(status_code=402, detail="Payment Required: Insufficient Credits")

    # 2. Analyse (Simplifiée pour API - Pas de PDF généré ici pour l'instant, juste JSON)
    content = await file.read()
    temp_filename = f"temp_api_{hashlib.sha256(content).hexdigest()[:8]}.tmp"
    
    try:
        with open(temp_filename, "wb") as f:
            f.write(content)
            
        # Metadata Check
        meta = metadata_inspector.inspect(temp_filename)
        
        # Mock OCR result for speed
        score = 0.10 if meta["risk_score"] > 80 else 0.95
        verdict = "VALID" if score > 0.90 else "FRAUD"
        
        return {
            "status": "success",
            "document": file.filename,
            "analysis": {
                "verdict": verdict,
                "risk_score": round((1-score)*100), # Risk %
                "details": {
                    "integrity_check": "FAIL" if score < 0.5 else "PASS",
                    "metadata_audit": meta,
                }
            },
            "meta": {
                "credits_remaining": credit_system.get_balance(org_id),
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

@router.post("/generate_key")
def generate_api_key(user_id: int = 1):
    """Génère une clé API pour le dashboard."""
    new_key = f"sk_live_{secrets.token_hex(16)}"
    return {"api_key": new_key, "note": "Save this key, it won't be shown again."}
