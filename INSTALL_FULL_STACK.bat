@echo off
title INSTALLATION DE L'ENVIRONNEMENT DE DEV ULTIME (WEB + IA + MOBILE)
color 0A

echo ========================================================
echo   INITIALISATION DU PROJET ET INSTALLATION DES OUTILS
echo   Special Chef de Projet IA - VerifDoc
echo ========================================================
echo.

:: 1. Vérification des pré-requis
echo [1/4] Verification des installations de base...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installe ! Veuillez l'installer depuis nodejs.org
    pause
    exit
) else (
    echo [OK] Node.js detecte.
)

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Python n'est pas installe ! Veuillez l'installer depuis python.org (Cochez 'Add to PATH')
    pause
    exit
) else (
    echo [OK] Python detecte.
)

echo.
echo ========================================================
echo [2/4] Installation des Outils WEB & MOBILE (Global)
echo ========================================================
echo.
echo Installation de Yarn, PNPM et Expo (Mobile)...
call npm install -g yarn pnpm expo-cli create-vite typescript
echo [OK] Outils Web installes.

echo.
echo ========================================================
echo [3/4] Installation de la STACK IA (Python)
echo ========================================================
echo.
echo Installation des bibliotheques de Data Science et IA...
echo Cela peut prendre quelques minutes...
pip install numpy pandas scikit-learn matplotlib seaborn jupyterlab
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install fastapi uvicorn requests python-dotenv
pip install opencv-python easyocr
echo [OK] Stack IA installee.

echo.
echo ========================================================
echo [4/4] Creation d'un dossier de test "MonProjetIA"
echo ========================================================
echo.

if not exist "C:\Users\chaou\Desktop\MonProjetIA" (
    mkdir "C:\Users\chaou\Desktop\MonProjetIA"
    echo Dossier cree sur le bureau.
)

echo.
echo ========================================================
echo   INSTALLATION TERMINEE AVEC SUCCES !
echo ========================================================
echo.
echo Vous etes pret a coder :
echo 1. Web (React)
echo 2. Mobile (Infos React Native)
echo 3. IA (Python/Torch)
echo.
pause
