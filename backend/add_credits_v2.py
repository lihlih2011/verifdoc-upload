from sqlalchemy.orm import Session
from backend.app.database import SessionLocal
from backend.app.models import Organization, User, CreditTransaction
from datetime import datetime

def add_credits_transaction():
    db = SessionLocal()
    try:
        # Trouver l'Orga VerifDoc Corp (Admin)
        org = db.query(Organization).filter(Organization.name == "VerifDoc Corp").first()
        user = db.query(User).filter(User.email == "admin@verifdoc.fr").first()
        
        if org and user:
            print(f"Trouvé: Organization ID {org.id}, User ID {user.id}")
            
            # Insérer une transaction de dépôt
            tx = CreditTransaction(
                organization_id=org.id,
                user_id=user.id,
                amount=1000,
                transaction_type="DEPOSIT",
                description="Initialisation Manuelle Admin",
                timestamp=datetime.utcnow()
            )
            db.add(tx)
            db.commit()
            print("✅ TRANSACTION +1000 CRÉDITS INSERÉE AVEC SUCCÈS.")
        else:
            print("❌ Admin ou Orga introuvable.")
            
    except Exception as e:
        print(f"❌ Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    add_credits_transaction()
