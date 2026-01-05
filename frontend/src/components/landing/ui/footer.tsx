import Logo from "./logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 text-gray-400 font-sm">

      {/* Background Gradient Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-900/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="mb-6 text-gray-400 max-w-sm">
              La plateforme de référence pour l'analyse forensique de documents et la détection de fraude.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors">X</div>
              <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors">Li</div>
              <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors">Gh</div>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Produit</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-primary-400 transition-colors">Fonctionnalités</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Tarifs</Link></li>
              <li><Link to="/api" className="hover:text-primary-400 transition-colors">API</Link></li>
              <li><Link to="/changelog" className="hover:text-primary-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li><Link to="/docs" className="hover:text-primary-400 transition-colors">Documentation</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/community" className="hover:text-primary-400 transition-colors">Communauté</Link></li>
              <li><Link to="/help" className="hover:text-primary-400 transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Confidentialité</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">CGU / CGV</Link></li>
              <li><Link to="/security" className="hover:text-primary-400 transition-colors">Sécurité</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 VerifDoc. Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Systèmes Opérationnels
          </p>
        </div>
      </div>
    </footer>
  );
}
