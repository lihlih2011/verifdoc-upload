import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import {
    Activity, Server, Database, Mail,
    ShieldAlert, Terminal, RefreshCw, Cpu, HardDrive,
    Users, Search, Edit, UserCheck, AlertTriangle,
    Megaphone, TrendingUp, Target, Share2, BarChart3, Zap
} from 'lucide-react';

// --- TYPES ---
interface SystemStats {
    cpu_usage: number;
    ram_usage: number;
    disk_free: number;
    db_status: boolean;
    db_latency_ms: number;
}

interface UserData {
    id: number;
    email: string;
    role: string;
    credits: number;
    created_at: string;
    is_verified: boolean;
}

// --- MAIN COMPONENT ---
export const AdminToolbox = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'security' | 'marketing' | 'tools'>('overview');
    const [loading, setLoading] = useState(false);

    // --- OVERVIEW DATA ---
    const fetchHealth = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/admin/health`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'overview') {
            fetchHealth();
            const interval = setInterval(fetchHealth, 10000);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-mono flex flex-col">
            {/* HEADER */}
            <header className="bg-slate-900 border-b border-slate-700 p-4 px-8 flex justify-between items-center shadow-md z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        <Terminal className="text-emerald-400" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-wider">VERIFDOC <span className="text-emerald-400">GOD MODE</span></h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Control Center</p>
                    </div>
                </div>

                {/* TABS Navigation */}
                <div className="flex bg-slate-800 p-1 rounded-lg overflow-x-auto">
                    <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Activity size={16} />} label="Vitals" />
                    <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={16} />} label="Users" />
                    <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<ShieldAlert size={16} />} label="Sécurité" />
                    <TabButton active={activeTab === 'marketing'} onClick={() => setActiveTab('marketing')} icon={<Megaphone size={16} />} label="Marketing" />
                    <TabButton active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<HardDrive size={16} />} label="Tools" />
                </div>
            </header>

            {/* CONTENT AREA */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'overview' && <OverviewTab stats={stats} loading={loading} />}
                {activeTab === 'users' && <UsersTab token={token} />}
                {activeTab === 'security' && <SecurityTab token={token} />}
                {activeTab === 'marketing' && <MarketingTab token={token} />}
                {activeTab === 'tools' && <ToolsTab token={token} />}
            </div>
        </div>
    );
};

// --- SUB COMPONENTS ---

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
    >
        {icon} {label}
    </button>
);

// 1. OVERVIEW TAB
const OverviewTab = ({ stats, loading }: { stats: SystemStats | null, loading: boolean }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
        <StatCard
            title="CPU LOAD"
            value={`${stats?.cpu_usage ?? 0}%`}
            color={(stats?.cpu_usage ?? 0) > 80 ? "red" : "blue"}
            icon={<Cpu />}
            loading={loading}
        />
        <StatCard
            title="RAM USAGE"
            value={`${stats?.ram_usage ?? 0}%`}
            color={(stats?.ram_usage ?? 0) > 80 ? "orange" : "purple"}
            icon={<Server />}
            loading={loading}
        />
        <StatCard
            title="DATABASE LATENCY"
            value={`${stats?.db_latency_ms ?? 0} ms`}
            subValue={stats?.db_status ? "ONLINE" : "OFFLINE"}
            color={stats?.db_status ? "emerald" : "red"}
            icon={<Database />}
            loading={loading}
        />

        {/* LOGS CONSOLE */}
        <div className="lg:col-span-3 bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-64 overflow-y-auto shadow-inner">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-slate-500">
                <Terminal size={12} /> SYSTEM LOGS STREAM
            </div>
            <p className="text-emerald-500">[SYSTEM] Admin Dashboard Initialized...</p>
            <p className="text-blue-500">[INFO] Monitoring Agents Active.</p>
            {stats?.db_status ?
                <p className="text-emerald-500">[DB] Connection Established ({stats.db_latency_ms}ms) - OK</p> :
                <p className="text-red-500 animate-pulse">[CRITICAL] DATABASE CONNECTION FAILED</p>
            }
        </div>
    </div>
);

const StatCard = ({ title, value, subValue, color, icon, loading }: any) => {
    const colors: any = {
        red: "bg-red-500/10 text-red-500 border-red-500/20",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };

    return (
        <div className={`${colors[color]} border rounded-xl p-6 flex items-center justify-between`}>
            <div>
                <h3 className="text-xs font-bold opacity-70 mb-1 flex items-center gap-2">{icon} {title}</h3>
                <div className="text-3xl font-black tracking-tighter">
                    {loading ? "..." : value}
                </div>
                {subValue && <div className="text-xs font-bold mt-1 opacity-80">{subValue}</div>}
            </div>
            {loading && <RefreshCw className="animate-spin opacity-50" />}
        </div>
    );
};

// 2. USERS TAB
const UsersTab = ({ token }: { token: string | null }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/admin/users?search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">User Management ({users.length} visible)</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none w-64"
                    />
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Credits</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 text-slate-500">#{user.id}</td>
                                <td className="p-4 font-bold text-white">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' || user.role === 'superadmin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700/50 text-slate-400'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-emerald-400">{user.credits} CR</td>
                                <td className="p-4">
                                    {user.is_verified ?
                                        <span className="text-emerald-500 flex items-center gap-1"><UserCheck size={14} /> Verified</span> :
                                        <span className="text-orange-500 flex items-center gap-1"><AlertTriangle size={14} /> Pending</span>
                                    }
                                </td>
                                <td className="p-4">
                                    <button className="text-blue-400 hover:text-white transition-colors text-xs font-bold flex items-center gap-1">
                                        <Edit size={14} /> EDIT
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 3. SECURITY TAB
const SecurityTab = ({ token }: { token: string | null }) => {
    const [subTab, setSubTab] = useState<'network' | 'iam' | 'intel' | 'audit'>('network');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-12 gap-6">
                {/* SIDEBAR */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2 space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest px-1">Défense</div>
                    <SubTabButton active={subTab === 'network'} onClick={() => setSubTab('network')} label="Network" />
                    <SubTabButton active={subTab === 'iam'} onClick={() => setSubTab('iam')} label="Identity IAM" />
                    <SubTabButton active={subTab === 'intel'} onClick={() => setSubTab('intel')} label="Threat Intel" />
                </div>

                {/* MAIN PANEL */}
                <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[500px]">
                    {subTab === 'network' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2"><ShieldAlert /> NETWORK DEFENSE GRID</h2>

                            <div className="grid grid-cols-3 gap-4">
                                <SecurityMetric label="Active Firewall Rules" value="1,240" status="good" />
                                <SecurityMetric label="Blocked IPs (24h)" value="12" status="warning" />
                                <SecurityMetric label="DDoS Shield" value="ACTIVE" status="good" />
                            </div>

                            <div className="bg-black/50 p-4 rounded border border-slate-800 h-64 flex items-center justify-center text-slate-500 border-dashed">
                                [TRAFFIC MAP: NO THREATS DETECTED]
                            </div>

                            <div className="bg-slate-800 p-4 rounded">
                                <h3 className="font-bold mb-2 text-sm text-slate-400 uppercase">Modules Status</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <StatusRow name="WAF (Web App Firewall)" status="online" />
                                    <StatusRow name="Rate Limiter" status="online" />
                                    <StatusRow name="SQL Injection Scanner" status="online" />
                                </div>
                            </div>
                        </div>
                    )}
                    {subTab === 'iam' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2"><Users /> IDENTITY MONITOR</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <SecurityMetric label="Active Sessions" value="5" status="good" />
                                <SecurityMetric label="Auth Failures" value="0" status="good" />
                                <SecurityMetric label="Admin Access" value="1" status="warning" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. MARKETING TAB (NEW)
const MarketingTab = ({ token }: { token: string | null }) => {
    const [subTab, setSubTab] = useState<'campaigns' | 'analytics' | 'automation' | 'seo'>('analytics');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-12 gap-6">
                {/* SIDEBAR */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2 space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest px-1">Growth Hacking</div>
                    <SubTabButton active={subTab === 'analytics'} onClick={() => setSubTab('analytics')} label="Analytics" />
                    <SubTabButton active={subTab === 'campaigns'} onClick={() => setSubTab('campaigns')} label="Campagnes" />
                    <SubTabButton active={subTab === 'automation'} onClick={() => setSubTab('automation')} label="Automation" />
                    <SubTabButton active={subTab === 'seo'} onClick={() => setSubTab('seo')} label="SEO & Content" />
                </div>

                {/* MAIN PANEL */}
                <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[500px]">

                    {subTab === 'analytics' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2"><TrendingUp /> GROWTH ANALYTICS</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <SecurityMetric label="Daily Visitors" value="1,204" status="good" />
                                <SecurityMetric label="Conversion Rate" value="3.4%" status="good" />
                                <SecurityMetric label="Revenue (24h)" value="€450.00" status="good" />
                                <SecurityMetric label="Churn Rate" value="0.8%" status="good" />
                            </div>
                            <div className="bg-slate-800 p-8 rounded border border-slate-700 h-64 flex flex-col items-center justify-center text-slate-400">
                                <BarChart3 size={48} className="mb-2 opacity-20" />
                                <span className="text-sm font-bold opacity-50">TRAFFIC SOURCES VISUALIZATION</span>
                                <span className="text-xs opacity-30 mt-1">Google • LinkedIn • Direct • Referral</span>
                            </div>
                        </div>
                    )}

                    {subTab === 'campaigns' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2"><Megaphone /> OUTREACH CAMPAIGNS</h2>
                                <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded text-sm font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                                    + New Campaign
                                </button>
                            </div>

                            <div className="grid gap-4">
                                <CampaignrRow name="Welcome Sequence" status="active" sent={1200} openRate="45%" clickRate="12%" />
                                <CampaignrRow name="Pro Plan Upsell" status="paused" sent={450} openRate="32%" clickRate="5%" />
                                <CampaignrRow name="Newsletter Janvier" status="draft" sent={0} openRate="-" clickRate="-" />
                            </div>
                        </div>
                    )}

                    {subTab === 'automation' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2"><Zap /> WORKFLOW AUTOMATION</h2>
                            <p className="text-slate-400 text-sm">Automate user journeys based on triggers.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <WorkflowCard title="Onboarding Flow" triggers="Sign Up" actions="Email x3" active />
                                <WorkflowCard title="Abandoned Cart" triggers="Billing Visit" actions="Email x1" active />
                                <WorkflowCard title="Low Credits Alert" triggers="Credits < 5" actions="Notif + Email" active={false} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const SubTabButton = ({ active, onClick, label }: any) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${active ? 'bg-slate-800 text-white border-l-4 border-emerald-500 shadow-md' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'}`}
    >
        {label}
    </button>
);

const SecurityMetric = ({ label, value, status }: any) => (
    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 transform hover:scale-105 transition-transform duration-300">
        <div className="text-xs text-slate-500 uppercase font-bold">{label}</div>
        <div className={`text-2xl font-bold mt-1 ${status === 'good' ? 'text-emerald-400' : status === 'warning' ? 'text-orange-400' : status === 'neutral' ? 'text-slate-300' : 'text-red-500'}`}>
            {value}
        </div>
    </div>
);

const StatusRow = ({ name, status }: any) => (
    <div className="flex justify-between items-center bg-slate-900 p-2 rounded px-3 border border-slate-800">
        <span className="text-slate-300">{name}</span>
        <span className={`text-xs font-bold uppercase ${status === 'online' ? 'text-emerald-500' : 'text-red-500'}`}>
            ● {status.toUpperCase()}
        </span>
    </div>
);

const CampaignrRow = ({ name, status, sent, openRate, clickRate }: any) => (
    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
        <div>
            <div className="font-bold text-white">{name}</div>
            <div className="text-xs text-slate-500 uppercase mt-1 tracking-wider">{status}</div>
        </div>
        <div className="flex gap-8 text-right">
            <div>
                <div className="text-xs text-slate-500">SENT</div>
                <div className="font-mono text-white">{sent}</div>
            </div>
            <div>
                <div className="text-xs text-slate-500">OPEN RATE</div>
                <div className="font-mono text-emerald-400">{openRate}</div>
            </div>
            <div>
                <div className="text-xs text-slate-500">CLICK RATE</div>
                <div className="font-mono text-blue-400">{clickRate}</div>
            </div>
        </div>
    </div>
);

const WorkflowCard = ({ title, triggers, actions, active }: any) => (
    <div className={`p-4 rounded-lg border ${active ? 'bg-slate-900 border-slate-700' : 'bg-slate-950 border-slate-800 opacity-50'} relative overflow-hidden`}>
        <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-white">{title}</h3>
            <div className={`w-3 h-3 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} />
        </div>
        <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
                <span>TRIGGER</span>
                <span className="text-white">{triggers}</span>
            </div>
            <div className="flex justify-between text-slate-400">
                <span>ACTION</span>
                <span className="text-white">{actions}</span>
            </div>
        </div>
    </div>
);

// 5. TOOLS TAB
const ToolsTab = ({ token }: { token: string | null }) => {
    const [testEmail, setTestEmail] = useState('');
    const [status, setStatus] = useState('');

    const sendEmail = async () => {
        if (!testEmail) return;
        setStatus('sending');
        try {
            await axios.post(`${API_URL}/api/admin/test-email`, { target_email: testEmail }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-500 mb-4 flex items-center gap-2"><Mail /> SMTP Tester</h3>
                <p className="text-sm text-slate-400 mb-4">Envoyer un email de test pour valider la configuration OVH/SMTP.</p>
                <div className="flex gap-2">
                    <input
                        type="email"
                        placeholder="test@example.com"
                        className="flex-1 bg-slate-950 border border-slate-700 rounded p-2 focus:border-yellow-500 outline-none"
                        value={testEmail}
                        onChange={e => setTestEmail(e.target.value)}
                    />
                    <button
                        onClick={sendEmail}
                        disabled={status === 'sending'}
                        className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-4 rounded"
                    >
                        {status === 'sending' ? 'Send' : 'Send'}
                    </button>
                </div>
                {status === 'success' && <p className="mt-2 text-emerald-500 text-sm">✅ Email envoyé avec succès !</p>}
                {status === 'error' && <p className="mt-2 text-red-500 text-sm">❌ Erreur lors de l'envoi.</p>}
            </div>
        </div>
    );
};
