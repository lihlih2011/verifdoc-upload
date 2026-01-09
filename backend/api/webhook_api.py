from fastapi import APIRouter, Request, HTTPException, Header
from sqlalchemy.orm import Session
from backend.app.database import SessionLocal
from backend.app.models import User, Organization, Transaction
from backend.api.payment_api import STRIPE_SECRET_KEY, PACKS
import stripe
import os

router = APIRouter(
    prefix="/api/webhooks",
    tags=["Webhooks"],
    responses={404: {"description": "Not found"}},
)

stripe.api_key = STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")

@router.post("/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """
    Webhook Stripe pour gérer les événements de paiement (checkout.session.completed).
    Crédite automatiquement le compte de l'organisation.
    """
    payload = await request.body()
    event = None

    try:
        # Vérification de la signature (Sécurité indispensable)
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Payload invalide
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        # Signature invalide
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Gestion de l'événement
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        
        # Récupération des métadonnées injectées lors de la création de la session
        metadata = session.get('metadata', {})
        org_id = metadata.get('organization_id')
        user_id = metadata.get('user_id')
        credits_amount = int(metadata.get('credits_amount', 0))
        pack_id = metadata.get('pack_id')

        if org_id and credits_amount > 0:
            db: Session = SessionLocal()
            try:
                # 1. Mise à jour de l'organisation
                org = db.query(Organization).filter(Organization.id == org_id).first()
                if org:
                    org.credits_balance += credits_amount
                    print(f"✅ [PAIEMENT] Organisation {org.name} (+{credits_amount} crédits)")

                    # 2. Enregistrement de la transaction
                    new_tx = Transaction(
                        organization_id=org.id,
                        user_id=user_id,
                        amount=session.get('amount_total', 0) / 100.0, # Centimes -> Euros
                        currency=session.get('currency', 'eur'),
                        type="credit_purchase",
                        status="completed",
                        reference_id=session.get('id'), # Stripe Session ID
                        description=f"Achat {PACKS.get(pack_id, {}).get('name', 'Pack')}"
                    )
                    db.add(new_tx)
                    db.commit()
                else:
                    print(f"❌ [PAIEMENT] Organisation introuvable ID: {org_id}")
            except Exception as e:
                print(f"❌ [PAIEMENT] Erreur DB: {e}")
                db.rollback()
            finally:
                db.close()

    return {"status": "success"}
