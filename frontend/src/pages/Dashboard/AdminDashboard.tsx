import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const [usersRes, statsRes] = await Promise.all([
                    axios.get(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setUsers(usersRes.data);
                setStats(statsRes.data);
            } catch (e) {
                setError("Accès refusé ou erreur serveur.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200">
            <PageMeta
                title="Admin Dashboard | VerifDoc"
                description="Administration système et gestion des utilisateurs."
            />

            <div className="max-w-7xl mx-auto space-y-6">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-nacelle text-white flex items-center gap-2">
                            👑 Administration
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Vue globale sur l'infrastructure VerifDoc.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-[0_0_15px_rgba(192,38,211,0.4)]">
                            GOD MODE
                        </span>
                    </div>
                </div>

                {/* --- STATS CARDS --- */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div onClick={() => window.location.href = '/dashboard/clients'} className="cursor-pointer bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-gray-700 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider">Organisations</h4>
                            <div className="text-3xl font-bold text-white mt-2">{stats.total_organizations}</div>
                        </div>
                        <div onClick={() => window.location.href = '/dashboard/history'} className="cursor-pointer bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-blue-900 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider">Analyses Totales</h4>
                            <div className="text-3xl font-bold text-blue-400 mt-2">{stats.total_analyses}</div>
                        </div>
                        <div onClick={() => window.location.href = '/dashboard/finance'} className="cursor-pointer bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-purple-900 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider">Crédits Consommés</h4>
                            <div className="text-3xl font-bold text-purple-400 mt-2">{stats.total_credits_used}</div>
                        </div>
                    </div>
                )}

                {/* --- CONTENT --- */}
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Chargement des données...</div>
                ) : error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">{error}</div>
                ) : (
                    <div className="relative group rounded-2xl border border-purple-500/30 bg-gray-900/50 p-6 shadow-lg shadow-purple-900/10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Utilisateurs inscrits ({users.length})</h3>
                        </div>

                        <div className="relative z-10 overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="text-xs uppercase text-gray-500 border-b border-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Rôle</th>
                                        <th className="px-4 py-3">Crédits</th>
                                        <th className="px-4 py-3 text-right">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {users.map(u => (
                                        <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                                            <td className="px-4 py-3 font-mono text-gray-500">#{u.id}</td>
                                            <td className="px-4 py-3 font-medium text-white">{u.email}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-white">{u.credits_balance}</span>
                                                    <button
                                                        onClick={async () => {
                                                            const amountStr = prompt("Montant de crédits à ajouter (ou nb négatif pour retirer) :", "100");
                                                            if (!amountStr) return;
                                                            const amount = parseInt(amountStr);
                                                            if (isNaN(amount)) return alert("Montant invalide");

                                                            try {
                                                                await axios.post(`${API_URL}/api/admin/users/${u.id}/credits?amount=${amount}`, {}, {
                                                                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                                                                });
                                                                // Optimistic update
                                                                setUsers(users.map(user => user.id === u.id ? { ...user, credits_balance: user.credits_balance + amount } : user));
                                                                alert(`Crédits mis à jour ! Nouveau solde : ${u.credits_balance + amount}`);
                                                            } catch (e) {
                                                                alert("Erreur lors de l'ajout de crédits");
                                                            }
                                                        }}
                                                        className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white flex items-center justify-center text-xs font-bold transition-all"
                                                        title="Offrir des crédits"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await axios.put(`${API_URL}/api/admin/users/${u.id}/status?is_active=${!u.is_active}`, {}, {
                                                                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                                                            });
                                                            // Optimistic update
                                                            setUsers(users.map(user => user.id === u.id ? { ...user, is_active: !user.is_active } : user));
                                                        } catch (e) {
                                                            alert("Erreur lors de la mise à jour");
                                                        }
                                                    }}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all hover:scale-105 active:scale-95
                                                        ${u.is_active
                                                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 hover:content-["Bloquer"]'
                                                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20'
                                                        }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                                    {u.is_active ? "Actif" : "Bloqué"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
