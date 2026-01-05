# SCÉNARIO DE SIMULATION RÉELLE - VERIFDOC
Suivez ce guide une fois le script "SIMULATION_TOTALE.bat" lancé.

## Étape 1 : Inscription Client (Le Déclencheur)
1. Allez sur **http://localhost:5173/auth/signup**
2. Créez un compte "Client Test" (ex: Jean Dupont, jean@entreprise.com).
3. Validez l'inscription.
   👉 **Résultat attendu** :
   - Vous êtes redirigé vers le Dashboard Pro.
   - SI vous avez configuré Odoo : Un "Lead" a été créé dans votre Odoo.

## Étape 2 : Validation de l'Identité (KYB)
1. Sur le Dashboard (**http://localhost:5173/dashboard**).
2. Vérifiez que les onglets "Analyse Live" sont verrouillés (Cadenas).
3. Cliquez sur "Compléter mon profil".
4. Entrez un nom d'entreprise fictif (ex: "Dupont SAS").
   👉 **Résultat attendu** :
   - Le profil passe à 100%.
   - Vous gagnez 150 Crédits gratuits.
   - L'accès aux analyses est débloqué.

## Étape 3 : Simulation d'Analyse (Le Cœur)
1. Allez dans l'onglet **Scanner & Analyse**.
2. Glissez-déposez un fichier (ou utilisez le bouton Upload).
3. Attendez le résultat.
   👉 **Résultat attendu** :
   - Le système analyse le document.
   - Les crédits sont débités (50 crédits).
   - Un rapport "Validé" ou "Frauduleux" s'affiche avec le score de confiance.

## Étape 4 : Supervision Super Admin (Vous)
1. Déconnectez-vous.
2. Connectez-vous en tant qu'Admin (si vous avez un compte admin configuré, sinon créez-en un via `backend/create_admin.py`).
3. Allez sur **http://localhost:5173/dashboard/admin** (ou via le menu "Administration").
4. Consultez :
   - **Logs** : Voir la trace de l'analyse du client Jean Dupont.
   - **Historique** : Voir le document scanné.
   - **Intégrations** : Vérifier que le statut Odoo est vert.

Bonne simulation !
