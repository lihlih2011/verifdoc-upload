export type QAItem = {
    id: string;
    keywords: string[];
    question: string;
    answer: string;
    category: 'sales' | 'technical' | 'billing' | 'compliance' | 'general';
    actionLink?: { text: string; url: string };
};

export const SALES_KNOWLEDGE_BASE: QAItem[] = [
    {
        id: 'pricing_1',
        keywords: ['prix', 'tarif', 'cout', 'abonnement', 'payer', 'gratuit'],
        question: "Combien coûte VerifDoc ?",
        answer: "VerifDoc propose un modèle freemium. Vous pouvez tester gratuitement. Nos plans pro commencent à 99€/mois pour 500 vérifications. Pour les entreprises, nous avons des offres sur mesure.",
        category: 'sales',
        actionLink: { text: 'Voir les tarifs', url: '#pricing' }
    },
    {
        id: 'feature_1',
        keywords: ['api', 'integration', 'connecter', 'dev'],
        question: "Avez-vous une API ?",
        answer: "Oui, VerifDoc est 'API First'. Notre API RESTful s'intègre en moins de 10 minutes dans vos workflows existants (CRM, ERP, SIRH).",
        category: 'technical',
        actionLink: { text: 'Documentation API', url: '/developers' }
    },
    {
        id: 'trust_1',
        keywords: ['fiable', 'precis', 'precision', 'erreur', 'confiance'],
        question: "Quelle est la fiabilité de l'IA ?",
        answer: "Notre IA atteint un score de précision de 99.8% sur les documents administratifs français standards (Paye, Avis d'impôt, Justificatifs de domicile).",
        category: 'general'
    },
    {
        id: 'security_1',
        keywords: ['securite', 'rgpd', 'donnees', 'stockage', 'confidentialite'],
        question: "Mes données sont-elles sécurisées ?",
        answer: "Absolument. Nous sommes conformes RGPD et nos serveurs sont souverains (hébergés en Europe). Nous ne stockons pas vos documents après analyse par défaut.",
        category: 'compliance',
        actionLink: { text: 'Lire la politique', url: '/privacy' }
    },
    {
        id: 'legal_1',
        keywords: ['legal', 'loi', 'valeur', 'juridique'],
        question: "Le rapport a-t-il une valeur juridique ?",
        answer: "Le rapport VerifDoc constitue une preuve technique opposable (\"commencement de preuve\"), utile en cas de litige pour démontrer votre diligence raisonnable.",
        category: 'compliance'
    }
];

export const SUPPORT_KNOWLEDGE_BASE: QAItem[] = [
    {
        id: 'tech_1',
        keywords: ['erreur', 'bug', 'plantage', 'marche pas', 'echec'],
        question: "J'ai une erreur lors de l'upload",
        answer: "Vérifiez que votr e fichier est au format PDF, JPG ou PNG et ne dépasse pas 25MB. Si le problème persiste, contactez le support technique.",
        category: 'technical'
    },
    {
        id: 'tech_2',
        keywords: ['score', 'rouge', 'faux positif', 'comprendre'],
        question: "Comment interpréter un score rouge ?",
        answer: "Un score rouge (>80%) indique de fortes probabilités de manipulation (métadonnées incohérentes, traces de logiciels d'édition). Vérifiez manuellement les zones surlignées.",
        category: 'technical'
    },
    {
        id: 'bill_1',
        keywords: ['facture', 'paiement', 'carte', 'changer'],
        question: "Où trouver mes factures ?",
        answer: "Vos factures sont disponibles dans l'onglet 'Billing' ou 'Finance' de votre tableau de bord.",
        category: 'billing',
        actionLink: { text: 'Aller à la facturation', url: '/dashboard/finance' }
    }
];

export const findAnswer = (query: string, type: 'sales' | 'support'): QAItem | null => {
    const kb = type === 'sales' ? SALES_KNOWLEDGE_BASE : SUPPORT_KNOWLEDGE_BASE;
    const lowerQuery = query.toLowerCase();

    // Simple keyword matching for scoring
    let bestMatch: QAItem | null = null;
    let maxScore = 0;

    for (const item of kb) {
        let score = 0;
        for (const kw of item.keywords) {
            if (lowerQuery.includes(kw)) score += 1;
        }
        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    }

    return maxScore > 0 ? bestMatch : null;
};
