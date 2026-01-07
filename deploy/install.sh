#!/bin/bash
echo "🚀 DÉMARRAGE INSTALLATION VERIFDOC..."

# 1. Vérifier Docker
if ! command -v docker &> /dev/null
then
    echo "❌ Docker n'est pas installé. Installation auto..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
else
    echo "✅ Docker est déjà installé."
fi

# 2. Build & Launch
echo "🏗️ Construction des conteneurs (Cela peut prendre 5 minutes)..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "✅ DÉPLOIEMENT TERMINÉ !"
echo "🌍 Site accessible sur : http://$(curl -s ifconfig.me)"
