import PageMeta from "../../components/common/PageMeta";
import { MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

export default function Tickets() {
    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="Support Tickets | VerifDoc Admin" description="Gestion des incidents clients" />

            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageSquare className="text-blue-500" size={32} /> Support & Incidents
            </h1>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-950 text-gray-500 uppercase text-xs font-bold border-b border-gray-800">
                        <tr>
                            <th className="p-4">Priorité</th>
                            <th className="p-4">Sujet</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Statut</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        <tr className="hover:bg-gray-800/50">
                            <td className="p-4"><span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold uppercase">Urgent</span></td>
                            <td className="p-4 font-medium text-white">API Error 500 sur /ml/efficientnet</td>
                            <td className="p-4 text-gray-400">TotalEnergies</td>
                            <td className="p-4"><span className="flex items-center gap-2 text-blue-400 font-bold text-xs"><AlertCircle size={14} /> En cours</span></td>
                            <td className="p-4 text-right"><button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500">Répondre</button></td>
                        </tr>
                        <tr className="hover:bg-gray-800/50">
                            <td className="p-4"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold uppercase">Moyenne</span></td>
                            <td className="p-4 font-medium text-white">Question sur la facturation Pro</td>
                            <td className="p-4 text-gray-400">Cabinet Dupont</td>
                            <td className="p-4"><span className="flex items-center gap-2 text-green-400 font-bold text-xs"><CheckCircle size={14} /> Résolu</span></td>
                            <td className="p-4 text-right"><button className="bg-gray-800 text-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-700">Voir</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
