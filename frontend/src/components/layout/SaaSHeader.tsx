import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

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

    const textClass = 'text-white font-bold hover:text-blue-400';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Site branding */}
                <div className="flex items-center group cursor-pointer">
                    <Link to="/" className="relative flex items-center gap-2">
                        <div className="flex items-center">
                            <img
                                src="/logo-verifdoc-light.svg"
                                alt="VerifDoc"
                                className="h-14 w-auto transition-all duration-300"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-1 p-1 rounded-full border backdrop-blur-sm transition-all bg-white/5 border-white/5">
                    {[
                        { key: 'product', path: '/#features' },
                        { key: 'use_cases', path: '/use-cases' },
                        { key: 'solutions', path: '/solutions' },
                        { key: 'about', path: '/company' },
                        { key: 'developers', path: '/developers' },
                        { key: 'pricing', path: '/#pricing' }
                    ].map(({ key, path }) => (
                        path.startsWith('/#') ? (
                            <a key={key} href={path} className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative overflow-hidden group flex items-center gap-2 ${textClass}`}>
                                <span className="relative z-10">{t(`nav.${key}`)}</span>
                            </a>
                        ) : (
                            <Link key={key} to={path} className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative overflow-hidden group flex items-center gap-2 ${textClass}`}>
                                <span className="relative z-10">{t(`nav.${key}`)}</span>
                            </Link>
                        )
                    ))}
                    <Link to="/join-us" className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative overflow-hidden group flex items-center gap-2 ${textClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                        <span className="relative z-10">{t('nav.careers')}</span>
                    </Link>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={toggleLanguage} className={`font-medium text-sm transition-colors ${textClass}`}>
                        {i18n.language === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <Link to="/login" className={`text-sm font-medium transition-colors relative group ${textClass}`}>
                        {t('nav.login')}
                    </Link>
                    <Link to="/contact" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95">
                        {t('nav.book_demo')}
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
