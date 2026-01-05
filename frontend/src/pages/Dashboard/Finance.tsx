import PageMeta from "../../components/common/PageMeta";
import { DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Finance() {
    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-200 font-sans">
            <PageMeta title="Finance | VerifDoc Admin" description="Trésorerie et Stripe" />

            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <DollarSign className="text-emerald-500" size={32} /> Finance & Trésorerie
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-gray-500 text-sm font-bold uppercase">Revenu Mensuel (MRR)</h3>
                    <div className="text-4xl font-black text-white mt-2">12,450 €</div>
                    <div className="text-emerald-500 flex items-center gap-1 text-sm mt-2"><ArrowUpRight size={16} /> +15% vs mois dernier</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-gray-500 text-sm font-bold uppercase">Trésorerie Actuelle</h3>
                    <div className="text-4xl font-black text-white mt-2">45,200 €</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-gray-500 text-sm font-bold uppercase">Coûts Serveurs (GPU)</h3>
                    <div className="text-4xl font-black text-white mt-2">1,850 €</div>
                    <div className="text-red-400 flex items-center gap-1 text-sm mt-2"><ArrowDownRight size={16} /> -2% vs mois dernier (Optimisé)</div>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Derniers virements Stripe</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-900/30 p-2 rounded-lg text-purple-400"><CreditCard size={24} /></div>
                                <div>
                                    <div className="font-bold text-white">Virement Stripe Connect</div>
                                    <div className="text-xs text-gray-500">ID: pay_1Hh3k...</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-white text-lg">+ 2,490.00 €</div>
                                <div className="text-xs text-emerald-500">Succès</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
