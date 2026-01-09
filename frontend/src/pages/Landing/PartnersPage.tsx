import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../../components/common/PageMeta';
import { CheckCircle, ArrowRight, Handshake, Users, Coins } from 'lucide-react';

export default function PartnersPage() {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <PageMeta
                title="Programme Partenaires | VerifDoc"
                description="Rejoignez notre réseau de partenaires et monétisez la confiance numérique."
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Handshake className="w-4 h-4" /> Programme Revendeurs & Affiliés
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                        Monétisez la <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Confiance</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Intégrez la solution de détection de fraude n°1 à votre offre. Commissions récurrentes, support prioritaire et marque blanche disponible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#join" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
                            Devenir Partenaire
                        </a>
                        <a href="#benefits" className="px-8 py-4 bg-gray-800 text-white font-medium rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors">
                            Voir les avantages
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section id="benefits" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Coins className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Commissions Attractives</h3>
                            <p className="text-gray-600">Gagnez jusqu'à 30% de commission récurrente sur chaque client apporté, à vie.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Support Dédié</h3>
                            <p className="text-gray-600">Accès direct à notre équipe technique pour intégrer VerifDoc chez vos clients.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Marque Blanche</h3>
                            <p className="text-gray-600">Revendez la solution sous votre propre marque (Option Enterprise) et maîtrisez votre pricing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Form */}
            <section id="join" className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Rejoindre le Programme</h2>
                        <p className="text-gray-500 mt-2">Remplissez ce formulaire pour recevoir votre kit partenaire.</p>
                    </div>

                    <form className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Jean" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Dupont" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Professionnel</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="jean@societe.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type de Partenariat</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white">
                                <option>Apporteur d'affaires (Affiliation)</option>
                                <option>Intégrateur Technique / ESN</option>
                                <option>Revendeur Marque Blanche</option>
                                <option>Autre</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Votre message</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none h-32" placeholder="Décrivez votre activité..." />
                        </div>

                        <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
                            Envoyer ma candidature <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-xs text-center text-gray-400">En soumettant ce formulaire, vous acceptez notre politique de confidentialité.</p>
                    </form>
                </div>
            </section>

        </div>
    );
}
