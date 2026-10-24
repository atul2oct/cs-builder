"use client";

import { useRef, useEffect } from "react";
import { BRAND, SERVICES } from "@/lib/constants";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Subtle parallax on mouse move (desktop only)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      const ambient = hero.querySelector<HTMLElement>(".hero-ambient");
      if (ambient) {
        ambient.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#F5F8EF]"
    >
      {/* ── Ambient background shapes & subtle architectural grid ── */}
      <div
        className="hero-ambient absolute inset-0 pointer-events-none transition-transform duration-700"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        {/* Soft mint studio glow */}
        <div
          className="absolute -top-[15%] -right-[10%] rounded-full opacity-60"
          style={{
            width: "clamp(340px, 45vw, 680px)",
            height: "clamp(340px, 45vw, 680px)",
            background: "radial-gradient(circle, rgba(218, 231, 199, 0.7) 0%, transparent 70%)",
          }}
        />
        {/* Deep forest accent aura */}
        <div
          className="absolute bottom-[5%] -left-[10%] rounded-full opacity-40"
          style={{
            width: "clamp(300px, 40vw, 600px)",
            height: "clamp(300px, 40vw, 600px)",
            background: "radial-gradient(circle, rgba(8, 72, 45, 0.12) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#08482D 1px, transparent 1px), linear-gradient(90deg, #08482D 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Main Hero Content ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-36 md:pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 relative">
            {/* Reelmark Handwritten Note */}
            <div
              className="hand-note text-2xl sm:text-3xl font-semibold absolute -top-8 left-1 -rotate-6 hidden sm:block"
              aria-hidden="true"
            >
              // From plot to living
            </div>

            {/* Reelmark Mint Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5 bg-[#DAE7C7] text-[#08482D] shadow-xs border border-[#08482D]/10">
              <span className="w-2 h-2 rounded-full bg-[#08482D] animate-pulse" />
              Trusted End-to-End Home Construction
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6 text-[#101410]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              From Land{" "}
              <span className="italic text-[#08482D]">
                to Living.
              </span>
              <br />
              We Build Your
              <br className="sm:hidden" />
              {" "}Dream Home.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-xl text-[#5E5E61]">
              From land assistance and architectural planning to civil construction,
              supplies, and interior design — we manage every step under one roof.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 relative">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm sm:text-base font-bold transition-all duration-200 hover:bg-[#1B4332] active:scale-95 shadow-xl bg-[#08482D] text-white shadow-[#08482D]/25"
              >
                Discuss Your Project
                <ArrowRight />
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm sm:text-base font-semibold transition-all duration-200 hover:bg-white bg-white/70 border border-[#DAE7C7] text-[#101410] shadow-xs"
              >
                Explore Real Blueprints
              </a>

              {/* Handwritten Note pointing to CTA */}
              <div
                className="hand-note text-xl font-bold text-[#08482D] ml-2 rotate-12 hidden md:block"
                aria-hidden="true"
              >
                Zero hidden costs ↵
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#DAE7C7]/60">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <span className="text-xs font-semibold text-[#101410]">
                  Er. MD Chand (BE Civil • NMIT)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <span className="text-xs font-semibold text-[#101410]">
                  Institution of Engineers (AM3057456)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🧱</span>
                <span className="text-xs font-semibold text-[#101410]">
                  100% In-House Material Supply
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Featured Architecture Blueprint & Stats (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-3 sm:p-4 rounded-3xl border border-[#DAE7C7] shadow-xl shadow-[#08482D]/8 rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Floor Plan Real Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-[#DAE7C7] bg-[#F5F8EF] group">
                <img
                  src="/images/plan_ground.jpg"
                  alt="CS Builder Ground Floor Architectural Plan"
                  className="w-full h-80 sm:h-96 object-contain bg-white group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#08482D] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                  CAD Engineered Blueprint
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#DAE7C7] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#101410] block">
                      Amjad Ansari Villa Plan
                    </span>
                    <span className="text-[10px] text-[#5E5E61]">
                      Basement + Ground Floor • Complete Turnkey
                    </span>
                  </div>
                  <a
                    href="#projects"
                    className="text-xs font-bold text-[#08482D] hover:underline"
                  >
                    View Plan →
                  </a>
                </div>
              </div>

              {/* Floating Stat Pill (Reelmark accent) */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#DAE7C7] text-[#08482D] p-3.5 sm:p-4 rounded-2xl border border-[#08482D]/20 shadow-lg flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">🏡</span>
                <div>
                  <span className="text-base sm:text-lg font-bold block leading-none">
                    100% In-House
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#08482D]/80">
                    Plot, Cement, Steel to Keys
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services Bar Strip at Bottom ───────────────────────────── */}
      <div
        className="relative z-10 border-t border-[#DAE7C7]/70 bg-white/70 backdrop-blur-md overflow-x-auto no-scrollbar"
      >
        <div className="flex min-w-max md:min-w-0 md:grid md:grid-cols-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-x divide-[#DAE7C7]/50">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex items-center gap-2.5 px-4 py-3.5 flex-shrink-0 md:flex-shrink cursor-default hover:bg-[#DAE7C7]/20 transition-colors"
            >
              <span className="text-xl flex-shrink-0" aria-hidden="true">
                {service.icon}
              </span>
              <div>
                <span className="text-xs font-bold text-[#101410] block whitespace-nowrap">
                  {service.title}
                </span>
                <span className="text-[10px] text-[#5E5E61] hidden lg:block leading-tight line-clamp-1">
                  {service.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
