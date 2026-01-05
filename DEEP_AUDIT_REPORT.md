# 🕵️‍♂️ VerifDoc - AUDIT PROFOND D'ARCHITECTURE

**Date:** 04 Janvier 2026
**Analyste:** Antigravity (IA)

## 📊 1. État des Lieux Global
Le projet est riche et fonctionnel, mais souffre d'une "Dette Technique" structurelle due à de nombreuses expérimentations.

- **Frontend :** 🟢 **EXCELLENT**. Stack moderne (React/Vite/Tailwind). Code propre. Configuration i18n (Langues) réparée. 
  - *Point d'attention :* Dépendances inutiles (Cartes interactives, Calendriers lourds) à nettoyer.
- **Backend :** 🟠 **MOYEN**. Le cœur (Logic) est bon, mais l'organisation des fichiers est chaotique.
  - *Point critique :* Mélange de fichiers Node.js et Python. Trop de scripts `.py` à la racine (35+ fichiers en vrac).
- **IA Core :** 🟢 **SOLIDE**. Architecture "Lazy Loading" bien implémentée. Moteurs séparés.
- **Infrastructure :** 🟢 **BONNE**. Docker, Watchtower, Github Actions en place.

## 🧹 2. Zones de "Désordre" (À nettoyer)
Ces fichiers polluent la racine et rendent le projet difficile à comprendre pour un nouveau développeur.

### A. Scripts doublons ou obsolètes à la racine :
- `package.json` vs `package.json.bak`
- `check_backend_health.py` / `check_python.py` / `check_admin.py` (À regrouper dans un dossier `scripts/healthcheck`)
- `debug_boot.py` / `debug_extraction.py` (À déplacer dans `scripts/debug`)
- `run_analysis.py` / `run_forged.py` (À déplacer dans `scripts/jobs`)

### B. Moteurs IA (Backend)
- Le dossier `backend/` contient parfois des fichiers de config Node.js (`package.json`, `jest.config.js`) qui semblent être des résidus.

## 🚀 3. Recommandations Actionnables

### Étape 1 : Nettoyage (Housekeeping)
Déplacer tous les fichiers `.py` "orphelins" de la racine vers un dossier `scripts/` organisé.
- `scripts/admin/` (pour create_admin, add_credits...)
- `scripts/diagnostics/` (pour les check_health...)
- `scripts/dataset/` (pour les générateurs de données...)

### Étape 2 : Optimisation Frontend
Supprimer les librairies inutilisées :
- `@fullcalendar/*` (Sauf si vous prévoyez un agenda)
- `@react-jvectormap/*` (Cartes du monde interactives)

### Étape 3 : Consolidation des Tests
Actuellement, les tests sont éparpillés (`tests/`, `api/tests/`, etc.).
Créer une vraie suite de tests unifiée qui lance tout d'un coup.

---

**Conclusion :**
Le "Moteur" est bon. La "Carrosserie" est belle. Mais le "Coffre" est en désordre.
Un grand rangement (Refactoring de structure) est conseillé avant d'ajouter de nouvelles fonctionnalités complexes comme le Paiement.
