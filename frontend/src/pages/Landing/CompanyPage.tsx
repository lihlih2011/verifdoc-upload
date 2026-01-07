import { ShieldCheck, Server, Lock, Activity, Globe, Award, TrendingUp, Users, CheckCircle2, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyPage() {
    return (
        <div className="pt-24 min-h-screen bg-[#0B0F17] text-white">
            {/* HEROS SECTION */}
            <section className="relative px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen -z-10" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none opacity-30 mix-blend-screen -z-10" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8 tracking-wider uppercase">
                        <Building2 size={12} />
                        Solutions Grands Comptes
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        L'Intelligence Artificielle au service de la <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Conformité Institutionnelle
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        VerifDoc Enterprise offre une infrastructure souveraine, auditable et scalable pour automatiser vos contrôles KYC/KYB et sécuriser vos processus d'entrée en relation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1">
                            Parler à un Expert
                        </a>
                        <a href="#compliance" className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-medium rounded-xl transition-all backdrop-blur-sm">
                            Découvrir notre SLA
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST LOGOS */}
            <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                        La solution de référence pour les leaders du secteur
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Logos with Text for now */}
                        <div className="text-2xl font-bold text-slate-300 flex items-center gap-2"><Globe className="text-blue-500" /> BNP Paribas</div>
                        <div className="text-2xl font-bold text-slate-300 flex items-center gap-2"><ShieldCheck className="text-emerald-500" /> AXA Assurances</div>
                        <div className="text-2xl font-bold text-slate-300 flex items-center gap-2"><Building2 className="text-indigo-500" /> Crédit Mutuel</div>
                        <div className="text-2xl font-bold text-slate-300 flex items-center gap-2"><Award className="text-yellow-500" /> Malakoff Humanis</div>
                    </div>
                </div>
            </section>

            {/* KPI GRID */}
            <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="p-8 bg-slate-900/50 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Activity className="w-10 h-10 text-blue-500 mb-4" />
                        <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                        <div className="text-slate-400 font-medium">Disponibilité garantie (SLA)</div>
                    </div>
                    <div className="p-8 bg-slate-900/50 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <TrendingUp className="w-10 h-10 text-purple-500 mb-4" />
                        <div className="text-4xl font-bold text-white mb-2">&lt; 200ms</div>
                        <div className="text-slate-400 font-medium">Temps de réponse API</div>
                    </div>
                    <div className="p-8 bg-slate-900/50 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                        <div className="text-4xl font-bold text-white mb-2">ISO 27001</div>
                        <div className="text-slate-400 font-medium">Certification de Sécurité</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Une infrastructure conçue pour l'Hyper-Scale</h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Ne faites aucun compromis entre sécurité et volumétrie. Notre architecture distribuée traite des millions de documents par jour sans latence, avec une précision de détection inégalée grâce à nos modèles hybrides (Heuristique + Deep Learning).
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Hébergement 100% Français (SecNumCloud Ready)",
                                "Chiffrement AES-256 de bout en bout",
                                "API RESTful intégrable en moins de 2h",
                                "Support Technique Dédié 24/7"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl transform rotate-3" />
                        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                            {/* Fake Code / Config */}
                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="text-xs text-slate-500 font-mono ml-4">config.yaml</div>
                            </div>
                            <pre className="font-mono text-xs sm:text-sm text-blue-300 overflow-x-auto">
                                <code>
                                    <span className="text-purple-400">enterprise_config:</span>{'\n'}
                                    {'  '}sla_level: <span className="text-emerald-400">"PLATINUM"</span>{'\n'}
                                    {'  '}data_residency: <span className="text-emerald-400">"FR-PAR"</span>{'\n'}
                                    {'  '}encryption: <span className="text-emerald-400">"AES-GCM-256"</span>{'\n'}
                                    {'  '}rate_limit: <span className="text-yellow-400">10000</span> <span className="text-slate-500"># req/sec</span>{'\n'}
                                    {'\n'}
                                    <span className="text-purple-400">compliance_checks:</span>{'\n'}
                                    {'  '}- <span className="text-orange-300">"detect_forgery"</span>{'\n'}
                                    {'  '}- <span className="text-orange-300">"verify_mrz"</span>{'\n'}
                                    {'  '}- <span className="text-orange-300">"cross_reference_databases"</span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES TABS */}
            <section id="compliance" className="py-24 bg-slate-900 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Fonctionnalités Exclusives</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Des outils puissants réservés à nos clients Enterprise pour une gestion du risque à 360°.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <div className="bg-[#0B0F17] p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                        <Server className="w-12 h-12 text-slate-600 group-hover:text-blue-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold mb-3 text-white">Déploiement On-Premise</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Pour les environnements ultra-sensibles, déployez VerifDoc directement sur vos serveurs via nos conteneurs Docker sécurisés, sans aucune sortie de données.
                        </p>
                    </div>
                    <div className="bg-[#0B0F17] p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                        <Lock className="w-12 h-12 text-slate-600 group-hover:text-blue-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold mb-3 text-white">SSO & SAML 2.0</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Intégrez l'accès à notre dashboard directement dans votre annuaire d'entreprise (Okta, AD, Google Workspace) pour une gestion centralisée des identités.
                        </p>
                    </div>
                    <div className="bg-[#0B0F17] p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                        <Users className="w-12 h-12 text-slate-600 group-hover:text-blue-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold mb-3 text-white">Gestion Multi-Équipes</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Créez des environnements cloisonnés pour vos différentes filiales ou départements, avec des politiques de rétention et des droits d'accès granulaires.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6 text-white">Prêt à transformer votre conformité ?</h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Rejoignez les institutions qui font confiance à VerifDoc pour sécuriser leurs entrées en relation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:sales@verifdoc.io" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-xl">
                            Contacter l'équipe commerciale
                        </a>
                        <a href="/login" className="px-8 py-4 bg-transparent border border-slate-600 text-white font-medium rounded-xl hover:bg-white/5 transition-colors">
                            Accéder au Portail Partenaire
                        </a>
                    </div>
                    <p className="mt-8 text-sm text-slate-500">
                        POC gratuit de 14 jours • Pas de carte bancaire requise • Setup accompagné
                    </p>
                </div>
            </section>
        </div>
    );
}
