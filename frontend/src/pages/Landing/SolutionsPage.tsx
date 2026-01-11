export default function SolutionsPage() {
    return (
        <div className="pt-24">
            <section className="relative">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="py-12 md:py-20">
                        {/* Section header */}
                        <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                            <h1 className="h1 mb-4 font-sans text-4xl font-semibold text-white animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">
                                Protocoles de <span className="text-purple-500">Conformité Documentaire</span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                Nos solutions d'audit assurent l'opposabilité juridique de vos flux entrants et garantissent la traçabilité intégrale de la chaîne de preuve.
                            </p>
                        </div>

                        {/* Items */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Item 1 */}
                            <div className="relative flex flex-col items-start p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
                                <div className="h-12 w-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-sans">Audit d'Intégrité du Support</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    Vérification de la cohérence structurelle du fichier numérique (PDF/Image) pour certifier l'absence d'altération post-émission. Garantie de non-répudiation.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Contrôle des marqueurs d'édition</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Validation des signatures électroniques</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Analyse de la compression numérique</li>
                                </ul>
                            </div>

                            {/* Item 2 */}
                            <div className="relative flex flex-col items-start p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
                                <div className="h-12 w-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-sans">Concordance des Données</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    Rapprochement automatisé entre les pièces justificatives fournies et les référentiels tiers (Bases administratives, registres publics) pour valider l'exactitude des déclarations.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Croisement SIRET / RNA</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Validation syntaxique IBAN</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Cohérence d'identité et d'adresse</li>
                                </ul>
                            </div>

                            {/* Item 3 */}
                            <div className="relative flex flex-col items-start p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
                                <div className="h-12 w-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-sans">Génération de Certificats</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    Émission d'un rapport d'audit standardisé faisant foi, détaillant les points de contrôle et l'indice de conformité attribué au dossier.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Horodatage certifié</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Scellement du rapport (Hash SHA-256)</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Archivage probatoire</li>
                                </ul>
                            </div>

                            {/* Item 4 */}
                            <div className="relative flex flex-col items-start p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
                                <div className="h-12 w-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-sans">Lutte contre la Fraude Sérielle</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    Identification des schémas de récurrence et des tentatives de falsification systémique par analyse vectorielle des modèles documentaires.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Détection de gabarits frauduleux</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Analyse de similarité structurelle</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Blocage préventif des flux suspects</li>
                                </ul>
                            </div>

                            {/* Item 5 */}
                            <div className="relative flex flex-col items-start p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
                                <div className="h-12 w-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-sans">Conformité Réglementaire (KYC/KYB)</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    Assurance de la mise en conformité de vos processus d'entrée en relation avec les directives LCB-FT en vigueur.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Diligences raisonnables automatisées</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Filtrage des Personnes Politiquement Exposées</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Revue périodique des dossiers</li>
                                </ul>
                            </div>

                            {/* Item 6 */}
                            <div className="relative flex flex-col items-start p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
                                <div className="h-12 w-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-sans">Gouvernance des Données</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    Respect strict du RGPD avec minimisation de la collecte et anonymisation des données sensibles après traitement.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Chiffrement de bout en bout</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Droit à l'oubli automatisé</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"></div>Souveraineté des données (Hébergement FR)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
