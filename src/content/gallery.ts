// Original photographs supplied by the owner. Captions describe visible details only.
export interface GallerySlot {
  id: string;
  category: string;
  label: string;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
  srcSet?: string;
}

const photos = [
  {
    id: "01",
    category: "Facciate",
    label: "Ponteggio e telai",
    alt: "Telai rossi accatastati davanti a un edificio con ponteggio di facciata",
    width: 1152,
    height: 1536,
  },
  {
    id: "02",
    category: "Materiali",
    label: "Telai di ponteggio",
    alt: "Telai metallici rossi di ponteggio disposti in file nel deposito",
    width: 768,
    height: 1024,
  },
  {
    id: "03",
    category: "Dettaglio",
    label: "Struttura e piani di lavoro",
    alt: "Ponteggio con montanti rossi, piani metallici e scale di accesso lungo una facciata",
    width: 864,
    height: 1536,
  },
  {
    id: "04",
    category: "Cantiere",
    label: "Ponteggio lungo la facciata",
    alt: "Edificio circondato da ponteggi con gru e materiali di cantiere in primo piano",
    width: 900,
    height: 1600,
  },
  {
    id: "05",
    category: "Dettaglio",
    label: "Vista tra i ponteggi",
    alt: "Vista dall’alto tra strutture di ponteggio, piani metallici e materiali di cantiere",
    width: 1536,
    height: 1152,
  },
];

export const GALLERY: GallerySlot[] = photos.map((photo) => {
  const base = `/images/morina-photo-${photo.id}`;
  return {
    ...photo,
    image: `${base}.webp`,
    srcSet: [
      `${base}-480.webp 480w`,
      ...(photo.width > 960 ? [`${base}-960.webp 960w`] : []),
      `${base}.webp ${photo.width}w`,
    ].join(", "),
  };
});
