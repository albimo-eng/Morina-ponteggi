import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MobileCta } from "@/components/site/MobileCta";
import { Button } from "@/components/ui/button";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <section className="bg-grid">
      <div className="container-x flex min-h-[60vh] flex-col justify-center py-24">
        <span className="eyebrow text-primary">Errore 404</span>
        <h1 className="mt-5 font-wide text-display-lg">Pagina non trovata</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <div className="mt-8">
          <Button asChild variant="ink">
            <Link to="/">Torna alla home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="bg-grid">
      <div className="container-x flex min-h-[60vh] flex-col justify-center py-24">
        <h1 className="font-wide text-display-md">La pagina non si è caricata</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Si è verificato un problema. Riprova oppure torna alla home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Riprova
          </Button>
          <Button asChild variant="outline">
            <a href="/">Home</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  head: () => ({
    // Each content route sets its own title/description/og tags. Never add og:image here.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#f7f4ee" },
      { title: "Morina Ponteggi — Montaggio, smontaggio e noleggio ponteggi" },
      {
        name: "description",
        content:
          "Montaggio, smontaggio e noleggio di ponteggi a Brescia, Milano e nel Nord Italia.",
      },
      { property: "og:site_name", content: "Morina Ponteggi" },
      { property: "og:locale", content: "it_IT" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-3 focus:text-background"
      >
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto">
        <Outlet />
      </main>
      <Footer />
      <div className="h-[calc(64px+env(safe-area-inset-bottom))] lg:hidden" aria-hidden="true" />
      <MobileCta />
    </QueryClientProvider>
  );
}
