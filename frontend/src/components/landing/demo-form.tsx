
import { useState } from 'react';

export default function DemoForm() {
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [siret, setSiret] = useState('');
    const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('checking');
        setMsg('');

        // 1. Pro Email Validation
        const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com'];
        const domain = email.split('@')[1];
        if (publicDomains.includes(domain)) {
            setStatus('error');
            setMsg('Veuillez utiliser un email professionnel.');
            return;
        }

        // 2. Call Backend API
        try {
            const apiUrl = import.meta.env.VITE_API_URL || "";
            const response = await fetch(`${apiUrl}/api/leads/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, company, siret, source: "Landing Demo Form" })
            });

            if (response.ok) {
                setStatus('success');
                setMsg('Demande reçue ! Un expert vous contactera sous 24h.');
                // Reset form
                setEmail('');
                setCompany('');
                setSiret('');
            } else {
                setStatus('error');
                setMsg("Erreur lors de l'envoi. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Lead Error", error);
            setStatus('error');
            setMsg("Erreur de connexion serveur.");
        }
    };

    return (
        <section id="demo">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 px-8 py-10 shadow-2xl md:px-12 md:py-16">
                    <div className="relative z-10 flex flex-col items-center justify-between gap-10 md:flex-row">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="mb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
                                Demandez une Démo Personnalisée
                            </h2>
                            <p className="text-lg text-indigo-200">
                                Découvrez comment VerifDoc peut sécuriser vos processus. Remplissez le formulaire et nos experts vous contacteront sous 24h.
                            </p>
                        </div>
                        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="form-input w-full rounded-md border-transparent bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-600 focus:bg-gray-900 focus:ring-0"
                                        placeholder="Société"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="form-input w-full rounded-md border-transparent bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-600 focus:bg-gray-900 focus:ring-0"
                                        placeholder="SIRET (Facultatif)"
                                        value={siret}
                                        onChange={(e) => setSiret(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="email"
                                    className="form-input w-full rounded-md border-transparent bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-600 focus:bg-gray-900 focus:ring-0"
                                    placeholder="Email professionnel"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {msg && (
                                    <div className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {msg}
                                    </div>
                                )}
                                <button
                                    className="btn w-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 disabled:opacity-50"
                                    type="submit"
                                    disabled={status === 'checking' || status === 'success'}
                                >
                                    {status === 'checking' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Vérification Kbis...
                                        </span>
                                    ) : (
                                        'Envoyer ma demande'
                                    )}
                                </button>
                                <p className="mt-2 text-center text-xs text-gray-400">
                                    Enquête de solvabilité incluse.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
