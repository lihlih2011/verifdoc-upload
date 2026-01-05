# ⚙️ SPÉCIFICATIONS TECHNIQUES DÉTAILLÉES

Ce document décortique la logique interne ("Under the Hood") de chaque fonctionnalité majeure.

---

## 🔍 1. LE SCANNER INTELLIGENT (CORE ENGINE)

### 🔹 Flux Technique (Workflow)
1.  **Entrée (Input)** : Fichier binaire (PDF/IMG) envoyé via `POST /api/vds/analyze`.
2.  **Pré-traitement** :
    *   Conversion PDF -> Image (300 DPI) via `pdf2image`.
    *   Redimensionnement "Smart Resize" pour l'IA (standardisé à 1024px de large).
3.  **Analyse Parallèle (Multi-Threading)** : Le moteur `DocumentAnalyzer` lance plusieurs sous-processus :
    *   **OCR (Text)** : Extraction via EasyOCR. Regex pour trouver dates, montants, cohérence.
    *   **ELA (Error Level Analysis)** : Calcul de la compression JPEG. Génération de la Heatmap.
    *   **Copy-Move** : Algorithme de détection de blocs clonés (Keypoints SIFT/ORB).
    *   **Metadonnées** : Lecture des tags EXIF/XMP (Logiciel, Auteur, Date Modif).
4.  **Fusion (Decision Logic)** :
    *   `FusionEngine` agrège les scores (0.0 à 1.0).
    *   **VETO LOGIC** : Si `Copymove > 0.8` OU `Signature == INVALID` -> **OVERRIDE** Score global à 0.9 (ALERTE).
5.  **Sortie (Output)** : JSON structuré + Liens vers les images de preuve (Heatmaps stockées dans `/static/heatmaps`).

### 🔹 Impact Base de Données
*   Table `AnalysisResult` : Création d'une entrée avec `status="COMPLETED"`, `score`, `verdict`.
*   Table `CreditTransaction` : Débit de 1 crédit (`amount=-1`, `type="USAGE"`).

---

## 📝 2. GÉNÉRATEUR DE CONTRATS (SMART CONTRACTS)

### 🔹 Flux Technique
1.  **Trigger** : Admin clique sur "Générer" sur un Deal (`POST /api/crm/contracts/generate`).
2.  **Templating Dynamique** :
    *   Le backend charge un gabarit HTML brut (`Contract Template`).
    *   Injection des variables : `{client_name}`, `{price}`, `{service_type}`, `{date}`.
    *   **Filigrane** : Injection de l'image Logo en Base64 dans le CSS de fond (`opacity: 0.04`).
3.  **Stockage** :
    *   Le contenu HTML complet est stocké dans la DB (Table `Contract`, champ `content_html`).
    *   Un lien unique est généré : `/preview_contract.html?id=XYZ`.
4.  **Signature Client** :
    *   Frontend : Canvas HTML5 capture le tracé (souris/doigt).
    *   Envoi : Array de points (Vectoriel) ou PNG Base64 vers l'API.
5.  **Scellement (Sealing)** :
    *   Backend reçoit la signature.
    *   Mise à jour du HTML pour inclure l'image de la signature à l'endroit prévu.
    *   Le contrat passe en `is_signed=True`.
    *   (Futur) Hashage SHA-256 du document final pour "Blockchain Timestamping".

---

## 🔐 3. AUTHENTIFICATION & RÔLES (RBAC)

### 🔹 Flux Technique
1.  **Login** : `POST /token` (OAuth2 standard).
    *   Vérification Hash `bcrypt`.
    *   Génération JWT (JSON Web Token) signé avec `SECRET_KEY`.
    *   Payload JWT contient : `sub` (email), `role` (admin/user), `exp` (expiration).
2.  **Protection des Routes (Middleware)** :
    *   Dépendance `get_current_user` injectée dans chaque API.
    *   Décodage du Token.
    *   **Check Rôle** : Si route `/api/admin/...`, vérifier `user.role == 'admin'`. Sinon `403 Forbidden`.
3.  **Session Frontend** :
    *   Token stocké dans `localStorage`.
    *   Context React `AuthContext` met à jour l'état global (`isAdmin = true`).

---

## 💰 4. SYSTÈME DE CRÉDITS (WALLET)

### 🔹 Flux Technique
1.  **Modèle Atomique** : Pas de simple champ `credits = 50`.
2.  **Ledger Approach (Grand Livre)** :
    *   On ne modifie jamais directement le solde.
    *   On AJOUTE une transaction : `CreditTransaction(user_id=1, amount=+100, type="PURCHASE")`.
    *   On AJOUTE une transaction : `CreditTransaction(user_id=1, amount=-1, type="USAGE")`.
3.  **Calcul du Solde** :
    *   `Balance = SUM(transactions.amount)`.
    *   Avantage : Traçabilité totale (Audit Trail) en cas de litige.
4.  **Consommation** :
    *   Avant chaque Analyse : `Check Balance > 0`.
    *   Si OK : Analyse + Transaction débit.
    *   Si KO : Erreur `402 Payment Required`.
