import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UploadCloud, CheckCircle2, Check, Loader2, ShieldAlert, MousePointer2 } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function UploadSimulator() {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
    const [isChecked, setIsChecked] = useState(false);
    const [currentDocIndex, setCurrentDocIndex] = useState(0);

    const docs = [
        {
            name: 'attestation_caf_rsa_2022.pdf',
            size: '450 KB',
            type: t('simulator_demo.types.caf'),
            score: '99.5%',
            alert: t('simulator_demo.alerts.caf'),
            zone: t('simulator_demo.zones.rsa'),
            color: 'red',
            coords: { top: '42%', left: '60%', w: '25%', h: '4%' },
            image: '/images/demo/demo_caf.png'
        },
        {
            name: 'indemnites_cpam_2024.pdf',
            size: '890 KB',
            type: t('simulator_demo.types.cpam'),
            score: '96.2%',
            alert: t('simulator_demo.alerts.cpam'),
            zone: t('simulator_demo.zones.period'),
            color: 'orange',
            coords: { top: '25%', left: '55%', w: '30%', h: '3%' },
            image: '/images/demo/demo_cpam.jpg'
        },
        {
            name: 'bulletin_paie_mars_2020.pdf',
            size: '1.4 MB',
            type: t('simulator_demo.types.paie'),
            score: '99.8%',
            alert: t('simulator_demo.alerts.paie'),
            zone: t('simulator_demo.zones.net'),
            color: 'red',
            coords: { top: '75%', left: '50%', w: '15%', h: '3%' },
            image: '/images/demo/demo_paie.png'
        },
        {
            name: 'avis_impot_2021.pdf',
            size: '890 KB',
            type: t('simulator_demo.types.impot'),
            score: '99.9%',
            alert: t('simulator_demo.alerts.2d_doc'),
            zone: t('simulator_demo.zones.cachet'),
            color: 'red',
            coords: { top: '15%', left: '10%', w: '25%', h: '15%' },
            image: '/images/demo/demo_impot.jpg'
        },
    ];

    const currentDoc = docs[currentDocIndex];

    const colorClasses = {
        red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', bg_full: 'bg-red-500' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', bg_full: 'bg-orange-500' }
    };

    const currentColors = colorClasses[currentDoc.color as keyof typeof colorClasses] || colorClasses.red;

    useEffect(() => {
        const runSimulation = async () => {
            const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

            while (true) {
                // RESET
                setStep(0);
                setIsChecked(false);
                setCursorPos({ x: 110, y: 110 });
                await wait(1000);

                // 1. Move Cursor to File
                setCursorPos({ x: 90, y: 20 });
                await wait(500);
                setStep(1);
                setCursorPos({ x: 50, y: 40 });
                await wait(1000);

                // 2. Drop File
                setStep(2);
                await wait(500);

                // 3. Move to Checkbox
                setCursorPos({ x: 15, y: 65 });
                await wait(800);
                setIsChecked(true);
                await wait(300);

                // 4. Move to Button
                setCursorPos({ x: 50, y: 85 });
                await wait(800);

                // 5. Click Verify
                setStep(3); // SCANNING
                await wait(2500);

                // 6. Transition to Dashboard
                setStep(4); // REVEAL
                setCursorPos({ x: 80, y: 10 });
                await wait(4000); // READ TIME

                // 7. Next Document
                setCurrentDocIndex(prev => (prev + 1) % docs.length);
                await wait(500);
            }
        };
        runSimulation();
    }, []);

    return (
        <div className="relative w-full max-w-sm mx-auto perspective-1000">
            {/* MOUSE CURSOR */}
            <motion.div
                className="absolute z-50 pointer-events-none drop-shadow-2xl"
                animate={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <MousePointer2 className="fill-blue-600 text-white w-6 h-6" />
            </motion.div>

            {/* MAIN CARD */}
            <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[380px]">

                {/* UPLOAD FORM */}
                <AnimatePresence mode="wait">
                    {step < 4 && (
                        <motion.div
                            key="upload-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                            className="p-6 h-full flex flex-col items-center text-center"
                        >
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Vérificateur IA</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Glissez votre document pour l'analyser</p>

                            <div className={cn(
                                "w-full border-2 border-dashed rounded-lg p-6 mb-4 transition-all duration-300 flex flex-col items-center justify-center gap-2",
                                step >= 1 ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                            )}>
                                {step >= 2 ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 px-3 py-2 rounded shadow-sm w-full">
                                        <div className="w-8 h-8 bg-red-100 text-red-500 rounded flex items-center justify-center"><FileText size={16} /></div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="font-bold text-xs truncate">{currentDoc.name}</div>
                                            <div className="text-[10px] text-slate-400">{currentDoc.size}</div>
                                        </div>
                                        <CheckCircle2 className="text-emerald-500" size={16} />
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="w-10 h-10 bg-blue-100/50 text-blue-600 rounded-full flex items-center justify-center mb-1 animate-bounce">
                                            <UploadCloud size={20} />
                                        </div>
                                        <div className="text-xs text-slate-400">PDF, PNG, JPG (max 25MB)</div>
                                    </>
                                )}
                            </div>

                            <div className="w-full flex items-center gap-2 mb-4 px-2">
                                <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0", isChecked ? "bg-blue-600 border-blue-600" : "border-slate-300 dark:border-slate-600")}>
                                    {isChecked && <Check size={10} className="text-white" />}
                                </div>
                                <div className="text-left text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                                    J'accepte les <span className="text-blue-600 underline">CGU</span>.
                                </div>
                            </div>

                            <button className={cn("w-full py-3 rounded-lg font-bold text-sm text-white transition-all shadow-lg flex items-center justify-center gap-2", step === 3 ? "bg-slate-800 scale-95" : "bg-blue-600")}>
                                {step === 3 ? <><Loader2 className="animate-spin" size={16} /> Analyse...</> : "Vérifier gratuitement"}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SCANNING STATE */}
                <AnimatePresence mode="wait">
                    {step === 3 && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6"
                        >
                            <div className="relative w-48 h-64 bg-slate-800 rounded border border-slate-600 overflow-hidden mb-4 ring-1 ring-white/10">
                                <img src={currentDoc.image} alt="Scan" className="w-full h-full object-cover opacity-90" />
                                <motion.div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-20" animate={{ top: ["0%", "100%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest">
                                <Loader2 className="animate-spin" size={12} /> Analyse IA
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DASHBOARD PREVIEW STATE */}
                <AnimatePresence>
                    {step >= 4 && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 bg-slate-50 dark:bg-slate-900 flex flex-col font-sans"
                        >
                            <div className="bg-[#0f172a] text-white px-3 py-2 flex items-center justify-between shadow-sm z-10 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center font-bold text-[10px]">V</div>
                                    <span className="font-bold text-[10px] tracking-wide opacity-80">VERIFDOC</span>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[9px] text-slate-400 uppercase font-bold">Rapport #AN-{100 + currentDocIndex}</div>
                                        <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                                            <FileText size={12} className="text-slate-400" /> {currentDoc.name}
                                        </h3>
                                    </div>
                                    <div className={cn("px-1.5 py-0.5 rounded text-[9px] font-black border flex items-center gap-1", currentColors.bg, currentColors.text, currentColors.border)}>
                                        <ShieldAlert size={8} /> {currentDoc.alert.toUpperCase()}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <div className="text-[9px] text-slate-400 font-medium mb-1">Score de Risque</div>
                                    <div className={cn("text-xl font-black tracking-tight", currentColors.text)}>{currentDoc.score}</div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: currentDoc.score }} transition={{ duration: 0.8 }} className={cn("h-full", currentColors.bg_full)} />
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50 flex items-start gap-2">
                                    <div className="mt-0.5"><ShieldAlert size={14} className="text-red-500" /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-red-700 dark:text-red-400">Anomalie Critique Détectée</div>
                                        <p className="text-[9px] text-red-600 dark:text-red-300 leading-relaxed mt-0.5">
                                            Zone falsifiée : <strong>{currentDoc.zone}</strong>. Les métadonnées indiquent une modification logicielle récente.
                                        </p>
                                    </div>
                                </div>

                                <Link to="/register" className="mt-auto w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                                    Détecter mes faux documents <MousePointer2 size={10} />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* LIVE DOCUMENT QUEUE */}
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">Flux d'analyse en direct</span>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/5 p-2 grid grid-cols-2 gap-2">
                    {docs.map((doc, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative flex items-center gap-3 p-2 rounded-lg transition-all duration-500 overflow-hidden",
                                index === currentDocIndex
                                    ? "bg-blue-500/10 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] translate-x-1"
                                    : "opacity-40 grayscale hover:opacity-60"
                            )}
                        >
                            {/* ACTIVE SCAN EFFECT */}
                            {index === currentDocIndex && (
                                <>
                                    <motion.div
                                        className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-12 z-0"
                                        animate={{ left: ["-100%", "200%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* SIMULATED FRAUD POINTS */}
                                    <motion.div
                                        className="absolute right-8 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full z-10"
                                        animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    />
                                </>
                            )}

                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full shrink-0 transition-colors z-10",
                                index === currentDocIndex ? "bg-blue-400" : "bg-slate-600"
                            )}></div>
                            <div className="min-w-0 z-10 relative">
                                <div className={cn("text-[10px] font-bold leading-none truncate", index === currentDocIndex ? "text-blue-100" : "text-slate-400")}>{doc.type}</div>
                                <div className="text-[9px] text-slate-500 truncate mt-0.5">{doc.name}</div>
                            </div>
                            {index === currentDocIndex && (
                                <motion.div layoutId="active-glow" className="ml-auto z-10">
                                    <Loader2 size={10} className="text-blue-400 animate-spin" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
