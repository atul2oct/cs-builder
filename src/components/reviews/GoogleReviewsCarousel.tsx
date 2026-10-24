"use client";

import React, { useState, useEffect } from "react";
import { BRAND } from "@/lib/constants";
import { GOOGLE_REVIEWS } from "@/data/reviews";

export default function GoogleReviewsCarousel() {
  // Active card index for click/touch zoom
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Duplicate items to ensure a mathematically seamless infinite loop
  const duplicatedReviews = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

  // Reset zoom whenever user clicks anywhere outside a review card
  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveCardId(null);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent immediate global document click reset
    setActiveCardId(id);
  };

  const handleCardMouseLeave = () => {
    // When mouse hovers outside the card, reset zoom immediately
    setActiveCardId(null);
  };

  return (
    <section
      id="reviews"
      aria-label="Google Customer Reviews"
      className="py-16 sm:py-24 bg-[#F5F8EF] relative overflow-hidden"
    >
      {/* ── Section Header ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 relative z-10">
        {/* Handwritten Accent Note */}
        <div
          className="hand-note text-2xl sm:text-3xl font-semibold absolute -top-8 right-12 sm:right-24 rotate-3 hidden sm:block"
          aria-hidden="true"
        >
          // 100% Verified Homeowners
        </div>

        {/* Mint Google Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs border border-[#08482D]/10">
          <GoogleIcon className="w-3.5 h-3.5" />
          <span>Google Customer Reviews</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101410] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What Families Say About{" "}
          <span className="italic text-[#08482D]">Building With Us</span>
        </h2>

        {/* Google Aggregate Rating Badge */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#DAE7C7] shadow-xs">
            <span className="text-lg font-bold text-[#101410]">{BRAND.googleRating}</span>
            <div className="flex items-center text-[#FBBC04] text-base" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <span className="text-xs text-[#5E5E61] font-medium border-l border-[#DAE7C7] pl-2">
              Based on {BRAND.googleReviewCount} Google reviews
            </span>
          </div>

          <a
            href={BRAND.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#08482D] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors shadow-xs"
          >
            <span>Write a Google Review</span>
            <span>↗</span>
          </a>
        </div>

        <p className="mt-3 text-xs text-[#5E5E61]">
          Hover or click any review to pause and magnify 1.3× • Moves smoothly when unhovered
        </p>
      </div>

      {/* ── Continuous Seamless Infinite Loop Carousel Container ──── */}
      <div className="relative w-full py-12 sm:py-16 overflow-x-clip">
        {/* Soft edge blur vignettes */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-r from-[#F5F8EF] to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-l from-[#F5F8EF] to-transparent"
          aria-hidden="true"
        />

        {/* Right-to-Left Infinite Scrolling Track */}
        <div
          className={`google-reviews-track flex items-center gap-6 px-4 ${
            activeCardId ? "is-paused" : ""
          }`}
        >
          {duplicatedReviews.map((review, idx) => {
            const cardUniqueKey = `${review.id}-${idx}`;
            const isCardActive = activeCardId === cardUniqueKey;

            return (
              <div
                key={cardUniqueKey}
                onClick={(e) => handleCardClick(e, cardUniqueKey)}
                onMouseLeave={handleCardMouseLeave}
                className={`google-review-card flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl p-5 border border-[#DAE7C7] cursor-pointer select-none shadow-md ${
                  isCardActive ? "is-active" : ""
                }`}
                tabIndex={0}
                role="article"
                aria-label={`Review by ${review.author}`}
              >
                {/* Card Top: Google Branding + Stars + Date */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    {/* User Avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xs"
                      style={{ backgroundColor: review.avatarBg }}
                    >
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#101410] leading-tight block truncate max-w-[140px]">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span
                            className="w-3.5 h-3.5 rounded-full bg-[#1A73E8] text-white flex items-center justify-center text-[8px] font-bold"
                            title="Verified Google Review"
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#5E5E61] block">
                        {review.location} • {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Google Logo */}
                  <div className="p-1 rounded-lg bg-[#F5F8EF] flex-shrink-0">
                    <GoogleIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* 5 Star Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-[#FBBC04] text-xs tracking-wider">
                    ★★★★★
                  </div>
                  <span className="text-[10px] font-semibold text-[#08482D] ml-1 bg-[#DAE7C7]/50 px-1.5 py-0.5 rounded">
                    {review.projectType}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#101410] leading-relaxed line-clamp-3">
                  "{review.text}"
                </p>

                {/* Card Footer: Google verified link */}
                <div className="mt-3 pt-2.5 border-t border-[#DAE7C7]/60 flex items-center justify-between text-[10px] text-[#5E5E61]">
                  <span className="flex items-center gap-1 text-[#08482D] font-semibold">
                    <span className="text-xs">📍</span> Verified Project
                  </span>
                  <a
                    href={BRAND.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#1A73E8] hover:underline font-medium"
                  >
                    View on Google
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}
