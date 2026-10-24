"use client";

import { BRAND } from "@/lib/constants";

interface Props {
  onOpenEnquiry: () => void;
}

export default function StickyMobileCTA({ onOpenEnquiry }: Props) {
  const whatsappUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
    BRAND.whatsappMessage
  )}`;

  return (
    /* Visible only on mobile (hidden on md+) */
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: "rgba(248, 246, 241, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201, 169, 110, 0.3)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex gap-3 px-4 py-3">
        {/* Primary CTA */}
        <button
          onClick={onOpenEnquiry}
          className="flex-1 rounded-xl py-3 text-sm font-semibold transition-all active:scale-95"
          style={{
            background: "var(--color-forest)",
            color: "var(--color-white)",
          }}
        >
          Discuss Your Project
        </button>

        {/* WhatsApp shortcut */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center w-12 rounded-xl transition-all active:scale-95 flex-shrink-0"
          style={{ background: "#25D366" }}
        >
          <WhatsAppIconSmall />
        </a>
      </div>
    </div>
  );
}

function WhatsAppIconSmall() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.95 0C5.354 0 0 5.354 0 11.95c0 2.077.54 4.03 1.484 5.718L0 24l6.477-1.462A11.908 11.908 0 0 0 11.95 23.9C18.546 23.9 23.9 18.546 23.9 11.95S18.546 0 11.95 0zm0 21.808a9.855 9.855 0 0 1-5.032-1.374l-.36-.214-3.733.842.858-3.637-.235-.373A9.86 9.86 0 0 1 2.093 11.95c0-5.443 4.414-9.857 9.857-9.857 5.444 0 9.858 4.414 9.858 9.857 0 5.444-4.414 9.858-9.858 9.858z" />
    </svg>
  );
}
