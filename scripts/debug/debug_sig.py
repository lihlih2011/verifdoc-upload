from core.orchestrator import MainAnalyzer
import inspect
import sys
import os

print(f"Python: {sys.version}")
print(f"Path: {sys.path}")

try:
    sig = inspect.signature(MainAnalyzer.analyze_document)
    print(f"Signature: {sig}")
except Exception as e:
    print(f"Error inspecting: {e}")

# Clean pyc just in case
import shutil
pyc_path = os.path.join("core", "__pycache__")
if os.path.exists(pyc_path):
    print("Clearing core/__pycache__...")
    try:
        shutil.rmtree(pyc_path)
        print("Cleared.")
    except:
        print("Failed to clear.")
