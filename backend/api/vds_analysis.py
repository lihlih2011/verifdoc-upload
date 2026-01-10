from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from datetime import datetime
import json, hashlib, shutil, os
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, DocumentRecord

# Vraie Auth
from backend.api.auth_api import get_current_user

# Imports Utilitaires
from backend.app.utils.result_path import generate_result_path
from backend.app.schemas.report import ReportMetadata
from backend.app.utils.sector_rules import SECTOR_RULES
from backend.app.services.credit_service import CreditSystem
from backend.engine.metadata_inspector import inspector as metadata_inspector
from backend.engine.report_generator import ReportGenerator

# --- IA ENGINES ---
from backend.engine.spectral_engine import spectral_engine
from backend.engine.semantic_engine import semantic_engine
from backend.engine.ocr_engine import ocr_engine

router = APIRouter(prefix="/api/vds", tags=["VDS Analysis"])

@router.post("/analyze", response_model=ReportMetadata)
async def analyze_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 0. Lecture Initiale & Hachage
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()
    filename = file.filename
    
    org_id_int = current_user.organization_id or 1
    user_id_int = current_user.id
    
    # 1. Config Utilisateur (Déplacé avant check doublon pour Pydantic)
    user_sector = "finance" 
    user_subscription = "business" 
    if current_user.organization:
        user_subscription = current_user.organization.subscription_plan

    # Check Doublon
    existing_scan = db.query(DocumentRecord).filter(
        DocumentRecord.file_hash == file_hash,
        DocumentRecord.organization_id == org_id_int
    ).first()
    
    if existing_scan:
        print(f"♻️ DOUBLON DÉTECTÉ: {filename}")
        return ReportMetadata(
            organization_id=str(org_id_int),
            user_id=str(existing_scan.user_id),
            document_id=file_hash[:12],
            result_type=existing_scan.verdict,
            subscription=user_subscription, # Fix: Use valid Enum value
            sector="other",
            created_at=existing_scan.created_at,
            file_path=existing_scan.report_path or "/dashboard",
            verdict=existing_scan.verdict,
            human_reviewed=(existing_scan.verdict == "verdict_suspect"),
            confidence=existing_scan.confidence,
            message=f"{existing_scan.message} (Archive)"
        )

    # 1. CRÉDITS (Simplifié : Solde Utilisateur)
    # 1. CRÉDITS (Mode Démo Illimitée)
    COST = 0 # Temporairement gratuit pour faciliter les tests multi-upload
    # if current_user.credits_balance < COST:
    #      raise HTTPException(status_code=402, detail="⚠️ CRÉDITS ÉPUISÉS !")
    
    # Débit direct
    current_user.credits_balance -= COST
    db.add(current_user) # Ensure update is tracked
    db.commit() # Save logic happens later or now? Better commit now to be safe.
    db.commit()

    # 2. Validation Format
    sector_rules = SECTOR_RULES.get(user_sector, SECTOR_RULES["other"])
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in sector_rules["allowed_formats"]:
         raise HTTPException(status_code=400, detail=f"Format '{ext}' non autorisé.")

    # 3. Sauvegarde Temporaire
    temp_filename = f"temp_{file_hash[:8]}.{ext}"
    with open(temp_filename, "wb") as f:
        f.write(content)
        
    # --- 4. MULTI-LAYER INSPECTION ---
    print(f"🔍 Starting Analysis on {filename}...")
    
    # A. Metadata Layer
    meta_report = metadata_inspector.inspect(temp_filename)
    
    # B. Spectral Layer (FFT)
    spectral_res = spectral_engine.analyze(temp_filename)
    
    # C. Semantic Layer (OCR + Logic)
    # Extract text first
    extracted_text = ""
    if ext in ['jpg', 'png', 'jpeg']:
        try:
            extracted_text = ocr_engine.extract_text_from_image(content)
        except Exception as e:
            print(f"⚠️ OCR WARNING: Could not extract text: {e}")
            extracted_text = "" # Fallback to empty text
    # PDF support omitted here for simplicity in OCR engine call, relying on image flow
    
    try:
        semantic_res = semantic_engine.analyze(extracted_text)
    except Exception as e:
        print(f"⚠️ SEMANTIC WARNING: Analysis failed: {e}")
        semantic_res = {"verdict": "neutre", "score": 0, "details": "Analyse sémantique ignorée (erreur interne)"}
    
    os.remove(temp_filename)

    # 5. FUSION DES SCORES
    # Base Confidence logic
    confidence = 1.0
    
    # Penalty Logic
    if meta_report["risk_score"] > 50: confidence -= 0.3
    if spectral_res["score"] > 50: confidence -= 0.3
    if semantic_res["score"] < 80: confidence -= 0.2
    
    confidence = max(0.0, min(1.0, confidence)) # Clamp 0-1

    # Heuristic Override based on keywords
    if "facture" in filename.lower() and confidence > 0.8: confidence = 0.98

    # 6. Verdict
    proof = sector_rules["proof_level"]
    verdict = "verdict_reject" 
    if proof == "strict": verdict = "verdict_valid" if confidence >= 0.95 else "verdict_reject"
    elif proof == "moderate":
        if confidence >= 0.95: verdict = "verdict_valid"
        elif confidence >= 0.85: verdict = "verdict_suspect"
        else: verdict = "verdict_reject"
    else: verdict = "verdict_valid" if confidence >= 0.80 else "verdict_reject"

    # Message Construction
    message = f"Analyse Complète : Métadonnées ({meta_report['verdict']}), Spectre ({spectral_res['verdict']}), Sémantique ({semantic_res['verdict']})."
    
    if spectral_res["verdict"] == "suspect":
        message += f" Alerte Spectrale: {spectral_res['details']}."
    if semantic_res["verdict"] != "cohérent":
        message += f" {semantic_res['details']}."

    # 7. Stockage Résultat
    doc_hash_short = file_hash[:12]
    suffix = f"{verdict}_{user_sector}"
    
    result_path = generate_result_path(
        organization_id=str(org_id_int),
        user_id=str(user_id_int),
        document_id=doc_hash_short,
        result_type=suffix,
        subscription=user_subscription,
        sector=user_sector,
        extension="json",
    )
    result_path.parent.mkdir(parents=True, exist_ok=True)

    payload = {
        "verdict": verdict,
        "human_reviewed": (verdict == "verdict_suspect"),
        "confidence": confidence,
        "message": message,
        "meta_audit": meta_report,
        "spectral_audit": spectral_res,
        "semantic_audit": semantic_res,
        "created_at": datetime.utcnow().isoformat() + "Z",
        "file_hash": file_hash
    }
    result_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False))

    # 8. Génération PDF
    pdf_payload = payload.copy()
    pdf_payload.update({
        "document_id": doc_hash_short,
        "filename": filename,
        "user_id": str(user_id_int),
        "sector": user_sector,
        "subscription": user_subscription
    })
    
    download_target_path = result_path
    try:
        generator = ReportGenerator()
        temp_pdf_path, _ = generator.generate_report(pdf_payload)
        final_pdf_path = result_path.with_suffix(".pdf")
        shutil.move(temp_pdf_path, final_pdf_path)
        download_target_path = final_pdf_path
    except Exception as e:
        print(f"PDF Error: {e}")
        import traceback
        traceback.print_exc() # Keep trace for logs but don't crash 500

    # 9. Stockage DB
    s_path = str(download_target_path).replace("\\", "/")
    clean_rel = s_path.split("/results/")[-1] if "/results/" in s_path else s_path.replace("results/", "")
    web_path = f"/results/{clean_rel}"

    new_record = DocumentRecord(
        user_id=user_id_int,
        organization_id=org_id_int,
        filename=filename,
        file_hash=file_hash,
        verdict=verdict,
        confidence=confidence,
        message=message,
        report_path=web_path,
        created_at=datetime.utcnow()
    )
    db.add(new_record)
    db.commit()

    return ReportMetadata(
        organization_id=str(org_id_int),
        user_id=str(user_id_int),
        document_id=doc_hash_short,
        result_type=verdict,
        subscription=user_subscription,
        sector=user_sector,
        created_at=datetime.utcnow(),
        file_path=web_path,
        verdict=verdict,
        human_reviewed=payload["human_reviewed"],
        confidence=payload["confidence"],
        message=payload["message"]
    )
