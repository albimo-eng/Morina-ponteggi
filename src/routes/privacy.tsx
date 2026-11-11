import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/PageHeader";
import { SITE } from "@/lib/site";

const TITLE = "Informativa privacy (bozza) | Morina Ponteggi";
const DESC = "Bozza di informativa sul trattamento dei dati personali del sito Morina Ponteggi.";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHeader code="L/00" eyebrow="Documento legale" title="Informativa privacy" />
      <article className="container-x section-y max-w-3xl space-y-8 leading-relaxed">
        <p className="border-l-4 border-primary bg-secondary p-5 font-semibold">
          BOZZA — da sottoporre a revisione legale prima della pubblicazione. I dati del titolare
          sono da completare.
        </p>
        <section>
          <h2 className="text-xl font-bold">1. Titolare del trattamento</h2>
          <p className="mt-2">[Ragione sociale, sede, P.IVA e contatti del titolare — da completare]. Telefono: {SITE.phoneDisplay}.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">2. Dati trattati</h2>
          <p className="mt-2">Dati inseriti nel modulo di richiesta preventivo (nome, telefono, email, città del cantiere, servizio, superficie, durata, note) e dati forniti via telefono o WhatsApp.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">3. Modalità di invio</h2>
          <p className="mt-2">Il sito non salva i dati del modulo: il modulo prepara un messaggio che l'utente invia tramite WhatsApp (servizio di WhatsApp Ireland Ltd / Meta). L'invio avviene solo su azione dell'utente.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">4. Finalità e base giuridica</h2>
          <p className="mt-2">Rispondere alla richiesta e predisporre un preventivo (misure precontrattuali, art. 6.1.b GDPR).</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">5. Conservazione</h2>
          <p className="mt-2">[Periodo di conservazione — da definire].</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">6. Cookie e statistiche</h2>
          <p className="mt-2">Il sito non utilizza cookie di profilazione né strumenti di statistica. Eventuali strumenti di statistica senza cookie verranno indicati qui prima dell'attivazione.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">7. Diritti dell'interessato</h2>
          <p className="mt-2">Accesso, rettifica, cancellazione, limitazione, opposizione e reclamo al Garante per la protezione dei dati personali (artt. 15–22 e 77 GDPR).</p>
        </section>
      </article>
    </>
  );
}
