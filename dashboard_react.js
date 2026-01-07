import React, { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard,
    Database,
    Zap,
    Users,
    Scale,
    Home,
    Play,
    AlertCircle,
    CheckCircle2,
    BarChart3,
    Code2,
    FileText,
    Cpu,
    Rocket,
    Layers,
    Activity,
    Target,
    ShieldCheck,
    ClipboardList,
    Compass,
    Lightbulb,
    Plus,
    Trash2,
    BrainCircuit,
    Eye,
    BookOpen,
    Link,
    Globe,
    Server,
    Key,
    Calendar,
    ChevronRight,
    Wind,
    Terminal,
    Pause,
    Monitor,
    CreditCard,
    Briefcase,
    Gavel,
    RefreshCw,
    Search,
    Save,
    CpuIcon,
    Laptop,
    Building,
    Megaphone,
    Euro,
    Mail,
    Presentation,
    Video,
    Settings
} from 'lucide-react';

const App = () => {
    // --- États Globaux ---
    const [activeSectorId, setActiveSectorId] = useState(0);
    const [view, setView] = useState('business_roadmap');
    const [progress, setProgress] = useState(0);
    const [agentStatus, setAgentStatus] = useState('Idle');
    const [logs, setLogs] = useState([
        "[ANTIGRAVITY-SDK-2025] Initialisation du framework sur PC local...",
        "[GEMINI-PRO] Moteur d'analyse couplé via API Bridge.",
        "[DASHBOARD] Authentification réussie. Session active."
    ]);
    const [validatedCount, setValidatedCount] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    const [validationQueue, setValidationQueue] = useState([
        { id: 'AG-2025-X1', name: 'Dossier Test Immo', confidence: 0.97, status: 'Pending', type: 'Fiche de Paie', timestamp: '11:20' }
    ]);

    const scrollRef = useRef(null);

    // --- Secteurs prioritaires ---
    const sectors = [
        { id: 0, name: 'Immobilier & Syndic', priority: 'P1', icon: <Home size={18} />, docs: ['Fiche de Paie', 'Avis d\'Imposition', 'CNI'] },
        { id: 1, name: 'Courtage & Crédit', priority: 'P2', icon: <CreditCard size={18} />, docs: ['Relevés Bancaires', 'Tableaux d\'Amortissement'] },
        { id: 2, name: 'Assurance', priority: 'P3', icon: <ShieldCheck size={18} />, docs: ['Attestations Sinistres', 'Relevés d\'Information'] }
    ];

    // --- Boîte à Idées ---
    const [ideas, setIdeas] = useState([]);
    const [newIdeaText, setNewIdeaText] = useState("");

    // --- Auto-scroll Terminal ---
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    // --- LOGIQUE : RUNNER ANTIGRAVITY (SDK 2025) ---
    const runAntigravitySDK = async () => {
        if (agentStatus === 'Running') return;
        setAgentStatus('Running');
        const addLog = (msg) => setLogs(prev => [...prev, `[ANTIGRAVITY] ${msg}`]);

        addLog(`Lancement du moteur d'extraction pour le secteur ${sectors[activeSectorId].name}...`);

        for (let i = 0; i < sectors[activeSectorId].docs.length; i++) {
            const currentDoc = sectors[activeSectorId].docs[i];
            setProgress(((i + 1) / sectors[activeSectorId].docs.length) * 100);
            addLog(`[GEMINI-PRO-INTERNAL] Analyse structurelle de : ${currentDoc}...`);
            await new Promise(r => setTimeout(r, 1200));

            const newDoc = {
                id: `AG-${Math.floor(Math.random() * 9000 + 1000)}`,
                name: `Dossier ${sectors[activeSectorId].name.split(' ')[0]}`,
                type: currentDoc,
                confidence: (Math.random() * 0.12 + 0.86),
                status: 'Pending',
                timestamp: new Date().toLocaleTimeString()
            };

            setValidationQueue(prev => [newDoc, ...prev]);
            addLog(`{'>>'} SYNC_SUCCESS : ${currentDoc} poussé vers le Hub.`);
        }

        setAgentStatus('Idle');
        setProgress(0);
        addLog("[DONE] Toutes les instances sont synchronisées.");
    };

    const handleValidate = (doc) => {
        if (doc.status === 'Validated') return;
        setValidationQueue(prev => prev.map(d => d.id === doc.id ? { ...d, status: 'Validated' } : d));
        setValidatedCount(prev => prev + 1);
        const addLog = (msg) => setLogs(prev => [...prev, `[SDK-FEEDBACK] ${msg}`]);
        addLog(`{'>>'} COMMIT : Validation de ${doc.id} enregistrée dans l'IDE.`);
        addLog(`{'>>'} REINFORCE : Gemini Pro apprend de cette correction locale.`);
    };

    const addIdea = () => {
        if (!newIdeaText) return;
        setIdeas([{ id: Date.now(), text: newIdeaText, sector: sectors[activeSectorId].name, status: "Antigravity-Idea" }, ...ideas]);
        setNewIdeaText("");
    };

    return (
        <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900 overflow-hidden text-sm">

            {/* SIDEBAR : Google Antigravity Command Center */}
            <aside className="w-64 bg-slate-950 text-white flex flex-col shrink-0">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400 tracking-tighter">
                        <Wind size={24} className="animate-pulse" /> VerifDoc
                    </h1>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold text-center">Antigravity SDK 2025</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase font-mono tracking-tighter">I. Business & Marketing</div>
                    <button onClick={() => setView('business_roadmap')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'business_roadmap' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Building size={18} /> Roadmap Création
                    </button>
                    <button onClick={() => setView('marketing')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'marketing' ? 'bg-indigo-600 shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Megaphone size={18} /> Plan Marketing
                    </button>
                    <button onClick={() => setView('pricing')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'pricing' ? 'bg-emerald-600 shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Euro size={18} /> Grille Tarifaire
                    </button>

                    <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono tracking-tighter">II. Console Antigravity</div>
                    <button onClick={() => setView('agent')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'agent' ? 'bg-slate-800 border border-white/5 shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Terminal size={18} /> SDK Console
                    </button>
                    <button onClick={() => setView('validation')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all ${view === 'validation' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Eye size={18} /> Hub de Validation
                        {validationQueue.filter(d => d.status === 'Pending').length > 0 && (
                            <span className="ml-auto bg-blue-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-full font-black animate-bounce">
                                {validationQueue.filter(d => d.status === 'Pending').length}
                            </span>
                        )}
                    </button>

                    <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">III. Outils Startup</div>
                    <button onClick={() => setView('data')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'data' ? 'bg-slate-800' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Layers size={18} /> Dataset Factory
                    </button>
                    <button onClick={() => setView('ideabox')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'ideabox' ? 'bg-orange-600 shadow-lg text-white' : 'hover:bg-white/5 text-slate-400'}`}>
                        <Lightbulb size={18} /> Boîte à Idées
                    </button>
                    <button onClick={() => setView('mvp')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${view === 'mvp' ? 'bg-rose-600 shadow-lg' : 'hover:bg-white/5 text-rose-400'}`}>
                        <Monitor size={18} /> Portail Client
                    </button>
                </nav>

                <div className="p-4 bg-slate-900 border-t border-white/5 space-y-2 mt-auto">
                    <div className="flex items-center justify-between text-[10px] font-bold text-blue-400 uppercase">
                        <span>Gemini Pro Inside</span>
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                        <span>PC Workstation</span>
                        <span>LINKED</span>
                    </div>
                </div>
            </aside>

            {/* ZONE DE CONTENU PRINCIPALE */}
            <main className="flex-1 overflow-y-auto p-8 relative">

                {/* VIEW: BUSINESS ROADMAP (La Vision de l'Entreprise) */}
                {view === 'business_roadmap' && (
                    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
                        <header className="flex justify-between items-end border-b pb-6 border-slate-200">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Roadmap VerifDoc x Antigravity</h2>
                                <p className="text-slate-500 mt-1 italic font-medium">Votre plan d'action pour dominer le marché documentaire en 2025.</p>
                            </div>
                            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                                <Building className="text-blue-600" size={20} />
                                <span className="font-bold text-xs uppercase tracking-widest text-slate-600">Statut : Industrialisation</span>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: "Légal & Statuts", desc: "Création SASU et marque VerifDoc.", icon: <ShieldCheck size={24} />, color: "bg-blue-50 text-blue-600", status: "À venir" },
                                { title: "Business Plan", desc: "Modèle financier et ROI client.", icon: <BarChart3 size={24} />, color: "bg-purple-50 text-purple-600", status: "En cours" },
                                { title: "Pitch Client", desc: "Argumentaire 'Edge IA' exclusif.", icon: <Presentation size={24} />, color: "bg-orange-50 text-orange-600", status: "Validé" },
                                { title: "Comptabilité", desc: "Setup facturation au document.", icon: <Briefcase size={24} />, color: "bg-emerald-50 text-emerald-600", status: "À faire" }
                            ].map((step, i) => (
                                <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:border-blue-300 transition-all text-center group relative overflow-hidden">
                                    <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                        {step.icon}
                                    </div>
                                    <h4 className="font-black text-sm mb-2 text-slate-800">{step.title}</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed mb-4 h-12">{step.desc}</p>
                                    <span className="text-[9px] font-black uppercase bg-slate-50 px-2 py-1 rounded text-slate-400 border border-slate-100">{step.status}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700"><Zap size={300} /></div>
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black italic tracking-tighter text-blue-400">Le Pitch de Demain</h3>
                                    <p className="text-sm font-light text-slate-300 leading-relaxed italic">
                                        "Pourquoi payer des serveurs cloud chers et lents ? VerifDoc utilise la puissance de Google Antigravity directement sur votre machine. Vos dossiers sont analysés instantanément, sans jamais quitter votre bureau. C'est l'IA locale, souveraine et 100% privée."
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Télécharger le Deck</button>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-8 rounded-[36px] backdrop-blur-md">
                                    <h4 className="text-[10px] font-black uppercase text-blue-400 mb-6 tracking-[0.2em]">Piliers Stratégiques</h4>
                                    <ul className="text-xs space-y-4">
                                        <li className="flex items-center gap-4 group cursor-default">
                                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"><ShieldCheck size={16} /></div>
                                            <span className="font-medium text-slate-200">Souveraineté des données (Edge IA).</span>
                                        </li>
                                        <li className="flex items-center gap-4 group cursor-default">
                                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Zap size={16} /></div>
                                            <span className="font-medium text-slate-200">Vitesse SDK Antigravity (Localhost).</span>
                                        </li>
                                        <li className="flex items-center gap-4 group cursor-default">
                                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Euro size={16} /></div>
                                            <span className="font-medium text-slate-200">Zéro coût d'infrastructure Cloud.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: MARKETING PLAN */}
                {view === 'marketing' && (
                    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in">
                        <header className="border-b pb-6">
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900">Plan Marketing & Croissance</h2>
                            <p className="text-slate-500 mt-2 italic font-medium">Acquisition multicanale ciblée : Immobilier, Courtage, Assurance.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform text-blue-600"><Globe size={60} /></div>
                                <h3 className="font-black flex items-center gap-2 mb-8 text-blue-600 uppercase text-xs tracking-widest font-mono"><Monitor size={16} /> Presence Web</h3>
                                <ul className="text-xs space-y-5 text-slate-600">
                                    <li className="flex gap-4">
                                        <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                                        <span>Landing Page SEO optimisée pour les syndics de copropriété.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                                        <span>Blog technique : "L'avantage d'Antigravity sur le Cloud".</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group border-rose-100">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform text-rose-600"><Video size={60} /></div>
                                <h3 className="font-black flex items-center gap-2 mb-8 text-rose-600 uppercase text-xs tracking-widest font-mono"><Video size={16} /> Webinaires</h3>
                                <ul className="text-xs space-y-5 text-slate-600">
                                    <li className="flex gap-4">
                                        <CheckCircle2 size={16} className="text-rose-500 shrink-0" />
                                        <span>Démo en direct de l'IDE VerifDoc sur un ordinateur standard.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <CheckCircle2 size={16} className="text-rose-500 shrink-0" />
                                        <span>"Comment l'IA de Google 2025 change la gestion documentaire".</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group border-amber-100">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform text-amber-600"><Mail size={60} /></div>
                                <h3 className="font-black flex items-center gap-2 mb-8 text-amber-600 uppercase text-xs tracking-widest font-mono"><Mail size={16} /> Mailing Pro</h3>
                                <ul className="text-xs space-y-5 text-slate-600">
                                    <li className="flex gap-4">
                                        <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                                        <span>Séquences de Cold Outreach automatisées vers les courtiers.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                                        <span>Newsletter technique mensuelle sur la conformité RGPD.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: PRICING */}
                {view === 'pricing' && (
                    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in py-6">
                        <header className="text-center space-y-4">
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Grille Tarifaire VerifDoc</h2>
                            <p className="text-slate-500 italic max-w-2xl mx-auto">Une tarification intelligente basée sur l'usage du moteur local Antigravity.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                            {/* Discovery */}
                            <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 font-mono">Discovery</p>
                                <p className="text-4xl font-black mb-2 text-slate-900">Gratuit</p>
                                <p className="text-xs text-slate-400 mb-12">Pour tester l'intégration locale.</p>
                                <div className="w-full space-y-5 mb-14 text-left px-4">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-700"><CheckCircle2 className="text-emerald-500" size={16} /> 5 scans / mois</div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-700"><CheckCircle2 className="text-emerald-500" size={16} /> Fiches de paie uniquement</div>
                                </div>
                                <button className="w-full py-5 bg-slate-50 rounded-3xl font-black text-[10px] uppercase tracking-widest text-slate-400 border border-slate-100 mt-auto hover:bg-slate-100 transition-all">S'inscrire</button>
                            </div>

                            {/* Pro SaaS */}
                            <div className="bg-slate-900 p-12 rounded-[56px] shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] border-4 border-blue-600 flex flex-col items-center text-center relative scale-105 z-10">
                                <div className="absolute top-0 right-12 bg-blue-600 text-white text-[9px] font-black px-5 py-2 rounded-b-2xl uppercase tracking-widest shadow-xl">Start-Up Pack</div>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8 font-mono">SaaS Pro Link</p>
                                <p className="text-4xl font-black text-white mb-2">0.50€<span className="text-sm font-light text-slate-500">/doc</span></p>
                                <p className="text-xs text-slate-400 mb-12 italic">+ 49€ HT / mois</p>
                                <div className="w-full space-y-5 mb-14 text-left px-4 text-slate-100">
                                    <div className="flex items-center gap-4 text-xs font-bold"><CheckCircle2 className="text-blue-400" size={16} /> Volume Illimité</div>
                                    <div className="flex items-center gap-4 text-xs font-bold"><CheckCircle2 className="text-blue-400" size={16} /> Tous documents Immo (P1)</div>
                                    <div className="flex items-center gap-4 text-xs font-bold"><CheckCircle2 className="text-blue-400" size={16} /> Support Premium 24/7</div>
                                </div>
                                <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/40 mt-auto hover:scale-105 active:scale-95 transition-all">C'est parti</button>
                            </div>

                            {/* Enterprise Local */}
                            <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-slate-300 transition-all">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 font-mono">Enterprise</p>
                                <p className="text-4xl font-black text-slate-900">Sur Mesure</p>
                                <p className="text-xs text-slate-400 mb-12">SDK local pour grandes agences.</p>
                                <div className="w-full space-y-5 mb-14 text-left px-4 text-slate-700">
                                    <div className="flex items-center gap-4 text-xs font-bold"><CheckCircle2 className="text-emerald-500" size={16} /> 100% On-Premise</div>
                                    <div className="flex items-center gap-4 text-xs font-bold"><CheckCircle2 className="text-emerald-500" size={16} /> IDE Antigravity Dédié</div>
                                    <div className="flex items-center gap-4 text-xs font-bold"><CheckCircle2 className="text-emerald-500" size={16} /> Formation aux APIs Gemini</div>
                                </div>
                                <button className="w-full py-5 bg-slate-950 rounded-3xl font-black text-[10px] uppercase tracking-widest text-white mt-auto hover:bg-slate-800 transition-all">Contacter</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: SDK CONSOLE (L'AGENT ANTIGRAVITY) */}
                {view === 'agent' && (
                    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
                        <header className="flex justify-between items-center bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-blue-600 text-white rounded-3xl shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)]"><Terminal size={28} /></div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Antigravity Command Center</h2>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Connecté à votre IDE Local • Moteur Gemini Pro</p>
                                </div>
                            </div>
                            <div className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border shadow-sm ${agentStatus === 'Running' ? 'bg-blue-50 text-blue-700 animate-pulse border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                Status : {agentStatus}
                            </div>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-8">
                                {/* TERMINAL SDK */}
                                <div className="bg-slate-950 rounded-[48px] p-10 font-mono text-[11px] text-blue-400 shadow-2xl h-80 overflow-hidden flex flex-col border border-white/5 relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 opacity-60"></div>
                                    <div className="flex items-center justify-between text-slate-600 mb-8 border-b border-white/5 pb-4 shrink-0 italic">
                                        <div className="flex items-center gap-3"><Terminal size={16} /> <span className="font-bold">ANTIGRAVITY_SDK_CORE_2025.log</span></div>
                                        <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest">Local Link : Active</span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-4" ref={scrollRef}>
                                        {logs.map((log, i) => (
                                            <p key={i} className={
                                                log.includes('SYNC_SUCCESS') ? 'text-emerald-400 font-bold' :
                                                    log.includes('COMMIT') ? 'text-blue-300 font-black italic' :
                                                        log.includes('REINFORCE') ? 'text-indigo-400' : 'opacity-70'
                                            }>
                                                {log}
                                            </p>
                                        ))}
                                        {agentStatus === 'Running' && <p className="animate-pulse text-white font-black tracking-widest">{'>>'} SDK_ANALYSIS_STREAMING...</p>}
                                    </div>
                                </div>

                                <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-50"><div className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.6)]" style={{ width: `${progress}%` }}></div></div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12 text-center">Pipeline Framework : {sectors[activeSectorId].name}</h4>
                                    <div className="grid grid-cols-3 gap-6 mb-12 text-center">
                                        {sectors[activeSectorId].docs.map((doc, idx) => (
                                            <div key={idx} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col items-center group/item hover:border-blue-300 transition-all">
                                                <FileText size={24} className="text-slate-300 mb-4 group-hover/item:text-blue-500 group-hover/item:scale-110 transition-all" />
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{doc}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={runAntigravitySDK}
                                        disabled={agentStatus === 'Running'}
                                        className="w-full bg-slate-950 text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                                    >
                                        {agentStatus === 'Running' ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
                                        Exécuter le Framework Local
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-8 tracking-widest text-center italic border-b pb-4">Secteur Marché Actif</p>
                                    <div className="space-y-4">
                                        {sectors.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => setActiveSectorId(s.id)}
                                                className={`w-full flex items-center gap-5 p-5 rounded-[24px] border transition-all ${activeSectorId === s.id ? 'bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-500/30 font-bold scale-105' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:border-slate-200 hover:translate-x-1'}`}
                                            >
                                                <div className={`p-2 rounded-xl ${activeSectorId === s.id ? 'bg-white/20' : 'bg-slate-200/50'}`}>{s.icon}</div>
                                                <span className="text-[11px] font-black uppercase tracking-tighter">{s.name.split(' ')[0]}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700"><Laptop size={150} /></div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner"><CpuIcon size={24} className="fill-white" /></div>
                                            <h4 className="font-black text-sm uppercase font-mono tracking-widest text-blue-100">Edge SDK Link</h4>
                                        </div>
                                        <p className="text-[11px] leading-relaxed opacity-95 font-light italic leading-loose">
                                            "Google Antigravity 2025 permet de traiter les documents sans latence cloud. Votre dashboard React pilote l'instance IDE locale qui utilise Gemini Pro pour l'extraction."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: HUB DE VALIDATION (Interface de supervision IDE) */}
                {view === 'validation' && (
                    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
                        <header className="flex justify-between items-end border-b border-slate-200 pb-10">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter flex items-center gap-5 text-slate-900">
                                    <Eye className="text-emerald-600" size={36} /> Hub de Validation Direct
                                </h2>
                                <p className="text-slate-500 mt-2 italic font-medium text-base">Supervision des extractions locales Antigravity x Gemini Pro.</p>
                            </div>
                            <div className="flex gap-12">
                                <div className="text-right">
                                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-2">En attente (SDK)</p>
                                    <p className="text-4xl font-black text-amber-500 leading-none">{validationQueue.filter(d => d.status === 'Pending').length}</p>
                                </div>
                                <div className="text-right border-l pl-12 border-slate-200">
                                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-2 text-emerald-600">Sync à l'IDE</p>
                                    <p className="text-4xl font-black text-emerald-600 leading-none">{validationQueue.filter(d => d.status === 'Validated').length}</p>
                                </div>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 gap-6">
                            {validationQueue.length === 0 ? (
                                <div className="py-24 text-center border-4 border-dashed border-slate-200 rounded-[64px] bg-white/50 group hover:border-blue-300 transition-all">
                                    <Activity size={60} className="mx-auto text-slate-200 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                                    <p className="text-slate-400 font-bold text-lg tracking-tight">Le Framework n'a pas encore poussé de nouvelles tâches.</p>
                                </div>
                            ) : (
                                validationQueue.map(doc => (
                                    <div key={doc.id} className={`bg-white p-10 rounded-[48px] border shadow-sm flex items-center justify-between transition-all ${doc.status === 'Pending' ? 'border-emerald-500 ring-4 ring-emerald-500/5 hover:shadow-2xl' : 'border-slate-100 opacity-60 scale-95 shadow-none grayscale'}`}>
                                        <div className="flex items-center gap-10">
                                            <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center shadow-2xl transition-all duration-500 ${doc.status === 'Pending' ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-slate-100 text-slate-400 shadow-none'}`}>
                                                <FileText size={32} />
                                            </div>
                                            <div>
                                                <p className="font-black text-2xl leading-none mb-3 text-slate-900 tracking-tighter">{doc.id} • {doc.type}</p>
                                                <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em]">{doc.name} • Analysé à {doc.timestamp}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-16">
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Fiabilité IA</p>
                                                <p className={`text-3xl font-black ${doc.confidence > 0.9 ? 'text-emerald-600' : 'text-amber-500'}`}>
                                                    {(doc.confidence * 100).toFixed(1)}%
                                                </p>
                                            </div>
                                            {doc.status === 'Pending' ? (
                                                <button
                                                    onClick={() => handleValidate(doc)}
                                                    className="bg-slate-950 text-white px-12 py-5 rounded-[28px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/20 flex items-center gap-4 group active:scale-95"
                                                >
                                                    <Save size={20} className="group-hover:scale-125 group-hover:rotate-12 transition-transform" /> Valider & Sync
                                                </button>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 text-emerald-600 font-black text-[11px] uppercase tracking-widest animate-in zoom-in slide-in-from-top-4">
                                                    <CheckCircle2 size={40} className="drop-shadow-lg" />
                                                    <span>SYNCHRONISÉ</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* VIEW: PORTAIL CLIENT MVP (Frontend de dépose) */}
                {view === 'mvp' && (
                    <div className="max-w-4xl mx-auto space-y-16 py-10 animate-in fade-in zoom-in-95 duration-500">
                        <header className="text-center space-y-6">
                            <div className="inline-block bg-rose-100 text-rose-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-rose-200 shadow-sm">
                                VerifDoc Gateway : {sectors[activeSectorId].name.split(' ')[0]}
                            </div>
                            <h2 className="text-6xl font-black mt-8 tracking-tighter text-slate-900 leading-tight">Déposez votre Dossier <br /> sans quitter votre zone.</h2>
                            <p className="text-slate-500 mt-6 italic text-lg max-w-lg mx-auto font-medium">Vos documents sont analysés localement en quelques secondes via notre moteur Edge IA.</p>
                        </header>

                        <div className="bg-white p-20 rounded-[72px] shadow-[0_40px_80px_-25px_rgba(0,0,0,0.12)] border border-slate-100 text-center space-y-16 max-w-2xl mx-auto relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-4 bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]"></div>
                            <div className="w-32 h-32 bg-rose-50 text-rose-600 rounded-[48px] flex items-center justify-center mx-auto shadow-inner group-hover:rotate-6 transition-transform duration-700 shadow-rose-100/50"><Monitor size={60} /></div>

                            <div className="space-y-6">
                                <h3 className="text-3xl font-black italic tracking-tighter text-slate-800 uppercase tracking-[0.05em]">Sélectionnez vos justificatifs</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {sectors[activeSectorId].docs.map((d, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-[5px] border-dashed border-slate-100 rounded-[64px] p-32 hover:border-rose-400 hover:bg-rose-50/40 transition-all duration-700 cursor-pointer group/upload relative overflow-hidden active:scale-95 shadow-inner">
                                <div className="absolute inset-0 bg-rose-500 opacity-0 group-hover/upload:opacity-5 transition-opacity"></div>
                                <p className="text-slate-200 font-black uppercase tracking-[0.4em] text-2xl group-hover:text-rose-500 group-hover:scale-110 transition-all tracking-tighter">GLISSER ICI</p>
                                <p className="text-slate-400 font-bold text-[10px] mt-4 uppercase tracking-[0.2em] opacity-0 group-hover/upload:opacity-100 transition-opacity">PDF, PNG, JPG (MAX 10MO)</p>
                            </div>

                            <div className="flex justify-center gap-16 pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-4 text-slate-400 font-black text-[11px] uppercase tracking-widest"><ShieldCheck size={24} className="text-emerald-500 shadow-emerald-200 drop-shadow-md" /> Chiffré</div>
                                <div className="flex items-center gap-4 text-slate-400 font-black text-[11px] uppercase tracking-widest"><Zap size={24} className="text-amber-500 shadow-amber-200 drop-shadow-md" /> Local-Only</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: BOITE A IDÉES */}
                {view === 'ideabox' && (
                    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in py-10">
                        <header className="flex justify-between items-center bg-white p-8 rounded-[36px] shadow-sm border border-slate-200">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-slate-900">Brainstorm Flash SDK</h2>
                                <p className="text-slate-500 italic mt-1">Capturez vos idées de modules pour Antigravity.</p>
                            </div>
                            <button onClick={() => setIdeas([])} className="text-[10px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-widest transition-colors tracking-tighter border border-slate-100 px-4 py-2 rounded-xl">Vider le cache</button>
                        </header>
                        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm flex gap-8 items-center focus-within:border-orange-400 transition-all">
                            <input
                                type="text"
                                value={newIdeaText}
                                onChange={(e) => setNewIdeaText(e.target.value)}
                                placeholder="Nouveau module IA ?"
                                className="flex-1 bg-slate-50 rounded-[24px] px-10 py-6 text-base outline-none border-none focus:ring-0 shadow-inner italic font-medium"
                            />
                            <button onClick={addIdea} className="bg-orange-600 text-white px-12 py-6 rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-orange-700 transition-all shadow-2xl shadow-orange-500/30 active:scale-95">Capturer</button>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            {ideas.map(i => (
                                <div key={i.id} className="bg-white p-8 rounded-[32px] border border-slate-200 flex justify-between items-center shadow-sm hover:border-orange-300 transition-all group hover:translate-x-2">
                                    <p className="font-bold text-slate-800 text-lg leading-tight tracking-tight">{i.text}</p>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black bg-orange-50 text-orange-600 px-5 py-2 rounded-full uppercase tracking-widest border border-orange-100">{i.sector}</span>
                                        <button onClick={() => setIdeas(ideas.filter(item => item.id !== i.id))} className="text-slate-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all transform hover:rotate-90"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                            {ideas.length === 0 && (
                                <div className="py-32 text-center text-slate-200 font-black italic uppercase tracking-[0.5em] opacity-30 select-none">
                                    <Lightbulb size={100} className="mx-auto mb-8 opacity-10" />
                                    Sandbox Vide
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* VIEW: DATASET FACTORY */}
                {view === 'data' && (
                    <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in slide-in-from-top-6">
                        <div className="relative inline-block mb-12">
                            <Layers size={100} className="text-indigo-600 drop-shadow-2xl animate-bounce duration-[3000ms]" />
                            <div className="absolute inset-0 bg-indigo-400 blur-[80px] opacity-20 -z-10"></div>
                        </div>
                        <h2 className="text-5xl font-black mb-16 tracking-tighter text-slate-900 leading-tight">L'Usine à Données <br /> VerifDoc 2.5</h2>
                        <div className="bg-white p-20 rounded-[80px] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] border border-slate-100 max-w-md mx-auto relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.4)]"></div>
                            <div className="flex justify-between mb-16">
                                <div className="text-left leading-none"><p className="text-6xl font-black text-slate-900 tracking-tighter italic">10</p><p className="text-[11px] text-slate-400 font-black uppercase mt-4 tracking-[0.2em]">Originaux</p></div>
                                <div className="text-right leading-none"><p className="text-6xl font-black text-indigo-600 tracking-tighter italic">10K</p><p className="text-[11px] text-slate-400 font-black uppercase mt-4 tracking-[0.2em]">Générés</p></div>
                            </div>
                            <button onClick={() => { setIsGenerating(true); setProgress(0); const i = setInterval(() => setProgress(p => p >= 100 ? (clearInterval(i), 100) : p + 5), 50) }} className="w-full bg-indigo-600 text-white py-7 rounded-[32px] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all">
                                Générer via SDK PC
                            </button>
                            {progress > 0 && (
                                <div className="mt-16 h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner p-1">
                                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.8)]" style={{ width: `${progress}%` }}></div>
                                </div>
                            )}
                            {progress === 100 && <p className="mt-6 text-emerald-500 font-black text-[10px] uppercase tracking-widest animate-pulse">Dataset prêt pour l'IDE</p>}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default App;
