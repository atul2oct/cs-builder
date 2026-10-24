"use client";

import { useRef, useEffect } from "react";
import { BRAND } from "@/lib/constants";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync open state with native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  // Close on native close event (Esc key, closedby attribute)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (isOutside) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="enquiry-title"
      aria-describedby="enquiry-desc"
      onClick={handleBackdropClick}
      className="w-full max-w-lg mx-auto my-auto rounded-2xl overflow-hidden shadow-2xl"
      style={{ maxHeight: "95dvh" }}
    >
      <div
        className="relative flex flex-col"
        style={{ background: "var(--color-surface)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--color-sand-light)" }}
        >
          <div>
            <p
              className="text-sm font-medium uppercase tracking-widest mb-0.5"
              style={{ color: "var(--color-forest-mid)" }}
            >
              {BRAND.name}
            </p>
            <h2
              id="enquiry-title"
              className="text-xl font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              Discuss Your Project
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close enquiry form"
            className="rounded-full w-9 h-9 flex items-center justify-center transition-colors hover:bg-black/8 focus-visible:bg-black/8"
            style={{ color: "var(--color-ink-muted)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(95dvh - 80px)" }}>
          <EnquiryFormContent onClose={onClose} />
        </div>
      </div>
    </dialog>
  );
}

/* ─── Form content extracted so dialog scroll container stays clean ─── */
import EnquiryFormContent from "./EnquiryFormContent";
