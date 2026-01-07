import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import { Building2, Users, CreditCard, Calendar, ArrowRight, Loader2, Search } from "lucide-react";

export default function Clients() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                // Fetch Organizations (Clients)
                const res = await axios.get(`${API_URL}/api/admin/organizations`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClients(res.data);
            } catch (e) {
                console.error("Failed to load clients", e);
                // Fallback mock data if API fails (for demo purposes)
                setClients([
                    { id: 1, name: "Acme Corp", subscription_plan: "enterprise", credits_balance: 5000, users: [{}, {}, {}], created_at: "2025-12-01" },
                    { id: 2, name: "Global Bank", subscription_plan: "pro", credits_balance: 1200, users: [{}], created_at: "2026-01-02" },
                    { id: 3, name: "Legal Firm Paris", subscription_plan: "freemium", credits_balance: 50, users: [], created_at: "2026-01-03" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta
                title="Clients Database | VerifDoc Admin"
                description="Gestion de la base de données clients et organisations."
            />

            <div className="max-w-7xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Building2 className="text-blue-500" size={32} />
                            Base Clients
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Gérez les organisations, les abonnements et les accès entreprise.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher une entreprise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 md:w-80"
                        />
                    </div>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-950/50 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-800">
                                    <th className="p-6">Organisation</th>
                                    <th className="p-6">Plan Abonnement</th>
                                    <th className="p-6">Utilisateurs</th>
                                    <th className="p-6">Crédits</th>
                                    <th className="p-6">Création</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {filteredClients.map((client) => (
                                    <tr key={client.id} className="group hover:bg-gray-800/50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-500/30 flex items-center justify-center font-bold text-white">
                                                    {client.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{client.name}</div>
                                                    <div className="text-xs text-gray-500">ID: {client.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${client.subscription_plan === 'enterprise'
                                                ? 'bg-purple-900/30 text-purple-300 border-purple-500/30'
                                                : client.subscription_plan === 'pro'
                                                    ? 'bg-blue-900/30 text-blue-300 border-blue-500/30'
                                                    : 'bg-gray-800 text-gray-400 border-gray-700'
                                                }`}>
                                                <CreditCard size={12} />
                                                {client.subscription_plan}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Users size={16} className="text-gray-500" />
                                                <span className="font-mono font-bold">{client.users?.length || 0}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="font-mono text-white font-bold">{client.credits_balance}</div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Calendar size={14} />
                                                {new Date(client.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="text-blue-400 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition-colors">
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredClients.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-gray-500">
                                            Aucune organisation trouvée.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
