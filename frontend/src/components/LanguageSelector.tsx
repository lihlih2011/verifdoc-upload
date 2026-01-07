
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';

const LANGUAGES = [
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'de', name: 'Deutsch', flag: 'de' },
    { code: 'pt', name: 'Português', flag: 'pt' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'jp', name: '日本語', flag: 'jp' }, // Using 'jp' for flag-icon-css usually works or 'jp' country code
    { code: 'cn', name: '简体中文', flag: 'cn' },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = LANGUAGES.find(l => l.code === i18n.language?.split('-')[0]) || LANGUAGES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
            >
                <Globe size={16} />
                <span className="text-sm font-medium uppercase">{currentLanguage.code}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-slate-50 transition-colors text-slate-700 text-sm"
                        >
                            <span className={`fi fi-${lang.flag} rounded-sm shadow-sm`}></span>
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
