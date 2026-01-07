@echo off
echo ========================================================
echo   VERIFDOC - SYSTEME DE SURVEILLANCE LOCAL
echo ========================================================
echo.
echo Lancement de Uptime Kuma sur votre ordinateur...
echo Cela permet de surveiller le serveur sans l'alourdir.
echo.

docker run -d --restart=always -p 3001:3001 -v uptime-kuma-local:/app/data --name verifdoc-monitoring louislam/uptime-kuma:1

echo.
echo ========================================================
echo   SUCCES ! Le tableau de bord est accessible ici :
echo   http://localhost:3001
echo ========================================================
echo.
pause
