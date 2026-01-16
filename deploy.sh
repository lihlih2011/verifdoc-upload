#!/bin/bash
# deploy.sh - À exécuter SUR LE SERVEUR

# Détection de l'utilisateur pour sudo
SUDO=""
if [ "$EUID" -ne 0 ]; then
  SUDO="sudo"
fi

echo "🚀 Démarrage de l'installation sur le serveur..."
sleep 2

# 1. Mise à jour
echo "📦 Mise à jour du système..."
$SUDO apt-get update && $SUDO apt-get upgrade -y

# 2. Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installation de Docker..."
    $SUDO apt-get install -y docker.io docker-compose
    $SUDO systemctl enable docker
    $SUDO systemctl start docker
    # Ajout de l'utilisateur au groupe docker pour éviter sudo plus tard
    $SUDO usermod -aG docker $USER
else
    echo "✅ Docker est déjà installé."
fi

# 3. Domaine (si pas configuré)
if grep -q "localhost" Caddyfile; then
    echo "------------------------------------------------"
    read -p "🌐 Entrez votre nom de domaine (ex: verifdoc.io) : " DOMAIN_NAME
    if [ ! -z "$DOMAIN_NAME" ]; then
        sed -i "s/localhost/$DOMAIN_NAME/g" Caddyfile
        echo "✅ Domaine configuré : $DOMAIN_NAME"
    fi
fi

# 4. .env
if [ ! -f .env ]; then
    echo "⚠️ Création .env défaut"
    echo "STRIPE_PUBLISHABLE_KEY=pk_test_CHANGE_ME" > .env
    echo "STRIPE_SECRET_KEY=sk_test_CHANGE_ME" >> .env
fi

# 5. Lancement
echo "🚀 Démarrage des conteneurs..."
$SUDO docker-compose -f docker-compose.prod.yml down
$SUDO docker-compose -f docker-compose.prod.yml up -d --build

echo "🎉 DÉPLOIEMENT TERMINÉ !"
