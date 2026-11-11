import { Link } from "@tanstack/react-router";

import { trackEvent } from "@/lib/analytics";
import { NAV_LINKS, PHONE_HREF, SERVICES, SITE, whatsappUrl } from "@/lib/site";

import { Wordmark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-ink bg-grid">
      <div className="container-x pb-10 pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark inverted />
            <p className="mt-6 max-w-sm text-ink-muted">
              Montaggio, smontaggio e noleggio di ponteggi a Brescia, Milano e nel Nord Italia.
            </p>
            <a
              href={PHONE_HREF}
              onClick={() => trackEvent("click_call", { from: "footer" })}
              className="mt-10 block font-wide text-[clamp(1.6rem,3.2vw,2.4rem)] tabular-nums transition-colors hover:text-primary"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { from: "footer" })}
              className="mt-3 inline-block text-sm text-ink-muted underline decoration-primary decoration-2 underline-offset-4 hover:text-ink-foreground"
            >
              Scrivici su WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            <div>
              <h2 className="eyebrow text-ink-muted">Sito</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary">Home</Link>
                </li>
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-primary">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-ink-muted">Servizi</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link to="/servizi" hash={s.slug} className="hover:text-primary">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-ink-muted">Zone servite</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>Brescia e provincia</li>
                <li>Milano e provincia</li>
                <li>Altre zone del Nord Italia, su richiesta</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}</p>
          <Link to="/privacy" className="hover:text-ink-foreground">Informativa privacy</Link>
        </div>
      </div>
    </footer>
  );
}
