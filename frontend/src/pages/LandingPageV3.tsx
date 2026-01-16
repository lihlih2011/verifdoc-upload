import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    ShieldCheck,
    Zap,
    Globe,
    ArrowRight,
    FileCheck,
    Lock,
    Building2,
    Home,
    Users,
    Scale,
    FileSpreadsheet,
    Car,
    Landmark,
    ShoppingBag,
    Briefcase,
    ScrollText,
    TrendingDown,
    AlertTriangle,
    UserX,
    Check,
    ShieldAlert,
    ScanLine
} from 'lucide-react';
import { motion } from 'framer-motion';
import UploadSimulator from '../components/landing/demo/UploadSimulator';
import DocumentScroller from '../components/landing/demo/DocumentScroller';
import LiveStats from '../components/landing/LiveStats';
import ComparisonSlider from '../components/landing/demo/ComparisonSlider';
import { PublicFooter } from '../layout/PublicFooter';

// --- COMPONENTS ---

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
        </p>
    </div>
);

export default function LandingPageV3() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300">
            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-semibold mb-8 border border-blue-100 dark:border-blue-800">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Nouvelle IA de Détection v2.0 Disponible
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.1]">
                            Sécurisez vos dossiers <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                en un clin d'œil.
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                            Décelez les faux documents (fiches de paie, avis d'impôts, RIB) instantanément grâce à notre IA forensique. Protégez votre entreprise contre la fraude documentaire.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                                Essai Gratuit
                            </Link>
                            <Link to="/demo" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                Voir la démo
                            </Link>
                        </div>

                        <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 block" />
                                ))}
                            </div>
                            <div>Approuvé par +500 experts.</div>
                        </div>
                    </motion.div>

                    {/* Right: Interactive Simulator & Scroller */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:flex flex-col gap-8"
                    >
                        {/* Decorative Blobs */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl -z-10"></div>

                        {/* 1. DOCUMENT SCROLLER (Top - Live Feed) */}
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">Flux d'analyse temps réel</span>
                            </div>
                            <DocumentScroller />
                        </div>

                        {/* 2. UPLOAD SIMULATOR (Bottom) */}
                        <UploadSimulator />
                    </motion.div>

                </div>
            </section>

            {/* --- LIVE STATS --- */}
            <LiveStats />

            {/* --- TRUST LOGOS --- */}
            <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-mono text-slate-500 mb-8 uppercase tracking-widest">ILS SÉCURISENT LEURS DOCUMENTS AVEC NOUS</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity">
                        <div className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Globe size={24} /> GlobalBank</div>
                        <div className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Building2 size={24} /> ImmoTrust</div>
                        <div className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><ShieldCheck size={24} /> SecurePay</div>
                        <div className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Lock size={24} /> CyberGuard</div>
                    </div>
                </div>
            </section>

            {/* --- USE CASES: FEAR VS REASSURANCE --- */}
            <section className="py-24 bg-slate-900 relative overflow-hidden text-white">
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-red-600/10 blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold mb-6 tracking-wide uppercase border border-red-500/20">
                            <AlertTriangle size={14} /> RISQUES CRITIQUES
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
                            La fraude documentaire <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">tue votre rentabilité</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Chaque faux document accepté est une bombe à retardement pour votre entreprise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* CARD 1: FINANCIAL */}
                        <div className="group relative h-[450px] rounded-3xl perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/5 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-slate-800 group-hover:border-blue-500/30">
                                {/* STATE A: FEAR */}
                                <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-0 delay-100">
                                    <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                                        <TrendingDown size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Pertes Financières</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        Un dossier de crédit frauduleux coûte en moyenne <strong className="text-red-400">25 000€</strong> de pertes sèches irrécouvrables.
                                    </p>
                                    <div className="flex items-center gap-2 text-red-400 text-sm font-bold font-mono">
                                        <ShieldCheck size={16} /> RISQUE: ÉLEVÉ
                                    </div>
                                </div>

                                {/* STATE B: REASSURANCE */}
                                <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">Protection Totale</h3>
                                    <p className="text-blue-100 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        Détectez les incohérences bancaires avant le virement des fonds.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: LEGAL */}
                        <div className="group relative h-[450px] rounded-3xl perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/5 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-slate-800 group-hover:border-blue-500/30">
                                {/* STATE A: FEAR */}
                                <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-0 delay-100">
                                    <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                                        <Scale size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Risques Légaux</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        Le manquement aux obligations LCB-FT peut entraîner des amendes jusqu'à <strong className="text-orange-400">5M €</strong>.
                                    </p>
                                    <div className="flex items-center gap-2 text-orange-400 text-sm font-bold font-mono">
                                        <AlertTriangle size={16} /> PENALITÉS
                                    </div>
                                </div>

                                {/* STATE B: REASSURANCE */}
                                <div className="absolute inset-0 bg-indigo-900/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="w-16 h-16 bg-white text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <FileCheck size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">Conformité Assurée</h3>
                                    <p className="text-indigo-100 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        Rapports de preuve certifiés pour chaque audit réglementaire.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: REPUTATION */}
                        <div className="group relative h-[450px] rounded-3xl perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/5 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-slate-800 group-hover:border-blue-500/30">
                                {/* STATE A: FEAR */}
                                <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-0 delay-100">
                                    <div className="w-14 h-14 bg-pink-500/10 text-pink-500 rounded-2xl flex items-center justify-center mb-6">
                                        <UserX size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Réputation</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        Une seule affaire de fraude médiatisée brise la confiance de vos clients pour <strong className="text-pink-400">toujours</strong>.
                                    </p>
                                    <div className="flex items-center gap-2 text-pink-400 text-sm font-bold font-mono">
                                        <Lock size={16} /> IMAGE DE MARQUE
                                    </div>
                                </div>

                                {/* STATE B: REASSURANCE */}
                                <div className="absolute inset-0 bg-emerald-900/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Users size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">Confiance Restaurée</h3>
                                    <p className="text-emerald-100 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        Montrez à vos clients que leur sécurité est votre priorité absolue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section id="features" className="py-24 bg-slate-50 dark:bg-[#0b1121]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Pourquoi VerifDoc ?</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Une suite complète d'outils pour automatiser la vérification documentaire et réduire la fraude de 90%.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Analyse Forensique"
                            description="Détection microscopique des altérations, copier-coller et modifications de métadonnées invisibles à l'œil nu."
                        />
                        <FeatureCard
                            icon={FileCheck}
                            title="Conformité KYC/KYB"
                            description="Vérification automatique des pièces d'identité (CNI, Passeport) et documents d'entreprise (Kbis, RIB)."
                        />
                        <FeatureCard
                            icon={Lock}
                            title="Sécurité Bancaire"
                            description="Vos données sont chiffrées de bout en bout et hébergées sur des serveurs souverains sécurisés (SecNumCloud)."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="API Temps Réel"
                            description="Intégrez notre moteur de détection directement dans vos parcours d'onboarding en moins de 100ms."
                        />
                        <FeatureCard
                            icon={Globe}
                            title="Support Multi-Pays"
                            description="Analyse de documents provenant de plus de 150 pays avec support des caractères internationaux."
                        />
                        <FeatureCard
                            icon={CheckCircle2}
                            title="Preuve Opposable"
                            description="Générez un rapport de preuve certifié et horodaté pour chaque analyse, utilisable en cas de litige."
                        />
                    </div>
                </div>
            </section>

            {/* --- SOLUTION SECTION (V2 Port) --- */}
            <section className="py-24 bg-[#020617] relative border-y border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">NOTRE MISSION</span>
                        <h2 className="text-4xl font-bold mb-6 text-white">Démocratiser la sécurité documentaire</h2>
                        <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                            Jusqu'à présent, seules les grandes banques avaient accès aux outils forensiques de pointe. Nous changeons la donne.
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            VerifDoc met l'intelligence artificielle au service de toutes les entreprises pour stopper la fraude à la source.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-600/20 transition-all"></div>

                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="p-2 bg-blue-600 rounded-lg"><Users size={20} className="text-white" /></span>
                            PME & ETI : Vous n'êtes plus seuls.
                        </h3>
                        <p className="text-lg text-slate-300 font-medium leading-relaxed mb-6">
                            La fraude documentaire ne cible pas que les géants. <br />
                            <span className="text-blue-400">80% des attaques</span> visent désormais les entreprises de taille intermédiaire, souvent moins protégées.
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-blue-500 pl-4 italic">
                            "Nous avons démocratisé la technologie des grandes banques pour vous offrir une forteresse numérique, accessible et immédiate. Concentrez-vous sur votre croissance, nous gardons la porte."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- COMPARISON SLIDER SECTION --- */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 tracking-wide uppercase border border-blue-500/20">
                            <Zap size={14} /> DÉTECTION INSTANTANÉE
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            L'invisible devient <span className="text-blue-500">visible</span>.
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Notre IA compare chaque pixel du document original avec des milliers de modèles connus pour révéler les moindres anomalies invisibles à l'œil nu.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Détection des retouches Photoshop",
                                "Analyse des métadonnées (EXIF, XMP)",
                                "Vérification des polices et alignements",
                                "Croisement des données (SIRET, IBAN)"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Check size={14} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-xl rounded-2xl"></div>
                        <ComparisonSlider />
                    </div>
                </div>
            </section>

            {/* --- SECTORS USE CASES (V2 12-Grid Port) --- */}
            <section id="sectors" className="py-24 bg-white dark:bg-[#0b1121] relative">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-slate-50 dark:bg-slate-900/50 -skew-y-3 origin-top-left -z-10"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold mb-6 tracking-wide uppercase">
                            INDUSTRIES
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            Une protection sur mesure <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">pour votre secteur</span>
                        </h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
                            Découvrez comment VerifDoc s'adapte aux spécificités de votre métier.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Building2 size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Banque</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Détectez les faux bilans et relevés bancaires instantanément.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Immobilier</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Devenez l'agence la plus sûre. Éliminez les dossiers locataires falsifiés.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Recrutement</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Vérifiez diplômes et CV automatiquement pour vos clients exigeants.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-pink-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Scale size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Juridique</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Analysez pièces d'identité et Kbis pour une conformité totale.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-orange-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fintech</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Onboarding client (KYC) ultra-rapide par API en temps réel.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ShieldAlert size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Assurance</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Détectez les faux constats et factures lors des déclarations de sinistre.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileSpreadsheet size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Comptabilité</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Auditez 100% de vos factures et notes de frais.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Car size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Location</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Validez permis et justificatifs pour éviter vols et impayés.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ScrollText size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Notariat</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Protégez vos actes authentiques contre l'usurpation d'identité.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-800/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-blue-800 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Landmark size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Secteur Public</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Assurez-vous que chaque prestation sociale va au bon bénéficiaire.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-yellow-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Marketplaces</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Vérifiez vos vendeurs à l'échelle (KYB) pour une plateforme de confiance.</p>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700">
                            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Briefcase size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Intérim</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Validez des milliers de documents candidats par heure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-24 bg-slate-50 dark:bg-[#0b1121]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                            Approuvé par des entreprises <br />
                            <span className="text-blue-600 dark:text-blue-400">du monde entier</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                            Écoutez nos clients qui comptent sur VerifDoc pour vérifier leurs documents importants.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 1 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all flex flex-col">
                            <div className="mb-6 flex-1">
                                <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed text-sm">
                                    "Dans le cadre de nos missions de conseil et d'ingénierie numérique, la fiabilité documentaire est un enjeu majeur. <strong className="text-slate-900 dark:text-white font-semibold">VerifDoc</strong> nous a permis d'automatiser des Contrôles complexes et d'identifier des anomalies critiques sur des documents contractuels et techniques. La plateforme s'intègre parfaitement dans un environnement professionnel exigeant."
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <img src="https://i.pravatar.cc/150?u=Benmouloud" alt="Benmouloud MR" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">Benmouloud MR</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Directeur des Opérations</div>
                                    <div className="text-xs text-slate-500">COE NUMIDIT</div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all flex flex-col">
                            <div className="mb-6 flex-1">
                                <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed text-sm">
                                    "Dans le cadre de dossiers complexes, la capacité de VerifDoc à analyser les documents est essentielle. Lorsqu'on doit prouver l'intégrité d'un contrat ou d'un acte, la plateforme permet de détecter des altérations qui pourraient avoir des conséquences juridiques importantes. C'est un outil indispensable dans notre gestion des litiges."
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <img src="https://i.pravatar.cc/150?u=Benbraham" alt="Me Benbraham" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">Me Benbraham</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Avocat</div>
                                    <div className="text-xs text-slate-500">Cabinet de Me Benbraham</div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all flex flex-col">
                            <div className="mb-6 flex-1">
                                <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed text-sm">
                                    "Dans le secteur de la gestion immobilière, la vérification des documents est essentielle pour sécuriser les transactions. VerifDoc nous aide à contrôler rapidement des actes, contrats et pièces administratives tout en spécifiant les risques liés aux documents falsifiés. C'est une solution fiable, adaptée aux exigences du marché."
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <img src="https://i.pravatar.cc/150?u=KACI" alt="KACI M." className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">KACI M.</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Gestion de biens</div>
                                    <div className="text-xs text-slate-500">GROUPE KACI IMMOBILIER</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS (STEPS) --- */}
            <section id="how-it-works" className="py-24 bg-white dark:bg-[#020617]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Fonctionnement Simplifié</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Intégrez la détection de fraude dans vos processus métiers en 3 étapes simples.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 dark:from-blue-900 dark:to-blue-900 z-0"></div>

                        {/* Step 1 */}
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white dark:bg-[#0b1121] border-4 border-blue-100 dark:border-blue-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 shadow-sm">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Importation</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Chargez vos documents (PDF, JPG, PNG) via notre API sécurisée ou l'interface web par simple glisser-déposer.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white dark:bg-[#0b1121] border-4 border-blue-100 dark:border-blue-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 shadow-sm">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyse IA</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Nos algorithmes scannent +50 points de contrôle : métadonnées, compression, polices et incohérences visuelles.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white dark:bg-[#0b1121] border-4 border-blue-100 dark:border-blue-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 shadow-sm">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Décision</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Recevez un score de risque immédiat et un rapport de preuve certifié pour accepter ou rejeter le dossier.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING (V2 Port: Credit Packs) --- */}
            <section id="pricing" className="py-24 bg-[#020617] relative overflow-hidden text-white">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">
                            <Landmark size={12} /> Pay as you go
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Tarifs Simples. <span className="text-blue-500">Sans Engagement.</span></h2>
                        <p className="text-slate-400 text-sm max-w-2xl mx-auto">Achetez des packs de vérifications valables à vie. Pas d'abonnement caché.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        {/* 1. ESSENTIEL */}
                        <div className="group bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/5">
                            <div className="mb-4">
                                <h3 className="text-white font-bold text-lg">Essentiel</h3>
                                <p className="text-slate-500 text-xs mt-1">Petites équipes.</p>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">1.99€</span>
                                    <span className="text-slate-500 text-sm font-medium">/ scan</span>
                                </div>
                                <p className="text-slate-500 text-xs mt-1">Pack 199€ (100 crédits)</p>
                            </div>
                            <div className="space-y-2 mb-6 text-xs text-slate-400">
                                <div className="flex gap-2 items-center"><Check size={14} className="text-blue-500" /> <span className="text-white font-bold">100 crédits</span></div>
                                <div className="flex gap-2 items-center"><Check size={14} className="text-slate-500" /> Analyse de cohérence simple</div>
                                <div className="flex gap-2 items-center"><Check size={14} className="text-slate-500" /> Vérif. Signature (Basique)</div>
                                <div className="flex gap-2 items-center"><Check size={14} className="text-slate-500" /> Support Email</div>
                            </div>
                            <Link to="/signup?plan=essentiel" className="block w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold text-center rounded-lg transition-colors border border-white/5">
                                Acheter Pack
                            </Link>
                        </div>

                        {/* 2. PRO (Mis en avant) */}
                        <div className="relative group bg-slate-900/80 backdrop-blur-md border border-blue-500/40 rounded-2xl p-6 transition-all shadow-xl shadow-blue-900/20 lg:-mt-4 lg:mb-4 lg:z-10 bg-gradient-to-b from-blue-900/10 to-transparent">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[9px] font-bold rounded-full tracking-wider uppercase shadow-lg">
                                Recommandé
                            </div>
                            <div className="mb-4">
                                <h3 className="text-white font-bold text-xl">Pro</h3>
                                <p className="text-blue-200/60 text-xs mt-1">Agences & PME.</p>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">0.49€</span>
                                    <span className="text-slate-400 text-sm font-medium">/ scan</span>
                                </div>
                                <p className="text-blue-200/60 text-xs mt-1">Pack 499€ (1 000 crédits)</p>
                            </div>
                            <div className="space-y-3 mb-8 text-xs text-slate-300">
                                <div className="flex gap-2 items-center"><CheckCircle2 size={14} className="text-blue-400" /> <span className="text-white font-bold">1 000 crédits</span></div>
                                <div className="flex gap-2 items-center"><ShieldCheck size={14} className="text-blue-400" /> <span className="font-semibold text-blue-100">Base Fraudes (200k+ modèles)</span></div>
                                <div className="flex gap-2 items-center"><CheckCircle2 size={14} className="text-blue-400" /> Détection Docs Manipulés</div>
                                <div className="flex gap-2 items-center"><CheckCircle2 size={14} className="text-blue-400" /> Rapports Certifiés + QR</div>
                            </div>
                            <Link to="/signup?plan=pro" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-blue-500/25">
                                Choisir ce pack
                            </Link>
                        </div>

                        {/* 3. FORENSIQUE */}
                        <div className="group bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                            <div className="mb-4">
                                <h3 className="text-white font-bold text-lg">Forensique</h3>
                                <p className="text-slate-500 text-xs mt-1">Experts & Finance.</p>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">0.19€</span>
                                    <span className="text-slate-500 text-sm font-medium">/ scan</span>
                                </div>
                                <p className="text-slate-500 text-xs mt-1">Pack 999€ (5 000 crédits)</p>
                            </div>
                            <div className="space-y-2 mb-6 text-xs text-slate-400">
                                <div className="flex gap-2 items-center"><Check size={14} className="text-purple-500" /> <span className="text-white font-bold">5 000 crédits</span></div>
                                <div className="flex gap-2 items-center"><ScanLine size={14} className="text-purple-500" /> Analyse Spectrale & Pixels</div>
                                <div className="flex gap-2 items-center"><AlertTriangle size={14} className="text-purple-500" /> Détection Deepfakes Avancée</div>
                                <div className="flex gap-2 items-center"><Check size={14} className="text-slate-500" /> Webhooks & API Full</div>
                            </div>
                            <Link to="/signup?plan=forensic" className="block w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold text-center rounded-lg transition-colors border border-white/5">
                                Contacter Sales
                            </Link>
                        </div>

                        {/* 4. ENTERPRISE */}
                        <div className="group bg-slate-950 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
                            <div className="mb-4">
                                <h3 className="text-white font-bold text-lg">Enterprise</h3>
                                <p className="text-slate-500 text-xs mt-1">Grands Comptes.</p>
                            </div>
                            <div className="mb-4">
                                <span className="text-xl font-bold text-white">Sur Mesure</span>
                            </div>
                            <div className="space-y-2 mb-6 text-xs text-slate-400">
                                <div className="flex gap-2 items-center"><Check size={14} className="text-emerald-500" /> Volume Illimité</div>
                                <div className="flex gap-2 items-center"><Check size={14} className="text-emerald-500" /> Détection Contenu IA Générative</div>
                                <div className="flex gap-2 items-center"><Check size={14} className="text-emerald-500" /> SLA & On-Premise</div>
                            </div>
                            <Link to="/contact" className="block w-full py-2.5 bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-400 text-xs font-bold text-center rounded-lg transition-colors border border-emerald-500/20">
                                Devis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR HISTORY (V2 Port) --- */}
            <section className="py-24 bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                            <img
                                src="/images/team_verifdoc.jpg"
                                alt="L'équipe VerifDoc en 2018"
                                className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px] grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                                Fondateurs de VerifDoc, Paris 2018
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                                NOTRE HISTOIRE
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                Du garage aux grands comptes
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                <p>
                                    <strong className="text-slate-900 dark:text-white">Tout a commencé</strong> quand nous avons réalisé la fragilité du système bancaire face aux documents photoshopés.
                                </p>
                                <p>
                                    Aujourd'hui, nous analysons des millions de documents par an pour protéger l'économie réelle.
                                </p>
                                <p>
                                    Notre mission reste inchangée : restaurer la confiance numérique, un document à la fois.
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Partenaire Officiel</div>
                                <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
                                <div className="text-slate-500 dark:text-slate-400 font-serif italic text-lg">Ministère de l'Économie</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 bg-white dark:bg-[#020617]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        Prêt à sécuriser vos dossiers ?
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                        Rejoignez plus de 500 entreprises qui font confiance à VerifDoc pour leur conformité.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                        Demander une démonstration <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <PublicFooter />

        </div >
    );
}
