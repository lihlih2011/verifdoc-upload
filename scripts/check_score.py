import sys
import os

# Ensure import works
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

try:
    from core.orchestrator import MainAnalyzer
except ImportError:
    from verifdoc.core.orchestrator import MainAnalyzer

def check_file(path):
    print(f"Checking: {os.path.basename(path)}")
    
    # Silence Stdout for Clean Result
    original_stdout = sys.stdout
    sys.stdout = open(os.devnull, 'w')
    
    try:
        analyzer = MainAnalyzer()
        res = analyzer.analyze_document(path)
    except Exception as e:
        sys.stdout = original_stdout
        print(f"Error: {e}")
        return
    finally:
        sys.stdout = original_stdout
        
    # Print Key Metrics
    score = res.get("score", -1)
    if score == -1: score = res.get("risk_score", -1)
    
    forensic = res.get("details", {}).get("forensic", {})
    if not forensic: forensic = res.get("forensic", {}) # Fallback
    
    clones = forensic.get("clones_detected", 0)
    ela = forensic.get("ela_score", 0)
    
    print("-" * 30)
    print(f"RISK SCORE: {score}/100")
    print(f"VERDICT:    {res.get('verdict')}")
    print(f"CLONES:     {clones} (Should be > 0 for Copy-Move)")
    print(f"ELA SCORE:  {ela:.2f}")
    print("-" * 30)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python check_score.py <path>")
    else:
        check_file(sys.argv[1])
