import React, { useState, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
import PricingPlans from '../../components/dashboard/PricingPlans';
import { ReferralView } from '../../components/dashboard/ReferralView';
import { HelpView } from '../../components/dashboard/HelpView';
import { TeamView } from '../../components/dashboard/TeamView';
import {
    LayoutDashboard,
    Users,
    Gift,
    ShieldCheck,
    FileSearch,
    Settings,
    HelpCircle,
    Bell,
    Plus,
    Search,
    CheckCircle2,
    Activity,
    LogOut,
    Zap,
    Lock,
    CreditCard,
    Building2,
    MapPin,
    Globe,
    FileBadge
} from 'lucide-react';

import UploadZone from '../../components/dashboard/UploadZone';
import { ScanResultViewer } from '../../components/dashboard/ScanResultViewer';

// --- COMPONENTS PLACEHOLDER (Simulation pour éviter import errors si fichiers manquants) ---
const OverviewView: FC<{ onStartScan: () => void }> = ({ onStartScan }) => (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex items-end justify-between">
            <div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Tableau de bord</h1>
                <p className="text-slate-400 mt-2">Gérez vos activités de vérification et surveillez les menaces.</p>
            </div>
            <button onClick={onStartScan} className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                <Plus size={18} /> Nouvelle analyse
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b101e] border border-slate-800 p-6 rounded-2xl">
                <div className="text-slate-500 mb-2 font-medium">Analyses aujourd'hui</div>
                <div className="text-4xl font-black text-white">0</div>
            </div>
            <div className="bg-[#0b101e] border border-slate-800 p-6 rounded-2xl">
                <div className="text-slate-500 mb-2 font-medium">Fraudes détectées</div>
                <div className="text-4xl font-black text-red-500">0</div>
            </div>
        </div>
    </div>
);

const HistoryView: FC = () => <div className="p-8 text-white"><h1 className="text-3xl font-bold mb-4">Historique</h1><p className="text-slate-400">Aucune analyse récente.</p></div>;

// --- MAIN DASHBOARD COMPONENT ---

const ProDashboard: FC = () => {
    const { t } = useTranslation();
    const [currentView, setCurrentView] = useState<string>('overview');

    // STATE: PROFIL & VERROUILLAGE
    const [isProfileComplete, setIsProfileComplete] = useState(false); // LE VERROU
    const [credits, setCredits] = useState<number>(0); // Commence à 0 visuellement si bloqué, ou 150 si débloqué
    const LOCKED_CREDITS_AMOUNT = 150; // Le "Cadeau" à débloquer

    // STATE: FORMULAIRE ENTREPRISE
    const [companyForm, setCompanyForm] = useState({
        name: '',
        siret: '',
        industry: '',
        address: '',
        phone: '',
        website: ''
    });

    const handleUpdateProfile = () => {
        // Validation simple
        if (companyForm.name && companyForm.siret && companyForm.industry) {
            setIsProfileComplete(true);
            setCredits(LOCKED_CREDITS_AMOUNT); // DÉBLOCAGE DES CRÉDITS
            // Ici on enverrait les data au backend
            // toast.success("Profil mis à jour ! Crédits débloqués.");
        }
    };

    // --- SÉCURITÉ & ANTI-VOL (DLP) ---
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (['p', 's', 'u', 'c', 'a'].includes(e.key.toLowerCase()))) {
                e.preventDefault();
            }
        };
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // --- API DUMMY HANDLERS ---
    // const handleDeductCredits = (amount: number) => {
    //     if (credits >= amount) {
    //         setCredits(prev => prev - amount);
    //         return true;
    //     }
    //     setCurrentView('pricing');
    //     return false;
    // };

    // --- SOUS-COMPOSANT: LOCK SCREEN (Si profil vide) ---
    const LockedFeatureView = () => (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 relative">
                <Lock size={48} className="text-slate-400" />
                <div className="absolute top-0 right-0 bg-blue-500 rounded-full p-2 animate-bounce">
                    <Gift size={16} className="text-white" />
                </div>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Fonctionnalité Verrouillée</h2>
            <p className="text-slate-400 max-w-md text-lg mb-8 leading-relaxed">
                Pour garantir la sécurité et la conformité KYB (Know Your Business), nous devons valider votre identité.
                <br /><br />
                <span className="text-white font-bold">Complétez votre profil entreprise pour débloquer vos {LOCKED_CREDITS_AMOUNT} crédits offerts.</span>
            </p>
            <button
                onClick={() => setCurrentView('settings')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-900/20 flex items-center gap-3"
            >
                Compléter mon profil entreprise <ArrowRight size={20} />
            </button>
        </div>
    );

    // --- SOUS-COMPOSANT: PARAMÈTRES AVEC FORMULAIRE ---
    const SettingsView = () => (
        <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
            <h1 className="text-3xl font-black text-white mb-8">Paramètres de l'entreprise</h1>

            {!isProfileComplete && (
                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-6 rounded-2xl mb-8 flex items-start gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg shrink-0">
                        <Gift className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Débloquez votre essai gratuit</h3>
                        <p className="text-blue-100 mt-1">
                            Remplissez les informations obligatoires (*) ci-dessous pour activer votre compte et recevoir <strong>{LOCKED_CREDITS_AMOUNT} crédits</strong> utilisables immédiatement.
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-[#0b101e] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Building2 size={20} className="text-slate-400" /> Fiche d'identité
                    </h2>
                    {isProfileComplete && <span className="text-emerald-500 flex items-center gap-1 font-bold text-sm"><CheckCircle2 size={16} /> Vérifié</span>}
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 block">Nom de l'entreprise *</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Ex: VerifDoc SAS"
                                value={companyForm.name}
                                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 block">N° SIRET / EIN *</label>
                        <div className="relative">
                            <FileBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder="123 456 789 00012"
                                value={companyForm.siret}
                                onChange={(e) => setCompanyForm({ ...companyForm, siret: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 block">Secteur d'activité *</label>
                        <div className="relative">
                            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 outline-none appearance-none"
                                value={companyForm.industry}
                                onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                            >
                                <option value="">Sélectionner...</option>
                                <option value="bank">Banque & Assurance</option>
                                <option value="real_estate">Immobilier</option>
                                <option value="legal">Juridique</option>
                                <option value="tech">Technologie / SaaS</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 block">Site Web</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 outline-none"
                                placeholder="https://..."
                                value={companyForm.website}
                                onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-400 block">Adresse du siège</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
                            <textarea
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 outline-none min-h-[80px]"
                                placeholder="Adresse complète..."
                                value={companyForm.address}
                                onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-800 bg-slate-900/30 flex justify-end">
                    <button
                        onClick={handleUpdateProfile}
                        className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2 ${(companyForm.name && companyForm.siret && companyForm.industry)
                            ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                            : "bg-slate-700 text-slate-400 cursor-not-allowed"
                            }`}
                        disabled={!companyForm.name || !companyForm.siret || !companyForm.industry}
                    >
                        {!isProfileComplete ? <><Gift size={18} /> Enregistrer & Débloquer les crédits</> : "Mettre à jour"}
                    </button>
                </div>
            </div>
        </div>
    );

    // --- IMPORTS (Added dynamically)
    // Note: ensure these imports are at top of file in real usage, putting them here for context in this replace block is not standard but logic below works.

    // --- LIVE SCAN LOGIC ---
    const [scanResult, setScanResult] = useState<any>(null);

    const handleScanComplete = (result: any) => {
        setScanResult(result);
        if (result.risk_score > 0) {
            // Optionnel : Jouer un son d'alerte ou vibrer
        }
    };

    const LiveAnalysisWrapper = () => {
        if (!isProfileComplete) return <LockedFeatureView />;

        return (
            <div className="p-8 text-white animate-in fade-in duration-500">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-black">Analyse Forensique (Live)</h1>
                    {scanResult && (
                        <button onClick={() => setScanResult(null)} className="text-sm text-slate-400 hover:text-white underline">
                            Nouvelle analyse
                        </button>
                    )}
                </div>

                {!scanResult ? (
                    <div className="max-w-2xl mx-auto mt-12">
                        {/* Utilisation du vrai composant d'upload */}
                        {/* Note: Il faut s'assurer que UploadZone est importé en haut du fichier */}
                        <div className="bg-[#0b101e] p-8 rounded-3xl border border-slate-800 shadow-2xl">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Moteur Détection IA & Faux</h3>
                                <p className="text-slate-400 text-sm">Supporte PDF, JPG, PNG. Analyse métadonnées + structure pixels.</p>
                            </div>
                            {/* @ts-ignore - UploadZone importé via l'ajout d'import plus haut */}
                            <UploadZone onAnalysisComplete={handleScanComplete} />
                        </div>
                    </div>
                ) : (
                    /* @ts-ignore - ScanResultViewer importé via l'ajout d'import plus haut */
                    <ScanResultViewer result={scanResult} onReset={() => setScanResult(null)} />
                )}
            </div>
        );
    }

    // --- ROUTES ---
    const renderView = () => {
        switch (currentView) {
            case 'overview': return <OverviewView onStartScan={() => setCurrentView('live')} />;
            case 'live': return <LiveAnalysisWrapper />; // Utilise le Wrapper qui vérifie le profil
            case 'history': return isProfileComplete ? <HistoryView /> : <LockedFeatureView />;
            case 'pricing': return <PricingPlans currentCredits={credits} maxCredits={3000} />;
            case 'referral': return <ReferralView />;
            case 'team': return isProfileComplete ? <TeamView /> : <LockedFeatureView />;
            case 'help': return <HelpView />;
            case 'settings': return <SettingsView />; // Le formulaire est ici
            default: return <OverviewView onStartScan={() => setCurrentView('live')} />;
        }
    };

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 font-sans select-none overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-64 border-r border-slate-800 bg-[#020617] flex flex-col shrink-0 z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter uppercase">VERIFDOC</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
                    <NavItem icon={<LayoutDashboard size={20} />} label={t('dashboard.sidebar.overview')} active={currentView === 'overview'} onClick={() => setCurrentView('overview')} />

                    <div className="pt-4 pb-2 px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between items-center">
                        Services IA
                        {!isProfileComplete && <Lock size={10} className="text-amber-500" />}
                    </div>

                    <NavItem icon={<Zap size={20} />} label={t('dashboard.sidebar.scan')} active={currentView === 'live'} onClick={() => setCurrentView('live')} warning={!isProfileComplete} />
                    <NavItem icon={<FileSearch size={20} />} label="Forensique Documentaire" active={false} onClick={() => setCurrentView('live')} warning={!isProfileComplete} />
                    <NavItem icon={<Activity size={20} />} label={t('dashboard.sidebar.history')} active={currentView === 'history'} onClick={() => setCurrentView('history')} warning={!isProfileComplete} />

                    <div className="p-4 mt-4 border-t border-slate-800">
                        <NavItem icon={<CreditCard size={20} />} label="Forfaits" active={currentView === 'pricing'} onClick={() => setCurrentView('pricing')} />
                        <NavItem icon={<Gift size={20} className="text-pink-400" />} label="Parrainage" active={currentView === 'referral'} onClick={() => setCurrentView('referral')} />
                        <NavItem icon={<Users size={20} />} label="Équipe" active={currentView === 'team'} onClick={() => setCurrentView('team')} warning={!isProfileComplete} />
                        <div className="pt-4 mt-auto">
                            <NavItem icon={<Settings size={20} />} label={t('dashboard.sidebar.settings')} active={currentView === 'settings'} onClick={() => setCurrentView('settings')} notification={!isProfileComplete} />
                            <NavItem icon={<HelpCircle size={20} />} label="Aide & Support" active={currentView === 'help'} onClick={() => setCurrentView('help')} />
                            <NavItem icon={<LogOut size={20} className="text-red-400" />} label={t('dashboard.sidebar.logout')} onClick={() => window.location.href = '/'} variant="danger" />
                        </div>
                    </div>
                </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 relative bg-[#020617]">

                {/* HEADER */}
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#020617]/50 backdrop-blur sticky top-0 z-10">
                    <div className="flex items-center gap-4 text-slate-400">
                        <Search size={18} />
                        <span className="text-sm hidden md:inline">Rechercher... (Ctrl+K)</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* BANDEAU CREDIT INCITATIF */}
                        {!isProfileComplete ? (
                            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full cursor-pointer hover:bg-amber-500/20 transition-colors" onClick={() => setCurrentView('settings')}>
                                <Lock size={14} className="text-amber-500" />
                                <span className="text-xs font-bold text-amber-500">150 crédits bloqués</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-end mr-4">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Crédits</span>
                                <span className="text-lg font-black text-white leading-none">{credits}</span>
                            </div>
                        )}

                        <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>
                        <Bell size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
                        <LanguageSelector />
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border-2 border-slate-800 shadow-lg cursor-pointer"></div>
                    </div>
                </header>

                {/* BANNER NOTIFICATION SI PROFIL INCOMPLET */}
                {!isProfileComplete && (
                    <div className="bg-blue-600 text-white text-sm font-bold py-2 px-4 text-center shadow-lg relative z-0 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors" onClick={() => setCurrentView('settings')}>
                        <Gift size={16} className="animate-bounce" />
                        <span>Action requise : Complétez votre profil entreprise pour débloquer vos 150 crédits offerts !</span>
                        <ArrowRight size={16} />
                    </div>
                )}

                <div className="flex-1 overflow-auto custom-scrollbar p-6 relative">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

// --- HELPER COMPONENT: NAV ITEM ---
interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    variant?: 'default' | 'danger';
    warning?: boolean; // Affiche un cadenas ou couleur jaune
    notification?: boolean; // Point rouge
}

const NavItem: FC<NavItemProps> = ({ icon, label, active, onClick, variant = 'default', warning, notification }) => {
    const baseClasses = "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative";
    const activeClasses = "bg-blue-600 text-white shadow-lg shadow-blue-900/20";
    const inactiveClasses = variant === 'danger'
        ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
        : "text-slate-400 hover:text-white hover:bg-white/5";

    return (
        <button onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
            <span className={active ? "text-white" : (variant === 'danger' ? "text-red-400" : "text-slate-500 group-hover:text-white")}>
                {icon}
            </span>
            <span>{label}</span>
            {warning && <Lock size={12} className="ml-auto text-amber-500 opacity-70" />}
            {notification && <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
        </button>
    );
};

const ArrowRight = ({ size }: { size?: number }) => <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;

export default ProDashboard;
