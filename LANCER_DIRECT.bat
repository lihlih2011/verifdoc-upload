@echo off
echo ===================================================
echo   DEMARRAGE RAPIDE (METHODE DIRECTE / SANS DOCKER)
echo ===================================================
echo.
echo Lancement du Cerveau (Backend Python)...
start "VerifDoc BACKEND" cmd /k "pip install -r requirements.txt && uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo Lancement du Visage (Frontend React)...
start "VerifDoc FRONTEND" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo   2 FENETRES NOIRES VONT S'OUVRIR.
echo   NE LES FERMEZ PAS !
echo.
echo   ACCES SITE : http://localhost:5173
echo ===================================================
pause
