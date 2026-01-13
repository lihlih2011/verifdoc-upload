import sys
import os

# Ajout brutal du path pour être sûr
sys.path.append("/app")

from app.db import SessionLocal
from app.models import User
from passlib.context import CryptContext

def reset():
    print("Starting Force Reset...")
    try:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        db = SessionLocal()
        
        target_email = "contact@verifdoc.io"
        user = db.query(User).filter(User.email == target_email).first()
        
        new_pass = "VerifDoc2026!"
        hashed = pwd_context.hash(new_pass)
        
        if user:
            print(f"User {target_email} found. Updating...")
            user.hashed_password = hashed
            user.role = "superadmin"
            user.is_verified = True
        else:
            print(f"User {target_email} NOT found. Creating...")
            user = User(
                email=target_email,
                hashed_password=hashed,
                role="superadmin",
                credits=1000,
                is_verified=True
            )
            db.add(user)
            
        db.commit()
        print(f"SUCCESS! Login: {target_email} / Pass: {new_pass}")
        
    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    reset()
