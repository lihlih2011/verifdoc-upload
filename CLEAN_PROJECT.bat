@echo off
echo ========================================================
echo        NETTOYAGE DU PROJET (LIBERER 5 GO)
echo ========================================================
echo.
echo ATTENTION : Ce script va supprimer les fichiers d'entrainement
echo et les archives devenues inutiles pour l'application.
echo.
echo Fichiers cibles :
echo - dataset.zip (2.7 GB)
echo - verifdoc_colab_pack.zip (1.9 GB)
echo - VerifDoc Beta.7z (700 MB)
echo - verifdoc_colab_pack_lite.zip (210 MB)
echo.
echo Appuyez sur une touche pour confirmer la suppression...
pause
echo.
echo Suppression en cours...
del "dataset.zip"
del "verifdoc_colab_pack.zip"
del "VerifDoc Beta.7z"
del "verifdoc_colab_pack_lite.zip"
echo.
echo ========================================================
echo        NETTOYAGE TERMINE ! ESPACE LIBERE.
echo ========================================================
echo.
pause
