import requests
import sys
import os
import sqlite3
import importlib.util

def check_package(name):
    found = importlib.util.find_spec(name) is not None
    status = "✅ INSTALLED" if found else "❌ MISSING"
    print(f"[{status}] Library: {name}")
    return found

def check_url(url, name):
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200:
            print(f"[✅ ONLINE   ] {name}: {url} (Status: {r.status_code})")
            return True
        else:
            print(f"[⚠️ WARNING  ] {name}: {url} returned {r.status_code}")
            return False
    except Exception as e:
        print(f"[❌ OFFLINE  ] {name}: {url} ({str(e)})")
        return False

def check_db():
    db_path = "verifdoc.db"
    if not os.path.exists(db_path):
        print(f"[❌ MISSING  ] Database: {db_path} not found")
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT count(*) FROM users")
        user_count = cursor.fetchone()[0]
        cursor.execute("SELECT count(*) FROM users WHERE role='admin'")
        admin_count = cursor.fetchone()[0]
        print(f"[✅ CONNECTED] Database: {db_path} (Users: {user_count}, Admins: {admin_count})")
        conn.close()
        return True
    except Exception as e:
        print(f"[❌ ERROR    ] Database connection failed: {e}")
        return False

def main():
    print("="*60)
    print("      VERIFDOC GLOBAL SYSTEM AUDIT      ")
    print("="*60)
    
    # 1. Environment Checks
    print("\n[ CORE ENVIRONMENT ]")
    print(f"Python Version: {sys.version.split()[0]}")
    check_package("fastapi")
    check_package("uvicorn")
    check_package("sqlalchemy")
    check_package("torch")
    check_package("pdf2image")
    check_package("fitz") # PyMuPDF
    check_package("PIL") # Pillow

    # 2. Database Checks
    print("\n[ DATABASE STATUS ]")
    check_db()

    # 3. Service Connectivity
    print("\n[ SERVICE CONNECTIVITY ]")
    backend_ok = check_url("http://localhost:8000/health", "Backend API")
    frontend_ok = check_url("http://localhost:5173", "Frontend App")
    
    # 4. Critical Endpoint Checks
    if backend_ok:
         print("\n[ API INTEGRITY ]")
         # Check auth endpoint exists (405 Method Not Allowed for GET is fine, connection works)
         try:
             req = requests.post("http://localhost:8000/api/auth/token")
             # Expect 422 (Validation Error) because we sent empty body, meaning endpoint exists and validates
             status = "✅ ACTIVE" if req.status_code == 422 else f"⚠️ UNEXPECTED STATUS {req.status_code}"
             print(f"[{status}] Auth Endpoint (/api/auth/token)")
         except:
             print("[❌ FAILED] Auth Endpoint not reachable")

         # Check vision endpoint
         try:
             req = requests.post("http://localhost:8000/api/vision/analyze")
             # Expect 401 Unauthorized or 422 or 400
             # We enabled auth so likely 401 without token
             status = "✅ SECURED" if req.status_code == 401 else f"⚠️ UNEXPECTED {req.status_code}"
             print(f"[{status}] Vision Endpoint (/api/vision/analyze)")
         except:
             print("[❌ FAILED] Vision Endpoint not reachable")

    print("\n" + "="*60)
    print("AUDIT COMPLETE")
    print("="*60)

if __name__ == "__main__":
    main()
