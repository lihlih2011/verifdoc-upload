@echo off
title ASSISTANT DEPLOIEMENT VERIFDOC (FORCE FINAL)
color 0C

echo ========================================================
echo       MISE A JOUR FORCEE (CORRECTIF RENDER)
echo ========================================================
echo.

set REPO_URL=https://github.com/lihlih2011/verifdoc-upload.git

echo 1. Configuration...
git config user.email "admin@verifdoc.io"
git config user.name "VerifDoc Admin"

echo.
echo 2. Ajout des correctifs...
git add backend/requirements.txt
git add .

echo.
echo 3. Commit...
git commit -m "Fix Render Dependencies" 

echo.
echo 4. Envoi (FORCE)...
:: Le -f sert a ecraser les conflits si GitHub rale
git push -f origin main

echo.
echo ========================================================
echo       CORRECTIF ENVOYE !
echo ========================================================
pause
