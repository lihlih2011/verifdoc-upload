import os
import re
from pathlib import Path

# CONFIGURATION
PROJECT_ROOT = r"C:\Users\chaou\Desktop\VerifDoc Beta"
IGNORE_DIRS = {'.git', 'node_modules', '__pycache__', 'venv', 'env', '.idea', '.vscode', 'dist', 'build'}
CRITICAL_FILES = [
    "frontend/src/i18n.ts",
    "frontend/src/main.tsx",
    "frontend/src/pages/Dashboard/ProDashboard.tsx",
    "backend/app/main.py",
    "backend/requirements.txt"
]

def find_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            if file.endswith(('.tsx', '.ts', '.py', '.js', '.jsx', '.html', '.css')):
                file_list.append(os.path.join(root, file))
    return file_list

def scan_file_content(filepath):
    issues = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                # Check for TODOs
                if "TODO" in line or "FIXME" in line:
                    issues.append(f"[TODO/FIXME] Line {i+1}: {line.strip()[:60]}...")
                
                # Check for potential Hardcoded Secrets (Basic regex)
                if re.search(r'(api_key|secret|password)\s*=\s*["\'][a-zA-Z0-9_\-]{20,}["\']', line, re.IGNORECASE):
                    issues.append(f"[SECURITY] Potential Hardcoded Secret Line {i+1}")

                # Check for console.log in production code (TSX/TS)
                if filepath.endswith(('tsx', 'ts')) and "console.log" in line:
                     issues.append(f"[QUALITY] console.log detected Line {i+1}")

    except Exception as e:
        pass
    return issues

def audit_main():
    print("=== RAPPORT D'AUDIT GÉNÉRAL VERIFDOC ===")
    print(f"Racine du projet : {PROJECT_ROOT}\n")

    # 1. VERIFICATION FICHIERS CRITIQUES
    print("--- 1. Vérification des Fichiers Critiques ---")
    missing_files = []
    for f in CRITICAL_FILES:
        path = os.path.join(PROJECT_ROOT, f)
        if os.path.exists(path):
            print(f"[OK] {f}")
        else:
            print(f"[MANQUANT] {f}")
            missing_files.append(f)
    print("")

    # 2. SCAN QUALITÉ & SÉCURITÉ
    print("--- 2. Analyse Qualité du Code ---")
    all_files = find_files(PROJECT_ROOT)
    total_issues = 0
    
    for file_path in all_files:
        rel_path = os.path.relpath(file_path, PROJECT_ROOT)
        issues = scan_file_content(file_path)
        if issues:
            print(f"\nFichier : {rel_path}")
            for issue in issues:
                print(f"  - {issue}")
                total_issues += 1
                if total_issues > 50: # Limit output
                    print("... (Trop d'erreurs, arrêt de l'affichage)")
                    return

    if total_issues == 0:
        print("Aucun problème majeur détecté dans les fichiers scannés.")

    print("\n=== FIN DE L'AUDIT ===")

if __name__ == "__main__":
    audit_main()
