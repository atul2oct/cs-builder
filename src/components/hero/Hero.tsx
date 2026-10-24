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
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      const bg = hero.querySelector<HTMLElement>(".hero-ambient");
      if (bg) {
        bg.style.transform = `translate(${x}px, ${y}px)`;
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
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* ── Ambient background shapes ───────────────────────────── */}
      <div
        className="hero-ambient absolute inset-0 pointer-events-none transition-transform duration-700"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        {/* Large warm circle top-right */}
        <div
          className="absolute"
          style={{
            width: "clamp(300px, 50vw, 700px)",
            height: "clamp(300px, 50vw, 700px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)",
            top: "-10%",
            right: "-10%",
          }}
        />
        {/* Forest circle bottom-left */}
        <div
          className="absolute"
          style={{
            width: "clamp(200px, 35vw, 500px)",
            height: "clamp(200px, 35vw, 500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(27,67,50,0.08) 0%, transparent 70%)",
            bottom: "10%",
            left: "-5%",
          }}
        />
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Main hero content ────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(27,67,50,0.08)",
              color: "var(--color-forest)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              aria-hidden="true"
              style={{ background: "var(--color-forest)" }}
            />
            End-to-End Home Construction
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-ink)",
            }}
          >
            From Land{" "}
            <span
              className="italic"
              style={{ color: "var(--color-forest)" }}
            >
              to Living.
            </span>
            <br />
            <span className="text-[0.9em]">
              We Build Your
              <br className="sm:hidden" />
              {" "}Dream Home.
            </span>
          </h1>

          {/* Supporting text */}
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ color: "var(--color-ink-muted)" }}
          >
            From land assistance and architectural planning to construction and
            interior design — we manage every step of your home-building journey
            under one roof.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-16">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
              style={{
                background: "var(--color-forest)",
                color: "var(--color-white)",
                boxShadow: "0 8px 24px rgba(27,67,50,0.3)",
              }}
            >
              Discuss Your Project
              <ArrowRight />
            </button>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-black/5 border"
              style={{
                color: "var(--color-ink)",
                borderColor: "rgba(201,169,110,0.4)",
              }}
            >
              Explore Our Projects
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-6">
            {[
              { icon: "🏅", label: "BE Civil Engineer" },
              { icon: "🏛️", label: "Institution of Engineers — Member" },
              { icon: "🔑", label: "End-to-End Delivery" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-lg">
                  {icon}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services strip at bottom of hero ─────────────────────── */}
      <div
        className="relative z-10 border-t overflow-x-auto"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(201,169,110,0.2)",
        }}
      >
        <div className="flex min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-x"
          style={{ divideColor: "rgba(201,169,110,0.15)" } as React.CSSProperties}
        >
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0 md:flex-shrink group cursor-default"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">
                {service.icon}
              </span>
              <span
                className="text-xs font-semibold leading-tight whitespace-nowrap md:whitespace-normal"
                style={{ color: "var(--color-ink)" }}
              >
                {service.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div
        className="absolute bottom-24 right-6 lg:right-12 flex flex-col items-center gap-2 z-10 hidden md:flex"
        aria-hidden="true"
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{
            color: "var(--color-ink-muted)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: "var(--color-sand)" }}
        />
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
