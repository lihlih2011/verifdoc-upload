from typing import List, Literal

# Définition des droits par abonnement
PERMISSIONS: dict[Literal["free", "starter", "business", "enterprise"], List[str]] = {
    "free":      ["view_verdict_valid"],
    "starter":   ["view_verdict_valid", "view_verdict_suspect"],     # accès aux suspects
    "business":  ["view_verdict_valid", "view_verdict_suspect", "view_verdict_reject", "view_metadata"],
    "enterprise":["view_verdict_valid", "view_verdict_suspect", "view_verdict_reject", "view_metadata", "download_raw", "purge_data"],
}

# Définition des droits sectoriels (granularité fine)
# Si un secteur n'est pas listé, il suit les règles par défaut de l'abonnement.
SECTOR_PERMISSIONS = {
    "finance": {
        "verdict_valid": ["view_verdict_valid"],
        "verdict_suspect": ["view_verdict_suspect"],   # uniquement business+ ou enterprise (implicite via PERMISSIONS)
        "verdict_reject": ["view_verdict_reject"],     # refuser l'accès aux rejects pour les petits comptes ?
    },
    # Ajoutez d'autres si besoin
}

def has_permission(
    subscription: str,
    required: str,
) -> bool:
    """
    Retourne True si le niveau d’abonnement possède la permission demandée.
    """
    allowed = PERMISSIONS.get(subscription, [])
    return required in allowed

def has_sector_permission(subscription: str, sector: str, verdict: str) -> bool:
    """
    Vérifie que l'abonnement possède la permission pour le verdict
    dans le secteur donné.
    """
    # 1. Vérifier la permission de bases (ex: view_verdict_suspect) pour l'abonnement
    base_perm = f"view_{verdict}"
    if not has_permission(subscription, base_perm):
        return False
        
    # 2. (Optionnel) Vérifier s'il y a une restriction spécifique au secteur
    # Pour l'instant, on considère que si l'abonnement le permet, c'est bon.
    # On pourrait ajouter ici une logique plus complexe si besoin.
    
    return True
