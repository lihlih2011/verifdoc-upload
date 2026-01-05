import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    ShieldCheck,
    ScanLine,
    FileSearch,
    Lock,
    X,
    Menu,
    ArrowRight,
    Zap,
    UploadCloud,
    Search,
    ShieldAlert,
    Globe2,
    Building2,
    PlayCircle
} from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- COMPOSANT: BADGE DE CONFIANCE ---
const TrustBadge = () => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
        <ShieldCheck size={14} />
        <span>ISO 27001 Certified</span>
    </div>
);

// --- COMPOSANT: DÉMO SCANNER (Simule l'analyse) ---
const ScannerDemo = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'authentic' | 'fake'>('fake');

    return (
        <div className="relative w-full max-w-4xl mx-auto mt-12 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group text-left">
            {/* Barre de Contrôle */}
            <div className="h-14 bg-zinc-900/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-6 z-20 relative">
                <div className="font-bold text-white text-sm">LIVE ANALYSIS DEMO</div>
                <div className="flex items-center bg-black rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setStatus('authentic')}
                        className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                            status === 'authentic' ? "bg-emerald-500 text-white shadow-lg" : "text-zinc-500 hover:text-white")}
                    >
                        Valid
                    </button>
                    <button
                        onClick={() => setStatus('fake')}
                        className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                            status === 'fake' ? "bg-red-500 text-white shadow-lg" : "text-zinc-500 hover:text-white")}
                    >
                        Fake
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 h-[450px]">
                {/* Zone Visuelle Gauche */}
                <div className="relative bg-zinc-900 border-r border-white/5 p-6 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    {/* Fausse Carte d'identité */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="relative w-64 aspect-[1.586] bg-slate-200 rounded-xl shadow-2xl p-4 overflow-hidden"
                            style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400")',
                                backgroundSize: 'cover',
                                backgroundBlendMode: 'overlay'
                            }}
                        >
                            {/* Overlay Scanner Laser */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

                            {/* Zones suspectes (Rouges) si Fake */}
                            {status === 'fake' && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                                        className="absolute top-1/2 right-4 w-16 h-6 border-2 border-red-500 bg-red-500/20 rounded z-10"
                                    ></motion.div>
                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">MODIFIED</div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Zone Logs Droite */}
                <div className="p-8 bg-black flex flex-col justify-center font-mono">
                    <div className="mb-6">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">ANALYSIS RESULT</div>
                        <AnimatePresence mode="wait">
                            {status === 'fake' ? (
                                <motion.div
                                    key="fake-res"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <h2 className="text-3xl font-black text-red-500 flex items-center gap-3 mb-2">
                                        HIGH RISK <ShieldAlert size={28} />
                                    </h2>
                                    <p className="text-sm text-red-400">[CODE:FRAUD_DETECTED_781]</p>
                                    <div className="mt-4 space-y-2 text-xs text-zinc-400">
                                        <div className="flex justify-between"><span className="text-red-400">Metadata Inconsistency</span> <span>DETECTED</span></div>
                                        <div className="flex justify-between"><span className="text-red-400">Font Mismatch</span> <span>DETECTED</span></div>
                                        <div className="flex justify-between"><span>Liveness Check</span> <span className="text-emerald-500">PASSED</span></div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="real-res"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <h2 className="text-3xl font-black text-emerald-500 flex items-center gap-3 mb-2">
                                        VERIFIED <CheckCircle2 size={28} />
                                    </h2>
                                    <p className="text-sm text-emerald-400">[CODE:AUTH_CONFIRMED]</p>
                                    <div className="mt-4 space-y-2 text-xs text-zinc-400">
                                        <div className="flex justify-between"><span>Metadata</span> <span className="text-emerald-500">VALID</span></div>
                                        <div className="flex justify-between"><span>Integrity Check</span> <span className="text-emerald-500">PASSED</span></div>
                                        <div className="flex justify-between"><span>Fraud Score</span> <span className="text-emerald-500">0.2%</span></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function LandingPageV2() {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">

            {/* NAVBAR */}
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-[#020617]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo-verifdoc-brain.png" alt="VerifDoc" className="h-10 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:block">VERIFDOC</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#features" className="hover:text-white transition-colors">Solutions</a>
                        <a href="#tech" className="hover:text-white transition-colors">Technologie</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex gap-2 text-xs font-mono mr-4 border-r border-white/10 pr-4">
                            <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'text-white' : 'text-zinc-600'}>FR</button>
                            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'text-white' : 'text-zinc-600'}>EN</button>
                        </div>
                        <Link to="/signin" className="text-sm font-medium hover:text-white transition-colors">Connexion</Link>
                        <Link to="/signup" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]">
                            Essai Gratuit
                        </Link>
                    </div>

                    <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8"
                    >
                        VERSION LIVE - SYSTEME PRET
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                        La référence de l'analyse <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">documentaire IA.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Détectez les fraudes, vérifiez les identités et automatisez vos processus KYC en temps réel grâce à notre technologie forensique propriétaire.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                            Commencer maintenant <ArrowRight size={18} />
                        </Link>
                        <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors backdrop-blur-sm">
                            Voir les prix
                        </a>
                    </div>

                    <ScannerDemo />
                </div>
            </section>

            {/* CLIENTS */}
            <section className="py-12 border-y border-white/5 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-mono text-slate-500 mb-8 uppercase tracking-widest">Ils font confiance à VerifDoc</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
                        <div className="text-xl font-bold text-white flex items-center gap-2"><Globe2 size={24} /> GlobalBank</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2"><Building2 size={24} /> ImmoTrust</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2"><ShieldCheck size={24} /> SecurePay</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2"><Lock size={24} /> CyberGuard</div>
                    </div>
                </div>
            </section>


            {/* FEATURES */}
            <section id="features" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Une sécurité sans compromis</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Notre suite d'outils couvre l'ensemble du cycle de vie du document.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <ScanLine size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Analyse Forensique Profonde</h3>
                            <p className="text-slate-400 mb-6">Pixel-analysis, Metadata extraction, ELA.</p>
                        </div>
                        <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Conformité</h3>
                            <p className="text-slate-400 mb-6">RGPD, eIDAS Ready.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TARIFS (PRICING) */}
            <section id="pricing" className="py-24 bg-[#050914] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Tarification Transparente</h2>
                    <p className="text-slate-400 mb-16 max-w-2xl mx-auto">Choisissez la puissance dont vous avez besoin.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                        {/* START */}
                        <div className="bg-slate-900/20 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                            <h3 className="font-bold text-white text-xl mb-2">Start</h3>
                            <div className="text-4xl font-bold text-white mb-6">99 €<span className="text-sm text-slate-500 font-normal">/mois</span></div>
                            <ul className="space-y-4 text-sm text-slate-400 mb-8">
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> 500 Vérifications</li>
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> OCR Standard</li>
                            </ul>
                            <Link to="/signup?plan=start" className="block w-full py-3 bg-slate-800 text-white text-center rounded-lg font-medium hover:bg-slate-700 transition-colors">Choisir Start</Link>
                        </div>

                        {/* EXPERT */}
                        <div className="bg-slate-900/80 border border-blue-500/50 rounded-2xl p-8 relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
                            <div className="absolute top-0 right-0 py-1 px-3 bg-blue-600 text-white text-[10px] font-bold rounded-bl-xl rounded-tr-xl">RECOMMANDÉ</div>
                            <h3 className="font-bold text-white text-xl mb-2">Expert</h3>
                            <div className="text-4xl font-bold text-white mb-6">299 €<span className="text-sm text-slate-500 font-normal">/mois</span></div>
                            <ul className="space-y-4 text-sm text-slate-300 mb-8">
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> 2,000 Vérifications</li>
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> <span className="font-bold text-white">Analyse Forensique ELA</span></li>
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Détection Photoshop</li>
                            </ul>
                            <Link to="/signup?plan=expert" className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-bold hover:bg-blue-500 transition-colors">Choisir Expert</Link>
                        </div>

                        {/* ENTREPRISE */}
                        <div className="bg-slate-900/20 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                            <h3 className="font-bold text-white text-xl mb-2">Entreprise</h3>
                            <div className="text-4xl font-bold text-white mb-6">Sur Devis</div>
                            <ul className="space-y-4 text-sm text-slate-400 mb-8">
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> Volume Illimité</li>
                                <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> Custom SLA</li>
                            </ul>
                            <Link to="/contact" className="block w-full py-3 bg-slate-800 text-white text-center rounded-lg font-medium hover:bg-slate-700 transition-colors">Nous Contacter</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#020617] border-t border-white/10 pt-20 pb-10 text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/images/logo-verifdoc-brain.png" alt="VerifDoc" className="h-8 w-auto" />
                            <span className="text-lg font-bold text-white uppercase tracking-tight">VERIFDOC</span>
                        </div>
                        <p className="opacity-60 mb-6">
                            L'IA de confiance pour sécuriser vos échanges documentaires.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Produit</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Solutions</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Tarifs</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
                    <div>&copy; 2026 VerifDoc SAS.</div>
                    <div className="flex items-center gap-4">
                        <span>Paris, France 🇫🇷</span>
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">Version 3.0.0</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
