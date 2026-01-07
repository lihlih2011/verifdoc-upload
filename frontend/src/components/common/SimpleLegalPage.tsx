import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface SimpleLegalPageProps {
    title: string;
    updateDate: string;
    content: React.ReactNode;
}

const SimpleLegalPage: React.FC<SimpleLegalPageProps> = ({ title, updateDate, content }) => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-600">
            {/* Navbar Simple */}
            <nav className="border-b border-slate-800 bg-[#020617]/90 backdrop-blur fixed w-full z-50">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
                            <ShieldCheck className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter uppercase">VERIFDOC</span>
                    </Link>
                    <Link to="/" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
                        <ArrowLeft size={14} /> Retour
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">{title}</h1>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-12">Dernière mise à jour : {updateDate}</p>

                <div className="prose prose-invert prose-blue max-w-none">
                    {content}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12 text-center text-[10px] text-slate-600 font-black uppercase tracking-widest">
                © 2026 VERIFDOC • TOUS DROITS RÉSERVÉS
            </footer>
        </div>
    );
};

export default SimpleLegalPage;
