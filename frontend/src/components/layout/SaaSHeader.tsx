import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun } from 'lucide-react';

export default function SaaSHeader() {
    const { t, i18n } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Force Dark Mode
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo-verifdoc-light.svg"
                            alt="VerifDoc"
                            className="h-12 w-auto transition-all"
                        />
                    </Link>
                </div>

                {/* Desktop Nav - Internationalized */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                        {t('nav.product')}
                    </Link>
                    <Link to="/use-cases" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                        {t('nav.use_cases')}
                    </Link>
                    <Link to="/solutions" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                        {t('nav.solutions')}
                    </Link>
                    <Link to="/company" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to="/developers" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                        {t('nav.developers')}
                    </Link>
                    <Link to="/#pricing" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                        {t('nav.pricing')}
                    </Link>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={toggleLanguage} className="text-sm font-bold text-slate-300 uppercase hover:text-blue-400">
                        {i18n.language === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <Link to="/login" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                        Connexion
                    </Link>
                    <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
                        {t('nav.book_demo')}
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800 bg-[#020617] p-4 flex flex-col gap-4 shadow-xl">
                    <Link to="/use-cases" className="text-slate-300 hover:text-white py-2">Cas d'Usage</Link>
                    <Link to="/solutions" className="text-slate-300 hover:text-white py-2">Solutions</Link>
                    <Link to="/company" className="text-slate-300 hover:text-white py-2">À Propos</Link>
                    <Link to="/pricing" className="text-slate-300 hover:text-white py-2">Tarifs</Link>
                    <Link to="/login" className="text-white font-bold py-2">Connexion</Link>
                    <div className="h-px bg-white/10 my-1" />
                    <button onClick={toggleLanguage} className="text-left text-slate-300 font-bold uppercase py-2">
                        {i18n.language === 'fr' ? 'English (EN)' : 'Français (FR)'}
                    </button>
                </div>
            )}
        </header>
    );
}
