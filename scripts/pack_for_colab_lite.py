import os
import zipfile

def pack_project_lite():
    # Only packing essential Code + Lite Data
    targets = [
        "core", 
        "config.yaml", 
        "requirements.txt", 
        "main.py",
        "api",
        "templates",
        "static",
        "scripts",
        "DATASET_REAL" # We will filter this carefully
    ]
    
    output_zip = "verifdoc_colab_pack_lite.zip"
    
    print(f"📦 Packing LITE VerifDoc Engine into {output_zip}...")
    
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for target in targets:
            if os.path.isdir(target):
                for root, _, files in os.walk(target):
                    # Smart Exclusions
                    if "__pycache__" in root or ".git" in root or "node_modules" in root: continue
                    if "extracted_carved" in root: continue # Skip the heavy carved data
                    
                    for file in files:
                        file_path = os.path.join(root, file)
                        
                        # SKIP HEAVY FILES
                        if file.endswith(".mdb"): 
                            print(f"   ❌ Skipping Heavy File: {file}")
                            continue
                        if file.endswith(".zip"): 
                            continue
                        if file.endswith(".pyc"): 
                            continue
                            
                        # Archive name (relative)
                        arcname = os.path.join("verifdoc_engine", file_path)
                        zipf.write(file_path, arcname)
            
            elif os.path.isfile(target):
                arcname = os.path.join("verifdoc_engine", target)
                zipf.write(target, arcname)
                
    print(f"✅ Success! Upload '{output_zip}' (LITE VERISON) to Google Colab.")

if __name__ == "__main__":
    pack_project_lite()
