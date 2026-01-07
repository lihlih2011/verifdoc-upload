# 🚀 MISE EN PRODUCTION REQUISE

Les modifications suivantes ont été effectuées mais **ne sont pas encore visibles sur le site en ligne (verifdoc.io)** car le serveur doit être mis à jour.

## 🛠️ Changements à déployer :
1.  **Correctif Fonts (Erreur 404)** : Remplacement des polices locales manquantes par Google Fonts (Inter).
2.  **Microsoft Clarity** : Correction de l'ID (`uw4n080i2o`) pour le tracking.
3.  **Inscription** : Passage au format JSON pour corriger le bouton "S'inscrire".
4.  **Nouvelles Pages** : Ajout de la page Contact et refonte de la page Entreprise.

## ⚠️ Action Requise (Si vous êtes sur OVH / VPS)

Connectez-vous à votre serveur et lancez ces commandes pour mettre à jour le site :

```bash
# 1. Se connecter au serveur
ssh debian@51.210.109.133

# 2. Aller dans le dossier
cd "VerifDoc Beta"

# 3. Récupérer les modifications (si vous utilisez git)
# git pull origin main 
# OU si vous transférez les fichiers manuellement, assurez-vous que tout est à jour.

# 4. Reconstruire et relancer les conteneurs
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

Si vous utilisez Vercel ou un autre système automatique, assurez-vous de **déclencher un nouveau déploiement** (push git).

> **Note** : Tant que ce redéploiement n'est pas fait, vous verrez toujours les erreurs rouges dans la console et l'ancien site.
