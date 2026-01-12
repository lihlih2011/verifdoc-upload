@echo off
chcp 65001 >nul
echo ========================================================
echo      SAUVEGARDE INTEGRALE VERS DISQUE EXTERNE (D:)
echo ========================================================
echo.

set "SOURCE=%~dp0"
set "SOURCE=%SOURCE:~0,-1%"
set "DEST=D:\VerifDoc_Project_Backup"

echo Source : %SOURCE%
echo Destin : %DEST%
echo.

if not exist "D:\" (
    echo [ERREUR] Le disque D:\ n'est pas détecté !
    echo Veuillez brancher votre disque externe.
    pause
    exit /b
)

echo Démarrage de la synchronisation (Miroir)...
echo Veuillez patienter...
echo.

:: Robocopy options:
:: /MIR : Miroir (Copie tout, supprime dans la destination ce qui n'est plus dans la source)
:: /XD : Exclude Directories (On exclut node_modules temporairement pour la vitesse, et les caches)
:: /R:3 : Retry 3 fois si échec copie fichier
:: /W:5 : Wait 5 sec entre retry

robocopy "%SOURCE%" "%DEST%" /MIR /XD "node_modules" "__pycache__" ".venv" ".git\objects\pack" /R:3 /W:5

echo.
if %ERRORLEVEL% LEQ 7 (
    echo [SUCCES] Sauvegarde terminée avec succès !
) else (
    echo [ATTENTION] Des erreurs ont été rencontrées (Fichiers ouverts ?).
)

echo.
echo Vos fichiers sont sécurisés sur D:\VerifDoc_Project_Backup
pause
