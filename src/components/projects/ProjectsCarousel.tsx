"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/lib/projectStore";

interface Props {
  onOpenEnquiry: () => void;
}

export default function ProjectsCarousel({ onOpenEnquiry }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Load projects from API or fallback
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.projects) {
          setProjects(data.projects);
        }
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const categories = ["All", "Architecture", "Construction", "Land", "Interiors", "Supplies"];

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.6; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollBy = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      aria-label="Featured Projects Portfolio"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Reelmark-Style Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative">
        {/* Handwritten Annotation */}
        <div
          className="hand-note text-2xl sm:text-3xl font-semibold absolute -top-8 right-6 rotate-6 hidden sm:block"
          aria-hidden="true"
        >
          // Real blueprints & executions
        </div>

        {/* Mint Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#08482D]" />
          Our Work Speaks
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101410] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Featured Projects <span className="italic text-[#08482D]">&amp; Layouts</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5E5E61] leading-relaxed">
          Explore our certified civil engineering blueprints, ongoing construction sites,
          gated residential plots, and bespoke interior spaces.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#08482D] text-white shadow-md shadow-[#08482D]/20"
                  : "bg-white text-[#101410] hover:bg-[#DAE7C7]/40 border border-[#DAE7C7]"
              }`}
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows for Carousel */}
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-xs text-[#5E5E61] font-medium">
          Showing {filtered.length} projects • Drag or swipe to explore
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-360)}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full bg-white border border-[#DAE7C7] flex items-center justify-center text-[#08482D] hover:bg-[#DAE7C7]/30 transition-all shadow-xs"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(360)}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full bg-white border border-[#DAE7C7] flex items-center justify-center text-[#08482D] hover:bg-[#DAE7C7]/30 transition-all shadow-xs"
          >
            →
          </button>
        </div>
      </div>

      {/* Interactive Reelmark-style Card Carousel */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar scroll-smooth ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
      >
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            style={{ scrollSnapAlign: "start" }}
            className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] bg-white rounded-3xl overflow-hidden border border-[#DAE7C7] shadow-lg shadow-[#08482D]/5 hover:shadow-xl hover:border-[#08482D]/40 transition-all duration-300 group flex flex-col"
          >
            {/* Card Image / Blueprint */}
            <div className="relative h-60 w-full overflow-hidden bg-[#FBFBF7]">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#08482D] border border-[#DAE7C7] shadow-xs">
                {proj.badge || proj.category}
              </div>
              {/* Status Pill */}
              <div className="absolute top-4 right-4 bg-[#08482D]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white">
                {proj.status}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#C9A96E] mb-1">
                  {proj.location} • {proj.area}
                </p>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#101410] group-hover:text-[#08482D] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {proj.title}
                </h3>
                <p className="text-xs text-[#5E5E61] mt-2 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="border-t border-[#DAE7C7]/50 pt-3 space-y-1.5">
                {proj.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#101410]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08482D] flex-shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-[#F5F8EF] group-hover:bg-[#08482D] text-[#08482D] group-hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-[#DAE7C7]"
              >
                View Full Details &amp; Plan
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#DAE7C7] shadow-2xl relative"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5F8EF] border border-[#DAE7C7] flex items-center justify-center text-[#101410] hover:bg-[#DAE7C7] transition-all font-bold"
              aria-label="Close project modal"
            >
              ✕
            </button>

            {/* Project Image / Blueprint View */}
            <div className="rounded-2xl overflow-hidden mb-6 border border-[#DAE7C7] max-h-80 bg-[#F5F8EF]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-contain max-h-80 mx-auto"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#DAE7C7] text-[#08482D] text-xs font-bold px-3 py-1 rounded-full">
                  {selectedProject.badge}
                </span>
                <span className="text-xs text-[#5E5E61] font-medium">
                  {selectedProject.location} • {selectedProject.area}
                </span>
              </div>

              <h3
                className="text-2xl font-bold text-[#101410]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {selectedProject.title}
              </h3>
              <p className="text-sm font-semibold text-[#08482D]">
                {selectedProject.tagline}
              </p>
              <p className="text-sm text-[#5E5E61] leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#101410] mb-2">
                  Technical Specifications &amp; Engineering Highlights:
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#101410]">
                      <span className="text-[#08482D] font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F5F8EF] p-4 rounded-xl border border-[#DAE7C7]">
                <span className="text-xs font-bold text-[#08482D] uppercase block mb-1">
                  Deliverables:
                </span>
                <p className="text-xs font-medium text-[#101410]">
                  {selectedProject.deliverables}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenEnquiry();
                  }}
                  className="flex-1 py-3 px-6 rounded-xl bg-[#08482D] text-white text-sm font-bold hover:bg-[#1B4332] transition-all text-center"
                >
                  Enquire About Similar Project
                </button>
                <a
                  href="tel:+917307478258"
                  className="py-3 px-6 rounded-xl border border-[#08482D] text-[#08482D] hover:bg-[#08482D]/5 text-sm font-bold transition-all text-center"
                >
                  Call Er. MD Chand
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
