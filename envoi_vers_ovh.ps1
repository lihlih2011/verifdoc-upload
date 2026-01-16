# Script PowerShell pour déployer vers OVH
$ServerIP = "51.210.159.95"
$User = "debian" # Utilisateur par défaut Debian 12 OVH
$RemotePath = "/home/debian/verifdoc"

Write-Host "🚀 Préparation du déploiement vers $ServerIP..." -ForegroundColor Green

# 1. Création de l'archive (sans les dossiers lourds)
if (Test-Path package.tar.gz) { Remove-Item package.tar.gz }
Write-Host "📦 Compression des fichiers..."
tar -czf package.tar.gz --exclude=node_modules --exclude=venv --exclude=.git --exclude=__pycache__ .

# 2. Envoi vers le serveur
Write-Host "📤 Envoi vers le serveur (Veuillez taper votre mot de passe si demandé)..." -ForegroundColor Yellow
# On crée le dossier d'abord
ssh $User@$ServerIP "mkdir -p $RemotePath"
# On envoie l'archive
scp package.tar.gz $User@$ServerIP:$RemotePath/package.tar.gz

# 3. Exécution sur le serveur
Write-Host "🔧 Installation sur le serveur..." -ForegroundColor Yellow
ssh -t $User@$ServerIP "cd $RemotePath && tar -xzf package.tar.gz && bash deploy.sh"

Write-Host "✅ Fini ! Si tout s'est bien passé, le site est en ligne." -ForegroundColor Green
Remove-Item package.tar.gz
