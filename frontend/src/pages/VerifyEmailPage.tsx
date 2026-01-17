import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Jeton de vérification manquant.');
            return;
        }

        const verify = async () => {
            try {
                const response = await axios.get(`https://verifdoc.io/api/auth/verify/${token}`);
                setStatus('success');
                setMessage(response.data.message || 'Email vérifié avec succès !');
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.detail || 'Erreur lors de la vérification.');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-800">
                {status === 'loading' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Vérification en cours...</h2>
                        <p className="text-slate-500">Nous validons votre adresse email professionnelle.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compte Activé !</h2>
                        <p className="text-slate-600 dark:text-slate-400">{message}</p>
                        <Link
                            to="/login"
                            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
                        >
                            Se connecter
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center gap-4">
                        <XCircle className="w-16 h-16 text-red-500" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Échec de vérification</h2>
                        <p className="text-slate-600 dark:text-slate-400">{message}</p>
                        <Link
                            to="/register"
                            className="mt-6 w-full py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg transition-all"
                        >
                            Réessayer l'inscription
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
