import os
import shutil
import glob

# ---------------------------------------------------------
# VERIFDOC V3 - YOLOv8 TRAINING SCRIPT (Google Colab)
# ---------------------------------------------------------

def install_dependencies():
    print("[-] Installing Ultralytics (YOLOv8)...")
    os.system("pip install ultralytics")
    from ultralytics import YOLO
    print("✅ Ultralytics installed.")
    return YOLO

def setup_colab_env():
    print("[-] Mounting Google Drive...")
    try:
        from google.colab import drive
        drive.mount('/content/drive')
    except ImportError:
        print("[-] Local environment detected (or Drive mount failed).")
        return False
    
    zip_path = "/content/drive/MyDrive/verifdoc_colab_pack.zip"
    if not os.path.exists(zip_path):
        print(f"❌ Error: {zip_path} not found. Please upload the zip to Drive root.")
        return False
        
    print(f"[-] Unzipping {zip_path}...")
    import zipfile
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(".")
    print("✅ Unzip Complete.")
    return True

def train_yolo(dataset_path):
    from ultralytics import YOLO
    
    print(f"[-] Initializing YOLOv8 (Nano model for speed)...")
    model = YOLO("yolov8n.pt")  # load a pretrained model

    # Locate data.yaml
    yaml_files = glob.glob(os.path.join(dataset_path, "**", "data.yaml"), recursive=True)
    if not yaml_files:
        print("❌ CRITICAL: No data.yaml found in dataset!")
        return None
    
    data_yaml = yaml_files[0]
    print(f"[*] Found data config: {data_yaml}")

    print("[-] Starting Training (FAST MODE - CPU Friendly)...")
    # Train the model
    # imgsz=640 is standard for YOLO
    # Reduced epochs to 5 for CPU training (approx 45-60 mins)
    model.train(data=data_yaml, epochs=5, imgsz=640, project="verifdoc_v3_runs", name="stamps_detector", device='cpu')
    
    print("✅ Training Complete.")
    return model

def export_model(model):
    if model is None: return
    print("[-] Exporting to ONNX (for Node.js Backend)...")
    path = model.export(format="onnx")
    print(f"✅ Model exported to: {path}")
    
    # Copy to Drive if possible
    try:
        shutil.copy("verifdoc_v3_runs/stamps_detector/weights/best.pt", "/content/drive/MyDrive/verifdoc_v3_stamps.pt")
        print("✅ Model 'verifdoc_v3_stamps.pt' saved to Google Drive!")
    except Exception as e:
        print(f"[-] Could not copy to Drive: {e}")

if __name__ == "__main__":
    # 0. Auto-Setup (Colab only)
    if not os.path.exists("DATASET_STAMPS"):
         setup_colab_env()

    # 1. Setup YOLO
    YOLO_Class = install_dependencies()
    
    # 2. Check Dataset
    # Possible paths (Direct unzip or nested in verifdoc_engine)
    possible_paths = [
        "DATASET_STAMPS", 
        "verifdoc_engine/DATASET_STAMPS",
        "/content/verifdoc_engine/DATASET_STAMPS"
    ]
    
    dataset_root = None
    for p in possible_paths:
        if os.path.exists(p):
            dataset_root = os.path.abspath(p)
            print(f"[*] Dataset found at: {dataset_root}")
            break
    
    if dataset_root is None:
        print(f"❌ Error: DATASET_STAMPS not found in {possible_paths}")
        print("[-] Debug: Contents of current directory:")
        print(os.listdir("."))
        if os.path.exists("verifdoc_engine"):
            print("[-] Debug: Contents of verifdoc_engine:")
            print(os.listdir("verifdoc_engine"))
    else:
        # 3. Train
        model = train_yolo(dataset_root)
        
        # 4. Export
        export_model(model)
