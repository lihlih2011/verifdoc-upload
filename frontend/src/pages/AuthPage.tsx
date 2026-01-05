import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
// import { useTranslation } from 'react-i18next';
import {
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    Smartphone,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    // --- STATE MANAGEMENT ---
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState<'credentials' | '2fa'>(isLogin ? 'credentials' : 'credentials'); // Login flow steps
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [twoFACode, setTwoFACode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Refs for OTP inputs focus management
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Reset flow when switching mode
    useEffect(() => {
        setStep('credentials');
        setError("");
    }, [isLogin]);

    const validatePassword = (pwd: string) => {
        // Simplified: 8 chars, 1 uppercase, 1 number
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(pwd);
    };

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit logic started");
        setLoading(true);
        setError("");

        // Validation (Inscription)
        if (!isLogin && !validatePassword(password)) {
            setLoading(false);
            console.log("Validation failed");
            setError("Le mot de passe doit contenir 8 caractères, une majuscule et un chiffre.");
            return;
        }

        // Simulation verification credentials
        setTimeout(() => {
            setLoading(false);
            if (isLogin) {
                // If login, match mock demo accounts or generic
                if (email === "demo@verifdoc.io" && password !== "demo123") {
                    setError("Identifiants incorrects (Essayez demo123)");
                    return;
                }
                setStep('2fa');
            } else {
                setStep('2fa');
            }
        }, 1000);
    };

    /* MOCK MODE TEMPORAIRE POUR DEMO */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation connexion réussie directe
        localStorage.setItem('token', 'fake-demo-token');
        localStorage.setItem('user', JSON.stringify({ name: 'Admin Demo', role: 'admin' }));
        window.location.href = '/dashboard/admin';
        return;
    };

    /* ANCIEN CODE DESACTIVE
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      // ... code réseau ...
    };
    */
    const handle2FASubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulation verify code
        setTimeout(() => {
            setLoading(false);
            // SUCCESS LOGIN
            login("demo-token-jwt-secure-123", {
                full_name: email.split('@')[0],
                email: email,
                role: "admin",
                credits: 100
            });
            navigate('/dashboard');
        }, 1500);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0]; // Only 1 char
        const newCode = [...twoFACode];
        newCode[index] = value;
        setTwoFACode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Backspace handling
        if (e.key === 'Backspace' && !twoFACode[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">

            {/* LEFT COLUMN - VISUAL */}
            <div className="hidden lg:flex w-1/2 bg-[#020617] relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="z-10 relative">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">V</div>
                        <span className="text-2xl font-black tracking-tighter">VERIFDOC</span>
                    </div>
                </div>

                <div className="z-10 relative max-w-md">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        {step === '2fa'
                            ? "Sécurité maximale activée."
                            : (isLogin ? "Sécurisez vos documents avec la puissance de l'IA." : "Rejoignez la référence mondiale.")
                        }
                    </h2>

                    {step === '2fa' ? (
                        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-blue-600 p-3 rounded-lg"><ShieldCheck size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg">Authentification Forte</h3>
                                    <p className="text-blue-200 text-sm">Protection bancaire active</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Nous utilisons une authentification à double facteur pour garantir que vous seul pouvez accéder à vos rapports sensibles.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4 text-slate-400">
                            <div className="flex items-center gap-3"><CheckCircle2 className="text-blue-500" size={20} /><span>Détection de fraude ISO 27001</span></div>
                            <div className="flex items-center gap-3"><CheckCircle2 className="text-blue-500" size={20} /><span>Analyse en temps réel</span></div>
                            <div className="flex items-center gap-3"><CheckCircle2 className="text-blue-500" size={20} /><span>Rapports certifiés juridiquement</span></div>
                        </div>
                    )}
                </div>

                <div className="z-10 relative text-xs text-slate-600">© 2026 VerifDoc Inc. All rights reserved.</div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* RIGHT COLUMN - FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">

                    {/* 2FA STEP */}
                    {step === '2fa' ? (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                    <Smartphone size={32} />
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 mb-2">Vérification 2FA</h1>
                                <p className="text-slate-500 max-w-xs mx-auto">
                                    Entrez le code à 6 chiffres envoyé au <strong className="text-slate-800">{email || "votre email"}</strong>
                                </p>
                            </div>

                            <form onSubmit={handle2FASubmit}>
                                <div className="flex justify-center gap-2 mb-8">
                                    {twoFACode.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            ref={(el) => { otpRefs.current[idx] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                            className="w-12 h-14 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                                >
                                    {loading ? <span className="animate-pulse">Vérification...</span> : "Confirmer l'accès"}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button onClick={() => setStep('credentials')} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    ← Retour à la connexion
                                </button>
                            </div>
                        </div>
                    ) : (
                        // CREDENTIALS STEP
                        <div className="animate-in fade-in slide-in-from-left-8 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-black text-slate-900 mb-2">
                                    {isLogin ? "Bon retour" : "Créer un compte"}
                                </h1>
                                <p className="text-slate-500">
                                    {isLogin ? "Entrez vos identifiants sécurisés." : "Commencez votre essai gratuit de 14 jours."}
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 mb-6">
                                    <AlertCircle size={20} />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Email professionnel</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="nom@entreprise.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Mot de passe</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                                >
                                    {loading ? <span className="animate-pulse">Traitement...</span> : (
                                        <>
                                            {isLogin ? "Continuer" : "S'inscrire"}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center text-sm">
                                <span className="text-slate-500">
                                    {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                                </span>
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 font-bold text-blue-600 hover:text-blue-700"
                                >
                                    {isLogin ? "S'inscrire" : "Se connecter"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
