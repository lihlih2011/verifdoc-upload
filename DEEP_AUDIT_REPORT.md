# 🕵️‍♂️ SITE & PRODUCT AUDIT REPORT : VerifDoc Beta

**Date de mise à jour** : 10 Janvier 2026 (11:50)
**Statut** : 🟢 ACTION PLAN IN PROGRESS
**Scope** : Site Web Public, Tunnel de Conversion, Produit Technique.

---

## 1. 🚦 Synthèse Exécutive (UPDATED)
La phase de **"Crédibilité Marketing"** (Priorité 1) est achevée. Le site dispose désormais d'un contenu expert (Blog), de pages verticales ciblées (Immo/Bank) et de formulaires fonctionnels.
Le design a été validé (Logo original + Dark Mode + Pricing "Pay-as-you-go").

**Prochain Goulot d'Étranglement** : La monétisation et la conformité stricte (KYC Biométrique).

| Domaine | Note Initiale | Note Actuelle | Verdict |
| :--- | :---: | :---: | :--- |
| **Design Branding** | 9/10 | **10/10** | **Perfect**. Identité "Institutional SaaS" validée. Pricing rassurant. |
| **Site Marketing** | 4/10 | **9/10** | **Corrigé**. Blog actif, Pages Solutions Immo & Banque en ligne. |
| **Conversion** | 5/10 | **8/10** | **Amélioré**. Formulaires connectés. Offre "Sans Engagement" plus attractive. |
| **Produit Core** | 9/10 | **9/10** | Reste inchangé (Robuste). |
| **Monétisation** | 2/10 | **2/10** | **BLOQUANT**. Stripe non connecté. Impossible d'acheter les packs créés. |

---

## 2. 📝 Statut des Actions (TRACKING)

### ✅ FAIT (COMPLETED)
1.  **Réparation du Blog** : 3 Articles de fond créés (LCB-FT, Fraude, Guide). Liens fonctionnels.
2.  **Pages Verticales** : `/solutions/real-estate` et `/solutions/banking` créées et linkées.
3.  **Formulaires** : Contact form connecté au backend (Endpoint `/api/public/contact`).
4.  **Refonte Pricing** : Passage au modèle "Achats de Crédits" (199€/pack) pour rassurer les PME.
5.  **Navigation** : Header corrigé et adapté au Dark Mode.

### 🚧 À FAIRE (IN PROGRESS - PRIORITÉ 2)
1.  **Intégration Stripe (Checkout)** :
    *   Le bouton "Acheter Pack" pointe vers `/signup?plan=pro`.
    *   Il faut que le Signup déclenche un **Payment Link Stripe** ou un Checkout Session pour créditer le compte.
    *   *Action* : Configurer `stripe-python` backend et Webhook.

2.  **Dashboard Client "Vue Crédits"** :
    *   L'utilisateur doit voir son solde de crédits (100, 1000...) diminuer à chaque scan.
    *   Actuellement, le concept de "Crédits" est marketing, pas technique.

3.  **KYC Module (Biométrie)** :
    *   Pour vendre aux banques (Plan Forensique), il faut vérifier *la personne* (Selfie), pas juste le document.
    *   *Action* : Intégrer une brique Liveness (ex: FaceTec, ou API externe).

---

## 3. ⚙️ Détail Technique : Intégration Paiement (Next Step)
Actuellement, l'API ne gère pas les "Credits Wallets".

**Architecture Cible :**
1.  **DB Update** : Ajouter `credits_balance` (int) à la table `User`.
2.  **API Route** : `POST /api/billing/create-checkout-session` (Stripe).
3.  **Webhook** : `POST /api/webhooks/stripe` -> Si `payment_succeeded`, alors `user.credits_balance += 1000`.
4.  **Middleware** : `POST /api/analyze` -> Vérifier `user.credits_balance > 0`, sinon erreur 402 Payment Required.

---

## 4. 📅 Plan d'Action (Phase 2)

### SEMAINE 2 (Focus Revenus)
1.  **Backend** : Implémenter la logique "Wallet de Crédits".
2.  **Stripe** : Connecter le mode Test, permettre l'achat d'un Pack "Starter" fictif.
3.  **Frontend** : Afficher "Crédits restants : 50" dans la Sidebar du Dashboard.

### SEMAINE 3 (Focus Compliance)
1.  **API Docs** : Générer le Swagger/Redoc public sur `/docs`.
2.  **Sécurité** : Audit de vulnérabilité basique (OWASP ZAP) avant le go-live.

---

**Décision Requise du CEO (User)** :
Voulez-vous que je commence par **l'Intégration Stripe (Paiement)** ou par la **Gestion des Crédits (Backend)** ?
