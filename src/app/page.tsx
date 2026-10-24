"use client";

import { useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/hero/Hero";
import EnquiryModal from "@/components/enquiry/EnquiryModal";
import StickyMobileCTA from "@/components/sticky/StickyMobileCTA";

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openEnquiry = () => setEnquiryOpen(true);
  const closeEnquiry = () => setEnquiryOpen(false);

  return (
    <>
      <Navbar onOpenEnquiry={openEnquiry} />
      <main id="main-content">
        <Hero onOpenEnquiry={openEnquiry} />

        {/* ── Phase 2+: "Land to Living" 3D scroll scene ─────── */}
        <section
          id="services"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          aria-label="Services — coming in Phase 2"
        >
          <div
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-24 text-center gap-4"
            style={{ borderColor: "rgba(201,169,110,0.3)" }}
          >
            <span className="text-4xl" aria-hidden="true">🏗️</span>
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-sand)" }}
            >
              Phase 2
            </p>
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              "Land to Living" — 3D Scroll Scene
            </h2>
            <p
              className="text-sm max-w-md"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Watch your home transform from a plot of land through foundation,
              structure, roof, finishing, and interior — synced to your scroll.
            </p>
          </div>
        </section>

        {/* ── Phase 3+: Featured projects ─────────────────────── */}
        <section
          id="projects"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          aria-label="Featured projects — coming in Phase 3"
        >
          <div
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-24 text-center gap-4"
            style={{ borderColor: "rgba(201,169,110,0.3)" }}
          >
            <span className="text-4xl" aria-hidden="true">🏠</span>
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-sand)" }}
            >
              Phase 3
            </p>
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              Featured Projects
            </h2>
            <p
              className="text-sm max-w-md"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Sanity-powered project gallery with Land, Construction, and
              Interior filter — client-manageable without a developer.
            </p>
          </div>
        </section>

        {/* ── Phase 4+: About / Trust / Footer ────────────────── */}
        <section
          id="about"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          aria-label="About — coming in Phase 4"
        >
          <div
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-24 text-center gap-4"
            style={{ borderColor: "rgba(201,169,110,0.3)" }}
          >
            <span className="text-4xl" aria-hidden="true">🤝</span>
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-sand)" }}
            >
              Phase 4
            </p>
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              Why Choose Us — Trust &amp; Testimonials
            </h2>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section
          id="contact"
          className="py-24"
          style={{ background: "var(--color-forest)" }}
          aria-label="Contact"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-white)",
              }}
            >
              Ready to Build Your Dream Home?
            </h2>
            <p
              className="text-base sm:text-lg"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Let's talk — our team will guide you from the very first step.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={openEnquiry}
                className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "var(--color-sand)",
                  color: "var(--color-forest)",
                }}
              >
                Discuss Your Project
              </button>
              <a
                href={`tel:+917307478258`}
                className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-medium border transition-all hover:bg-white/10"
                style={{
                  color: "var(--color-white)",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              >
                📞 +91 73074 78258
              </a>
            </div>

            {/* Map placeholder */}
            <div
              id="map"
              className="mt-12 rounded-2xl overflow-hidden"
              style={{ height: "300px", background: "rgba(255,255,255,0.1)" }}
              aria-label="Map — to be configured"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <span className="text-4xl" aria-hidden="true">📍</span>
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Map coming soon — replace with Google Maps embed
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        className="py-8 px-4 sm:px-6 border-t"
        style={{
          background: "#0f2b1f",
          borderColor: "rgba(201,169,110,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            © 2025 CS Builder &amp; Developers. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            BE Civil Engineering · Institution of Engineers (India) — Associate Member
          </p>
        </div>
      </footer>

      {/* ── Enquiry modal ────────────────────────────────────────── */}
      <EnquiryModal open={enquiryOpen} onClose={closeEnquiry} />

      {/* ── Sticky mobile CTA (hidden on md+) ───────────────────── */}
      <StickyMobileCTA onOpenEnquiry={openEnquiry} />
    </>
  );
}
