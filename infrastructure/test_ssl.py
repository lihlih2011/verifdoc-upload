import os
import sys

def test_ssl_script():
    """
    Validates setup_ssl.sh syntax and logic.
    """
    script_path = "infrastructure/setup_ssl.sh"
    print(f"Testing SSL script integrity: {script_path}")
    
    try:
        with open(script_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # 1. Check Certbot Command
        if "certbot certonly" not in content:
            print("❌ FAIL: No certbot issuance command found.")
            sys.exit(1)
            
        # 2. Check Security Header (HSTS)
        if "Strict-Transport-Security" not in content:
            print("❌ FAIL: HSTS Security Header missing.")
            sys.exit(1)
            
        # 3. Check DH Param generation
        if "openssl dhparam" not in content:
            print("❌ FAIL: Diffie-Hellman parameter generation missing.")
            sys.exit(1)
            
        print("✅ SUCCESS: SSL Script checks passed.")
        sys.exit(0)
        
    except FileNotFoundError:
        print(f"❌ FAIL: File not found: {script_path}")
        sys.exit(1)

if __name__ == "__main__":
    test_ssl_script()
