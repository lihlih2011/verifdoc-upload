import { useState, useEffect } from "react";
import API_URL from "../../config/api";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";

export default function CRM() {
    const [leads, setLeads] = useState<any[]>([]);
    const [deals, setDeals] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("deals");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const [leadsRes, dealsRes] = await Promise.all([
                axios.get(`${API_URL}/api/crm/leads`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${API_URL}/api/crm/deals`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setLeads(leadsRes.data);
            setDeals(dealsRes.data);
        } catch (e) {
            console.error(e);
        }
    };

    const generateContract = async (dealId: number) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_URL}/api/crm/contracts/generate`,
                { deal_id: dealId, service_type: "Pack Premium Check", price_eur: 5000 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Contrat généré ! ID: " + res.data.contract_id);
            window.open(`${API_URL}/preview_contract.html`, "_blank"); // Temporary
        } catch (e) {
            alert("Erreur génération contrat");
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200">
            <PageMeta title="CRM | VerifDoc" description="Gestion Pipeline" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">CRM & Pipeline</h1>
                <div className="flex gap-2">
                    <button onClick={() => setActiveTab('leads')} className={`px-4 py-2 rounded-lg ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Leads</button>
                    <button onClick={() => setActiveTab('deals')} className={`px-4 py-2 rounded-lg ${activeTab === 'deals' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Deals</button>
                </div>
            </div>

            {activeTab === 'leads' && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h3 className="mb-4 text-xl font-bold">Prospects ({leads.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-gray-500 uppercase border-b border-gray-800">
                                <tr><th>Contact</th><th>Entreprise / Type</th><th>Email</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {leads.map(l => (
                                    <tr key={l.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="py-3 font-medium text-white">{l.first_name} {l.last_name}</td>
                                        <td className="py-3 capitalize">{l.company_type || "N/A"}</td>
                                        <td className="py-3 text-gray-500">{l.email}</td>
                                        <td className="py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs uppercase">{l.status || "new"}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'deals' && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h3 className="mb-4 text-xl font-bold">Opportunités ({deals.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-gray-500 uppercase border-b border-gray-800">
                                <tr><th>ID</th><th>Montant</th><th>Stage</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {deals.map(d => (
                                    <tr key={d.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="py-3">#{d.id}</td>
                                        <td className="py-3 font-mono text-white">{d.amount} €</td>
                                        <td className="py-3"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">{d.stage}</span></td>
                                        <td className="py-3">
                                            <button
                                                onClick={() => generateContract(d.id)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs transition-colors"
                                            >
                                                Générer Contrat
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
    );
}
