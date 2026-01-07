from backend.core.security_utils import SecurityUtils
try:
    print("Testing Password Hashing...")
    hash = SecurityUtils.get_password_hash("test")
    print(f"Hash: {hash}")
    valid = SecurityUtils.verify_password("test", hash)
    print(f"Valid: {valid}")
except Exception as e:
    print(f"Hashing failed: {e}")
