@echo off
title VERIFDOC - PREPARATION DU DEPLOIEMENT
color 0B
echo =======================================================
echo    SYNCHRONISATION VERS GITHUB (PRE-REQUIS)
echo =======================================================
echo.

echo [1/3] Ajout des fichiers modifies...
git add .

echo.
echo [2/3] Enregistrement des changements (Audit & Fixes)...
git commit -m "FIX: Docker Virtualization & Requirements for Deploy"

echo.
echo [3/3] Envoi vers GitHub...
git push origin HEAD
if %errorlevel% neq 0 (
    echo [ERREUR] Impossible de pousser vers GitHub. Verifiez votre connexion.
    pause
    exit /b
)

echo.
echo =======================================================
echo    CODE EN LIGNE - SUCCES !
echo =======================================================
echo.
echo    OPTIONS DE DEPLOIEMENT MAINTENANT DISPONIBLES :
echo.
echo    CHOIX 1 : DEPLOIEMENT ROBUSTE (Recommande pour l'IA)
echo    - Louez un serveur VPS (OVH, 15Go RAM conseille)
echo    - Connectez-vous en SSH et tapez : "git clone https://github.com/lihlih2011/verifdoc-upload.git"
echo    - Puis "docker compose up"
echo.
echo    CHOIX 2 : DEPLOIEMENT GRATUIT (Test seulement)
echo    - Frontend : Connectez votre GitHub a Vercel.com
echo    - Backend : Connectez votre GitHub a Render.com
echo      (Attention : Risque de crash "Out of Memory" avec l'offre gratuite)
echo.
pause
