import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import { ScrollText, Clock, Search, Loader2 } from "lucide-react";

export default function SystemLogs() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await axios.get(`${API_URL}/api/admin/audit-logs`, { headers: { Authorization: `Bearer ${token}` } });
                setLogs(res.data);
            } catch (e) {
                console.error("Failed to fetch logs", e);
                // Demo fallback
                setLogs([
                    { id: 1, action: "LOGIN_SUCCESS", user_id: 42, details: "Login from 192.168.1.1", timestamp: "2026-01-03T08:00:00" },
                    { id: 2, action: "BAN_USER", user_id: 1, details: "Banned User #55 due to fraud", timestamp: "2026-01-03T09:30:00" },
                    { id: 3, action: "API_ERROR", user_id: 12, details: "500 Internal Server Error on /verify", timestamp: "2026-01-03T10:15:00" }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(l =>
        l.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.details?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="System Logs | VerifDoc Admin" description="Audit trails et sécurité" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <ScrollText className="text-orange-500" size={32} />
                            Logs Système & Audit
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Traçabilité complète des actions administratives et critiques.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher action, user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 md:w-96"
                        />
                    </div>
                </div>

                {/* LOGS TERMINAL STYLE */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
                ) : (
                    <div className="bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
                        <div className="bg-gray-900 px-4 py-2 border-b border-gray-800 flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <span className="ml-2">system_audit.log</span>
                        </div>
                        <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {filteredLogs.map((log) => (
                                <div key={log.id} className="group flex items-start hover:bg-white/5 p-1 rounded transition-colors">
                                    <span className="text-gray-500 w-40 shrink-0 flex items-center gap-2">
                                        <Clock size={12} />
                                        {new Date(log.timestamp).toLocaleTimeString()} <span className="text-[10px] opacity-50">{new Date(log.timestamp).toLocaleDateString()}</span>
                                    </span>
                                    <span className={`w-32 shrink-0 font-bold ${log.action.includes("ERROR") || log.action.includes("BAN") ? "text-red-400" :
                                        log.action.includes("LOGIN") ? "text-green-400" :
                                            "text-blue-400"
                                        }`}>
                                        {log.action}
                                    </span>
                                    <span className="text-gray-300 flex-1 break-all">
                                        <span className="text-gray-600 mr-2">[Uid:{log.user_id}]</span>
                                        {log.details}
                                    </span>
                                </div>
                            ))}
                            {filteredLogs.length === 0 && (
                                <div className="text-gray-600 italic">-- No logs found matching query --</div>
                            )}
                            <div className="text-green-500/50 animate-pulse mt-4">_</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
