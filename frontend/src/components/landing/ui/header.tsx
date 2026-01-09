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

          {/* Desktop Navigation Professional */}
          <nav className="hidden md:flex md:grow justify-center">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {[
                ["Solutions", "/solutions"],
                ["Tarifs", "/#pricing"],
                ["Entreprise", "/company"],
                ["Contact", "/contact"]
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="relative text-gray-300 transition-colors duration-300 hover:text-white group py-2"
                  >
                    {label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop sign in links with Premium CTA */}
          <ul className="flex flex-1 items-center justify-end gap-4">
            <li>
              <Link
                to="/signin"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Connexion
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span className="relative flex items-center gap-2">
                  Essayer Gratuitement
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
