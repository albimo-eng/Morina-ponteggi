import { createFileRoute } from "@tanstack/react-router";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PhotoSlot } from "@/components/site/PhotoSlot";

const TITLE = "Chi siamo | Morina Ponteggi";
const DESC = "Morina Ponteggi: montaggio, smontaggio e noleggio di ponteggi a Brescia, Milano e nel Nord Italia.";

export const Route = createFileRoute("/chi-siamo")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/chi-siamo" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/chi-siamo" }],
  }),
  component: ChiSiamo,
});

const POINTS = [
  { t: "Solo ponteggi", d: "Ci occupiamo di montaggio, smontaggio e noleggio di ponteggi: è il nostro lavoro." },
  { t: "Un referente diretto", d: "Parli con chi organizza il lavoro, al telefono o su WhatsApp." },
  { t: "Preventivi chiari", d: "Il preventivo si basa su superficie, durata e caratteristiche del cantiere." },
  { t: "Brescia, Milano, Nord Italia", d: "Lavoriamo principalmente tra Brescia e Milano, e su richiesta in altre zone." },
];

function ChiSiamo() {
  return (
    <>
      <PageHeader
        code="C/03"
        eyebrow="Chi siamo"
        title="La struttura che sostiene il cantiere."
        lead="Morina Ponteggi si occupa di montaggio, smontaggio e noleggio di ponteggi per imprese edili, condomini e privati."
      />
      <section className="container-x section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PhotoSlot slot={{ id: "T1", category: "Squadra", label: "Foto della squadra al lavoro" }} />
        </div>
        <ul className="border-t border-border-strong lg:col-span-7">
          {POINTS.map((p, i) => (
            <li key={p.t} className="reveal grid gap-3 border-b border-border py-8 md:grid-cols-[4rem_1fr]">
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight [font-stretch:112%]">{p.t}</h2>
                <p className="mt-2 text-muted-foreground">{p.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
