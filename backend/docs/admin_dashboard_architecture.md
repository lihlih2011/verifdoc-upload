# Architecture du Dashboard Admin – VerifDoc (Version Scale & SAV)

Ce dashboard est conçu pour piloter VerifDoc à grande échelle, en automatisant la gestion des clients et le support technique (SAV).

## 1️⃣ Module : Monitoring de la Performance IA (Le Cœur)
- **Taux de précision (Accuracy) par segment** : Surveiller si l'IA est moins performante sur certains types de documents (ex : les documents venant de l'étranger).
- **Distribution des Scores** : Détecter des dérives (si l'IA commence soudainement à rejeter tout le monde, il y a un bug).
- **Latence & Auto‑scaling** : Suivre le temps de réponse alors que le trafic augmente.

## 2️⃣ Module : Gestion des Utilisateurs & Hiérarchies (CRM Pro)
- **Structure Multi‑Tenancy** : Gestion des comptes "Parents" (Sièges sociaux) et "Enfants" (Agences locales).
- **RBAC (Role‑Based Access Control)** : Définir qui peut faire quoi (Admin, Auditeur, Lecteur seul) au sein d'une entreprise cliente.
- **Onboarding Automatisé** : Suivi de l'activation des nouveaux clients (ont‑ils déposé leur premier document ?).

## 3️⃣ Module : Suivi d'Usage & Big Data
- **Consommation en temps réel** : Volume de scans par client pour la facturation à l'usage.
- **Heatmap d'activité** : À quel moment de la journée/mois tes serveurs sont‑ils les plus sollicités ?
- **Audit Logs** : Historique complet de "Qui a accédé à quel rapport" pour garantir la sécurité juridique.

## 4️⃣ Module : SAV & Support Intelligent (Nouveau)
- **Ticketing intégré** : Centralisation des demandes d'assistance avec niveaux de priorité (Urgent, Bug, Question).
- **Debug Tool (Session Replay)** : Pouvoir visualiser (sans voir les données confidentielles) le parcours technique d'un utilisateur pour comprendre pourquoi un scan a échoué.
- **Knowledge Base IA** : Un agent IA qui suggère des réponses au SAV basées sur la documentation technique de VerifDoc.

## 5️⃣ Module : Anticipation & Churn (Prédiction)
- **Indice de Santé (Health Score)** : Si un client qui scannait 100 documents par jour tombe à 10, le système lève une alerte : "Risque de départ (Churn)".
- **Analyse des tendances** : Anticiper les pics de charge (ex : période de recherche de location en septembre).

## 6️⃣ Module : FinOps & Facturation
- **Alerte de Burn‑rate** : Calcul du bénéfice net après déduction des coûts Google Cloud et Gemini.
- **Automatisation Stripe** : Gestion des factures impayées et relances automatiques.

## Fonctionnalités "Scale" (Focus SAV & Suivi)
| Fonctionnalité | Utilité pour le PM | Pourquoi c'est "Pro" ? |
|----------------|-------------------|----------------------|
| **Multi‑Tenancy** | Gérer des groupes complexes (ex : Century 21). | Permet de signer des contrats à 6 chiffres. |
| **Support Shadowing** | Se connecter (avec accord) au dashboard d'un client pour l'aider. | Résolution ultra‑rapide des problèmes. |
| **Usage‑Based Billing** | Facturer à la consommation réelle automatiquement. | Optimise les revenus sans gestion manuelle. |
| **Status Page** | Page publique indiquant si le service est en ligne ou en maintenance. | Réduit de 50 % les tickets de support pendant une panne. |

## Stack Technique Recommandée
- **Interface** : React / Tailwind.
- **Base de données** : Firestore (pour la flexibilité des profils clients).
- **Ticketing** : Intégration API de Zendesk ou Crisp pour le SAV.
- **Analyse** : BigQuery pour les rapports d'usage massifs.

---
*Ce document sert de référence pour le développement futur du Dashboard Admin Pro, afin d'assurer une architecture scalable, sécurisée et orientée support client.*
