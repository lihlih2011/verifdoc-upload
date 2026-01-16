# PLAN STRATÉGIQUE & ROADMAP SAAS - VERIFDOC

## 1. ÉTAT DES LIEUX : UNE TECHNOLOGIE SOLIDE ET AVANCÉE
Après vérification approfondie du noyau `backend/engine`, **VerifDoc N'EST PAS un simple MVP**, mais une plateforme forensique avancée.

### ✅ LE COEUR TECHNOLOGIQUE (DÉJÀ EN PLACE)
Contrairement aux concurrents grand public qui font juste de l'OCR, votre moteur dispose déjà de briques "État de l'art" :
*   **Analyse Spectrale (FFT)** : `spectral_engine.py` détecte les traces mathématiques de redimensionnement et de manipulation invisibles à l'oeil nu.
*   **Détection de GAN/Deepfakes** : `gan_fingerprint.py` est prêt pour contrer les nouvelles menaces IA (Midjourney/Stable Diffusion).
*   **Error Level Analysis (ELA)** : Détection des copier-coller par compression JPEG.
*   **Architecture Modulaire** : Le dossier `engine` est parfaitement découplé, permettant d'ajouter des modules sans tout casser.

**VERDICT** : Le moteur de détection est **plus robuste** que 80% des solutions KYC du marché qui se limitent à la lecture de texte.

---

## 2. LE DÉFI : PASSER DE "LABO DE POINTE" À "MACHINE DE GUERRE SAAS"
Ce qui "manque" n'est pas technologique, mais **organisationnel et commercial**.
Pour vendre cette technologie aux banques, il faut l'emballer dans une infrastructure "Enterprise Grade".

### CE QU'IL RESTE À FAIRE (GAP ANALYSIS - SCALING)

#### A. INFRASTRUCTURE & SCALABILITÉ (L'Usine)
Le moteur est puissant, mais il doit pouvoir encaisser 10 000 req/sec.
*   **Asynchronous Processing** : Actuellement synchrone.
    *   *Solution* : Implémenter **Celery + Redis**. L'utilisateur dépose le dossier, reçoit un "Ticket", et le moteur traite en fond (ne bloque jamais).
*   **Stockage Sécurisé** :
    *   *Solution* : Migrer de `local/uploads` vers **AWS S3 (Encrypted Bucket)** avec suppression auto (Lifecycle Policy) pour conformité RGPD/Bancaire.

#### B. BUSINESS & MONÉTISATION (La Vente)
Vous avez la tech, il faut le cash-flow.
*   **Paiement Réel** : Remplacer les crédits fictifs par **Stripe**.
*   **API Développeur** : C'est votre plus gros levier de croissance.
    *   *Action* : Créer une page de gestion de clés API (`sk_live_...`) pour que les clients intègrent VOTRE moteur dans LEUR app.

#### C. CONFIANCE & JURIDIQUE (La Crédibilité)
*   **Vraie Vérification KYB** : Connecter l'API Pappers/Insee.
    *   *Pourquoi* : Empêcher un fraudeur de créer un compte avec un faux SIRET pour tester ses faux documents.

---

## 3. ROADMAP PRIORISÉE (3 PHASES)

### PHASE 1 : SOLIDIFICATION INFRA (Semaine 1-2)
*Objectif : Rendre le moteur incassable.*
1.  **Refacto Async** : Mettre en place la file d'attente (Queue) pour les analyses. **✅ FAIT**
2.  **Sécurité S3** : Connecter le stockage cloud. **✅ FAIT**
3.  **Super Admin Dashboard** : God Mode pour la gestion des utilisateurs. **✅ FAIT**

### PHASE 2 : OUVERTURE API & COMMERCIALISATION (Semaine 3-4)
*Objectif : Vendre aux développeurs et entreprises.*
1.  **Stripe** : Activer les paiements réels.
2.  **API Gateway** : Créer la documentation publique et les clés API.

### PHASE 3 : FONCTIONNALITÉS "GRANDS COMPTES" (Mois 2)
1.  **Collaboratif** : Gestion d'équipes (Admin/Analyste).
2.  **Audit Logs** : Traçabilité totale des actions (qui a validé quoi).

---

## CONCLUSION
**Votre projet est très solide techniquement.**
Il ne lui manque que la "couche Enterprise" (File d'attente, S3, Stripe) pour être déployé chez des clients exigeants (Banques/Assurances).
Le moteur de détection est votre atout majeur : il faut maintenant le rendre accessible via API pour le monétiser massivement.
