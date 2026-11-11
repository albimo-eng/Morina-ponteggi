import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { WhatsAppIcon } from "@/components/site/icons";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { ScaffoldHero } from "@/components/site/ScaffoldHero";
import { Button } from "@/components/ui/button";
import { GALLERY } from "@/content/gallery";
import { trackEvent } from "@/lib/analytics";
import { PHONE_HREF, SERVICES, SITE, whatsappUrl } from "@/lib/site";

const TITLE = "Morina Ponteggi — Montaggio, smontaggio e noleggio ponteggi a Brescia e Milano";
const DESCRIPTION =
  "Montaggio, smontaggio e noleggio di ponteggi per facciate, ristrutturazioni ed edifici industriali a Brescia, Milano e nel Nord Italia. Richiedi un preventivo.";

// Only verified fields: no address, opening hours, ratings or founding date until confirmed by the owner.
const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description:
    "Montaggio, smontaggio e noleggio di ponteggi per facciate, ristrutturazioni ed edifici industriali.",
  telephone: SITE.phoneE164,
  areaServed: [
    { "@type": "City", name: "Brescia" },
    { "@type": "City", name: "Milano" },
    { "@type": "Place", name: "Nord Italia" },
  ],
  knowsAbout: SERVICES.map((s) => s.title),
};

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS) }],
  }),
  component: Home,
});

const STEPS = [
  {
    n: "01",
    title: "Richiesta",
    text: "Ci invii città del cantiere, tipo di intervento, superficie indicativa e tempi previsti.",
  },
  {
    n: "02",
    title: "Valutazione",
    text: "Analizziamo misure, accessi e fasi di lavoro per individuare la soluzione più adatta.",
  },
  {
    n: "03",
    title: "Preventivo",
    text: "Prepariamo un preventivo personalizzato in base alle caratteristiche del cantiere, alla tipologia di ponteggio, alle superfici e alla durata prevista dei lavori.",
  },
  {
    n: "04",
    title: "Montaggio",
    text: "Montiamo il ponteggio nella data concordata, coordinandoci con l'impresa sul cantiere.",
  },
  {
    n: "05",
    title: "Noleggio",
    text: "Mettiamo a disposizione il ponteggio per il periodo concordato, con condizioni e durata del noleggio definite in fase di preventivo.",
  },
  {
    n: "06",
    title: "Smontaggio e ritiro",
    text: "A fine lavori smontiamo la struttura e ritiriamo il materiale.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-grid relative overflow-hidden border-b border-border">
        <div className="container-x grid gap-10 pb-12 pt-10 md:pt-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-16">
          <div className="lg:col-span-7">
            <div className="animate-rise flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow text-primary">Ponteggi</span>
              <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
              <span className="eyebrow text-muted-foreground">Brescia · Milano · Nord Italia</span>
            </div>
            <h1 className="animate-rise mt-6 font-wide text-display-xl [animation-delay:80ms]">
              Ponteggi
              <br />
              montati con
              <br />
              <span className="text-primary">metodo.</span>
            </h1>
            <p className="animate-rise mt-7 max-w-xl text-lead text-muted-foreground [animation-delay:160ms]">
              Montaggio, smontaggio e noleggio di ponteggi per facciate, ristrutturazioni ed edifici
              industriali. Un unico referente dal preventivo al ritiro.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
              <Button asChild size="lg">
                <Link to="/contatti">
                  Richiedi preventivo
                  <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("click_whatsapp", { from: "hero" })}
                >
                  <WhatsAppIcon /> Scrivici su WhatsApp
                </a>
              </Button>
            </div>
            <a
              href={PHONE_HREF}
              onClick={() => trackEvent("click_call", { from: "hero" })}
              className="animate-rise mt-6 inline-flex items-center gap-2 font-mono text-sm tabular-nums text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary [animation-delay:300ms]"
            >
              <Phone className="size-4" aria-hidden="true" />
              Chiama {SITE.phoneDisplay}
            </a>
          </div>
          <div className="relative lg:col-span-5">
            <ScaffoldHero className="mx-auto block h-auto w-full max-w-[520px] lg:max-w-none" />
          </div>
        </div>

        {/* Spec strip */}
        <div className="border-t border-border bg-background/70">
          <ul className="container-x grid grid-cols-3 divide-x divide-border">
            {["Montaggio", "Smontaggio", "Noleggio"].map((s, i) => (
              <li key={s} className="flex items-center gap-3 py-4 pl-3 first:pl-0 md:py-5 md:pl-6">
                <span className="eyebrow hidden text-primary sm:inline">0{i + 1}</span>
                <span className="text-sm font-semibold md:text-base">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES INDEX */}
      <section className="section-y" aria-labelledby="servizi-title">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span className="eyebrow text-primary">Servizi</span>
              <h2 id="servizi-title" className="reveal mt-5 font-wide text-display-lg">
                Sei servizi,
                <br />
                una sola struttura.
              </h2>
            </div>
            <p className="text-muted-foreground md:col-span-5 md:pb-2">
              Dall'installazione al ritiro, per cantieri residenziali, commerciali e industriali.
            </p>
          </div>

          <ol className="mt-14 border-t border-border-strong">
            {SERVICES.map((s) => (
              <li key={s.slug} className="reveal border-b border-border">
                <Link
                  to="/servizi"
                  hash={s.slug}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 transition-colors hover:bg-secondary md:grid-cols-[5rem_1.1fr_1fr_auto] md:gap-8 md:py-8 md:pr-4"
                >
                  <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary md:pl-4">
                    {s.code}
                  </span>
                  <span className="text-xl font-bold tracking-tight md:text-3xl md:[font-stretch:112%]">
                    {s.title}
                  </span>
                  <span className="hidden text-muted-foreground md:block">{s.short}</span>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:size-6"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROCESS */}
      <section className="surface-ink bg-grid section-y" aria-labelledby="metodo-title">
        <div className="container-x">
          <span className="eyebrow text-primary">Metodo</span>
          <h2 id="metodo-title" className="reveal mt-5 max-w-3xl font-wide text-display-lg">
            Dal preventivo
            <br />
            al ritiro.
          </h2>
          <ol className="mt-16 grid gap-px bg-ink-border md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="reveal bg-ink p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">{s.n}</span>
                  <span className="h-px w-12 bg-ink-border" aria-hidden="true" />
                </div>
                <h3 className="mt-10 text-2xl font-bold tracking-tight [font-stretch:112%]">
                  {s.title}
                </h3>
                <p className="mt-3 text-ink-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AREAS */}
      <section className="section-y border-b border-border" aria-labelledby="zone-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow text-primary">Zone servite</span>
            <h2 id="zone-title" className="reveal mt-5 font-wide text-display-md">
              Dove lavoriamo
            </h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              Operiamo principalmente tra Brescia e Milano. Per cantieri in altre zone del Nord
              Italia contattaci per verificare la disponibilità.
            </p>
          </div>
          <ul className="lg:col-span-8">
            {[
              { name: "Brescia", note: "Area principale" },
              { name: "Milano", note: "Area principale" },
              { name: "Nord Italia", note: "Su richiesta" },
            ].map((a, i) => (
              <li
                key={a.name}
                className="reveal flex items-baseline justify-between gap-4 border-t border-border-strong py-6 last:border-b"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                  <span className="font-wide text-[clamp(2rem,6vw,4.5rem)]">{a.name}</span>
                </span>
                <span className="eyebrow text-muted-foreground">{a.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="section-y" aria-labelledby="lavori-title">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-primary">Realizzazioni</span>
              <h2 id="lavori-title" className="reveal mt-5 font-wide text-display-md">
                Dai nostri cantieri
              </h2>
            </div>
            <Button asChild variant="link" className="h-auto self-start px-0 md:self-end">
              <Link to="/realizzazioni">
                Tutte le realizzazioni <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((slot, i) => (
              <PhotoSlot
                key={slot.id}
                slot={slot}
                sizes={
                  i === 2
                    ? "(min-width: 1024px) 33vw, 100vw"
                    : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                }
                className={`reveal ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                ratio={i === 2 ? "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/5]" : "aspect-[4/5]"}
              />
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Fotografie originali di ponteggi e materiali Morina Ponteggi.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
