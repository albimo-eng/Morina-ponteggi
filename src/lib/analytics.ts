/**
 * Cookie-free analytics placeholder.
 *
 * Nothing is loaded or tracked today. To enable, pick a cookie-free provider
 * (e.g. Plausible or Umami), add its script tag in src/routes/__root.tsx head(),
 * set ANALYTICS_ENABLED to true and update the privacy notice accordingly.
 */
export const ANALYTICS_ENABLED = false;

type EventName = "click_call" | "click_whatsapp" | "quote_whatsapp_open";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(name: EventName, props?: Record<string, string>): void {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return;
  window.plausible?.(name, props ? { props } : undefined);
}
