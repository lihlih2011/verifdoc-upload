import json
import os
from difflib import get_close_matches

class FAQEngine:
    def __init__(self, data_path="backend/data/faq_dataset.json"):
        # Load absolute path
        base_dir = os.getcwd()
        full_path = os.path.join(base_dir, data_path)
        
        self.knowledge_base = []
        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                self.knowledge_base = json.load(f)
            print(f"🧠 [FAQ] Knowledge Base loaded: {len(self.knowledge_base)} Q&A pairs.")
        except Exception as e:
            print(f"⚠️ [FAQ] Could not load dataset: {e}")
            # Fallback data
            self.knowledge_base = [
                {"question": "Bonjour", "answer": "Bonjour ! Je suis l'assistant VerifDoc. Comment puis-je vous aider ?"},
                {"question": "Aide", "answer": "Posez-moi une question sur la facturation, les formats de fichiers ou l'analyse technique."}
            ]

    def find_answer(self, user_query: str):
        """
        Trouve la réponse la plus proche en utilisant la similarité de texte.
        """
        user_query = user_query.lower().strip()
        possible_questions = [item["question"].lower() for item in self.knowledge_base]
        
        # 1. Exact or Fuzzy Match (cutoff=0.6 signifie 60% de ressemblance requise)
        matches = get_close_matches(user_query, possible_questions, n=1, cutoff=0.4)
        
        if matches:
            best_match_question = matches[0]
            # Find the answer object
            for item in self.knowledge_base:
                if item["question"].lower() == best_match_question:
                    return {
                        "answer": item["answer"],
                        "confidence": "high",
                        "matched_question": item["question"]
                    }
        
        # 2. Keyword Search (Fallback simple)
        # Si 'facture' est dans la question, on trouve une Q&A sur les factures
        keywords = user_query.split()
        for word in keywords:
            if len(word) > 3: # Ignore petits mots
                for item in self.knowledge_base:
                    if word in item["question"].lower():
                         return {
                            "answer": item["answer"],
                            "confidence": "medium",
                            "matched_question": item["question"]
                        }

        # Log miss for Human Review/Training
        try:
             with open("missed_questions.log", "a", encoding="utf-8") as f:
                 f.write(f"{user_query}\n")
        except: pass

        return {
            "answer": "Je ne suis pas sûr de comprendre. Je transfère votre demande à David (Support Humain) 👨‍💻. Un instant...",
            "confidence": "low",
            "matched_question": None,
            "escalation_required": True
        }

# Singleton instance
faq_engine = FAQEngine()
