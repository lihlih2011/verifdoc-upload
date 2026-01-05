from sqlalchemy.orm import Session
from backend.app.database import SessionLocal
from backend.app.models import Organization, User

def add_credits():
    db = SessionLocal()
    try:
        # Trouver l'Orga VerifDoc Corp (Admin)
        org = db.query(Organization).filter(Organization.name == "VerifDoc Corp").first()
        if org:
            org.credits_balance = 1000
            db.commit()
            print(f"✅ CRÉDITS AJOUTÉS : {org.name} a maintenant {org.credits_balance} crédits.")
        else:
            print("❌ Organisation introuvable.")

        # Au cas où le système regarde le User (normalement regarde l'Orga depuis la maj models)
        user = db.query(User).filter(User.email == "admin@verifdoc.fr").first()
        if user:
            user.credits_balance = 1000
            db.commit()
            print(f"✅ CRÉDITS USER AJOUTÉS : Admin a maintenant {user.credits_balance} crédits.")

    except Exception as e:
        print(f"❌ Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    add_credits()
