import { createFileRoute } from "@tanstack/react-router";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { GALLERY } from "@/content/gallery";

const TITLE = "Realizzazioni | Morina Ponteggi";
const DESC = "Fotografie dei cantieri di ponteggi realizzati da Morina Ponteggi tra Brescia, Milano e Nord Italia.";

export const Route = createFileRoute("/realizzazioni")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/realizzazioni" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/realizzazioni" }],
  }),
  component: Realizzazioni,
});

function Realizzazioni() {
  return (
    <>
      <PageHeader
        code="R/02"
        eyebrow="Realizzazioni"
        title="Dai nostri cantieri."
        lead="In questa pagina pubblicheremo solo fotografie reali dei cantieri Morina Ponteggi. Gli spazi qui sotto sono segnaposto in attesa delle foto."
      />
      <section className="container-x section-y" aria-label="Galleria">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((slot) => (
            <PhotoSlot key={slot.id} slot={slot} className="reveal" />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
