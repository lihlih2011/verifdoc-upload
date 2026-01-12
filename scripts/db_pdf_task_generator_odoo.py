
if __name__ == "__main__":
    # Task: Odoo Integration Strategy
    task_content = """
    ## 1. Objectif (Goal)
    Connecter l'ERP Odoo au Dashboard VerifDoc pour centraliser la gestion (CRM, Facturation, Clients).

    ## 2. Pourquoi ? (Value)
    * **Automatisation** : Quand un client s'inscrit sur VerifDoc, il est créé automatiquement dans Odoo.
    * **Facturation** : Odoo gère les abonnements et factures (SaaS) au lieu de recoder un système complexe.
    * **Support** : Les tickets clients remontent directement dans Odoo Helpdesk.

    ## 3. Stratégie Technique (How-To)
    * **Méthode A (Recommandée)** : API XML-RPC (Natif Odoo).
      - Le Backend FastAPI envoie des requêtes à Odoo lors des événements clés (Signup, Payment).
    * **Méthode B (No-Code)** : Webhooks + Zapier/n8n.
      - VerifDoc envoie un webhook -> n8n -> Odoo. Plus simple à mettre en place rapidement.

    ## 4. Plan d'Action
    * [ ] Créer une instance Odoo (SaaS ou Auto-hébergée).
    * [ ] Installer le module 'Contacts' et 'Sales' sur Odoo.
    * [ ] Créer un script Python de test de connexion (xmlrpc) dans le dossier backend/scripts.
    * [ ] Définir les triggers (ex: Nouvel utilisateur = Nouveau Contact Odoo).
    """

    generate_task_pdf("TACHE_INTEGRATION_ODOO.pdf", "STRATÉGIE INTEGRATION ODOO <-> VERIFDOC", task_content)
