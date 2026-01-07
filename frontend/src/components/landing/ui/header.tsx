"use client";

import { Link } from "react-router-dom";
import Logo from "./logo";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`relative flex h-14 items-center justify-between gap-3 rounded-full px-5 transition-all duration-300 ${scrolled ? "bg-gray-950/80 backdrop-blur-md border border-gray-800 shadow-xl shadow-primary-500/5" : "bg-transparent"}`}>

          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-center flex-wrap items-center gap-1 text-sm font-medium text-gray-300">
              <li className="px-3 py-2 hover:text-white transition-colors cursor-pointer">
                <Link to="/solutions" className="flex items-center gap-1 hover:text-primary-300">Solutions</Link>
              </li>
              <li className="px-3 py-2 hover:text-white transition-colors cursor-pointer">
                <Link to="/resources" className="flex items-center gap-1 hover:text-primary-300">Ressources</Link>
              </li>
              <li className="px-3 py-2 hover:text-white transition-colors cursor-pointer">
                <Link to="/company" className="flex items-center gap-1 hover:text-primary-300">Entreprise</Link>
              </li>
              <li className="px-3 py-2 hover:text-white transition-colors cursor-pointer">
                <Link to="/contact" className="flex items-center gap-1 hover:text-primary-300">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link to="/signin" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Connexion
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="btn-sm rounded-full bg-gradient-to-r from-primary-600 to-purple-600 py-[6px] px-4 text-white hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all duration-300"
              >
                Essayer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
