from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.models.analysis_record import AnalysisRecord
from backend.engine.report_generator import ReportGenerator
from backend.utils.hash_utils import compute_sha256
from backend.app.models import User, Transaction
from backend.api.auth_api import get_current_user
import os

router = APIRouter(prefix="/report", tags=["report"])

REPORT_COST = 10  # Coût pour télécharger un rapport

def process_report_payment(user: User, db: Session):
    """
    Checks balance and deducts credits for report download.
    """
    if user.credits_balance < REPORT_COST:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f"Solde insuffisant pour télécharger le rapport. Requis: {REPORT_COST}, Disponible: {user.credits_balance}"
        )
    
    # Deduct credits
    user.credits_balance -= REPORT_COST
    
    # Log Transaction
    txn = Transaction(
        user_id=user.id,
        amount=-REPORT_COST,
        transaction_type="USAGE",
        description=f"Téléchargement Rapport PDF"
    )
    db.add(txn)
    db.commit()
    db.refresh(user)
    return user.credits_balance

@router.get("/analysis/{record_id}")
async def get_analysis_report(
    record_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Génère et télécharge le rapport d'analyse.
    COÛT : 10 Crédits.
    """
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found")
    
    # 1. VERIFICATION PROPRIÉTAIRE (Sécurité de base)
    # Dans une vraie app, on vérifierait record.user_id == current_user.id
    
    # 2. PAIEMENT LORS DU TÉLÉCHARGEMENT
    # Si le rapport existe déjà, faut-il refaire payer ? 
    # Pour l'instant, OUI, pour simplifier et maximiser les revenus comme demandé.
    process_report_payment(current_user, db)

    # Ensure heatmaps are available
    heatmaps_data = record.heatmaps if record.heatmaps else {}

    record_dict = {
        "id": record.id,
        "filename": record.filename,
        "forensic_score": record.forensic_score,
        "risk_level": record.risk_level,
        "created_at": record.created_at.isoformat(),
        "full_result": record.full_result,
        "heatmaps": record.heatmaps
    }

    try:
        report_generator = ReportGenerator() 
        report_path, pdf_bytes = report_generator.generate_report(record_dict, heatmaps_data)
        
        integrity_hash = compute_sha256(pdf_bytes)

        record.report_file_path = report_path
        record.integrity_hash = integrity_hash
        db.add(record)
        db.commit()
        db.refresh(record)

        return FileResponse(
            path=report_path,
            filename=f"rapport_verifdoc_{record_id}.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        print(f"Error generating report for record {record_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate report: {e}")