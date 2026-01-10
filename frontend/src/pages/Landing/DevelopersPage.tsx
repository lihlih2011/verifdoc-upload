import { Terminal, Code2, Copy, CheckCircle2, Zap, Lock, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function DevelopersPage() {
    const [activeTab, setActiveTab] = useState('curl');
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        navigator.clipboard.writeText(`curl -X POST https://api.verifdoc.io/v1/analyze \\
  -H "Authorization: Bearer sk_test_..." \\
  -F "file=@document.pdf"`);
    };

    return (
        <div className="pt-24 min-h-screen bg-[#0B0F17] text-white font-sans">

            {/* HERO */}
            <section className="relative px-6 py-20 text-center max-w-5xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6 tracking-wider uppercase">
                    <Terminal size={12} />
                    Developer Hub
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Intégrez la détection de fraude <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">en moins de 5 minutes</span>
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Une API RESTful simple, typée et documentée pour automatiser vos contrôles documentaires. Webhooks inclus.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/login" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-600/20">
                        Obtenir une Clé API
                    </a>
                    <a href="https://api.verifdoc.io/docs" target="_blank" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                        <BookOpen size={18} /> Documentation Complète
                    </a>
                </div>
            </section>

            {/* CODE PREVIEW */}
            <section className="px-6 pb-24 max-w-5xl mx-auto">
                <div className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                    <div className="flex border-b border-slate-700 bg-[#0F172A]">
                        {['curl', 'python', 'node'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-mono transition-colors ${activeTab === tab ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800' : 'text-slate-400 hover:text-white'}`}
                            >
                                {tab === 'curl' ? 'cURL' : tab === 'python' ? 'Python' : 'Node.js'}
                            </button>
                        ))}
                        <div className="flex-1"></div>
                    </div>
                    <div className="p-6 font-mono text-sm overflow-x-auto relative group">
                        <button onClick={copyCode} className="absolute top-4 right-4 p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors opacity-0 group-hover:opacity-100">
                            {copied ? <CheckCircle2 className="text-emerald-400" size={16} /> : <Copy className="text-slate-300" size={16} />}
                        </button>

                        {activeTab === 'curl' && (
                            <pre className="text-blue-300">
                                <span className="text-purple-400">curl</span> -X POST https://api.verifdoc.io/v1/analyze \<br />
                                {'  '}-H <span className="text-emerald-300">"Authorization: Bearer sk_test_..."</span> \<br />
                                {'  '}-F <span className="text-emerald-300">"file=@document.pdf"</span>
                            </pre>
                        )}
                        {activeTab === 'python' && (
                            <pre className="text-blue-300">
                                <span className="text-purple-400">import</span> requests<br /><br />
                                resp = requests.post(<br />
                                {'    '}<span className="text-emerald-300">"https://api.verifdoc.io/v1/analyze"</span>,<br />
                                {'    '}headers=&#123;<span className="text-emerald-300">"Authorization"</span>: <span className="text-emerald-300">"Bearer sk_test_..."</span>&#125;,<br />
                                {'    '}files=&#123;<span className="text-emerald-300">"file"</span>: open(<span className="text-emerald-300">"document.pdf"</span>, <span className="text-emerald-300">"rb"</span>)&#125;<br />
                                )<br />
                                print(resp.json())
                            </pre>
                        )}
                        {activeTab === 'node' && (
                            <pre className="text-blue-300">
                                <span className="text-purple-400">const</span> formData = <span className="text-purple-400">new</span> FormData();<br />
                                formData.append(<span className="text-emerald-300">'file'</span>, fs.createReadStream(<span className="text-emerald-300">'./doc.pdf'</span>));<br /><br />
                                <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> axios.post(<span className="text-emerald-300">'https://api.verifdoc.io/v1/analyze'</span>, formData, &#123;<br />
                                {'  '}headers: &#123; <span className="text-emerald-300">'Authorization'</span>: <span className="text-emerald-300">'Bearer sk_test_...'</span> &#125;<br />
                                &#125;);
                            </pre>
                        )}
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                    <Zap className="text-yellow-400 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Performances Temps Réel</h3>
                    <p className="text-slate-400">Temps de réponse moyen &lt; 2s. SLA 99.9% garanti.</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                    <Lock className="text-emerald-400 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Sécurité par Design</h3>
                    <p className="text-slate-400">TLS 1.3, AES-256. Vos données ne servent jamais à l'entraînement.</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                    <Code2 className="text-blue-400 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">SDK & Webhooks</h3>
                    <p className="text-slate-400">Recevez les résultats passivement via Webhooks. SDK Python & JS disponibles.</p>
                </div>
            </section>

        </div>
    );
}
