import API_URL from "../../config/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import UploadZone from "../../components/dashboard/UploadZone";
import PageMeta from "../../components/common/PageMeta";
import PricingModal from "../../components/dashboard/PricingModal";
import CertificateView from "../../components/dashboard/CertificateView"; // Added import
import { ShieldCheck } from "lucide-react";
import { ScanResultViewer } from "../../components/dashboard/ScanResultViewer";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [clientData, setClientData] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const balanceRes = await axios.get(`${API_URL}/api/billing/balance`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientData(balanceRes.data);
      } catch (e) {
        console.error("Failed to fetch balance");
      }
    };
    fetchData();
  }, [searchParams]); // Re-fetch on payment success (url change triggers this sometimes if we navigate, but explicit check above is better)

  // Payment Success Handler
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success' || paymentStatus === 'success_simulated') {
      alert("Paiement réussi ! Vos crédits ont été ajoutés.");
      window.history.replaceState({}, '', '/dashboard');
      // Force refresh data
      window.location.reload();
    }
  }, [searchParams]);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
  };

  // ... (Keep handleDownloadReport as is)

  const handleDownloadReport = async () => {
    if (!analysisResult?.file_path) return;
    const url = `${API_URL}${analysisResult.file_path}`;
    try {
      const btn = document.getElementById('btn-download');
      if (btn) btn.innerText = "Téléchargement...";

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erreur serveur (${response.status})`);

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      const filename = analysisResult.file_path.split('/').pop() || "rapport_verifdoc.pdf";
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      if (btn) btn.innerText = "Télécharger le Rapport Certifié";
    } catch (err) {
      alert("Impossible de télécharger le rapport : " + err);
      console.error(err);
      const btn = document.getElementById('btn-download');
      if (btn) btn.innerText = "Erreur - Réessayer";
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-black min-h-screen text-gray-200">
      <PageMeta
        title="Dashboard | VerifDoc"
        description="Analysez vos documents avec notre moteur IA forensique."
      />

      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-nacelle text-white">
              Analyse & Certification
            </h1>
            <p className="text-gray-400 mt-1">
              Tableau de bord utilisateur
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg border border-gray-700 transition-colors">
              Documentation API
            </button>
          </div>
        </div>

        {/* --- CLIENT STATS --- */}
        {clientData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-50"><BoxIcon className="w-12 h-12 text-gray-800 group-hover:text-primary-900 transition-colors" /></div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Solde Crédits</p>
              <h3 className="text-4xl font-bold text-white mb-2">{clientData.credits}</h3>
              <button
                onClick={() => setIsPricingOpen(true)}
                className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1"
              >
                Recharger le compte <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        )}

        <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

        {/* --- MAIN ACTION AREA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Upload Zone (Left - 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-4">Nouvelle Analyse</h2>
              <UploadZone onAnalysisComplete={handleAnalysisComplete} />
            </div>

            {/* Conclusions Panel */}
            {analysisResult && (
              analysisResult.ai_report && analysisResult.ai_report.ai_probability_score > 50 ? (
                <div className="rounded-2xl border border-red-900 bg-red-950/20 p-6 overflow-hidden">
                  {/* @ts-ignore */}
                  <ScanResultViewer result={analysisResult} onReset={() => setAnalysisResult(null)} />
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 overflow-hidden">
                  {/* ... standard content ... */}
                  <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-4">
                    <div className={`p-2 rounded-lg ${analysisResult.verdict === 'verdict_valid' ? 'bg-green-500/10 text-green-500' :
                      analysisResult.verdict === 'verdict_reject' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Conclusions de l'Audit</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Réf: {analysisResult.document_id?.substring(0, 12)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Statut de Conformité</h4>
                      <p className={`text-lg font-medium leading-relaxed ${analysisResult.verdict === 'verdict_valid' ? 'text-green-400' :
                        analysisResult.verdict === 'verdict_reject' ? 'text-red-400' : 'text-orange-400'
                        }`}>
                        {analysisResult.verdict === 'verdict_valid' ? "CERTIFICATION DE CONFORMITÉ ACCORDÉE" :
                          analysisResult.verdict === 'verdict_reject' ? "REJET POUR NON-CONFORMITÉ MAJEURE" :
                            "SIGNALEMENT D'ANOMALIE - VÉRIFICATION REQUISE"}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Motifs de la Décision</h4>
                      <p className="text-gray-400 text-sm leading-7">
                        {analysisResult.message || "Aucune observation particulière. Le document respecte les standards d'intégrité numérique."}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Results / Certification (Right - 1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {analysisResult ? (
              <CertificateView
                analysisResult={analysisResult}
                onDownload={handleDownloadReport}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/50 p-12 text-center h-full flex flex-col items-center justify-center text-gray-500 min-h-[400px]">
                <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-medium text-lg">Aucune analyse sélectionnée</p>
                <p className="text-xs mt-2 opacity-50 max-w-[200px]">Importez un document ou sélectionnez une analyse récente pour voir le certificat.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
