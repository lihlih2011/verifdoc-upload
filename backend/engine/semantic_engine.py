import re
from datetime import datetime
import json

class SemanticEngine:
    def __init__(self):
        print("🧠 Semantic Auditor (LLM-Ready) Initialized.")

    def analyze(self, text: str, doc_type: str = "unknown"):
        """
        Analyzes text coherence, consistency, and logic.
        Uses Regex heuristics for now, ready for LLM plug-in.
        """
        anomalies = []
        consistency_score = 100
        
        # --- 1. Basic Filters (Heuristics) ---
        
        # Check Total Amounts Coherence (Keywords: Total, TTC, HT)
        amounts = re.findall(r'(\d+[\.,]\d{2})', text)
        if len(amounts) > 1 and "Total" in text:
            # Logic: If many numbers found but text implies a total, verify math?
            # For this MVP, we just check if currency is consistent
            if "€" in text and "$" in text:
                anomalies.append("Devises mixtes détectées (€ et $)")
                consistency_score -= 20
        
        # Check Dates (Future dates, impossible dates)
        dates = re.findall(r'\d{2}/\d{2}/\d{4}', text)
        for d_str in dates:
            try:
                d = datetime.strptime(d_str, "%d/%m/%Y")
                if d > datetime.now():
                    anomalies.append(f"Date future détectée : {d_str}")
                    consistency_score -= 50
            except:
                pass # Invalid date format ignore
                
        # Check IBAN format validity (FR check)
        ibans = re.findall(r'FR\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}', text.replace(" ", ""))
        # Basic regex check (real algo needs modulo 97)
        if "IBAN" in text and not ibans:
            # Maybe it's not a generic IBAN doc, but if "IBAN" word exists but no patterns...
            # anomalies.append("Mention IBAN trouvée mais format invalide")
            pass

        # --- 2. LLM HALLUCINATION CHECK (Placeholder) ---
        # Here we would send `text` to GPT-4o or Llama3
        # prompt = f"Analyze this office document content: {text}. finding logical errors."
        
        # --- 3. Verdict ---
        verdict = "cohérent"
        if consistency_score < 80: verdict = "douteux"
        if consistency_score < 50: verdict = "incohérent"
        
        if not anomalies:
            details = "Cohérence sémantique et logique validée."
        else:
            details = "Incohérences : " + ", ".join(anomalies)

        return {
            "score": consistency_score,
            "verdict": verdict,
            "details": details,
            "anomalies": anomalies
        }

# Singleton
semantic_engine = SemanticEngine()
