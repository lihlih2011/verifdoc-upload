from dataclasses import dataclass, asdict
from typing import List, Dict, Optional

@dataclass
class VDSResult:
    level_achieved: int # 0 (Failed), 1 (Check), 2 (Forensic), 3 (Certified)
    badges: List[str] # ["VDS-Bronze", "OCR-Validated", ...]
    details: Dict[str, bool] # {"ocr_consistency": True, "ela": False}
    failure_reason: Optional[str] = None
    
    def to_dict(self):
        return asdict(self)

class VDSValidator:
    """
    VerifDoc Digital Standard (VDS-25) Validator.
    Applies the 3-level certification logic.
    """

    def validate(self, analysis_data: dict) -> VDSResult:
        # 1. Level 1: Integrite Structurelle (VDS-Check)
        l1_checks = self._check_level_1(analysis_data)
        if not l1_checks["passed"]:
            return VDSResult(0, [], l1_checks["details"], l1_checks["failure"])
            
        # 2. Level 2: Integrite Numerique (VDS-Forensic)
        l2_checks = self._check_level_2(analysis_data)
        if not l2_checks["passed"]:
            # Passed L1 only
            return VDSResult(1, ["VDS-Check", "Bronze"], {**l1_checks["details"], **l2_checks["details"]}, l2_checks["failure"])

        # 3. Level 3: Preuve Judiciaire (VDS-Certified)
        l3_checks = self._check_level_3(analysis_data)
        if not l3_checks["passed"]:
             # Passed L1 + L2
             return VDSResult(2, ["VDS-Check", "VDS-Forensic", "Silver"], {**l1_checks["details"], **l2_checks["details"], **l3_checks["details"]}, l3_checks["failure"])

        # All Pass (Level 3)
        return VDSResult(3, ["VDS-Check", "VDS-Forensic", "VDS-Certified", "Gold"], 
                        {**l1_checks["details"], **l2_checks["details"], **l3_checks["details"]}, 
                        None)

    def _check_level_1(self, data) -> dict:
        """
        Niveau 1 : OCR Consistency & visual anomalies (Low Risk expected)
        """
        scores = data.get("module_scores", {})
        
        # Risk scores (0.0 = Safe, 1.0 = Risky)
        ocr_risk = scores.get("ocr", 0.0)
        frdetr_risk = scores.get("frdetr", 0.0) # Visual anomalies
        
        # Thresholds: Strict on visual, looser on OCR
        passed = ocr_risk < 0.4 and frdetr_risk < 0.5
        
        failure = []
        if ocr_risk >= 0.4: failure.append(f"Risque OCR élevé ({int(ocr_risk*100)}%)")
        if frdetr_risk >= 0.5: failure.append(f"Anomalies visuelles détectées ({int(frdetr_risk*100)}%)")
        
        return {
            "passed": passed,
            "details": {"ocr_safe": ocr_risk < 0.4, "visual_safe": frdetr_risk < 0.5},
            "failure": ", ".join(failure) if failure else None
        }

    def _check_level_2(self, data) -> dict:
        """
        Niveau 2 : ELA & Digital Fingerprints (Deepfake detection)
        """
        scores = data.get("module_scores", {})
        
        ela_risk = scores.get("ela", 0.0)
        diffusion_risk = scores.get("diffusion", 0.0)
        copymove_risk = scores.get("copymove", 0.0)
        
        # Must be low risk on all advanced metrics
        passed = (ela_risk < 0.4) and (diffusion_risk < 0.4) and (copymove_risk < 0.4)
        
        failure = []
        if ela_risk >= 0.4: failure.append("Compression ELA suspecte")
        if diffusion_risk >= 0.4: failure.append("Trace de génération IA/Diffusion")
        if copymove_risk >= 0.4: failure.append("Duplication Copier-Coller détectée")
        
        return {
            "passed": passed,
            "details": {
                "ela_safe": ela_risk < 0.4, 
                "diffusion_safe": diffusion_risk < 0.4,
                "copymove_safe": copymove_risk < 0.4
            },
            "failure": ", ".join(failure) if failure else None
        }

    def _check_level_3(self, data) -> dict:
        """
        Niveau 3 : Signature & Consistency
        """
        scores = data.get("module_scores", {})
        signature_risk = scores.get("signature", 0.0)
        embedded_risk = scores.get("embedded_objects", 0.0) # Check hidden objects
        
        # Signature risk: 0.1 (Valid) vs 0.9 (Invalid) in Fusion
        # We fail if > 0.5
        
        passed = signature_risk < 0.5 and embedded_risk < 0.3
        
        return {
            "passed": passed,
            "details": {"signature_valid": signature_risk < 0.5, "no_hidden_objects": embedded_risk < 0.3},
            "failure": "Signature invalide ou objets cachés suspects" if not passed else None
        }
