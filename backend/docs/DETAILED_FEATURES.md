# 📋 DÉTAILS FONCTIONNELS COMPLETS (CAHIER DES CHARGES)

Ce document décrit chaque interaction et composant pour chaque écran de l'application.

---

## 🟢 DASHBOARD CLIENT (MAIN APP)

### 1. 🏠 Vue d'Ensemble (Home / Overview)
**URL:** `/dashboard`
*   **Composants :**
    *   **Carte "Solde"** : Affiche le nombre de crédits restants (ex: 42 crédits).
        *   *Interaction* : Bouton "Recharger" -> Ouvre la modale Stripe.
    *   **Zone d'Upload (Drag & Drop)** :
        *   *Format* : PDF, JPG, PNG (Max 10MB).
        *   *Animation* : Barre de progression "Scan IA en cours..." (3 secondes).
        *   *Feedback* : Redirection auto vers "Résultat" une fois fini.
    *   **Tableau "Dernières Analyses"** :
        *   Colonnes : Nom Fichier, Date, Statut (Authentique/Suspect), Score (%).
        *   *Action* : Clic sur une ligne -> Ouvre le rapport détaillé.

### 2. 📄 Vue Résultat (Report Detail)
**URL:** `/dashboard/report/{id}`
*   **En-tête :**
    *   Score de Confiance (Jauge Circulaire 0-100%).
    *   Verdict Textuel (ex: "Document Suspect Détecté").
    *   Bouton **"Télécharger PDF Certifié"**.
*   **Onglets d'Analyse :**
    *   **Onglet "Visuel"** : Affiche le document avec overlay Heatmap (Rouge sur les zones maquillées).
    *   **Onglet "Métadonnées"** : Affiche les dates de création/modif, logiciel utilisé (ex: Photoshop 22.0).
    *   **Onglet "ELA"** : Affiche l'analyse du niveau d'erreur (bruit numérique).
*   **Chatbot (Optionnel)** : "Posez une question à l'IA sur ce document".

### 3. 💳 Vue Facturation (Billing)
**URL:** `/dashboard/billing`
*   **Historique des Achats :**
    *   Liste des factures Stripe (Date, Montant, Lien PDF).
*   **Méthodes de Paiement :**
    *   Carte enregistrée (**** 4242).
    *   Bouton "Ajouter une carte".

---

## 🔴 DASHBOARD SUPER ADMIN (BACKOFFICE)

### 1. 🌍 Vue Globale (Cockpit)
**URL:** `/dashboard/admin`
*   **KPIs Temps Réel :**
    *   Nombre d'utilisateurs total.
    *   Nombre d'analyses aujourd'hui.
    *   CA du mois (en €).
    *   Ressources Serveur (CPU/RAM).
*   **Actions Rapides :**
    *   Bouton "Maintenance Mode" (Coupe l'accès client).
    *   Bouton "Clear Cache".

### 2. 👥 Gestion Utilisateurs (User Management)
**URL:** `/dashboard/admin/users`
*   **Tableau Maître :**
    *   Recherche par Email.
    *   Filtres : Actif/Banni, Payant/Gratuit.
*   **Fiche Utilisateur (Modale) :**
    *   Infos : Nom, Email, IP d'inscription.
    *   **Action "Add Credits"** : Champ Input + Bouton "Ajouter".
    *   **Action "Reset Password"** : Envoie un email de reset.
    *   **Action "BAN"** : Switch ON/OFF.

### 3. 💼 CRM & Contrats (Pipeline)
**URL:** `/dashboard/admin/crm`
*   **Vue Pipeline (Kanban) :**
    *   Colonnes : "Nouveau", "Contacté", "Négociation", "Signé".
    *   Cartes : Nom du prospect, Montant estimé.
*   **Générateur de Contrat :**
    *   Formulaire : Sélectionner Client, Choisir Pack (Service), Prix.
    *   **Bouton "Générer"** : Crée une URL unique sécurisée.
    *   **Lien "Voir Contrat"** : Ouvre la vue Client du contrat (Signature Pad).

### 4. 🧠 Logs & Audit (Forensic Logs)
**URL:** `/dashboard/admin/logs`
*   **Tableau des Événements :**
    *   Qui a fait quoi ? (ex: "User X a uploadé Facture Y").
    *   Erreurs Techniques (ex: "Timeout API OCR").

---

## 🔵 DASHBOARD AGENT (AUDITEUR) - *Futur*

### 1. 📥 Queue de Validation
**URL:** `/dashboard/audit`
*   **Liste d'Attente :**
    *   Documents tagués "Incertains" (Score 40-70%).
    *   Documents signalés par des clients ("Faux Positif").

### 2. 🔬 Studio d'Expertise
**URL:** `/dashboard/audit/studio/{id}`
*   **Outils Avancés :**
    *   Curseur "Seuil de bruit" (Ajuster la sensibilité ELA).
    *   Vue Hexadécimale (Pour les experts hardcores).
    *   Historique des versions (Si PDF incrémental).
*   **Décision :**
    *   Champ Commentaire (ex: "Trace de tampon grossière").
    *   Verdict Final (Valide / Fraude).
