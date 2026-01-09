from fastapi import FastAPI, Request, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from backend.app.database import get_db
from backend.app import models
from backend.api.vision_api import router as vision_router
from backend.api.analysis_history import router as analysis_history_router
from backend.api.report_api import router as report_router
from backend.api.verify_api import router as verify_router
from backend.api.signature_api import router as signature_router
# from backend.api.embedded_api import router as embedded_router
from backend.api.ml_router import router as ml_router
from backend.api.auth_api import router as auth_router
from backend.api.billing_api import router as billing_router
from backend.api.admin_api import router as admin_router
from backend.api.support_api import router as support_router
from backend.api.developer_api import router as developer_router
from backend.app.config import settings
from backend.app.database import Base, engine
import os
print("DEBUG: Importing Core Modules...")

# Rate Limiter Setup (Anti-Brute Force)
limiter = Limiter(key_func=get_remote_address)

print("DEBUG: Core Modules Imported. Creating FastAPI App...")
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
)
print("DEBUG: FastAPI App Created.")

# Connect Limiter to App
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Secure CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:5173", # Frontend Dev
    "http://localhost:5174", # Alternate Port
    "http://localhost:5175", # Current Port of User
    "http://localhost:80",   # Docker Prod
    "https://verifdoc.io",   # Prod Domain
    "https://www.verifdoc.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

# Mount static files directory for heatmaps
heatmaps_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "heatmaps")
os.makedirs(heatmaps_dir, exist_ok=True)
app.mount("/heatmaps", StaticFiles(directory=heatmaps_dir), name="heatmaps")

# ACCESS RESULTS DIRECTLY (FOR DEMO DOWNLOADS)
results_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "results")
os.makedirs(results_dir, exist_ok=True)
app.mount("/results", StaticFiles(directory=results_dir), name="results")

# Cleanup task removed for stability

# Routes with Proper Prefixes for Frontend
print("DEBUG: Including Routers...")
app.include_router(vision_router, prefix="/api/vision")


app.include_router(analysis_history_router, prefix="/api/history")
app.include_router(report_router, prefix="/api/report")
app.include_router(verify_router, prefix="/api/verify")
app.include_router(signature_router, prefix="/api/signature")
# app.include_router(embedded_router, prefix="/api/embedded")
app.include_router(ml_router, prefix="/api/ml")
app.include_router(auth_router, prefix="/api") # /api/auth
app.include_router(billing_router, prefix="/api") # /api/billing
app.include_router(admin_router, prefix="/api") # /api/admin
app.include_router(support_router, prefix="/api") # /api/support
app.include_router(developer_router, prefix="/api") # /api/developer
# CRM router
from backend.api.crm_api import router as crm_router
app.include_router(crm_router)

# External B2B API
from backend.api import external_api
app.include_router(external_api.router)

# ----------------- NOUVEAUX ROUTERS DASHBOARD & VDS -----------------
from backend.api.vds_analysis import router as vds_router
app.include_router(vds_router) # Préfixe déjà défini dans le router à /api/vds

from backend.api.dashboard import overview, history, report as dashboard_report, billing as dash_billing, settings, purge
app.include_router(overview.router)
app.include_router(history.router)
app.include_router(dashboard_report.router)
app.include_router(dash_billing.router)
app.include_router(settings.router)
app.include_router(purge.router)
from backend.api import admin_dashboard
app.include_router(admin_dashboard.router)
from backend.api import webhook_api
app.include_router(webhook_api.router)
from backend.api.payment_api import router as payment_router
app.include_router(payment_router, prefix="/api/payment", tags=["Paiement"])

# Public Demo API
from backend.api import public_api
app.include_router(public_api.router)

# Batch API (Enterprise Volume)
from backend.api import batch_api
app.include_router(batch_api.router)
# --------------------------------------------------------------------

@app.get("/")
@limiter.limit("5/minute") # Strict Limit on Root
async def read_root(request: Request):
    return {"message": "Welcome to VerifDoc Backend (Secured & GDPR Compliant)"}

from sqlalchemy.sql import text

@app.get("/health")
async def health_check(db: SessionLocal = Depends(get_db)):
    """
    Production Health Check.
    Validates DB connection and basic AI Engine readiness.
    """
    health_status = {
        "status": "ok",
        "database": "unknown",
        "version": settings.VERSION
    }
    
    # Check Database
    try:
        db.execute(text("SELECT 1"))
        health_status["database"] = "connected"
    except Exception as e:
        health_status["database"] = f"error: {str(e)}"
        health_status["status"] = "degraded"
        # logger.error(f"Health Check DB Error: {e}") # Logger not imported yet

    # Check ML Engine (Basic import check)
    try:
        import torch
        health_status["ml_engine"] = "available"
        if torch.cuda.is_available():
            health_status["cuda_available"] = True
        else:
             health_status["cuda_available"] = False
    except ImportError:
        health_status["ml_engine"] = "missing_libs"
        health_status["status"] = "degraded"

    return health_status

# SERVE FRONTEND (SPA)
if os.path.exists("frontend/dist"):
    app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
             pass

        # Check if file exists (e.g. favicon.ico)
        file_path = f"frontend/dist/{full_path}"
        if os.path.exists(file_path) and os.path.isfile(file_path):
             return FileResponse(file_path)
             
        # API Check (Redundant if router handles it, but safety net)
        if full_path.startswith("api") or full_path.startswith("docs"):
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="Not Found")

        return FileResponse("frontend/dist/index.html")
else:
    print("WARNING: frontend/dist not found (checked: frontend/dist). Run 'npm run build' in frontend/")

print("DEBUG: Main Module Loaded. Ready to run Uvicorn.")

if __name__ == "__main__":
    import uvicorn
    print("DEBUG: Storage Uvicorn run...")
    uvicorn.run(app, host="0.0.0.0", port=8000)