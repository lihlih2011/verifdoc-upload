import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ScanLine, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const DEMO_DOCS = [
  { src: "/demo/doc_pay.png", name: "Bulletin de Paie", status: "safe", confidence: "99.8%" },
  { src: "/demo/doc_secu.jpg", name: "Attestation Sécu", status: "safe", confidence: "98.5%" },
  { src: "/demo/doc_pole_emploi.jpg", name: "Attestation Pôle Emploi", status: "warning", confidence: "Low Trust" }, // Juste pour l'exemple
  { src: "/demo/doc_commande.jpg", name: "Bon de Commande", status: "safe", confidence: "99.2%" },
];

export default function HeroHome() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  // Rotation automatique des documents
  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(false); // Reset scan
      setTimeout(() => {
        setCurrentDocIndex((prev) => (prev + 1) % DEMO_DOCS.length);
        setIsScanning(true); // Restart scan
      }, 500);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentDoc = DEMO_DOCS[currentDocIndex];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black min-h-[90vh] flex items-center justify-center font-outfit">

      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 invert mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none"></div>

      {/* Moving Glow following mouse */}
      <div
        className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none transition-transform duration-75 ease-out mix-blend-screen"
        style={{
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT COLUMN: TEXT & CTA */}
        <div className="text-center lg:text-left">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-gray-300 mb-8 animate-fade-in-up hover:bg-white/10 transition-colors cursor-default shadow-glow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide text-xs uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {t("hero.certified")}
            </span>
          </div>

          <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            {t("hero.title_part1")}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">
              {t("hero.title_part2")}
            </span>
          </h1>

          <p className="mb-8 text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed whitespace-pre-line">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/signup"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden transition-all hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>{t("hero.cta_verify")}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-2">{t("hero.trial_details")}</span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-zinc-300 font-medium hover:text-white transition-colors hover:bg-white/5 rounded-xl"
            >
              <PlayIcon className="w-4 h-4" />
              {t("hero.cta_demo")}
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* TRUST BADGES PLACEHOLDERS */}
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /><span>ISO 27001</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /><span>GDPR Compliant</span></div>
            <div className="text-sm font-mono border border-white/20 px-2 py-1 rounded">API READY</div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCANNER DEMO */}
        <div className="relative mx-auto w-full max-w-[500px] aspect-[3/4] perspective-1000 group">

          {/* Phone/Scanner Frame */}
          <div className="relative w-full h-full bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm transform transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-6">

            {/* Header UI of Scanner */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between px-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-red-400 tracking-wider">LIVE ANALYSIS</span>
              </div>
              <ScanLine className="text-white/50 w-5 h-5 animate-pulse" />
            </div>

            {/* Document Image */}
            <div className="relative w-full h-full p-8 flex items-center justify-center bg-zinc-950">
              <div className="relative w-full h-full shadow-2xl overflow-hidden rounded-lg bg-white">
                <img
                  src={currentDoc.src}
                  alt={currentDoc.name}
                  className="w-full h-full object-contain md:object-cover transition-opacity duration-500"
                  style={{ opacity: isScanning ? 1 : 0.5 }}
                />

                {/* Scanning Laser Beam */}
                {isScanning && (
                  <div className="absolute top-0 left-0 w-full h-2 bg-purple-500/50 blur-[4px] shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-scan-down z-10"></div>
                )}

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 pointer-events-none"></div>
              </div>
            </div>

            {/* Footer UI: Analysis Result */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
              <div className={`
                        flex items-center justify-between p-4 rounded-xl border backdrop-blur-md transition-all duration-500 transform
                        ${!isScanning ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                        ${currentDoc.status === 'safe' ? 'bg-emerald-950/50 border-emerald-500/30' : 'bg-red-950/50 border-red-500/30'}
                    `}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${currentDoc.status === 'safe' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {currentDoc.status === 'safe' ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{currentDoc.name}</h3>
                    <p className={`text-xs ${currentDoc.status === 'safe' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {currentDoc.status === 'safe' ? 'Document Authentique' : 'Anomalies Détectées'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white tracking-tighter">{currentDoc.confidence}</div>
                  <div className="text-[10px] text-zinc-500 uppercase">Trust Score</div>
                </div>
              </div>

              {/* Processing State */}
              <div className={`absolute bottom-8 left-0 right-0 text-center transition-opacity duration-300 ${isScanning ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-sm font-mono text-purple-400 animate-pulse">Scanning document logic...</span>
              </div>

            </div>

          </div>

          {/* Decoration Blobs behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-purple-600/20 blur-[80px] -z-10 rounded-full mix-blend-screen pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

function ChevronRightIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
  )
}
