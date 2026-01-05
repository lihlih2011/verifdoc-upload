import React, { useState } from 'react';
import {
    UserPlus,
    Shield,
    Mail,
    Trash2,
    CheckCircle2,
    Clock
} from 'lucide-react';

// MOCK DATA
const INITIAL_MEMBERS = [
    { id: 1, name: 'Alex Johnson', email: 'alex@company.com', role: 'Admin', status: 'active', consumption: 450, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Sarah Connor', email: 'sarah@company.com', role: 'Analyst', status: 'active', consumption: 120, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Mike Ross', email: 'mike@company.com', role: 'Analyst', status: 'pending', consumption: 0, avatar: null },
];

export const TeamView: React.FC = () => {
    const [members, setMembers] = useState(INITIAL_MEMBERS);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        const newMember = {
            id: Date.now(),
            name: newEmail.split('@')[0], // Placeholder name
            email: newEmail,
            role: 'Analyst',
            status: 'pending',
            consumption: 0,
            avatar: null
        };

        setMembers([...members, newMember]);
        setNewEmail('');
        setIsInviteOpen(false);
    };

    const handleRemove = (id: number) => {
        setMembers(members.filter(m => m.id !== id));
    };

    return (
        <div className="p-8 min-h-full animate-in fade-in duration-500 font-sans max-w-6xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Mon Équipe</h1>
                    <p className="text-slate-500">Gérez les accès et surveillez la consommation de vos collaborateurs.</p>
                </div>

                <button
                    onClick={() => setIsInviteOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2"
                >
                    <UserPlus size={18} /> Inviter un membre
                </button>
            </div>

            {/* INVITE BOX */}
            {isInviteOpen && (
                <div className="mb-8 bg-blue-50 border border-blue-100 p-6 rounded-2xl animate-in slide-in-from-top-4">
                    <h3 className="font-bold text-blue-900 mb-4">Inviter un nouveau collaborateur</h3>
                    <form onSubmit={handleInvite} className="flex gap-4">
                        <div className="flex-1 relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                            <input
                                type="email"
                                placeholder="adresse@email.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
                            Envoyer l'invitation
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsInviteOpen(false)}
                            className="text-slate-500 font-medium px-4 hover:bg-slate-100 rounded-xl"
                        >
                            Annuler
                        </button>
                    </form>
                </div>
            )}

            {/* MEMBERS LIST */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
                            <th className="p-6">Membre</th>
                            <th className="p-6">Rôle</th>
                            <th className="p-6">Statut</th>
                            <th className="p-6">Consommation</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {members.map((member) => (
                            <tr key={member.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
                                            {member.avatar ? (
                                                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-bold text-slate-500">{member.name[0]}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{member.name}</div>
                                            <div className="text-sm text-slate-500">{member.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${member.role === 'Admin'
                                        ? 'bg-purple-50 text-purple-700 border-purple-100'
                                        : 'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                        {member.role === 'Admin' && <Shield size={12} />}
                                        {member.role}
                                    </span>
                                </td>
                                <td className="p-6">
                                    {member.status === 'active' ? (
                                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                                            <CheckCircle2 size={16} /> Actif
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-amber-500 text-sm font-bold">
                                            <Clock size={16} /> Invitation envoyée
                                        </div>
                                    )}
                                </td>
                                <td className="p-6">
                                    <div className="text-sm font-medium text-slate-700">{member.consumption} crédits</div>
                                    <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${Math.min(100, (member.consumption / 1000) * 100)}%` }}
                                        ></div>
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <button
                                        onClick={() => handleRemove(member.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                                        title="Supprimer l'accès"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-center text-sm text-slate-400">
                L'ajout de membres supplémentaires peut entraîner des coûts additionnels selon votre forfait.
            </div>
        </div>
    );
};
