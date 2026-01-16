@echo off
TITLE Deploiement VerifDoc - FINAL
COLOR 1F

echo ========================================================
echo   DEPLOIEMENT VERIFDOC - DIAGNOSTIC
echo ========================================================
echo.

:: 1. Choix utilisateur
set /p USER="--> Quel est votre utilisateur SSH (ex: debian, root, admin) ? Tapez votre reponse : "
set SERVER_IP=51.210.159.95
set REMOTE_PATH=/home/%USER%/verifdoc

:: Si c'est root, le chemin change
if "%USER%"=="root" set REMOTE_PATH=/root/verifdoc

echo.
echo [INFO] On va se connecter a : %USER%@%SERVER_IP%
echo [INFO] Dossier cible : %REMOTE_PATH%
echo.
pause

:: 2. Compression
echo.
echo ========================================================
echo [ETAPE 1/3] Compression des fichiers...
echo ========================================================
if exist package.tar.gz del package.tar.gz
tar -czf package.tar.gz --exclude=package.tar.gz --exclude=node_modules --exclude=venv --exclude=.git --exclude=__pycache__ .

if %ERRORLEVEL% NEQ 0 (
    COLOR 4F
    echo [ERREUR] Impossible de creer l'archive.
    pause
    exit
)
echo [OK] Archive package.tar.gz creee.

:: 3. Envoi
echo.
echo ========================================================
echo [ETAPE 2/3] Envoi des fichiers...
echo ========================================================
echo.
echo A T T E N T I O N :
echo Tapez votre mot de passe si on vous le demande.
echo (Rien ne s'affiche quand vous tapez, c'est normal !)
echo.
echo Connexion en cours...
ssh %USER%@%SERVER_IP% "mkdir -p %REMOTE_PATH%"
scp package.tar.gz %USER%@%SERVER_IP%:%REMOTE_PATH%/package.tar.gz

if %ERRORLEVEL% NEQ 0 (
    COLOR 4F
    echo.
    echo [ERREUR CRITIQUE] Echec de la connexion.
    echo Causes possibles :
    echo  1. Mauvais mot de passe.
    echo  2. Mauvais utilisateur (essayez 'debian' au lieu de 'root' ou inversement).
    echo  3. Le serveur bloque la connexion.
    pause
    exit
)
echo [OK] Fichiers envoyes.

:: 4. Installation
echo.
echo ========================================================
echo [ETAPE 3/3] Installation sur le serveur...
echo ========================================================
ssh -t %USER%@%SERVER_IP% "cd %REMOTE_PATH% && tar -xzf package.tar.gz && bash deploy.sh"

echo.
echo ========================================================
echo   BRAVO ! INSTALLATION TERMINEE.
echo ========================================================
pause
