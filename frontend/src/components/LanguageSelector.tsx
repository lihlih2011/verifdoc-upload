
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'flag-icons/css/flag-icons.min.css';

const LANGUAGES = [
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'de', name: 'Deutsch', flag: 'de' },
    { code: 'pt', name: 'Português', flag: 'pt' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'jp', name: '日本語', flag: 'jp' },
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
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${isOpen
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
            >
                <span className={`fi fi-${currentLanguage.flag} rounded-sm shadow-sm scale-75`}></span>
                <span className="text-xs font-bold tracking-wide uppercase hidden sm:block">{currentLanguage.code}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-3 w-48 bg-[#0B0F17]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-2 z-50 overflow-hidden"
                    >
                        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 mb-1">
                            Sélectionnez la langue
                        </div>
                        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {LANGUAGES.map((lang) => {
                                const isActive = currentLanguage.code === lang.code;
                                return (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-all duration-200 group text-sm ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`fi fi-${lang.flag} rounded-[2px] shadow-sm transform group-hover:scale-110 transition-transform`}></span>
                                            <span className="font-medium">{lang.name}</span>
                                        </div>
                                        {isActive && <Check size={14} className="text-blue-500" />}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
