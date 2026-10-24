"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { STAGES } from "./stages";

const HouseCanvas = dynamic(() => import("./HouseCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] flex items-center justify-center bg-[#F5F8EF] rounded-3xl border border-[#DAE7C7]">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-[#08482D] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#5E5E61] font-medium">Loading 3D House Stage...</p>
      </div>
    </div>
  ),
});

interface Props {
  onOpenEnquiry: () => void;
}

export default function LandToLivingSection({ onOpenEnquiry }: Props) {
  const [activeStage, setActiveStage] = useState(0);

  const stage = STAGES[activeStage] || STAGES[0];

  return (
    <section
      id="services"
      aria-label="Land to Living Journey"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Header with Reelmark studio badge & handwritten annotation */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative">
        {/* Handwritten accent note */}
        <div
          className="hand-note text-2xl sm:text-3xl font-semibold absolute -top-8 left-4 sm:left-12 -rotate-6 hidden sm:block"
          aria-hidden="true"
        >
          // Under one roof
        </div>

        {/* Mint Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#08482D]" />
          Complete Turnkey Construction
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101410] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          From Land <span className="italic text-[#08482D]">to Living.</span>
          <br className="hidden sm:inline" /> How We Build Your Home
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5E5E61] leading-relaxed">
          From legal land verification and civil blueprints to brickwork, MEP electricals,
          and luxury furnished handover. Watch the 3D process step-by-step:
        </p>
      </div>

      {/* Main 3D & Stepper Showcase Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#DAE7C7]/80 shadow-xl shadow-[#08482D]/5">
        {/* Left Column: Interactive 3D Canvas */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="h-[360px] sm:h-[440px] lg:h-[480px] w-full">
            <HouseCanvas stage={activeStage} progress={activeStage / (STAGES.length - 1)} />
          </div>

          {/* Scrub Slider Control */}
          <div className="flex items-center gap-3 px-2 pt-2">
            <span className="text-xs font-semibold text-[#08482D] whitespace-nowrap">
              Stage {activeStage + 1} of 7
            </span>
            <input
              type="range"
              min={0}
              max={STAGES.length - 1}
              step={1}
              value={activeStage}
              onChange={(e) => setActiveStage(Number(e.target.value))}
              aria-label="Construction stage slider"
              className="w-full accent-[#08482D] cursor-pointer h-2 bg-[#DAE7C7]/50 rounded-lg"
            />
            <span className="text-xs font-medium text-[#5E5E61] whitespace-nowrap">
              {stage.title}
            </span>
          </div>
        </div>

        {/* Right Column: Active Stage Details & Stepper */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Active Stage Card */}
          <div className="bg-[#F5F8EF] p-6 rounded-2xl border border-[#DAE7C7] relative">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl p-2 bg-white rounded-xl shadow-xs" aria-hidden="true">
                {stage.icon}
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#08482D]">
                  Step 0{activeStage + 1}
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#101410]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stage.title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-medium text-[#08482D] mb-2">{stage.subtitle}</p>
            <p className="text-xs sm:text-sm text-[#5E5E61] leading-relaxed mb-4">
              {stage.desc}
            </p>

            {/* In-House Advantage Highlight */}
            <div className="bg-white/80 rounded-xl p-3 border border-[#DAE7C7]/50 flex items-center gap-2.5">
              <span className="text-[#08482D] font-bold text-sm">✓</span>
              <p className="text-xs text-[#101410] font-medium">
                {activeStage === 0 && "Govt-approved land demarcation & soil load testing."}
                {activeStage === 1 && "BE Civil Engineer signed RCC foundation drawings."}
                {activeStage === 2 && "Fe550D TMT bars & Grade 53 high-compression concrete."}
                {activeStage === 3 && "Kiln-cured clay bricks & multi-layer waterproofing."}
                {activeStage === 4 && "Direct wholesale supply: Finolex, Asian Paints, UPVC."}
                {activeStage === 5 && "BWR marine ply modular woodwork & concealed LED."}
                {activeStage === 6 && "Full completion certificate + key handover ceremony!"}
              </p>
            </div>
          </div>

          {/* Quick Step Buttons */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5E5E61] mb-2.5">
              Jump to Construction Stage:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(idx)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all ${
                    activeStage === idx
                      ? "bg-[#08482D] text-white shadow-md scale-105"
                      : "bg-[#F5F8EF] text-[#101410] hover:bg-[#DAE7C7]/50 border border-[#DAE7C7]"
                  }`}
                  aria-label={`Go to stage ${idx + 1}: ${s.title}`}
                >
                  <span className="text-base sm:text-lg">{s.icon}</span>
                  <span className="text-[10px] font-bold mt-1">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={onOpenEnquiry}
              className="w-full py-3.5 px-6 rounded-xl bg-[#08482D] text-white text-sm font-semibold hover:bg-[#1B4332] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#08482D]/20"
            >
              Start Your Build With Us
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
