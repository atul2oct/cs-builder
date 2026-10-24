"use client";

import { useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/hero/Hero";
import LandToLivingSection from "@/components/land-to-living/LandToLivingSection";
import ProjectsCarousel from "@/components/projects/ProjectsCarousel";
import TrustSection from "@/components/trust/TrustSection";
import GoogleReviewsCarousel from "@/components/reviews/GoogleReviewsCarousel";
import ContactSection from "@/components/contact/ContactSection";
import EnquiryModal from "@/components/enquiry/EnquiryModal";
import StickyMobileCTA from "@/components/sticky/StickyMobileCTA";
import { BRAND } from "@/lib/constants";

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openEnquiry = () => setEnquiryOpen(true);
  const closeEnquiry = () => setEnquiryOpen(false);

  return (
    <div className="min-h-screen bg-[#F5F8EF] text-[#101410] flex flex-col selection:bg-[#DAE7C7] selection:text-[#08482D]">
      {/* ── Navbar ────────────────────────────────────────────── */}
      <Navbar onOpenEnquiry={openEnquiry} />

      {/* ── Main Content Landmark ─────────────────────────────── */}
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        {/* 1. Reelmark-Inspired Hero Section */}
        <Hero onOpenEnquiry={openEnquiry} />

        {/* 2. Interactive 3D "Land to Living" Construction Journey */}
        <LandToLivingSection onOpenEnquiry={openEnquiry} />

        {/* 3. Featured Projects & Blueprints Carousel (with Admin CRUD Sync) */}
        <ProjectsCarousel onOpenEnquiry={openEnquiry} />

        {/* 4. Engineering Credentials & In-House Supply Engine */}
        <TrustSection />

        {/* 5. Google Customer Reviews Carousel (Smooth right-to-left marquee + 2x zoom on hover) */}
        <GoogleReviewsCarousel />

        {/* 6. Contact Section & Responsive Location Map */}
        <ContactSection onOpenEnquiry={openEnquiry} />
      </main>

      {/* ── Site Footer ────────────────────────────────────────── */}
      <footer
        className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#DAE7C7] bg-white text-[#101410]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#08482D] flex items-center justify-center text-white font-bold text-sm">
                CS
              </div>
              <div>
                <span className="block text-base font-bold text-[#08482D] leading-none">
                  CS BUILDER &amp; DEVELOPERS
                </span>
                <span className="text-[10px] font-semibold text-[#C9A96E] uppercase tracking-widest">
                  From Land to Living
                </span>
              </div>
            </div>
            <p className="text-xs text-[#5E5E61] max-w-sm leading-relaxed">
              Complete turnkey home construction, architectural layout design,
              civil structural engineering, and in-house wholesale building materials.
            </p>
            <p className="text-xs font-semibold text-[#08482D]">
              Direct Helpline: {BRAND.phone}
            </p>
            <p className="text-xs text-[#5E5E61]">
              📍 {BRAND.address}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101410]">
              Our Capabilities
            </h4>
            <ul className="text-xs text-[#5E5E61] space-y-1.5">
              <li>• Land Search &amp; Title Verification</li>
              <li>• CAD 3D Architecture &amp; Floor Plans</li>
              <li>• RCC Foundation &amp; Structural Slabs</li>
              <li>• In-House Cement, Steel &amp; Paint Depot</li>
              <li>• Turnkey Interior Design &amp; Modular Woodwork</li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101410]">
              Engineering Oversight
            </h4>
            <p className="text-xs text-[#5E5E61] leading-relaxed">
              Led by <strong>Er. MD Chand</strong> (B.E. Civil Engineering, NMIT - 8.71 CGPA Distinction),
              Associate Member of The Institution of Engineers (India) AM3057456.
            </p>
            <div className="pt-1">
              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08482D] bg-[#DAE7C7]/50 hover:bg-[#DAE7C7] px-3 py-1.5 rounded-lg border border-[#08482D]/15 transition-all"
              >
                🔒 Admin CRUD Portal ↗
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#DAE7C7]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5E5E61]">
          <p>© 2025 CS Builder &amp; Developers. All rights reserved.</p>
          <p className="text-[11px]">
            Designed with precision • Built for lifelong comfort
          </p>
        </div>
      </footer>

      {/* ── Native Accessible Enquiry Modal ───────────────────── */}
      <EnquiryModal open={enquiryOpen} onClose={closeEnquiry} />

      {/* ── Sticky Mobile CTA for Thumb Reach ─────────────────── */}
      <StickyMobileCTA onOpenEnquiry={openEnquiry} />
    </div>
  );
}
