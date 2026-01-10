import { Link } from 'react-router-dom';
import { Building, ShieldCheck, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RealEstatePage() {
    return (
        <div className="pt-24 min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-purple-500/30">
            {/* HERO */}
            <section className="relative px-6 py-20 text-center">
                <div className="absolute inset-0 bg-blue-600/5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        <Building size={12} /> Solution pour Agences Immobilières
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Sécurisez vos <span className="text-blue-500">Dossiers Locataires</span> en 3 secondes.
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        Détectez instantanément les faux bulletins de salaire, avis d'imposition et quittances de loyer. Protégez vos propriétaires contre les impayés.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
                            Demander une démo <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                            <FileCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Revenus Vérifiés</h3>
                        <p className="text-slate-400 text-sm">Analyse croisée des bulletins de paie et des avis d'imposition pour déceler les incohérences de revenu fiscal.</p>
                    </div>
                    <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Anti-Falsification</h3>
                        <p className="text-slate-400 text-sm">Détection des retouches Photoshop invisibles (ELA) sur les pièces d'identité et justificatifs de domicile.</p>
                    </div>
                    <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                            <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Conformité GLI</h3>
                        <p className="text-slate-400 text-sm">Générez un certificat d'authenticité opposable aux assureurs Garantie Loyers Impayés en cas de litige.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
