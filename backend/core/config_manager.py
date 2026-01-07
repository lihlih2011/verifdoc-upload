import json
import os
from typing import Dict, Any

CONFIG_FILE = "backend/integration_config.json"

class ConfigManager:
    @staticmethod
    def _load_config() -> Dict[str, Any]:
        if not os.path.exists(CONFIG_FILE):
            return {}
        try:
            with open(CONFIG_FILE, 'r') as f:
                return json.load(f)
        except Exception:
            return {}

    @staticmethod
    def _save_config(config: Dict[str, Any]):
        os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
        with open(CONFIG_FILE, 'w') as f:
            json.dump(config, f, indent=4)

    @staticmethod
    def get_odoo_config():
        config = ConfigManager._load_config()
        return config.get('odoo', {})

    @staticmethod
    def save_odoo_config(url, db, user, key, active):
        config = ConfigManager._load_config()
        config['odoo'] = {
            "url": url,
            "db": db,
            "user": user,
            "key": key,
            "active": active
        }
        ConfigManager._save_config(config)
        return config['odoo']

    @staticmethod
    def get_provider_status():
        config = ConfigManager._load_config()
        return {
            "odoo_active": config.get('odoo', {}).get('active', False),
            "webhook_active": config.get('webhook', {}).get('active', False)
        }
