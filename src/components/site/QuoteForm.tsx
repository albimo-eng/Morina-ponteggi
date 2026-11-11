import { useId, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Copy, ExternalLink, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import {
  DURATION_OPTIONS,
  SERVICE_OPTIONS,
  buildQuoteMessage,
  quoteSchema,
  quoteWhatsappUrl,
} from "@/lib/quote";
import { cn } from "@/lib/utils";

import { WhatsAppIcon } from "./icons";

type Values = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  area: string;
  duration: string;
  notes: string;
  consent: boolean;
};
type Field = keyof Values;
const ORDER: Field[] = ["name", "phone", "email", "city", "service", "area", "duration", "notes", "consent"];

const inputCls =
  "block w-full rounded-none border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-border-strong focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 aria-[invalid=true]:border-destructive";

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: SERVICE_OPTIONS.some((o) => o.value === defaultService) ? defaultService : "",
    area: "",
    duration: "",
    notes: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState<{ url: string; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const id = (f: Field) => `${uid}-${f}`;
  const set = <K extends Field>(f: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as Field;
        if (!next[f]) next[f] = issue.message;
      }
      setErrors(next);
      const first = ORDER.find((f) => next[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }
    const url = quoteWhatsappUrl(parsed.data);
    const text = buildQuoteMessage(parsed.data);
    trackEvent("quote_whatsapp_open", { service: parsed.data.service });
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    setSent({ url, text });
    setCopied(false);
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(sent.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${id(f)}-err`} className="mt-2 text-sm font-medium text-destructive">
        {errors[f]}
      </p>
    ) : null;

  const a11y = (f: Field, hint?: boolean) => ({
    id: id(f),
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby":
      [errors[f] ? `${id(f)}-err` : "", hint ? `${id(f)}-hint` : ""].filter(Boolean).join(" ") ||
      undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-border-strong bg-card">
      <div className="flex items-start gap-3 border-b border-border-strong bg-foreground px-5 py-4 text-background md:px-8">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-relaxed">
          <strong className="font-semibold">Invio tramite WhatsApp.</strong> Il modulo prepara un
          messaggio con tutti i dati inseriti e apre WhatsApp: la richiesta parte solo quando premi
          «Invia» nella chat. Questo sito non salva i dati del modulo.
        </p>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-2 md:p-8">
        <FieldBox label="Nome e cognome / Azienda" required htmlFor={id("name")}>
          <input
            {...a11y("name")}
            className={inputCls}
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            maxLength={100}
          />
          {err("name")}
        </FieldBox>

        <FieldBox label="Telefono" required htmlFor={id("phone")}>
          <input
            {...a11y("phone")}
            className={inputCls}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            maxLength={20}
          />
          {err("phone")}
        </FieldBox>

        <FieldBox label="Email" htmlFor={id("email")}>
          <input
            {...a11y("email")}
            className={inputCls}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            maxLength={255}
          />
          {err("email")}
        </FieldBox>

        <FieldBox label="Città del cantiere" required htmlFor={id("city")}>
          <input
            {...a11y("city")}
            className={inputCls}
            autoComplete="address-level2"
            placeholder="Es. Brescia"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            maxLength={80}
          />
          {err("city")}
        </FieldBox>

        <FieldBox label="Servizio" required htmlFor={id("service")}>
          <SelectWrap>
            <select
              {...a11y("service")}
              className={cn(inputCls, "appearance-none pr-10")}
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
            >
              <option value="">Seleziona…</option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </SelectWrap>
          {err("service")}
        </FieldBox>

        <FieldBox label="Superficie facciata indicativa (m²)" htmlFor={id("area")}>
          <input
            {...a11y("area", true)}
            className={inputCls}
            inputMode="decimal"
            placeholder="Es. 250"
            value={values.area}
            onChange={(e) => set("area", e.target.value)}
            maxLength={9}
          />
          <p id={`${id("area")}-hint`} className="mt-2 text-xs text-muted-foreground">
            Anche una stima: larghezza × altezza della facciata.
          </p>
          {err("area")}
        </FieldBox>

        <FieldBox label="Durata prevista del cantiere" htmlFor={id("duration")} className="md:col-span-2">
          <SelectWrap>
            <select
              {...a11y("duration")}
              className={cn(inputCls, "appearance-none pr-10")}
              value={values.duration}
              onChange={(e) => set("duration", e.target.value)}
            >
              <option value="">Seleziona…</option>
              {DURATION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </SelectWrap>
          {err("duration")}
        </FieldBox>

        <FieldBox label="Note" htmlFor={id("notes")} className="md:col-span-2">
          <textarea
            {...a11y("notes")}
            className={cn(inputCls, "min-h-32 resize-y")}
            placeholder="Indirizzo o zona, numero di piani, accessi, data di inizio prevista…"
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            maxLength={1000}
          />
          <p className="mt-2 text-right font-mono text-xs text-muted-foreground">
            {values.notes.length}/1000
          </p>
          {err("notes")}
        </FieldBox>

        <div className="md:col-span-2">
          <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3">
            <input
              {...a11y("consent")}
              type="checkbox"
              className="mt-1 size-5 shrink-0 cursor-pointer accent-primary"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              Ho letto l'
              <Link to="/privacy" className="font-medium text-foreground underline decoration-primary underline-offset-2">
                informativa privacy
              </Link>{" "}
              e acconsento al trattamento dei dati per ricevere il preventivo richiesto.{" "}
              <span className="text-destructive">*</span>
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Campi obbligatori
        </p>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          <WhatsAppIcon />
          Prepara la richiesta su WhatsApp
        </Button>
      </div>

      {sent ? (
        <div role="status" aria-live="polite" className="border-t border-border-strong bg-secondary px-5 py-6 md:px-8">
          <p className="font-semibold text-foreground">WhatsApp aperto con la tua richiesta.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            La richiesta <strong className="text-foreground">non è ancora stata inviata</strong>: completa
            l'invio premendo «Invia» nella chat WhatsApp. Se WhatsApp non si è aperto, usa i pulsanti qui
            sotto.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="ink">
              <a href={sent.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink aria-hidden="true" /> Apri WhatsApp
              </a>
            </Button>
            <Button type="button" variant="outline" onClick={copy}>
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied ? "Testo copiato" : "Copia il testo della richiesta"}
            </Button>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function FieldBox({
  label,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="eyebrow mb-2.5 block text-foreground">
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}
