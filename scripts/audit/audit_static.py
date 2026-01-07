import os
import sys
import json
import sqlite3

# --- PATH CONFIGURATION ---
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def check_file(path, label="File"):
    full_path = os.path.join(BASE_DIR, path)
    exists = os.path.exists(full_path)
    status = "✅ OK" if exists else "❌ MISSING"
    print(f"[{status}] {label}: {path}")
    return exists

def check_dir(path, label="Directory"):
    full_path = os.path.join(BASE_DIR, path)
    exists = os.path.isdir(full_path)
    status = "✅ OK" if exists else "❌ MISSING"
    print(f"[{status}] {label}: {path}")
    return exists

def check_db_integrity():
    db_path = os.path.join(BASE_DIR, "verifdoc.db")
    if not os.path.exists(db_path):
        print(f"[❌ ERROR] Database not found at {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        
        # Check Users
        cur.execute("SELECT count(*) FROM users")
        users = cur.fetchone()[0]
        
        # Check Transactions
        try:
            cur.execute("SELECT count(*) FROM transactions")
            trans = cur.fetchone()[0]
        except:
            trans = "N/A (Table missing)"

        print(f"[✅ INTEGRITY] Database healthy. Users: {users}, Transactions: {trans}")
        conn.close()
    except Exception as e:
        print(f"[❌ CORRUPT] Database error: {e}")

def check_frontend_config():
    pkg_path = os.path.join(BASE_DIR, "frontend", "package.json")
    if os.path.exists(pkg_path):
        try:
            with open(pkg_path, 'r') as f:
                data = json.load(f)
                deps = len(data.get('dependencies', {}))
                print(f"[✅ FRONTEND] Package.json valid ({deps} dependencies).")
        except:
            print("[❌ FRONTEND] Package.json is invalid JSON.")

def main():
    print(f"\n📢 VERIFDOC STATIC AUDIT (Root: {BASE_DIR})\n" + "-"*50)
    
    # 1. CRITICAL FILES
    print("\n1. CRITICAL INFRASTRUCTURE")
    check_file("backend/api/vision_api.py", "Vision Engine")
    check_file("backend/engine/fusion.py", "Fusion Logic")
    check_file("frontend/src/App.tsx", "Frontend App")
    check_file("docker-compose.yml", "Docker Config")
    check_file(".gitignore", "Git Ignore")
    
    # 2. ASSETS
    print("\n2. ASSETS & RESOURCES")
    check_file("frontend/public/images/logo_verifdoc_premium.jpg", "Premium Logo")
    check_dir("frontend/src/locales", "Translations (Optional)")
    check_file("frontend/src/i18n.ts", "Translation Config")
    
    # 3. SCRIPTS ORGANIZATION (New!)
    print("\n3. SCRIPTS ORGANIZATION")
    check_dir("scripts/admin", "Admin Scripts")
    check_dir("scripts/audit", "Audit Scripts")
    check_dir("scripts/dataset", "Dataset Tools")
    check_dir("scripts/debug", "Debug Tools")

    # 4. DATABASE
    print("\n4. DATA STORAGE")
    check_db_integrity()

    # 5. FRONTEND
    print("\n5. FRONTEND CONFIG")
    check_frontend_config()

    print("-" * 50 + "\n✅ AUDIT COMPLETE\n")

if __name__ == "__main__":
    main()
