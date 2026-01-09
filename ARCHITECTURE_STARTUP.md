# 🏗️ VerifDoc - Architecture Technique & Scalabilité (Série A)

Ce document détaille l'architecture technique de **VerifDoc**, conçue pour la haute performance, la sécurité bancaire et la scalabilité horizontale. Elle suit les standards "Industry Best Practices" pour un SaaS B2B DeepTech.

---

## 1. 🗺️ Vue d'Ensemble (The Big Picture)

Le système repose sur un modèle **Microservices Hybride**, optimisé pour le traitement IA lourd tout en garantissant une interface utilisateur fluide (Zero-Latency UI).

```mermaid
graph TD
    User[👤 Client / Entreprise] -->|HTTPS / TLS 1.3| Edge[🛡️ Cloudflare / Caddy Edge]
    Edge -->|Routing & SSL| Frontend[💻 Frontend React SPA]
    Edge -->|API REST Secure| Backend[🧠 Backend FastAPI Python]
    
    subgraph "Core Infrastructure (Dockerized)"
        Frontend
        Backend
        
        Backend -->|Query/Transact| DB[(🗄️ PostgreSQL 15)]
        Backend -->|Debit/Credit| Redis[(⚡ Redis Cache & Queue)]
        
        subgraph "AI Forensic Engine 🕵️"
            Meta[Metadata Inspector]
            Spectral[Spectral Analysis (ELA)]
            Semantic[Semantic Consistency]
            OCR[Secure OCR Tesseract]
        end
        
        Backend --> Meta
        Backend --> Spectral
        Backend --> Semantic
        Backend --> OCR
    end
    
    subgraph "External Ecosystem"
        Backend -->|Payment Webhooks| Stripe[💳 Stripe Payments]
        Backend -->|Sync Leads| HubSpot[📢 HubSpot/CRM]
        Backend -->|Audit Logs| S3[☁️ Secure Storage (Archives)]
    end
```

---

## 2. 🧱 La Stack Technologique (Choix Stratégiques)

### 🅰️ Frontend : "Zero-Latency Experience"
*   **Framework** : **React 18** + **Vite**.
    *   *Pourquoi ?* React est le standard mondial. Vite garantit des builds instantanés.
*   **UI/UX** : **Tailwind CSS** + **Framer Motion**.
    *   *Pourquoi ?* Design système atomique, ultra-léger et animations fluides (60fps) pour une sensation "Premium".
*   **State Gen** : **Context API** + **React Query**.
    *   *Pourquoi ?* Gestion optimisée du cache serveur, fini les chargements inutiles.

### 🅱️ Backend : "The Heavy Lifter"
*   **Core** : **FastAPI (Python 3.10)**.
    *   *Pourquoi ?* Le framework Python le plus rapide du marché (Asynchronous). Indispensable pour traiter des I/O (Uploads) et de l'IA simultanément sans bloquer.
*   **AI Processing** : **PyTorch** & **OpenCV**.
    *   *Pourquoi ?* Standards industriels pour la vision par ordinateur. Permet le déploiement de modèles Deep Learning (ResNet/EfficientNet) pour la détection de faux.
*   **PDF Engine** : **PyMuPDF (Fitz)** (vs pypdf).
    *   *Pourquoi ?* 10x plus rapide pour le rendu et l'extraction de structure sur les PDF complexes.

### 🅾️ Data & Persistence : "Bank-Grade Reliability"
*   **Database** : **PostgreSQL 15**.
    *   *Pourquoi ?* ACID Compliant (Atomicité, Cohérence, Isolation, Durabilité). Crucial pour gérer des **Crédits Financiers** et des **Transactions**. On ne joue pas avec l'argent des clients (NoSQL interdit pour la facturation).
*   **ORM** : **SQLAlchemy 2.0**.
    *   *Pourquoi ?* Abstraction puissante, prévient 100% des Injections SQL.

---

## 3. 🛡️ Sécurité & Conformité (Enterprise Ready)

Une architecture "Startup" ne vaut rien si elle n'est pas sécurisée. VerifDoc intègre la sécurité *by design*.

1.  **Isolation des Données** : Chaque analyse est traitée dans un conteneur éphémère. Les fichiers sont supprimés post-analyse (Privacy by Default), sauf option d'archivage "Coffre-fort".
2.  **Chiffrement** :
    *   **At Rest** : Les bases de données sont chiffrées (AES-256).
    *   **In Transit** : TLS 1.3 forcé via Caddy (Reverse Proxy).
3.  **Authentification** : **OAuth2 / JWT (JSON Web Tokens)**.
    *   Stateless auth. Permet de scaler le backend sur plusieurs serveurs sans problème de session.
4.  **Anti-Abus** : **Rate Limiting (SlowAPI)**.
    *   Protection contre les attaques DDOS et le scraping massif.
    *   Fingerprinting navigateur pour bloquer les abus de "Free Trial".

---

## 4. 📈 Stratégie de Scalabilité (0 à 1M Users)

Comment VerifDoc passe de 100 à 1 000 000 d'utilisateurs ?

*   **Fase 1 (Actuelle - MVP/Seed)** :
    *   Un seul serveur VPS puissant (Vertical Scaling).
    *   Docker Compose orchestre tout.
    *   Capacité : ~10 000 analyses/jour.

*   **Fase 2 (Série A - Growth)** :
    *   Séparation DB et App sur des serveurs distincts.
    *   Ajout de **Celery + Redis** pour gérer les files d'attente d'analyse (Job Queue). L'utilisateur n'attend plus, il reçoit une notif quand c'est prêt.

*   **Fase 3 (Scale-up - Enterprise)** :
    *   Kubernetes (K8s) pour orchestrer des centaines de conteneurs Backend.
    *   Load Balancer pour répartir le trafic mondialement.

---

## 5. 💰 Architecture de Monétisation (The Cash Machine)

Le système de paiement n'est pas "collé" à côté, il est au cœur du système.

*   **Unit of Value** : Le "Crédit".
    *   1 Analyse = X Crédits.
    *   Ce modèle permet de vendre des packs (B2C) ET des abonnements récurrents (B2B).
*   **Webhook Driven** :
    *   Stripe ne "parle" pas au Frontend. Stripe parle au Backend via Webhooks signés cryptographiquement.
    *   Impossible de hacker ses crédits en modifiant le code HTML/JS.

---

**Conclusion** : VerifDoc n'est pas un "petit script". C'est une plateforme d'ingénierie logicielle robuste, conçue pour être auditée, vendue et scalée.
