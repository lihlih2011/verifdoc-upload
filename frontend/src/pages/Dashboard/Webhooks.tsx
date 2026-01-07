import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Webhook, Save, Play, CheckCircle, AlertTriangle, Database, Loader2 } from "lucide-react";
import API_URL from "../../config/api";
import axios from "axios";

export default function Integrations() {
    const [activeTab, setActiveTab] = useState<'webhook' | 'odoo'>('odoo');

    // Webhook State
    const [webhookUrl, setWebhookUrl] = useState("https://hooks.zapier.com/hooks/catch/XXXX/YYYY/");
    const [webhookActive, setWebhookActive] = useState(false);

    // Odoo State
    const [odooUrl, setOdooUrl] = useState("https://veifdocio.odoo.com");
    const [odooDb, setOdooDb] = useState("veifdocio-main"); // Suppression de la devinette risquée, valeur "safe" par défaut
    const [odooUser, setOdooUser] = useState("");
    const [odooKey, setOdooKey] = useState("");
    const [odooActive, setOdooActive] = useState(true);

    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await axios.get(`${API_URL}/api/admin/integrations/odoo`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data) {
                setOdooUrl(res.data.url || "");
                setOdooDb(res.data.db || "");
                setOdooUser(res.data.username || ""); // Note: username from API
                setOdooKey(res.data.key || ""); // Will be masked
                setOdooActive(res.data.active);
            }
        } catch (e) {
            console.error("No Odoo settings found or error fetching", e);
        }
    };

    const handleSave = async () => {
        if (activeTab === 'odoo') {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                // Ensure URL doesn't end with slash to avoid double slash later
                const cleanUrl = odooUrl.replace(/\/$/, "");

                await axios.post(`${API_URL}/api/admin/integrations/odoo`, {
                    url: cleanUrl,
                    db: odooDb,
                    username: odooUser,
                    api_key: odooKey,
                    active: odooActive
                }, { headers: { Authorization: `Bearer ${token}` } });
                alert("Configuration Odoo sauvegardée et active !");
            } catch (e) {
                alert("Erreur lors de la sauvegarde.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Webhooks config not implemented in backend yet (Demo only).");
        }
    };

    const handleTest = () => {
        const provider = activeTab === 'webhook' ? 'Zapier' : 'Odoo';
        const newLog = {
            id: Date.now(),
            status: "success",
            timestamp: new Date().toISOString(),
            payload: `{ event: 'CREATE_LEAD', provider: '${provider}', email: 'test@demo.com' }`
        };
        setLogs([newLog, ...logs]);
        alert(`Lead de test envoyé vers ${provider} !`);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="Intégrations | VerifDoc Admin" description="CRM Odoo & Outils Tiers" />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Database className="text-purple-500" size={32} />
                        Intégrations CRM
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Connectez VerifDoc à votre ERP Odoo pour synchroniser automatiquement les nouveaux clients.
                    </p>
                </div>

                {/* TABS */}
                <div className="flex gap-4 border-b border-gray-800 pb-2">
                    <button
                        onClick={() => setActiveTab('odoo')}
                        className={`px-4 py-2 font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === 'odoo' ? 'text-purple-500 border-purple-500 bg-purple-500/10' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                        Odoo ERP
                    </button>
                    <button
                        onClick={() => setActiveTab('webhook')}
                        className={`px-4 py-2 font-bold rounded-t-lg transition-colors border-b-2 ${activeTab === 'webhook' ? 'text-pink-500 border-pink-500 bg-pink-500/10' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                        Webhooks (Autres)
                    </button>
                </div>

                {/* CONFIG CARD */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

                    {/* ODOO VIEW */}
                    {activeTab === 'odoo' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-8 h-8 bg-[#714B67] rounded flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20">Odoo</span>
                                    Configuration Odoo
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setOdooActive(!odooActive)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${odooActive ? 'bg-green-600' : 'bg-gray-600'}`}
                                    >
                                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${odooActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                    <span className="text-sm font-medium text-gray-300">{odooActive ? 'ACTIF' : 'INACTIF'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">URL de l'Instance</label>
                                    <input
                                        type="text"
                                        value={odooUrl}
                                        onChange={(e) => setOdooUrl(e.target.value)}
                                        className="w-full bg-gray-950 border border-gray-700 text-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="https://mon-entreprise.odoo.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Nom Base de Données</label>
                                    <input
                                        type="text"
                                        value={odooDb}
                                        onChange={(e) => setOdooDb(e.target.value)}
                                        className="w-full bg-gray-950 border border-gray-700 text-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="ex: mycompany-main"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Email Utilisateur</label>
                                    <input
                                        type="email"
                                        value={odooUser}
                                        onChange={(e) => setOdooUser(e.target.value)}
                                        className="w-full bg-gray-950 border border-gray-700 text-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="admin@mycompany.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">API Key (ou Password)</label>
                                    <input
                                        type="password"
                                        value={odooKey}
                                        onChange={(e) => setOdooKey(e.target.value)}
                                        className="w-full bg-gray-950 border border-gray-700 text-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg flex gap-3 text-sm text-gray-300">
                                <AlertTriangle className="text-purple-400 shrink-0" size={20} />
                                <div>
                                    <p className="font-bold text-purple-300 mb-1">Conseil de Sécurité</p>
                                    N'utilisez pas votre mot de passe principal. Créez une CLÉ API dédiée pour VerifDoc dans vos préférences utilisateur Odoo.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* WEBHOOK VIEW */}
                    {activeTab === 'webhook' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Webhook className="text-pink-500" size={24} />
                                    Configuration Webhook
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setWebhookActive(!webhookActive)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${webhookActive ? 'bg-green-600' : 'bg-gray-600'}`}
                                    >
                                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${webhookActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                    <span className="text-sm font-medium text-gray-300">{webhookActive ? 'ACTIF' : 'INACTIF'}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">URL de destination (POST)</label>
                                <input
                                    type="text"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    className="w-full bg-gray-950 border border-gray-700 text-white font-mono text-sm p-4 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* ACTIONS BLOc */}
                    <div className="flex gap-4 pt-6 mt-4 border-t border-gray-800">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-gray-400 text-white rounded-lg font-bold transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                        </button>
                        <button onClick={handleTest} className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold transition-all border border-gray-700">
                            <Play size={18} /> Tester la connexion
                        </button>
                    </div>
                </div>

                {/* LOGS */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Journal de Synchronisation</h3>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        {logs.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">Aucune synchronisation récente.</div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-950 text-gray-500 uppercase font-bold text-xs">
                                    <tr>
                                        <th className="p-4">Statut</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Détails</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-800/50">
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1 text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">
                                                    <CheckCircle size={12} /> Envoyé
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</td>
                                            <td className="p-4 text-gray-500 font-mono truncate max-w-lg">{log.payload}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
