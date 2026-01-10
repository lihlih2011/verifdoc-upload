import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [top, setTop] = useState<boolean>(true)
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Link to="/" className="block group">
              <span className="text-xl font-bold text-white tracking-tight">VERIFDOC</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link to="/solutions" className="text-slate-300 hover:text-white px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out font-medium">
                  {t('menu.solutions')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-300 hover:text-white px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out font-medium">
                  {t('menu.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-slate-300 hover:text-white px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out font-medium">
                  {t('menu.blog')}
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-slate-300 hover:text-white px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out font-medium">
                  {t('menu.about')}
                </Link>
              </li>
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <button
                  onClick={toggleLanguage}
                  className="font-medium text-slate-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  {i18n.language === 'fr' ? '🇺🇸 EN' : '🇫🇷 FR'}
                </button>
              </li>
              <li>
                <Link to="/signin" className="font-medium text-slate-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out">
                  {t('menu.login')}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn-sm text-white bg-blue-600 hover:bg-blue-500 ml-3 flex items-center px-4 py-2 rounded-full shadow-lg shadow-blue-600/20 transition-all">
                  <span>{t('menu.demo')}</span>
                  <svg className="w-3 h-3 fill-current text-white shrink-0 ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  )
}
