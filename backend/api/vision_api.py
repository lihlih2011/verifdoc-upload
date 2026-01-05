from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import JSONResponse
from PIL import Image
import io
from sqlalchemy.orm import Session
from datetime import datetime

from fastapi import BackgroundTasks
# engine imports moved to lazy property
from backend.core.vds_logic import VDSValidator # VDS
from backend.app.database import get_db
from backend.models.analysis_record import AnalysisRecord
from backend.api.auth_api import get_current_user
from backend.app.models import User, Transaction

router = APIRouter(prefix="/analyze", tags=["forensic"])

# Lazy Loading Wrapper to allow rapid backend startup
class LazyEngines:
    def __init__(self):
        self._ocr = None
        self._frdetr = None
        self._diffusion = None
        self._noiseprint = None
        self._ela = None
        self._copymove = None
        self._signature = None
        self._embedded = None
        self._fusion = None
        self._heatmap = None
        self._vds = None

    @property
    def ocr_engine(self):
        if not self._ocr: 
            from backend.engine.ocr_engine import OCREngine
            self._ocr = OCREngine(device="cpu")
        return self._ocr

    @property
    def frdetr_engine(self):
        if not self._frdetr:
            from backend.engine.forgery_transformer import ForgeryTransformer
            self._frdetr = ForgeryTransformer(device="cpu")
        return self._frdetr

    @property
    def diffusion_engine(self):
        if not self._diffusion:
            from backend.engine.diffusion_forensics import DiffusionForensics
            self._diffusion = DiffusionForensics(device="cpu")
        return self._diffusion

    @property
    def noiseprint_engine(self):
        if not self._noiseprint:
            from backend.engine.gan_fingerprint import GANFingerprintDetector
            self._noiseprint = GANFingerprintDetector(device="cpu")
        return self._noiseprint

    @property
    def ela_engine(self):
        if not self._ela:
            from backend.engine.ela_engine import ELAEngine
            self._ela = ELAEngine()
        return self._ela
        
    @property
    def copymove_engine(self):
        if not self._copymove:
            from backend.engine.copymove_engine import CopyMoveEngine
            self._copymove = CopyMoveEngine()
        return self._copymove

    @property
    def signature_engine(self):
        if not self._signature:
            from backend.engine.signature_engine import SignatureEngine
            self._signature = SignatureEngine()
        return self._signature

    @property
    def embedded_object_engine(self):
        if not self._embedded:
            from backend.engine.embedded_object_engine import EmbeddedObjectEngine
            self._embedded = EmbeddedObjectEngine()
        return self._embedded

    @property
    def fusion_engine(self):
        if not self._fusion:
            from backend.engine.fusion import FusionEngine
            self._fusion = FusionEngine()
        return self._fusion

    @property
    def heatmap_gen(self):
        if not self._heatmap:
            from backend.engine.heatmap_generator import HeatmapGenerator
            self._heatmap = HeatmapGenerator()
        return self._heatmap

    @property
    def vds_validator(self):
        if not self._vds: self._vds = VDSValidator()
        return self._vds

engines = LazyEngines()

@router.post("")
async def analyze_document(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Check Credits
        if current_user.credits_balance < 1:
             return JSONResponse(
                content={"error": "Crédits insuffisants. Veuillez recharger votre compte."},
                status_code=403
            )

        # Deduct Credit & Log Transaction
        current_user.credits_balance -= 1
        txn = Transaction(
            user_id=current_user.id,
            amount=-1,
            transaction_type="USAGE",
            description=f"Analysis: {file.filename}"
        )
        db.add(txn)
        db.commit()

        # Read file
        content = await file.read()
        stream = io.BytesIO(content)

        # Convert input to image for image-based engines
        try:
            image = Image.open(stream).convert("RGB")
        except Exception:
            # Handle PDF (convert first page to image)
            if file.filename.lower().endswith(".pdf"):
                 try:
                     from pdf2image import convert_from_bytes
                     # convert_from_bytes requires poppler installed on system
                     # If on Windows, ensure poppler/bin is in PATH
                     images = convert_from_bytes(content)
                     if images:
                         image = images[0].convert("RGB")
                     else:
                         return JSONResponse(content={"error": "PDF is empty or unreadable."}, status_code=400)
                 except Exception as e:
                     # Fallback to PyMuPDF (fitz) which has built-in binaries
                     try:
                         import fitz  # PyMuPDF
                         print("Falling back to PyMuPDF (fitz) for PDF conversion...")
                         doc = fitz.open(stream=content, filetype="pdf")
                         if doc.page_count > 0:
                             page = doc.load_page(0)
                             pix = page.get_pixmap()
                             # Convert fitz Pixmap to PIL Image
                             image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                         else:
                             raise ValueError("Empty PDF")
                     except Exception as fitz_e:
                         print(f"PyMuPDF Failure: {fitz_e}")
                         # Original error from pdf2image was: {e}
                         return JSONResponse(
                            content={"error": "Impossible de lire le PDF (Poppler et PyMuPDF ont échoué). Veuillez utiliser JPG/PNG."}, 
                            status_code=400
                         )
            else:
                 raise

        # Run modules
        ocr_res        = engines.ocr_engine.analyze_document(image)
        frdetr_res     = engines.frdetr_engine.analyze(image)
        diffusion_res  = engines.diffusion_engine.analyze(image)
        noiseprint_res = engines.noiseprint_engine.analyze(image)
        ela_res        = engines.ela_engine.analyze(image)
        copymove_res   = engines.copymove_engine.detect_copymove(image)
        
        # Run signature analysis if it's a PDF (logic kept from previous)
        signature_res = {"hasSignature": False}
        embedded_objects_res = {"embeddedObjects": []}
        
        if file.filename.lower().endswith(".pdf"):
            signature_res = engines.signature_engine.analyze_pdf_signature(content)
            embedded_objects_res["embeddedObjects"] = engines.embedded_object_engine.analyze_pdf_objects(content)

        # Fusion
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

        # Run VDS Certification
        # vds_logic.py defines 'validate', not 'validate_document'
        vds_result_obj = engines.vds_validator.validate(final_result)
        final_result["vds_certification"] = vds_result_obj.to_dict()

        # Generate heatmaps
        heatmaps = {
            "ela": engines.heatmap_gen.generate_ela_heatmap(image),
            "gan": engines.heatmap_gen.generate_gan_heatmap(image),
            "copymove": engines.heatmap_gen.generate_copymove_heatmap(image),
            "diffusion": engines.heatmap_gen.generate_diffusion_heatmap(image)
        }
        final_result["heatmaps"] = heatmaps

        # Save analysis record to database
        record = AnalysisRecord(
            user_id=current_user.id,
            filename=file.filename,
            forensic_score=final_result["forgery_score"],
            risk_level=final_result["risk_level"],
            full_result=final_result,
            heatmaps=heatmaps,
            signature_info=signature_res,
            embedded_objects_info=embedded_objects_res,
            created_at=datetime.utcnow()
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        # Add record ID to result
        final_result["record_id"] = record.id

        return JSONResponse(content=final_result)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )