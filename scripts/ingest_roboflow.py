import os
import zipfile
import shutil
import glob

# Configuration
IMPORT_DIR = "DATASET_ROBOFLOW_IMPORT"
TARGET_DIR = "DATASET_STAMPS"  # Default target for this specific link

def ingest():
    print(f"[-] Poking around {IMPORT_DIR}...")
    
    # 1. Find ZIP
    zips = glob.glob(os.path.join(IMPORT_DIR, "*.zip"))
    if not zips:
        print("❌ No ZIP file found. Please download the dataset from Roboflow and place the .zip here.")
        return

    zip_path = zips[0]
    print(f"[*] Found archive: {zip_path}")
    
    # 2. Unzip
    extract_path = os.path.join(TARGET_DIR, "raw_roboflow")
    if os.path.exists(extract_path):
        shutil.rmtree(extract_path)
    os.makedirs(extract_path, exist_ok=True)
    
    print(f"[-] Extracting to {extract_path}...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
        
    print("✅ Extraction done.")
    
    # 3. Analyze Structure
    # Check for data.yaml (YOLO)
    yaml_path = os.path.join(extract_path, "data.yaml")
    if os.path.exists(yaml_path):
        print(f"[*] Detected YOLOv8 Format (data.yaml found).")
        # Rename/Move logic could go here, for now just confirm
        print("   -> Ready for Object Detection Training.")
    else:
        # Check for Train/Test folders
        if os.path.exists(os.path.join(extract_path, "train")):
            print(f"[*] Detected Classification/Folder Structure.")
        else:
            print(f"[?] Unknown structure. Please check inside {extract_path}.")

    print(f"\n✅ Dataset Ingested into: {TARGET_DIR}")
    print(f"   You can now proceed to training.")

if __name__ == "__main__":
    ingest()
