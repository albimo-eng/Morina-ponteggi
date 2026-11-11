import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/icons";
import { PageHeader } from "@/components/site/PageHeader";
import { QuoteForm } from "@/components/site/QuoteForm";
import { trackEvent } from "@/lib/analytics";
import { PHONE_HREF, SITE, whatsappUrl } from "@/lib/site";

const TITLE = "Contatti e preventivo ponteggi | Morina Ponteggi";
const DESC = "Richiedi un preventivo per montaggio, smontaggio o noleggio ponteggi. Chiama o scrivi su WhatsApp al +39 349 849 3780.";

export const Route = createFileRoute("/contatti")({
  staticData: { sitemap: true },
  validateSearch: (s: Record<string, unknown>): { servizio?: string } =>
    typeof s.servizio === "string" ? { servizio: s.servizio } : {},
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contatti" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contatti" }],
  }),
  component: Contatti,
});

function Contatti() {
  const { servizio } = Route.useSearch();
  return (
    <>
      <PageHeader
        code="P/04"
        eyebrow="Contatti · Preventivo"
        title="Richiedi un preventivo."
        lead="Compila il modulo, chiamaci o scrivici su WhatsApp."
      />
      <section className="container-x section-y grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-28">
            <div>
              <h2 className="eyebrow text-muted-foreground">Telefono</h2>
              <a
                href={PHONE_HREF}
                onClick={() => trackEvent("click_call", { from: "contatti" })}
                className="mt-3 flex items-center gap-3 font-wide text-2xl tabular-nums hover:text-primary"
              >
                <Phone className="size-5" aria-hidden="true" /> {SITE.phoneDisplay}
              </a>
            </div>
            <div>
              <h2 className="eyebrow text-muted-foreground">WhatsApp</h2>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_whatsapp", { from: "contatti" })}
                className="mt-3 flex items-center gap-3 text-lg font-semibold hover:text-primary"
              >
                <WhatsAppIcon className="size-5" /> Scrivici su WhatsApp
              </a>
            </div>
            <div>
              <h2 className="eyebrow text-muted-foreground">Zone servite</h2>
              <p className="mt-3">Brescia, Milano e altre zone del Nord Italia su richiesta.</p>
            </div>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <QuoteForm defaultService={servizio} />
        </div>
      </section>
    </>
  );
}
