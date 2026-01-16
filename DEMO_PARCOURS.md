# 🎬 GUIDE DE DÉMONSTRATION LIVE : VERIFDOC

Ce document décrit exactement ce qui se passe lors d'une démonstration "Live" pour un Client et pour le Super Admin.

---

## 👤 SCÉNARIO 1 : LE CLIENT (L'utilisateur final)
**Objectif :** S'inscrire, vérifier son éligibilité, et lancer une analyse.

### 1. L'Inscription (L'Effet Waouh)
*   **Action :** Le client arrive sur la Landing Page et clique sur "Essayer Gratuitement".
*   **Ce qu'il voit :** Une page de login/signup ultra-rapide.
*   **Magie :** Dès qu'il valide son email, il est redirigé vers le **Onboarding Wizard**.
*   **Fonctionnalité Clé :** On ne lui demande pas de carte bancaire tout de suite. On lui offre **150 crédits gratuits** MAIS ils sont "verrouillés" 🔒.

### 2. Le Dashboard (La Frustration Positive)
*   **Ce qu'il voit :** Un tableau de bord propre (`ProDashboard`).
*   **Le Blocage :** Il veut lancer une analyse, mais il voit un gros cadenas : *"Vérification Requise"*.
*   **L'Incitation :** "Complétez votre profil entreprise (SIRET, Secteur) pour débloquer vos 150 crédits".
*   **Pourquoi on fait ça ?** Pour filtrer les curieux des vrais pros.

### 3. L'Action (Le Scan)
*   **Action :** Il remplit son SIRET. Les crédits se débloquent (Animés !).
*   **Upload :** Il glisse un PDF (Fausse fiche de paie).
*   **Résultat Live :** L'IA analyse en 3 secondes et affiche :
    *   🔴 **ALERTE FRAUDE** (Score 98%)
    *   🔍 **Détails :** "Police d'écriture incohérente", "Métadonnées modifiées".
*   **Conclusion Client :** "C'est puissant, je veux acheter plus de crédits."

---

## 👑 SCÉNARIO 2 : LE SUPER ADMIN (VOUS - GOD MODE)
**Objectif :** Surveiller, aider, et contrôler tout le système.

### 1. L'Entrée Secrète
*   **URL :** `/dashboard/admin` (Accessible uniquement avec votre compte).
*   **Ce que vous voyez :** Le **AdminDashboard** (interface sombre, style hacker/nasa).

### 2. La Tour de Contrôle (Monitoring)
*   **KPIs en temps réel :**
    *   👥 **Total Users :** Vous voyez le chiffre monter quand le client s'inscrit.
    *   💰 **Crédits Consommés :** Vous voyez l'argent virtuel brûler.
    *   ⚙️ **Santé Serveur :** CPU/RAM (pour savoir si ça tient la charge).

### 3. Le Pouvoir Financier ("Banquier")
*   **Cas d'école :** Le client Jean Dupont vous appelle : *"Je n'ai pas pu finir mon test, j'ai plus de crédits !"*.
*   **Votre Action :**
    1.  Recherche "Dupont" dans la barre admin.
    2.  Clic sur le bouton 💳 **[Ajouter Crédits]**.
    3.  Vous tapez `+500`.
    4.  **Résultat :** Le client voit instantanément son solde augmenter sans rafraîchir. C'est magique pour le support.

### 4. Le Pouvoir de Police ("Ban Hammer")
*   **Cas d'école :** Vous voyez une inscription avec l'email `hacker@evil.com`.
*   **Votre Action :**
    1.  Vous le repérez dans la liste.
    2.  Clic sur le bouclier rouge 🛡️ **[BANNIR]**.
    3.  **Résultat :** Son token est invalidé. Il est déconnecté de force. Il ne peut plus rien faire.

---

## 🚀 RÉSUMÉ DES POUVOIRS
| Rôle | Ce qu'il peut faire | Ce qu'il ne voit PAS |
| :--- | :--- | :--- |
| **CLIENT** | Scanner, Payer, Voir son historique | Les autres clients, le serveur, les réglages IA |
| **ADMIN** | **TOUT VOIR**, Modifier les soldes, Bannir, Voir les logs | (Rien ne lui est caché) |
