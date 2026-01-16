import stripe
import os
from dotenv import load_dotenv

load_dotenv()

# Récupération des clés API depuis l'environnement
# Si aucune clé n'est fournie, on utilise des valeurs fictives pour ne pas faire planter le serveur au démarrage
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "sk_test_placeholder")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY", "pk_test_placeholder")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_placeholder")

stripe.api_key = STRIPE_SECRET_KEY

def create_checkout_session(price_id: str, success_url: str, cancel_url: str, customer_email: str = None):
    """
    Crée une session de paiement Stripe Checkout.
    Utilisable en mode test avec les cartes de test Stripe (ex: 4242 4242...).
    """
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price': price_id, # L'ID du prix défini dans le Dashboard Stripe (ex: price_12345)
                    'quantity': 1,
                },
            ],
            mode='subscription', # ou 'payment' pour un achat unique
            success_url=success_url,
            cancel_url=cancel_url,
            customer_email=customer_email,
        )
        return checkout_session.url
    except Exception as e:
        print(f"Erreur Stripe Create Session: {str(e)}")
        return None

def create_customer(email: str, name: str):
    """Crée un client dans Stripe (mode test pour l'instant)."""
    try:
        customer = stripe.Customer.create(
            email=email,
            name=name,
        )
        return customer.id
    except Exception as e:
        print(f"Erreur Stripe Create Customer: {str(e)}")
        return None

def verify_webhook(payload, sig_header):
    """Vérifie la signature du webhook pour sécuriser les retours Stripe."""
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
        return event
    except ValueError as e:
        # Invalid payload
        return None
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return None
