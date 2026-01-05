import { FC, useState } from 'react';
import { Check, Info, Zap, Loader2 } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../config/api';

interface PricingPlansProps {
    currentCredits?: number;
    maxCredits?: number;
}

const PricingPlans: FC<PricingPlansProps> = ({ currentCredits = 2450, maxCredits = 3000 }) => {
    const percentage = Math.min(100, Math.round((currentCredits / maxCredits) * 100));
    const [loadingPack, setLoadingPack] = useState<string | null>(null);

    const handlePurchase = async (packId: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Veuillez vous connecter pour acheter un pack.");
            window.location.href = "/signin";
            return;
        }

        setLoadingPack(packId);
        try {
            const res = await axios.post(`${API_URL}/api/payment/create-checkout-session?pack_id=${packId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.checkout_url) {
                window.location.href = res.data.checkout_url;
            }
        } catch (e) {
            console.error("Erreur paiement:", e);
            alert("Erreur lors de l'initialisation du paiement. Réessayez.");
        } finally {
            setLoadingPack(null);
        }
    };

    return (
        <div className="p-8 min-h-full bg-slate-50 text-slate-900 font-sans">
            {/* HAUT DE PAGE */}
            <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
                <h1 className="text-2xl font-bold text-slate-900">Forfaits</h1>
                <div>Facturation &gt; Forfaits</div>
            </div>

            {/* ONGLETS */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                    <button className="px-6 py-2 rounded-full bg-slate-900 text-white shadow-sm font-bold text-sm">Toutes les fonctionnalités</button>
                    <button className="px-6 py-2 rounded-full text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Détection de la fraude de documents</button>
                    <button className="px-6 py-2 rounded-full text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Vérification de l'identité</button>
                </div>
            </div>

            {/* BANDEAU INFO & USAGE */}
            <div className="mb-10 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                    <div className="font-bold text-sm">Votre forfait actuel : <span className="text-[#2d76b3]">Trial</span></div>
                </div>

                <div className="p-4 bg-blue-50/50 text-xs text-blue-900 flex items-start gap-3 border-b border-blue-100">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p>
                        Vous êtes sur un <span className="font-bold">PLAN D'ESSAI</span>. Pour continuer à utiliser nos services, choisissez un plan avant le <span className="font-bold">2026-02-01</span>.
                    </p>
                </div>

                {/* SECTION CONSOMMATION CREDITS */}
                <div className="p-6 flex items-center gap-6">
                    <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-2">
                            <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> Consommation de Crédits</span>
                            <span>{currentCredits} / {maxCredits} ({percentage}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-[#2d76b3] transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* GRILLE TARIFS PREMIUM B2B - 4 PACKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                {/* 1. START (99€) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="bg-slate-50 p-5 border-b border-slate-100">
                        <h3 className="text-base font-bold text-slate-900 mb-1">Start</h3>
                        <p className="text-[11px] text-slate-500 mb-4 h-8 leading-snug">Le filtre essentiel pour écarter les faux grossiers.</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">99€</span>
                            <span className="text-xs text-slate-500 font-medium">/mois</span>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <ul className="space-y-3 text-[11px] text-slate-600 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> <span className="font-semibold">OCR Instantané</span></li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> Analyse Métadonnées</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> Cohérence Montants</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> 500 Vérifications</li>
                        </ul>
                        <button onClick={() => handlePurchase('pack_start')} disabled={loadingPack === 'pack_start'} className="w-full py-3 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
                            {loadingPack === 'pack_start' ? <Loader2 className="animate-spin" size={14} /> : "Choisir Start"}
                        </button>
                    </div>
                </div>

                {/* 2. EXPERT (299€) */}
                <div className="border border-blue-200 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 bg-white relative ring-1 ring-blue-500/20">
                    <div className="bg-blue-50/50 p-5 border-b border-blue-100">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-bold text-blue-900">Expert</h3>
                            <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Populaire</span>
                        </div>
                        <p className="text-[11px] text-blue-700/80 mb-4 h-8 leading-snug">L'analyse forensique complète pour les équipes fraude.</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">299€</span>
                            <span className="text-xs text-slate-500 font-medium">/mois</span>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <ul className="space-y-3 text-[11px] text-slate-700 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> <span className="font-bold">Analyse Spectrale ELA</span></li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> Détection Photoshop/Canva</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> Fontes Invisibles</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-blue-600 shrink-0 mt-0.5" /> 2 000 Vérifications</li>
                        </ul>
                        <button onClick={() => handlePurchase('pack_expert')} disabled={loadingPack === 'pack_expert'} className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors flex justify-center items-center gap-2">
                            {loadingPack === 'pack_expert' ? <Loader2 className="animate-spin" size={14} /> : "Choisir Expert"}
                        </button>
                    </div>
                </div>

                {/* 3. ELITE (999€) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="bg-slate-50 p-5 border-b border-slate-100">
                        <h3 className="text-base font-bold text-slate-900 mb-1">Elite</h3>
                        <p className="text-[11px] text-slate-500 mb-4 h-8 leading-snug">Investigation juridique et traçabilité totale.</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">999€</span>
                            <span className="text-xs text-slate-500 font-medium">/mois</span>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <ul className="space-y-3 text-[11px] text-slate-600 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-600 shrink-0 mt-0.5" /> <span className="font-semibold">Rapport Expert PDF</span></li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-600 shrink-0 mt-0.5" /> Cross-Reference Multi-Doc</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-600 shrink-0 mt-0.5" /> Traçabilité Blockchain</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-600 shrink-0 mt-0.5" /> Volume Illimité (Fair use)</li>
                        </ul>
                        <button onClick={() => handlePurchase('pack_elite')} disabled={loadingPack === 'pack_elite'} className="w-full py-3 rounded-lg border border-slate-900 text-slate-900 font-bold text-xs hover:bg-slate-50 transition-colors flex justify-center items-center gap-2">
                            {loadingPack === 'pack_elite' ? <Loader2 className="animate-spin" size={14} /> : "Choisir Elite"}
                        </button>
                    </div>
                </div>

                {/* 4. ENTREPRISE (CUSTOM) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 bg-slate-900 text-white">
                    <div className="bg-white/5 p-5 border-b border-white/10">
                        <h3 className="text-base font-bold text-white mb-1">Entreprise</h3>
                        <p className="text-[11px] text-slate-400 mb-4 h-8 leading-snug">Pour les opérations de conformité à grande échelle.</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-white">Sur Devis</span>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <ul className="space-y-3 text-[11px] text-slate-300 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-400 shrink-0 mt-0.5" /> Personnalisation avancée</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-400 shrink-0 mt-0.5" /> Équipe dédiée (Slack)</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-400 shrink-0 mt-0.5" /> IA Nouvelle Génération</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-400 shrink-0 mt-0.5" /> SSO & Data Residency</li>
                            <li className="flex items-start gap-2"><Check size={12} className="text-emerald-400 shrink-0 mt-0.5" /> Tarification Volume</li>
                        </ul>
                        <a href="mailto:sales@verifdoc.com" className="w-full py-3 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-emerald-900/20">
                            Contactez-nous
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingPlans;
