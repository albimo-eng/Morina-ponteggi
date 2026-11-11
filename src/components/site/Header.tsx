import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { NAV_LINKS, PHONE_HREF, SITE, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

import { WhatsAppIcon } from "./icons";
import { Wordmark } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" aria-label={`${SITE.name} — home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className:
                  "!text-foreground after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:bg-primary",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={PHONE_HREF}
            onClick={() => trackEvent("click_call", { from: "header" })}
            className="flex items-center gap-2 px-3 py-2 font-mono text-sm tabular-nums text-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <Button asChild>
            <Link to="/contatti">
              Richiedi preventivo
              <ArrowUpRight className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
              aria-label="Apri il menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content className="surface-ink bg-grid fixed inset-0 z-50 flex flex-col overflow-y-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">Navigazione del sito</Dialog.Description>
              <div className="container-x flex h-16 items-center justify-between">
                <Wordmark inverted />
                <Dialog.Close
                  className="-mr-2 inline-flex size-11 items-center justify-center"
                  aria-label="Chiudi il menu"
                >
                  <X className="size-6" aria-hidden="true" />
                </Dialog.Close>
              </div>
              <nav aria-label="Menu mobile" className="container-x mt-8 flex flex-col">
                {[{ to: "/", label: "Home" } as const, ...NAV_LINKS].map((l, i) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group flex items-baseline justify-between border-b border-ink-border py-5"
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "text-primary" }}
                  >
                    <span className="font-wide text-[2rem]">{l.label}</span>
                    <span className="eyebrow text-ink-muted">{String(i).padStart(2, "0")}</span>
                  </Link>
                ))}
              </nav>
              <div className="container-x mt-auto grid gap-3 pb-10 pt-10">
                <Button asChild size="lg">
                  <Link to="/contatti">Richiedi preventivo</Link>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild size="lg" variant="outline-ink">
                    <a href={PHONE_HREF} onClick={() => trackEvent("click_call", { from: "menu" })}>
                      <Phone aria-hidden="true" /> Chiama
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline-ink">
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("click_whatsapp", { from: "menu" })}
                    >
                      <WhatsAppIcon /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
