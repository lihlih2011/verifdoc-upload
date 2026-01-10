import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Share2, Twitter, Linkedin } from 'lucide-react';
import NotFound from '../OtherPage/NotFound';

// MOCK DATA - À remplacer par un CMS ou Markdown fetching plus tard
const RESOURCES_DATA: Record<string, { title: string; date: string; category: string; content: React.ReactNode }> = {
    'lcb-ft-update-2025': {
        title: "Mise à jour des obligations de vigilance LCB-FT",
        date: "28 Mars 2025",
        category: "DIRECTIVE",
        content: (
            <>
                <p className="mb-6">La 6ème Directive Anti-Blanchiment (AMLD6) impose de nouvelles contraintes aux établissements financiers et aux professions réglementées. L'analyse documentaire automatisée devient un pilier central de la conformité.</p>
                <h2 className="text-2xl font-bold text-white mb-4">1. La vérification d'identité renforcée</h2>
                <p className="mb-6">Il ne suffit plus de collecter une copie de pièce d'identité. Les assujettis doivent désormais prouver qu'ils ont vérifié l'intégrité numérique du document (absence de manipulation graphique, cohérence des métadonnées).</p>
                <h2 className="text-2xl font-bold text-white mb-4">2. Le rôle de l'IA Forensique</h2>
                <p className="mb-6">Les techniques traditionnelles (OCR simple) sont obsolètes face aux Deepfakes et aux falsifications par IA générative. VerifDoc utilise l'analyse spectrale pour détecter ce que l'œil humain ne voit pas.</p>
                <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 my-8">
                    <p className="text-purple-300 font-medium">"L'automatisation n'est plus une option, c'est une nécessité opérationnelle pour traiter les volumes croissants d'alertes."</p>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Impacts opérationnels</h2>
                <p>Réduire les faux positifs est la clé pour ne pas noyer les équipes de conformité. Notre moteur réduit de 85% le temps de traitement manuel.</p>
            </>
        )
    },
    'jurisprudence-fraude-banque': {
        title: "Responsabilité et Faux Documentaire en Banque",
        date: "15 Févr. 2025",
        category: "JURISPRUDENCE",
        content: (
            <>
                <p className="mb-6">Une récente décision de la Cour de Cassation vient rappeler la responsabilité des banques en cas d'octroi de crédit sur la base de faux documents non détectés.</p>
                <h2 className="text-2xl font-bold text-white mb-4">Le devoir de vigilance</h2>
                <p className="mb-6">La banque doit mettre en œuvre des moyens "raisonnables" pour détecter les faux. L'utilisation d'outils technologiques avancés devient un standard de marché attendu par les juges.</p>
                <h2 className="text-2xl font-bold text-white mb-4">Conséquences financières</h2>
                <p>Au-delà de la perte du crédit, la sanction réglementaire (ACPR) peut s'élever à plusieurs millions d'euros pour défaut de dispositif LCB-FT.</p>
            </>
        )
    },
    'whitepaper-audit-2025': {
        title: "Guide de l'Audit Documentaire 2025",
        date: "10 Janvier 2026",
        category: "LIVRE BLANC",
        content: (
            <>
                <p className="mb-6">Ce guide complet détaille les méthodologies d'audit acceptées par les régulateurs.</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>Contrôle visuel vs Contrôle Algorithmique</li>
                    <li>La place de l'humain dans la boucle (HITL)</li>
                    <li>Comment archiver les preuves de contrôle</li>
                </ul>
                <p>Pour télécharger le PDF complet, veuillez contacter notre équipe sales.</p>
            </>
        )
    }
};

export default function ResourcePost() {
    const { slug } = useParams();
    const article = slug ? RESOURCES_DATA[slug] : null;

    if (!article) return <NotFound />;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans pt-24 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link to="/resources" className="inline-flex items-center text-sm text-slate-500 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Retour aux ressources
                    </Link>

                    <div className="flex items-center gap-4 text-xs font-bold tracking-wider mb-6">
                        <span className="text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{article.category}</span>
                        <span className="text-slate-500 flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">{article.title}</h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                <FileText size={20} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Rédaction VerifDoc</div>
                                <div className="text-xs text-slate-500">Expertise Team</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-slate-400 hover:text-blue-400 transition-colors"><Twitter size={20} /></button>
                            <button className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></button>
                            <button className="text-slate-400 hover:text-white transition-colors"><Share2 size={20} /></button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                    {article.content}
                </div>

                {/* CTA */}
                <div className="mt-20 p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-white/10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Besoin d'approfondir ce sujet ?</h3>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">Nos experts sont disponibles pour auditer vos processus actuels et identifier les risques de fraude.</p>
                    <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors">
                        Demander un audit gratuit
                    </Link>
                </div>
            </article>
        </div>
    );
}
