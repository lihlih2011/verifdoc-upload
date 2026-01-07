import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Gift,
    Share2,
    Plus,
    Link as LinkIcon,
    Copy,
    Users,
    DollarSign,
    TrendingUp,
    CheckCircle2
} from 'lucide-react';

const MOCK_LINKS = [
    { id: 1, label: 'LinkedIn Bio', url: 'https://verifdoc.io/ref/chaoub_linkedin', clicks: 124, conversions: 2, earnings: '100.00 $', status: 'Active' },
    { id: 2, label: 'Email Signature', url: 'https://verifdoc.io/ref/chaoub_email', clicks: 45, conversions: 0, earnings: '0.00 $', status: 'Active' }
];

export const ReferralView: React.FC = () => {
    useTranslation();
    const [referralLinks] = useState(MOCK_LINKS);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Toast notification logic would go here
    };

    return (
        <div className="p-8 min-h-full animate-in fade-in duration-500 font-sans">

            {/* HERO BANNER - Vibrant Gradient as requested */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 p-10 mb-10 shadow-2xl shadow-purple-900/30">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-white max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                            <Gift size={12} /> Programme Partenaire
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            Parrainez & Gagnez <span className="text-yellow-300">50.00 $</span>
                        </h1>
                        <p className="text-lg text-purple-100 font-medium leading-relaxed opacity-90">
                            Recevez 50 $ pour chaque entreprise qui s'abonne via votre lien.
                            Vos filleuls reçoivent <strong>15 $ de crédits offerts</strong> pour commencer.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                                <Share2 size={18} /> Partager sur LinkedIn
                            </button>
                            <button className="bg-black/20 hover:bg-black/40 text-white backdrop-blur px-6 py-3 rounded-xl font-bold transition-all border border-white/10 flex items-center gap-2">
                                <Plus size={18} /> Créer un lien
                            </button>
                        </div>
                    </div>

                    {/* Illustration / Graphic Element could go here */}
                    <div className="hidden lg:block relative">
                        <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl absolute -top-10 -right-10"></div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl rotate-3 transform hover:rotate-0 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center font-bold text-green-900">$</div>
                                <div>
                                    <div className="text-xs text-purple-200 uppercase font-bold">Dernier paiement</div>
                                    <div className="text-2xl font-black text-white">+ 50.00 $</div>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-green-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StepCard
                    step="01"
                    title="Partagez votre lien"
                    desc="Envoyez votre lien unique à vos contacts ou partagez-le sur vos réseaux."
                    icon={<LinkIcon className="text-blue-400" />}
                />
                <StepCard
                    step="02"
                    title="Ils s'inscrivent"
                    desc="Vos filleuls s'inscrivent et reçoivent instantanément 15 $ de crédits."
                    icon={<Users className="text-purple-400" />}
                />
                <StepCard
                    step="03"
                    title="Vous êtes payé"
                    desc="Gagnez 50 $ en cash dès qu'ils effectuent leur premier paiement réel."
                    icon={<DollarSign className="text-emerald-400" />}
                />
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard label="Clics Totaux" value="124" icon={<TrendingUp size={20} className="text-blue-500" />} trend="+12%" />
                <StatCard label="Conversions" value="2" icon={<CheckCircle2 size={20} className="text-emerald-500" />} trend="1.6%" />
                <StatCard label="Gains en attente" value="0.00 $" icon={<DollarSign size={20} className="text-yellow-500" />} />
                <StatCard label="Gains payés" value="100.00 $" icon={<Gift size={20} className="text-pink-500" />} />
            </div>

            {/* LINKS TABLE */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Vos liens d'affiliation</h3>
                        <p className="text-slate-500 text-sm">Gérez vos liens et suivez leurs performances.</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Plus size={16} /> Nouveau lien
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Étiquette</th>
                                <th className="px-6 py-4">Lien de suivi</th>
                                <th className="px-6 py-4">Clics</th>
                                <th className="px-6 py-4">Gains</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {referralLinks.map((link) => (
                                <tr key={link.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{link.label}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md w-fit border border-slate-200 group cursor-pointer hover:border-blue-300 transition-colors"
                                            onClick={() => copyToClipboard(link.url)}>
                                            <span className="text-slate-600 font-mono text-xs truncate max-w-[200px]">{link.url}</span>
                                            <Copy size={12} className="text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{link.clicks}</td>
                                    <td className="px-6 py-4 text-emerald-600 font-bold">{link.earnings}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">
                                            {link.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <div className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center">•••</div>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StepCard: React.FC<{ step: string, title: string, desc: string, icon: React.ReactNode }> = ({ step, title, desc, icon }) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white select-none">{step}</div>
        <div className="mb-4 bg-slate-900/50 w-fit p-3 rounded-lg border border-white/10">{icon}</div>
        <h3 className="text-lg font-bold text-white mb-2 relative z-10">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed relative z-10">{desc}</p>
    </div>
);

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode, trend?: string }> = ({ label, value, icon, trend }) => (
    <div className="bg-[#0b101e] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:border-slate-600 transition-colors">
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">{icon}</div>
        <div>
            <div className="text-sm text-slate-500 font-medium">{label}</div>
            <div className="text-2xl font-black text-white flex items-center gap-2">
                {value}
                {trend && <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{trend}</span>}
            </div>
        </div>
    </div>
);
