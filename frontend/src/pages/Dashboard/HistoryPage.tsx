import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import { Clock, CheckCircle, XCircle, FileText, Download, Search, Loader2, Eye, Calendar, ShieldAlert } from "lucide-react";

export default function HistoryPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState({ page: 1, total: 0, pageSize: 20 });

    useEffect(() => {
        const fetchDocs = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                setLoading(true);
                const res = await axios.get(`${API_URL}/api/dashboard/history`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page: pagination.page, search: searchTerm }
                });
                setDocs(res.data.data);
                setPagination(prev => ({ ...prev, total: res.data.total }));
            } catch (e) {
                console.error("Failed to fetch history", e);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeout = setTimeout(() => fetchDocs(), 300);
        return () => clearTimeout(timeout);
    }, [pagination.page, searchTerm]);

    const getVerdictBadge = (verdict: string) => {
        if (verdict === 'verdict_valid' || verdict === 'VALID') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle size={14} /> Certifié
                </span>
            );
        }
        if (verdict === 'verdict_reject' || verdict === 'FRAUD') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                    <XCircle size={14} /> Falsifié
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <ShieldAlert size={14} /> Suspect
            </span>
        );
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="Mon Historique | VerifDoc" description="Vos analyses passées." />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                            <Clock className="text-blue-500" size={32} />
                            Historique des Analyses
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Retrouvez tous vos documents analysés et leurs certificats de conformité.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher un document..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 shadow-sm transition-all focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                    {loading && docs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                            <Loader2 className="animate-spin mb-4 text-blue-500" size={40} />
                            <p>Chargement de vos archives...</p>
                        </div>
                    ) : docs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                            <FileText size={48} className="mb-4 opacity-20" />
                            <p className="text-lg">Aucun document trouvé.</p>
                            <p className="text-sm">Lancez une nouvelle analyse pour commencer !</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-950/80 text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-gray-800">
                                        <th className="p-5 font-medium">Document</th>
                                        <th className="p-5 font-medium">Date d'Analyse</th>
                                        <th className="p-5 font-medium">Résultat</th>
                                        <th className="p-5 font-medium">Score IA</th>
                                        <th className="p-5 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50">
                                    {docs.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-800/30 transition-colors group">
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-gray-800 p-2.5 rounded-lg text-blue-400 border border-gray-700 shadow-sm">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-white block">{doc.filename}</span>
                                                        <span className="text-xs text-gray-500 font-mono">#{doc.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Calendar size={14} />
                                                    {new Date(doc.created_at).toLocaleDateString()} <span className="text-gray-600">à {new Date(doc.created_at).toLocaleTimeString().slice(0, 5)}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                {getVerdictBadge(doc.verdict)}
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${doc.confidence > 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : doc.confidence > 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                                                            style={{ width: `${doc.confidence}%` }}>
                                                        </div>
                                                    </div>
                                                    <span className={`text-sm font-bold ${doc.confidence > 80 ? 'text-emerald-400' : 'text-gray-400'}`}>{doc.confidence}%</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all" title="Voir les détails">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button className="p-2 text-blue-400 hover:text-white hover:bg-blue-600 rounded-lg transition-all" title="Télécharger le rapport">
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {pagination.total > pagination.pageSize && (
                        <div className="p-4 border-t border-gray-800 flex justify-between items-center bg-gray-950/30">
                            <span className="text-sm text-gray-500">
                                Page {pagination.page} sur {Math.ceil(pagination.total / pagination.pageSize)}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                                    disabled={pagination.page === 1}
                                    className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white transition-colors"
                                >
                                    Précédent
                                </button>
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                    disabled={pagination.page * pagination.pageSize >= pagination.total}
                                    className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white transition-colors"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
