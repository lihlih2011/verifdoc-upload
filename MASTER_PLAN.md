# 📋 VERIFDOC - MASTER PLAN (ROADMAP DYNAMIQUE)

Ce fichier est la source de vérité unique pour le développement du projet.
Il est aligné avec le **STRATEGIC_BLUEPRINT.md** (Plan Global 2026).

## 🧠 SYSTÈME DE PRIORISATION
- **SCORE Z (Complexité/Impact)** : De 1 (Facile, Faible impact) à 10 (Critique, Haut impact).
- **STATUT** : [ ] À faire, [~] En cours, [x] Terminé.

---

## 🚀 PHASE 1 : INFRASTRUCTURE & DÉPLOIEMENT (COMPLETED) ✅
*Objectif : Le site est en ligne, sécurisé et performant.*

| ID | Tâche | Description | Statut |
|----|-------|-------------|--------|
| **1.1** | **Server Setup** | OVH Public Cloud, Debian 12, Docker, Firewall. | [x] |
| **1.2** | **Domaine & DNS** | Configuration `verifdoc.io` (A Records) + Propagation. | [x] |
| **1.3** | **SSL / HTTPS** | Certificat automatique via Caddy (Reverse Proxy). | [x] |
| **1.4** | **SEO Technique** | Meta Tags, Schema.org, Open Graph, Sitemap. | [x] |
| **1.5** | **CI/CD** | Déploiement via Git Pull + Docker Compose. | [x] |

---

## 💼 PHASE 2 : BUSINESS LOGIC & MONÉTISATION (FOCUS ACTUEL)
*Objectif : Transformer le trafic en revenus récurrents.*

| ID | Tâche | Description | Score Z | Statut |
|----|-------|-------------|---------|--------|
| **2.1** | **Backend Paiement** | API Stripe, Plans (19€, 49€), Gestion Crédits. | 8/10 | [x] |
| **2.2** | **Page Pricing** | Interface Frontend pour choisir son plan (Card Design). | 5/10 | [x] |
| **2.3** | **Webhook Stripe** | Créditer automatiquement le compte après paiement réussi. | 9/10 | [x] |
| **2.4** | **CRM Link** | Connecter les inscriptions "Free Trial" à HubSpot/Log. | 6/10 | [~] |

---

## 🕵️ PHASE 3 : DASHBOARD CLIENT (PRO VERSION)
*Objectif : Fidéliser l'utilisateur après le paiement.*

| ID | Tâche | Description | Score Z | Statut |
|----|-------|-------------|---------|--------|
| **3.1** | **Auth Dashboard** | Connexion sécurisée (JWT) et protection des routes. | 7/10 | [x] |
| **3.2** | **Historique** | Vue liste des documents analysés avec statut. | 6/10 | [~] |
| **3.3** | **Export PDF** | Télécharger le rapport de preuve (Certificat). | 5/10 | [x] |
| **3.4** | **Multi-Utilisateur** | Gestion d'équipe (Admin/Membre) pour les entreprises. | 8/10 | [ ] |

---

## 🤖 PHASE 4 : MOTEUR IA & FORENSIQUE (CORE)
*Objectif : La meilleure détection du marché.*

| ID | Tâche | Description | Score Z | Statut |
|----|-------|-------------|---------|--------|
| **4.1** | **Analyse Spectrale** | Détection ELA/FFT des modifications d'image. | 9/10 | [x] |
| **4.2** | **Cohérence Sémantique** | Vérification des calculs (Revenu vs Impôt). | 8/10 | [x] |
| **4.3** | **OCR Local** | Extraction de texte via Tesseract/EasyOCR (No Cloud API). | 7/10 | [x] |
| **4.4** | **Anti-Abus** | Rate Limiting, IP Ban, Device Fingerprinting. | 6/10 | [x] |

---

## 🛑 JOURNAL DE BORD (DERNIÈRES VICTOIRES)
- **08/01/2026** : 🌍 **MISE EN PRODUCTION RÉUSSIE** sur OVH (verifdoc.io).
- **08/01/2026** : 🔒 Sécurisation HTTPS (SSL) activée.
- **09/01/2026** : 🎨 Nouveau Logo HD & Footer Corporate (Conformité ISO/GDPR).
- **09/01/2026** : 💸 Alignement des prix Stripe sur le Strategic Blueprint.

**PROCHAINE ÉTAPE PRIORITAIRE :**
👉 **Frontend Pricing** : Permettre aux gens de cliquer sur "Payer 49€".
