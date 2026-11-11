import { z } from "zod";

import { SERVICES, SITE, whatsappUrl } from "./site";

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug as string, label: s.title })),
  { value: "altro", label: "Altro / da definire" },
];

export const DURATION_OPTIONS = [
  { value: "meno-1-mese", label: "Meno di 1 mese" },
  { value: "1-3-mesi", label: "Da 1 a 3 mesi" },
  { value: "3-6-mesi", label: "Da 3 a 6 mesi" },
  { value: "oltre-6-mesi", label: "Oltre 6 mesi" },
  { value: "da-definire", label: "Da definire" },
];

const phoneRegex = /^[+]?[\d\s().-]{6,20}$/;

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Inserisci nome e cognome o ragione sociale" })
    .max(100, { message: "Massimo 100 caratteri" }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { message: "Inserisci un numero di telefono valido" }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Massimo 255 caratteri" })
    .refine((v) => v === "" || z.string().email().safeParse(v).success, {
      message: "Inserisci un indirizzo email valido",
    }),
  city: z
    .string()
    .trim()
    .min(2, { message: "Indica la città del cantiere" })
    .max(80, { message: "Massimo 80 caratteri" }),
  service: z
    .string()
    .refine((v) => SERVICE_OPTIONS.some((o) => o.value === v), {
      message: "Seleziona un servizio",
    }),
  area: z
    .string()
    .trim()
    .refine((v) => v === "" || (/^\d{1,6}([.,]\d{1,2})?$/.test(v) && Number(v.replace(",", ".")) > 0), {
      message: "Indica un numero in m² (es. 250)",
    }),
  duration: z.string().refine((v) => v === "" || DURATION_OPTIONS.some((o) => o.value === v), {
    message: "Seleziona una durata",
  }),
  notes: z.string().trim().max(1000, { message: "Massimo 1000 caratteri" }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Per inviare la richiesta serve il consenso al trattamento dei dati" }),
  }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

const labelFor = (opts: { value: string; label: string }[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? v;

export function buildQuoteMessage(d: QuoteData): string {
  const lines = [
    `Buongiorno ${SITE.name}, vorrei richiedere un preventivo.`,
    "",
    "— RICHIESTA PREVENTIVO —",
    `Nome: ${d.name}`,
    `Telefono: ${d.phone}`,
    `Email: ${d.email || "non indicata"}`,
    `Città del cantiere: ${d.city}`,
    `Servizio: ${labelFor(SERVICE_OPTIONS, d.service)}`,
    `Superficie facciata indicativa: ${d.area ? `${d.area.replace(",", ".")} m²` : "non indicata"}`,
    `Durata prevista: ${d.duration ? labelFor(DURATION_OPTIONS, d.duration) : "non indicata"}`,
    `Note: ${d.notes || "nessuna"}`,
    "",
    "Consenso al trattamento dei dati: confermato (informativa privacy del sito).",
  ];
  return lines.join("\n");
}

export function quoteWhatsappUrl(d: QuoteData): string {
  return whatsappUrl(buildQuoteMessage(d));
}
