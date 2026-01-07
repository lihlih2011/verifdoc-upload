import docker
import time
import logging
import schedule
from datetime import datetime
import requests

# Configuration
LOG_FILE = "/var/log/sentinel.log"
DISCOR_WEBHOOK = "" # Optionnel : pour recevoir des notifs sur votre téléphone

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [SENTINEL] - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger()

def check_services():
    """Vérifie que les conteneurs vitaux sont en vie"""
    required_containers = ['verifdoc-backend', 'verifdoc-frontend']
    client = docker.from_env()
    
    for name in required_containers:
        try:
            # On cherche le conteneur (peu importe le préfixe du dossier)
            containers = client.containers.list(filters={'name': name})
            if not containers:
                logger.warning(f"⚠️ Conteneur {name} introuvable ! Tentative de redémarrage complet...")
                # Ici on pourrait trigger un docker-compose up
                continue

            container = containers[0]
            if container.status != 'running':
                logger.error(f"🔴 ALERTE: {name} est {container.status}. Redémarrage forcé...")
                container.restart()
                logger.info(f"✅ {name} a été redémarré avec succès.")
            else:
                # Healthcheck plus profond (Ping HTTP)
                pass 
                
        except Exception as e:
            logger.error(f"Erreur lors du check de {name}: {e}")

def system_cleanup():
    """Nettoie les vieilles images et conteneurs pour libérer de l'espace"""
    logger.info("🧹 Lancement du nettoyage système quotidien...")
    client = docker.from_env()
    try:
        prune_res = client.images.prune(filters={'dangling': True})
        space_reclaimed = prune_res.get('SpaceReclaimed', 0)
        logger.info(f"✅ Nettoyage terminé. Espace libéré: {space_reclaimed} octets.")
    except Exception as e:
        logger.error(f"Erreur nettoyage: {e}")

def health_check_http():
    """Vérifie que l'API répond vraiment (pas juste que le conteneur est là)"""
    try:
        # On suppose que le sentinel est dans le réseau docker
        r = requests.get('http://backend:5000/health', timeout=5)
        if r.status_code != 200:
            logger.warning(f"⚠️ L'API Backend répond {r.status_code} au lieu de 200.")
    except Exception:
        logger.warning("⚠️ Impossible de contacter le Backend sur le port 5000.")

# Planification
schedule.every(30).seconds.do(check_services)
schedule.every(1).minutes.do(health_check_http)
schedule.every().day.at("04:00").do(system_cleanup) # Nettoyage à 4h du matin

logger.info("🛡️ SENTINEL V1.0 Démarré. Surveillance active.")

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)
