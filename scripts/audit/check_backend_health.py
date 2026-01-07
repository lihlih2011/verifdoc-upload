import sys
import os

sys.path.append(os.getcwd())

print("Importing FastAPI...")
from fastapi import FastAPI
print("Importing internal modules...")
try:
    from backend.app.main import app
    print("Backend App imported successfully!")
except Exception as e:
    print(f"FAILED to import backend: {e}")
    import traceback
    traceback.print_exc()
