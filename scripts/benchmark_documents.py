import os
import sys
# Fix path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import random
import glob
from core.orchestrator import MainAnalyzer
from tqdm import tqdm

# CONFIG
DATA_ROOT = "DATASET_ID_CARD_FR" # Focus on ID Cards for now as likely primary target
DATA_REAL = "DATASET_REAL" # Fallback/Mixed
SAMPLE_SIZE = 50 
OUTPUT_FILE = "benchmark_documents_v2_results.md"

def get_images(folder):
    exts = ['*.jpg', '*.jpeg', '*.png', '*.tif']
    files = []
    for ext in exts:
        files.extend(glob.glob(os.path.join(folder, "**", ext), recursive=True))
    return files

def run_benchmark():
    print("[-] Initializing VerifDoc Engine v2 (Document Mode)...")
    orchestrator = MainAnalyzer()
    
    # 1. Gather Authentic
    # Prefer ID Cards if available, else Real Generic
    path_auth_id = os.path.join(DATA_ROOT, "AUTHENTIC")
    path_auth_real = os.path.join(DATA_REAL, "AUTHENTIC")
    
    files_auth = get_images(path_auth_id) + get_images(path_auth_real)
    
    # 2. Gather Fake
    path_fake_id = os.path.join(DATA_ROOT, "FAKE")
    path_fake_real = os.path.join(DATA_REAL, "TAMPERED")
    
    files_fake = get_images(path_fake_id) + get_images(path_fake_real)

    print(f"[-] Found {len(files_auth)} Authentic / {len(files_fake)} Fake candidates.")
    
    if len(files_auth) < 5 or len(files_fake) < 5:
        print("❌ Not enough data to benchmark. Need at least 5 of each.")
        return

    # Sample
    sample_auth = random.sample(files_auth, min(len(files_auth), SAMPLE_SIZE))
    sample_fake = random.sample(files_fake, min(len(files_fake), SAMPLE_SIZE))
    
    results = {"TP": 0, "TN": 0, "FP": 0, "FN": 0}
    details = []
    
    print(f"[-] Testing {len(sample_auth)} Authentic + {len(sample_fake)} Fake...")

    # TEST AUTHENTIC
    for f in tqdm(sample_auth, desc="Testing Authentic"):
        try:
            res = orchestrator.analyze_document(f, sector_context="IDENTITY")
            score = res['score']
            
            # Expect Low Score (< 50)
            if score < 50:
                results["TN"] += 1
                status = "CORRECT"
            else:
                results["FP"] += 1
                status = "FALSE_POSITIVE"
                
            details.append(f"| {os.path.basename(f)} | Authentic | {score} | {status} |")
        except Exception as e:
            print(f"Error on {f}: {e}")

    # TEST FAKE
    for f in tqdm(sample_fake, desc="Testing Fake"):
        try:
            res = orchestrator.analyze_document(f, sector_context="IDENTITY")
            score = res['score']
            
            # Expect High Score (>= 50)
            if score >= 50:
                results["TP"] += 1
                status = "CORRECT"
            else:
                results["FN"] += 1
                status = "FALSE_NEGATIVE"
                
            details.append(f"| {os.path.basename(f)} | Fake | {score} | {status} |")
        except Exception as e:
            print(f"Error on {f}: {e}")

    # METRICS
    total = sum(results.values())
    acc = (results["TP"] + results["TN"]) / total if total else 0
    prec = results["TP"] / (results["TP"] + results["FP"]) if (results["TP"] + results["FP"]) else 0
    rec = results["TP"] / (results["TP"] + results["FN"]) if (results["TP"] + results["FN"]) else 0
    
    md = f"""
# VerifDoc Model V2 Benchmark (Documents)
**Date**: {os.popen('date /t').read().strip()}
**Dataset**: Mixed (ID Cards + Real World)

## Metrics
- **Accuracy**: {acc:.2%}
- **Precision**: {prec:.2%}
- **Recall**: {rec:.2%}

## Matrix
| | Pred. Auth | Pred. Fake |
|---|---|---|
| **Real Auth** | {results['TN']} | {results['FP']} |
| **Real Fake** | {results['FN']} | {results['TP']} |

## Details
| File | Type | Score | Status |
|---|---|---|---|
""" + "\n".join(details)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(md)
        
    print(f"\n✅ Results saved to {OUTPUT_FILE}")
    print(f"Accuracy: {acc:.2%}")

if __name__ == "__main__":
    run_benchmark()
