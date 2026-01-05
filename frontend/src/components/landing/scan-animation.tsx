
export default function ScanAnimation() {
    return (
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl bg-gray-900 border border-gray-800 shadow-2xl">
            {/* Fake Toolbar */}
            <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-800/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-4 h-2 w-32 rounded-full bg-gray-700"></div>
            </div>

            {/* Document Area */}
            <div className="relative p-8 md:p-12 min-h-[500px] flex justify-center items-center bg-gray-900/80">

                {/* The Document */}
                <div className="relative w-full max-w-sm shadow-lg rounded-sm overflow-hidden">
                    <img
                        src="/images/payslip_fraud.png"
                        alt="Fiche de paie analysée"
                        className="w-full h-auto object-cover opacity-90"
                    />

                    {/* Fraud Highlight Overlay - Appears after scan */}
                    <div className="absolute top-[75%] right-[10%] w-[30%] h-[5%] border-4 border-red-500 bg-red-500/20 rounded animate-[pulse_1s_infinite] shadow-[0_0_15px_rgba(239,68,68,0.8)] opacity-0 animate-[appear_4s_forwards]">
                        <span className="absolute -top-8 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            FRAUDE DÉTECTÉE
                        </span>
                    </div>
                </div>

                {/* Scanning Line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

                {/* Status Box */}
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/95 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm font-mono flex items-center justify-between shadow-lg backdrop-blur-sm z-30">
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="font-bold">ALERTE CRITIQUE</span>
                    </div>
                    <span>Net à Payer incohérent</span>
                </div>
            </div>

            <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          50% { top: 100%; opacity: 1; }
          90% { opacity: 1; }
        }
        @keyframes appear {
            0%, 50% { opacity: 0; }
            51% { opacity: 1; }
            100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
}
