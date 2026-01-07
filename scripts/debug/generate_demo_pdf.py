import sys
import os

# Ajout du chemin racine pour trouver les modules backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.engine.report_generator import ReportGenerator
import datetime

def generate_demo():
    print("🎨 Génération du PDF de démonstration...")
    
    # Données fictives simulant une fraude détectée
    fake_data = {
        "document_id": "DEMO-2026-X99",
        "filename": "Fiche_de_Paie_Janvier_Modifiee.pdf",
        "user_id": "1",
        "sector": "BANQUE / CRÉDIT",
        "file_hash": "a1b2c3d4e5f67890abcdef1234567890",
        
        # Le Verdict
        "verdict": "verdict_rejected", # ROUGE
        "confidence": 0.94, # 94% de certitude fraude
        "message": "Modification détectée dans la zone 'Salaire Net'. Incohérence spectrale majeure.",
        
        # Détails techniques
        "meta_audit": {
            "file_integrity": "ok",
            "verdict": "Suspect",
            "risk_score": 65,
            "software": "Adobe Photoshop 2024 (Mac)"
        },
        "spectral_audit": {
            "verdict": "Altéré",
            "score": 88,
            "details": "Artefacts de compression JPEG incohérents (Copier-Coller détecté)."
        },
        "semantic_audit": {
            "verdict": "Intègre",
            "score": 10,
            "details": "Pas d'incohérence logique dans les calculs."
        }
    }
    
    generator = ReportGenerator()
    # On force la sortie vers le Desktop pour que l'utilisateur le voie
    generator.output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")) 
    
    path, _ = generator.generate_report(fake_data)
    
    print(f"✅ PDF Généré : {path}")

if __name__ == "__main__":
    generate_demo()
