# 🛡️ Audit & Roadmap : Devenir un Leader du marché (Top Tier Competitor)

Ce document analyse l'écart entre **VerifDoc Actuel** et les leaders du marché (Onfido, SumSub, Datadog). Il liste les fonctionnalités manquantes pour garantir fiabilité et compétitivité.

---

## 1. 📊 Audit de l'Existant (Santé du Projet)

### **Frontend (Interface)**
*   ✅ **Design** : Moderne, fluide, "Zero-Latency" (React/Vite). Très bon niveau.
*   ✅ **UX** : Upload simple, Feedback visuel clair.
*   ⚠️ **Manque** :
    *   **Dashboard Mobile** : L'expérience sur smartphone doit être native (PWA).
    *   **Notifications** : Pas d'alertes temps réel (Toasts si une analyse prend du temps).
    *   **Localisation** : Interface uniquement en Français (Concurrents = EN, ES, DE).

### **Backend (Moteur)**
*   ✅ **Performance** : FastAPI est excellent.
*   ✅ **IA** : Moteur hybride (Spectral + Sémantique) très performant pour la fraude documentaire.
*   ⚠️ **Manque** :
    *   **File d'Attente (Queue)** : Si 1000 personnes envoient un fichier en même temps, le serveur sature. Il faut **Redis/Celery** (Architecture Asynchrone).
    *   **Retry Policy** : En cas d'échec d'OCR, pas de nouvelle tentative automatique.

### **Supervision (DevOps)**
*   ✅ **Logs** : Page de logs basique.
*   🔴 **Manque Critique** :
    *   **Monitoring Proactif** : On ne sait pas si le serveur est "lent" avant qu'il ne plante. (Besoin de Prometheus/Grafana ou Datadog).
    *   **Alerting** : Recevoir un SMS/Email si le taux d'erreur dépasse 1%.

---

## 2. 🚀 Fonctionnalités Manquantes (Gap Analysis)

Pour rivaliser avec les géants, voici les "Feature Packs" à développer.

### 📦 Pack 1 : Identité & KYC (Indispensable pour Banques/Assurances)
*   **Face Match Biométrique** : Demander un selfie à l'utilisateur et le comparer avec la photo de la pièce d'identité.
*   **Liveness Check** : Vérifier que le selfie est une personne vivante (clignement des yeux, mouvement) et pas une photo d'écran.

### 📦 Pack 2 : Compliance & AML (Anti-Money Laundering)
*   **Screening Peps/Sanctions** : Vérifier automatiquement si le nom sur le document est sur une liste noire (Interpol, OFAC, Personnes Politiquement Exposées).
    *   *Pourquoi ?* Obligatoire pour toute Fintech cliente.

### 📦 Pack 3 : Enterprise Grade (Pour signer des contrats à 50k€)
*   **SSO (Single Sign-On)** : Connexion via Google Workspace / Microsoft Azure AD pour les équipes.
*   **Audit Logs Certifiés** : Journal inaltérable de "Qui a validé quel dossier et quand ?".
*   **SLA Dashboard** : Preuve contractuelle que le service est UP à 99.9%.

### 📦 Pack 4 : API & Developers
*   **SDK Mobile (iOS/Android)** : Fournir une brique caméra prête à l'emploi pour les applis des clients.
*   **Sandox Mode** : Un environnement de test gratuit pour les devs avant de payer.

---

## 3. 📅 Plan d'Action (Priorités)

1.  **Immédiat (Fiabilité)** :
    *   Installer **Sentry** (Gestion d'erreurs Frontend/Backend).
    *   Mettre en place **UptimeRobot** (Monitoring externe simple).
2.  **Moyen Terme (Offre Commerciale)** :
    *   Développer le **Face Matching** (Pack KYC).
    *   Traduire l'interface en **Anglais**.
3.  **Long Terme (Échelle)** :
    *   Passer sur **Kubernetes** (Architecture Startup Phase 3).

---

**Verdict** : VerifDoc a un moteur de fraude documentaire excellent (mieux que beaucoup de généralistes). Pour devenir un "Concurrent Fiable", il faut passer du statut d'outil d'analyse à celui de **Plateforme de Confiance** (KYC + Compliance + Monitoring).
