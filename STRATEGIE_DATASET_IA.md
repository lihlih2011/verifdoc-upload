# 🧠 STRATÉGIE DATACENTRIC : CRÉATION DU DATASET SUPRÊME
## Objectif : Entraîner l'IA VerifDoc à devenir invincible

Ce document définit la stratégie pour nourrir l'IA.
La qualité des données (Data) est plus importante que le code.

---

## 1. QUELS DOCUMENTS PRÉPARER ? (Le Menu)
Ne faites pas tout d'un coup. Concentrez-vous sur les documents à **Haut Risque Financier**.

### 🎯 Priorité 1 (Le "Pain Quotidien") :
*   **Fiches de Paie (Payslips)** : Cible n°1 des fraudeurs locatifs.
*   **Avis d'Imposition (Tax Notice)** : La preuve irréfutable (normalement).
*   **Justificatifs de Domicile (EDF, Téléphone)** : Faciles à falsifier.

### 🎯 Priorité 2 (L'Identité) :
*   **CNI / Passeport** : Plus dur (hologrammes), mais critique.
*   **RIB** : Pour détecter les fausses banques.

---

## 2. SCANNER VS FICHIER NUMÉRIQUE ? (Le Dilemme)

### 💻 Cas A : Documents "Natifs Numériques" (Digital Born)
*   *C'est quoi ?* Le PDF que vous téléchargez directement sur le site des impôts ou de votre banque.
*   *Usage IA* : **CRITIQUE**. C'est là que l'IA est la plus forte (analyse des métadonnées, structure interne invisible).
*   *Action* : Gardez-les tels quels. Ne les imprimez pas.

### 🖨️ Cas B : Documents "Scannés / Photographiés" (Analog to Digital)
*   *C'est quoi ?* Une photo d'un papier prise avec un iPhone ou un scan d'imprimante.
*   *Usage IA* : **DIFFICILE**. L'IA perd les métadonnées internes. Elle doit se baser sur le "bruit des pixels" (ELA) et la cohérence visuelle.
*   *Action* : Il faut **AUSSI** en avoir. Les fraudeurs impriment parfois un faux pour le scanner ensuite ("Rescan Attack") pour "laver" les traces numériques.

---

## 3. SCANNER VS TÉLÉPHONE : LA GUERRE DES PIXELS

*   **Scanner (Imprimante)** : Lumière uniforme, plat, haute résolution. C'est "propre".
*   **Téléphone** : Ombres, déformations (perspective), flou, reflets. C'est "sale".
*   **Décision** : Il faut entraîner l'IA sur **LES DEUX**.
    *   Si l'IA ne voit que des scans parfaits, elle ne saura pas lire une photo prise à la va-vite par un client.
    *   *Astuce* : Utilisez votre script de "Data Augmentation" pour simuler des défauts de téléphone sur des scans propres (ajouter du flou, tourner l'image de 2 degrés).

---

## 4. TAXONOMIE (Le Classement)

Oui, il faut classer, sinon l'IA va mélanger les torchons et les serviettes.

**Structure de dossiers recommandée :**

```
DATASET/
├── FR/ (France - Marché Principal)
│   ├── PAYSLIP/
│   │   ├── REAL_DIGITAL/ (Vrais PDF natifs)
│   │   ├── REAL_SCAN/ (Vrais Papiers scannés)
│   │   ├── REAL_PHOTO/ (Vraies Photos smartphone)
│   │   ├── FAKE_GENERATED/ (Générés par votre script tamper.py)
│   │   └── FAKE_HUMAN/ (Faux trouvés sur internet)
│   ├── TAX_NOTICE/
│   └── ID_CARD/
├── US/ (Futur)
└── UK/ (Futur)
```

---

## ✅ PLAN D'ACTION IMMÉDIAT

1.  **Collecte Interne** : Récupérez tous VOS propres documents (Paies, Impôts, Factures) des 5 dernières années. C'est de la "Donnée Or" (Gold Standard) car vous savez qu'elle est vraie.
2.  **Anonymisation** : Utilisez un script pour flouter vos noms/adresses avant l'entraînement (RGPD).
3.  **Génération de Faux** : Lancez `auto_tamper.py` sur ces vrais documents pour créer 1000 fausses versions de chaque.
4.  **Mixité** : Prenez 10 documents, imprimez-les, froissez-les un peu, et prenez-les en photo avec votre téléphone. Ajoutez-les au dataset.

C'est comme ça qu'on bat les fraudeurs : en connaissant la vérité sous toutes ses formes (PDF, Papier, Photo).
