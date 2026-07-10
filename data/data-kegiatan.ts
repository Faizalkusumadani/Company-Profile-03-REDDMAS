export interface KegiatanItem {
  id: string;
  slug: string;
  date: string;
  image: string;
}

export interface KegiatanText {
  tag: string;
  title: string;
  excerpt: string;
  content: string[];
}

export type KegiatanMessages = Record<string, KegiatanText>;

export const kegiatanperusahaan: KegiatanItem[] = [
  {
    id: "qurban-2025",
    slug: "salurkan-hewan-qurban-2025",
    date: "2025-06-04",
    image: "/Kegiatan/Qurban 2025/1A.jpeg",
  },
  {
    id: "tahun-baru-2026",
    slug: "rayakan-tahun-baru-2026",
    date: "2026-01-12",
    image: "/Kegiatan/Celebrate_12_Januari_2026/1.JPG",
  },
  {
    id: "growing-beyond-boundaries-2026",
    slug: "training-growing-beyond-boundaries-2026",
    date: "2026-02-07",
    image: "/Kegiatan/Growing/1.jpeg",
  },
  {
    id: "lets-grow-together",
    slug: "training-lets-grow-together",
    date: "2025-08-09",
    image: "/Kegiatan/Letsgrow/001.jpeg",
  },
];

export function getKegiatanBySlug(slug: string): KegiatanItem | undefined {
  return kegiatanperusahaan.find((item) => item.slug === slug);
}

export function getKegiatanText(
  messages: KegiatanMessages,
  id: string,
): KegiatanText {
  return messages[id];
}

export function formatKegiatanDate(isoDate: string, locale = "id-ID") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
