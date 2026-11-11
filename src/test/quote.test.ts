import { describe, expect, it } from "vitest";

import { buildQuoteMessage, quoteSchema, quoteWhatsappUrl } from "@/lib/quote";

const valid = {
  name: "Mario Rossi", phone: "+39 333 1234567", email: "mario@example.it", city: "Brescia",
  service: "facciate", area: "250", duration: "1-3-mesi", notes: "Tre piani", consent: true,
};

describe("quote form", () => {
  it("requires privacy consent", () => {
    expect(quoteSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
  it("sends to the real WhatsApp number", () => {
    const d = quoteSchema.parse(valid);
    expect(quoteWhatsappUrl(d).startsWith("https://wa.me/393498493780?text=")).toBe(true);
  });
  it("includes every entered field in the message", () => {
    const msg = buildQuoteMessage(quoteSchema.parse(valid));
    for (const v of ["Mario Rossi", "+39 333 1234567", "mario@example.it", "Brescia", "Ponteggi per facciate", "250 m²", "Da 1 a 3 mesi", "Tre piani"]) {
      expect(msg).toContain(v);
    }
  });
});
