from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, Organization
from backend.api.auth_api import get_current_user
import stripe
import os

router = APIRouter()

# --- CONFIGURATION STRIPE ---
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "sk_test_PLACEHOLDER")
stripe.api_key = STRIPE_SECRET_KEY

# Dynamic Domain for Production vs Dev
DOMAIN = os.getenv("FRONTEND_URL", "https://verifdoc.io") if os.getenv("VERIFDOC_ENV") == "production" else "http://localhost:5173"

# --- PACKS DÉFINIS (Plan Tarifaire Actuel) ---
PACKS = {
    "pack_essential": {
        "name": "Plan Essentiel (Base)",
        "amount": 9900, # 99.00
        "currency": "eur",
        "credits": 200,
        "description": "Pour les besoins ponctuels."
    },
    "pack_compliance": {
        "name": "Plan Conformité (Populaire)",
        "amount": 29900, # 299.00
        "currency": "eur",
        "credits": 700, 
        "description": "Idéal pour les agences immobilières."
    },
    "pack_forensic": {
        "name": "Plan Service Judiciaire (V3)",
        "amount": 59900, # 599.00
        "currency": "eur",
        "credits": 2400,
        "description": "Pour un volume d'analyse élevé."
    }
}

@router.post("/create-checkout-session")
async def create_checkout_session(pack_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Crée une session de paiement Stripe pour l'achat de crédits.
    """
    if pack_id not in PACKS:
        raise HTTPException(status_code=400, detail="Pack invalide")
    
    selected_pack = PACKS[pack_id]
    
    try:
        # Création de la session Stripe
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': selected_pack['currency'],
                        'product_data': {
                            'name': selected_pack['name'],
                            'description': f"Ajoute {selected_pack['credits']} crédits à l'organisation {current_user.organization.name}",
                        },
                        'unit_amount': selected_pack['amount'],
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=DOMAIN + '/dashboard?payment=success&pack=' + pack_id,
            cancel_url=DOMAIN + '/dashboard?payment=cancel',
            # On passe l'ID de l'orga en métadonnée pour le webhook (plus tard)
            metadata={
                "organization_id": current_user.organization_id,
                "user_id": current_user.id,
                "pack_id": pack_id,
                "credits_amount": selected_pack['credits']
            }
        )
        return {"checkout_url": checkout_session.url}

    except Exception as e:
        # En mode DEV sans clé valide, on retourne une URL factice de succès direct pour tester
        if "Invalid API Key" in str(e) or "sk_test_PLACEHOLDER" in STRIPE_SECRET_KEY:
             print(f"⚠️ Simulation Stripe (Mode Dev): {e}")
             # Simulation : on crédite directement pour tester sans payer
             org = db.query(Organization).filter(Organization.id == current_user.organization_id).first()
             org.credits_balance += selected_pack['credits']
             db.commit()
             return {"checkout_url": f"{DOMAIN}/dashboard?payment=success_simulated&added={selected_pack['credits']}"}

        raise HTTPException(status_code=500, detail=str(e))
