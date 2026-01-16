import React, { useState, useEffect } from 'react';
import {
    Users,
    Activity,
    DollarSign,
    Search,
    Shield,
    ShieldAlert,
    Ban,
    CheckCircle,
    CreditCard,
    TrendingUp,
    Server,
    Loader2
} from 'lucide-react';
import { adminService, UserAdminView, AdminStats } from '../../services/adminService';
import { toast } from 'sonner';
import ExportButton from '../../components/admin/ExportButton';
import StatsChart from '../../components/admin/StatsChart';
import Maintenance from './Maintenance';
import ReportButton from '../../components/admin/ReportButton';


export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [users, setUsers] = useState<UserAdminView[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Modal State
    const [selectedUser, setSelectedUser] = useState<UserAdminView | null>(null);
    const [creditAmount, setCreditAmount] = useState(0);
    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsData, usersData] = await Promise.all([
                adminService.getStats(),
                adminService.getAllUsers(0, 50, search)
            ]);
            setStats(statsData);
            setUsers(usersData.users);
        } catch (error) {
            console.error("Failed to fetch admin data, using mock data for demo", error);
            // MOCK DATA FOR DEMO IF BACKEND IS OFFLINE
            setStats({
                total_users: 1248,
                total_organizations: 85,
                total_analyses: 15420,
                total_credits_used: 45000
            });
            setUsers([
                { id: 1, email: "jean.dupont@example.com", is_active: true, role: "user", credits_balance: 0, full_name: "Jean Dupont", created_at: new Date().toISOString() },
                { id: 2, email: "admin@verifdoc.com", is_active: true, role: "superadmin", credits_balance: 999999, full_name: "Super Admin", created_at: new Date().toISOString() },
                { id: 3, email: "hacker@evil.com", is_active: false, role: "user", credits_balance: 50, full_name: "Evil Hacker", created_at: new Date().toISOString() },
                { id: 4, email: "sarah.connor@skynet.com", is_active: true, role: "admin", credits_balance: 5000, full_name: "Sarah Connor", created_at: new Date().toISOString() },
            ]);
            toast.warning("Mode Démo (Backend Offline)");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await adminService.getAllUsers(0, 50, search);
            setUsers(data.users);
        } catch (error) {
            toast.error("Erreur de recherche");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCredits = async () => {
        if (!selectedUser) return;
        try {
            await adminService.addUserCredits(selectedUser.id, creditAmount);
            toast.success(`${creditAmount} crédits ajoutés à ${selectedUser.email}`);
            setIsCreditModalOpen(false);
            setCreditAmount(0);
            fetchData(); // Refresh list
        } catch (error) {
            toast.error("Impossible d'ajouter des crédits");
        }
    };

    const handleToggleStatus = async (user: UserAdminView) => {
        try {
            await adminService.updateUserStatus(user.id, !user.is_active);
            toast.success(`Statut de ${user.email} mis à jour`);
            fetchData();
        } catch (error) {
            toast.error("Erreur de mise à jour");
        }
    };

    if (loading && !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b1121]">
                <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <ShieldAlert className="text-red-600" size={32} />
                            GOD MODE
                        </h1>
                        <p className="text-slate-500 mt-1">Super Admin Control Center</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full font-bold text-xs uppercase animate-pulse">
                            <Activity size={16} /> Système Opérationnel
                        </div>
                    </div>
                </header>

                {/* STATS CARDS */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                                    <Users size={24} />
                                </div>
                                <span className="text-xs font-bold text-green-500 flex items-center gap-1">+12% <TrendingUp size={12} /></span>
                            </div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.total_users}</div>
                            <div className="text-sm text-slate-500">Utilisateurs Totaux</div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                                    <Activity size={24} />
                                </div>
                            </div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.total_analyses}</div>
                            <div className="text-sm text-slate-500">Analyses Réalisées</div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-xl">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.total_credits_used}</div>
                            <div className="text-sm text-slate-500">Crédits Consommés</div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 rounded-xl">
                                    <Server size={24} />
                                </div>
                            </div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white">100%</div>
                            <div className="text-sm text-slate-500">Uptime Serveur</div>
                        </div>
                    </div>
                )}

                {/* ACTIONS & CHARTS */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <div className="flex gap-4 items-start">
                        <ExportButton />
                        <ReportButton />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Évolution des Analyses</h3>
                        <StatsChart />
                    </div>
                    <div>
                        <Maintenance />
                    </div>
                </div>

                {/* USER MANAGEMENT SECTION */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gestion Utilisateurs</h2>

                        <form onSubmit={handleSearch} className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher par email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs uppercase font-bold tracking-wider text-left">
                                <tr>
                                    <th className="px-6 py-4">Utilisateur</th>
                                    <th className="px-6 py-4">Rôle</th>
                                    <th className="px-6 py-4">Crédits</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {user.email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white text-sm">{user.full_name || 'Sans nom'}</div>
                                                    <div className="text-xs text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'admin' || user.role === 'superadmin'
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-mono font-bold text-slate-900 dark:text-white">
                                                {user.credits_balance}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.is_active ? (
                                                <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                                    <CheckCircle size={14} /> Actif
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                                                    <Ban size={14} /> Banned
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedUser(user); setIsCreditModalOpen(true); }}
                                                    className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors text-slate-400"
                                                    title="Donner des crédits"
                                                >
                                                    <CreditCard size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={`p-2 rounded-lg transition-colors ${user.is_active
                                                        ? 'hover:bg-red-100 hover:text-red-600 text-slate-400'
                                                        : 'hover:bg-green-100 hover:text-green-600 text-red-500'
                                                        }`}
                                                    title={user.is_active ? "Bannir" : "Réactiver"}
                                                >
                                                    <Shield size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL AJOUT CREDIT */}
            {isCreditModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ajouter Crédits</h3>
                        <p className="text-sm text-slate-500 mb-6">Ajouter manuellement des crédits au compte de <strong>{selectedUser.email}</strong>.</p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {[10, 50, 100].map(amt => (
                                    <button
                                        key={amt}
                                        onClick={() => setCreditAmount(amt)}
                                        className={`py-2 rounded-lg text-sm font-bold border transition-all ${creditAmount === amt
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'border-slate-200 text-slate-600 hover:border-blue-300'
                                            }`}
                                    >
                                        +{amt}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">CUSTOM</span>
                                <input
                                    type="number"
                                    value={creditAmount}
                                    onChange={(e) => setCreditAmount(Number(e.target.value))}
                                    className="w-full pl-20 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                onClick={handleAddCredits}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-95"
                            >
                                Valider Transaction
                            </button>
                            <button
                                onClick={() => setIsCreditModalOpen(false)}
                                className="w-full py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
