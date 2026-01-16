import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function SaaSFooter() {
    return (
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1121] text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-blue-600" size={24} />
                        <span className="font-bold text-slate-900 dark:text-white text-lg">VerifDoc</span>
                    </div>

                    <div className="flex gap-8 text-sm font-medium">
                        <Link to="/solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
                        <Link to="/developers" className="hover:text-blue-600 transition-colors">API</Link>
                        <Link to="/pricing" className="hover:text-blue-600 transition-colors">Tarifs</Link>
                        <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-blue-600 transition-colors">Confidentialité</Link>
                        <Link to="/terms" className="hover:text-blue-600 transition-colors">CGU</Link>
                        <Link to="/mentions-legales" className="hover:text-blue-600 transition-colors">Mentions Légales</Link>
                    </div>
                    <div>
                        © 2024 VerifDoc Inc. Paris. Tous droits réservés.
                    </div>
                </div>

            </div>
        </footer>
    );
}
