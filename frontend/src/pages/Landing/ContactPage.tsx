import { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/public/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    message: formData.message
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error("Contact Error:", err);
            setStatus('error');
        }
    };

    return (
        <main className="grow pt-24">
            <section className="relative">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="py-12 md:py-20">
                        {/* Section header */}
                        <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                            <h1 className="h1 mb-4 font-nacelle text-4xl font-semibold text-white animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">
                                Contactez <span className="text-purple-500">l'Équipe</span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                Vous avez une question sur notre technologie ou souhaitez une démo personnalisée ? Nous sommes là pour vous.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">Email Commercial</h3>
                                            <p className="text-gray-400 text-sm mb-2">Pour les demandes de partenariat et démos.</p>
                                            <a href="mailto:contact@verifdoc.io" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">contact@verifdoc.io</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                            <MessageSquare size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">Support Technique</h3>
                                            <p className="text-gray-400 text-sm mb-2">Pour toute assistance sur l'API ou le dashboard.</p>
                                            <a href="mailto:contact@verifdoc.io" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">contact@verifdoc.io</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">Siège Social</h3>
                                            <p className="text-gray-400 text-sm">
                                                12 Avenue de la République<br />
                                                75011 Paris, France
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            {status === 'success' ? (
                                <div className="bg-gray-900/30 p-12 rounded-3xl border border-gray-800/50 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30 animate-bounce">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Envoyé !</h3>
                                    <p className="text-gray-400">Nous avons bien reçu votre demande.<br />Notre équipe vous répondra sous 24h.</p>
                                    <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-purple-400 hover:text-purple-300 underline underline-offset-4">
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900/30 p-8 rounded-3xl border border-gray-800/50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Prénom</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                                placeholder="Jean"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Nom</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                                placeholder="Dupont"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Email professionnel</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            placeholder="jean@entreprise.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Message</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                            placeholder="Comment pouvons-nous vous aider ?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:grayscale"
                                    >
                                        {status === 'submitting' ? 'Envoi en cours...' : (
                                            <>Envoyer le message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

