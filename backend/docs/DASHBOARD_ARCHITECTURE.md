# 🏗️ ARCHITECTURE FONCTIONNELLE DES DASHBOARDS (PAR RÔLE)

Ce document détaille les fonctionnalités accessibles pour chaque type d'utilisateur sur la plateforme VerifDoc.

---

## 👑 1. LE SUPER ADMIN (God Mode)
**Utilisateur Cible :** Vous (Fondateur) & CTO.
**Accès :** `/dashboard/admin`
**Objectif :** Piloter le Business et l'Infrastructure.

### 🔹 Fonctionnalités Clés :
1.  **Gestion des Utilisateurs (IAM)** :
    *   Voir la liste complète des inscrits.
    *   **Action :** Bannir / Activer un utilisateur.
    *   **Action :** Changer le rôle (promouvoir un User en Agent).
    *   **Action :** Voir le solde de crédits de n'importe qui.

2.  **CRM & Ventes (Sales Pipeline)** :
    *   Vue Kanban/Liste des **Leads** (Prospects).
    *   Vue des **Deals** (Opportunités en cours).
    *   **Génération de Contrats** : Créer un contrat PDF/HTML en 1 clic.
    *   **Signature** : Suivi des signatures électroniques.

3.  **Finance & Crédits** :
    *   **Banque Centrale** : Ajouter manuellement des crédits à un client (Offre commerciale ou test).
    *   Voir le CA global et les crédits consommés.

4.  **Monitoring Technique** :
    *   Logs Système (Qui a fait quoi ?).
    *   Santé GPU/API (Temps de réponse, Erreurs).

---

## 🏢 2. LE CLIENT ENTREPRISE (SaaS User)
**Utilisateur Cible :** Banques, Assurances, Agences Immo.
**Accès :** `/dashboard` (Home)
**Objectif :** Analyser des documents et gérer son abonnement.

### 🔹 Fonctionnalités Clés :
1.  **Scanner Intelligent (Core)** :
    *   Zone d'Upload (Drag & Drop).
    *   Feedback Temps Réel (Barre de progression "Scan IA").
    *   **Résultat Rapide** : Verdict "Authentique" ou "Suspect" en <3s.

2.  **Historique & Rapports** :
    *   Liste de tous les documents analysés.
    *   **Vue Détail** : Voir les preuves (Heatmaps, ELA, OCR).
    *   **Téléchargement** : Rapport PDF Certifié (avec filigrane).

3.  **Facturation & Abonnement** :
    *   Voir son solde de crédits actuel.
    *   **Acheter des Crédits** : Intégration Stripe (Checkout).
    *   Télécharger ses factures d'achat.

4.  **Gestion d'Équipe (Team)** :
    *   Inviter des collègues sur le même compte Entreprise (Partage de crédits).

---

## 🕵️ 3. L'AGENT AUDITEUR (Expert Forensique)
**Utilisateur Cible :** Expert humain validant les cas douteux.
**Accès :** `/dashboard/audit` (À construire)
**Objectif :** Valider manuellement les documents marqués "Incertains" par l'IA.

### 🔹 Fonctionnalités Clés :
1.  **Queue de Validation** :
    *   Liste des documents avec score entre 40% et 70% (Zone Grise).
    *   Tri par priorité (Date, Client VIP).

2.  **Studio d'Expertise (Deep Dive)** :
    *   **Outils Avancés** : Loupe, Ajustement de contraste sur les Heatmaps.
    *   **Comparaison** : Vue Split-Screen (Original vs Filtre ELA).
    *   **Annotation** : Entourer manuellement une zone de fraude.

3.  **Verdict Final** :
    *   Bouton **"Valider Authentique"** (L'IA s'est trompée).
    *   Bouton **"Confirmer Fraude"** (Envoi d'alerte au client).

---

## 🛠️ MATRICE DES DROITS (RBAC)

| Fonctionnalité | CLIENT | AGENT | ADMIN |
| :--- | :---: | :---: | :---: |
| Scanner Doc | ✅ | ✅ | ✅ |
| Voir ses Rapports | ✅ | ✅ | ✅ |
| Voir Rapports des Autres | ❌ | ✅ (Queue) | ✅ |
| Acheter Crédits | ✅ | ❌ | ❌ |
| Ajouter Crédits (Gratuit) | ❌ | ❌ | ✅ |
| Générer Contrat | ❌ | ❌ | ✅ |
| Bannir User | ❌ | ❌ | ✅ |
