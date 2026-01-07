import { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Diamond, Crown, Activity } from 'lucide-react';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PLANS = [
    {
        id: 'plan_essentiel',
        name: 'Essentiel',
        credits: 125,
        price: '99',
        period: '/mois',
        icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
        features: ['125 Vérifications /mois', 'Détection standard', 'Support Email', '1 Utilisateur'],
        color: 'border-slate-800 bg-slate-900/50',
        cta: 'Commencer',
        ctaColor: 'bg-slate-800 hover:bg-slate-700'
    },
    {
        id: 'plan_compliance',
        name: 'Compliance',
        credits: 665,
        price: '299',
        period: '/mois',
        icon: <Zap className="w-6 h-6 text-amber-400" />,
        features: ['665 Vérifications /mois', 'Module AML inclus', 'API REST Access', '3 Utilisateurs', 'Support Prioritaire'],
        color: 'border-amber-500/50 bg-amber-500/5 shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]',
        best: true,
        cta: 'Choisir Compliance',
        ctaColor: 'bg-amber-500 hover:bg-amber-400 text-black'
    },
    {
        id: 'plan_forensic',
        name: 'Forensic',
        credits: 2596,
        price: '599',
        period: '/mois',
        icon: <Diamond className="w-6 h-6 text-indigo-400" />,
        features: ['2596 Vérifications /mois', 'IA Forensique Avancée (DeepFake)', 'Analyse Spectrale', 'Utilisateurs Illimités', 'Account Manager Dédié'],
        color: 'border-indigo-500/50 bg-indigo-500/5',
        cta: 'Passer au niveau Forensic',
        ctaColor: 'bg-indigo-600 hover:bg-indigo-500'
    }
];

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
    const [loading, setLoading] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleBuy = async (planId: string) => {
        setLoading(planId);
        try {
            // Simulation d'appel API paiement (à adapter selon backend)
            // const response = await axios.post(`${API_URL}/api/payment/create-subscription`, ...);

            // Pour la démo, on simule une redirection
            setTimeout(() => {
                alert(`Redirection vers le paiement Stripe pour le plan ${planId}...`);
                setLoading(null);
                onClose();
            }, 1000);

        } catch (err) {
            console.error(err);
            setLoading(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-[#0b1121] border border-slate-800 rounded-[32px] w-full max-w-6xl p-8 md:p-12 relative overflow-hidden shadow-2xl">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-colors z-20">
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                        <Crown size={12} /> Plans Business & Enterprise
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Choisissez votre niveau de sécurité</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Accédez à la puissance de l'IA VerifDoc pour sécuriser vos processus d'affaires. Sans engagement, annulable à tout moment.</p>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {PLANS.map(plan => (
                        <div key={plan.id} className={`p-8 rounded-3xl border flex flex-col relative transition-all duration-300 hover:transform hover:-translate-y-1 ${plan.color}`}>
                            {plan.best && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                                    <Activity size={12} /> Recommandé
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                                    {plan.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{plan.name}</div>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-lg font-bold text-slate-500">$</span>
                                <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                                <span className="text-sm text-slate-500 font-medium">{plan.period}</span>
                            </div>
                            <div className="text-xs text-slate-400 font-bold mb-8">
                                Soit <span className="text-white">{(parseInt(plan.price) / plan.credits).toFixed(2)}$</span> / vérification
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                                        <Check size={16} className={`shrink-0 mt-0.5 ${plan.best ? 'text-amber-500' : 'text-blue-500'}`} />
                                        <span className="leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleBuy(plan.id)}
                                disabled={!!loading}
                                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${plan.ctaColor} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading === plan.id ? <div className="animate-pulse">Traitement...</div> : plan.cta}
                            </button>

                            {plan.id === 'plan_forensic' && (
                                <p className="text-[10px] text-center text-slate-500 mt-4 font-bold uppercase tracking-wide">
                                    + Accès API Illimité
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">Besoin d'une offre sur mesure pour plus de 10k vérifications ? <a href="#" className="text-white font-bold underline hover:text-blue-400">Contacter l'équipe commerciale.</a></p>
                </div>
            </div>
        </div>
    );
}
