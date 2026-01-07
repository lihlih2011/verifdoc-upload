
import { type FC } from 'react';
import { Download, CheckCircle, XCircle, AlertTriangle, QrCode } from 'lucide-react';

interface AnalysisResult {
    verdict: string;
    confidence: number;
    message: string;
    document_id?: string;
    file_path?: string;
    created_at: string;
    sector?: string;
    file_hash?: string; // e.g. SHA256
}

interface CertificateViewProps {
    analysisResult: AnalysisResult;
    onDownload: () => void;
}

const CertificateView: FC<CertificateViewProps> = ({ analysisResult, onDownload }) => {
    const isValid = analysisResult.verdict === 'verdict_valid';
    const isReject = analysisResult.verdict === 'verdict_reject';

    const statusColor = isValid ? 'text-green-500' : isReject ? 'text-red-500' : 'text-orange-500';
    const statusBg = isValid ? 'bg-green-500' : isReject ? 'bg-red-500' : 'bg-orange-500';
    const statusBorder = isValid ? 'border-green-500' : isReject ? 'border-red-500' : 'border-orange-500';

    return (
        <div className="sticky top-24">
            <div className="relative rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl">

                {/* Decorative Background - "Guilloche" feel via gradients */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>
                <div className={`absolute top-0 w-full h-1 ${statusBg}`} />

                {/* --- HEADER --- */}
                <div className="relative p-8 pb-4 text-center border-b border-white/5">
                    <div className="absolute top-6 right-6 opacity-50">
                        <QrCode className="w-12 h-12 text-zinc-600" />
                    </div>

                    <img src="/images/verifdoc-logo-real.png" className="h-16 mx-auto mb-4 drop-shadow-lg" alt="VerifDoc Seal" />

                    <h2 className="text-xl font-bold text-white tracking-[0.2em] font-serif uppercase">Certificat d'Analyse</h2>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">
                        REF: {analysisResult.document_id?.toUpperCase() || "DOC-0000-XXXX"}
                    </div>
                </div>

                {/* --- BODY --- */}
                <div className="p-8 space-y-8 relative">

                    {/* VERDICT STAMP */}
                    <div className="flex flex-col items-center justify-center">
                        <div className={`w-32 h-32 rounded-full border-4 ${statusBorder} flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500`}>
                            {isValid ? <CheckCircle className="w-10 h-10 text-green-500 mb-1" /> :
                                isReject ? <XCircle className="w-10 h-10 text-red-500 mb-1" /> :
                                    <AlertTriangle className="w-10 h-10 text-orange-500 mb-1" />}

                            <span className={`text-lg font-black tracking-tighter ${statusColor}`}>
                                {isValid ? "CONFORME" : isReject ? "NON CONFORME" : "SUSPECT"}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono mt-1">Trust Score: {(analysisResult.confidence * 100).toFixed(1)}%</span>
                        </div>
                    </div>

                    {/* DETAILS GRID */}
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Document</p>
                            <p className="font-medium text-white truncate" title={analysisResult.file_path}>
                                {analysisResult.file_path?.split('/').pop() || "scan.pdf"}
                            </p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Date d'émission</p>
                            <p className="font-medium text-white font-mono">
                                {new Date(analysisResult.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Secteur</p>
                            <p className="font-medium text-white capitalize">{analysisResult.sector || "General"}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Empreinte (Hash)</p>
                            <p className="font-medium text-zinc-400 font-mono text-[10px] truncate max-w-[120px] ml-auto">
                                {analysisResult.file_hash || "e3b0c44298fc1c149afbf4..."}
                            </p>
                        </div>
                    </div>

                    {/* CONCLUSION */}
                    <div className={`p-4 rounded-lg border ${isValid ? 'bg-green-500/5 border-green-500/20' : isReject ? 'bg-red-500/5 border-red-500/20' : 'bg-orange-500/5 border-orange-500/20'}`}>
                        <p className="text-xs text-zinc-300 leading-relaxed text-center italic">
                            "{analysisResult.message || "Analyse complétée avec succès."}"
                        </p>
                    </div>

                </div>

                {/* --- FOOTER --- */}
                <div className="bg-zinc-900/80 p-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono uppercase">
                        <span>Signé par VerifDoc AI Engine</span>
                        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div> Secure Blob</span>
                    </div>

                    <button
                        onClick={onDownload}
                        className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold tracking-widest text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        <Download size={16} />
                        Télécharger le PDF Certifié
                    </button>
                </div>

            </div>

            {/* Shadow Reflection Effect */}
            <div className={`mx-auto w-[90%] h-4 rounded-[100%] blur-xl opacity-40 -mt-2 ${statusBg}`}></div>
        </div>
    );
};

export default CertificateView;
