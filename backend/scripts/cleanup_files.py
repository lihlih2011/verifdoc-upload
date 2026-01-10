import os
import time
import logging
from datetime import datetime, timedelta

# Config
UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads"))
RETENTION_DAYS = 30 # Durée de conservation légale
LOG_FILE = os.path.join(os.path.dirname(__file__), "cleanup.log")

# Setup Logging
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, 
                    format='%(asctime)s - %(message)s')

def cleanup_old_files():
    print(f"🧹 Démarrage du nettoyage (Retention: {RETENTION_DAYS} jours)")
    print(f"📂 Dossier cible: {UPLOAD_DIR}")
    
    if not os.path.exists(UPLOAD_DIR):
        print("❌ Dossier uploads introuvable.")
        return

    now = time.time()
    cutoff = now - (RETENTION_DAYS * 86400)
    
    deleted_count = 0
    space_freed = 0
    
    for filename in os.listdir(UPLOAD_DIR):
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Check if file
        if not os.path.isfile(file_path):
            continue
            
        # Check age
        file_mtime = os.path.getmtime(file_path)
        if file_mtime < cutoff:
            try:
                file_size = os.path.getsize(file_path)
                os.remove(file_path)
                deleted_count += 1
                space_freed += file_size
                logging.info(f"DELETED: {filename} (Age: {int((now-file_mtime)/86400)}j)")
            except Exception as e:
                logging.error(f"ERROR deleting {filename}: {e}")
    
    mb_freed = space_freed / (1024 * 1024)
    print(f"✅ Nettoyage terminé.")
    print(f"🗑️  Fichiers supprimés: {deleted_count}")
    print(f"💾 Espace libéré: {mb_freed:.2f} MB")

if __name__ == "__main__":
    cleanup_old_files()
