import { useState, useCallback, useEffect } from 'react';
import { UploadCloud, FileText, CheckCircle2, ArrowRight, Lock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrialManager } from '../../../utils/fingerprint';

export default function FreeTrialUpload() {
    const [status, setStatus] = useState<'idle' | 'scanning' | 'complete' | 'limit_reached' | 'error'>('idle');
    const [fileName, setFileName] = useState('');
    const [remaining, setRemaining] = useState<number | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check eligibility on mount
        TrialManager.checkEligibility().then(status => {
            setRemaining(status.remaining);
            if (!status.allowed) {
                setStatus('limit_reached');
            }
        });
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (status === 'limit_reached') return;

        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    }, [status]);

    const handleFile = async (file: File) => {
        if (status === 'limit_reached') return;

        // Double check before starting
        const check = await TrialManager.checkEligibility();
        if (!check.allowed) {
            setStatus('limit_reached');
            return;
        }

        // Consume trial early
        const newRemaining = await TrialManager.consumeTrial();
        setRemaining(newRemaining);

        setFileName(file.name);
        setStatus('scanning');

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Determine API URL (Use relative path in Prod for Caddy routing)
            const apiUrl = import.meta.env.VITE_API_URL || '';

            const response = await fetch(`${apiUrl}/api/public/analyze`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erreur analyse');
            }

            const result = await response.json();
            setAnalysisResult(result);
            setStatus('complete');

        } catch (error) {
            console.error("Analysis Failed:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-lg mt-8 mb-8">
            <div className={`bg-slate-900/60 backdrop-blur-md border ${status === 'limit_reached' ? 'border-red-500/30' : 'border-blue-500/30'} rounded-2xl p-1 shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors`}>

                {/* Glowing Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>

                <div className="relative bg-slate-950/90 rounded-xl p-6 overflow-hidden min-h-[300px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={onDrop}
                            >
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                    {remaining !== null ? `${remaining} ESSAIS RESTANTS` : 'CHARGEMENT...'}
                                </div>

                                <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer"
                                    onClick={() => document.getElementById('free-upload')?.click()}>
                                    <UploadCloud className="text-blue-500" size={32} />
                                </div>

                                <h3 className="text-white font-bold text-lg mb-2">Analysez un document maintenant</h3>
                                <p className="text-slate-400 text-sm mb-6">
                                    Glissez-déposez ou cliquez pour vérifier une Fiche de Paie, RIB, Identité...
                                </p>

                                <input
                                    type="file"
                                    id="free-upload"
                                    className="hidden"
                                    onChange={handleFileInput}
                                    accept=".pdf,.jpg,.png,.jpeg"
                                />

                                <label htmlFor="free-upload" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg cursor-pointer transition-colors shadow-lg shadow-blue-900/20">
                                    Lancer l'analyse gratuite
                                </label>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <AlertTriangle className="mx-auto text-red-500 mb-4" size={40} />
                                <h3 className="text-white font-bold mb-2">Erreur d'analyse</h3>
                                <p className="text-slate-400 text-sm">Le serveur est peut-être indisponible.</p>
                            </motion.div>
                        )}

                        {status === 'limit_reached' && (
                            <motion.div
                                key="limit"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-red-500/50">
                                    <Lock className="text-red-500" size={32} />
                                </div>

                                <h3 className="text-white font-bold text-xl mb-2">Limite atteinte</h3>
                                <p className="text-slate-400 text-sm mb-6 px-4">
                                    Vous avez utilisé vos 3 essais gratuits depuis cet appareil. Pour continuer à sécuriser vos dossiers, passez au niveau supérieur.
                                </p>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    Créer un compte gratuit <ArrowRight size={16} />
                                </button>
                                <p className="text-[10px] text-slate-500 mt-3">
                                    Aucune carte bancaire requise.
                                </p>
                            </motion.div>
                        )}

                        {status === 'scanning' && (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-4"
                            >
                                <div className="relative w-20 h-20 mb-6">
                                    <div className="absolute inset-0 border-4 border-slate-700/50 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                                    <FileText className="absolute inset-0 m-auto text-blue-400 animate-pulse" size={24} />
                                </div>

                                <h3 className="text-white font-bold text-lg mb-1 animate-pulse">Analyse en cours...</h3>
                                <p className="text-slate-400 text-xs font-mono">{fileName}</p>

                                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-6 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3, ease: "linear" }}
                                    />
                                </div>
                                <div className="mt-2 text-xs text-blue-400/80 font-mono">
                                    Vérification Forensique des Pixels...
                                </div>
                            </motion.div>
                        )}

                        {status === 'complete' && analysisResult && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ring-1 ${analysisResult.verdict === 'VALID' ? 'bg-emerald-500/10 ring-emerald-500/50' :
                                    analysisResult.verdict === 'SUSPECT' ? 'bg-yellow-500/10 ring-yellow-500/50' :
                                        'bg-red-500/10 ring-red-500/50'
                                    }`}>
                                    {analysisResult.verdict === 'VALID' ? <CheckCircle2 className="text-emerald-500" size={32} /> :
                                        analysisResult.verdict === 'SUSPECT' ? <AlertTriangle className="text-yellow-500" size={32} /> :
                                            <AlertTriangle className="text-red-500" size={32} />
                                    }
                                </div>

                                <h3 className="text-white font-bold text-xl mb-2">
                                    {analysisResult.verdict === 'VALID' ? 'Document Authentique' :
                                        analysisResult.verdict === 'SUSPECT' ? 'Anomalies Détectées' :
                                            'Risque de Fraude Élevé'}
                                </h3>

                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-slate-400 text-xs uppercase font-bold">Score de Confiance</span>
                                        <span className={`font-mono font-bold ${analysisResult.confidence > 80 ? 'text-emerald-400' :
                                            analysisResult.confidence > 50 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>{analysisResult.confidence}/100</span>
                                    </div>
                                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${analysisResult.confidence > 80 ? 'bg-emerald-500' :
                                                analysisResult.confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${analysisResult.confidence}%` }}
                                        ></div>
                                    </div>
                                    <ul className="text-left text-[10px] text-slate-500 mt-2 space-y-1">
                                        {analysisResult.details && analysisResult.details.length > 0 ? (
                                            analysisResult.details.map((detail: string, i: number) => (
                                                <li key={i} className="text-red-400">• {detail}</li>
                                            ))
                                        ) : (
                                            <li>• Aucune anomalie critique détectée.</li>
                                        )}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className="w-full py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    Voir le rapport complet <ArrowRight size={16} />
                                </button>
                                <p className="text-xs text-slate-500 mt-2">
                                    {remaining !== null ? `${remaining} essais restants` : ''}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
