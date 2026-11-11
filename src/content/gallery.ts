// Gallery slots for real Morina Ponteggi site photos.
// When the owner uploads a photo, import it and set `image` + a factual `alt` on the matching slot.
// Never use stock photos here: this page presents the company's own work.

export interface GallerySlot {
  id: string;
  category: string;
  label: string;
  image?: string;
  alt?: string;
}

export const GALLERY: GallerySlot[] = [
  { id: "01", category: "Facciate", label: "Ponteggio di facciata" },
  { id: "02", category: "Montaggio", label: "Fase di montaggio" },
  { id: "03", category: "Ristrutturazioni", label: "Cantiere di ristrutturazione" },
  { id: "04", category: "Industriale", label: "Edificio industriale" },
  { id: "05", category: "Dettaglio", label: "Dettaglio struttura e piani di lavoro" },
  { id: "06", category: "Smontaggio", label: "Fase di smontaggio" },
  { id: "07", category: "Facciate", label: "Condominio con ponteggio" },
  { id: "08", category: "Dettaglio", label: "Accessi e protezioni" },
];
