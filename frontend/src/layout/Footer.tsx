import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 px-6">
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
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-semibold text-gray-300">ISO 27001 Certified</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            <span className="text-xs font-semibold text-gray-300">GDPR Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
                            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                            <span className="text-xs font-semibold text-gray-300">EU AI Act Ready</span>
                        </div>
                    </div>
                </div>

                {/* Colonne 2 : Liens Légaux */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Légal</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-cyan-400 transition">CGU / CGV</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">Confidentialité</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">Mentions Légales</a></li>
                        <li><a href="#" className="hover:text-cyan-400 transition">Sécurité des Données</a></li>
                    </ul>
                </div>

                {/* Colonne 3 : Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm">
                        <li>support@verifdoc.io</li>
                        <li>Paris, France 🇫🇷</li>
                        <li className="pt-4 text-xs text-gray-500">
                            Bien que nous nous efforcions d'assurer l'exactitude de nos solutions,
                            VERIFDOC ne garantit pas la prévention de toutes les activités frauduleuses.
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
