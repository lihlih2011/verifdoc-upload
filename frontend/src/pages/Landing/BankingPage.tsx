import { Link } from 'react-router-dom';
import { Landmark, Briefcase, Lock, ArrowRight, ShieldAlert } from 'lucide-react';

export default function BankingPage() {
    return (
        <div className="pt-24 min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
            {/* HERO */}
            <section className="relative px-6 py-20 text-center">
                <div className="absolute inset-0 bg-indigo-900/10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        <Landmark size={12} /> Banque & Services Financiers
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        KYC Automatisé & <span className="text-indigo-500">Conformité LCB-FT</span>.
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        Accélérez l'ouverture de compte et l'octroi de crédit tout en réduisant drastiquement le risque de fraude documentaire et identitaire.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                            Parler à un expert <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">KYB Simplifié</h3>
                        <p className="text-slate-400 text-sm">Vérification automatique des Kbis, statuts et bénéficiaires effectifs pour l'onboarding des entreprises.</p>
                    </div>
                    <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-6">
                            <ShieldAlert size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Détection Fraude Crédit</h3>
                        <p className="text-slate-400 text-sm">Identifiez les relevés bancaires falsifiés et les incohérences de flux financiers avant l'octroi de prêt.</p>
                    </div>
                    <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all">
                        <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6">
                            <Lock size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Archivage Probatoire</h3>
                        <p className="text-slate-400 text-sm">Stockage sécurisé des preuves de contrôles avec horodatage certifié conforme aux normes ACPR.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
