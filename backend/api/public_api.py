from fastapi import APIRouter, UploadFile, File, HTTPException
import hashlib
import os
import shutil
import tempfile
from backend.engine.metadata_inspector import inspector as metadata_inspector
from backend.engine.spectral_engine import spectral_engine
from backend.engine.semantic_engine import semantic_engine
from backend.engine.ocr_engine import ocr_engine

router = APIRouter(prefix="/api/public", tags=["Public Demo"])

@router.post("/analyze")
async def analyze_public_document(file: UploadFile = File(...)):
    """
    Simplified analysis for Public Demo (No Auth, No DB, No Credits).
    """
    filename = file.filename
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    
    # 1. Validation Format
    if ext not in ['jpg', 'jpeg', 'png', 'pdf']:
        raise HTTPException(status_code=400, detail=f"Format '{ext}' non supporté pour la démo.")

    # 2. Save Temporary
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
        tmp.write(content)
        temp_filename = tmp.name

    try:
        # 3. ANALYSIS
        print(f"🔍 [PUBLIC] Starting Analysis on {filename}...")
        
        # Helper: Convert to Image if needed for Vision Engines
        vision_image_path = None
        extracted_text = ""
        
        if ext in ['jpg', 'jpeg', 'png']:
            vision_image_path = temp_filename
            try:
                extracted_text = ocr_engine.extract_text_from_image(content)
            except: pass
            
        elif ext == 'pdf':
            # Convert 1st page to image for Forensic Vision
            try:
                import fitz # PyMuPDF
                doc = fitz.open(temp_filename)
                if doc.page_count > 0:
                    page = doc.load_page(0)
                    pix = page.get_pixmap()
                    # Save temporary image
                    vision_image_path = temp_filename + ".png"
                    pix.save(vision_image_path)
                    
                    # Also extract text from PDF directly (better than OCR)
                    extracted_text = page.get_text()
            except Exception as e:
                print(f"⚠️ PDF Conversion Failed: {e}")

        # A. Metadata Layer
        meta_report = metadata_inspector.inspect(temp_filename)
        
        # B. Spectral Layer (Image Only)
        spectral_res = {"verdict": "neutre", "score": 0, "details": "N/A"}
        if vision_image_path:
            spectral_res = spectral_engine.analyze(vision_image_path)
        
        # C. Semantic Layer (OCR + Logic)
        semantic_res = {"verdict": "neutre", "score": 0, "details": "Non analysé"}
        if extracted_text:
            try:
                semantic_res = semantic_engine.analyze(extracted_text)
            except: pass
        
        # Cleanup Image if created
        if vision_image_path and vision_image_path != temp_filename and os.path.exists(vision_image_path):
            os.remove(vision_image_path)

        # 4. FUSION SCORES
        confidence = 1.0
        details = []

        # Penalties
        if meta_report.get("risk_score", 0) > 50: 
            confidence -= 0.3
            details.append("Métadonnées suspectes")
        
        if spectral_res.get("score", 0) > 40: 
            confidence -= 0.4
            details.append("Traces de manipulation d'image")
            
        if semantic_res.get("score", 0) < 60 and extracted_text:
             confidence -= 0.2
             details.append("Incohérences sémantiques")

        confidence = max(0.0, min(1.0, confidence)) # Clamp

        # 5. Verdict
        verdict = "VALID"
        if confidence < 0.85: verdict = "SUSPECT"
        if confidence < 0.60: verdict = "FRAUD"

        return {
            "verdict": verdict,
            "confidence": int(confidence * 100),
            "details": details,
            "meta_score": meta_report.get("risk_score", 0),
            "spectral_score": spectral_res.get("score", 0)
        }

    except Exception as e:
        print(f"ERROR Public Analysis: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'analyse.")
    finally:
        # Cleanup
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
