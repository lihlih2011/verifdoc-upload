from sqlalchemy.orm import Session
from backend.app.database import SessionLocal, Base, engine
from backend.app.models import User
from backend.core.security_utils import SecurityUtils

# Create tables if they don't exist (just in case)
Base.metadata.create_all(bind=engine)

def seed_users():
    db: Session = SessionLocal()
    try:
        # 1. Create ADMIN
        admin_email = "admin@verifdoc.io"
        admin = db.query(User).filter(User.email == admin_email).first()
        if not admin:
            print(f"Creating Admin user: {admin_email}")
            admin = User(
                email=admin_email,
                hashed_password=SecurityUtils.get_password_hash("admin123"),
                full_name="Super Admin",
                role="admin",
                credits_balance=9999
            )
            db.add(admin)
        else:
            print(f"Admin user already exists: {admin_email}")
            # Ensure role is correct in case it was changed
            if admin.role != "admin":
                admin.role = "admin"
                print(" -> Fixed Admin Role")

        # 2. Create CLIENT
        client_email = "client@verifdoc.io"
        client = db.query(User).filter(User.email == client_email).first()
        if not client:
            print(f"Creating Client user: {client_email}")
            client = User(
                email=client_email,
                hashed_password=SecurityUtils.get_password_hash("client123"),
                full_name="Jean Client",
                role="user",
                credits_balance=50
            )
            db.add(client)
        else:
            print(f"Client user already exists: {client_email}")

        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()
    print("--------------------------------------------------")
    print("✅ SEEDING COMPLETE")
    print("Utilisez ces identifiants pour tester :")
    print("  👑 ADMIN  : admin@verifdoc.io / admin123")
    print("  👤 CLIENT : client@verifdoc.io / client123")
    print("--------------------------------------------------")
