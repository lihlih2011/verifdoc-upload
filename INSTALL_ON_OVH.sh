#!/bin/bash

# ONE-CLICK INSTALL SCRIPT FOR OVH VPS
# Usage: sudo ./INSTALL_ON_OVH.sh

set -e # Exit immediately if a command exits with a non-zero status.

APP_DIR="/opt/verifdoc"
REPO_URL="https://github.com/lihlih2011/verifdoc-upload.git"

echo "🚀 STARTING VERIFDOC INSTALLATION..."

# 1. System Updates
echo "📦 Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y curl git ca-certificates gnupg lsb-release

# 2. Docker Installation
echo "🐳 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "   Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
else
    echo "   Docker already installed."
fi

# 3. Directory Setup
echo "📂 Setting up project directory at $APP_DIR..."
if [ -d "$APP_DIR" ]; then
    echo "   Directory exists. Cleaning up specific files..."
    # Optionally: sudo rm -rf "$APP_DIR" # uncomment to wipe clean every time
else
    sudo mkdir -p "$APP_DIR"
    sudo chown -R $USER:$USER "$APP_DIR"
fi

# 4. Clone/Update Repository
echo "📥 Fetching code..."
if [ -d "$APP_DIR/.git" ]; then
    cd "$APP_DIR"
    echo "   Pulling latest changes..."
    git fetch --all
    git reset --hard origin/main
else
    echo "   Cloning repository..."
    # Ensure parent dir exists and is accessible
    sudo mkdir -p "$APP_DIR"
    sudo chown $USER:$USER "$APP_DIR"
    
    # Clone
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 5. Environment Configuration
echo "⚙️  Generating .env.prod..."
cat <<EOF > .env.prod
DATABASE_URL=postgresql://user:password@db:5432/verifdoc
SECRET_KEY=$(openssl rand -hex 32)
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=verifdoc
EOF

# 6. Launch Application
echo "🔥 Building and starting containers..."

# Determine correct command (docker-compose vs docker compose)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    DOCKER_COMPOSE_CMD="docker compose"
fi

# Stop any existing containers to free up ports
sudo $DOCKER_COMPOSE_CMD -f docker-compose.prod.yml down --remove-orphans || true

# Start fresh
sudo $DOCKER_COMPOSE_CMD -f docker-compose.prod.yml up -d --build

# 7. Final Verification
echo ""
echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "------------------------------------------"
echo "Public IP: http://$(curl -s ifconfig.me)"
echo "Check Status: cd $APP_DIR && sudo docker compose -f docker-compose.prod.yml ps"
echo "=========================================="
