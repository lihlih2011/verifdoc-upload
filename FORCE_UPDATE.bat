@echo off
title MISE A JOUR FORCEE RENDER
color 0C

echo ========================================================
echo       REPARATION RENDER (FORCE PUSH)
echo ========================================================
echo.

echo 1. Ajout de requirements.txt uniquement...
git add backend/requirements.txt
git add .gitignore

echo.
echo 2. Commit...
git commit -m "Fix requirements for Render"

echo.
echo 3. Envoi FORCE (Ecrasement de GitHub)...
git push -f origin main

echo.
echo ========================================================
echo       C'EST REPARE !
echo ========================================================
echo Render va redemarrer automatiquement dans 1 minute.
echo.
pause
