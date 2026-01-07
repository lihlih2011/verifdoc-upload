
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
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-10 w-auto" />
                        <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">VERIFDOC</span>
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Retour</Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="pt-32 pb-20 px-6 bg-[#020617] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Recrutement
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Construisons la <span className="text-blue-500">confiance numérique</span>.
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        Rejoignez une équipe passionnée issue de la recherche (INEC) et travaillez sur des technologies de pointe pour lutter contre la fraude documentaire mondiale.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="#openings" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center gap-2">
                            Voir les offres <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </header>

            {/* JOBS LIST */}
            <section id="openings" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Postes Ouverts</h2>
                        <p className="text-slate-500">Rejoignez-nous à Paris ou en Remote.</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Rechercher un poste..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64" />
                    </div>
                </div>

                <div className="grid gap-6">
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                            onClick={() => setSelectedJob(job.id)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                                        <div className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</div>
                                        <div className="flex items-center gap-1"><MapPin size={14} /> {job.location}</div>
                                        <div className="flex items-center gap-1"><Clock size={14} /> {job.type}</div>
                                        <div className="font-semibold text-slate-700">{job.salary}</div>
                                    </div>
                                    <p className="text-slate-600 mb-4 line-clamp-2">
                                        {job.description}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg group-hover:bg-blue-600 transition-colors w-full md:w-auto">
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Postuler</h2>
                                    <p className="text-slate-500 text-sm">Poste : {jobs.find(j => j.id === selectedJob)?.title}</p>
                                </div>
                                <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <div className="w-6 h-6 flex items-center justify-center text-slate-500">✕</div>
                                </button>
                            </div>

                            {formStatus === 'success' ? (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Candidature envoyée !</h3>
                                    <p className="text-slate-500">Merci pour votre intérêt. Notre équipe RH (Béatrice) reviendra vers vous sous 48h.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleApply} className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Prénom</label>
                                            <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jean" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Nom</label>
                                            <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Dupont" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email</label>
                                        <input type="email" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jean.dupont@exemple.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">CV / Resume (PDF)</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                            <UploadCloud className="mx-auto text-slate-400 mb-2" />
                                            <p className="text-sm text-slate-600 font-medium">Cliquez pour upload votre CV</p>
                                            <p className="text-xs text-slate-400">PDF, DOCX jusqu'à 10MB</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Motivation (Optionnel)</label>
                                        <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Dites-nous pourquoi vous êtes la bonne personne..." />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {formStatus === 'submitting' ? (
                                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Envoi en cours...</>
                                            ) : (
                                                <>Envoyer ma candidature <Send size={18} /></>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-slate-400 mt-4">
                                            En postulant, vous acceptez notre politique de confidentialité des données RH.
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
