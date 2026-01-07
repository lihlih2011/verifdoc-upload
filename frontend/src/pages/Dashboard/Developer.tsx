import { useState } from 'react';
import API_URL from "../../config/api";
import { Copy, Eye, EyeOff, Terminal, Shield } from 'lucide-react';
import PageMeta from '../../components/common/PageMeta';

export default function Developer() {
    const [apiKey, setApiKey] = useState<string>("sk_live_************************");
    const [showKey, setShowKey] = useState(false);
    const [logs] = useState([
        { id: 1, date: '2025-12-31 14:30', method: 'POST', endpoint: '/analyze', status: 200, latency: '450ms' },
        { id: 2, date: '2025-12-31 14:32', method: 'POST', endpoint: '/analyze', status: 200, latency: '412ms' },
        { id: 3, date: '2025-12-31 15:01', method: 'GET', endpoint: '/history', status: 403, latency: '12ms' },
    ]);

    const revealKey = () => {
        // Simulation d'appel API pour vraie révélation
        if (!showKey) setApiKey("sk_live_PLACEHOLDER_KEY_FOR_DEMO_ABCD1234");
        else setApiKey("sk_live_************************");
        setShowKey(!showKey);
    };

    const copyKey = () => {
        navigator.clipboard.writeText("sk_live_PLACEHOLDER_KEY_FOR_DEMO_ABCD1234");
        alert("Clé API copiée !");
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200">
            <PageMeta title="Développeur API | VerifDoc" description="Intégrez notre IA dans vos applications." />

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold font-nacelle text-white flex items-center gap-2">
                            <Terminal className="text-green-500" /> Espace Développeur
                        </h1>
                        <p className="text-gray-400 mt-1">Gérez vos clés API et surveillez l'intégration.</p>
                    </div>
                    <a href={`${API_URL}/docs`} target="_blank" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors" >
                        Documentation API(Swagger)
                    </a >
                </div >

                {/* API Key Section */}
                < div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden" >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-purple-500" /> Clé API Production
                        </h3>
                        <span className="text-xs font-mono bg-green-500/20 text-green-400 px-2 py-1 rounded">ACTIVE</span>
                    </div>

                    <div className="flex items-center gap-3 bg-black/50 p-4 rounded-xl border border-gray-700">
                        <code className="flex-1 font-mono text-gray-300 text-sm break-all">
                            {apiKey}
                        </code>
                        <button onClick={revealKey} className="text-gray-400 hover:text-white transition-colors">
                            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button onClick={copyKey} className="text-gray-400 hover:text-white transition-colors">
                            <Copy size={18} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">⚠️ Ne partagez jamais cette clé. Elle donne accès total à votre quota de crédits.</p>
                </div >

                {/* Usage Logs */}
                < div className="bg-gray-900 border border-gray-800 rounded-2xl p-6" >
                    <h3 className="text-lg font-bold text-white mb-4">Derniers Appels API</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-xs uppercase text-gray-500 border-b border-gray-800">
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Method</th>
                                    <th className="px-4 py-2">Endpoint</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">Latency</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {logs.map(log => (
                                    <tr key={log.id} className="hover:bg-white/5 font-mono text-xs">
                                        <td className="px-4 py-3">{log.date}</td>
                                        <td className="px-4 py-3"><span className="text-blue-400">{log.method}</span></td>
                                        <td className="px-4 py-3">{log.endpoint}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded ${log.status === 200 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-500">{log.latency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >

            </div >
        </div >
    );
}
