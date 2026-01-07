# 🗺️ VerifDoc : Audit & Roadmap Technique
**Dernière mise à jour :** 04 Janvier 2026 (14:35)

---

## 1. ✅ TERMINÉ & SÉCURISÉ (Phase 1)
*Les fondations sont solides.*

### 🧹 Propreté & Structure
- **Grand Ménage :** Les scripts "vrac" ont été rangés dans `scripts/` (admin, audit, dataset).
- **Organisation :** Arborescence claire `backend/` vs `frontend/` vs `scripts/`.
- **Qualité Code :** ESLint en place coté Frontend.

### 🖥️ Produit (Visible)
- **Frontend :** Design Premium, Logo Officiel, Traductions OK (EN/FR).
- **Démo :** Le carrousel "Scanner" fonctionne sur la page d'accueil.
- **Serveur :** Backend optimisé ("Lazy Loading") pour supporter la charge OVH.

---

## 2. 🚧 EN COURS : LA PRIORITÉ "DATASET V2"
*C'est le chantier actuel pour rendre l'IA invincible.*

- **Outil de Simulation :** ✅ Script `simulate_print_scan.py` CRÉÉ.
  - *Il permet de transformer des PDF parfaits en "scans sales" pour l'entraînement.*
- **Action Requise :** 
  1. Mettre des vrais documents (PDF/JPG) dans le dossier `uploads/`.
  2. Lancer le script pour générer le dossier `DATASET_V2_SCANNED`.
  3. Ré-entraîner l'IA sur ces nouvelles données "sales".

---

## 3. 🎯 PROCHAINES ÉTAPES (Phase 3)

### 💰 Business (L'Argent)
- **Stripe :** Le système de paiement n'est PAS connecté.
- **Offres :** Les boutons "Acheter" de la page Pricing ne mènent nulle part.

### 🔌 Intégration Réelle
- **Dashboard :** La page `Invoices` et `Clients` affiche encore parfois des données de démo. Il faut brancher la base de données PostgreSQL définitivement.
- **Upload Live :** Tester si un fichier envoyé depuis le Dashboard passe bien par toute la chaîne d'analyse jusqu'au résultat final.

---

## 📝 CONCLUSION DE L'AUDIT
Vous avez franchi le cap du "Prototype". Vous avez maintenant une "Alpha Propre".
La clé du succès est maintenant dans la **Data (V2)** et l'**Argent (Stripe)**.
