import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, MoveHorizontal } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ComparisonSlider() {
    const { t } = useTranslation();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
    const [isClicking, setIsClicking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    // --- DOCUMENT ROTATION ---
    const docs = [
        {
            original: '/images/demo/invoice.jpg',
            fake: '/images/demo/invoice.jpg',
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
    const indexRef = useRef(0);

    const nextDoc = () => {
        indexRef.current = (indexRef.current + 1) % docs.length;
        setCurrentDocIndex(indexRef.current);
    };

    const currentDoc = docs[currentDocIndex];

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
    const handleMouseEnter = () => { setIsAutoPlaying(false); };

    // --- ANIMATION SEQUENCE ---
    useEffect(() => {
        if (!isAutoPlaying) return;

        const sequence = async () => {
            const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
            const easeInOut = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            while (isAutoPlaying) {
                // 1. Start at center
                setCursorPos({ x: 50, y: 50 });
                setSliderPosition(50);
                await wait(1000);

                // 2. Click Grip
                setIsClicking(true);
                await wait(300);

                // 3. Slide Left
                for (let i = 0; i <= 100; i++) {
                    const p = 50 - (30 * easeInOut(i / 100));
                    setSliderPosition(p);
                    setCursorPos({ x: p, y: 50 });
                    await wait(10);
                }
                await wait(500);

                // 4. Slide Right
                for (let i = 0; i <= 100; i++) {
                    const p = 20 + (60 * easeInOut(i / 100));
                    setSliderPosition(p);
                    setCursorPos({ x: p, y: 50 });
                    await wait(10);
                }

                // 5. Release Grip
                setIsClicking(false);
                await wait(500);

                // 6. Move cursor to Alert Box
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
                await wait(2000);

                // 8. Reset and Switch
                setSliderPosition(50);
                nextDoc();
                await wait(1000);
            }
        };

        sequence();
    }, [isAutoPlaying]);

    return (
        <div
            ref={containerRef}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 group select-none cursor-ew-resize touch-none bg-slate-900"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
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
                        transition={{ duration: 0 }}
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-lg">
                            <path d="M5.5 3.5L19 10L11.5 12.5L9 18.5L5.5 3.5Z" fill="#2563EB" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                        {isClicking && (
                            <span className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/40 rounded-full animate-ping pointer-events-none"></span>
                        )}
                        <div className="absolute top-8 left-4 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap backdrop-blur-md border border-white/20">
                            IA de Détection
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
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded text-xs font-bold backdrop-blur z-30">Original</div>

                {/* Layer 2: Analyzed/Fake - revealed by slider */}
                <div className="absolute inset-0 w-full h-full bg-[#0f172a]" style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}>
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
                                        <div className="font-black text-sm">ALERTE CRITIQUE</div>
                                        <div className="text-[10px] font-mono opacity-80">IBAN FALSIFIÉ</div>
                                    </div>
                                </div>
                                <div className="absolute bottom-1/3 right-20 border-4 border-red-500 w-32 h-12 rounded bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse"></div>
                            </>
                        )}
                        {currentDocIndex === 1 && ( // Paie
                            <div className="absolute top-1/3 left-1/4 border-4 border-red-500 w-48 h-16 rounded bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse">
                                <div className="absolute -top-8 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">MONTANT SUSPECT</div>
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
