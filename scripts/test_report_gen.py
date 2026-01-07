import sys
import os

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.engine.report_generator import ReportGenerator

def generate_sample():
    print("Generating Sample Report...")
    
    # Mock Data (Scénario : Facture EDF Validée VDS Gold)
    mock_record = {
        "id": 9999,
        "filename": "Facture_EDF_2024_05.pdf",
        "forensic_score": 12, # Low Score = Good
        "risk_level": "LOW",
        "full_result": {
            "vds_certification": {
                "level_achieved": 3,
                "badges": ["VDS-Check", "VDS-Forensic", "VDS-Certified", "Gold"],
                "failure_reason": None
            }
        }
    }
    
    # Heatmaps (Empty for sample, text will say "Not available")
    mock_heatmaps = {} 
    
    generator = ReportGenerator()
    # Override output dir to current folder for easy access
    generator.output_dir = "." 
    
    path, _ = generator.generate_report(mock_record, mock_heatmaps)
    
    # Rename for clarity
    final_name = "EXEMPLE_CERTIFICAT_VDS_GOLD.pdf"
    if os.path.exists(final_name):
        os.remove(final_name)
    os.rename(path, final_name)
    
    print(f"Report Generated: {final_name}")

if __name__ == "__main__":
    generate_sample()
