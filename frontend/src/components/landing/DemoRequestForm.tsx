import { useState } from "react";
import axios from "axios";

export default function DemoRequestForm() {
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const emailIsProfessional = (mail: string) => {
        // Simple check: must contain @ and a domain that is NOT a free provider
        const freeProviders = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com"];
        const domain = mail.split("@")[1]?.toLowerCase();
        if (!domain) return false;
        return !freeProviders.includes(domain);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        if (!company.trim()) {
            setError("Le nom de la société est requis.");
            return;
        }
        if (!emailIsProfessional(email)) {
            setError("Veuillez fournir une adresse e‑mail professionnelle.");
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/api/demo/request", { company, email });
            if (res.status === 200) {
                setMessage("Demande de démo envoyée avec succès ! Nous vous contacterons rapidement.");
                setCompany("");
                setEmail("");
            } else {
                setError("Erreur lors de l'envoi. Veuillez réessayer.");
            }
        } catch (err) {
            setError("Erreur serveur : " + (err as any).message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900/60 rounded-xl shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-4">Demander une démo</h2>
            {error && <p className="text-red-400 mb-2">{error}</p>}
            {message && <p className="text-green-400 mb-2">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-1">Société</label>
                    <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Nom de votre société"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300 mb-1">E‑mail professionnel</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="exemple@votreentreprise.com"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
                >
                    Envoyer la demande
                </button>
            </form>
        </div>
    );
}
