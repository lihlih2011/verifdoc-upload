import React, { useState, useRef } from "react";
import API_URL from "../../config/api";
import axios from "axios";

interface UploadZoneProps {
    onAnalysisComplete: (result: any) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onAnalysisComplete }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [totalFiles, setTotalFiles] = useState(0);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [processedCount, setProcessedCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleBatchUpload(Array.from(e.dataTransfer.files));
        }
    };

    const handleClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleBatchUpload(Array.from(e.target.files));
            e.target.value = "";
        }
    };

    const handleBatchUpload = async (files: File[]) => {
        setIsUploading(true);
        setError(null);
        setTotalFiles(files.length);
        setCurrentFileIndex(0);
        setProcessedCount(0);

        for (let i = 0; i < files.length; i++) {
            setCurrentFileIndex(i + 1);
            await uploadSingleFile(files[i]);
            setProcessedCount(prev => prev + 1);
        }

        setIsUploading(false);
        setTotalFiles(0);
    };

    const uploadSingleFile = async (file: File) => {
        setProgress(0);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("token");
            // Fake progress for UI responsiveness
            const simulateProgress = setInterval(() => {
                setProgress(prev => (prev >= 90 ? 90 : prev + 10));
            }, 200);

            const response = await axios.post(`${API_URL}/api/vds/analyze`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            clearInterval(simulateProgress);
            setProgress(100);
            onAnalysisComplete(response.data); // Notify parent (Home)

        } catch (err: any) {
            console.error("Upload error for file", file.name, err);
            setError(`Erreur sur ${file.name}: ${err.message}`);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`relative group cursor-pointer flex flex-col items-center justify-center w-full min-h-[300px] rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out overflow-hidden
                    ${isDragOver
                        ? "border-primary-500 bg-primary-900/10 scale-[1.01]"
                        : "border-gray-700 bg-gray-900/50 hover:border-primary-500/50 hover:bg-gray-800/50"
                    }
                    ${isUploading ? "pointer-events-none opacity-90" : ""}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                />

                <div className="relative z-10 flex flex-col items-center p-8 text-center space-y-4">

                    {isUploading ? (
                        <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-300">

                            {/* Scanning Animation */}
                            <div className="relative w-20 h-20 mb-6">
                                <div className="absolute inset-0 border-4 border-gray-800 rounded-lg"></div>
                                <div className="absolute inset-x-0 h-[2px] bg-primary-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-scan"></div>
                                {/* Document Icon Background */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">
                                Analyse IA en cours ({currentFileIndex}/{totalFiles})
                            </h3>
                            <p className="text-sm text-primary-300 mb-6">Extraction des métadonnées & détection de fraudes</p>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-400 font-mono">{progress}% COMPLETED</div>
                        </div>
                    ) : (
                        <>
                            {/* Icon Wrapper */}
                            <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700 shadow-inner group-hover:scale-110 group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-all duration-300">
                                <svg className="w-10 h-10 text-gray-400 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                                    Scanner un document
                                </h3>
                                <p className="text-gray-400 max-w-sm mx-auto group-hover:text-gray-300 transition-colors">
                                    Glissez-déposez votre fichier ici, ou <span className="text-primary-400 underline decoration-primary-500/30 underline-offset-4">parcourez vos fichiers</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>PDF</span>
                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>JPG</span>
                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>PNG</span>
                                <span className="flex items-center gap-1 text-gray-600">Max 10MB</span>
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="absolute bottom-6 left-0 right-0 px-6 animate-in slide-in-from-bottom-2">
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadZone;
