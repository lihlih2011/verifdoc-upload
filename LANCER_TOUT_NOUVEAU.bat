@echo off
title VERIFDOC - LANCEMENT COMPLET (SANS DOCKER)
color 0A

echo =======================================================
echo    DEMARRAGE DE VERIFDOC (MODE DIRECT)
echo =======================================================
echo.

echo [1/3] Verification des modules Python...
REM pip install -r requirements.txt
echo (Installation completee manuellement pour le MVP)
if %errorlevel% neq 0 (
    echo [ATTENTION] Erreur lors de l'installation des modules Python.
    echo On continue quand meme...
)

echo.
echo [2/3] Verification des modules Node.js...
cd frontend
call npm install
cd ..

echo.
echo [3/3] Lancement des Services...
echo.
echo -------------------------------------------------------
echo  SERVICE 1 : BACKEND (API - Python) va demarrer...
echo -------------------------------------------------------
start "VerifDoc BACKEND" cmd /k "python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo -------------------------------------------------------
echo  SERVICE 2 : FRONTEND (REACT - Node) va demarrer...
echo -------------------------------------------------------
cd frontend
start "VerifDoc FRONTEND" cmd /k "npm run dev"

echo.
echo =======================================================
echo    TOUT EST LANCE !
echo.
echo    Accedez au site ici : http://localhost:5173
echo.
echo    (Ne fermez pas les fenetres noires qui se sont ouvertes)
echo =======================================================
pause
