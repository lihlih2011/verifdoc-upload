import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function MainHeader() {
  const [top, setTop] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to LIGHT
  const { t, i18n } = useTranslation();

  // Initialize Theme from localStorage or Default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

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

  // Dynamic Styles based on Theme and Scroll
  const headerClass = !top
    ? (theme === 'dark' ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm')
    : 'bg-transparent border-transparent'; // Keep transparent ONLY at very top to show hero, but ensure text is readable

  // FORCE High Contrast Text Colors
  const textClass = theme === 'dark'
    ? 'text-white font-bold hover:text-blue-400'
    : 'text-slate-900 font-bold hover:text-blue-700';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Site branding */}
        <div className="flex items-center group cursor-pointer">
          <Link to="/" className="relative flex items-center gap-2">
            {/* USER REQUESTED HTML STRUCTURE - CLEANED */}
            <div className="flex items-center">
              <img
                src="/images/verifdoc-logo-2026.png"
                alt="VerifDoc"
                className="h-10 w-auto transition-all duration-300 dark:brightness-0 dark:invert"
              />
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className={`hidden md:flex items-center gap-1 p-1 rounded-full border backdrop-blur-sm transition-all
          ${theme === 'dark' || top ? 'bg-white/5 border-white/5' : 'bg-slate-100/50 border-slate-200'}
        `}>
          {['solutions', 'developers', 'company'].map((item) => (
            <a key={item} href={`/#${item}`} className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative overflow-hidden group flex items-center gap-2 ${textClass}`}>
              <span className="relative z-10">{t(`nav.${item}`) || item}</span>
            </a>
          ))}
          <Link to="/resources" className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative overflow-hidden group flex items-center gap-2 ${textClass}`}>
            <span className="relative z-10">Blog</span>
          </Link>
          <Link to="/join-us" className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative overflow-hidden group flex items-center gap-2 ${textClass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span className="relative z-10">{t('nav.careers')}</span>
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${theme === 'dark' || top ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

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
        <button className={`md:hidden p-2 ${theme === 'dark' || top ? 'text-white' : 'text-slate-800'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t p-4 ${theme === 'dark' ? 'bg-[#020617] border-white/10' : 'bg-white border-slate-100'}`}>
          <div className="flex flex-col gap-4">
            <a href="/#features" className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{t('nav.solutions')}</a>
            <Link to="/resources" className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>Blog</Link>
            <button onClick={toggleTheme} className="flex items-center gap-2 text-blue-500 font-medium">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
            </button>
            <Link to="/login" className="text-blue-600 font-bold">{t('nav.login')}</Link>
          </div>
        </div>
      )}
    </header>
  )
}
