import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';

export const ForgotPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [timer, setTimer] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Timer Logic
    React.useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendRequest();
    };

    const sendRequest = async () => {
        setStatus('loading');
        setErrorMessage('');
        try {
            await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
            setStatus('success');
            setTimer(60);
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.status === 429) {
                setStatus('error');
                setErrorMessage(err.response.data.detail || "Trop de tentatives. Réessayez plus tard.");
            } else {
                setStatus('success');
            }
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            sendRequest();
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-[#0b101e] border border-slate-800 rounded-2xl p-8 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-blue-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-600/20">
                        <ShieldCheck className="text-blue-500 w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Récupération de compte</h1>
                    <p className="text-slate-400 text-sm">
                        Entrez votre email pour recevoir un lien de réinitialisation sécurisé.
                    </p>
                </div>

                {/* Global Error Banner */}
                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in shake">
                        <AlertCircle className="text-red-500 min-w-[20px]" size={20} />
                        <span className="text-red-400 text-sm font-medium">{errorMessage}</span>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' ? (
                    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col items-center gap-3">
                            <CheckCircle className="text-emerald-500 w-10 h-10" />
                            <div>
                                <h3 className="text-emerald-400 font-bold mb-1">Email Envoyé !</h3>
                                <p className="text-emerald-500/80 text-sm">
                                    Si un compte existe pour <strong>{email}</strong>, vous recevrez les instructions sous quelques minutes.
                                </p>
                            </div>
                        </div>

                        {/* RESEND SECTION */}
                        <div className="bg-slate-900/50 rounded-xl p-4">
                            <p className="text-slate-400 text-sm mb-3">Vous n'avez rien reçu ?</p>
                            <button
                                onClick={handleResend}
                                disabled={timer > 0}
                                className="text-sm font-bold text-blue-400 hover:text-blue-300 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
                            >
                                {timer > 0 ? `Renvoyer l'email (${timer}s)` : "Renvoyer l'email maintenant"}
                            </button>
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                            <Link to="/login" className="text-slate-400 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
                                <ArrowLeft size={16} /> Retour à la connexion
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Form State */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 block">Email Professionnel</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="nom@entreprise.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : (
                                "Envoyer le lien magique"
                            )}
                        </button>

                        <div className="pt-2 text-center">
                            <Link to="/login" className="text-slate-500 hover:text-white text-sm transition-colors">
                                Annuler et retourner à la connexion
                            </Link>
                        </div>
                    </form>
                )}

                {/* Footer Security Badge */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-2 opacity-50">
                    <ShieldCheck size={12} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">VerifDoc Secure Vault</span>
                </div>
            </div>
        </div>
    );
};
