import os
import zipfile

def pack_project():
    # Targets to include in the engine pack
    targets = [
        "core", 
        "config.yaml", 
        "requirements.txt", 
        "main.py",
        "api",
        "templates",
        "static",
        "scripts",
        "DATASET_REAL", # Vital for the "Synthetic Factory"
        "DATASET_ID_CARD_FR", # Identity Cards
        "DATASET_TAX_NOTICE_FR", # Tax Notices
        "DATASET_STAMPS",        # [V3] Roboflow Stamps
        "DATASET_SIGNATURES",    # [V3] Signatures
        "colab_training_yolo.py" # [V3] YOLO Training Script
    ]
    
    output_zip = "verifdoc_colab_pack.zip"
    
    print(f"📦 Packing VerifDoc Engine into {output_zip}...")
    
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for target in targets:
            if os.path.isdir(target):
                for root, _, files in os.walk(target):
                    # Exclude unnecessary junk
                    if "__pycache__" in root or ".git" in root or "node_modules" in root:
                        continue
                        
                    for file in files:
                        if file.endswith(".pyc"): continue
                        
                        file_path = os.path.join(root, file)
                        # Archive name (relative)
                        arcname = os.path.join("verifdoc_engine", file_path)
                        zipf.write(file_path, arcname)
                        # print(f"   + {file_path}")
            elif os.path.isfile(target):
                # Archive name (relative)
                arcname = os.path.join("verifdoc_engine", target)
                zipf.write(target, arcname)
                # print(f"   + {target}")
                
    print(f"✅ Success! Upload '{output_zip}' to Google Colab when asked.")

if __name__ == "__main__":
    pack_project()
