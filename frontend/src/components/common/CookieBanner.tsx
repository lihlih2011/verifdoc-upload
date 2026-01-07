import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Petit délai pour l'animation
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="max-w-4xl mx-auto bg-[#0f172a]/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">

                <div className="bg-slate-800 p-3 rounded-xl hidden md:block">
                    <ShieldCheck className="text-blue-500 w-8 h-8" />
                </div>

                <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">Confidentialité & Transparence 🍪</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Nous utilisons des cookies essentiels pour sécuriser votre session et analyser anonymement le trafic.
                        Aucune donnée personnelle n'est revendue. Vos documents sont chiffrés et supprimés après analyse.
                    </p>
                    <div className="mt-2 text-xs">
                        <Link to="/confidentialite" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 mr-4">Politique de confidentialité</Link>
                        <Link to="/cgv" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">Conditions d'utilisation</Link>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-bold text-sm hover:bg-slate-800 transition-colors uppercase tracking-wide"
                    >
                        Refuser
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all uppercase tracking-wide flex-1 md:flex-none whitespace-nowrap"
                    >
                        Tout Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}
