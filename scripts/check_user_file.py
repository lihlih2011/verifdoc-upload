
import sys
import os
# Add parent dir to path
sys.path.append(os.getcwd())

from core.orchestrator import MainAnalyzer
from glob import glob

def scan_user_file():
    # Find the file (PDF or extracted JPG)
    base_dir = r"C:\Users\chaou\Desktop\VerifDoc Beta\DATASET_TAX_NOTICE_FR\AUTHENTIC"
    input_file = os.path.join(base_dir, "avis Imot.pdf")
    
    if not os.path.exists(input_file):
        # Try finding one of the extracted images if PDF is gone (unlikely)
        jpgs = glob(os.path.join(base_dir, "*.jpg"))
        if jpgs:
            input_file = jpgs[0]
        else:
            print("File not found!")
            return

    print(f"ANALYSE EXPERTE DU FICHIER : {os.path.basename(input_file)}")
    print("-" * 50)

    # Instantiate Engine
    analyzer = MainAnalyzer()
    
    # Run Analysis (Force Govt context to test logic)
    report = analyzer.analyze_document(input_file, sector_context="government")
    
    print("-" * 50)
    print(f"VERDICT FINAL : {report['verdict']}")
    print(f"SCORE DE RISQUE : {report['score']} / 100")
    print(f"CATEGORIE : {report['details']['triage_category']}")
    print("-" * 50)
    print("DETAIL DES SCORES :")
    print(f"   - FORENSIC (Visuel)  : {report['details']['axis_scores']['forensic']}/100")
    print(f"   - STRUCTURE (Fichier): {report['details']['axis_scores']['structure']}/100")
    print(f"   - LOGIQUE (Bugs)     : {report['details']['axis_scores']['logic']}/100")
    print("-" * 50)
    print("ANOMALIES DÉTECTÉES :")
    for warn in report['details']['logic']['business'].get('business_warnings', []):
        print(f"   [!] {warn}")
    
    print("-" * 50)
    if report['score'] < 30:
        print(">> CONCLUSION : C'est un document PROPRE (Techniquement).")
        print("   Si vous l'avez téléchargé sans le modifier, c'est normal.")
    else:
        print(">> CONCLUSION : Il y a des anomalies (Peut-être un modèle internet mal fait ?).")

if __name__ == "__main__":
    scan_user_file()
