"use client";

import { useState } from "react";
import { BRAND, PROJECT_STAGES, type ProjectStage } from "@/lib/constants";

interface FormData {
  name: string;
  phone: string;
  location: string;
  stage: ProjectStage | "";
  budget: string;
  requirements: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  location?: string;
  stage?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function EnquiryFormContent({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    location: "",
    stage: "",
    budget: "",
    requirements: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!formData.location.trim())
      newErrors.location = "Please enter your project location.";
    if (!formData.stage) newErrors.stage = "Please select your current stage.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");

    try {
      // Submit to API route
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");

      // Track conversion event
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as unknown as Record<string, Function>).gtag("event", "enquiry_submitted", {
          event_category: "lead",
          event_label: formData.stage,
        });
      }

      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return <SuccessState name={formData.name} onClose={onClose} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
      <p
        id="enquiry-desc"
        className="text-sm"
        style={{ color: "var(--color-ink-muted)" }}
      >
        Fill in a few details and our team will reach out within 24 hours.
      </p>

      {/* Name */}
      <Field
        id="eq-name"
        label="Full Name"
        required
        error={errors.name}
      >
        <input
          id="eq-name"
          name="name"
          type="text"
          autoComplete="given-name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          aria-describedby={errors.name ? "eq-name-err" : undefined}
          aria-invalid={!!errors.name}
          required
          className={inputCls(!!errors.name)}
        />
        {errors.name && (
          <ErrorMsg id="eq-name-err" msg={errors.name} />
        )}
      </Field>

      {/* Phone */}
      <Field
        id="eq-phone"
        label="Phone Number"
        required
        error={errors.phone}
      >
        <input
          id="eq-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          aria-describedby={errors.phone ? "eq-phone-err" : undefined}
          aria-invalid={!!errors.phone}
          required
          className={inputCls(!!errors.phone)}
        />
        {errors.phone && (
          <ErrorMsg id="eq-phone-err" msg={errors.phone} />
        )}
      </Field>

      {/* Location */}
      <Field
        id="eq-location"
        label="Project Location"
        required
        error={errors.location}
      >
        <input
          id="eq-location"
          name="location"
          type="text"
          autoComplete="address-level2"
          value={formData.location}
          onChange={handleChange}
          placeholder="City / area where you want to build"
          aria-describedby={errors.location ? "eq-loc-err" : undefined}
          aria-invalid={!!errors.location}
          required
          className={inputCls(!!errors.location)}
        />
        {errors.location && (
          <ErrorMsg id="eq-loc-err" msg={errors.location} />
        )}
      </Field>

      {/* Stage */}
      <Field
        id="eq-stage"
        label="Current Stage"
        required
        error={errors.stage}
      >
        <select
          id="eq-stage"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          aria-describedby={errors.stage ? "eq-stage-err" : undefined}
          aria-invalid={!!errors.stage}
          required
          className={inputCls(!!errors.stage)}
        >
          <option value="">Select your stage…</option>
          {PROJECT_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.stage && (
          <ErrorMsg id="eq-stage-err" msg={errors.stage} />
        )}
      </Field>

      {/* Budget (optional) */}
      <Field id="eq-budget" label="Approximate Budget (optional)">
        <input
          id="eq-budget"
          name="budget"
          type="text"
          inputMode="numeric"
          value={formData.budget}
          onChange={handleChange}
          placeholder="e.g. ₹50 lakhs – ₹1 crore"
          className={inputCls(false)}
        />
      </Field>

      {/* Requirements */}
      <Field id="eq-req" label="Brief Requirements (optional)">
        <textarea
          id="eq-req"
          name="requirements"
          rows={3}
          value={formData.requirements}
          onChange={handleChange}
          placeholder="e.g. 3 BHK duplex, Vastu compliant, ground + 1 floors…"
          className={`${inputCls(false)} resize-none`}
        />
      </Field>

      {formState === "error" && (
        <p
          role="alert"
          className="text-sm rounded-lg px-4 py-3"
          style={{
            background: "#FEF2F2",
            color: "#991B1B",
          }}
        >
          Something went wrong. Please try again or call us at{" "}
          <a
            href={`tel:${BRAND.phone}`}
            className="underline font-medium"
          >
            {BRAND.phone}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "var(--color-forest)",
          color: "var(--color-white)",
        }}
      >
        {formState === "submitting" ? "Sending…" : "Send My Enquiry"}
      </button>

      <p
        className="text-xs text-center"
        style={{ color: "var(--color-ink-muted)" }}
      >
        By submitting you agree to be contacted by our team. No spam, ever.
      </p>
    </form>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: "var(--color-ink)" }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "var(--color-forest)" }}>
            {" "}*
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function ErrorMsg({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} className="text-xs" style={{ color: "#DC2626" }} role="alert">
      {msg}
    </p>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg px-4 py-2.5 text-sm border transition-colors duration-150",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "focus:ring-[var(--color-forest)]/30 focus:border-[var(--color-forest)]",
  ]
    .filter(Boolean)
    .join(" ");
}

/* ─── Success state ──────────────────────────────────────────────────────── */
function SuccessState({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const whatsappUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
    BRAND.whatsappMessage
  )}`;

  return (
    <div className="p-8 text-center space-y-5">
      {/* Tick icon */}
      <div
        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "#D1FAE5" }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <div>
        <h3
          className="text-xl font-semibold mb-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
        >
          Thank you, {name}!
        </h3>
        <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
          We've received your enquiry and will call you within{" "}
          <strong>24 hours</strong>. For faster response, you can also reach us
          on WhatsApp right now.
        </p>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full rounded-xl py-3.5 text-base font-semibold transition-opacity hover:opacity-90"
        style={{ background: "#25D366", color: "#fff" }}
      >
        <WhatsAppIcon />
        Chat on WhatsApp
      </a>

      <button
        onClick={onClose}
        className="text-sm underline underline-offset-2"
        style={{ color: "var(--color-ink-muted)" }}
      >
        Close
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.95 0C5.354 0 0 5.354 0 11.95c0 2.077.54 4.03 1.484 5.718L0 24l6.477-1.462A11.908 11.908 0 0 0 11.95 23.9C18.546 23.9 23.9 18.546 23.9 11.95S18.546 0 11.95 0zm0 21.808a9.855 9.855 0 0 1-5.032-1.374l-.36-.214-3.733.842.858-3.637-.235-.373A9.86 9.86 0 0 1 2.093 11.95c0-5.443 4.414-9.857 9.857-9.857 5.444 0 9.858 4.414 9.858 9.857 0 5.444-4.414 9.858-9.858 9.858z" />
    </svg>
  );
}
