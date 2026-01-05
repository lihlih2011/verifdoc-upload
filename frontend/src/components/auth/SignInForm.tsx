import { useState } from "react";
import API_URL from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Input from "../form/input/InputField";

import { useAuth } from "../../context/AuthContext";

export default function SignInForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post(`${API_URL}/api/auth/token`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      login(response.data.access_token, response.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black relative overflow-hidden font-outfit">

      {/* Ambiance */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md pt-10 mx-auto px-6 z-10">
        <Link to="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ChevronLeftIcon className="size-4 mr-2" /> Retour
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6 z-10 py-12">
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">

          <div className="mb-8 text-center">
            <img
              src="/images/logo_verifdoc_3d_transparent.png"
              alt="VerifDoc Logo"
              className="h-24 mx-auto mb-6 drop-shadow-2xl"
            />
            <h1 className="mb-2 font-bold text-3xl text-white tracking-tight">Connexion</h1>
            <p className="text-zinc-400 text-sm">Votre espace sécurisé d'analyse documentaire.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Email Professionnel</label>
              <Input
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider block">Mot de passe</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Oublié ?</a>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 pr-10 outline-none transition-all"
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

            <button type="submit" className="w-full bg-white text-black font-bold text-lg rounded-xl py-3 hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
              Se connecter
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-zinc-500">
              Pas encore de compte ? {" "}
              <Link to="/signup" className="text-white font-semibold hover:underline">Créer un compte</Link>
            </p>
          </div>

        </div>
      </div>

      {/* Footer simple */}
      <div className="text-center py-6 text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} VerifDoc AI. Sécurisé par SSL.
      </div>
    </div>
  );
}
