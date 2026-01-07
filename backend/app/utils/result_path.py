from __future__ import annotations
from pathlib import Path
import datetime
import re
from typing import Literal

# -----------------------------------------------------------------
# 1️⃣  Nettoyage des composants de chemin (sécurisé)
# -----------------------------------------------------------------
def _slug(value: str) -> str:
    """
    Transforme une chaîne en slug sûr pour les chemins de fichiers.
    - minuscules
    - espaces → underscores
    - garde uniquement alphanum, dash, underscore
    """
    value = str(value).lower().replace(" ", "_")
    return re.sub(r"[^a-z0-9_-]", "", value)


# -----------------------------------------------------------------
# 2️⃣  Enumérations pour abonnement & secteur (facultatif mais recommandé)
# -----------------------------------------------------------------
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

# -----------------------------------------------------------------
# 3️⃣  Fonction principale
# -----------------------------------------------------------------
def generate_result_path(
    organization_id: str,
    user_id: str,
    document_id: str,
    result_type: str,
    subscription: str, # On utilise str pour être plus souple, mais typé Subscription idéalement
    sector: str,       # idem
    extension: str = "json",
    base_dir: Path | str = "results",
) -> Path:
    """
    Retourne un chemin complet et lisible pour un résultat d’analyse.

    Exemple de structure :
    results/
        <organisation>/<abonnement>/<secteur>/<utilisateur>/<document>/<timestamp>_<type>.<ext>
    """
    ts = datetime.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    
    # Sécurisation de tous les inputs
    org = _slug(organization_id) if organization_id else "unknown_org"
    usr = _slug(user_id) if user_id else "unknown_user"
    doc = _slug(document_id) if document_id else "unknown_doc"
    typ = _slug(result_type)
    sub = _slug(subscription)
    sec = _slug(sector)

    filename = f"{ts}_{typ}.{extension}"
    
    # Construction du chemin hiérarchique
    return (
        Path(base_dir)
        / org
        / sub
        / sec
        / usr
        / doc
        / filename
    )
