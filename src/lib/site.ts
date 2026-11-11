// Single source of truth for verified business facts. Only add data the owner has confirmed.

export const SITE = {
  name: "Morina Ponteggi",
  wordmark: "MORINA",
  phoneDisplay: "+39 349 849 3780",
  phoneE164: "+393498493780",
  whatsappNumber: "393498493780",
  /** Intended public domain. Not yet registered or connected: used only for the sitemap. */
  intendedOrigin: "https://morinaponteggi.it",
  areas: ["Brescia", "Milano", "Nord Italia"] as const,
} as const;

export const PHONE_HREF = `tel:${SITE.phoneE164}`;

export const WHATSAPP_DEFAULT_TEXT =
  "Buongiorno Morina Ponteggi, vorrei ricevere informazioni e un preventivo per un ponteggio.\n\nCittà del cantiere: \nServizio richiesto: \nSuperficie indicativa (m²): ";

export function whatsappUrl(text: string = WHATSAPP_DEFAULT_TEXT): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export type ServiceSlug =
  | "montaggio"
  | "smontaggio"
  | "noleggio"
  | "facciate"
  | "ristrutturazioni"
  | "industriali";

export interface Service {
  slug: ServiceSlug;
  code: string;
  title: string;
  short: string;
  body: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "montaggio",
    code: "01",
    title: "Montaggio ponteggi",
    short: "Installazione organizzata sulle misure dell'edificio, sugli accessi e sulle fasi di lavoro.",
    body: "Montiamo ponteggi per cantieri edili pianificando ogni fase in base alla geometria dell'edificio, agli spazi disponibili e al programma dei lavori. Un referente unico coordina tempi e accessi con l'impresa.",
    points: [
      "Pianificazione del montaggio sul cantiere reale",
      "Coordinamento con impresa e direzione lavori",
      "Piani di lavoro e accessi organizzati per le lavorazioni",
    ],
  },
  {
    slug: "smontaggio",
    code: "02",
    title: "Smontaggio ponteggi",
    short: "Smontaggio ordinato e ritiro del materiale a fine lavori.",
    body: "A lavori conclusi smontiamo il ponteggio con una sequenza ordinata, concordando data e orari con il cantiere, e ritiriamo il materiale lasciando l'area libera.",
    points: [
      "Data di smontaggio concordata con il cantiere",
      "Sequenza di smontaggio ordinata",
      "Ritiro del materiale a fine intervento",
    ],
  },
  {
    slug: "noleggio",
    code: "03",
    title: "Noleggio ponteggi",
    short: "Ponteggi a noleggio per la durata del cantiere, abbinabili a montaggio e smontaggio.",
    body: "Il noleggio viene definito in base alla superficie da coprire e alla durata prevista del cantiere. Può essere abbinato al montaggio e allo smontaggio per avere un unico interlocutore.",
    points: [
      "Preventivo su superficie e durata",
      "Abbinabile a montaggio e smontaggio",
      "Durata definita sul cronoprogramma",
    ],
  },
  {
    slug: "facciate",
    code: "04",
    title: "Ponteggi per facciate",
    short: "Per rifacimento facciate, cappotti termici, tinteggiature e manutenzioni.",
    body: "Ponteggi di facciata per interventi su prospetti di condomini, abitazioni ed edifici commerciali: rifacimento intonaci, isolamento a cappotto, tinteggiatura, manutenzione di gronde e balconi.",
    points: [
      "Condomini, abitazioni, edifici commerciali",
      "Cappotto termico e rifacimento intonaci",
      "Tinteggiature e manutenzioni",
    ],
  },
  {
    slug: "ristrutturazioni",
    code: "05",
    title: "Ponteggi per ristrutturazioni",
    short: "Strutture adattate a interventi di recupero, coperture e rifacimenti.",
    body: "Per ristrutturazioni e recuperi edilizi configuriamo il ponteggio in base all'intervento: lavori in copertura, rifacimento di balconi, sostituzione di serramenti, interventi su edifici esistenti in contesti urbani.",
    points: [
      "Lavori in copertura e sui balconi",
      "Interventi su edifici esistenti",
      "Configurazione in base all'intervento",
    ],
  },
  {
    slug: "industriali",
    code: "06",
    title: "Ponteggi per edifici industriali",
    short: "Soluzioni per capannoni, edifici produttivi e logistici.",
    body: "Per capannoni ed edifici produttivi studiamo il ponteggio in funzione delle superfici, degli accessi carrabili e delle attività che restano operative durante i lavori.",
    points: [
      "Capannoni ed edifici produttivi",
      "Attenzione agli accessi e all'operatività",
      "Configurazioni su superfici estese",
    ],
  },
];

export const NAV_LINKS = [
  { to: "/servizi", label: "Servizi" },
  { to: "/realizzazioni", label: "Realizzazioni" },
  { to: "/chi-siamo", label: "Chi siamo" },
  { to: "/contatti", label: "Contatti" },
] as const;
