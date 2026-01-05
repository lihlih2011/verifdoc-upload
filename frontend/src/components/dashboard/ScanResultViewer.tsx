import React, { useState } from 'react';
import {
    CheckCircle, AlertTriangle, XCircle, FileText, User, Calendar, Shield,
    ChevronDown, ChevronUp, Share2, Download, ZoomIn, Lock
} from 'lucide-react';

interface ScanResultProps {
    result: any;
    onReset: () => void;
}

export const ScanResultViewer: React.FC<ScanResultProps> = ({ result, onReset }) => {
    const riskScore = result.risk_score || 0;
    const isSafe = riskScore < 40;
    const isFraud = riskScore >= 80;

    const flags = result.flags || [];

    // Status Logic
    const statusColor = isSafe ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
        isFraud ? "bg-red-50 text-red-800 border-red-200" : "bg-orange-50 text-orange-800 border-orange-200";
    const statusIcon = isSafe ? <CheckCircle size={24} className="text-emerald-600" /> :
        isFraud ? <XCircle size={24} className="text-red-600" /> : <AlertTriangle size={24} className="text-orange-600" />;
    const statusText = isSafe ? "Risque faible" : isFraud ? "Risque élevé" : "Risque modéré";
    const statusRing = isSafe ? "ring-emerald-100" : isFraud ? "ring-red-100" : "ring-orange-100";

    // Accordions state
    const [sections, setSections] = useState({ info: true, meta: true, risks: true });
    const toggle = (key: keyof typeof sections) => setSections(prev => ({ ...prev, [key]: !prev[key] }));

    // Fake Paywall State (Simulation)
    const isTrial = true; // Simule un utilisateur en essai

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 overflow-hidden font-sans text-slate-800">

            {/* TOOLBAR */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onReset} className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors">
                        ← Retour
                    </button>
                    <span className="h-4 w-px bg-gray-300"></span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isSafe ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <h1 className="text-sm font-bold text-slate-700 truncate max-w-[300px]">
                            {result.filename || "Document_Scan_Result.pdf"}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-all" title="Partager"><Share2 size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-all" title="Télécharger"><Download size={18} /></button>
                </div>
            </div>

            {/* MAIN CONTENT SPLIT */}
            <div className="flex flex-1 overflow-hidden">

                {/* LEFT PANEL : ANALYSIS RESULTS */}
                <div className="w-[500px] bg-white border-r border-gray-200 overflow-y-auto p-6 flex flex-col gap-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 scrollbar-thin scrollbar-thumb-gray-200">

                    {/* Header Tabs */}
                    <div className="flex gap-8 border-b border-gray-100 pb-0 mb-2">
                        <button className="text-sm font-bold text-emerald-600 border-b-2 border-emerald-500 pb-3">Analyse des risques</button>
                        <button className="text-sm font-medium text-gray-400 pb-3 hover:text-gray-600 transition-colors">Analyse du raisonnement</button>
                    </div>

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Résultats de l'analyse forensique</h2>
                        {isFraud && (
                            <button className="text-xs border border-red-200 text-red-600 px-3 py-1 rounded-full hover:bg-red-50 font-medium flex items-center gap-1">
                                <AlertTriangle size={12} /> Signaler fraude
                            </button>
                        )}
                    </div>

                    {/* STATUS BANNER (Competitor Style) */}
                    <div className={`p-4 rounded-xl border flex justify-between items-center shadow-sm ${statusColor}`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-2 bg-white rounded-full shadow-sm ring-4 ${statusRing}`}>
                                {statusIcon}
                            </div>
                            <span className="font-bold text-lg">{statusText}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm bg-white ${isSafe ? 'border-emerald-100 text-emerald-700' : 'border-red-100 text-red-700'}`}>
                            {Math.floor(riskScore)}
                        </div>
                    </div>

                    {/* SECTION 1: DOC INFO */}
                    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                        <button onClick={() => toggle('info')} className="w-full bg-gray-50/50 p-3 flex justify-between items-center text-xs font-bold uppercase text-gray-500 hover:bg-gray-100 transition-colors">
                            Informations sur le document
                            {sections.info ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {sections.info && (
                            <div className="p-4 space-y-3 bg-white text-sm">
                                <div className="flex items-start gap-4 group">
                                    <FileText size={16} className="text-gray-300 group-hover:text-blue-400 mt-1 transition-colors" />
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Nom du fichier</p>
                                        <p className="font-medium text-gray-700 break-all">{result.filename || "analyse_facture.pdf"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <span className="w-4 flex justify-center text-gray-300 font-serif font-bold group-hover:text-blue-400 transition-colors">T</span>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Type</p>
                                        <p className="font-medium text-gray-700">Document PDF (Portable Document Format)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <span className="w-4 flex justify-center text-gray-300 font-mono font-bold group-hover:text-blue-400 transition-colors">#</span>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Empreinte digitale (Hash)</p>
                                        <p className="font-mono text-xs text-gray-500 truncate max-w-[200px] bg-gray-50 px-2 py-1 rounded">{result.file_hash || "415a89444daa8039d74521..."}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: METADATA */}
                    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                        <button onClick={() => toggle('meta')} className="w-full bg-gray-50/50 p-3 flex justify-between items-center text-xs font-bold uppercase text-gray-500 hover:bg-gray-100 transition-colors">
                            Métadonnées du document
                            {sections.meta ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {sections.meta && (
                            <div className="p-4 space-y-3 bg-white text-sm">
                                <div className="flex items-start gap-4">
                                    <User size={16} className="text-gray-300 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Auteur</p>
                                        <p className="font-medium text-gray-700">{result.meta_author || "J'adore Avriljuk (Exemple)"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Calendar size={16} className="text-gray-300 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Date de création</p>
                                        <p className="font-medium text-gray-700">{result.creation_date || "2025-12-01 14:40"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION 3: RISKS & PAYWALL */}
                    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                        <button onClick={() => toggle('risks')} className="w-full bg-gray-50/50 p-3 flex justify-between items-center text-xs font-bold uppercase text-gray-500 hover:bg-gray-100 transition-colors">
                            Analyse des risques
                            {sections.risks ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {sections.risks && (
                            <div className="p-4 bg-white space-y-4">

                                {/* Detectors Summary Bar */}
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm w-fit">
                                    <Shield size={14} className="text-gray-400" />
                                    <span>135 détecteurs</span>
                                    <span className="h-3 w-px bg-gray-300 mx-1"></span>
                                    <CheckCircle size={14} className="text-emerald-500" />
                                    <span className="text-emerald-700">{135 - flags.length} passé</span>
                                    <span className="h-3 w-px bg-gray-300 mx-1"></span>
                                    <AlertTriangle size={14} className="text-orange-500" />
                                    <span className="text-orange-700">{flags.length} douteux</span>
                                </div>

                                {/* Free Trial Banner (Blue) */}
                                {isTrial && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                                        <div className="bg-blue-100 p-1.5 rounded-md h-fit shrink-0">
                                            <Shield size={16} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-blue-700 mb-1">Vous êtes inscrit à un plan d'essai</h4>
                                            <p className="text-xs text-blue-600/80 leading-relaxed">
                                                Mettez à niveau pour accéder à des informations détaillées sur les risques.
                                                Dans le cadre d'un plan d'essai, vous pouvez voir le nombre d'indicateurs mais les détails profonds sont masqués.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Critical Alerts (Red) */}
                                {flags.length > 0 && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3 items-center group cursor-pointer hover:bg-red-100 transition-colors">
                                        <div className="bg-red-100 p-1.5 rounded-full shrink-0 group-hover:bg-red-200">
                                            <XCircle size={16} className="text-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-red-700">({flags.length}) indicateurs de fraude urgents détectés</h4>
                                            <p className="text-[10px] text-red-600/70">Mettre à niveau pour voir les informations détaillées</p>
                                        </div>
                                        {isTrial && <Lock size={14} className="text-red-400" />}
                                    </div>
                                )}

                                {/* Warning Alerts (Orange) */}
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex gap-3 items-center group cursor-pointer hover:bg-orange-100 transition-colors">
                                    <div className="bg-orange-100 p-1.5 rounded-full shrink-0 group-hover:bg-orange-200">
                                        <AlertTriangle size={16} className="text-orange-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-orange-800">(2) indicateurs de risque trouvés</h4>
                                        <p className="text-[10px] text-orange-700/70">Mettre à niveau pour voir les informations détaillées</p>
                                    </div>
                                    {isTrial && <Lock size={14} className="text-orange-400" />}
                                </div>

                                {/* Paywall Button */}
                                {isTrial && (
                                    <button className="w-full bg-[#2d76b3] hover:bg-[#256296] text-white py-3 rounded-lg font-bold text-sm shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                                        <Lock size={16} />
                                        Débloquer des informations complètes sur les risques
                                    </button>
                                )}
                                {isTrial && <p className="text-center text-[10px] text-slate-400">À partir de seulement 49 $/mois</p>}

                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL : DOCUMENT VIEWER */}
                <div className="flex-1 bg-gray-100/50 p-8 flex flex-col items-center overflow-y-auto relative scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thin">
                    <div className="bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full max-w-[700px] min-h-[900px] rounded-sm relative transition-transform hover:scale-[1.005] duration-500 border border-gray-200/50">
                        {/* Placeholder for Document (Ideally iframe or img) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                            {result.file_preview_url ? (
                                <img src={result.file_preview_url} alt="Document Preview" className="w-full h-full object-contain" />
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        <FileText size={40} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-gray-400 font-medium text-lg">Prévisualisation du document</h3>
                                    <p className="text-sm text-gray-300 mt-2 max-w-[200px] mx-auto">Le document analysé s'affichera ici en haute définition.</p>
                                </>
                            )}
                        </div>

                        {/* Page Number Badge */}
                        <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 px-3 py-1 rounded text-xs font-mono font-medium border border-gray-200">
                            Page 1
                        </div>
                    </div>

                    {/* Zoom Controls Overlay (Floating like Material Design) */}
                    <div className="fixed bottom-8 right-8 bg-white shadow-xl rounded-full px-4 py-2.5 flex items-center gap-4 text-gray-600 border border-gray-100 z-50 hover:shadow-2xl transition-shadow">
                        <button className="hover:text-black font-bold p-1">-</button>
                        <span className="text-xs font-mono font-bold text-gray-400 select-none">100%</span>
                        <button className="hover:text-black font-bold p-1">+</button>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button className="hover:text-blue-600 p-1"><ZoomIn size={18} /></button>
                    </div>
                </div>

            </div>
        </div>
    );
};
