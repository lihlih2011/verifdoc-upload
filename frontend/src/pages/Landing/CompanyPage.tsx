import { ShieldCheck, Building2, Brain, Coffee, Code2 } from 'lucide-react';

export default function CompanyPage() {
    return (
        <div className="pt-24 min-h-screen text-white">
            <section className="relative px-6 lg:px-8 py-20 overflow-hidden text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 tracking-wider uppercase animate-fade-in-up">
                    <Building2 size={12} />
                    À propos de VerifDoc
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                    Sécuriser l'économie numérique <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Document par Document
                    </span>
                </h1>
                <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Fondée par des experts en cybersécurité et en IA, VerifDoc a pour mission d'éradiquer la fraude documentaire grâce à l'analyse forensique automatisée.
                </p>
            </section >

            {/* --- OUR STORY (Timeline style) --- */}
            < section className="py-16 max-w-5xl mx-auto px-6" >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Brain className="text-purple-500" />
                            Notre Genèse
                        </h2>
                        <div className="space-y-6 text-slate-400 leading-relaxed">
                            <p>
                                Tout a commencé avec un constat simple : les outils de vérification classiques (OCR) sont impuissants face aux faux "parfaits" générés par l'IA ou Photoshop.
                            </p>
                            <p>
                                Nous avons donc construit <strong className="text-white">le moteur VDS (VerifDoc Signal)</strong> : une technologie qui ne lit pas seulement le texte, mais analyse la structure microscopique de l'image (spectre de fréquence, incohérences de compression, métadonnées).
                            </p>
                            <p>
                                Aujourd'hui, nous traitons des millions de documents pour des banques, des assureurs et des agences immobilières.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
                        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">2023</div>
                                    <div>
                                        <div className="text-white font-bold">Création du Moteur VDS</div>
                                        <div className="text-slate-500 text-sm">Premiers brevets déposés</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">2024</div>
                                    <div>
                                        <div className="text-white font-bold">Lancement Beta</div>
                                        <div className="text-slate-500 text-sm">50 entreprises pilotes</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">2025</div>
                                    <div>
                                        <div className="text-white font-bold">Expansion Européenne</div>
                                        <div className="text-slate-500 text-sm">Conformité eIDAS & RGPD</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* --- TEAM SECTION (Cyber Style - No Stock Photos) --- */}
            < section className="py-24 bg-slate-900/30 border-y border-white/5" >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">L'Équipe Core</h2>
                    <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                        Une équipe distribuée, passionnée par la cryptographie et l'intelligence artificielle.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Member 1 */}
                        <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all group">
                            <div className="w-20 h-20 mx-auto rounded-full bg-slate-800 mb-4 overflow-hidden border-2 border-slate-700 group-hover:border-blue-500 transition-colors relative">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=CEO&backgroundColor=b6e3f4`} alt="Avatar" />
                            </div>
                            <h3 className="text-white font-bold">Alexandre D.</h3>
                            <div className="text-blue-400 text-xs uppercase tracking-wider font-bold mb-2">CEO & Co-Founder</div>
                            <p className="text-slate-500 text-sm">Ex-DGSE. Expert en cryptographie appliquée.</p>
                        </div>

                        {/* Member 2 */}
                        <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all group">
                            <div className="w-20 h-20 mx-auto rounded-full bg-slate-800 mb-4 overflow-hidden border-2 border-slate-700 group-hover:border-purple-500 transition-colors relative">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=CTO&backgroundColor=c0aede`} alt="Avatar" />
                            </div>
                            <h3 className="text-white font-bold">Sarah L.</h3>
                            <div className="text-purple-400 text-xs uppercase tracking-wider font-bold mb-2">CTO & AI Lead</div>
                            <p className="text-slate-500 text-sm">PhD en Computer Vision. Ancienne chercheuse Inria.</p>
                        </div>

                        {/* Member 3 */}
                        <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-all group">
                            <div className="w-20 h-20 mx-auto rounded-full bg-slate-800 mb-4 overflow-hidden border-2 border-slate-700 group-hover:border-emerald-500 transition-colors relative">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Product&backgroundColor=d1d4f9`} alt="Avatar" />
                            </div>
                            <h3 className="text-white font-bold">Marc-Antoine</h3>
                            <div className="text-emerald-400 text-xs uppercase tracking-wider font-bold mb-2">Head of Product</div>
                            <p className="text-slate-500 text-sm">Passionné d'UX et d'accessibilité numérique.</p>
                        </div>

                        {/* Member 4 */}
                        <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all group">
                            <div className="w-20 h-20 mx-auto rounded-full bg-slate-800 mb-4 overflow-hidden border-2 border-slate-700 group-hover:border-yellow-500 transition-colors relative">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sales&backgroundColor=ffdfbf`} alt="Avatar" />
                            </div>
                            <h3 className="text-white font-bold">Julie B.</h3>
                            <div className="text-yellow-400 text-xs uppercase tracking-wider font-bold mb-2">VP Sales</div>
                            <p className="text-slate-500 text-sm">10 ans d'expérience SaaS B2B Fintech.</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* VALUES */}
            < section className="py-20 px-6 max-w-7xl mx-auto" >
                <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-slate-800/20 rounded-xl border border-white/5">
                        <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Confiance Zero-Trust</h3>
                        <p className="text-slate-400 text-sm">Nous ne faisons confiance à aucun pixel par défaut. Tout est vérifié, tout le temps.</p>
                    </div>
                    <div className="p-6 bg-slate-800/20 rounded-xl border border-white/5">
                        <Code2 className="w-8 h-8 text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Excellence Technique</h3>
                        <p className="text-slate-400 text-sm">Notre code est notre métier. Nous visons la performance, la sécurité et l'élégance.</p>
                    </div>
                    <div className="p-6 bg-slate-800/20 rounded-xl border border-white/5">
                        <Coffee className="w-8 h-8 text-emerald-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Pragmatisme</h3>
                        <p className="text-slate-400 text-sm">Pas de buzzwords inutiles. Nous construisons des outils qui résolvent de vrais problèmes.</p>
                    </div>
                </div>
            </section >

        </div >
    );
}
