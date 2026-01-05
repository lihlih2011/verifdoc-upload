from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from sqlalchemy.orm import Session
from PIL import Image
import io
from backend.ml.ml_engine import MLEngine
from backend.engine.gan_fingerprint import GANFingerprintDetector
from backend.app.database import get_db
from backend.app.models import User, Transaction
from backend.api.auth_api import get_current_user

router = APIRouter(tags=["machine_learning"])

SCAN_COST = 50
GAN_COST = 100 # Premium Feature

# --- HELPER: CREDIT DEDUCTION ---
def process_scan_payment(user: User, db: Session, model_name: str, cost: int):
    """
    Checks balance and deducts credits for a scan.
    """
    if user.credits_balance < cost:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f"Credits insuffisants pour {model_name}. Requis: {cost}, Disponible: {user.credits_balance}"
        )
    
    # Deduct credits
    user.credits_balance -= cost
    
    # Log Usage Transaction
    txn = Transaction(
        user_id=user.id,
        amount=-cost,
        transaction_type="USAGE",
        description=f"Analysis: {model_name}"
    )
    db.add(txn)
    db.commit()
    db.refresh(user)
    return user.credits_balance

@router.post("/efficientnet")
async def analyze_efficientnet(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    EfficientNet Forensic Analysis.
    COST: 50 Credits.
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are supported.")

    new_balance = process_scan_payment(current_user, db, "EfficientNet Forensic", SCAN_COST)

    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        
        ml_engine = MLEngine()
        model_output = ml_engine.run_inference("efficientnet_forensic", image)
        
        score = float(model_output[0][1]) if model_output.ndim > 1 and model_output.shape[1] > 1 else float(model_output[0])
        interpretation = "falsification probable" if score > 0.5 else "document authentique"

        return {
            "model": "efficientnet_forensic",
            "score": score,
            "interpretation": interpretation,
            "credits_remaining": new_balance,
            "cost": SCAN_COST
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")

@router.post("/vit")
async def analyze_vit(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """
    Vision Transformer (ViT) Analysis.
    COST: 50 Credits.
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are supported.")

    new_balance = process_scan_payment(current_user, db, "ViT Forensic", SCAN_COST)

    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        
        ml_engine = MLEngine() 
        result = ml_engine.run_inference("vit_forensic", image)
        anomaly_score = result["score"]
        interpretation = "Anomalies détectées" if anomaly_score > 0.6 else "Document structurellement cohérent"

        return {
            "model": "vit_forensic",
            "anomaly_score": anomaly_score,
            "interpretation": interpretation,
            "credits_remaining": new_balance,
            "cost": SCAN_COST
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")

@router.post("/gan")
async def analyze_gan(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    GAN Fingerprint Detection (AI Generated Content).
    COST: 100 Credits (Premium).
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are supported.")

    # Higher cost for Premium feature
    new_balance = process_scan_payment(current_user, db, "GAN Fingerprint", GAN_COST)

    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        
        detector = GANFingerprintDetector()
        result = detector.analyze(image)
        
        score = result["ai_score"]
        interpretation = "Image générée par IA (Probabilité Élevée)" if score > 0.8 else "Image probablement naturelle"

        return {
            "model": "gan_fingerprint",
            "ai_probability": score,
            "interpretation": interpretation,
            "credits_remaining": new_balance,
            "cost": GAN_COST,
            "details": result # Contains noise_map
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GAN Analysis failed: {e}")