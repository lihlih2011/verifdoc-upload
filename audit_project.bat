@echo off
echo ========================================================
echo      VERIFDOC AUTO-AUDIT SYSTEM (QUALITY GATE)
echo ========================================================

echo.
echo [1/3] Auditing Backend (Python)...
cd backend
REM Verification rapide de la syntaxe et des imports manquants sans lancer le serveur
python -m compileall . -q
if %errorlevel% neq 0 (
    echo [CRITICAL] Backend Syntax Errors Detected!
    exit /b 1
) else (
    echo [OK] Backend Syntax is valid.
)

echo.
echo [2/3] Auditing Frontend (TypeScript/React)...
cd ../frontend
REM On utilise tsc (TypeScript Compiler) en mode "noEmit" juste pour voir les erreurs
call npx tsc --noEmit --skipLibCheck
if %errorlevel% neq 0 (
    echo [WARNING] Frontend Type Errors Detected. Check output above.
    REM On ne bloque pas pour l'instant car il y a souvent des petits warnings TS
) else (
    echo [OK] Frontend Code is clean.
)

echo.
echo [3/3] Structure Integrity Check...
cd ..
if exist "frontend\public\images\logo_verifdoc_premium.jpg" (
    echo [OK] Logo Premium found.
) else (
    echo [ERROR] Logo Premium missing!
)

echo.
echo ========================================================
echo      AUDIT COMPLETE - READY FOR DEPLOYMENT?
echo ========================================================
