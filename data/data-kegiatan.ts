export interface KegiatanItem {
  id: string;
  slug: string;
  date: string;
  image: string;
  updatedAt: string;
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
    id: "annual-gathering-bromo-2023",
    slug: "annual-gathering-bromo-2023",
    date: "2023-11-20",
    image: "/Kegiatan/Annual-gathering-bromo-2023/annual2023-image-01.jpg",
    updatedAt: "2023-11-20",
  },
  {
    id: "annual-gathering-sentul-2023",
    slug: "annual-gathering-sentul-2023",
    date: "2023-12-22",
    image: "/Kegiatan/Annual-gathering-sentul-2023/0001.jpg",
    updatedAt: "2023-12-22",
  },
  {
    id: "qurban-2025",
    slug: "salurkan-hewan-qurban-2025",
    date: "2025-06-04",
    image: "/Kegiatan/Qurban 2025/1A.jpeg",
    updatedAt: "2025-06-04",
  },

  {
    id: "tahun-baru-2026",
    slug: "rayakan-tahun-baru-2026",
    date: "2026-01-12",
    image: "/Kegiatan/Celebrate_12_Januari_2026/1.JPG",
    updatedAt: "2026-01-12",
  },
  {
    id: "growing-beyond-boundaries-2026",
    slug: "training-growing-beyond-boundaries-2026",
    date: "2026-02-07",
    image: "/Kegiatan/Growing/1.jpeg",
    updatedAt: "2026-02-07",
  },
  {
    id: "lets-grow-together",
    slug: "training-lets-grow-together",
    date: "2025-08-09",
    image: "/Kegiatan/Letsgrow/001.JPEG",
    updatedAt: "2025-08-09",
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
