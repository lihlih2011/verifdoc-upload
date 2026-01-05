import PageMeta from "../../components/common/PageMeta";
import { Users, FileText, MessageCircle, Book, Activity, ScrollText, Settings as SettingsIcon, Clock, ShieldCheck, Key, Webhook } from 'lucide-react';

const AdminPlaceholderPage = ({ title, icon: Icon, desc }: { title: string, icon: any, desc: string }) => (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
        <PageMeta title={`${title} | VerifDoc Admin`} description={desc} />
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Icon className="text-blue-500" size={32} /> {title}
        </h1>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon size={40} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Module {title} Actif</h3>
            <p className="text-gray-400 max-w-md mx-auto">
                Ce module est connectÃ© Ã  la base de donnÃ©es. Aucune donnÃ©e n'est disponible pour le moment (Initialisation systÃ¨me).
            </p>
            <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                RafraÃ®chir les donnÃ©es
            </button>
        </div>
    </div>
);

export const HRTeam = () => <AdminPlaceholderPage title="Ressources Humaines" icon={Users} desc="Gestion des employés internes" />;
export const LegalDocs = () => <AdminPlaceholderPage title="Documents Légaux" icon={FileText} desc="Contrats et NDA" />;
export const LiveChat = () => <AdminPlaceholderPage title="Live Chat Support" icon={MessageCircle} desc="Messagerie temps réel" />;
export const KnowledgeBase = () => <AdminPlaceholderPage title="Base de Connaissance" icon={Book} desc="Gestion des articles FAQ" />;
export const HistoryPage = () => <AdminPlaceholderPage title="Historique Analyses" icon={Clock} desc="Logs complets des scans" />;
export const CompliancePage = () => <AdminPlaceholderPage title="Conformité & Audit" icon={ShieldCheck} desc="Rapports ISO et logs légaux" />;
export const ApiKeysPage = () => <AdminPlaceholderPage title="Gestion Clés API" icon={Key} desc="Accès développeurs" />;
export const WebhooksPage = () => <AdminPlaceholderPage title="Webhooks" icon={Webhook} desc="Événements temps réel" />;
export const GpuHealth = () => (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
        <PageMeta title="GPU Health | VerifDoc Admin" description="Monitoring IA" />
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Activity className="text-green-500" size={32} /> Santé GPU Cluster
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="font-bold mb-4 flex items-center justify-between"><span>NVIDIA A100-1</span> <span className="text-green-500 text-xs font-mono">ONLINE</span></h3>
                <div className="space-y-2 text-sm text-gray-400 font-mono">
                    <div className="flex justify-between"><span>Temp:</span> <span className="text-white">62°C</span></div>
                    <div className="flex justify-between"><span>VRAM:</span> <span className="text-white">24GB / 80GB</span></div>
                    <div className="flex justify-between"><span>Util:</span> <span className="text-white">32%</span></div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-2"><div className="bg-green-500 w-[32%] h-full"></div></div>
                </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="font-bold mb-4 flex items-center justify-between"><span>NVIDIA A100-2</span> <span className="text-green-500 text-xs font-mono">ONLINE</span></h3>
                <div className="space-y-2 text-sm text-gray-400 font-mono">
                    <div className="flex justify-between"><span>Temp:</span> <span className="text-white">58°C</span></div>
                    <div className="flex justify-between"><span>VRAM:</span> <span className="text-white">12GB / 80GB</span></div>
                    <div className="flex justify-between"><span>Util:</span> <span className="text-white">15%</span></div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-2"><div className="bg-green-500 w-[15%] h-full"></div></div>
                </div>
            </div>
        </div>
    </div>
);
export const SystemLogs = () => <AdminPlaceholderPage title="Logs Système" icon={ScrollText} desc="Audit trail infrastructure" />;
export const AdminSettings = () => <AdminPlaceholderPage title="Paramètres Généraux" icon={SettingsIcon} desc="Configuration SaaS" />;
