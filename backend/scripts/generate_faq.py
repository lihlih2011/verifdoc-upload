import json
import random

def generate_massive_faq():
    dataset = []
    
    # --- 1. FACTURATION (Variations) ---
    plans = ["Essentiel", "Pro", "Forensic", "Enterprise"]
    prices = ["199€", "499€", "999€", "Sur devis"]
    
    for plan, price in zip(plans, prices):
        dataset.append({
            "category": "facturation",
            "question": f"Combien coûte le pack {plan} ?",
            "answer": f"Le pack {plan} est affiché à {price}. Il inclut un volume de crédits adapté à votre usage. Voir la page Tarifs pour le détail."
        })
        dataset.append({
            "category": "facturation",
            "question": f"Le plan {plan} inclut-il l'API ?",
            "answer": "Oui, tous nos packs (y compris le pack Essentiel) donnent un accès complet à l'API Rest."
        })

    # --- 2. TECHNIQUE (Erreurs HTTP) ---
    errors = {
        "400": "Requête invalide (Format de fichier non supporté ou paramètres manquants).",
        "401": "Non autorisé (Clé API invalide ou session expirée).",
        "402": "Paiement requis (Solde de crédits épuisé). Rechargez votre compte.",
        "403": "Interdit (Votre IP ou compte est bloqué).",
        "404": "Non trouvé (L'ID du document ou l'endpoint n'existe pas).",
        "429": "Trop de requêtes (Rate limit dépassé). Ralentissez vos appels API.",
        "500": "Erreur serveur interne. Veuillez réessayer plus tard."
    }
    
    for code, explanation in errors.items():
        dataset.append({
            "category": "technique",
            "question": f"Je reçois une erreur {code}, que faire ?",
            "answer": f"L'erreur {code} signifie : {explanation}"
        })
        dataset.append({
            "category": "technique",
            "question": f"Que signifie le code HTTP {code} ?",
            "answer": explanation
        })

    # --- 3. FORMATS (Combinaisons) ---
    formats = ["PDF", "JPG", "PNG", "TIFF"]
    for fmt in formats:
        dataset.append({
            "category": "usage",
            "question": f"Le format {fmt} est-il accepté ?",
            "answer": f"Oui, le format {fmt} est supporté par notre moteur d'analyse (sauf pour certains secteurs stricts qui exigent le PDF)."
        })
        dataset.append({
            "category": "usage",
            "question": f"Puis-je envoyer un fichier {fmt} ?",
            "answer": f"Absolument. Assurez-vous simplement qu'il ne dépasse pas 10 Mo."
        })

    # --- 4. DATA PRIVACY (Variations) ---
    gdpr_qs = [
        "Mes données sont-elles en sécurité ?",
        "Où sont hébergés les fichiers ?",
        "Êtes-vous conforme RGPD ?",
        "Qui a accès à mes documents ?",
        "Combien de temps gardez-vous les fichiers ?"
    ]
    gdpr_ans = "Nous sommes 100% conformes RGPD. Vos données sont hébergées en France (OVH) et chiffrées. Les fichiers sources sont supprimés automatiquement après 30 jours."
    
    for q in gdpr_qs:
        dataset.append({"category": "juridique", "question": q, "answer": gdpr_ans})

    # --- 5. CRM / DASHBOARD FEATURES ---
    features = [
        ("Webhooks", "Vous pouvez recevoir les résultats en temps réel sur votre URL de callback."),
        ("API Keys", "Gérez vos clés secrètes dans l'onglet Développeurs."),
        ("Multi-Upload", "Glissez-déposez jusqu'à 50 fichiers à la fois."),
        ("Export CSV", "Exportez tout votre historique d'analyse en un clic."),
        ("Dark Mode", "L'interface s'adapte automatiquement à votre thème système.")
    ]
    
    for feat, desc in features:
        dataset.append({
            "category": "fonctionnalités",
            "question": f"Comment fonctionne le {feat} ?",
            "answer": desc
        })
        dataset.append({
            "category": "fonctionnalités",
            "question": f"Avez-vous une fonction {feat} ?",
            "answer": f"Oui : {desc}"
        })

    # Save
    with open("backend/data/faq_dataset.json", "w", encoding="utf-8") as f:
        json.dump(dataset, f, indent=4, ensure_ascii=False)
    
    print(f"✅ Généré {len(dataset)} Questions/Réponses dans faq_dataset.json")

if __name__ == "__main__":
    generate_massive_faq()
