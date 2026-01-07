# 🛡️ STRATÉGIE QUALITÉ & TESTS (QA) - VERIFDOC
### Guide pour Chef de Projet & Lead Tech

Pour passer du statut "Bricolage" au statut "Industriel", nous devons automatiser la confiance. Voici le plan de bataille pour instaurer une culture de la qualité.

---

## 🏗️ 1. L'ARCHITECTURE DE TEST (La Pyramide)

Nous allons mettre en place 3 niveaux de protection :

| Niveau | Outil | Rapidité | Coût Maintien | Objectif |
| :--- | :--- | :--- | :--- | :--- |
| **1. Unitaires** (Backend) | `pytest` | ⚡ Très Rapide | Faible | Vérifier chaque fonction de l'IA isolément. |
| **2. Composants** (Frontend) | `vitest` | 🚀 Rapide | Moyen | Vérifier que les boutons et formulaires React marchent. |
| **3. End-to-End** (E2E) | `Playwright` | 🐢 Lent | Élevé | Simuler un vrai utilisateur (Connexion -> Upload -> Résultat). |

---

## 🛠️ 2. MISE EN PLACE (ACTIONS TECHNIQUES)

### A. Backend (Python/IA)
Nous devons centraliser tous les tests Python.

1.  **Installation** : `pip install pytest pytest-cov`
2.  **Commande de lancement** : `pytest`
3.  **Ce qu'il faut tester en priorité** :
    *   Le calcul du score de fraude (`0` à `100`).
    *   L'extraction OCR (vérifier que le texte sort bien).
    *   L'API d'upload (codes 200 vs 400).

### B. Frontend (React)
Il manque tout l'environnement de test.

1.  **Installation** :
    ```bash
    npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
    ```
2.  **Configuration** : Ajouter `"test": "vitest"` dans `package.json`.
3.  **Ce qu'il faut tester** :
    *   Le composant `PricingModal` (les prix s'affichent-ils ?).
    *   Le formulaire de Login (gestion des erreurs).

---

## 🚦 3. LE WORKFLOW DU CHEF DE PROJET (CI/CD)

Comment s'assurer que personne ne casse le code ?

**La Règle d'Or :** "Interdiction de `git push` si les tests sont rouges."

### Le Processus Idéal (Pipeline) :
1.  Le dév code sa fonctionnalité.
2.  Il lance `npm run test` en local.
3.  Si vert ✅ -> Il `git push`.
4.  Si rouge ❌ -> Il corrige avant d'envoyer.

---

## 📝 4. EXEMPLE DE PREMIER TEST (À DONNER À VOTRE ÉQUIPE OU IA)

**Fichier : `backend/tests/test_score.py`**

```python
def test_calcul_score_fraude():
    # Scénario : Un document parfait
    score_clean = calculer_risque(document="parfait.pdf")
    assert score_clean < 10  # Doit être sûr

    # Scénario : Un document photoshopé
    score_fake = calculer_risque(document="fake_photoshop.pdf")
    assert score_fake > 80   # Doit être détecté
```

---

## 🚀 PROCHAINE ÉTAPE
Voulez-vous que j'installe l'environnement de test Frontend (`vitest`) maintenant pour que vous puissiez dire "Mon projet est testé" ?
