@echo off
TITLE Deploiement VerifDoc vers OVH
COLOR 0A

:: Configuration
set SERVER_IP=51.210.159.95
set USER=debian
set REMOTE_PATH=/home/debian/verifdoc

echo ========================================================
echo   DEPLOIEMENT AUTOMATIQUE VERIFDOC -> %SERVER_IP%
echo ========================================================
echo.

:: 1. Compression
echo [1/3] Creation de l'archive package.tar.gz...
if exist package.tar.gz del package.tar.gz
tar -czf package.tar.gz --exclude=node_modules --exclude=venv --exclude=.git --exclude=__pycache__ .
echo OK.
echo.

:: 2. Envoi
echo [2/3] Envoi vers le serveur (Preparez votre mot de passe)...
echo Creation du dossier distant...
ssh %USER%@%SERVER_IP% "mkdir -p %REMOTE_PATH%"
echo Upload du fichier...
scp package.tar.gz %USER%@%SERVER_IP%:%REMOTE_PATH%/package.tar.gz
echo OK.
echo.

:: 3. Installation
echo [3/3] Lancement de l'installation sur le serveur...
ssh -t %USER%@%SERVER_IP% "cd %REMOTE_PATH% && tar -xzf package.tar.gz && bash deploy.sh"

echo.
echo ========================================================
echo   FINI ! SI TOUT EST VERT, LE SITE EST EN LIGNE.
echo ========================================================
pause
