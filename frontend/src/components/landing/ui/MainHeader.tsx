import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

export default function MainHeader() {
  const [top, setTop] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, i18n } = useTranslation();

  // FORCE DARK MODE on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Ensure scroll listener to handle transparency
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
    }
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  // Dynamic Styles (Now exclusively dark-themed)
  const headerClass = !top
    ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
    : 'bg-transparent border-transparent';

  const textClass = 'text-white font-bold hover:text-blue-400';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
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

        {/* Desktop Actions */}
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

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-[#020617] border-white/10 shadow-2xl">
          <div className="flex flex-col gap-4">
            <a href="/#features" className="text-slate-300 hover:text-white transition-colors">{t('nav.product')}</a>
            <Link to="/use-cases" className="text-slate-300 hover:text-white transition-colors">{t('nav.use_cases')}</Link>
            <Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">{t('nav.solutions')}</Link>
            <Link to="/company" className="text-slate-300 hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link to="/developers" className="text-slate-300 hover:text-white transition-colors">{t('nav.developers')}</Link>
            <a href="/#pricing" className="text-slate-300 hover:text-white transition-colors">{t('nav.pricing')}</a>

            <div className="h-px bg-white/10 my-2" />

            <button onClick={toggleLanguage} className="text-left text-slate-300 font-bold uppercase">
              {i18n.language === 'fr' ? 'English (EN)' : 'Français (FR)'}
            </button>
            <Link to="/login" className="text-blue-500 font-bold">{t('nav.login')}</Link>
            <Link to="/contact" className="w-full py-3 bg-blue-600 text-white rounded-lg text-center font-bold">
              {t('nav.book_demo')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
