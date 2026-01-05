from typing import Optional

def build_analysis_message(verdict: str, human_reviewed: bool = False, confidence: Optional[float] = None) -> str:
    """
    Génère un message juridique prudent et informatif pour l'interface utilisateur,
    basé sur le verdict technique et le contexte de l'analyse (revue humaine, score).
    """
    # 1. Cas VALID
    if verdict == "verdict_valid":
        return "Document analysé. Les indicateurs sont cohérents avec un document original."
    
    # 2. Cas SUSPECT
    elif verdict == "verdict_suspect":
        if human_reviewed:
            return "Document marqué comme suspect. Une revue manuelle a été déclenchée."
        return "Attention : Des anomalies potentielles ont été détectées. Vérification visuelle recommandée."
    
    # 3. Cas REJECT
    elif verdict == "verdict_reject":
        return "Alerte critique : Le document présente des traces significatives de manipulation ou non-conformité."
    
    # 4. Fallback
    return "Analyse terminée. Veuillez consulter les détails techniques."
