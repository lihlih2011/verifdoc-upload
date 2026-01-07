import sys
import os

# Ensure backend imports work
sys.path.append(os.getcwd())

from backend.app.database import SessionLocal
from backend.app.models import User
from backend.core.security_utils import SecurityUtils

def create_super_admin():
    db = SessionLocal()
    email = "contact@verifdoc.io"
    password = "admin" # Short password
    
    # Check if exists
    user = db.query(User).filter(User.email == email).first()
    if user:
        print(f"User {email} already exists. Updating role and credits.")
        user.role = "admin"
        user.credits_balance = 1000000 # Unlimited
        db.commit()
    else:
        print(f"Creating Super Admin {email}...")
        # Use pbkdf2_sha256 directly to avoid bcrypt issues
        from passlib.hash import pbkdf2_sha256
        hashed_pwd = pbkdf2_sha256.hash(password)
        
        new_user = User(
            email=email,
            hashed_password=hashed_pwd,
            full_name="VerifDoc Owner",
            role="admin",
            credits_balance=1000000
        )
        db.add(new_user)
        db.commit()
        print(f"Super Admin created. Login: {email} / {password}")

if __name__ == "__main__":
    create_super_admin()
