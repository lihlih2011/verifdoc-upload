// --- COMPONENTS ---
import { useEffect, useState, useRef } from 'react';
import { Users, FileScan, ShieldAlert, CheckCircle } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

export default function LiveStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Simulation de données "Live"
    const [scans, setScans] = useState(45892);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.5) { // More frequent updates
                setScans(prev => prev + Math.floor(Math.random() * 3) + 1);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        {
            id: 1,
            label: "Adhérents Actifs",
            prefix: "Plus de ",
            value: 1240,
            icon: <Users className="w-6 h-6 text-blue-400" />,
            color: "blue"
        },
        {
            id: 2,
            label: "Scans Réalisés",
            value: scans,
            icon: <FileScan className="w-6 h-6 text-purple-400" />,
            color: "purple",
            live: true
        },
        {
            id: 3,
            label: "Fraudes Détectées",
            value: 3402,
            icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
            color: "red"
        },
        {
            id: 4,
            label: "Documents Conformes",
            value: 42490,
            icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
            color: "emerald"
        }
    ];

    return (
        <section ref={ref} className="py-12 bg-[#020617] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="relative flex flex-col items-center justify-center p-8 bg-[#0b1121] rounded-2xl border border-slate-800 backdrop-blur-sm group hover:border-slate-700 transition-all shadow-lg shadow-black/20">
                            {/* Icon Container with Glow */}
                            <div className={`mb-6 p-4 rounded-full bg-${stat.color}-500/10 border border-${stat.color}-500/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500`}>
                                {stat.icon}
                            </div>

                            {/* Number */}
                            <div className="text-3xl lg:text-4xl font-black text-white mb-3 text-center tracking-tight notranslate">
                                {stat.prefix && <span className="block text-xl font-medium text-slate-400 mb-1">{stat.prefix}</span>}
                                {isInView ? (
                                    <CountUp
                                        start={stat.live ? stat.value - 100 : 0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator=" "
                                        preserveValue={true}
                                    />
                                ) : '0'}
                            </div>

                            {/* Label */}
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                                {stat.label}
                            </div>

                            {/* Live Badge */}
                            {stat.live && (
                                <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 font-bold animate-pulse">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    EN DIRECT
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
