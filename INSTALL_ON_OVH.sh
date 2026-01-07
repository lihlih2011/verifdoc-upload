#!/bin/bash

# Script d'Installation Automatique VerifDoc sur Serveur OVH/Debian/Ubuntu
# A lancer en tant que root

echo "🚀 DÉMARRAGE DE L'INSTALLATION VERIFDOC..."

# 1. Mise à jour du système
echo "📦 Mise à jour du système..."
apt-get update && apt-get upgrade -y
apt-get install -y curl git ca-certificates gnupg lsb-release

# 2. Installation de Docker
echo "🐳 Installation de Docker..."
if ! command -v docker &> /dev/null
then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo "✅ Docker installé."
else
    echo "✅ Docker déjà présent."
fi

# 3. Installation Docker Compose
echo "🎼 Installation de Docker Compose..."
apt-get install -y docker-compose-plugin

# 4. Clonage du Projet
echo "📥 Récupération du code..."
cd /root
if [ -d "verifdoc-upload" ]; then
    echo "⚠️ Le dossier existe déjà. Mise à jour..."
    cd verifdoc-upload
    git pull
else
    git clone https://github.com/lihlih2011/verifdoc-upload.git
    cd verifdoc-upload
fi

# 5. Configuration (Variables d'environnement)
# TODO: Remplacer ces valeurs par les vraies plus tard si besoin
echo "⚙️ Configuration..."
cat <<EOT > .env.prod
DATABASE_URL=postgresql://user:password@db:5432/verifdoc
SECRET_KEY=$(openssl rand -hex 32)
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=verifdoc
EOT

# 6. Lancement
echo "🔥 Lancement des moteurs..."
docker compose -f docker-compose.prod.yml up -d --build

echo "=========================================="
echo "✅ INSTALLATION TERMINÉE !"
echo "Votre site devrait être accessible sur :"
echo "http://$(curl -s ifconfig.me)"
echo "=========================================="
