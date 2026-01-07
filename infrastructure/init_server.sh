#!/bin/bash

# ==============================================================================
# VERIFDOC - SERVER INITIALIZATION SCRIPT (Task 1.2)
# Environment: Ubuntu 22.04 LTS (Recommended)
# Sovereign Infrastructure: Python 3.11, Docker, UFW, Nginx
# ==============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

LOG_FILE="/var/log/verifdoc_init.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 Starting VerifDoc Server Initialization..."

# 1. SYSTEM UPDATE
log "📦 Updating System Packages..."
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y software-properties-common curl git wget unzip build-essential

# 2. PYTHON 3.11 SETUP
log "🐍 Installing Python 3.11..."
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt-get update
sudo apt-get install -y python3.11 python3.11-venv python3.11-dev python3-pip

# Verify Python Version
PYTHON_VER=$(python3.11 --version)
log "✅ $PYTHON_VER installed."

# 3. DOCKER & DOCKER COMPOSE
log "🐳 Installing Docker & Docker Compose..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    sudo usermod -aG docker $USER
    log "✅ Docker installed."
else
    log "ℹ️ Docker already installed."
fi

# 4. FIREWALL (UFW) SECURITY
log "🛡️ Configuring Firewall (UFW)..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh             # Port 22
sudo ufw allow http            # Port 80
sudo ufw allow https           # Port 443
# sudo ufw enable  # User must enable manually to avoid lockout if SSH port differs
log "⚠️ UFW rules configured. Run 'sudo ufw enable' manually after verifying SSH port."

# 5. NGINX REVERSE PROXY
log "🌐 Installing Nginx..."
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
log "✅ Nginx installed and running."

# 6. DIRECTORY STRUCTURE
log "📂 Creating Project Directories..."
sudo mkdir -p /var/www/verifdoc/backend
sudo mkdir -p /var/www/verifdoc/frontend
sudo chown -R $USER:$USER /var/www/verifdoc

log "🎉 Server Initialization Complete! Ready for Phase 1.3 (DNS & SSL)."
exit 0
