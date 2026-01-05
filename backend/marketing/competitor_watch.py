import requests
from bs4 import BeautifulSoup
import time
import json
import os

# Liste des concurrents à surveiller
COMPETITORS = [
    {"name": "IDnow", "url": "https://www.idnow.io/pricing/"},
    {"name": "Onfido", "url": "https://onfido.com/"},
    {"name": "Veriff", "url": "https://www.veriff.com/"}
]

HISTORY_FILE = "competitor_history.json"

def get_page_content(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        return response.text
    except Exception as e:
        print(f"Erreur lors de la connexion à {url}: {e}")
        return None

def check_changes():
    print("🕵️‍♂️ Lancement de la surveillance concurrentielle...")
    
    # Charger l'historique
    history = {}
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            history = json.load(f)

    alerts = []

    for comp in COMPETITORS:
        print(f"Analyse de {comp['name']}...")
        content = get_page_content(comp['url'])
        
        if not content:
            continue

        # Extraction basique (Titre + Meta Description + Prix potentiels)
        soup = BeautifulSoup(content, 'html.parser')
        title = soup.title.string if soup.title else "No Title"
        
        # Hachage simple ou stockage longueur pour détecter gros changements
        content_length = len(content)
        
        last_data = history.get(comp['name'], {})
        
        # Détection de changement
        if last_data:
            if abs(content_length - last_data.get('length', 0)) > 500:
                alerts.append(f"⚠️ CHANGEMENT MAJEUR chez {comp['name']} ! La page a changé de taille significativement.")
            if title != last_data.get('title'):
                alerts.append(f"🔁 {comp['name']} a changé son titre : '{last_data.get('title')}' -> '{title}'")
        
        # Mise à jour historique
        history[comp['name']] = {
            "title": title,
            "length": content_length,
            "last_check": time.time()
        }

    # Sauvegarde
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f)

    if alerts:
        print("\n".join(alerts))
        # TODO: Envoyer un email ou une notif Slack ici
    else:
        print("R.A.S. Aucune modification détectée chez les concurrents.")

if __name__ == "__main__":
    check_changes()
