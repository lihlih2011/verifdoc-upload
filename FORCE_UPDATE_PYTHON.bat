@echo off
title MIGRATION PYTHON 3.10
color 0D

echo ========================================================
echo       FORCER PYTHON 3.10 (STABLE)
echo ========================================================
echo.

echo 1. Ajout de configuration de version...
git add render.yaml
git add runtime.txt
git add backend/requirements.txt

echo.
echo 2. Commit...
git commit -m "Downgrade to Python 3.10 for Compatibility"

echo.
echo 3. Envoi FORCE...
git push -f origin main

echo.
echo ========================================================
echo       DONE !
echo ========================================================
echo Render va redemarrer en Python 3.10. C'est la solution.
echo.
pause
