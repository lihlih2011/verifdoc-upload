import { useState } from "react";

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="pricing" className="relative py-24 overflow-hidden">
            {/* Background Blurs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary-900/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                    <h2 className="mb-4 text-3xl font-bold md:text-5xl font-nacelle bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        Une tarification simple et évolutive
                    </h2>
                    <p className="text-xl text-gray-400">
                        Commencez gratuitement, passez à l'échelle quand vous êtes prêt.
                    </p>

                    {/* Toggle */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative flex w-fit rounded-full bg-gray-900 p-1 ring-1 ring-gray-800">
                            <button
                                className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${!isAnnual ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setIsAnnual(false)}
                            >
                                Mensuel
                            </button>
                            <button
                                className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${isAnnual ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setIsAnnual(true)}
                            >
                                Annuel <span className="text-primary-400 ml-1 font-bold">-20%</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 items-start">

                    {/* Starter Plan */}
                    <div className="relative flex flex-col rounded-3xl border border-gray-800 bg-gray-900/40 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-gray-700">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-white">Starter</h3>
                            <p className="text-sm text-gray-400 mt-1">Pour les indépendants et petites équipes.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">{isAnnual ? '119€' : '149€'}</span>
                            <span className="text-sm font-medium text-gray-500">/mois</span>
                        </div>
                        <a href="/signup" className="mb-8 block w-full rounded-full border border-gray-700 bg-gray-800/50 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:border-gray-600">
                            Commencer
                        </a>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>150 analyses / mois</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>Détection Fraude N1</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>1 Utilisateur</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>Support Email 24h</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Plan (Popular) */}
                    <div className="relative flex flex-col rounded-3xl border border-primary-500/50 bg-gray-900/80 p-8 shadow-[0_0_40px_rgba(217,70,239,0.1)] backdrop-blur-md transform lg:-translate-y-4">
                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-primary-600 to-purple-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                            Le Plus Populaire
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-white">Business</h3>
                            <p className="text-sm text-gray-400 mt-1">Pour les entreprises en croissance.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">{isAnnual ? '299€' : '299€'}</span>
                            <span className="text-sm font-medium text-gray-500">/mois</span>
                        </div>
                        <a href="/signup" className="mb-4 block w-full rounded-full bg-gradient-to-r from-primary-600 to-purple-600 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:scale-[1.02]">
                            Essayer Gratuitement
                        </a>
                        <a href="/contact" className="mb-4 block w-full rounded-full border border-primary-600 text-primary-600 py-2.5 text-center text-sm font-semibold hover:bg-primary-600 hover:text-white transition-all">Demander un abonnement</a>
                        <p className="text-xs text-gray-400 mt-2">En souscrivant, vous acceptez les <a href="/terms" className="underline">Conditions Générales d'Utilisation</a>. Les rapports sont accessibles aux administrateurs et aux agents.</p>
                        <ul className="space-y-4 text-sm text-gray-200">
                            <li className="flex items-center gap-3">
                                <CheckIcon className="text-primary-400" /> <span className="font-medium">Tout du plan Starter</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="text-primary-400" /> <span>500 analyses / mois</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="text-primary-400" /> <span>Détection Fraude N2 (Avancée)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="text-primary-400" /> <span>Analyses Prioritaires</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="text-primary-400" /> <span>Rapports PDF Certifiés</span>
                            </li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="relative flex flex-col rounded-3xl border border-gray-800 bg-gray-900/40 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-gray-700">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-white">Enterprise</h3>
                            <p className="text-sm text-gray-400 mt-1">Pour les grands volumes et l'API.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">{isAnnual ? '719€' : '899€'}</span>
                            <span className="text-sm font-medium text-gray-500">/mois</span>
                        </div>
                        <a href="/contact" className="mb-8 block w-full rounded-full border border-gray-700 bg-gray-800/50 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:border-gray-600">
                            Contacter les ventes
                        </a>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>Volume Illimité / Sur Devis</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>Accès API Dédié</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>SLA & Support VIP</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> <span>On-Premise Possible</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

function CheckIcon({ className = "text-gray-500" }: { className?: string }) {
    return (
        <svg className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
