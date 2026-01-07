#!/bin/bash

# ==============================================================================
# VERIFDOC - SSL & DNS CONFIGURATION (Task 1.2)
# Environment: Ubuntu 22.04 LTS
# Dependencies: Certbot, Nginx
# ==============================================================================

set -e

DOMAIN="verifdoc.io"
EMAIL="admin@verifdoc.io"
LOG_FILE="/var/log/verifdoc_ssl.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 Starting SSL Configuration for $DOMAIN..."

# 1. INSTALL CERTBOT
log "📦 Installing Certbot..."
if ! command -v certbot &> /dev/null; then
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
    log "✅ Certbot installed."
else
    log "ℹ️ Certbot already installed."
fi

# 2. GENERATE DIFFIE-HELLMAN GROUP (Security Best Practice)
if [ ! -f /etc/nginx/dhparam.pem ]; then
    log "🔐 Generating DH parameters (this may take a while)..."
    sudo openssl dhparam -out /etc/nginx/dhparam.pem 2048
fi

# 3. OBTAIN CERTIFICATE (Dry Run Check First)
log "🧪 Testing Certificate Issuance (Dry Run)..."
sudo certbot certonly --nginx --dry-run -d "$DOMAIN" -d "www.$DOMAIN" --email "$EMAIL" --agree-tos --no-eff-email --keep-until-expiring

if [ $? -eq 0 ]; then
    log "✅ Dry run successful. Proceeding to actual issuance..."
    # Warning: Uncomment this line only on REAL server with valid DNS
    # sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --email "$EMAIL" --agree-tos --no-eff-email --redirect
else
    log "❌ Dry run failed. Check DNS settings."
    exit 1
fi

# 4. NGINX CONFIGURATION (Snippet)
# This creates a robust SSL config snippet to be included in sites-available
cat <<EOF | sudo tee /etc/nginx/conf.d/ssl_params.conf
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_dhparam /etc/nginx/dhparam.pem;
add_header Strict-Transport-Security "max-age=63072000" always;
EOF

log "✅ Nginx SSL parameters configured."

# 5. AUTO-RENEWAL SETUP
log "🔄 Configuring Auto-Renewal..."
# Systemctl timer usually installed by certbot package, verifying...
if systemctl list-timers | grep -q 'certbot'; then
    log "✅ Certbot updates are automated via systemd."
else
    log "⚠️ Certbot timer not found. Adding cron job..."
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /var/spool/cron/crontabs/root
fi

log "🎉 SSL Configuration Script Completed. Run on server after DNS propagation."
exit 0
