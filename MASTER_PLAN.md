# 📋 VERIFDOC - MASTER PLAN (ROADMAP DYNAMIQUE)

Ce fichier est la source de vérité unique pour le développement du projet.
Il est mis à jour dynamiquement par l'agent à chaque étape.

## 🧠 SYSTÈME DE PRIORISATION
- **SCORE Z (Complexité/Impact)** : De 1 (Facile, Faible impact) à 10 (Critique, Haut impact).
- **PRIORITÉ** : P0 (Bloquant), P1 (Urgent), P2 (Important), P3 (Confort).
- **STATUT** : [ ] À faire, [~] En cours, [x] Terminé.

---

## 🚀 PHASE 1 : SOUVERAINETÉ & INFRASTRUCTURE (READY TO DEPLOY)
Cette phase assure que l'application peut vivre en ligne de manière autonome et sécurisée.

| ID | Tâche | Description | Score Z | Prio | Statut |
|----|-------|-------------|---------|------|--------|
| **1.1** | **Server Initialization** | Script d'installation VPS (Docker, Python 3.11, Firewall). | 8/10 | **P0** | [x] |
| **1.2** | **SSL & DNS** | Script `setup_ssl.sh` pour HTTPS (Certbot) et config Nginx. | 9/10 | **P0** | [ ] |
| **1.3** | **Production CI/CD** | Pipeline GitHub Actions pour déploiement auto sur VPS. | 7/10 | P1 | [ ] |

---

## 🕵️ PHASE 2 : MOTEUR D'INTELLIGENCE (CORE BUSINESS)
Le cœur de la valeur ajoutée : détecter la fraude mieux que les autres.

| ID | Tâche | Description | Score Z | Prio | Statut |
|----|-------|-------------|---------|------|--------|
| **2.1** | **PDF Report Design V2** | Mise en page "Luxe" (Filigrane, Logo, Verdict Visuel). | 4/10 | **P0** | [x] |
| **2.2** | **EasyOCR Integration** | Remplacer les placeholders IA par une vraie lecture OCR locale. | 9/10 | **P0** | [x] |
| **2.3** | **Fraud Logic V2** | Algorithmes avec Veto de Sécurité (Score > 80% si anomalie critique). | 10/10 | **P0** | [x] |
| **2.4** | **Heatmap Visualizer** | Afficher les zones falsifiées directement sur le Dashboard. | 8/10 | P1 | [x] |

---

## 💼 PHASE 3 : SAAS & MONÉTISATION (BUSINESS LOGIC)
Transformer l'outil technique en produit vendable.

| ID | Tâche | Description | Score Z | Prio | Statut |
|----|-------|-------------|---------|------|--------|
| **3.1** | **Système de Crédits** | Backend pour gérer les tokens (1 token = 1 analyse). | 7/10 | **P0** | [x] |
| **3.2** | **Stripe Checkout** | Intégration paiement pour recharge de crédits. | 8/10 | P1 | [_] |
| **3.3** | **Role Based Access** | Distinction Admin (Didier) vs Client vs Auditeur. | 6/10 | P1 | [x] |

---

## ✨ PHASE 4 : UX/UI & FRONTEND (WOW EFFECT)
L'expérience utilisateur qui fait signer les contrats.

| ID | Tâche | Description | Score Z | Prio | Statut |
|----|-------|-------------|---------|------|--------|
| **4.1** | **Upload Fix & Feedback** | Bouton téléchargement PDF robuste et feedback visuel. | 5/10 | **P0** | [x] |
| **4.2** | **Landing Page Pro** | Design style "Stripe" pour la page d'accueil publique. | 3/10 | P2 | [x] |
| **4.3** | **Live Demo Experience** | Carrousel Interactif + Upload Gratuit + Protection Empreinte. | 6/10 | P1 | [x] |
| **4.4** | **Mobile Responsiveness** | Adapter le dashboard pour tablette/mobile. | 4/10 | P2 | [ ] |

---

## 🤖 PHASE 5 : AI & AUTOMATION (SMART ASSISTANT)
L'intelligence conversationnelle pour guider les visiteurs et supporter les clients.

| ID | Tâche | Description | Score Z | Prio | Statut |
|----|-------|-------------|---------|------|--------|
| **5.1** | **Smart Sales Chatbot (Landing)** | Chatbot d'accueil intelligent pour qualifier les leads et répondre aux questions commerciales. | 8/10 | P1 | [x] |
| **5.2** | **Support & Expert Bot (Dashboard)** | Assistant technique pour les clients connectés. Explique les résultats d'analyse. | 9/10 | P1 | [x] |


### Phase 6 : Vitrine Commerciale & Monétisation (Terminé)
- [x] **Tâche 6.1 : Landing Page V2**
  - [x] Design "Cyber-Souverain" Dark Mode & Split-Screen.
  - [x] Logo 3D Flottant & Animations.
  - [x] Formulaire Lead Capture.
  - [x] **Live Demo Module** (Visualisation Temps Réel).
  - [x] **Anti-Abus** (Fingerprinting Device).

- [x] **Tâche 6.2 : Système de Paiement**
  - [x] Backend : Endpoint `/checkout-session`.
  - [x] Frontend : Page "Pricing" & Modale de Paiement.

### Phase 7 : Intelligence & Forensique Avancée (Terminé)
- [x] **Tâche 7.1 : Analyse Spectrale (FFT)**
  - [x] Module `spectral_engine.py` pour détection fréquentielle.
- [x] **Tâche 7.2 : Audit Sémantique**
  - [x] Module `semantic_engine.py` (Regex Heuristiques & LLM-Ready).
- [x] **Tâche 7.3 : Historique & Doublons**
  - [x] Hachage SHA-256 et base de données `DocumentRecord`.
  - [x] Rapport PDF Haute-Fidélité avec tableau multi-couches.
- [x] **Tâche 7.4 : Batch API (Enterprise)**
  - [x] Endpoint `batch/upload` pour analyse de volume.

## 🛑 JOURNAL DES BLOQUANTS & IDÉES (BACKLOG)
- [ ] **Déploiement Production** : Exécuter `setup_ssl.sh` sur le VPS.
- [ ] **Stripe Live** : Remplacer les clés de test par les clés de prod.
- [ ] **Mobile** : Optimiser le dashboard pour petits écrans.

---

**DERNIÈRE ACTION AUTOMATIQUE :**
- Déploiement "Live Demo" Complet.
- Intégration API Publique & Batch.
- Mise à jour Requirements & Packaging.

**SUIVANT SUGGÉRÉ :**
👉 **Mise en Production (Deploy)** : Le code est prêt pour le serveur de prod.
