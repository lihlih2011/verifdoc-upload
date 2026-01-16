import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun } from 'lucide-react';

export default function SaaSHeader() {
    const { i18n } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Theme Logic
    useEffect(() => {
        // Force dark mode on first load if no preference or default
        if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo-verifdoc.png" alt="VerifDoc Logo" className="h-40 w-auto scale-110 dark:brightness-0 dark:invert dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    Produit
                </Link>
                <Link to="/use-cases" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    Cas d'Usage
                </Link>
                <Link to="/solutions" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    Solutions
                </Link>
                <Link to="/company" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    À Propos
                </Link>
                <Link to="/developers" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    Développeurs
                </Link>
                <Link to="/pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    Tarifs
                </Link>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button onClick={toggleLanguage} className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase hover:text-blue-600">
                        {i18n.language}
                    </button>
                    <Link to="/login" className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                        Connexion
                    </Link>
                    <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
                        Réserver une démo
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] p-4 flex flex-col gap-4">
                    <Link to="/use-cases" className="text-slate-600 dark:text-slate-300 py-2">Cas d'Usage</Link>
                    <Link to="/solutions" className="text-slate-600 dark:text-slate-300 py-2">Solutions</Link>
                    <Link to="/company" className="text-slate-600 dark:text-slate-300 py-2">À Propos</Link>
                    <Link to="/pricing" className="text-slate-600 dark:text-slate-300 py-2">Tarifs</Link>
                    <Link to="/login" className="text-slate-900 dark:text-white font-bold py-2">Connexion</Link>
                    <button onClick={toggleTheme} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 py-2">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} Mode {theme === 'light' ? 'Sombre' : 'Clair'}
                    </button>
                </div>
            )}
        </header>
    );
}
