"use client";

import React, { useState, useEffect } from "react";
import { BRAND } from "@/lib/constants";
import { Project, Enquiry } from "@/lib/projectStore";

export default function AdminShell() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "enquiries">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);

  // Project Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Construction",
    tagline: "",
    location: "",
    area: "",
    year: "2024",
    status: "Completed",
    featured: true,
    image: "",
    badge: "",
    description: "",
    highlights: "",
    deliverables: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "csbuilder2024") {
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Hint: admin123");
    }
  };

  // Fetch projects & enquiries
  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, enqRes] = await Promise.all([
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/admin/enquiries").then((r) => r.json()),
      ]);

      if (projRes.success) setProjects(projRes.projects);
      if (enqRes.success) setEnquiries(enqRes.enquiries);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) {
      loadData();
    }
  }, [authed]);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Construction",
      tagline: "",
      location: "Bangalore, Karnataka",
      area: "2,500 sq.ft",
      year: "2024",
      status: "Completed",
      featured: true,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      badge: "Turnkey Project",
      description: "",
      highlights: "RCC Framed Structure\nComplete Turnkey Execution\nVastu Compliant",
      deliverables: "Floor Plan · Construction · Handover",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      tagline: p.tagline,
      location: p.location,
      area: p.area,
      year: p.year,
      status: p.status,
      featured: p.featured,
      image: p.image,
      badge: p.badge,
      description: p.description,
      highlights: Array.isArray(p.highlights) ? p.highlights.join("\n") : p.highlights,
      deliverables: p.deliverables,
    });
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return alert("Please enter project title");

    const payload = {
      ...formData,
      highlights: formData.highlights.split("\n").filter(Boolean),
    };

    try {
      if (editingProject) {
        // Update
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...payload }),
        }).then((r) => r.json());

        if (res.success) {
          setIsModalOpen(false);
          loadData();
        } else {
          alert(res.error || "Failed to update project");
        }
      } else {
        // Create
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((r) => r.json());

        if (res.success) {
          setIsModalOpen(false);
          loadData();
        } else {
          alert(res.error || "Failed to create project");
        }
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" }).then((r) => r.json());
      if (res.success) {
        loadData();
      } else {
        alert(res.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Remove this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" }).then((r) => r.json());
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error("Delete enquiry failed:", err);
    }
  };

  // Login Gate
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F8EF]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#DAE7C7] shadow-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#08482D] text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              CS
            </div>
            <h1
              className="text-2xl font-bold text-[#101410]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Admin Control Center
            </h1>
            <p className="text-xs text-[#5E5E61] mt-1">
              Manage website projects, blueprints, and client enquiries
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#101410] mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                placeholder="Enter password (e.g. admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#DAE7C7] focus:outline-none focus:ring-2 focus:ring-[#08482D]/20 focus:border-[#08482D]"
              />
              {authError && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#08482D] text-white text-sm font-bold hover:bg-[#1B4332] transition-all shadow-md"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#DAE7C7] text-center">
            <a
              href="/"
              className="text-xs text-[#08482D] font-semibold hover:underline"
            >
              ← Back to Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8EF] text-[#101410] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#08482D] text-white px-4 sm:px-8 py-4 border-b border-[#DAE7C7]/20 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DAE7C7] text-[#08482D] flex items-center justify-center font-bold text-lg">
            CS
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">
              CS Builder &amp; Developers Admin
            </h1>
            <span className="text-[10px] text-[#DAE7C7] uppercase tracking-wider">
              Live CRUD Operations
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Preview Site ↗
          </a>
          <button
            onClick={() => setAuthed(false)}
            className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-white/80 hover:text-white transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Stat Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7] shadow-xs">
            <span className="text-xs font-semibold text-[#5E5E61] uppercase tracking-wider block mb-1">
              Live Projects
            </span>
            <span className="text-3xl font-bold text-[#08482D]">{projects.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7] shadow-xs">
            <span className="text-xs font-semibold text-[#5E5E61] uppercase tracking-wider block mb-1">
              Client Enquiries
            </span>
            <span className="text-3xl font-bold text-[#C9A96E]">{enquiries.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7] shadow-xs">
            <span className="text-xs font-semibold text-[#5E5E61] uppercase tracking-wider block mb-1">
              Turnkey Sites
            </span>
            <span className="text-3xl font-bold text-[#101410]">
              {projects.filter((p) => p.category === "Construction").length}
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7] shadow-xs">
            <span className="text-xs font-semibold text-[#5E5E61] uppercase tracking-wider block mb-1">
              Direct Phone
            </span>
            <span className="text-sm font-bold text-[#08482D] block truncate">
              {BRAND.phone}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#DAE7C7] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "projects"
                  ? "bg-[#08482D] text-white shadow-xs"
                  : "bg-white text-[#101410] border border-[#DAE7C7] hover:bg-[#DAE7C7]/30"
              }`}
            >
              Projects Portfolio ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "enquiries"
                  ? "bg-[#08482D] text-white shadow-xs"
                  : "bg-white text-[#101410] border border-[#DAE7C7] hover:bg-[#DAE7C7]/30"
              }`}
            >
              Incoming Leads ({enquiries.length})
            </button>
          </div>

          {activeTab === "projects" && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-[#08482D] text-white text-xs sm:text-sm font-bold hover:bg-[#1B4332] active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>+</span> Add New Project
            </button>
          )}
        </div>

        {/* ─── TAB 1: PROJECTS LIST (CRUD) ───────────────────────────────── */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-[#5E5E61] text-sm">
                Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#DAE7C7]">
                <p className="text-[#5E5E61]">No projects found. Click "Add New Project" above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-[#DAE7C7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="h-44 w-full bg-[#F5F8EF] relative overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-[#08482D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {p.category}
                        </span>
                        <span className="absolute top-3 right-3 bg-white/90 text-[#101410] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {p.status}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="font-bold text-base text-[#101410] leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#5E5E61] mt-1 line-clamp-2">
                          {p.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] text-[#08482D] font-medium">
                          <span>📍 {p.location}</span>
                          <span>•</span>
                          <span>📐 {p.area}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 pb-5 pt-2 border-t border-[#DAE7C7]/50 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="px-3 py-1.5 rounded-lg bg-[#F5F8EF] hover:bg-[#DAE7C7] text-xs font-bold text-[#08482D] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-xs font-bold text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: INCOMING CLIENT ENQUIRIES ──────────────────────────── */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#DAE7C7]">
                <p className="text-[#5E5E61]">No customer enquiries received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl p-5 border border-[#DAE7C7] shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-[#101410]">
                            {enq.name}
                          </h3>
                          <span className="text-xs font-semibold text-[#08482D]">
                            Stage: {enq.stage}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#5E5E61] bg-[#F5F8EF] px-2 py-1 rounded-md">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-xs space-y-1 text-[#5E5E61]">
                        <p>📍 <strong>Location:</strong> {enq.location}</p>
                        <p>💰 <strong>Budget:</strong> {enq.budget || "Not provided"}</p>
                        {enq.requirements && (
                          <div className="bg-[#F5F8EF] p-2.5 rounded-xl text-[#101410] mt-2 italic">
                            "{enq.requirements}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#DAE7C7]/50 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${enq.phone}`}
                          className="px-3 py-1.5 rounded-lg bg-[#08482D] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors"
                        >
                          📞 Call {enq.phone}
                        </a>
                        <a
                          href={`https://wa.me/91${enq.phone}?text=Hello%20${encodeURIComponent(enq.name)},%20this%20is%20Er.%20MD%20Chand%20from%20CS%20Builder%20%26%20Developers.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                        >
                          WhatsApp
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="text-xs text-red-500 hover:text-red-700 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─── ADD / EDIT PROJECT MODAL ────────────────────────────────────── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#DAE7C7] shadow-2xl my-8 relative"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101410]">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F5F8EF] flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#101410] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Skyline 4BHK Duplex Residence"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101410] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                  >
                    <option value="Construction">Construction</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Land">Land</option>
                    <option value="Interiors">Interiors</option>
                    <option value="Supplies">Supplies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101410] mb-1">
                    Status
                  </label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="Completed / In Progress"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101410] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bangalore, Karnataka"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101410] mb-1">
                    Area
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="3,200 sq.ft"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101410] mb-1">
                  Image URL or Local Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/plan_ground.jpg or https://images.unsplash..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                />
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "/images/plan_ground.jpg" })}
                    className="text-[10px] text-[#08482D] underline"
                  >
                    Use Ground Floor Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "/images/plan_basement.jpg" })}
                    className="text-[10px] text-[#08482D] underline"
                  >
                    Use Basement Plan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101410] mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key features of the architecture or construction..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101410] mb-1">
                  Highlights (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="RCC Raft Foundation&#10;Vastu Compliant&#10;In-house Cement"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#DAE7C7]"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DAE7C7] text-xs font-bold text-[#5E5E61]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#08482D] text-white text-xs font-bold hover:bg-[#1B4332]"
                >
                  {editingProject ? "Update Project" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
