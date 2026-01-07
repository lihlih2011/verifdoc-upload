from roboflow import Roboflow
import os

# Configuration
API_KEY = "eZlpL6oBygCwdjxwylHO" # Provided by user
WORKSPACE = "test-t1s3e"
PROJECT = "invoice-5wfdh"
VERSION = 1 
DOWNLOAD_DIR = "data/authentic/invoices"

def download_dataset():
    print(f"[*] Initializing Roboflow with provided API Key...")
    try:
        rf = Roboflow(api_key=API_KEY)
    except Exception as e:
        print(f"❌ Error initializing Roboflow: {e}")
        return

    # Check if download dir exists
    if not os.path.exists(DOWNLOAD_DIR):
        print(f"[*] Creating directory {DOWNLOAD_DIR}...")
        os.makedirs(DOWNLOAD_DIR)
        
    print(f"[*] Downloading {WORKSPACE}/{PROJECT} v{VERSION} to {DOWNLOAD_DIR}...")
    
    try:
        project = rf.workspace(WORKSPACE).project(PROJECT)
        version = project.version(VERSION)
        dataset = version.download("yolov8", location=DOWNLOAD_DIR)
        
        print(f"\n✅ Dataset successfully downloaded to: {DOWNLOAD_DIR}")
        
    except Exception as e:
        print(f"❌ Error downloading dataset: {e}")
        print("Please check the API Key, Workspace, or Project name.")

if __name__ == "__main__":
    download_dataset()
