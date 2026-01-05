import React, { useState } from 'react';
import {
    HelpCircle,
    MessageCircle,
    FileText,
    Shield,
    Zap,
    ChevronDown,
    ChevronUp,
    Search
} from 'lucide-react';

const FAQ_ITEMS = [
    {
        question: "Comment lancer une analyse forensique ?",
        answer: "Cliquez sur l'onglet 'Analyse Live' (icône éclair). Glissez votre fichier PDF ou image dans la zone dédiée. Le système vérifiera votre solde de crédits (50 crédits/scan) et lancera l'analyse IA instantanément.",
        category: "Analyse"
    },
    {
        question: "Comment fonctionne le système de crédits ?",
        answer: "Chaque action consomme des crédits : Analyse Standard (50), Analyse GAN/IA (100), Téléchargement de Rapport (10). Vous pouvez recharger vos crédits dans l'onglet 'Forfaits'.",
        category: "Facturation"
    },
    {
        question: "Mes documents sont-ils confidentiels ?",
        answer: "Absolument. Nous sommes certifiés ISO 27001 et conformes RGPD. Vos documents sont analysés en mémoire volatile et sécurisés par chiffrement de bout en bout.",
        category: "Sécurité"
    },
    {
        question: "Comment gagner de l'argent avec le parrainage ?",
        answer: "Allez dans l'onglet 'Parrainage'. Copiez votre lien unique et partagez-le. Vous gagnez 50$ pour chaque entreprise qui souscrit à un plan payant via votre lien.",
        category: "Parrainage"
    },
    {
        question: "Pourquoi ne puis-je pas imprimer le tableau de bord ?",
        answer: "Pour protéger la propriété intellectuelle et garantir l'intégrité des résultats, l'impression directe est désactivée. Veuillez télécharger le rapport officiel certifié pour impression.",
        category: "Technique"
    }
];

export const HelpView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaq = FAQ_ITEMS.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 min-h-full animate-in fade-in duration-500 font-sans max-w-5xl mx-auto">

            {/* HERADER */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
                    <HelpCircle size={32} className="text-blue-500" />
                </div>
                <h1 className="text-3xl font-black text-slate-800 mb-4">Centre d'Aide & Documentation</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Trouvez des réponses à vos questions et apprenez à maîtriser toutes les fonctionnalités de VerifDoc Pro.
                </p>

                {/* SEARCH BAR */}
                <div className="mt-8 relative max-w-lg mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher une fonctionnalité (ex: crédits, analyse...)"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* QUICK LINKS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <HelpCard
                    icon={<Zap size={24} className="text-amber-500" />}
                    title="Guide de Démarrage"
                    desc="Apprenez à lancer votre première analyse en 2 minutes."
                />
                <HelpCard
                    icon={<Shield size={24} className="text-emerald-500" />}
                    title="Sécurité & Conformité"
                    desc="Détails sur nos certifications ISO et notre politique de confidentialité."
                />
                <HelpCard
                    icon={<FileText size={24} className="text-blue-500" />}
                    title="Documentation API"
                    desc="Intégrez VerifDoc directement dans vos applications."
                />
            </div>

            {/* FAQ ACCORDION */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <MessageCircle size={20} className="text-blue-600" /> Questions Fréquentes
                    </h2>
                </div>
                <div>
                    {filteredFaq.length > 0 ? (
                        filteredFaq.map((item, index) => (
                            <div key={index} className="border-b border-slate-100 last:border-0">
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="font-medium text-slate-700">{item.question}</span>
                                    {openIndex === index ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-2">
                                        {item.answer}
                                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                            {item.category}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-slate-400">
                            Aucun résultat trouvé pour "{searchQuery}".
                        </div>
                    )}
                </div>
            </div>

            {/* SUPPORT CONTACT */}
            <div className="mt-12 text-center border-t border-slate-200 pt-8">
                <p className="text-slate-500 mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition-colors">
                    Contacter le Support Pro
                </button>
            </div>
        </div>
    );
};

const HelpCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
        <div className="mb-4 bg-slate-50 w-fit p-3 rounded-lg group-hover:bg-blue-50 transition-colors">{icon}</div>
        <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
);
