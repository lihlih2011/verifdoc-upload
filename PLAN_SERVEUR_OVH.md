# 🦅 GUIDE DÉPLOIEMENT : MIGRATION VERS OVH CLOUD
### Pour VerifDoc (Projet IA + Web)

Passer chez OVH est une excellente décision pour réduire les coûts et maîtriser vos données (Souveraineté, RGPD).
Voici les spécifications exactes à choisir pour ne pas vous tromper.

---

## 🛒 1. LISTE DE COURSES (CE QU'IL FAUT ACHETER)

Votre projet contient de l'IA (`torch`, `easyocr`). Il est gourmand en RAM et CPU.
Ne prenez **PAS** le VPS le moins cher (à 3€), votre IA va planter au démarrage.

### ✅ OPTION RECOMMANDÉE : "Public Cloud" (Flexibilité)
*   **Offre :** Instance **b2-15** (General Purpose)
*   **CPU :** 4 vCores (Indispensable pour l'OCR en parallèle)
*   **RAM :** 15 Go (Nécessaire pour charger les modèles PyTorch en mémoire)
*   **Disque :** 50 Go SSD
*   **Prix estimé :** ~40€ / mois (ou 0.08€/heure)
*   *Pourquoi ?* Rapport puissance/prix imbattable. Si l'IA rame, vous pouvez passer à l'offre supérieure en 1 clic.

### 💰 OPTION ÉCONOMIQUE : "VPS" (Budget serré)
*   **Offre :** VPS **Comfort**
*   **CPU :** 4 vCores
*   **RAM :** 8 Go (Minimum strict, risque de ralentissement si plusieurs utilisateurs)
*   **Prix estimé :** ~25€ / mois
*   *Attention :* Pas d'évolutivité facile vers du GPU plus tard.

### ❌ À ÉVITER
*   **VPS Starter / Value (2-4Go RAM)** : `torch` sera "Killed" par le système immédiatement (Manque de mémoire).
*   **Hébergement Web (Mutualisé)** : Impossible de faire tourner Python/IA, c'est juste pour des sites vitrines PHP.

---

## 🔧 2. PRÉPARATION TECHNIQUE (AVANT L'ACHAT)

1.  **Système d'Exploitation (OS)** : Choisissez **Ubuntu 22.04 LTS** (Le standard, plus stable).
2.  **Clé SSH** : OVH vous demandera une "Clé SSH" pour vous connecter.
    *   Sur votre Windows, ouvrez PowerShell et tapez : `ssh-keygen -t ed25519`
    *   Copiez le contenu du fichier `.pub` généré pour le donner à OVH.

---

## 🚀 3. UNE FOIS LE SERVEUR ACHETÉ (INSTALLATION)

Une fois que vous avez l'IP de votre serveur (ex: `51.x.x.x`), voici les commandes magiques à lancer pour installer VerifDoc :

### A. Connexion
```bash
ssh ubuntu@51.x.x.x
```

### B. Installation de Docker (L'outil qui gère tout)
Ne vous embêtez pas à installer Python, Node, etc. manuellement. Utilisez Docker.
```bash
# 1. Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 2. Récupérer votre code
git clone https://github.com/lihlih2011/verifdoc-upload.git
cd verifdoc-upload
```

### C. Lancement Production
J'ai déjà configuré un fichier `docker-compose.yml` dans votre projet.
```bash
docker compose up -d --build
```
*Et c'est tout. Votre site sera accessible sur `http://51.x.x.x`.*

---

## 🔒 4. SÉCURITÉ (INDISPENSABLE)
Une fois connecté :
1.  **Firewall** : `sudo ufw allow 80`, `sudo ufw allow 443`, `sudo ufw allow 22`, `sudo ufw enable`.
2.  **HTTPS** : Utilisez "Caddy" ou "Nginx Proxy Manager" pour avoir le cadenas vert sécurisé.

---

### 👉 MON CONSEIL DE CHEF DE PROJET
Commencez par l'offre **Public Cloud b2-15**.
C'est du "Pay as you go". Vous pouvez l'allumer pour tester 2h, ça vous coûtera 0,20 centimes. Si ça ne marche pas, vous l'éteignez. Zéro risque.
