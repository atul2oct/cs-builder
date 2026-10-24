"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants";

/**
 * Admin shell — placeholder for Phase 3 full CMS.
 *
 * Phase 3 will replace this with:
 * - Sanity Studio embedded at /studio for project management
 * - Or a custom admin dashboard backed by Supabase/PlanetScale
 * - Authentication via NextAuth.js or Clerk (admin role)
 */
export default function AdminShell() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  // Very simple client-side gate — real auth comes in Phase 3
  // This is NOT secure — it's just a placeholder skeleton
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      // placeholder
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "var(--color-surface)" }}
      >
        <div
          className="w-full max-w-sm rounded-2xl border p-8 space-y-6"
          style={{ borderColor: "rgba(201,169,110,0.25)", background: "#fff" }}
        >
          <div className="text-center">
            <h1
              className="text-xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              Admin Access
            </h1>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
              {BRAND.name}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pw"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-ink)" }}
              >
                Password
              </label>
              <input
                id="admin-pw"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={error ? "admin-pw-err" : undefined}
                aria-invalid={!!error}
                className="w-full rounded-lg px-4 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/30 focus:border-[var(--color-forest)]"
              />
              {error && (
                <p id="admin-pw-err" role="alert" className="text-xs text-red-600 mt-1">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl py-3 text-sm font-semibold"
              style={{
                background: "var(--color-forest)",
                color: "#fff",
              }}
            >
              Sign In
            </button>
          </form>

          <p
            className="text-xs text-center"
            style={{ color: "var(--color-ink-muted)" }}
          >
            ⚠️ Phase 3 will add proper authentication (NextAuth/Clerk)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Admin header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{
          background: "var(--color-forest)",
          borderColor: "rgba(201,169,110,0.2)",
        }}
      >
        <h1
          className="text-lg font-bold"
          style={{ color: "#fff", fontFamily: "var(--font-display)" }}
        >
          CS Builder — Admin
        </h1>
        <button
          onClick={() => setAuthed(false)}
          className="text-sm px-4 py-1.5 rounded-lg border"
          style={{
            color: "rgba(255,255,255,0.8)",
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          Sign out
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Dashboard cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Total Enquiries", value: "—", icon: "📬" },
            { label: "Active Projects", value: "—", icon: "🏗️" },
            { label: "This Month", value: "—", icon: "📅" },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="rounded-2xl border p-6 space-y-2"
              style={{ borderColor: "rgba(201,169,110,0.2)", background: "#fff" }}
            >
              <div className="text-2xl" aria-hidden="true">
                {icon}
              </div>
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                {value}
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder sections */}
        {[
          { title: "Projects", desc: "Add, edit, and delete projects shown on the website. Set featured status and filter categories." },
          { title: "Enquiries", desc: "View and respond to enquiries submitted through the website contact form." },
          { title: "Content", desc: "Update testimonials, trust signals, and website copy without touching code." },
        ].map(({ title, desc }) => (
          <section
            key={title}
            className="rounded-2xl border p-8"
            style={{ borderColor: "rgba(201,169,110,0.2)", background: "#fff" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                {title}
              </h2>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ background: "rgba(27,67,50,0.08)", color: "var(--color-forest)" }}
              >
                Phase 3
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
              {desc}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
