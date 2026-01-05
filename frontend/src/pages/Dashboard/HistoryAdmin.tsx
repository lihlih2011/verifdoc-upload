import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import { Clock, CheckCircle, XCircle, FileText, Download, Search, Loader2, Eye } from "lucide-react";

export default function HistoryAdmin() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchDocs = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await axios.get(`${API_URL}/api/admin/documents`, { headers: { Authorization: `Bearer ${token}` } });
                setDocs(res.data);
            } catch (e) {
                // Demo fallback
                setDocs([
                    { id: 1, filename: "CNI_Recto.jpg", verdict: "verdict_valid", confidence: 98.5, created_at: "2026-01-03T10:00:00", user_id: 42 },
                    { id: 2, filename: "Passport_Fake.png", verdict: "verdict_reject", confidence: 99.1, created_at: "2026-01-03T09:45:00", user_id: 15 },
                    { id: 3, filename: "Justificatif.pdf", verdict: "verdict_valid", confidence: 85.0, created_at: "2026-01-03T09:30:00", user_id: 42 },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);

    const filtered = docs.filter(d =>
        d.filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(d.user_id).includes(searchTerm)
    );

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="Global History | VerifDoc Admin" description="Supervision de toutes les analyses" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Clock className="text-purple-500" size={32} />
                            Historique Global
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Supervision de tous les documents traités par la plateforme.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Fichier ou User ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 md:w-80"
                        />
                    </div>
                </div>

                {/* TABLE */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-950/50 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-800">
                                    <th className="p-6">ID</th>
                                    <th className="p-6">Document</th>
                                    <th className="p-6">Résultat</th>
                                    <th className="p-6">Confiance</th>
                                    <th className="p-6">Utilisateur</th>
                                    <th className="p-6">Date</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {filtered.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="p-6 text-gray-600 font-mono">#{doc.id}</td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gray-800 p-2 rounded text-gray-300"><FileText size={18} /></div>
                                                <span className="font-medium text-white">{doc.filename}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {doc.verdict === 'verdict_valid' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                                                    <CheckCircle size={12} /> Valide
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                                    <XCircle size={12} /> Frauduleux
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${doc.confidence > 90 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${doc.confidence}%` }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-400">{doc.confidence}%</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-blue-400 text-sm">User #{doc.user_id}</td>
                                        <td className="p-6 text-gray-500 text-sm">
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors" title="Voir Rapport"><Eye size={18} /></button>
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors" title="Télécharger"><Download size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
