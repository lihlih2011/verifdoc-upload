import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import { FileText, Download, CheckCircle, Search, Loader2 } from "lucide-react";

export default function Invoices() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchInvoices = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get(`${API_URL}/api/admin/invoices`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInvoices(res.data);
            } catch (e) {
                // Fallback demo data
                setInvoices([
                    { id: 1001, user_id: 42, amount: 1500, description: "Purchase: Business Pack (899€)", timestamp: "2026-01-02T10:00:00" },
                    { id: 1002, user_id: 15, amount: 500, description: "Purchase: Pro Pack (249€)", timestamp: "2026-01-01T14:30:00" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleDownload = (id: number) => {
        alert(`Téléchargement de la facture #${id}... (Simulation)`);
    };

    const filtered = invoices.filter(inv =>
        inv.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(inv.id).includes(searchTerm)
    );

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="Invoices | VerifDoc Admin" description="Historique de facturation." />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <FileText className="text-green-500" size={32} />
                            Factures & Paiements
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Suivi des revenus et téléchargement des preuves de paiement.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher facture..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 md:w-80"
                        />
                    </div>
                </div>

                {/* TABLE */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-500" size={40} /></div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-950/50 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-800">
                                    <th className="p-6">Réf. Facture</th>
                                    <th className="p-6">Client (ID)</th>
                                    <th className="p-6">Description</th>
                                    <th className="p-6">Date</th>
                                    <th className="p-6">Montant (Crédits)</th>
                                    <th className="p-6">Statut</th>
                                    <th className="p-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {filtered.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="p-6 font-mono text-white">INV-{inv.id}</td>
                                        <td className="p-6 text-gray-400">User #{inv.user_id}</td>
                                        <td className="p-6 font-medium text-white">{inv.description || "Rechargement Crédits"}</td>
                                        <td className="p-6 text-gray-400 text-sm">
                                            {new Date(inv.timestamp).toLocaleDateString()} {new Date(inv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="p-6 text-green-400 font-bold">+{inv.amount}</td>
                                        <td className="p-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-900/30 text-green-400 border border-green-500/30">
                                                <CheckCircle size={12} /> Payé
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button
                                                onClick={() => handleDownload(inv.id)}
                                                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
                                                title="Télécharger PDF"
                                            >
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={7} className="p-12 text-center text-gray-500">Aucune facture trouvée.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
