"use client";

import { useState, useEffect, useRef } from "react";
import { BRAND } from "@/lib/constants";
import EnquiryModal from "@/components/enquiry/EnquiryModal";

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
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(248,246,241,0.95)"
          : "rgba(248,246,241,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.25)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5"
            aria-label="CS Builder & Developers – home"
          >
            <HouseIcon />
            <div>
              <span
                className="block text-sm font-bold leading-none tracking-tight"
                style={{ color: "var(--color-forest)" }}
              >
                CS BUILDER
              </span>
              <span
                className="block text-[10px] font-medium tracking-widest uppercase leading-none mt-0.5"
                style={{ color: "var(--color-sand)" }}
              >
                &amp; Developers
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium transition-colors duration-150 hover:text-[var(--color-forest)]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-black/5"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {BRAND.phone}
            </a>
            <button
              onClick={onOpenEnquiry}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: "var(--color-forest)",
                color: "var(--color-white)",
              }}
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
            className="md:hidden rounded-lg p-2 transition-colors hover:bg-black/5"
            style={{ color: "var(--color-ink)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            className="md:hidden border-t py-4 space-y-1"
            style={{ borderColor: "rgba(201,169,110,0.2)" }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-2 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-black/5"
                style={{ color: "var(--color-ink)" }}
              >
                {label}
              </a>
            ))}
            <a
              href={`tel:${BRAND.phone}`}
              className="block px-2 py-2.5 text-sm font-medium"
              style={{ color: "var(--color-forest)" }}
            >
              📞 {BRAND.phone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

function HouseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#1B4332" />
      <path
        d="M20 10 L32 20 L32 32 L8 32 L8 20 Z"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 32 L16 24 L24 24 L24 32"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M20 10 L32 20"
        stroke="#C9A96E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 10 L8 20"
        stroke="#C9A96E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
