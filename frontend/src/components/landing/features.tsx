// Clean imports
export default function Features() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[120px] -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-nacelle mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Conçu pour l'élite de la cybersécurité
          </h2>
          <p className="text-lg text-gray-400">
            Une suite d'outils forensiques unifiée pour détecter, analyser et bloquer la fraude documentaire à grande échelle.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Forensique Documentaire</h3>
              <p className="text-gray-400">Analyse de 500+ marqueurs invisibles (métadonnées, compression, structure hexadécimale) pour révéler les retouches.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Détection Template Farms</h3>
              <p className="text-gray-400">Identification automatique des séries de faux générés par des usines à fraude via l'analyse de similarité vectorielle.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Vitesse & Scalabilité</h3>
              <p className="text-gray-400">Traitement asynchrone ultra-rapide (&lt; 3s/doc) capable d'absorber des pics de charge de milliers de fichiers.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rapports Certifiés VDS</h3>
              <p className="text-gray-400">Génération de preuves juridiques opposables (PDF signés) conformes aux standards bancaires européens.</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Souveraineté des Données</h3>
              <p className="text-gray-400">Hébergement 100% français, conforme RGPD/SecNumCloud. Aucune donnée ne transite par des serveurs tiers US.</p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">API First</h3>
              <p className="text-gray-400">Intégrez nos moteurs de détection directement dans vos workflows (KYC, Onboarding) via notre API RESTful documentée.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
