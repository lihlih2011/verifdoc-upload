import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
    { code: 'en', name: 'English', country_code: 'gb' },
    { code: 'pt', name: 'Português', country_code: 'pt' },
    { code: 'es', name: 'Español', country_code: 'es' },
    { code: 'de', name: 'Deutsch', country_code: 'de' },
    { code: 'fr', name: 'Français', country_code: 'fr' },
    { code: 'ru', name: 'Русский', country_code: 'ru' },
    { code: 'ja', name: '日本語', country_code: 'jp' },
    { code: 'ar', name: 'العربية', country_code: 'sa', dir: 'rtl' },
    { code: 'zh-CN', name: '简体中文', country_code: 'cn' },
    { code: 'zh-TW', name: '繁體中文', country_code: 'tw' },
    { code: 'hi', name: 'हिन्दी', country_code: 'in' },
    { code: 'sv', name: 'Svenska', country_code: 'se' },
];

export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
        // Handle RTL for Arabic
        document.documentElement.dir = (langCode === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = langCode;
    };

    const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES.find(l => i18n.language.startsWith(l.code)) || LANGUAGES[0];

    return (
        <div className="relative z-50 font-sans" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 bg-white shadow-sm"
            >
                <img
                    src={`https://flagcdn.com/w40/${currentLang.country_code}.png`}
                    srcSet={`https://flagcdn.com/w80/${currentLang.country_code}.png 2x`}
                    width="20"
                    height="15"
                    alt={currentLang.name}
                    className="rounded-sm object-cover"
                />
                <span className="text-sm font-medium text-slate-700 hidden sm:inline">{currentLang.name}</span>
                <ChevronDown size={14} className="text-slate-400" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 max-h-[80vh] overflow-y-auto custom-scrollbar"
                    >
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://flagcdn.com/w40/${lang.country_code}.png`}
                                        srcSet={`https://flagcdn.com/w80/${lang.country_code}.png 2x`}
                                        width="20"
                                        height="15"
                                        alt={lang.name}
                                        className={`rounded-sm object-cover shadow-sm ${i18n.language === lang.code ? "opacity-100" : "opacity-80"}`}
                                    />
                                    <span className="font-medium">{lang.name}</span>
                                </div>
                                {i18n.language === lang.code && <Check size={16} className="text-blue-600" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
