import sys
import os

# Add root to path
sys.path.append(os.getcwd())

try:
    print("Testing imports...")
    from backend.core.celery_app import celery_app
    from backend.core.engine_manager import engines
    from backend.core.tasks import analyze_document_task
    print("Imports successful.")
    
    print("Checking Celery Config:")
    print(f"Broker: {celery_app.conf.broker_url}")
    print(f"Backend: {celery_app.conf.result_backend}")
    
    print("Async Backend Setup Verified.")
    
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
