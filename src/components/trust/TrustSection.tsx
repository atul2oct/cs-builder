"use client";

import React, { useState } from "react";

export default function TrustSection() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  return (
    <section
      id="about"
      aria-label="Credentials and In-House Construction Advantage"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div
          className="hand-note text-2xl sm:text-3xl font-semibold absolute -top-8 left-8 -rotate-3 hidden sm:block"
          aria-hidden="true"
        >
          // Verified Engineering Credentials
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#08482D]" />
          Civil Engineering Leadership
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101410] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Built by Qualified Civil Engineers,{" "}
          <span className="italic text-[#08482D]">Not Subcontractors</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5E5E61] leading-relaxed">
          At CS Builder &amp; Developers, your home is designed, engineered, and executed
          under direct supervision of certified civil engineering professionals.
        </p>
      </div>

      {/* Main Grid: Leadership Credentials & In-House Supply Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Er. MD Chand & Certificates (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#DAE7C7] shadow-lg shadow-[#08482D]/5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#08482D] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                MC
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#101410]">
                  Er. MD Chand
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#08482D]">
                  B.E. Civil Engineering • Institution of Engineers (India) AM3057456
                </p>
              </div>
            </div>

            <p className="text-sm text-[#5E5E61] leading-relaxed mb-6">
              Graduated with First Class with Distinction (CGPA 8.71) from Nitte Meenakshi
              Institute of Technology (Autonomous VTU). Associate Member of The Institution
              of Engineers (India). Personally oversees soil testing, structural calculations,
              reinforcement bar binding, and concrete pour curing on every site.
            </p>

            {/* Clickable Certificate Previews */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setActiveCert("/images/degree_cert.jpg")}
                className="cursor-pointer group relative rounded-2xl overflow-hidden border-2 border-[#DAE7C7] hover:border-[#08482D] transition-all bg-[#F5F8EF] p-2"
              >
                <div className="h-44 overflow-hidden rounded-xl bg-white">
                  <img
                    src="/images/degree_cert.jpg"
                    alt="B.E. Civil Engineering Degree Certificate"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-[#08482D] block">
                    B.E. Civil Degree
                  </span>
                  <span className="text-[10px] text-[#5E5E61]">NMIT VTU • Distinction</span>
                </div>
              </div>

              <div
                onClick={() => setActiveCert("/images/membership_cert.jpg")}
                className="cursor-pointer group relative rounded-2xl overflow-hidden border-2 border-[#DAE7C7] hover:border-[#08482D] transition-all bg-[#F5F8EF] p-2"
              >
                <div className="h-44 overflow-hidden rounded-xl bg-white">
                  <img
                    src="/images/membership_cert.jpg"
                    alt="Institution of Engineers Membership Certificate"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-[#08482D] block">
                    Institution of Engineers
                  </span>
                  <span className="text-[10px] text-[#5E5E61]">Associate Member AM3057456</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F8EF] p-4 rounded-2xl border border-[#DAE7C7] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#08482D]">
              Verified Credentials on Record
            </span>
            <span className="text-xs text-[#5E5E61]">Click any certificate to expand</span>
          </div>
        </div>

        {/* Right: The In-House Supply Advantage (5 Cols) */}
        <div className="lg:col-span-5 bg-[#08482D] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-bold uppercase tracking-wider">
              From Cement to Paint
            </div>

            <h3
              className="text-2xl sm:text-3xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why We Create Homes{" "}
              <span className="text-[#DAE7C7] italic">From Scratch</span>
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Most builders outsource to 10 different contractors, causing delays,
              markup stacking, and blame games. At CS Builder, we control the entire supply chain:
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: "Direct Mill TMT Steel & Grade 53 Cement", desc: "Sourced direct from factory depots with lab batch test certificates." },
                { title: "In-House Masonry & Kiln-Fired Bricks", desc: "High compressive strength wire-cut bricks & M-sand mortar." },
                { title: "Integrated Plumbing & Finolex Electricals", desc: "Zero counterfeit materials — tested before concealed wall plastering." },
                { title: "Modular Carpentry & Luxury Finishes", desc: "Bespoke Italian hardware, Asian Paints Royale, and premium sanitary." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                  <span className="text-[#DAE7C7] font-bold text-base">✓</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-white/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-4 border-t border-white/15 flex items-center justify-between text-xs text-[#DAE7C7]">
            <span>10-Year Structural Guarantee</span>
            <span>Zero Third-Party Delays</span>
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[90vh] bg-white rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white font-bold flex items-center justify-center hover:bg-black transition-all z-10"
              aria-label="Close certificate preview"
            >
              ✕
            </button>
            <img
              src={activeCert}
              alt="Expanded Certificate"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
