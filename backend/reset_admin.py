from app.db import SessionLocal
from app.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()
user = db.query(User).filter(User.email == "contact@verifdoc.io").first()

if user:
    print(f"Updating user {user.email}...")
    user.hashed_password = pwd_context.hash("VerifDoc2026!")
    user.role = "superadmin"
    db.commit()
    print("SUCCESS: Password set to 'VerifDoc2026!' and Role to 'superadmin'")
else:
    print("Creating new SuperAdmin user...")
    new_user = User(
        email="contact@verifdoc.io",
        hashed_password=pwd_context.hash("VerifDoc2026!"),
        role="superadmin",
        credits=99999,
        is_verified=True
    )
    db.add(new_user)
    db.commit()
    print("SUCCESS: User created.")

db.close()
