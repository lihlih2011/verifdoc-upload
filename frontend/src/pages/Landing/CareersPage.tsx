
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Database, Send, CheckCircle2, MapPin, Clock, ArrowRight, UploadCloud, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
    {
        id: 'data-scientist',
        title: 'Senior Data Scientist (Forensic AI)',
        department: 'R&D',
        location: 'Paris, France (Hybride)',
        type: 'CDI',
        salary: '65k€ - 85k€',
        tags: ['Python', 'PyTorch', 'Computer Vision', 'Document Analysis'],
        description: "Rejoignez l'équipe R&D pour développer des modèles de détection de fraude documentaire de nouvelle génération. Vous travaillerez sur des algorithmes de vision par ordinateur pour détecter les manipulations invisibles (ELA, métadonnées, incohérences de pixels)."
    },
    {
        id: 'devops-cloud',
        title: 'DevOps Engineer / SRE',
        department: 'Infrastructure',
        location: 'Remote / Paris',
        type: 'CDI',
        salary: '55k€ - 75k€',
        tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
        description: "Assurez la scalabilité et la sécurité de notre infrastructure cloud traitant des millions de documents sensibles. Vous serez responsable de l'automatisation des déploiements et de la conformité ISO 27001 de nos environnements."
    },
    {
        id: 'data-analyst',
        title: 'Data Analyst & Fraud Specialist',
        department: 'Operations',
        location: 'Paris, France',
        type: 'CDIl',
        salary: '45k€ - 60k€',
        tags: ['SQL', 'Tableau', 'Risk Analysis', 'Pattern Recognition'],
        description: "Analysez les tendances de fraude émergentes et aidez nos clients à paramétrer leurs règles de conformité. Vous ferez le lien entre les données techniques et les besoins métier pour améliorer nos taux de détection."
    }
];

const CareersPage = () => {
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => {
                setFormStatus('idle');
                setSelectedJob(null);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#020617] font-sans selection:bg-blue-500/30 text-slate-300">
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-10 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:block">VERIFDOC</span>
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">Retour</Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Recrutement
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                        Construisons la <span className="text-blue-500">confiance numérique</span>.
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        Rejoignez une équipe passionnée issue de la recherche (INEC) et travaillez sur des technologies de pointe pour lutter contre la fraude documentaire mondiale.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="#openings" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:scale-105">
                            Voir les offres <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </header>

            {/* JOBS LIST */}
            <section id="openings" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-white/5 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Postes Ouverts</h2>
                        <p className="text-slate-400">Rejoignez-nous à Paris ou en Remote.</p>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input type="text" placeholder="Rechercher un poste..." className="pl-10 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-full md:w-80 text-white placeholder-slate-600 transition-all" />
                    </div>
                </div>

                <div className="grid gap-6">
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900/30 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all group cursor-pointer shadow-lg hover:shadow-blue-500/5"
                            onClick={() => setSelectedJob(job.id)}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                        {job.id === 'data-scientist' && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider rounded border border-purple-500/30">Hot</span>}
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-sm text-slate-400 mb-6">
                                        <div className="flex items-center gap-2"><Briefcase size={16} className="text-blue-500" /> {job.department}</div>
                                        <div className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> {job.location}</div>
                                        <div className="flex items-center gap-2"><Clock size={16} className="text-orange-500" /> {job.type}</div>
                                        <div className="font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">{job.salary}</div>
                                    </div>

                                    <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed max-w-3xl">
                                        {job.description}
                                    </p>

                                    <div className="flex gap-2 flex-wrap">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 text-slate-300 text-xs rounded-full font-medium group-hover:border-white/10 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="shrink-0 self-center md:self-start mt-4 md:mt-0">
                                    <button className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all w-full md:w-auto hover:shadow-lg shadow-blue-500/20">
                                        Postuler
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* APPLICATION MODAL */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0f172a]/95 backdrop-blur z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Postuler</h2>
                                    <p className="text-slate-400 text-sm">Poste : <span className="text-blue-400">{jobs.find(j => j.id === selectedJob)?.title}</span></p>
                                </div>
                                <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                                    <div className="w-6 h-6 flex items-center justify-center">✕</div>
                                </button>
                            </div>

                            {formStatus === 'success' ? (
                                <div className="p-16 text-center">
                                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Candidature reçue !</h3>
                                    <p className="text-slate-400 max-w-sm mx-auto">Merci pour votre intérêt. Notre équipe RH (Béatrice) étudiera votre profil avec attention.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleApply} className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-300">Prénom</label>
                                            <input type="text" required className="w-full px-4 py-3 bg-[#1e293b] border border-white/5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white focus:bg-[#1e293b]" placeholder="Ex: Jean" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-300">Nom</label>
                                            <input type="text" required className="w-full px-4 py-3 bg-[#1e293b] border border-white/5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white focus:bg-[#1e293b]" placeholder="Ex: Dupont" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Email professionnel</label>
                                        <input type="email" required className="w-full px-4 py-3 bg-[#1e293b] border border-white/5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white focus:bg-[#1e293b]" placeholder="jean@portfolio.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">CV / Resume (PDF)</label>
                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                                            <UploadCloud className="mx-auto text-slate-500 group-hover:text-blue-400 mb-3 transition-colors" size={32} />
                                            <p className="text-sm text-slate-300 font-medium group-hover:text-white">Glissez votre CV ici ou cliquez pour parcourir</p>
                                            <p className="text-xs text-slate-500 mt-1">PDF uniquement (Max 10MB)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Motivation (Optionnel)</label>
                                        <textarea className="w-full px-4 py-3 bg-[#1e293b] border border-white/5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none h-32 text-white focus:bg-[#1e293b]" placeholder="Un petit mot pour nous convaincre..." />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:grayscale"
                                        >
                                            {formStatus === 'submitting' ? (
                                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Envoi sécurisé...</>
                                            ) : (
                                                <>Envoyer ma candidature <Send size={18} /></>
                                            )}
                                        </button>
                                        <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-wider">
                                            Données sécurisées & traitées confidentiellement en France
                                        </p>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CareersPage;
