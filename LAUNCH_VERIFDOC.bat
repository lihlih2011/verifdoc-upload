@echo off
setlocal

echo ========================================================
echo   LANCEMENT DE VERIFDOC (VERSION BETA 1.0)
echo   Architecture: Full-Stack (React + FastAPI)
echo ========================================================
echo.

:: 1. Vérification des prérequis
echo 1. Verification de l'environnement...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERREUR] Python n'est pas installe.
    pause
    exit /b
)
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installe.
    pause
    exit /b
)
echo [OK] Environnement valide.
echo.

:: 2. Démarrage du Backend
echo 2. Demarrage du Backend (Port 8000)...
start "VerifDoc Backend" cmd /k "python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload"
echo [OK] Backend lance en arriere-plan.
echo.

:: 3. Démarrage du Frontend
echo 3. Le Frontend (React) va demarrer (Port 5173)...
echo    Veuillez patienter pendant l'initialisation de Vite...
cd frontend
start "VerifDoc Frontend" cmd /k "npm run dev"
cd ..
echo [OK] Frontend lance.
echo.

echo ========================================================
echo   LANCEMENT TERMINE !
echo   Accedez a l'application ici : http://localhost:5173
echo.
echo   [INFO]
echo   - Backend API : http://localhost:8000/docs
echo   - Super Admin : contact@verifdoc.io / admin
echo ========================================================
pause
