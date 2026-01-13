import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2, Users, Globe, Briefcase, CheckCircle2,
    ArrowRight, ArrowLeft, ShieldCheck, Video, Calendar
} from 'lucide-react';

// --- TYPES ---
interface OnboardingData {
    // Step 1: Entreprise
    companyName: string;
    employees: string;
    sector: string;
    country: string;
    website: string;

    // Step 2: Identité
    firstName: string;
    lastName: string;
    role: string;
    phone: string;

    // Step 3: Besoins
    monthlyVolume: string;
    useCase: string; // KYC, Locataires, Fraude...

    // Step 4: Tech
    integration: string; // API, Platform, Both
}

export default function OnboardingWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<OnboardingData>({
        companyName: '',
        employees: '',
        sector: '',
        country: 'France',
        website: '',
        firstName: '',
        lastName: '',
        role: '',
        phone: '',
        monthlyVolume: '',
        useCase: '',
        integration: ''
    });

    const totalSteps = 5;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Final Submit
            setLoading(true);
            setTimeout(() => {
                // Simulation d'envoi API
                navigate('/dashboard');
            }, 1500);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const updateField = (field: keyof OnboardingData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- STEPS COMPONENTS ---

    const StepIndicator = () => (
        <div className="flex justify-between items-center mb-12 px-10">
            {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400'
                        }`}>
                        {step > s ? <CheckCircle2 size={20} /> : s}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-blue-700' : 'text-slate-400'}`}>
                        {s === 1 && "Entreprise"}
                        {s === 2 && "Expert"}
                        {s === 3 && "Volumétrie"}
                        {s === 4 && "Usage"}
                        {s === 5 && "Bienvenue"}
                    </span>
                </div>
            ))}
            {/* Progress Bar Background */}
            <div className="absolute top-10 left-0 w-full h-0.5 bg-slate-100 -z-0 hidden md:block" style={{ left: '50px', width: 'calc(100% - 100px)' }}></div>
            {/* Active Progress */}
            <div className="absolute top-10 left-0 h-0.5 bg-blue-600 transition-all duration-500 -z-0 hidden md:block"
                style={{ left: '50px', width: `calc(${(step - 1) / (totalSteps - 1)} * (100% - 100px))` }}></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* --- LEFT SIDE: FORM --- */}
            <div className="w-full lg:w-3/5 p-8 lg:p-16 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                    {/* Header */}
                    <div className="mb-10 text-center lg:text-left">
                        <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-10 mb-8 mx-auto lg:mx-0" />
                        <StepIndicator />
                    </div>

                    {/* DYNAMIC CONTENT */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">

                        {/* STEP 1: ENTREPRISE */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Parlez-nous de votre structure</h2>
                                <p className="text-slate-500 mb-8">Ces informations nous permettent de calibrer l'IA pour votre secteur.</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Nom de l'entreprise *</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                value={formData.companyName}
                                                onChange={(e) => updateField('companyName', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                placeholder="Ex: VerifDoc SAS"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Nombre d'employés *</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {['1-10', '11-50', '50-250', '250+'].map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => updateField('employees', opt)}
                                                    className={`py-3 px-4 rounded-xl border font-medium transition-all ${formData.employees === opt
                                                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                                                            : 'border-slate-200 hover:border-blue-300 text-slate-600'
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Site Web (Optionnel)</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                value={formData.website}
                                                onChange={(e) => updateField('website', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: EXPERT */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Qui pilotera le compte ?</h2>
                                <p className="text-slate-500 mb-8">Nous créons votre accès administrateur principal.</p>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Prénom</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Nom</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => updateField('lastName', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Fonction / Rôle</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => updateField('role', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white"
                                    >
                                        <option value="">Sélectionner...</option>
                                        <option value="ceo">CEO / Fondateur</option>
                                        <option value="cto">CTO / DSI</option>
                                        <option value="compliance">Responsable Conformité</option>
                                        <option value="risk">Gestionnaire de Risque</option>
                                        <option value="immo">Agent Immobilier</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: VOLUMETRIE */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Quels sont vos volumes ?</h2>
                                <p className="text-slate-500 mb-8">Pour optimiser l'infrastructure dédiée à votre compte.</p>

                                <div className="space-y-4">
                                    {[
                                        { val: '100', label: '< 100 documents / mois', desc: 'Idéal pour les petites agences' },
                                        { val: '1000', label: '100 - 1,000 documents / mois', desc: 'Pour les PME en croissance' },
                                        { val: '5000', label: '1,000 - 5,000 documents / mois', desc: 'Standard bancaire & assurance' },
                                        { val: 'plus', label: '5,000+ documents / mois', desc: 'Infrastructure dédiée requise' }
                                    ].map((opt) => (
                                        <div
                                            key={opt.val}
                                            onClick={() => updateField('monthlyVolume', opt.val)}
                                            className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between group transition-all ${formData.monthlyVolume === opt.val
                                                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                                                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-bold ${formData.monthlyVolume === opt.val ? 'text-blue-900' : 'text-slate-700'}`}>{opt.label}</div>
                                                <div className="text-xs text-slate-500">{opt.desc}</div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.monthlyVolume === opt.val ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                                }`}>
                                                {formData.monthlyVolume === opt.val && <CheckCircle2 size={12} className="text-white" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: USAGE (TECH) */}
                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Mode d'intégration</h2>
                                <p className="text-slate-500 mb-8">Comment souhaitez-vous utiliser VerifDoc ?</p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div
                                        onClick={() => updateField('integration', 'platform')}
                                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.integration === 'platform' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-600">
                                            <Briefcase size={24} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2">Plateforme SaaS</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            Interface web clé en main. Glisser-déposer vos dossiers, visualisez les résultats. Sans code.
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => updateField('integration', 'api')}
                                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.integration === 'api' ? 'border-purple-600 bg-purple-50' : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-purple-600">
                                            <Code2 size={24} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2">API Intégration</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            Connectez VerifDoc directement à votre ERP, CRM ou site web. Documentation complète.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: FINAL (BIENVENUE) */}
                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Tout est prêt !</h2>
                                <p className="text-slate-500 max-w-md mx-auto mb-8">
                                    Votre environnement sécurisé VerifDoc a été configuré selon vos spécifications <strong className="text-slate-700">{formData.companyName}</strong>.
                                </p>

                                <div className="bg-slate-50 rounded-xl p-6 max-w-sm mx-auto mb-8 text-left space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Plan activé</span>
                                        <span className="font-bold text-slate-800">Essai Gratuit 14 jours</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Utilisateur</span>
                                        <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Support</span>
                                        <span className="font-bold text-green-600">Prioritaire 24/7</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* FOOTER NAVIGATION */}
                    <div className="mt-8 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            className={`flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors ${step === 1 || step === 5 ? 'invisible' : ''}`}
                        >
                            <ArrowLeft size={18} /> Précédent
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            {loading ? "Configuration..." : (step === totalSteps ? "Accéder au Dashboard" : "Suivant")}
                            {!loading && step < totalSteps && <ArrowRight size={18} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* --- RIGHT SIDE: MARKETING PANEL (Blue/Purple) --- */}
            <div className="hidden lg:flex w-2/5 bg-[#4F46E5] relative overflow-hidden flex-col justify-center p-12 text-white">
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 max-w-md mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Participez à une réunion vidéo de 15 minutes avec notre équipe.</h2>
                    <p className="text-indigo-100 leading-relaxed mb-12">
                        Nous vous recommandons vivement de participer à une réunion vidéo rapide.
                        Nous vous présenterons les points forts de notre solution et personnaliserons la configuration en fonction de vos documents spécifiques.
                    </p>

                    {/* Booking Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-900">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                            <Video size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Bénéficiez de conseils personnalisés</h3>
                        <p className="text-slate-500 text-sm mb-6">
                            Nous serions ravis de vous rencontrer. Réservez un appel vidéo rapide pour voir l'outil en action.
                        </p>
                        <button className="w-full bg-[#3444bc] hover:bg-[#2c3a9e] text-white py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                            <Calendar size={16} />
                            Réserver une réunion de 15 minutes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon helper
import { Code2 } from 'lucide-react';
