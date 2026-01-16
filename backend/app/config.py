# import torch

class Settings:
    PROJECT_NAME: str = "VerifDoc Backend"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Forensic AI Document Analysis Platform"
    DATABASE_URL: str = "sqlite:///./verifdoc.db" # Added database URL
    
    # Check Celery/Redis Config
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    # Storage Config
    import os
    STORAGE_TYPE: str = os.getenv("STORAGE_TYPE", "local") # "local" or "s3"
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "verifdoc-uploads")
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    AWS_REGION: str = os.getenv("AWS_REGION", "eu-west-3") # Paris default

class AIConfig:
    DEVICE: str = "cpu" # "cuda" if torch.cuda.is_available() else "cpu"
    
    # Model path placeholders
    DONUT_MODEL_PATH: str = "path/to/donut/model"
    FR_DETR_MODEL_PATH: str = "path/to/fr_detr/model"
    NOISEPRINT_MODEL_PATH: str = "path/to/noiseprint/model"
    DIFFUSION_FORENSICS_MODEL_PATH: str = "path/to/diffusion_forensics/model"
    ELA_PREPROCESSOR_MODEL_PATH: str = "path/to/ela_preprocessor/model"
    COPYMOVE_DETECTOR_MODEL_PATH: str = "path/to/copymove_detector/model"

    # OCR Model
    OCR_MODEL: str = "donut-placeholder"
    # FR-DETR Model
    FR_DETR_MODEL: str = "fr-detr-placeholder"
    # Diffusion Forensics Model
    DIFFUSION_MODEL: str = "diffusion-placeholder"
    # NoisePrint++ Model
    NOISEPRINT_MODEL: str = "noiseprint-placeholder"
    # ELA++ Quality Step
    ELA_QUALITY: int = 95

    # Fusion Engine Weights (placeholder values)
    # Fusion Engine Weights (Aggressive Tuning V2)
    FUSION_OCR_WEIGHT: float = 0.1
    FUSION_FRDETR_WEIGHT: float = 0.15
    FUSION_DIFFUSION_WEIGHT: float = 0.15
    FUSION_NOISEPRINT_WEIGHT: float = 0.1
    FUSION_ELA_WEIGHT: float = 0.25
    FUSION_COPYMOVE_WEIGHT: float = 0.35  # Critical Indicator
    FUSION_SIGNATURE_WEIGHT: float = 0.3
    FUSION_EMBEDDED_OBJECTS_WEIGHT: float = 0.35 # Critical Indicator

settings = Settings()
ai_config = AIConfig()