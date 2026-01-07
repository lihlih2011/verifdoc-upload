import sys
import os

# Ensure backend imports work
sys.path.append(os.getcwd())

from backend.app.database import SessionLocal
from backend.app.models import User
from backend.core.security_utils import SecurityUtils

def verify_admin():
    db = SessionLocal()
    email = "contact@verifdoc.io"
    password = "admin"
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        print(f"User {email} NOT FOUND in database!")
    else:
        print(f"User {email} found. Role: {user.role}")
        print(f"Stored Hash: {user.hashed_password}")
        
        is_valid = SecurityUtils.verify_password(password, user.hashed_password)
        if is_valid:
            print("Password verification: SUCCESS")
        else:
            print("Password verification: FAILED")
            # Try to fix it
            print("Resetting password...")
            new_hash = SecurityUtils.get_password_hash(password)
            user.hashed_password = new_hash
            db.commit()
            print("Password reset. Please try logging in again.")

if __name__ == "__main__":
    verify_admin()
