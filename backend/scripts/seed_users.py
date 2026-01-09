from sqlalchemy.orm import Session
from backend.app.database import SessionLocal, Base, engine
from backend.app.models import User, Organization

# ...

def seed_users():
    db: Session = SessionLocal()
    try:
        # 0. Create Default Organization
        default_org_name = "VerifDoc HQ"
        org = db.query(Organization).filter(Organization.name == default_org_name).first()
        if not org:
            print(f"Creating Default Organization: {default_org_name}")
            org = Organization(
                name=default_org_name,
                subscription_plan="enterprise",
                credits_balance=99999
            )
            db.add(org)
            db.commit() # Commit needed to get org.id
            db.refresh(org)
            print(f" -> Organization Created with ID: {org.id}")
        else:
            print(f"Organization already exists: {org.name} (ID: {org.id})")

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
                credits_balance=9999,
                organization_id=org.id
            )
            db.add(admin)
        else:
            print(f"Admin user already exists: {admin_email}")
            # Fix Organization Link if missing
            if not admin.organization_id:
                admin.organization_id = org.id
                print(" -> Linked Admin to Default Org")
                db.add(admin)
            
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
                credits_balance=50,
                organization_id=org.id
            )
            db.add(client)
        else:
            print(f"Client user already exists: {client_email}")
            if not client.organization_id:
                client.organization_id = org.id
                print(" -> Linked Client to Default Org")
                db.add(client)

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
