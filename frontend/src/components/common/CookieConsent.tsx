import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    }

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-md border border-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-500/10 rounded-xl hidden md:block">
                        <Cookie className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-1">Cookies & Confidentialité</h4>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                            {t('cookie.text')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        {t('cookie.decline')}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
                    >
                        {t('cookie.accept')}
                    </button>
                </div>

            </div>
        </div>
    );
}
