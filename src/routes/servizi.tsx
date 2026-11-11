import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site";

const TITLE = "Servizi ponteggi: montaggio, smontaggio e noleggio | Morina Ponteggi";
const DESC =
  "Montaggio, smontaggio e noleggio ponteggi; ponteggi per facciate, ristrutturazioni ed edifici industriali a Brescia, Milano e Nord Italia.";

export const Route = createFileRoute("/servizi")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/servizi" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/servizi" }],
  }),
  component: Servizi,
});

function Servizi() {
  return (
    <>
      <PageHeader
        code="S/01"
        eyebrow="Servizi"
        title="Ponteggi per ogni fase del cantiere."
        lead="Montaggio, smontaggio e noleggio, per facciate, ristrutturazioni ed edifici industriali."
      />
      <div className="container-x">
        {SERVICES.map((s) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-t`}
            className="reveal grid gap-8 border-b border-border py-14 md:grid-cols-12 md:py-20"
          >
            <div className="md:col-span-2">
              <span className="font-mono text-sm text-primary">{s.code}</span>
            </div>
            <div className="md:col-span-5">
              <h2 id={`${s.slug}-t`} className="font-wide text-display-md">
                {s.title}
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">{s.body}</p>
            </div>
            <div className="md:col-span-5">
              <ul className="border-t border-border-strong">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-4 border-b border-border py-4">
                    <span className="mt-2.5 h-0.5 w-4 shrink-0 bg-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="ink" className="mt-8">
                <Link to="/contatti" search={{ servizio: s.slug }}>
                  Preventivo per {s.title.toLowerCase()} <ArrowRight />
                </Link>
              </Button>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
