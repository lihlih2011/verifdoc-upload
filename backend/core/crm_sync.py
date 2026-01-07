import requests
import json
import logging
import xmlrpc.client
from backend.core.config_manager import ConfigManager

logger = logging.getLogger(__name__)

class CRMSync:
    @staticmethod
    def sync_new_user(user_data: dict):
        """
        Envoie les données du nouvel utilisateur vers le CRM externe.
        """
        try:
            config = ConfigManager.get_odoo_config()
            
            # Si Odoo est actif dans la config
            if config.get('active'):
                CRMSync._send_to_odoo(user_data, config)
            else:
                logger.info("CRM Odoo non actif.")
                
            # On peut aussi supporter Webhook en parallèle si besoin
        except Exception as e:
            logger.error(f"Erreur Sync CRM: {str(e)}")

    @staticmethod
    def _send_to_odoo(user, config):
        """
        Création d'un Lead/Piste dans Odoo CRM via XML-RPC.
        """
        try:
            url = config.get('url')
            db = config.get('db')
            username = config.get('user')
            password = config.get('key')
            
            if not all([url, db, username, password]):
                logger.warning("Config Odoo incomplète.")
                return

            common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
            uid = common.authenticate(db, username, password, {})
            
            if uid:
                models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))
                
                # Création du contact ou du lead
                new_lead_id = models.execute_kw(db, uid, password, 'crm.lead', 'create', [{
                    'name': f"Inscrit VerifDoc: {user.get('full_name', 'Inconnu')}",
                    'email_from': user['email'],
                    'contact_name': user.get('full_name', ''),
                    'description': f"Nouvel utilisateur ID: {user['id']} inscrit sur le SaaS.",
                    'type': 'lead', 
                    'priority': '1', 
                }])
                logger.info(f"Lead Odoo crÃ©Ã© avec succÃ¨s ID: {new_lead_id}")
            else:
                logger.error("Échec authentification Odoo (Check URL/DB/User/Key)")
        except Exception as e:
             logger.error(f"Odoo XML-RPC Error: {str(e)}")

    @staticmethod
    def _send_via_webhook(user):
        """
        Envoie les données à Zapier/n8n
        """
        if "http" not in WEBHOOK_URL:
            return

        payload = {
            "event": "NEW_USER_SIGNUP",
            "data": user,
            "source": "VerifDoc_SaaS"
        }
        try:
            requests.post(WEBHOOK_URL, json=payload, timeout=5)
            logger.info(f"Webhook envoyé pour {user['email']}")
        except Exception as e:
            logger.error(f"Webhook Error: {e}")

# Instance globale
crm = CRMSync()
