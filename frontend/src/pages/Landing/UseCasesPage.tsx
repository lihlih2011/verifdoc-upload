import { Building, Landmark, Briefcase, ChevronRight, FileCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UseCasesPage() {
    const cases = [
        {
            id: 'banking',
            title: 'Banque & Fintech',
            icon: <Landmark className="w-8 h-8 text-blue-400" />,
            desc: 'Automatisez vos processus KYC/KYB et détectez les faux relevés bancaires ou avis d\'imposition en temps réel.',
            link: '/solutions/banking'
        },
        {
            id: 'real-estate',
            title: 'Immobilier (GLI)',
            icon: <Building className="w-8 h-8 text-emerald-400" />,
            desc: 'Vérifiez la solvabilité des locataires instantanément. Fini les dossiers falsifiés sous Photoshop.',
            link: '/solutions/real-estate'
        },
        {
            id: 'hr',
            title: 'Ressources Humaines',
            icon: <Briefcase className="w-8 h-8 text-purple-400" />,
            desc: 'Authentifiez les diplômes, certificats de travail et CV pour sécuriser vos recrutements.',
            link: '/solutions' // Placeholder link
        },
        {
            id: 'insurance',
            title: 'Assurance',
            icon: <ShieldAlert className="w-8 h-8 text-yellow-400" />,
            desc: 'Détectez les fausses factures de sinistres et réduisez drastiquement vos pertes.',
            link: '/solutions' // Placeholder link
        }
    ];

    return (
        <div className="pt-24 min-h-screen text-white font-sans">
            <section className="px-6 py-20 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-6 tracking-wider uppercase">
                    <FileCheck size={12} />
                    Secteurs d'activité
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Une solution adaptée à <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">chaque industrie</span>
                </h1>
                <p className="text-xl text-slate-400 mb-12">
                    Que vous soyez une néo-banque, une agence immobilière ou un grand groupe, VerifDoc s'adapte à vos flux documentaires spécifiques.
                </p>
            </section>

            <section className="px-6 pb-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                {cases.map((uc) => (
                    <Link to={uc.link} key={uc.id} className="group relative bg-[#1E293B] p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="mb-6 bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-600 group-hover:scale-110 transition-transform">
                                {uc.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                {uc.title}
                                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" size={20} />
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {uc.desc}
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}
