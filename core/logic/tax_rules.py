
import re

class TaxLogicEngine:
    """
    Moteur Logique Spécifique : AVIS D'IMPOSITION (France)
    Checks consistency of tax figures and structure.
    """

    def __init__(self):
        pass

    def _extract_monetary_value(self, text, keywords):
        """
        Helper to find a money amount after a keyword.
        Returns float or None.
        """
        for kw in keywords:
            # Pattern: Keyword ... 12 345,00 € or 12345
            # We look for the number NEAREST to the keyword
            pattern = re.compile(rf"{kw}.*?(\d[\d\s]*[.,]\d{{2}}|\d[\d\s]*)", re.IGNORECASE | re.DOTALL)
            match = pattern.search(text)
            if match:
                val_str = match.group(1).replace(' ', '').replace(',', '.')
                try:
                    return float(val_str)
                except:
                    continue
        return None

    def analyze(self, text_content: str) -> dict:
        results = {
            "is_valid_structure": False,
            "anomalies": [],
            "extracted_data": {}
        }

        # 1. Structure Check (Keywords)
        required_kws = ["DIRECTION GENERALE DES FINANCES PUBLIQUES", "AVIS D'IMPOT", "REVENU FISCAL DE REFERENCE"]
        found_kws = [kw for kw in required_kws if kw in text_content.upper()]
        
        if len(found_kws) >= 2:
            results["is_valid_structure"] = True
        else:
             results["anomalies"].append("MISSING_OFFICIAL_HEADER_KEYWORDS")

        # 2. Extract Key Figures
        rfr = self._extract_monetary_value(text_content, ["REVENU FISCAL DE REFERENCE", "REVENU BRUT GLOBAL"])
        impot_net = self._extract_monetary_value(text_content, ["MONTANT DE L'IMPOT", "TOTAL DE L'IMPOT", "IMPOT NET"])
        
        results["extracted_data"]["rfr"] = rfr
        results["extracted_data"]["impot_net"] = impot_net

        # 3. Logical Consistency Checks
        if rfr is not None and impot_net is not None:
            # Rule A: Tax cannot be higher than Income (Extreme case)
            if impot_net > rfr:
                results["anomalies"].append(f"IMPOSSIBLE_TAX_HIGHER_THAN_INCOME (Tax: {impot_net}, Income: {rfr})")
            
            # Rule B: High Tax Rate Warning (Rough estimate, if tax > 45% of income)
            if rfr > 0 and (impot_net / rfr) > 0.45:
                results["anomalies"].append(f"SUSPICIOUS_HIGH_TAX_RATE ({(impot_net/rfr)*100:.1f}%)")

        # 4. Context Consistency (Year)
        # Check if "Revenus de l'année N" matches "Avis N+1"
        years = re.findall(r"\b20\d{2}\b", text_content)
        if len(years) >= 2:
            years = sorted([int(y) for y in years])
            # Common pattern: Avis 2024 sur revenus 2023
            # If we see 2020 and 2024 in same doc, might be Copy-Paste error
            if (years[-1] - years[0]) > 2:
                 results["anomalies"].append(f"INCONSISTENT_YEAR_RANGE ({years[0]} to {years[-1]})")

        return results
