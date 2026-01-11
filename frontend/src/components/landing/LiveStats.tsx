import { useEffect, useState, useRef } from 'react';
import { Users, FileScan, ShieldAlert, CheckCircle } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

export default function LiveStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Simulation de données "Live" qui augmentent doucement
    const [scans, setScans] = useState(45892);

    useEffect(() => {
        const interval = setInterval(() => {
            // Ajoute un scan aléatoire toutes les quelques secondes
            if (Math.random() > 0.7) {
                setScans(prev => prev + 1);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        {
            id: 1,
            label: "Adhérents Actifs",
            value: 1240,
            icon: <Users className="w-6 h-6 text-blue-400" />,
            suffix: "+"
        },
        {
            id: 2,
            label: "Scans Réalisés",
            value: scans,
            icon: <FileScan className="w-6 h-6 text-purple-400" />,
            suffix: "",
            live: true
        },
        {
            id: 3,
            label: "Fraudes Détectées",
            value: 3402,
            icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
            suffix: ""
        },
        {
            id: 4,
            label: "Documents Conformes",
            value: 42490,
            icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
            suffix: ""
        }
    ];

    return (
        <section ref={ref} className="py-12 bg-gray-950 border-y border-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
                            <div className="mb-4 p-3 bg-gray-800 rounded-full group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator=","
                                        suffix={stat.suffix}
                                    />
                                ) : '0'}
                            </div>
                            <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wide">
                                {stat.label}
                            </div>
                            {stat.live && (
                                <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-green-900/30 border border-green-500/30 rounded text-[10px] text-green-400 font-bold animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    LIVE
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
