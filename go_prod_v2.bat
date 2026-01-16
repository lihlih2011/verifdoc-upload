@echo off
TITLE Deploiement VerifDoc - VERSION 2 (ROOT)
COLOR 0A

:: TENTATIVE AVEC L'UTILISATEUR ROOT
set SERVER_IP=51.210.159.95
set USER=root
set REMOTE_PATH=/root/verifdoc

echo ========================================================
echo   DEPLOIEMENT AVEC UTILISATEUR "ROOT"
echo ========================================================
echo.

:: 1. Compression
echo [ETAPE 1] Creation de l'archive...
if exist package.tar.gz del package.tar.gz
tar -czf package.tar.gz --exclude=package.tar.gz --exclude=node_modules --exclude=venv --exclude=.git --exclude=__pycache__ .
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: La commande TAR a echoue. Avez-vous Windows 10 ou 11 ?
    pause
    exit
)
echo OK archive creee.
echo.

:: 2. Envoi
echo [ETAPE 2] Connexion au serveur %SERVER_IP%...
echo Veuillez taper le mot de passe de "root" quand demande.
echo (Rien ne s'affiche quand vous tapez, c'est normal !)
echo.
ssh %USER%@%SERVER_IP% "mkdir -p %REMOTE_PATH%"
scp package.tar.gz %USER%@%SERVER_IP%:%REMOTE_PATH%/package.tar.gz

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERREUR: Connexion refusee ou mot de passe incorrect.
    pause
    exit
)
echo OK Envoi reussi.
echo.

:: 3. Installation
echo [ETAPE 3] Lancement de l'installation...
ssh -t %USER%@%SERVER_IP% "cd %REMOTE_PATH% && tar -xzf package.tar.gz && bash deploy.sh"

echo.
echo ========================================================
echo   FINI !
echo ========================================================
pause
