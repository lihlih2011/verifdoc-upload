# Lazy Loading Wrapper to allow rapid backend startup and sharing across modules
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
        if not self._vds: 
            from backend.core.vds_logic import VDSValidator
            self._vds = VDSValidator()
        return self._vds

# Singleton Instance
engines = LazyEngines()
