@echo off
color 0A
title CONNEXION SERVEUR VERIFDOC (OVH)
echo ========================================================
echo       CONNEXION AU SERVEUR B2-15 (VERIFDOC PRO)
echo ========================================================
echo.
echo Cible : ubuntu@51.68.90.149
echo Cle SSH : MonPC (Automatique)
echo.
echo Appuyez sur UNE TOUCHE pour vous connecter...
pause >nul

ssh ubuntu@51.68.90.149

echo.
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ERREUR DE CONNEXION !
    echo Le serveur a refuse la cle "MonPC".
    echo.
    echo SOLUTION DE SECOURS :
    echo Allez sur le site OVH -> Onglet "Console VNC" (en haut de votre capture).
    echo Cela ouvrira un ecran noir directement dans le navigateur.
    pause
) else (
    echo Deconnexion reussie.
    pause
)
