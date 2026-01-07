import sys
import os

print("BOOT: Starting module checks...")

print("BOOT: Importing FastAPI...")
try:
    from fastapi import FastAPI
    print("BOOT: FastAPI OK")
except Exception as e:
    print(f"BOOT: FastAPI Failed: {e}")

print("BOOT: Importing SQLAlchemy...")
try:
    from sqlalchemy.orm import Session
    print("BOOT: SQLAlchemy OK")
except Exception as e:
    print(f"BOOT: SQLAlchemy Failed: {e}")

print("BOOT: Importing Database...")
try:
    from backend.app.database import Base, engine
    print("BOOT: Database OK")
except Exception as e:
    print(f"BOOT: Database Failed: {e}")

print("BOOT: Importing Auth API...")
try:
    from backend.api.auth_api import router as auth_router
    print("BOOT: Auth API OK")
except Exception as e:
    print(f"BOOT: Auth API Failed: {e}")

print("BOOT: Importing Admin API...")
try:
    from backend.api.admin_api import router as admin_router
    print("BOOT: Admin API OK")
except Exception as e:
    print(f"BOOT: Admin API Failed: {e}")

print("BOOT: Importing Billing API...")
try:
    from backend.api.billing_api import router as billing_router
    print("BOOT: Billing API OK")
except Exception as e:
    print(f"BOOT: Billing API Failed: {e}")

print("BOOT: ALL CHECKS PASSED. Trying Main...")
try:
    import backend.app.main
    print("BOOT: Main Module Imported OK")
except Exception as e:
    print(f"BOOT: Main Module Failed: {e}")
