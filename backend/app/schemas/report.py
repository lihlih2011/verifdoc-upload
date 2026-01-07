from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal, Optional

Subscription = Literal["free", "starter", "business", "enterprise"]
Sector = Literal[
    "finance",
    "healthcare",
    "public",
    "education",
    "retail",
    "technology",
    "other",
]

class ReportMetadata(BaseModel):
    # Champs d'identification
    organization_id: str = Field(..., description="Identifiant de l'organisation")
    user_id: str = Field(..., description="Identifiant de l'utilisateur qui a lancé l'analyse")
    document_id: str = Field(..., description="Identifiant unique du document")
    result_type: str = Field(..., description="Type de résultat (ex: verdict_valid)")
    
    # Contexte métier
    subscription: Subscription = Field(..., description="Niveau d’abonnement du client")
    sector: Sector = Field(..., description="Secteur d’activité du client")
    
    # Métadonnées techniques
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Date/heure de création (UTC)")
    file_path: str = Field(..., description="Chemin complet du fichier résultat")

    # Résultats d'analyse (optionnels car pas présents dans tous les types de rapports)
    verdict: Optional[str] = None
    human_reviewed: bool = False
    confidence: Optional[float] = None
    message: Optional[str] = None

    class Config:
        extra = "ignore" # Ignore les champs en trop du payload JSON
