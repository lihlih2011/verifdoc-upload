from typing import TypedDict, List, Literal

class SectorRule(TypedDict):
    # Types de vérifications obligatoires pour le secteur
    required_signatures: int          # nombre minimal de signatures valides 
    allowed_formats: List[Literal["pdf", "png", "jpg"]]
    max_file_size_mb: int
    # Niveau de preuve requis (détermine le verdict final)
    #   "strict"   → tout suspect → verdict_reject
    #   "moderate" → suspect → verdict_suspect (human review)
    #   "lenient"  → suspect → verdict_valid (avec warning)
    proof_level: Literal["strict", "moderate", "lenient"]
    # Message d’accompagnement (affiché dans le badge)
    messages: dict[Literal["valid", "suspect", "reject"], str]

SECTOR_RULES: dict[Literal[
    "finance",
    "healthcare",
    "real_estate",
    "legal",
    "public",
    "education",
    "retail",
    "technology",
    "other",
], SectorRule] = {
    "finance": {
        "required_signatures": 2,
        "allowed_formats": ["pdf"],
        "max_file_size_mb": 10,
        "proof_level": "strict",
        "messages": {
            "valid": "Certifié Conforme (Finance) : Signature validée et intégrité document confirmée.",
            "suspect": "Suspect (Finance) : Anomalie détectée sur la chaîne de confiance PDF.",
            "reject": "REJETÉ (Finance) : Score de confiance insuffisant (<99%) ou signature manquante.",
        },
    },
    "healthcare": {
        "required_signatures": 1,
        "allowed_formats": ["pdf", "png"],
        "max_file_size_mb": 15,
        "proof_level": "moderate",
        "messages": {
            "valid": "Certifié Conforme (Santé) : Métadonnées médicales cohérentes.",
            "suspect": "Attention (Santé) : Incohérence détectée entre format et métadonnées.",
            "reject": "REJETÉ (Santé) : Manipulation d'image détectée (Copy-Move).",
        },
    },
    "real_estate": {
        "required_signatures": 1,
        "allowed_formats": ["pdf", "jpg", "png"],
        "max_file_size_mb": 20,
        "proof_level": "moderate",
        "messages": {
             "valid": "Dossier Validé (Immo) : Pièce justificative authentique.",
             "suspect": "Vérification Requise (Immo) : Altération possible des dates ou montants.",
             "reject": "REJETÉ (Immo) : Falsification avérée (Police d'écriture incohérente).",
        },
    },
    "legal": {
        "required_signatures": 2,
        "allowed_formats": ["pdf"],
        "max_file_size_mb": 50,
        "proof_level": "strict",
        "messages": {
             "valid": "Preuve Légale Validée : Empreinte numérique intègre.",
             "suspect": "Audit Requis (Juridique) : Rupture de la chaîne de certification.",
             "reject": "NON RECEVABLE : Document altéré numériquement.",
        },
    },
    "public": {
        "required_signatures": 1,
        "allowed_formats": ["pdf", "png", "jpg"],
        "max_file_size_mb": 20,
        "proof_level": "lenient",
        "messages": {
            "valid": "Conforme (Secteur Public) : Format standard respecté.",
            "suspect": "À vérifier (Secteur Public) : Qualité du scan insuffisante.",
            "reject": "Non Conforme (Public) : Type de document inconnu.",
        },
    },
    "education": {
        "required_signatures": 1,
        "allowed_formats": ["pdf", "png", "jpg"],
        "max_file_size_mb": 20,
        "proof_level": "lenient",
        "messages": {
            "valid": "Diplôme Vérifié : Filigrane académique détecté.",
            "suspect": "Anomalie (Éducation) : Alignement du texte suspect.",
            "reject": "Faux (Éducation) : Modèle de diplôme non reconnu.",
        },
    },
    "retail": {
        "required_signatures": 0,
        "allowed_formats": ["pdf", "png", "jpg"],
        "max_file_size_mb": 10,
        "proof_level": "lenient",
        "messages": {
            "valid": "Reçu Validé (Retail) : Date et montant lisibles.",
            "suspect": "Suspect (Retail) : Doublon potentiel détecté.",
            "reject": "Rejeté (Retail) : Preuve d'achat illisible ou contrefaite.",
        },
    },
    "technology": {
        "required_signatures": 0,
        "allowed_formats": ["pdf", "png", "jpg"],
        "max_file_size_mb": 50,
        "proof_level": "moderate",
        "messages": {
            "valid": "Tech Specs Validated : Checksum correct.",
            "suspect": "Warning (Tech) : Metadata mismatch.",
            "reject": "Critical Error : Corrupted file structure.",
        },
    },
    "other": {
        "required_signatures": 0,
        "allowed_formats": ["pdf", "png", "jpg"],
        "max_file_size_mb": 25,
        "proof_level": "lenient",
        "messages": {
            "valid": "Vérification Standard : OK.",
            "suspect": "Incertain : Score de confiance faible.",
            "reject": "Non Valide : Document inexploitable.",
        },
    },
}
