from backend.core.celery_app import celery_app
from backend.core.engine_manager import engines
from backend.app.database import SessionLocal
from backend.models.analysis_record import AnalysisRecord
from PIL import Image
from datetime import datetime
import os
import json

@celery_app.task(name="analyze_document_async")
def analyze_document_task(file_path: str, user_id: int, original_filename: str):
    """
    Background task to analyze a document.
    """
    db = SessionLocal()
    try:
        # Load Image
        try:
            image = Image.open(file_path).convert("RGB")
        except Exception as e:
            # Handle PDF if path points to PDF (simplified for now, ideally re-use vision_api logic)
             return {"error": "Async PDF support pending refactor"}

        # Run Analysis
        ocr_res        = engines.ocr_engine.analyze_document(image)
        frdetr_res     = engines.frdetr_engine.analyze(image)
        diffusion_res  = engines.diffusion_engine.analyze(image)
        noiseprint_res = engines.noiseprint_engine.analyze(image)
        ela_res        = engines.ela_engine.analyze(image)
        copymove_res   = engines.copymove_engine.detect_copymove(image)
        
        signature_res = {"hasSignature": False} # Placeholder for async
        embedded_objects_res = {"embeddedObjects": []} # Placeholder

        final_result = engines.fusion_engine.fuse({
            "ocr": ocr_res,
            "frdetr": frdetr_res,
            "diffusion": diffusion_res,
            "noiseprint": noiseprint_res,
            "ela": ela_res,
            "copymove": copymove_res,
            "signature": signature_res,
            "embedded_objects": embedded_objects_res
        })
        
        # VDS
        vds_result_obj = engines.vds_validator.validate(final_result)
        final_result["vds_certification"] = vds_result_obj.to_dict()

        # Generate Heatmaps (Async heatmaps might need to be saved to disk)
        # For now, we skip saving heatmaps to DB in async mode or we save them as paths
        # This is a simplification.
        
        # Save to DB
        record = AnalysisRecord(
            user_id=user_id,
            filename=original_filename,
            forensic_score=final_result["forgery_score"],
            risk_level=final_result["risk_level"],
            full_result=final_result,
            heatmaps={}, # Placeholder
            signature_info=signature_res,
            embedded_objects_info=embedded_objects_res,
            created_at=datetime.utcnow()
        )
        db.add(record)
        db.commit()
        
        # Cleanup
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return {"status": "success", "record_id": record.id}

    except Exception as e:
        print(f"Task Failed: {e}")
        return {"status": "failed", "error": str(e)}
    finally:
        db.close()
