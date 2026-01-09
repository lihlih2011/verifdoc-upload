import React, { useState } from 'react';

const plans = [
    {
        id: 'pack_essential',
        name: 'Essentiel',
        price: '99',
        currency: '€',
        period: '/ pack',
        description: 'Pour les besoins ponctuels.',
        features: [
            '200 Crédits Analyse',
            'Détection Fraude IA',
            'Support Standard',
            'Export PDF'
        ],
        cta: 'Acheter le Pack',
        popular: false,
        gradient: 'from-gray-700 to-gray-900'
    },
    {
        id: 'pack_compliance',
        name: 'Conformité',
        price: '299',
        currency: '€',
        period: '/ pack',
        description: 'Idéal pour les agences immobilières.',
        features: [
            '700 Crédits Analyse',
            'Analyse Prioritaire',
            'API Access (Standard)',
            'Support Chat Direct',
            'Certificat de Conformité'
        ],
        cta: 'Choisir Conformité',
        popular: true,
        gradient: 'from-blue-600 to-indigo-700'
    },
    {
        id: 'pack_forensic',
        name: 'Service Judiciaire',
        price: '599',
        currency: '€',
        period: '/ pack',
        description: 'Pour un volume d\'analyse élevé.',
        features: [
            '2400 Crédits Analyse',
            'Manager de Compte Dédié',
            'API Full Access',
            'SLA Garanti (99.9%)',
            'Audit sur Facture'
        ],
        cta: 'Contacter Ventes',
        popular: false,
        gradient: 'from-purple-600 to-pink-700'
    }
];

export default function Pricing() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        setLoading(planId);
        // Simulation appel API pour initier Checkout
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // alert("Veuillez vous connecter ou créer un compte pour souscrire.");
                window.location.href = "/auth/signup?plan=" + planId; // Redirect to signup with plan intent
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/payment/create-checkout-session?pack_id=${planId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                alert("Erreur lors de l'initialisation du paiement.");
            }
        } catch (error) {
            console.error("Payment Error", error);
            alert("Une erreur est survenue.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <section className="py-20 relative bg-gray-900 overflow-hidden" id="pricing">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Nos Packs de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Crédits</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Payez à l'usage. Pas d'abonnement caché.
                        <br />Vos crédits sont valables sans limite de temps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl p-1 p-[1px] transform transition duration-500 hover:scale-105 ${plan.popular ? 'bg-gradient-to-b from-blue-500 to-purple-500 shadow-2xl shadow-blue-500/20 z-10' : 'bg-gray-800 border border-gray-700 hover:border-gray-600'}`}
                        >
                            <div className="bg-gray-900 rounded-2xl h-full p-8 flex flex-col relative overflow-hidden">
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        RECOMMANDÉ
                                    </div>
                                )}

                                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}{plan.currency}</span>
                                    <span className="text-gray-500 ml-2">{plan.period}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-8 min-h-[40px]">{plan.description}</p>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-gray-300 text-sm">
                                            <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={!!loading}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 
                    ${plan.popular
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25 text-white'
                                            : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {loading === plan.id ? 'Chargement...' : plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm">
                        Besoin d'un volume sur-mesure ? <a href="#" className="text-blue-400 hover:underline">Contactez notre équipe commerciale.</a>
                    </p>
                    <div className="flex justify-center gap-6 mt-6 grayscale opacity-50">
                        {/* Simulated Badges */}
                        <div className="flex items-center gap-2 text-gray-400 text-xs">🔒 Paiement Sécurisé SSL</div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">💳 Stripe Certified</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
