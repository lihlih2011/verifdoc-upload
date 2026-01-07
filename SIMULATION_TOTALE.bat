@echo off
title VerifDoc - SIMULATION TOTALE
color 0A

echo ========================================================
echo       LANCEMENT DE LA SIMULATION VERIFDOC REEL
echo ========================================================
echo.

:: Set Project Root
set PROJECT_ROOT=%~dp0
cd /d "%PROJECT_ROOT%"
set PYTHONPATH=%PROJECT_ROOT%

:: 1. Lancement Backend (avec PYTHONPATH correct pour les imports 'backend.app...')
echo [1/2] Demarrage du Serveur API (Backend)...
:: On lance depuis la racine pour que 'backend' soit vu comme un package
start "VerifDoc BACKEND" cmd /k "pip install -r backend/requirements.txt && python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000"

:: Pause pour laisser uvicorn démarrer
timeout /t 5 >nul

:: 2. Lancement Frontend
echo [2/2] Demarrage de l'Interface (Frontend)...
start "VerifDoc FRONTEND" cmd /k "cd frontend && npm install && npm run dev"

:: 3. Ouverture Navigateur
echo.
echo Ouverture de votre navigateur...
timeout /t 4 >nul
start http://localhost:5173/dashboard

echo.
echo ========================================================
echo                 SYSTEME OPERATIONNEL
echo ========================================================
echo Gardez les fenetres noires ouvertes !
echo.
pause
