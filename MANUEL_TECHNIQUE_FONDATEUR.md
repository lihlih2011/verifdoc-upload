# 📘 Manuel Technique - VerifDoc (Pour le Fondateur)

Ce document est votre tableau de bord. Il explique comment fonctionne votre produit et comment réagir en cas de problème, même sans connaissances techniques approfondies.

---

## 🏗️ Architecture Simplifiée

Votre site fonctionne sur un serveur (VPS) chez OVH. C'est comme un ordinateur allumé 24/24h.
Sur cet ordinateur, il y a des "boîtes" (Conteneurs Docker) qui tournent :

1.  **Frontend (La Vitrine) :** Ce que voient les clients (React).
2.  **Backend (Le Moteur) :** L'intelligence artificielle qui analyse les PDF (Python).
3.  **Nginx (Le Portier) :** Il reçoit les visiteurs et les dirige vers la bonne boîte.

Ces boîtes sont emballées ensemble grâce à **Docker Compose**.

---

## 🚨 Procédures d'Urgence (Si le site est KO)

### Cas 1 : Le site est lent ou ne charge pas (Timeout)
C'est souvent une surcharge de mémoire (RAM), comme un PC avec trop d'onglets Chrome ouverts.

**Solution : Le "Hard Reboot"**
1.  Connectez-vous à votre espace client **OVH**.
2.  Allez dans la section **VPS**.
3.  Sélectionnez votre serveur (`vps-.....`).
4.  Cliquez sur le bouton **"Redémarrer" (Reboot)**.
5.  Attendez 2 minutes. Le site redémarrera tout seul automatiquement.

### Cas 2 : "Erreur 502 Bad Gateway"
Le "Portier" (Nginx) est là, mais le "Moteur" (Backend) est éteint.

**Solution : Redéploiement via GitHub**
1.  Allez sur votre projet GitHub.
2.  Allez dans l'onglet **"Actions"**.
3.  Regardez si le dernier déploiement est vert (Succès) ou rouge (Échec).
4.  Si c'est rouge, relancez-le (Bouton "Re-run jobs").

---

## 🚀 Comment Mettre à Jour le Site ?

Vous n'avez pas besoin de toucher au serveur. Tout est automatisé.

1.  **Sur votre PC :** Vous (ou l'IA) modifiez le code.
2.  **Validation :** Vous faites un "Commit" et un "Push" vers GitHub.
3.  **Automatisme :** GitHub détecte le changement. Il :
    *   Construit la nouvelle version.
    *   La teste.
    *   Se connecte à votre serveur OVH.
    *   Remplace l'ancienne version par la nouvelle sans coupure (ou presque).

---

## 💰 Gérer les Prix et les Offres

Les prix sont définis à deux endroits (pour l'instant, c'est une sécurité) :
1.  `frontend/src/pages/LandingPageV2.tsx` : La page d'accueil publique.
2.  `frontend/src/components/dashboard/PricingPlans.tsx` : Le tableau de bord une fois connecté.

Si vous voulez changer un prix, demandez à l'IA : *"Mets à jour le prix Expert à 350€ dans tous les fichiers"*.

---

## 🛡️ Sécurité & Données

*   **Données Clients :** Stockées dans le dossier `data/` sur le serveur.
*   **Connexion :** Sécurisée par SSH (Clé cryptée). Pas de mot de passe simple piratable.
*   **Sauvegarde :** GitHub contient tout votre code source. Si le serveur brûle, on peut le reconstruire en 10 minutes sur un autre serveur.

---

## 📞 Support Technique

Si vous êtes bloqué et que l'IA ne répond pas :
1.  Vérifiez le statut d'OVH (http://travaux.ovh.net/).
2.  Redémarrez le VPS (Cas 1).
3.  Si rien ne marche, engagez un freelance "DevOps" sur Malt/Upwork pour une intervention ponctuelle (1h). Donnez-lui accès à ce dépôt GitHub, il comprendra tout de suite.
