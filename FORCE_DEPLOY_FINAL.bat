@echo off
title REPARATION TOTALE GIT
color 0E

echo ========================================================
echo       SYNCHRONISATION TOTALE (FORCE)
echo ========================================================

:: 1. Nettoyage verrous
if exist .git\index.lock del .git\index.lock

:: 2. Configuration Forcee
git config user.email "admin@verifdoc.io"
git config user.name "VerifDoc Admin"

:: 3. Ajout Brutal
git add .
git add frontend
git add frontend/src
git add frontend/public
git add backend/requirements.txt

:: 4. Commit
git commit -m "FINAL UPLOAD: COMPLETE PROJECT"

:: 5. Push vers Main (Force)
git push -f origin HEAD:main

echo.
echo ========================================================
echo       ENVOI TERMINE !
echo ========================================================
pause
