import { Link } from "@tanstack/react-router";
import { FileText, Phone } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { PHONE_HREF, whatsappUrl } from "@/lib/site";

import { WhatsAppIcon } from "./icons";

/** Sticky bottom action bar, mobile only. Layout reserves space via pb on <main>. */
export function MobileCta() {
  const item =
    "flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] [&_svg]:size-5";
  return (
    <nav
      aria-label="Contatto rapido"
      className="surface-ink fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink-border pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <a href={PHONE_HREF} className={item} onClick={() => trackEvent("click_call", { from: "sticky" })}>
        <Phone aria-hidden="true" />
        Chiama
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-x border-ink-border`}
        onClick={() => trackEvent("click_whatsapp", { from: "sticky" })}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <Link to="/contatti" className={`${item} bg-primary text-primary-foreground`}>
        <FileText aria-hidden="true" />
        Preventivo
      </Link>
    </nav>
  );
}
