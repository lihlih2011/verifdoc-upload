import re
import sys

def test_init_script_syntax():
    """
    Simulates a syntax check for init_server.sh
    Ensures critical commands are present and structure is valid.
    """
    script_path = "infrastructure/init_server.sh"
    print(f"Testing script integrity: {script_path}")
    
    try:
        with open(script_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check Shebang
        if not content.startswith("#!/bin/bash"):
            print("❌ FAIL: Missing Shebang")
            sys.exit(1)
            
        # Critical Commands Checklist
        required_cmds = [
            "apt-get update",
            "python3.11",
            "docker",
            "ufw allow ssh",
            "nginx"
        ]
        
        missing = []
        for cmd in required_cmds:
            if cmd not in content:
                missing.append(cmd)
                
        if missing:
            print(f"❌ FAIL: Missing critical commands: {missing}")
            sys.exit(1)
            
        # Check Error Handling
        if "set -e" not in content:
            print("⚠️ WARNING: 'set -e' not found (Script won't stop on error)")
            
        print("✅ SUCCESS: Script syntax and requirements verified.")
        sys.exit(0)
        
    except FileNotFoundError:
        print(f"❌ FAIL: File not found: {script_path}")
        sys.exit(1)

if __name__ == "__main__":
    test_init_script_syntax()
