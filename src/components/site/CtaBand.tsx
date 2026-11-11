import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { PHONE_HREF, SITE, whatsappUrl } from "@/lib/site";

import { WhatsAppIcon } from "./icons";

export function CtaBand() {
  return (
    <section className="surface-ink bg-grid relative overflow-hidden" aria-labelledby="cta-title">
      <div className="container-x section-y grid gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="eyebrow text-primary">Preventivo</span>
          <h2 id="cta-title" className="reveal mt-5 font-wide text-display-lg">
            Hai un cantiere in programma?
          </h2>
          <p className="mt-6 max-w-xl text-lead text-ink-muted">
            Inviaci città, tipo di intervento e superficie indicativa: ti ricontattiamo per definire
            il preventivo.
          </p>
        </div>
        <div className="grid gap-3 md:col-span-5">
          <Button asChild size="lg">
            <Link to="/contatti">
              Richiedi preventivo
              <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" variant="outline-ink">
              <a href={PHONE_HREF} onClick={() => trackEvent("click_call", { from: "cta" })}>
                <Phone aria-hidden="true" />
                <span className="tabular-nums">{SITE.phoneDisplay}</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-ink">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_whatsapp", { from: "cta" })}
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
