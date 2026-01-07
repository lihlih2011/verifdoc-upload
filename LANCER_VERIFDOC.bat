@echo off
echo ========================================================
echo        DEMARRAGE DE VERIFDOC (MODE PRODUCTION)
echo ========================================================
echo.
echo 1. Construction des conteneurs (Backend + Frontend)...
docker-compose up --build -d
echo.
echo 2. Attente de la disponibilite des services...
timeout /t 10
echo.
echo ========================================================
echo        SITE ACCESSIBLE SUR : http://localhost:5173
echo ========================================================
echo.
pause
