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
                Direct Contact
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let's Build Your <span className="text-[#DAE7C7] italic">Dream Home</span>
              </h2>

              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Whether you have an empty plot, need land acquisition guidance,
                or want structural blueprints and turnkey construction, reach out directly.
              </p>

              {/* Direct Phone Call Card */}
              <div className="mt-8 space-y-4">
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
            <div className="pt-4">
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
          <div className="lg:col-span-7 bg-[#101410] relative min-h-[360px] lg:min-h-full flex flex-col justify-between">
            {/* Google Map iframe */}
            <div className="w-full h-full min-h-[380px] lg:min-h-[480px] relative">
              <iframe
                title="CS Builder & Developers Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124368.51339891048!2d77.51307062499999!3d13.067439000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0 filter contrast-105 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Note Banner */}
            <div className="bg-[#08482D]/95 backdrop-blur-md p-4 border-t border-white/10 flex items-center justify-between z-10 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="text-white/90">
                  Head Office &amp; Material Logistics Depot • Serving Bangalore &amp; Karnataka
                </span>
              </div>
              <span className="text-[#DAE7C7] font-semibold hidden sm:inline">
                +91 73074 78258
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
