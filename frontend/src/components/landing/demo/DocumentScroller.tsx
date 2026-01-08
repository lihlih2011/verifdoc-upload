import { useEffect, useRef } from 'react';

const DOCUMENTS = [
    {
        id: 1,
        title: "FICHE DE PAIE",
        image: "/images/demo/demo_payslip.png",
        status: "FRAUDE DÉTECTÉE",
        isFraud: true,
        fraudBox: { top: '35%', left: '60%', width: '30%', height: '10%' }
    },
    {
        id: 2,
        title: "TITRE DE SÉJOUR",
        image: "/images/demo/demo_id_card.jpg",
        status: "AUTHENTIQUE",
        isFraud: false
    },
    {
        id: 3,
        title: "ATTESTATION PÔLE EMPLOI",
        image: "/images/demo/demo_pole_emploi.jpg",
        status: "FRAUDE DÉTECTÉE",
        isFraud: true,
        fraudBox: { top: '55%', left: '70%', width: '25%', height: '5%' }
    },
    {
        id: 4,
        title: "ATTESTATION CAF",
        image: "/images/demo/demo_caf.png",
        status: "AUTHENTIQUE",
        isFraud: false
    },
    {
        id: 5,
        title: "CERTIFICAT DE TRAVAIL",
        image: "/images/demo/demo_certificat_travail.jpg",
        status: "FRAUDE DÉTECTÉE",
        isFraud: true,
        fraudBox: { top: '75%', left: '20%', width: '40%', height: '15%' }
    },
    {
        id: 6,
        title: "FACTURE BÂTIMENT",
        image: "/images/demo/demo_facture_bati.jpg",
        status: "SUSPECT",
        isFraud: true,
        fraudBox: { top: '45%', left: '65%', width: '25%', height: '8%' }
    },
    {
        id: 7,
        title: "INDEMNITÉS CPAM",
        image: "/images/demo/demo_cpam_ij.jpg",
        status: "AUTHENTIQUE",
        isFraud: false
    },
    {
        id: 8,
        title: "DIPLÔME",
        image: "/images/demo/demo_diploma.jpg",
        status: "ALERTE MODÉRÉE",
        isFraud: true,
        fraudBox: { top: '60%', left: '40%', width: '20%', height: '10%' }
    }
];

export default function DocumentScroller() {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;

        // Speed calculation - INCREASED SPEED as requested
        const speed = 1.2;
        let position = 0;

        const animate = () => {
            if (!scrollerRef.current) return;
            position -= speed;

            // Infinite loop logic
            if (position <= -scrollerRef.current.scrollWidth / 3) {
                position = 0;
            }

            scrollerRef.current.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Triple the list for smoother infinite loop
    const DISPLAY_ITEMS = [...DOCUMENTS, ...DOCUMENTS, ...DOCUMENTS];

    return (
        <div className="w-full overflow-hidden bg-slate-900/40 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative group">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900/90 to-transparent z-20"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900/90 to-transparent z-20"></div>

            {/* Scan Line Overlay (Global) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 blur-[2px] animate-[scan_2s_linear_infinite] z-30 pointer-events-none opacity-50"></div>

            <div className="flex gap-4 py-8 animate-scroll will-change-transform" ref={scrollerRef}>
                {DISPLAY_ITEMS.map((doc, idx) => (
                    <div
                        key={`${doc.id}-${idx}`}
                        className="flex-shrink-0 w-48 aspect-[3/4] bg-slate-800 rounded-xl border border-white/5 overflow-hidden relative group/card hover:scale-105 transition-transform duration-300"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-2 right-2 z-10">
                            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-md ${doc.isFraud
                                    ? 'bg-red-500/90 border-red-400 text-white animate-pulse'
                                    : 'bg-emerald-500/80 border-emerald-400 text-white'
                                }`}>
                                {doc.status}
                            </span>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-full">
                            <img
                                src={doc.image}
                                alt={doc.title}
                                className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity"
                            />

                            {/* FRAUD BOX OVERLAY (Simulated) */}
                            {doc.isFraud && doc.fraudBox && (
                                <div
                                    className="absolute border-2 border-red-500 bg-red-500/20 z-20 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse"
                                    style={{
                                        top: doc.fraudBox.top,
                                        left: doc.fraudBox.left,
                                        width: doc.fraudBox.width,
                                        height: doc.fraudBox.height
                                    }}
                                >
                                    <div className="absolute -top-3 left-0 bg-red-600 text-[6px] text-white px-1 font-bold rounded">
                                        ANOMALY
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Overlay Gradient for Title */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-8">
                            <h3 className="text-white font-bold text-xs text-center">{doc.title}</h3>
                        </div>

                        {/* Local Scan Effect on Hover */}
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
