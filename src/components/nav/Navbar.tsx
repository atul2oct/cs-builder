"use client";

import { useState, useEffect } from "react";
import { BRAND } from "@/lib/constants";

interface NavProps {
  onOpenEnquiry: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "3D Journey", href: "#services" },
    { label: "Projects & Plans", href: "#projects" },
    { label: "Credentials", href: "#about" },
    { label: "Contact & Map", href: "#contact" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(245, 248, 239, 0.95)"
          : "rgba(245, 248, 239, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(218, 231, 199, 0.9)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(8, 72, 45, 0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            aria-label="CS Builder & Developers – home"
          >
            <HouseIcon />
            <div>
              <span className="block text-base font-bold leading-none tracking-tight text-[#08482D]">
                CS BUILDER
              </span>
              <span className="block text-[10px] font-semibold tracking-widest uppercase leading-none mt-1 text-[#C9A96E]">
                &amp; Developers
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-7"
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`text-sm font-semibold transition-colors duration-150 ${
                  label === "Admin"
                    ? "text-[#08482D] bg-[#DAE7C7]/60 hover:bg-[#DAE7C7] px-3 py-1 rounded-full border border-[#08482D]/15"
                    : "text-[#5E5E61] hover:text-[#08482D]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="text-xs font-bold px-3.5 py-2 rounded-xl text-[#08482D] hover:bg-white/80 transition-colors border border-[#DAE7C7]"
            >
              📞 {BRAND.phone}
            </a>
            <button
              onClick={onOpenEnquiry}
              className="text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#1B4332] active:scale-95 shadow-md bg-[#08482D] text-white shadow-[#08482D]/20"
            >
              Discuss Your Project
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden rounded-xl p-2.5 transition-colors hover:bg-black/5 text-[#08482D]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-[#DAE7C7] py-4 space-y-1.5 bg-[#F5F8EF]"
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-semibold rounded-xl text-[#101410] hover:bg-[#DAE7C7]/40 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="block px-3 py-2.5 text-sm font-bold text-[#08482D] bg-[#DAE7C7]/50 rounded-xl text-center"
              >
                📞 Call {BRAND.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#08482D] text-white text-sm font-bold text-center"
              >
                Discuss Your Project
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function HouseIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#08482D] flex items-center justify-center text-white shadow-md shadow-[#08482D]/20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#DAE7C7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>
  );
}
