import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- TRADUCTIONS ---

const resources = {
    fr: {
        translation: {
            nav: {
                product: "Produit",
                how_it_works: "Comment ça marche",
                pricing: "Tarifs",
                testimonials: "Témoignages",
                company: "Entreprise",
                login: "Connexion",
                start_audit: "Essai gratuit"
            },
            hero: {
                certified: "Technologie Forensique V3",
                compliant: "IA Temps Réel",
                title_part1: "La Vérité,",
                title_part2: "Révélée par l'IA.",
                subtitle: "Détectez instantanément les faux documents (PDF, JPG, PNG).\nProtégez votre entreprise contre la fraude documentaire avec notre moteur d'analyse forensique certifié ISO 27001.",
                cta_verify: "Démarrer l'Analyse",
                cta_demo: "Voir la Démo",
                trial_details: "14j"
            },
            widget: {
                title: "Vérificateur de documents",
                status_real: "Fiable",
                status_fake: "Risque Élevé",
                drop_title: "Glissez votre document ici",
                drop_desc: "Supporte PDF, JPG, PNG (Max 10MB)",
                analyzing: "ANALYSE EN COURS...",
                result_title: "RÉSULTAT DE L'ANALYSE",
                score_confidence: "Score de Confiance",
                meta_ok: "Métadonnées cohérentes",
                sig_valid: "Signature Valide",
                structure_integrity: "Intégrité Structurelle",
                risk_low: "FAIBLE",
                risk_high: "ÉLEVÉ"
            },
            features: {
                title: "Vérification avancée des documents",
                subtitle: "Technologie d'IA de pointe pour détecter la falsification de documents et garantir l'authenticité.",
                items: {
                    ai_detection: { title: "Conformité Documentaire", desc: "Certification de l'intégrité de vos pièces et conformité aux standards administratifs en vigueur." },
                    database: { title: "Contrôle de Cohérence", desc: "Vérification croisée des éléments structurels pour prévenir l'usage de faux et l'incohérence des données." },
                    signature: { title: "Authenticité de la Source", desc: "Validation juridique des émetteurs et traçabilité de la chaîne de confiance (eIDAS)." },
                    deepfake: { title: "Lutte Anti-Fraude", desc: "Protection avancée contre les nouvelles typologies de fraude et l'usurpation d'identité." },
                    ela: { title: "Analyse Structurelle", desc: "Détection des anomalies et des modifications non autorisées sur les documents officiels." },
                    genai: { title: "Fiabilité de l'Information", desc: "Garantie d'authenticité des données face aux risques de générations synthétiques." }
                }
            },
            steps: {
                title: "Processus simple",
                subtitle: "Vérifiez vos documents en trois étapes simples.",
                step1: { title: "Télécharger", desc: "Glissez et déposez votre PDF ou image." },
                step2: { title: "Vérifier en secondes", desc: "Analyse instantanée des métadonnées et signatures." },
                step3: { title: "Obtenir les résultats", desc: "Rapport détaillé sur l'authenticité." }
            },
            pricing: {
                title: "Plans afférents",
                subtitle: "Choisissez le plan qui convient à vos besoins de vérification",
                essential: { name: "Essentiel", desc: "Vérification de base. < 200/mois" },
                compliance: { name: "Conformité", desc: "Pour entreprises régulières. 200 - 3000/mois" },
                forensic: { name: "Médecine Légale", desc: "Haut volume > 3000/mois. Recommandé." },
                enterprise: { name: "Entreprise", desc: "Besoins personnalisés." },
                cta: "Commencer",
                cta_contact: "Contactez-nous",
                min_monthly: "minimum mensuel",
                verification: "/vérification"
            },
            footer: {
                description: "Vérifiez vos PDFs avec les grands standards des nouveaux modèles et avec la collaboration des grands centres de recherche en IA. Détectez instantanément les faux documents grâce à notre technologie d'IA avancée.",
                columns: {
                    product: {
                        title: "Produit",
                        home: "Page d'accueil",
                        how_it_works: "Comment ça marche",
                        pricing: "Tarifs",
                        testimonials: "Témoignages",
                        schedule_demo: "Programmer une démo"
                    },
                    company: {
                        title: "Entreprise",
                        about: "À propos de nous",
                        contact: "Contact"
                    },
                    legal: {
                        title: "Légal",
                        privacy: "Confidentialité",
                        terms: "Conditions",
                        gdpr: "Conformité RGPD"
                    }
                },
                copyright: "© 2026 VerifDoc. Tous droits réservés."
            },
            dashboard: {
                sidebar: {
                    overview: "Vue d'ensemble",
                    scan: "Analyse Live",
                    history: "Historique",
                    settings: "Paramètres",
                    logout: "Déconnexion"
                },
                header: {
                    title: "Dashboard Pro",
                    welcome: "Bienvenue",
                    credits: "Crédits restants"
                },
                overview: {
                    title: "Tableau de bord",
                    subtitle: "Gérez vos activités de vérification et surveillez les menaces.",
                    start_scan: "Nouvelle analyse",
                    recent_activity: "Activité Récente",
                    stats: {
                        scans_today: "Scans Aujourd'hui",
                        fraud_detected: "Fraudes Détectées",
                        api_usage: "Usage API"
                    }
                },
                history: {
                    title: "Historique des analyses",
                    no_data: "Aucune analyse récente"
                }
            }
        }
    },
    en: {
        translation: {
            nav: {
                product: "Product",
                how_it_works: "How it works",
                pricing: "Pricing",
                testimonials: "Testimonials",
                company: "Company",
                login: "Login",
                start_audit: "Free Trial"
            },
            hero: {
                certified: "Forensic Technology V3",
                compliant: "Real-Time AI",
                title_part1: "The Truth,",
                title_part2: "Revealed by AI.",
                subtitle: "Instantly detect fake documents (PDF, JPG, PNG).\nProtect your business against document fraud with our ISO 27001 certified forensic analysis engine.",
                cta_verify: "Free Trial",
                cta_demo: "Watch Demo",
                trial_details: "14d"
            },
            widget: {
                title: "Document Checker",
                status_real: "Authentic",
                status_fake: "High Risk",
                drop_title: "Drop your document here",
                drop_desc: "Supports PDF, JPG, PNG (Max 10MB)",
                analyzing: "ANALYZING...",
                result_title: "ANALYSIS RESULT",
                score_confidence: "Confidence Score",
                meta_ok: "Metadata Consistent",
                sig_valid: "Signature Valid",
                structure_integrity: "Structural Integrity",
                risk_low: "LOW",
                risk_high: "HIGH"
            },
            features: {
                title: "Advanced Document Verification",
                subtitle: "State-of-the-art AI technology to detect document forgery and guarantee authenticity.",
                items: {
                    ai_detection: { title: "AI-Powered Detection", desc: "Our machine learning models analyze PDFs for signs of tampering undetected by the human eye." },
                    database: { title: "Pattern Database", desc: "Matching against a database of over 200,000+ known forgery templates." },
                    signature: { title: "Signature Verification", desc: "Validation against global trust roots (Microsoft, Mozilla, eIDAS...)." },
                    deepfake: { title: "Deepfake Detection", desc: "Cutting-edge technology to identify sophisticated deepfake elements." },
                    ela: { title: "Visual Integrity", desc: "ELA Analysis (Error Level Analysis) to highlight retouched areas." },
                    genai: { title: "GenAI Analysis", desc: "Specialized algorithms to detect content created by AI systems." }
                }
            },
            steps: {
                title: "Simple Process",
                subtitle: "Verify your documents in three simple steps.",
                step1: { title: "Upload", desc: "Drag and drop your PDF or image." },
                step2: { title: "Verify in seconds", desc: "Instant analysis of metadata and signatures." },
                step3: { title: "Get Results", desc: "Detailed report on authenticity." }
            },
            pricing: {
                title: "Pricing Plans",
                subtitle: "Choose the plan that fits your verification needs",
                essential: { name: "Essential", desc: "Basic verification. < 200/mo" },
                compliance: { name: "Compliance", desc: "For regular businesses. 200 - 3000/mo" },
                forensic: { name: "Forensic", desc: "High volume > 3000/mo. Recommended." },
                enterprise: { name: "Enterprise", desc: "Custom requirements." },
                cta: "Start Now",
                cta_contact: "Contact Us",
                min_monthly: "monthly minimum",
                verification: "/verification"
            },
            footer: {
                description: "Verify your PDFs with the great standards of new models and with the collaboration of major AI research centers. Detect fake documents instantly with our advanced AI technology.",
                columns: {
                    product: {
                        title: "Product",
                        home: "Home",
                        how_it_works: "How it works",
                        pricing: "Pricing",
                        testimonials: "Testimonials",
                        schedule_demo: "Schedule a demo"
                    },
                    company: {
                        title: "Company",
                        about: "About us",
                        contact: "Contact"
                    },
                    legal: {
                        title: "Legal",
                        privacy: "Privacy",
                        terms: "Terms",
                        gdpr: "GDPR Compliance"
                    }
                },
                copyright: "© 2026 VerifDoc. All rights reserved."
            },
            dashboard: {
                sidebar: {
                    overview: "Overview",
                    scan: "Live Analysis",
                    history: "History",
                    settings: "Settings",
                    logout: "Logout"
                },
                header: {
                    title: "Pro Dashboard",
                    welcome: "Welcome",
                    credits: "Credits remaining"
                },
                overview: {
                    title: "Dashboard",
                    subtitle: "Manage your verification activities and monitor threats.",
                    start_scan: "New Scan",
                    recent_activity: "Recent Activity",
                    stats: {
                        scans_today: "Scans Today",
                        fraud_detected: "Fraud Detected",
                        api_usage: "API Usage"
                    }
                },
                history: {
                    title: "Analysis History",
                    no_data: "No recent analysis"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
