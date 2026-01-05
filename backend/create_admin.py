from sqlalchemy.orm import Session
from backend.app.database import SessionLocal, engine
from backend.app.models import Base, User, Organization
from backend.core.security_utils import SecurityUtils

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Création Organisation Default
    org = db.query(Organization).filter(Organization.name == "VerifDoc Corp").first()
    if not org:
        org = Organization(name="VerifDoc Corp", subscription_plan="enterprise", credits_balance=1000)
        db.add(org)
        db.commit()
        db.refresh(org)
        print("✅ Organisation créée.")

    # Création Admin User
    user = db.query(User).filter(User.email == "admin@verifdoc.fr").first()
    if not user:
        pwd = SecurityUtils.get_password_hash("admin123")
        user = User(
            email="admin@verifdoc.fr", 
            hashed_password=pwd, 
            full_name="Super Admin", 
            role="admin",
            organization_id=org.id
        )
        db.add(user)
        db.commit()
        print("✅ Utilisateur Admin créé: admin@verifdoc.fr / admin123")
    else:
        print("ℹ️ Utilisateur Admin existe déjà.")
        # Reset password au cas où
        user.hashed_password = SecurityUtils.get_password_hash("admin123")
        db.commit()
        print("✅ Mot de passe réinitialisé à 'admin123'.")

    # Création User Test
    client = db.query(User).filter(User.email == "client@test.com").first()
    if not client:
        pwd = SecurityUtils.get_password_hash("client123")
        client = User(
            email="client@test.com", 
            hashed_password=pwd, 
            full_name="Client Test", 
            role="client",
            organization_id=org.id
        )
        db.add(client)
        db.commit()
        print("✅ Utilisateur Client créé: client@test.com / client123")

if __name__ == "__main__":
    init_db()
