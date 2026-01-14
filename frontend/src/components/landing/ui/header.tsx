import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [top, setTop] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!top ? 'bg-[#020617]/90 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Site branding */}
        <div className="flex items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <Link to="/">
              <img src="/images/verifdoc-logo-v3.png" alt="VerifDoc" className="h-20 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105 mix-blend-screen invert grayscale brightness-200 contrast-200" />
            </Link>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
          <a href="/#features" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
            <span className="relative z-10">{t('nav.solutions')}</span>
          </a>
          <a href="/#developers" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
            <span className="relative z-10">{t('nav.developers')}</span>
          </a>
          <Link to="/resources" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
            <span className="relative z-10">Blog</span>
          </Link>
          <Link to="/company" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
            <span className="relative z-10">{t('nav.company')}</span>
          </Link>
          <Link to="/join-us" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span className="relative z-10">{t('nav.careers')}</span>
          </Link>
        </div>

        {/* Desktop sign in links */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-slate-400 hover:text-white font-medium text-sm transition-colors">
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>

          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
            {t('nav.login')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] border border-blue-400/20 hover:scale-105 active:scale-95">
            {t('nav.book_demo')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu (simplified for now) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617] border-t border-white/10 p-4">
          <div className="flex flex-col gap-4">
            <a href="/#features" className="text-slate-300">{t('nav.solutions')}</a>
            <Link to="/resources" className="text-slate-300">Blog</Link>
            <Link to="/login" className="text-blue-400">{t('nav.login')}</Link>
          </div>
        </div>
      )}
    </header>
  )
}
