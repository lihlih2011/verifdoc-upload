@echo off
echo ===================================================
echo   MISE A JOUR & ENVOI VERS GITHUB
echo ===================================================
echo.
echo 1. Sauvegarde des changements...
git add .
git commit -m "Mise a jour automatique (Agent)"

echo.
echo 2. Envoi vers https://github.com/lihlih2011/verifdoc-engine
git push -u origin main

echo.
echo TERMINÉ ! 
echo Allez maintenant sur Render.com pour que le déploiement redémarre.
echo.
pause
