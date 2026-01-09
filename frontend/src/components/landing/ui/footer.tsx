import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Colonne 1 : Logo & Certifs */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="VerifDoc AI" className="h-10 w-10" />
            <span className="text-2xl font-bold text-white tracking-tight">VerifDoc</span>
          </div>

          <p className="text-sm leading-relaxed max-w-sm">
            VerifDoc Intelligence Inc. fournit des solutions de sécurité avancées basées sur l'IA,
            conçues pour aider les entreprises à améliorer leur conformité et leurs efforts de détection de la fraude.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* Badges de Certification */}
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700 hover:border-green-500/50 transition duration-300">
              <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              <span className="text-xs font-semibold text-gray-300">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700 hover:border-blue-500/50 transition duration-300">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              <span className="text-xs font-semibold text-gray-300">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700 hover:border-purple-500/50 transition duration-300">
              <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
              <span className="text-xs font-semibold text-gray-300">EU AI Act Ready</span>
            </div>
          </div>
        </div>

        {/* Colonne 2 : Liens Légaux */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Légal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition hover:underline decoration-cyan-400/30">CGU / CGV</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition hover:underline decoration-cyan-400/30">Confidentialité</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition hover:underline decoration-cyan-400/30">Mentions Légales</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition hover:underline decoration-cyan-400/30">Sécurité des Données</a></li>
          </ul>
        </div>

        {/* Colonne 3 : Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              support@verifdoc.io
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Paris, France 🇫🇷
            </li>
            <li className="pt-6 text-xs text-gray-600 leading-snug">
              ⚠️ Bien que nous nous efforcions d'assurer l'exactitude de nos solutions,
              VERIFDOC ne garantit pas la détection ou la prévention de toutes les activités frauduleuses.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} VerifDoc Intelligence Inc. Tous droits réservés.
      </div>
    </footer>
  );
}
