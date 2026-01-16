import React, { useState, FC, useEffect } from 'react';
// import { useTranslation } from 'react-i18next'; // Unused
import LanguageSelector from '../../components/LanguageSelector';
import PricingPlans from '../../components/dashboard/PricingPlans';
import {
    LayoutDashboard,
    Gift,
    Settings,
    Plus,
    Search,
    Activity,
    LogOut,
    Zap,
    Lock,
    CreditCard,
    Building2,
    CheckCircle2,
    Code // Added Code icon
} from 'lucide-react';

import UploadZone from '../../components/dashboard/UploadZone';
import { ScanResultViewer } from '../../components/dashboard/ScanResultViewer';

// --- COMPONENTS PLACEHOLDER (Simulation pour éviter import errors si fichiers manquants) ---
// --- HELPER COMPONENTS ---
function ArrowRight({ size }: { size?: number }) {
    return <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
    notification?: boolean;
    warning?: boolean; // Added warning prop definition
}

function NavItem({ icon, label, active, onClick, notification, warning }: NavItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full px-6 py-3 text-sm font-medium transition-all group relative border-l-4 ${active
                ? "bg-blue-600/10 text-white border-blue-500"
                : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border-transparent"
                }`}
        >
            <span className={active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}>
                {icon}
            </span>
            <span>{label}</span>
            {warning && <Lock size={12} className="ml-auto text-amber-500 opacity-70" />}
            {notification && <span className="ml-auto w-2 h-2 rounded-full bg-blue-500"></span>}
        </button>
    );
}

// --- COMPONENTS PLACEHOLDER ---
const OverviewView: FC<{ onStartScan: () => void }> = ({ onStartScan }) => (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 h-full overflow-y-auto">
        <div className="flex items-end justify-between">
            <div>
                <h1 className="text-4xl font-black dark:text-white text-slate-900 tracking-tighter uppercase">Tableau de bord</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Gérez vos activités de vérification et surveillez les menaces.</p>
            </div>
            <button onClick={onStartScan} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20">
                <Plus size={18} /> Nouvelle analyse
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 mb-2 font-medium">Analyses aujourd'hui</div>
                <div className="text-4xl font-black dark:text-white text-slate-900">0</div>
            </div>
            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 mb-2 font-medium">Fraudes détectées</div>
                <div className="text-4xl font-black text-red-500">0</div>
            </div>
            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 mb-2 font-medium">Documents en attente</div>
                <div className="text-4xl font-black text-amber-500">0</div>
            </div>
        </div>

        {/* Recent Activity Table Placeholder */}
        <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-white/5">
                <h3 className="font-bold dark:text-white text-slate-900">Activité Récente</h3>
            </div>
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                Aucune activité récente.
            </div>
        </div>
    </div>
);

const HistoryView: FC = () => (
    <div className="p-8 h-full overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-slate-900">Historique</h1>
        <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 rounded-2xl p-8 text-center shadow-sm">
            <Activity className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
            <p className="text-slate-500 dark:text-slate-400">Aucune analyse dans l'historique.</p>
        </div>
    </div>
);

const TeamView = () => (
    <div className="p-8 h-full">
        <h1 className="text-3xl font-bold mb-6 dark:text-white text-slate-900">Gestion d'équipe</h1>
        <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={32} className="text-slate-400 rotate-180" /> {/* Using LogOut as placeholder for Users if Users not imported, but wait I can import Users */}
            </div>
            <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">Invitez vos collaborateurs</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">Travaillez à plusieurs sur la validation des documents. Fonctionnalité bientôt disponible.</p>
            <button className="bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-300 px-4 py-2 rounded-lg cursor-not-allowed">Bientôt disponible</button>
        </div>
    </div>
);

const HelpView = () => (
    <div className="p-8 h-full">
        <h1 className="text-3xl font-bold mb-6 dark:text-white text-slate-900">Centre d'aide</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-bold text-blue-500 mb-2">Documentation API</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Intégrez nos solutions dans vos outils.</p>
            </div>
            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-bold text-blue-500 mb-2">Support Chat</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Discutez avec un expert en direct.</p>
            </div>
        </div>
    </div>
);

const DeveloperView = () => {
    const [apiKey, setApiKey] = useState('sk_live_************************');
    const [isVisible, setIsVisible] = useState(false);

    const generateNewKey = () => {
        const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setApiKey(newKey);
        setIsVisible(true);
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-2 dark:text-white text-slate-900">Espace Développeur</h1>
            <p className="text-slate-500 mb-8">Gérez vos clés API pour intégrer VerifDoc dans vos applications.</p>

            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 rounded-2xl p-8 mb-8 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold dark:text-white text-slate-900 flex items-center gap-2">
                            <Lock size={18} className="text-blue-500" /> Clé API Secrète
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">N'utilisez cette clé que côté serveur. Ne la partagez jamais.</p>
                    </div>
                    <button onClick={generateNewKey} className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Générer une nouvelle clé
                    </button>
                </div>

                <div className="relative">
                    <div className="bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm text-slate-600 dark:text-slate-300 break-all">
                        {isVisible ? apiKey : 'sk_live_************************'}
                    </div>
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500"
                    >
                        {isVisible ? "Masquer" : "Afficher"}
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-4">Documentation Rapide</h3>
                <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                        <code className="text-emerald-400 text-sm">
                            curl -X POST https://api.verifdoc.com/v1/analyze \<br />
                            &nbsp;&nbsp;-H "Authorization: Bearer {apiKey.substring(0, 10)}..." \<br />
                            &nbsp;&nbsp;-F "file=@document.pdf"
                        </code>
                    </div>
                    <p className="text-sm text-slate-500">
                        Consultez la <a href="#" className="text-blue-500 hover:underline">documentation complète</a> pour plus d'exemples (Node.js, Python, PHP).
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---

export const ProDashboard: FC = () => {
    // const { t } = useTranslation(); // Removed unused i18n for now
    const [currentView, setCurrentView] = useState<string>('overview');

    // STATE: PROFIL & VERROUILLAGE
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [credits, setCredits] = useState<number>(0);
    const LOCKED_CREDITS_AMOUNT = 150;

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
        if (companyForm.name && companyForm.siret && companyForm.industry) {
            setIsProfileComplete(true);
            setCredits(LOCKED_CREDITS_AMOUNT);
        }
    };

    // --- SÉCURITÉ & ANTI-VOL ---
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

    // --- UI COMPONENTS ---
    const LockedFeatureView = () => (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500 bg-[#f5f7fb] dark:bg-[#1c222b]">
            <div className="w-20 h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Lock size={40} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-3">Vérification Requise</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                Complétez votre profil entreprise pour débloquer votre accès gratuit et vos <span className="text-blue-400 font-bold">{LOCKED_CREDITS_AMOUNT} crédits</span>.
            </p>
            <button
                onClick={() => setCurrentView('settings')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
                Finaliser le profil <ArrowRight size={18} />
            </button>
        </div>
    );

    const SettingsView = () => (
        <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-500 pb-20 overflow-y-auto h-full">
            <h1 className="text-3xl font-black dark:text-white text-slate-900 mb-8">Paramètres de l'entreprise</h1>

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

            <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white text-slate-900 flex items-center gap-2">
                        <Building2 size={20} className="text-blue-500" /> Fiche d'identité
                    </h2>
                    {isProfileComplete && <span className="text-emerald-500 flex items-center gap-1 font-bold text-sm"><CheckCircle2 size={16} /> Vérifié</span>}
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 block">Nom de l'entreprise *</label>
                        <input
                            type="text"
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 px-4 dark:text-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Ex: VerifDoc SAS"
                            value={companyForm.name}
                            onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 block">N° SIRET / EIN *</label>
                        <input
                            type="text"
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 px-4 dark:text-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="123 456 789 00012"
                            value={companyForm.siret}
                            onChange={(e) => setCompanyForm({ ...companyForm, siret: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 block">Secteur d'activité *</label>
                        <select
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 px-4 dark:text-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50"
                            value={companyForm.industry}
                            onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                        >
                            <option value="">Sélectionner...</option>
                            <option value="bank">Banque & Assurance</option>
                            <option value="real_estate">Immobilier</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 block">Site Web</label>
                        <input
                            type="text"
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 px-4 dark:text-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="https://..."
                            value={companyForm.website}
                            onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/10 flex justify-end">
                    <button
                        onClick={handleUpdateProfile}
                        className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2 ${(companyForm.name && companyForm.siret && companyForm.industry)
                            ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                            : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                            }`}
                        disabled={!companyForm.name || !companyForm.siret || !companyForm.industry}
                    >
                        {!isProfileComplete ? <><Gift size={18} /> Débloquer mes crédits</> : "Mettre à jour"}
                    </button>
                </div>
            </div>
        </div>
    );

    const [scanResult, setScanResult] = useState<any>(null);
    const handleScanComplete = (result: any) => setScanResult(result);

    const LiveAnalysisWrapper = () => (
        <div className="p-8 animate-in fade-in duration-500 h-full overflow-y-auto bg-[#f5f7fb] dark:bg-[#1c222b]">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-black dark:text-white text-slate-900">Analyse Forensique (Live)</h1>
                {scanResult && (
                    <button onClick={() => setScanResult(null)} className="text-sm text-blue-500 hover:underline">
                        Nouvelle analyse
                    </button>
                )}
            </div>

            {!scanResult ? (
                <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-[#222e3c] p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 text-center">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap size={32} className="text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Prêt à scanner ?</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Glissez-déposez vos documents pour une analyse instantanée (IA v2.0).</p>
                    <UploadZone onAnalysisComplete={handleScanComplete} />
                </div>
            ) : (
                <ScanResultViewer result={scanResult} onReset={() => setScanResult(null)} />
            )}
        </div>
    );

    // --- CAREERS VIEW ---
    const CareersView = () => (
        <div className="p-8 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 dark:text-white text-slate-900">Carrières</h1>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Rejoignez l'élite de la Forensique IA</h2>
                <p className="opacity-90 max-w-2xl">Nous construisons le futur de la confiance numérique. Nous recherchons des profils passionnés par la Computer Vision, la Cybersécurité et l'IA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg dark:text-white text-slate-900">Senior ML Engineer</h3>
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded">Paris / Remote</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">Expertise en PyTorch et détection d'anomalies (GANs, Diffusion Models).</p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Postuler →</button>
                </div>
                <div className="bg-white dark:bg-[#222e3c] border border-slate-200 dark:border-white/5 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg dark:text-white text-slate-900">Fullstack Developer</h3>
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded">Paris</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">React, Python (FastAPI), Docker. Architecture SaaS scalable.</p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Postuler →</button>
                </div>
            </div>
        </div>
    );

    const renderView = () => {
        switch (currentView) {
            case 'overview': return <OverviewView onStartScan={() => setCurrentView('live')} />;
            case 'live': return isProfileComplete ? <LiveAnalysisWrapper /> : <LockedFeatureView />;
            case 'history': return isProfileComplete ? <HistoryView /> : <LockedFeatureView />;
            case 'pricing': return <PricingPlans currentCredits={credits} maxCredits={3000} />;
            case 'api': return <DeveloperView />;
            case 'referral': return <TeamView />;
            case 'team': return isProfileComplete ? <TeamView /> : <LockedFeatureView />;
            case 'help': return <HelpView />;
            case 'careers': return <CareersView />;
            case 'settings': return <SettingsView />;
            default: return <OverviewView onStartScan={() => setCurrentView('live')} />;
        }
    };

    return (
        <div className="flex h-screen bg-[#1c222b] text-slate-200 font-sans overflow-hidden">
            {/* SIDEBAR */}
            <aside className="w-64 bg-[#222e3c] flex flex-col shrink-0 z-20 shadow-2xl transition-all">
                <div className="h-16 flex items-center justify-center px-6 border-b border-white/5">
                    <img src="/logo-verifdoc-light.png" alt="VerifDoc" className="h-10 w-auto" />
                </div>

                <nav className="flex-1 px-0 py-4 space-y-1 overflow-y-auto">
                    <div className="px-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</div>
                    <NavItem icon={<LayoutDashboard size={18} />} label="Vue d'ensemble" active={currentView === 'overview'} onClick={() => setCurrentView('overview')} />

                    <div className="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                        Analyses
                        {!isProfileComplete && <Lock size={10} className="text-amber-500" />}
                    </div>
                    <NavItem icon={<Zap size={18} />} label="Analyse Live" active={currentView === 'live'} onClick={() => setCurrentView('live')} />
                    <NavItem icon={<Activity size={18} />} label="Historique" active={currentView === 'history'} onClick={() => setCurrentView('history')} />

                    <div className="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compte</div>
                    <NavItem icon={<CreditCard size={18} />} label="Crédits & Plans" active={currentView === 'pricing'} onClick={() => setCurrentView('pricing')} />
                    <NavItem icon={<Settings size={18} />} label="Paramètres" active={currentView === 'settings'} onClick={() => setCurrentView('settings')} notification={!isProfileComplete} />

                    <div className="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intégration</div>
                    <NavItem icon={<Code size={18} />} label="Clés API & Docs" active={currentView === 'api'} onClick={() => setCurrentView('api')} />
                </nav>

                <div className="p-4 border-t border-white/5 bg-black/10">
                    <div className="mb-2">
                        <NavItem icon={<Building2 size={18} />} label="Nous recrutons" active={currentView === 'careers'} onClick={() => setCurrentView('careers')} />
                    </div>
                    <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full px-2 py-2 text-sm font-medium">
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f5f7fb] dark:bg-[#1c222b] transition-colors overflow-hidden">
                {/* HEADER */}
                <header className="h-16 bg-white dark:bg-[#222e3c] border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 z-10 shadow-sm shrink-0">
                    <div className="flex items-center gap-4 text-slate-400">
                        <Search size={18} />
                        <span className="text-sm hidden md:inline">Rechercher...</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {!isProfileComplete ? (
                            <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold animate-pulse cursor-pointer" onClick={() => setCurrentView('settings')}>
                                <Gift size={12} /> 150 crédits offerts
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                                <Zap size={14} className="text-blue-500" />
                                <span className="text-sm font-bold dark:text-white text-slate-900">{credits} crédits</span>
                            </div>
                        )}
                        <LanguageSelector />
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">JD</div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-0 relative flex flex-col">
                    <div className="flex-1">
                        {renderView()}
                    </div>

                    {/* FOOTER */}
                    <footer className="py-6 px-8 border-t border-slate-200 dark:border-white/5 text-center shrink-0 bg-white dark:bg-[#222e3c]">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-4">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm">
                                <CheckCircle2 size={16} className="text-blue-500" /> Conforme à la norme ISO 27001
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm">
                                <span className="text-blue-500">🇪🇺</span> DONNÉES EN FRANCE
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm">
                                <span className="font-bold text-blue-500">ActuIA</span> IA PRÊTE À AGIR
                            </div>
                        </div>
                        <div className="text-xs text-slate-400">
                            VerifDoc ne remplace pas l'expertise humaine juridiquement contraignante. · <a href="#" className="hover:underline">CGU / CGV</a> · <a href="#" className="hover:underline">Confidentialité</a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};


