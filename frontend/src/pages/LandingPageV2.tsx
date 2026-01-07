import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../i18n';
import LanguageSelector from '../components/LanguageSelector';
import SmartChatbot from '../components/chat/SmartChatbot';
import {
    CheckCircle2, ShieldCheck, ScanLine, Lock, X, Menu, ArrowRight, Zap, ShieldAlert, Globe2, Building2, MoveHorizontal, Linkedin, Twitter, User, FileText, Receipt, GraduationCap, Home, Users, Scale, FileSpreadsheet, Car, Landmark, ShoppingBag, Briefcase, ScrollText, MousePointer2, UploadCloud, Check, Loader2, TrendingDown, AlertTriangle, UserX, FileCheck
} from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



// --- COMPOSANT: COMPARISON SLIDER (Interactif) ---
const ComparisonSlider = () => {
    const { t } = useTranslation();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 }); // Coordinates in %
    const [isClicking, setIsClicking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
        const position = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, position)));
    };

    const handleMouseDown = () => { isDragging.current = true; setIsAutoPlaying(false); };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleMove(e); };
    const handleClick = (e: React.MouseEvent) => { handleMove(e); isDragging.current = false; setIsAutoPlaying(false); };
    const handleMouseEnter = () => { setIsAutoPlaying(false); }; // Stop auto play on hover

    // --- ANIMATION SEQUENCE ---
    useEffect(() => {
        if (!isAutoPlaying) return;

        const sequence = async () => {
            const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
            const easeInOut = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Helper for smooth movement

            while (isAutoPlaying) {
                // 1. Start at center (50%)
                setCursorPos({ x: 50, y: 50 });
                setSliderPosition(50);
                await wait(1000);

                // 2. Click Grip
                setIsClicking(true);
                await wait(300);

                // 3. Slide Left (Reveal Original)
                for (let i = 0; i <= 100; i++) {
                    const p = 50 - (30 * easeInOut(i / 100)); // Go to 20%
                    setSliderPosition(p);
                    setCursorPos({ x: p, y: 50 });
                    await wait(10);
                }
                await wait(500);

                // 4. Slide Right (Reveal Fake / Alert)
                for (let i = 0; i <= 100; i++) {
                    const p = 20 + (60 * easeInOut(i / 100)); // Go to 80%
                    setSliderPosition(p);
                    setCursorPos({ x: p, y: 50 });
                    await wait(10);
                }

                // 5. Release Grip
                setIsClicking(false);
                await wait(500);

                // 6. Move cursor to Alert Box (Upper Right)
                // Target approx: 80% X, 25% Y (Top Right Alert)
                const startX = 80;
                const startY = 50;
                const endX = 85;
                const endY = 28;

                for (let i = 0; i <= 100; i++) {
                    const t = easeInOut(i / 100);
                    setCursorPos({
                        x: startX + (endX - startX) * t,
                        y: startY + (endY - startY) * t
                    });
                    await wait(5);
                }

                // 7. Pulse/Click on Alert
                setIsClicking(true);
                await wait(300);
                setIsClicking(false);
                await wait(300);
                setIsClicking(true);
                await wait(300);
                setIsClicking(false);
                await wait(2000); // Hold to show user

                // 8. Reset and Switch Document
                setSliderPosition(50); // Reset slider
                nextDoc(); // Switch image
                await wait(1000); // Wait before restarting loop
            }
        };

        sequence();
    }, [isAutoPlaying]); // Removed nextDoc from dependency to avoid infinite re-renders on logic

    // --- DOCUMENT ROTATION ---
    const docs = [
        {
            original: '/images/demo/invoice.jpg',
            fake: '/images/demo/invoice.jpg', // Ideally this should be the 'fake' version image but using same with filter logic for now as per code
            name: 'Facture'
        },
        {
            original: '/images/demo/payslip.png',
            fake: '/images/demo/payslip.png',
            name: 'Fiche de Paie'
        },
        {
            original: '/images/demo/cpam.jpg',
            fake: '/images/demo/cpam.jpg',
            name: 'Attestation'
        },
        {
            original: '/images/demo/order.jpg',
            fake: '/images/demo/order.jpg',
            name: 'Bon de Commande'
        }
    ];

    const [currentDocIndex, setCurrentDocIndex] = useState(0);

    // Function to rotate documents for external hook (not used in loop directly)
    // We use a ref to access the latest state inside the useEffect closure cleanly

    const indexRef = useRef(0);
    const nextDoc = () => {
        indexRef.current = (indexRef.current + 1) % docs.length;
        setCurrentDocIndex(indexRef.current);
    };

    const currentDoc = docs[currentDocIndex];

    return (
        <div
            ref={containerRef}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 group select-none cursor-ew-resize touch-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter} // Stop animation on interaction
            onClick={handleClick}
            onTouchMove={handleMove}
            onTouchStart={() => setIsAutoPlaying(false)}
        >
            {/* AUTOPLAY GHOST CURSOR */}
            <AnimatePresence>
                {isAutoPlaying && (
                    <motion.div
                        className="absolute z-50 pointer-events-none drop-shadow-2xl"
                        animate={{
                            left: `${cursorPos.x}%`,
                            top: `${cursorPos.y}%`
                        }}
                        transition={{ duration: 0 }} // Managed by manual loop for precision
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-lg">
                            <path d="M5.5 3.5L19 10L11.5 12.5L9 18.5L5.5 3.5Z" fill="#2563EB" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                        {isClicking && (
                            <span className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/40 rounded-full animate-ping pointer-events-none"></span>
                        )}
                        {/* Label Tooltip attached to cursor */}
                        <div className="absolute top-8 left-4 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap backdrop-blur-md border border-white/20">
                            {t('simulator_demo.ai_detection_tooltip')}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-full h-full pointer-events-none">
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={currentDoc.original}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={currentDoc.original}
                        alt="Original"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded text-xs font-bold backdrop-blur z-30">{t('simulator_demo.original')}</div>

                {/* Layer 2: Analyzed/Fake - revealed by slider */}
                <div className="absolute inset-0 w-full h-full bg-[#0f172a]" style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}>
                    {/* The background could be the same image processed or just dark simple bg since the user uploaded an image with overlays already? 
                         Assuming standard logic: We overlay the 'Fake' view. 
                     */}
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentDoc.fake}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            src={currentDoc.fake}
                            alt="Analyzed"
                            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-75 opacity-20"
                        />
                    </AnimatePresence>
                </div>

                <div className="absolute inset-0" style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}>
                    {/* Zones de falsification mises en évidence */}
                    <AnimatePresence mode='wait'>
                        {currentDocIndex === 0 && ( // Facture
                            <>
                                <div className="absolute top-1/4 right-10 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce flex items-center gap-3 z-20 border-2 border-white/20">
                                    <ShieldAlert size={24} />
                                    <div>
                                        <div className="font-black text-sm">{t('simulator_demo.critical_alert')}</div>
                                        <div className="text-[10px] font-mono opacity-80">{t('simulator_demo.score_fake')}</div>
                                    </div>
                                </div>
                                <div className="absolute bottom-1/3 right-20 border-4 border-red-500 w-32 h-12 rounded bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse"></div>
                            </>
                        )}
                        {currentDocIndex === 1 && ( // Paie
                            <div className="absolute top-1/3 left-1/4 border-4 border-red-500 w-48 h-16 rounded bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse">
                                <div className="absolute -top-8 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">{t('simulator_demo.suspect_amount')}</div>
                            </div>
                        )}
                        {currentDocIndex === 2 && ( // CPAM
                            <div className="absolute bottom-1/4 left-1/3 border-4 border-orange-500 w-40 h-40 rounded-full bg-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.5)] animate-pulse"></div>
                        )}
                        {currentDocIndex === 3 && ( // Order
                            <div className="absolute top-20 right-20 border-4 border-red-500 w-64 h-24 rounded bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse"></div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-40 shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-75" style={{ left: `${sliderPosition}%` }}>
                    <div className={cn("w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 transition-transform", isAutoPlaying && isClicking ? "scale-90" : "scale-100")}>
                        <MoveHorizontal size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPOSANT: UPLOAD SIMULATOR (ONBOARDING) ---
const UploadSimulator = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0); // 0: Idle, 1: Dragging, 2: Dropped, 3: Checking, 4: Chiclets, 5: Dashboard
    const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
    const [isChecked, setIsChecked] = useState(false);
    const [currentDocIndex, setCurrentDocIndex] = useState(0);

    const docs = [
        { name: 'attestation_caf_rsa_2022.pdf', size: '450 KB', type: t('simulator_demo.types.caf'), score: '99.5%', alert: t('simulator_demo.alerts.caf'), zone: t('simulator_demo.zones.rsa'), color: 'red', coords: { top: '42%', left: '60%', w: '25%', h: '4%' }, image: '/images/demo/demo_caf.png' },
        { name: 'indemnites_cpam_2024.pdf', size: '890 KB', type: t('simulator_demo.types.cpam'), score: '96.2%', alert: t('simulator_demo.alerts.cpam'), zone: t('simulator_demo.zones.period'), color: 'orange', coords: { top: '25%', left: '55%', w: '30%', h: '3%' }, image: '/images/demo/demo_cpam.jpg' },
        { name: 'titre_sejour_verso.jpg', size: '2.8 MB', type: t('simulator_demo.types.titre'), score: '99.9%', alert: t('simulator_demo.alerts.mrz'), zone: t('simulator_demo.zones.mrz'), color: 'red', coords: { top: '82%', left: '5%', w: '90%', h: '12%' }, image: '/images/demo/demo_titre_sejour.jpg' },
        { name: 'attestation_pole_emploi_2022.pdf', size: '520 KB', type: t('simulator_demo.types.pole'), score: '98.8%', alert: t('simulator_demo.alerts.pole'), zone: t('simulator_demo.zones.net'), color: 'red', coords: { top: '65%', left: '70%', w: '20%', h: '5%' }, image: '/images/demo/demo_paie.png' },
        { name: 'bulletin_paie_mars_2020.pdf', size: '1.4 MB', type: t('simulator_demo.types.paie'), score: '99.8%', alert: t('simulator_demo.alerts.paie'), zone: t('simulator_demo.zones.annual'), color: 'red', coords: { top: '75%', left: '50%', w: '15%', h: '3%' }, image: '/images/demo/demo_paie.png' },
        { name: 'diplome_master_2011.pdf', size: '2.8 MB', type: t('simulator_demo.types.master'), score: '94.2%', alert: t('simulator_demo.alerts.sign'), zone: t('simulator_demo.zones.rector'), color: 'orange', coords: { top: '80%', left: '40%', w: '20%', h: '8%' }, image: '/images/demo/demo_master.jpg' },
        { name: 'avis_impot_2021.pdf', size: '890 KB', type: t('simulator_demo.types.impot'), score: '99.9%', alert: t('simulator_demo.alerts.2d_doc'), zone: t('simulator_demo.zones.cachet'), color: 'red', coords: { top: '15%', left: '10%', w: '25%', h: '15%' }, image: '/images/demo/demo_impot.jpg' },
        { name: 'facture_bayard_dec_2023.pdf', size: '450 KB', type: t('simulator_demo.types.facture'), score: '98.5%', alert: t('simulator_demo.alerts.iban'), zone: t('simulator_demo.zones.bank'), color: 'red', coords: { top: '88%', left: '30%', w: '40%', h: '4%' }, image: '/images/demo/demo_facture_bayard.jpg' }
    ];

    const currentDoc = docs[currentDocIndex];

    useEffect(() => {
        const runSimulation = async () => {
            const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

            while (true) {
                // RESET
                setStep(0);
                setIsChecked(false);
                setCursorPos({ x: 110, y: 110 }); // Start off-screen
                await wait(1000);

                // 1. Move Cursor to File (Simulated) & Drag to Dropzone
                setCursorPos({ x: 90, y: 20 }); // "Pick up" file position (imaginary right side)
                await wait(500);
                setStep(1); // Start dragging state
                // Move to center of dropzone
                setCursorPos({ x: 50, y: 40 });
                await wait(1000);

                // 2. Drop File
                setStep(2); // File dropped
                await wait(500);

                // 3. Move to Checkbox
                setCursorPos({ x: 15, y: 65 }); // Checkbox position relative to card
                await wait(800);
                // Click
                setIsChecked(true);
                await wait(300);

                // 4. Move to Button
                setCursorPos({ x: 50, y: 85 }); // Button center
                await wait(800);

                // 5. Click Verify
                setStep(3); // Loading start (SCANNING)
                await wait(2000); // Allow time for scan animation

                // 6. Transition to Dashboard
                await wait(500); // Fake Loading transition
                setStep(4); // Dashboard Reveal

                // 7. Show Free Credits Tooltip
                setCursorPos({ x: 80, y: 10 }); // Move cursor away
                await wait(3500); // Let user read

                // 8. Next Document
                setCurrentDocIndex(prev => (prev + 1) % docs.length);
                await wait(500);
            }
        };
        runSimulation();
    }, []);

    const colorClasses = {
        red: {
            bg: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-100',
            bg_full: 'bg-red-500',
            ring: 'ring-red-500'
        },
        orange: {
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            border: 'border-orange-100',
            bg_full: 'bg-orange-500',
            ring: 'ring-orange-500'
        }
    };

    const currentColors = colorClasses[currentDoc.color as keyof typeof colorClasses] || colorClasses.red;


    return (
        <div className="relative w-full max-w-md mx-auto perspective-1000">
            {/* MOUSE CURSOR */}
            <motion.div
                className="absolute z-50 pointer-events-none drop-shadow-2xl"
                animate={{
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <MousePointer2 className="fill-blue-600 text-white w-8 h-8" />
            </motion.div>

            {/* MAIN CARD CONTAINER */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 min-h-[400px]">

                {/* STATE 1: UPLOAD FORM */}
                <AnimatePresence mode="wait">
                    {step < 4 && (
                        <motion.div
                            key="upload-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            className="p-8 h-full flex flex-col items-center text-center"
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Vérificateur de documents</h3>
                            <p className="text-slate-500 text-sm mb-6">Téléchargez votre PDF ou image pour vérifier son authenticité</p>

                            {/* DROPZONE */}
                            <div className={cn(
                                "w-full border-2 border-dashed rounded-xl p-8 mb-6 transition-all duration-300 flex flex-col items-center justify-center gap-3 bg-slate-50",
                                step >= 1 ? "border-blue-500 bg-blue-50/50" : "border-slate-300"
                            )}>
                                {step >= 2 ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-3 text-slate-700 bg-white px-4 py-3 rounded-lg shadow-sm w-full">
                                        <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center"><FileText size={20} /></div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="font-bold text-sm truncate">bulletin_paie_2024.pdf</div>
                                            <div className="text-xs text-slate-400">1.2 MB</div>
                                        </div>
                                        <CheckCircle2 className="text-emerald-500" size={20} />
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-blue-100/50 text-blue-600 rounded-full flex items-center justify-center mb-2 animate-bounce">
                                            <UploadCloud size={32} />
                                        </div>
                                        <div className="font-medium text-slate-700">Glissez et déposez votre fichier ici</div>
                                        <div className="text-xs text-slate-400">Supporte PDF, PNG, JPG (max 25MB)</div>
                                    </>
                                )}
                            </div>

                            {/* LEGAL CHECKBOX - ALIGNED LEFT */}
                            <div className="w-full flex items-start gap-3 mb-6">
                                <div className={cn(
                                    "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 mt-0.5",
                                    isChecked ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                                )}>
                                    {isChecked && <Check size={14} className="text-white" />}
                                </div>
                                <div className="text-left text-xs text-slate-500 leading-tight">
                                    J'accepte les <span className="text-blue-600 underline">Conditions d'utilisation</span> et la <span className="text-blue-600 underline">Politique de confidentialité</span>.
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                className={cn(
                                    "w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2",
                                    step === 3 ? "bg-slate-800 scale-95" : "bg-blue-600 hover:bg-blue-500"
                                )}
                            >
                                {step === 3 ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Analyse en cours...
                                    </>
                                ) : (
                                    "Vérifier le document gratuitement"
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STATE 1.5: SCANNING ANIMATION (LIVE SCAN) */}
                <AnimatePresence mode="wait">
                    {step === 3 && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8"
                        >
                            {/* LARGE SCANNING FRAME */}
                            <div className="relative w-80 h-96 bg-slate-800 rounded-xl border border-slate-600 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden mb-6 p-2 ring-1 ring-white/10">

                                {/* ACTUAL DOCUMENT IMAGE */}
                                <div className="relative w-full h-full rounded overflow-hidden">
                                    <img
                                        src={docs[currentDocIndex].image}
                                        alt="Document Scan"
                                        className="w-full h-full object-cover opacity-80"
                                    />

                                    {/* COLORED OVERLAY */}
                                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>

                                    {/* LASER SCAN LINE */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-2 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] z-20"
                                        animate={{ top: ["-10%", "110%"] }}
                                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                    />

                                    {/* BLINKING FRAUD ZONES */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }}
                                        className="absolute border-2 border-red-500 bg-red-500/30 z-10 box-border rounded-sm backdrop-blur-sm"
                                        style={{
                                            top: docs[currentDocIndex].coords.top,
                                            left: docs[currentDocIndex].coords.left,
                                            width: docs[currentDocIndex].coords.w,
                                            height: docs[currentDocIndex].coords.h
                                        }}
                                    >
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-lg">
                                            ⚠️ {docs[currentDocIndex].alert}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <div className="flex items-center gap-2 justify-center text-blue-400 font-mono text-xs mb-2 tracking-widest uppercase">
                                    <Loader2 className="animate-spin" size={14} />
                                    Analyse IA en cours
                                </div>
                                <h3 className="text-white font-bold text-lg">Vérification des pixels...</h3>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STATE 2: DASHBOARD PREVIEW - REPORT SIMULATION */}
                <AnimatePresence>
                    {step >= 4 && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 bg-slate-50 flex flex-col font-sans"
                        >
                            {/* DASHBOARD NAVBAR */}
                            <div className="bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between shadow-sm z-10 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-xs">V</div>
                                    <span className="font-bold text-xs tracking-wide opacity-80">DASHBOARD</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-white/10"><User size={12} /></div>
                                </div>
                            </div>

                            {/* DASHBOARD BODY */}
                            <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4 relative">
                                {/* REPORT HEADER */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Rapport #AN-2024-{100 + currentDocIndex}</div>
                                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 break-all line-clamp-1">
                                            <FileText size={14} className="text-slate-400 shrink-0" />
                                            {currentDoc.name}
                                        </h3>
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className={cn("px-2 py-1 rounded text-[10px] font-black border shadow-sm flex items-center gap-1", currentColors.bg, currentColors.text, currentColors.border)}
                                    >
                                        <ShieldAlert size={10} />
                                        {currentDoc.alert}
                                    </motion.div>
                                </div>

                                {/* ANALYSIS GRID */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* SCORE CARD */}
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white p-3 rounded-xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                                    >
                                        <div className="text-[10px] text-slate-400 font-medium mb-1">Probabilité Fraude</div>
                                        <div className={cn("text-2xl font-black tracking-tight", currentColors.text)}>{currentDoc.score}</div>
                                        <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: currentDoc.score }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className={cn("h-full", currentColors.bg_full)}
                                            ></motion.div>
                                        </div>
                                    </motion.div>

                                    {/* ANOMALIES CARD */}
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white p-3 rounded-xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                                    >
                                        <div className="text-[10px] text-slate-400 font-medium mb-1">Anomalies</div>
                                        <div className="text-2xl font-black text-slate-800">3</div>
                                        <div className={cn("text-[10px] font-bold mt-1 flex items-center gap-1 w-fit px-1.5 py-0.5 rounded", currentColors.text, currentColors.bg)}>
                                            CRITIQUE
                                        </div>
                                    </motion.div>
                                </div>

                                {/* DETAILED ALERT BOX + VISUAL MAP (THE "WOW" FACTOR) */}
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className={cn("bg-white rounded-xl border shadow-sm overflow-hidden flex-1 relative group flex gap-4 p-3", currentColors.border)}
                                >
                                    <div className={cn("absolute top-0 left-0 w-1 h-full", currentColors.bg_full)}></div>

                                    {/* VISUAL DOCUMENT MAP */}
                                    <div className="w-32 h-44 bg-slate-100 border border-slate-200 rounded relative overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={currentDoc.image}
                                            alt="Analyzed Document"
                                            className="w-full h-full object-cover opacity-90 blur-[0.5px] group-hover:blur-0 transition-all duration-500"
                                        />

                                        {/* FRAUD LOCATION BOX */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 2 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8, type: 'spring' }}
                                            className={cn("absolute border-2 bg-white/50 backdrop-blur-[1px]", currentColors.text, currentColors.ring, currentColors.border)}
                                            style={{
                                                top: currentDoc.coords.top,
                                                left: currentDoc.coords.left,
                                                width: currentDoc.coords.w,
                                                height: currentDoc.coords.h
                                            }}
                                        >
                                            <div className={cn("absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping", currentColors.bg_full)}></div>
                                        </motion.div>
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10">
                                        <div className="font-bold text-slate-800 text-xs mb-1">Zone Suspecte Identifiée</div>
                                        <div className="text-[10px] text-slate-500 leading-snug">
                                            Anomalie détectée : <strong className={cn("px-1 rounded", currentColors.bg, currentColors.text)}>{currentDoc.zone}</strong>
                                        </div>
                                        <div className="mt-2 flex gap-1 flex-wrap">
                                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-[4px] text-[8px] font-mono border border-slate-200">ELA: MANIPULÉ</span>
                                        </div>
                                    </div>

                                    {/* Background decoration */}
                                    <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-50 rotate-[-15deg] pointer-events-none">
                                        <ShieldAlert size={100} />
                                    </div>
                                </motion.div>

                                {/* FREE CREDITS NOTIFICATION */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                    className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg flex items-center gap-3 text-sm relative overflow-hidden mt-auto"
                                >
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0 text-lg">🎁</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-xs">Cadeau de bienvenue !</div>
                                        <div className="text-indigo-200 text-[10px]">2 Crédits d'analyse offerts ajoutés.</div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                    }
                </AnimatePresence >
            </div >

            {/* DECORATIVE ELEMENTS BEHIND */}
            < div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl -z-10 animate-pulse" ></div >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl -z-10 animate-pulse delay-700"></div>

            {/* LIVE DOCUMENT QUEUE - NEW ADDITION BELOW SIMULATOR */}
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">{t('simulator.queue_title')}</span>
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
        </div >
    );
};

export default function LandingPageV2() {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* NAVBAR */}
            <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-[#020617]/90 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "bg-transparent")}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="bg-white rounded-full p-1.5 shadow-lg shadow-blue-500/20 relative z-10">
                                <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-8 w-auto object-contain" />
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:block group-hover:text-blue-400 transition-colors">VERIFDOC</span>
                    </div>
                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                        <a href="#features" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
                            <span className="relative z-10">{t('nav.solutions')}</span>
                        </a>
                        <a href="#developers" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
                            <span className="relative z-10">{t('nav.developers')}</span>
                        </a>
                        <Link to="/company" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
                            <span className="relative z-10">{t('nav.company')}</span>
                        </Link>
                        <Link to="/join-us" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            <span className="relative z-10">{t('nav.careers')}</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSelector />
                        <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                            {t('nav.login')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/contact" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] border border-blue-400/20 hover:scale-105 active:scale-95">
                            {t('nav.book_demo')}
                        </Link>
                    </div>
                    <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT COLUMN: TEXT */}
                    <div className="text-left">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
                            {t('hero.badge')}
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                            {t('hero.title_start')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                {t('hero.title_end')}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                                {t('hero.cta_start')} <ArrowRight size={18} />
                            </Link>
                            <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors backdrop-blur-sm">
                                {t('hero.cta_sales')}
                            </a>
                        </div>
                        <div className="flex items-center gap-8 text-slate-500 text-sm font-medium">
                            <div className="flex items-center gap-2"><CheckCircle2 className="text-blue-500" size={16} /> Démo gratuite</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="text-blue-500" size={16} /> Pas de carte requise</div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SIMULATOR (RESTORED TO HERO) */}
                    <div className="relative flex flex-col items-center">
                        <UploadSimulator />
                    </div>
                </div>
            </section>


            {/* CLIENTS */}
            <section className="py-12 border-y border-white/5 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-mono text-slate-500 mb-8 uppercase tracking-widest">{t('clients.trust_text')}</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
                        <div className="text-xl font-bold text-white flex items-center gap-2"><Globe2 size={24} /> GlobalBank</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2"><Building2 size={24} /> ImmoTrust</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2"><ShieldCheck size={24} /> SecurePay</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2"><Lock size={24} /> CyberGuard</div>
                    </div>
                </div>
            </section>

            {/* USE CASES - FEAR & REASSURANCE */}
            <section id="blog" className="py-24 bg-zinc-900 border-y border-white/5 relative overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-red-600/5 blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold mb-6 tracking-wide uppercase border border-red-500/20">
                            <AlertTriangle size={14} /> {t('use_cases.fear.badge')}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            {t('use_cases.fear.title_start')}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{t('use_cases.fear.title_end')}</span>
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                            {t('use_cases.fear.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* CARD 1: FINANCIAL */}
                        <div className="group relative h-[400px] rounded-3xl perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-8 border border-white/5 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-zinc-800 group-hover:border-blue-500/30">
                                {/* STATE A: FEAR (Visible by default) */}
                                <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-0 delay-100">
                                    <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                                        <TrendingDown size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{t('use_cases.fear.financial.title')}</h3>
                                    <p className="text-zinc-400 leading-relaxed mb-6">
                                        {t('use_cases.fear.financial.desc')} <strong className="text-red-400">{t('use_cases.fear.financial.loss_amount')}</strong>.
                                    </p>
                                    <div className="flex items-center gap-2 text-red-400 text-sm font-bold font-mono">
                                        <ShieldAlert size={16} /> {t('use_cases.fear.financial.badge')}
                                    </div>
                                </div>

                                {/* STATE B: REASSURANCE (Visible on Hover) */}
                                <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{t('use_cases.reassurance.financial.title')}</h3>
                                    <p className="text-blue-100 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        {t('use_cases.reassurance.financial.desc')}
                                    </p>
                                    <button className="px-6 py-2 bg-white text-blue-900 font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg translate-y-4 group-hover:translate-y-0 duration-500 delay-300">
                                        {t('use_cases.reassurance.financial.cta')}
                                    </button>
                                </div>

                                {/* Background Glitch Effect elements for Fear state */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                            </div>
                        </div>

                        {/* CARD 2: LEGAL */}
                        <div className="group relative h-[400px] rounded-3xl perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-8 border border-white/5 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-zinc-800 group-hover:border-blue-500/30">
                                {/* STATE A: FEAR */}
                                <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-0 delay-100">
                                    <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                                        <Scale size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{t('use_cases.fear.legal.title')}</h3>
                                    <p className="text-zinc-400 leading-relaxed mb-6">
                                        {t('use_cases.fear.legal.desc')} <strong className="text-orange-400">{t('use_cases.fear.legal.fine_amount')}</strong>.
                                    </p>
                                    <div className="flex items-center gap-2 text-orange-400 text-sm font-bold font-mono">
                                        <AlertTriangle size={16} /> {t('use_cases.fear.legal.badge')}
                                    </div>
                                </div>

                                {/* STATE B: REASSURANCE */}
                                <div className="absolute inset-0 bg-indigo-900/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="w-16 h-16 bg-white text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <FileCheck size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{t('use_cases.reassurance.legal.title')}</h3>
                                    <p className="text-indigo-100 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        {t('use_cases.reassurance.legal.desc')}
                                    </p>
                                    <button className="px-6 py-2 bg-white text-indigo-900 font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg translate-y-4 group-hover:translate-y-0 duration-500 delay-300">
                                        {t('use_cases.reassurance.legal.cta')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: REPUTATION */}
                        <div className="group relative h-[400px] rounded-3xl perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-8 border border-white/5 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-zinc-800 group-hover:border-blue-500/30">
                                {/* STATE A: FEAR */}
                                <div className="relative z-10 transition-opacity duration-500 group-hover:opacity-0 delay-100">
                                    <div className="w-14 h-14 bg-pink-500/10 text-pink-500 rounded-2xl flex items-center justify-center mb-6">
                                        <UserX size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{t('use_cases.fear.reputation.title')}</h3>
                                    <p className="text-zinc-400 leading-relaxed mb-6">
                                        {t('use_cases.fear.reputation.desc')} <strong className="text-pink-400">{t('use_cases.fear.reputation.trust_break')}</strong>
                                    </p>
                                    <div className="flex items-center gap-2 text-pink-400 text-sm font-bold font-mono">
                                        <Lock size={16} /> {t('use_cases.fear.reputation.badge')}
                                    </div>
                                </div>

                                {/* STATE B: REASSURANCE */}
                                <div className="absolute inset-0 bg-emerald-900/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Users size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{t('use_cases.reassurance.reputation.title')}</h3>
                                    <p className="text-emerald-100 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        {t('use_cases.reassurance.reputation.desc')}
                                    </p>
                                    <button className="px-6 py-2 bg-white text-emerald-900 font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg translate-y-4 group-hover:translate-y-0 duration-500 delay-300">
                                        {t('use_cases.reassurance.reputation.cta')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTORS SECTION (NEW 12 GRID) */}
            <section id="sectors" className="py-24 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-slate-50 -skew-y-3 origin-top-left -z-10"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
                            {t('sectors.badge')}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                            {t('sectors.title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('sectors.title_sub')}</span>
                        </h2>
                        <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                            {t('sectors.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Building2 size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('sectors.bank.title')}</h3>
                            <p className="text-slate-500 text-sm">{t('sectors.bank.desc')}</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('sectors.real_estate.title')}</h3>
                            <p className="text-slate-500 text-sm">{t('sectors.real_estate.desc')}</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('sectors.recruitment.title')}</h3>
                            <p className="text-slate-500 text-sm">{t('sectors.recruitment.desc')}</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-pink-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Scale size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('sectors.legal.title')}</h3>
                            <p className="text-slate-500 text-sm">{t('sectors.legal.desc')}</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-orange-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('sectors.fintech.title')}</h3>
                            <p className="text-slate-500 text-sm">{t('sectors.fintech.desc')}</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ShieldAlert size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('sectors.insurance.title')}</h3>
                            <p className="text-slate-500 text-sm">{t('sectors.insurance.desc')}</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileSpreadsheet size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Expertise Comptable</h3>
                            <p className="text-slate-500 text-sm">Automatisez la confiance. Auditez 100% de vos factures et notes de frais pour rejeter les faux automatiquement.</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Car size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Mobilité & Location</h3>
                            <p className="text-slate-500 text-sm">Validez permis et justificatifs en un clic pour éviter vols et impayés. Ne laissez plus partir vos véhicules au hasard.</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ScrollText size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Notariat</h3>
                            <p className="text-slate-500 text-sm">Garantissez la chaîne de confiance. Protégez vos actes authentiques contre l'usurpation d'identité sophistiquée.</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-800/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-blue-800 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Landmark size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Secteur Public</h3>
                            <p className="text-slate-500 text-sm">Justesse et équité. Assurez-vous que chaque prestation sociale va au bon bénéficiaire en écartant les dossiers frauduleux.</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-yellow-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Marketplaces</h3>
                            <p className="text-slate-500 text-sm">Vérifiez vos vendeurs à l'échelle. Un onboarding KYB ultra-rapide pour une plateforme de confiance.</p>
                        </div>
                        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-1 transition-all border border-slate-100">
                            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Briefcase size={24} /></div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Intérim</h3>
                            <p className="text-slate-500 text-sm">Accélérez vos placements. Validez des milliers de documents candidats par heure et soyez réactif.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES - SPLIT SECTION */}
            <section id="features" className="py-32 relative bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{t('features.title_start')} <br /><span className="text-blue-500">{t('features.title_end')}</span></h2>
                        <p className="text-lg text-slate-400 mb-10 leading-relaxed">{t('features.description')}</p>
                        <div className="space-y-8">
                            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><ScanLine size={24} /></div><div><h3 className="text-white font-bold text-lg mb-1">{t('features.ai_detection.title')}</h3><p className="text-slate-400 text-sm">{t('features.ai_detection.desc')}</p></div></div>
                            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0"><Zap size={24} /></div><div><h3 className="text-white font-bold text-lg mb-1">{t('features.fast_results.title')}</h3><p className="text-slate-400 text-sm">{t('features.fast_results.desc')}</p></div></div>
                            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0"><Lock size={24} /></div><div><h3 className="text-white font-bold text-lg mb-1">{t('features.secure_handling.title')}</h3><p className="text-slate-400 text-sm">{t('features.secure_handling.desc')}</p></div></div>
                            <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0"><ShieldCheck size={24} /></div><div><h3 className="text-white font-bold text-lg mb-1">{t('features.enterprise_security.title')}</h3><p className="text-slate-400 text-sm">{t('features.enterprise_security.desc')}</p></div></div>
                        </div>
                    </div>
                    {/* COMPARISON SLIDER */}
                    <ComparisonSlider />
                </div>
            </section>

            {/* TRUST ECOSYSTEM SECTION */}
            <section className="py-20 border-t border-white/5 bg-[#020617]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-12">{t('trust.title')}</p>

                    {/* TECH GIANTS */}
                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/microsoft.png" alt="Microsoft" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/google.png" alt="Google" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/github.jpg" alt="GitHub" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/adobe.png" alt="Adobe" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/ovh.png" alt="OVHcloud" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20 relative">
                            <img src="/images/partners/xolo.jpg" alt="Xolo" className="w-full h-4/5 object-contain" />
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{t('trust.estonia')}</span>
                        </div>
                    </div>

                    <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto mb-12"></div>

                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">{t('trust.bodies')}</p>

                    {/* INSTITUTIONAL BODIES */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/anssi.png" alt="ANSSI" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/cnil.png" alt="CNIL" className="w-full h-full object-contain" />
                        </div>
                        <div className="bg-white rounded-xl w-48 h-28 flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-500/20">
                            <img src="/images/partners/inec.jpg" alt="INEC" className="w-full h-full object-contain rounded-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* TARIFS (PRICING) */}
            <section id="pricing" className="py-24 bg-[#050914] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">{t('pricing.title')}</h2>
                    <p className="text-slate-400 mb-16 max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                        {/* START */}
                        <div className="bg-slate-900/20 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                            <h3 className="font-bold text-white text-xl mb-2">{t('pricing.start.title')}</h3>
                            <div className="text-4xl font-bold text-white mb-6">{t('pricing.start.price')}<span className="text-sm text-slate-500 font-normal">{t('pricing.start.period')}</span></div>
                            <ul className="space-y-4 text-sm text-slate-400 mb-8"><li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> {t('pricing.start.features.verifications')}</li><li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> {t('pricing.start.features.ocr')}</li></ul>
                            <Link to="/signup?plan=start" className="block w-full py-3 bg-slate-800 text-white text-center rounded-lg font-medium hover:bg-slate-700 transition-colors">{t('pricing.start.cta')}</Link>
                        </div>
                        {/* EXPERT */}
                        <div className="bg-slate-900/80 border border-blue-500/50 rounded-2xl p-8 relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
                            <div className="absolute top-0 right-0 py-1 px-3 bg-blue-600 text-white text-[10px] font-bold rounded-bl-xl rounded-tr-xl">{t('pricing.recommended')}</div>
                            <h3 className="font-bold text-white text-xl mb-2">{t('pricing.expert.title')}</h3>
                            <div className="text-4xl font-bold text-white mb-6">{t('pricing.expert.price')}<span className="text-sm text-slate-500 font-normal">{t('pricing.expert.period')}</span></div>
                            <ul className="space-y-4 text-sm text-slate-300 mb-8"><li className="flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> {t('pricing.expert.features.verifications')}</li><li className="flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> <span className="font-bold text-white">{t('pricing.expert.features.ela')}</span></li><li className="flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> {t('pricing.expert.features.photoshop')}</li></ul>
                            <Link to="/signup?plan=expert" className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-bold hover:bg-blue-500 transition-colors">{t('pricing.expert.cta')}</Link>
                        </div>
                        {/* ENTREPRISE */}
                        <div className="bg-slate-900/20 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                            <h3 className="font-bold text-white text-xl mb-2">{t('pricing.enterprise.title')}</h3>
                            <div className="text-4xl font-bold text-white mb-6">{t('pricing.enterprise.price')}</div>
                            <ul className="space-y-4 text-sm text-slate-400 mb-8"><li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> {t('pricing.enterprise.features.volume')}</li><li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500" /> {t('pricing.enterprise.features.sla')}</li></ul>
                            <Link to="/contact" className="block w-full py-3 bg-slate-800 text-white text-center rounded-lg font-medium hover:bg-slate-700 transition-colors">{t('pricing.enterprise.cta')}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* NOTRE HISTOIRE - SECTION */}
            <section className="py-24 bg-white border-t border-slate-100 border-b">
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
                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-slate-900 border border-slate-200">
                                {t('history.image_caption')}
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                                {t('history.badge')}
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                {t('history.title')}
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                <p>
                                    <strong className="text-slate-900">{t('history.p1').split(' ').slice(0, 5).join(' ')}</strong> {t('history.p1').split(' ').slice(5).join(' ')}
                                </p>
                                <p>
                                    {t('history.p2')}
                                </p>
                                <p>
                                    {t('history.p3')}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-4 pt-8 border-t border-slate-100">
                                <div className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('history.partner_label')}</div>
                                <div className="h-8 w-px bg-slate-300"></div>
                                <div className="text-slate-500 font-serif italic text-lg">{t('history.partner_name')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER - CLEAN WHITE STYLE */}
            <footer className="bg-white text-slate-600 text-sm">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-6 text-blue-600"><img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-8 w-auto mix-blend-multiply" /><span className="text-lg font-bold tracking-tight text-slate-900">VERIFDOC</span></div>
                            <p className="mb-6 leading-relaxed text-slate-500">Vérifiez vos PDFs avec l'IA. Détectez instantanément les faux documents grâce à notre technologie d'IA avancée.</p>
                            <div className="flex gap-4"><a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Twitter size={20} /></a><a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a></div>
                        </div>
                        <div><h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">{t('footer.product')}</h4><ul className="space-y-3"><li><a href="#" className="hover:text-blue-600 transition-colors">{t('footer.how_it_works')}</a></li><li><a href="#" className="hover:text-blue-600 transition-colors">{t('footer.pricing')}</a></li><li><a href="#" className="hover:text-blue-600 transition-colors">{t('footer.testimonials')}</a></li><li><a href="#" className="hover:text-blue-600 transition-colors">{t('nav.book_demo')}</a></li></ul></div>
                        <div><h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">{t('footer.company')}</h4><ul className="space-y-3"><li><a href="#" className="hover:text-blue-600 transition-colors">{t('footer.about')}</a></li><li><a href="#" className="hover:text-blue-600 transition-colors">{t('footer.contact')}</a></li></ul></div>
                        <div><h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">{t('footer.legal')}</h4><ul className="space-y-3"><li><Link to="/privacy" className="hover:text-blue-600 transition-colors">{t('footer.privacy')}</Link></li><li><Link to="/terms" className="hover:text-blue-600 transition-colors">{t('footer.terms')}</Link></li></ul></div>
                    </div>
                    <div className="border-t border-slate-100 mt-16 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                            <div className="flex gap-8 text-slate-500 font-medium ml-auto mr-auto md:ml-0 md:mr-0 items-center flex-wrap justify-center md:justify-start">
                                <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-blue-600" /> {t('footer.iso')}</div>
                                <div className="flex items-center gap-2">
                                    <img src="/images/rgpd_logo.png" alt="RGPD" className="h-8 w-auto" />
                                    <span className="font-bold text-blue-900 text-xs uppercase tracking-wide">{t('footer.rgpd')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/images/ai_act_logo.png" alt="AI Act" className="h-6 w-auto" />
                                    <span className="font-bold text-blue-900 text-xs uppercase tracking-wide">{t('footer.ai_act')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-[10px] text-slate-400 leading-tight max-w-5xl mx-auto text-center border-t border-slate-50 pt-8">
                            <p className="mb-2">
                                {t('footer.disclaimer')}
                            </p>
                            <div className="flex justify-center gap-4 mb-2 font-medium">
                                <Link to="/terms" className="hover:text-slate-600 transition-colors">{t('footer.terms')}</Link>
                                <span>&bull;</span>
                                <Link to="/privacy" className="hover:text-slate-600 transition-colors">{t('footer.privacy')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* AI CHATBOT - SALES MODE */}
            <SmartChatbot mode="sales" />
        </div>
    );
}
