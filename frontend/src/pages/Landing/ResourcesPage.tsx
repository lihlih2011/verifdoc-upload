export default function ResourcesPage() {
    return (
        <div className="pt-24">
            <section className="relative">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="py-12 md:py-20">
                        {/* Section header */}
                        <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                            <h1 className="h1 mb-4 font-nacelle text-4xl font-semibold text-white animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">
                                Centre de <span className="text-purple-500">Documentation Réglementaire</span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                Accédez à nos analyses d'impact, veilles juridiques et guides de mise en conformité pour sécuriser vos procédures.
                            </p>
                        </div>

                        {/* Blog / Resources Grid */}
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            {/* Article 1 */}
                            <article className="flex flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group">
                                <Link to="/resources/lcb-ft-update-2025" className="block h-48 bg-gray-800 flex items-center justify-center text-gray-600 group-hover:bg-gray-800/80 transition-colors">
                                    <svg className="w-12 h-12 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </Link>
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center justify-between text-xs text-purple-400 font-medium mb-3">
                                        <span className="bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">DIRECTIVE LCB-FT</span>
                                        <span className="text-gray-500">28 MARS 2025</span>
                                    </div>
                                    <h3 className="h4 mb-2 text-xl font-bold font-nacelle">
                                        <Link to="/resources/lcb-ft-update-2025" className="text-white hover:text-purple-400 transition-colors">Mise à jour des obligations de vigilance</Link>
                                    </h3>
                                    <p className="text-gray-400 grow text-sm leading-relaxed">
                                        Analyse des nouvelles dispositions relatives à la vérification d'identité à distance et impacts sur vos parcours d'entrée en relation (KYC).
                                    </p>
                                </div>
                            </article>

                            {/* Article 2 */}
                            <article className="flex flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group">
                                <Link to="/resources/jurisprudence-fraude-banque" className="block h-48 bg-gray-800 flex items-center justify-center text-gray-600 group-hover:bg-gray-800/80 transition-colors">
                                    <svg className="w-12 h-12 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                                </Link>
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center justify-between text-xs text-purple-400 font-medium mb-3">
                                        <span className="bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">JURISPRUDENCE</span>
                                        <span className="text-gray-500">15 FÉVR. 2025</span>
                                    </div>
                                    <h3 className="h4 mb-2 text-xl font-bold font-nacelle">
                                        <Link to="/resources/jurisprudence-fraude-banque" className="text-white hover:text-purple-400 transition-colors">Responsabilité et Faux Documentaire</Link>
                                    </h3>
                                    <p className="text-gray-400 grow text-sm leading-relaxed">
                                        Retour sur les récentes décisions de justice concernant la responsabilité des établissements financiers face à la fraude documentaire sophistiquée.
                                    </p>
                                </div>
                            </article>

                            {/* Article 3 (White Paper) */}
                            <article className="flex flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group">
                                <Link to="/resources/whitepaper-audit-2025" className="block h-48 bg-purple-900/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-900/30 transition-colors">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                </Link>
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center justify-between text-xs text-purple-400 font-medium mb-3">
                                        <span className="bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">LIVRE BLANC</span>
                                        <span className="text-gray-500">TÉLÉCHARGEMENT LIBRE</span>
                                    </div>
                                    <h3 className="h4 mb-2 text-xl font-bold font-nacelle">
                                        <Link to="/resources/whitepaper-audit-2025" className="text-white hover:text-purple-400 transition-colors">Guide de l'Audit Documentaire 2025</Link>
                                    </h3>
                                    <p className="text-gray-400 grow text-sm leading-relaxed">
                                        Méthodologie complète pour internaliser les contrôles d'intégrité et répondre aux exigences des régulateurs (ACPR/AMF).
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
