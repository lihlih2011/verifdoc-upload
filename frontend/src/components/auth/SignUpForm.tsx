import { useState } from "react";
import API_URL from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Input from "../form/input/InputField";


export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Note: Backend might need update to accept extra fields, but usually we store them in meta or just accept for now.
      await axios.post(`${API_URL}/api/auth/register`, null, {
        params: {
          email,
          password,
          full_name: fullName,
          // Assuming backend accepts these or we just collect them for now
        }
      });
      navigate("/signin");
    } catch (err) {
      setError("Erreur d'inscription. Cet email est peut-être déjà utilisé.");
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black relative overflow-hidden font-outfit">

      {/* Ambiance */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md pt-10 mx-auto px-6 z-10">
        <Link to="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ChevronLeftIcon className="size-4 mr-2" /> Retour
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto px-6 z-10 py-12">
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">

          <div className="mb-8 text-center flex flex-col items-center">
            <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-16 w-auto mb-4" />
            <p className="text-zinc-400 text-sm font-medium">Rejoignez la référence mondiale de l'analyse IA.</p>
            <div className="flex justify-center gap-4 mt-4 text-[10px] text-zinc-500 uppercase tracking-widest">
              <span>ISO 27001</span> • <span>IA Temps Réel</span> • <span>B2B Expert</span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">Nom Complet</label>
                <Input
                  type="text"
                  placeholder="Jean Dupont"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl px-4 py-2 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">Téléphone</label>
                <Input
                  type="tel"
                  placeholder="+33 6..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl px-4 py-2 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">Email Professionnel</label>
              <Input
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl px-4 py-2 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">Société</label>
                <Input
                  type="text"
                  placeholder="VerifDoc Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl px-4 py-2 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">Fonction</label>
                <Input
                  type="text"
                  placeholder="Directeur RH"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl px-4 py-2 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">Mot de passe</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl px-4 py-2 pr-10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button type="submit" className="w-full mt-4 bg-white text-black font-bold text-lg rounded-xl py-3 hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
              Commencer l'essai gratuit
            </button>
            <p className="text-xs text-center text-zinc-600 mt-2">14 jours gratuits, sans carte bancaire requise.</p>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-zinc-500">
              Déjà un compte ? {" "}
              <Link to="/signin" className="text-white font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>

        </div>
      </div>

      <div className="text-center py-6 text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} VerifDoc Inc. All rights reserved.
      </div>
    </div>
  );
}
