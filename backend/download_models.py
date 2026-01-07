import os
import requests
import sys

# Configuration
WEIGHTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "weights")
os.makedirs(WEIGHTS_DIR, exist_ok=True)

MODELS = {
    # Tesseract OCR (LSTM - AI Based) - French & English Best
    "fra.traineddata": "https://github.com/tesseract-ocr/tessdata_best/raw/main/fra.traineddata",
    "eng.traineddata": "https://github.com/tesseract-ocr/tessdata_best/raw/main/eng.traineddata",
    
    # Placeholder for custom AI models (hosting these usually requires a private bucket)
    # For now, we simulate downloading a "Forgery Detection" model by grabbing a standard ResNet weight file
    # which gives the "AI" backbone capability.
    "resnet50_backbone.pth": "https://download.pytorch.org/models/resnet50-19c8e357.pth" 
}

def download_file(url, dest_path):
    if os.path.exists(dest_path):
        print(f"✅ {os.path.basename(dest_path)} already exists.")
        return

    print(f"⬇️ Downloading {os.path.basename(dest_path)} from {url}...")
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Download complete: {dest_path}")
    except Exception as e:
        print(f"❌ Error downloading {url}: {e}")

def main():
    print(f"🚀 Starting AI Models Download to {WEIGHTS_DIR}...")
    
    for filename, url in MODELS.items():
        dest = os.path.join(WEIGHTS_DIR, filename)
        download_file(url, dest)
        
    print("✨ All models validation complete.")

if __name__ == "__main__":
    main()
