"use client";

import React from "react";
import { BRAND } from "@/lib/constants";

interface Props {
  onOpenEnquiry: () => void;
}

export default function ContactSection({ onOpenEnquiry }: Props) {
  const whatsappUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
    BRAND.whatsappMessage
  )}`;

  return (
    <section
      id="contact"
      aria-label="Contact and Office Map"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="bg-[#08482D] rounded-3xl overflow-hidden shadow-2xl border border-[#DAE7C7]/30 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Phone, WhatsApp & Office details (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-bold uppercase tracking-wider mb-6">
                Direct Contact &amp; Office
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let's Build Your <span className="text-[#DAE7C7] italic">Dream Home</span>
              </h2>

              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Visit our office or call directly to discuss land purchase, architectural floor plans,
                structural blueprints, and turnkey construction.
              </p>

              {/* Office Address Card */}
              <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DAE7C7]">
                  <span>📍</span> Office &amp; Site Location
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {BRAND.address}
                </p>
                <div className="pt-1">
                  <a
                    href={BRAND.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#DAE7C7] hover:underline font-medium"
                  >
                    Open in Google Maps App ↗
                  </a>
                </div>
              </div>

              {/* Direct Phone Call Card */}
              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/15 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DAE7C7] text-[#08482D] flex items-center justify-center text-xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                    📞
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DAE7C7] block">
                      Call Direct
                    </span>
                    <span className="text-lg font-bold text-white tracking-wide">
                      {BRAND.phone}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Chat Card */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-all border border-[#25D366]/40 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center text-xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                    💬
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A7F3D0] block">
                      WhatsApp Quick Chat
                    </span>
                    <span className="text-base font-bold text-white">
                      Instant Architecture Consultation
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Modal Trigger Button */}
            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="w-full py-4 px-6 rounded-2xl bg-[#DAE7C7] text-[#08482D] text-base font-bold hover:bg-white active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Open Project Enquiry Form
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Embedded Responsive Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#101410] relative min-h-[380px] lg:min-h-full flex flex-col justify-between">
            {/* Live Google Map iframe pointing to Uttar Pradesh location */}
            <div className="w-full h-full min-h-[400px] lg:min-h-[520px] relative">
              <iframe
                title="Cs Builders And Developers Location Map"
                src={BRAND.mapEmbedUrl}
                className="w-full h-full border-0 absolute inset-0 filter contrast-105 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Note Banner */}
            <div className="bg-[#08482D]/95 backdrop-blur-md p-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="text-white/90 font-medium">
                  {BRAND.address}
                </span>
              </div>
              <a
                href={BRAND.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DAE7C7] font-semibold hover:underline flex-shrink-0"
              >
                Get Directions ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
