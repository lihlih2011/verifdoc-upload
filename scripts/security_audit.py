import urllib.request
import urllib.error
import time
import sys
import subprocess
import os
import json

# Configuration
BASE_URL = "http://localhost:8000"

def start_backend():
    print("[*] Starting Backend for Security Audit...")
    # Using Popen to start without blocking
    env = os.environ.copy()
    # Add project root to PYTHONPATH
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env["PYTHONPATH"] = project_root
    
    # Simple Uvicorn start
    cmd = [sys.executable, "-m", "uvicorn", "backend.app.main:app", "--port", "8000", "--host", "127.0.0.1"]
    proc = subprocess.Popen(cmd, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return proc

def check_endpoint(method, endpoint, expected_code, desc):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, method=method)
    
    status_code = 0
    try:
        with urllib.request.urlopen(req, timeout=2) as response:
            status_code = response.getcode()
    except urllib.error.HTTPError as e:
        status_code = e.code
    except urllib.error.URLError as e:
        print(f"[ERR ] {desc} -> Connection failed: {e}")
        return False
    except Exception as e:
        print(f"[ERR ] {desc} -> Unexpected error: {e}")
        return False

    if status_code == expected_code:
        print(f"[PASS] {desc} -> Got {status_code}")
        return True
    else:
        print(f"[FAIL] {desc} -> Expected {expected_code}, Got {status_code}")
        return False

def main():
    proc = start_backend()
    
    print("Waiting for server to start...")
    time.sleep(5) # Wait for startup
    
    try:
        print("\n--- SECURITY ACCESS CONTROL AUDIT ---")
        
        # 1. Public Routes
        check_endpoint("GET", "/", 200, "Public Root Access")
        check_endpoint("GET", "/health", 200, "Health Check")
        # Note: /health might be 404 if not defined in main.py, let's check basic connectivity only
        
        # 2. Protected Routes (No Token) -> Should fail 401 or 403
        # Assuming /admin/stats is properly protected
        check_endpoint("GET", "/api/admin/stats", 401, "Admin Stats (Unauthenticated)")
        
        # Assuming /api/analyze is protected
        check_endpoint("POST", "/api/analyze", 401, "Document Analysis (no token)")
        
        # 3. Method Not Allowed
        # /api/auth/login is usually POST. GET should be 405.
        check_endpoint("GET", "/api/auth/login", 405, "Login via GET (Method Check)")
        
        print("\n--- AUDIT COMPLETE ---")
        
    finally:
        print("[*] Stopping Backend.")
        proc.terminate()

if __name__ == "__main__":
    main()
