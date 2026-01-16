import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, ShieldCheck, AlertTriangle, FileText, CheckCircle2, Loader2, Search, Smartphone, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

// Simulated scan steps
const SCAN_STEPS = [
    { id: 'ocr', label: 'Extraction OCR', icon: FileText, color: 'text-blue-400' },
    { id: 'meta', label: 'Analyse Métadonnées', icon: Search, color: 'text-purple-400' },
    { id: 'fraud', label: 'Détection Altérations', icon: Scan, color: 'text-orange-400' },
    { id: 'final', label: 'Validation Finale', icon: ShieldCheck, color: 'text-emerald-400' },
];

export default function HeroScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [result, setResult] = useState<'safe' | 'danger' | null>(null);

    // Auto-start demo loop for "Live" feel, but allow interaction
    useEffect(() => {
        const timer = setTimeout(() => {
            startScan();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        setCurrentStepIndex(0);
        setResult(null);

        // Simulate progress
        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsScanning(false);
                        setResult('safe');
                    }, 500);
                    return 100;
                }
                // Advance steps based on progress
                if (prev > 25) setCurrentStepIndex(1);
                if (prev > 50) setCurrentStepIndex(2);
                if (prev > 75) setCurrentStepIndex(3);

                return prev + 1; // 1% per tick approx
            });
        }, 30); // 3 seconds total scan
    };

    const resetScan = () => {
        setIsScanning(false);
        setResult(null);
        setScanProgress(0);
        setCurrentStepIndex(0);
    };

    return (
        <div className="relative w-full max-w-md mx-auto perspective-1000">

            {/* Floating Status Badge (Top Right) */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute -top-6 -right-6 z-20 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
            >
                <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Moteur IA Connecté
            </motion.div>

            {/* Main Glass Card */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-900/50">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <ShieldCheck size={12} />
                        SCANNER_V3.0
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 relative min-h-[400px] flex flex-col items-center justify-center">

                    {/* Document Preview Area */}
                    <div className="relative w-48 h-64 bg-white rounded-lg shadow-xl mb-8 transform transition-transform duration-500 overflow-hidden group">
                        {/* Fake Document Content */}
                        <div className="absolute inset-0 p-4 flex flex-col gap-2">
                            <div className="w-12 h-12 bg-slate-200 rounded-full mb-2 opacity-50"></div>
                            <div className="h-2 w-20 bg-slate-200 rounded opacity-50"></div>
                            <div className="h-2 w-32 bg-slate-200 rounded opacity-50"></div>
                            <div className="h-px w-full bg-slate-100 my-2"></div>
                            <div className="space-y-1">
                                <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                                <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                                <div className="h-1.5 w-3/4 bg-slate-100 rounded"></div>
                            </div>
                            {/* ID Card Look */}
                            <div className="mt-auto h-16 bg-blue-50/50 rounded flex items-center p-2 gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded"></div>
                                <div className="space-y-1 flex-1">
                                    <div className="h-1.5 w-full bg-blue-100/50"></div>
                                    <div className="h-1.5 w-1/2 bg-blue-100/50"></div>
                                </div>
                            </div>
                        </div>

                        {/* Scanning Laser Effect */}
                        {isScanning && (
                            <motion.div
                                initial={{ top: 0 }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
                            />
                        )}

                        {/* Hotspots (Issues) - Only show if not safe or during specific phase */}
                        {isScanning && scanProgress > 60 && scanProgress < 90 && (
                            <>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-12 left-8 w-6 h-6 rounded-full border-2 border-red-500 bg-red-500/20 z-20 animate-pulse" />
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-6 right-4 w-12 h-4 rounded border-2 border-orange-500 bg-orange-500/20 z-20 animate-pulse" />
                            </>
                        )}

                        {/* Result Overlay */}
                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                                    className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/60"
                                >
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-2xl flex flex-col items-center gap-2 text-center"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Document Validé</h3>
                                        <p className="text-xs text-slate-500">Authenticité certifiée</p>
                                        <button
                                            onClick={startScan}
                                            className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                                        >
                                            Analyser un autre
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress Steps / Terminal Log */}
                    <div className="w-full space-y-3">
                        {SCAN_STEPS.map((step, idx) => {
                            const isActive = isScanning && currentStepIndex === idx;
                            const isCompleted = currentStepIndex > idx || result !== null;

                            return (
                                <div key={step.id} className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors duration-300",
                                        isCompleted ? "bg-emerald-500/20 text-emerald-500" : isActive ? "bg-blue-500/20 text-blue-500" : "bg-slate-800 text-slate-600"
                                    )}>
                                        {isCompleted ? <CheckCircle2 size={12} /> : <step.icon size={12} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={cn("text-xs font-medium transition-colors", isActive || isCompleted ? "text-slate-200" : "text-slate-600")}>
                                                {step.label}
                                            </span>
                                            {isActive && <span className="text-[10px] text-blue-400 animate-pulse">Analyse...</span>}
                                        </div>
                                        {/* Mini Progress Bar for active step */}
                                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className={cn("h-full rounded-full", isCompleted ? "bg-emerald-500" : "bg-blue-500")}
                                                initial={{ width: "0%" }}
                                                animate={{ width: isCompleted ? "100%" : isActive ? "60%" : "0%" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-slate-900/50 border-t border-white/5 flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                    <button
                        onClick={startScan}
                        disabled={isScanning}
                        className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                            isScanning ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-95"
                        )}
                    >
                        {isScanning ? <Loader2 size={12} className="animate-spin" /> : <Smartphone size={12} />}
                        {isScanning ? "Analyse en cours..." : "Lancer le scan"}
                    </button>
                </div>

            </div>

            {/* Decorative Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

        </div>
    );
}
