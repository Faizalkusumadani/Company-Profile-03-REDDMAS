export interface BeritaItem {
  id: string;
  slug: string;
  date: string;
  image: string;
}

export interface BeritaText {
  tag: string;
  title: string;
  excerpt: string;
  content: string[];
}

export type BeritaMessages = Record<string, BeritaText>;

export const beritaperusahaan: BeritaItem[] = [
  {
    id: "wavin_gathering_2026",
    slug: "retailer-wavin-gathering-2026",
    date: "2026-06-04",
    image: "/Berita/Retailer Wavin 2026/001.JPEG",
  },
  {
    id: "trilliun_gathering",
    slug: "retailer-trilliun-gathering-2026",
    date: "2026-06-04",
    image: "/Berita/Retailer Trilliun 2026/001.JPEG",
  },
  {
    id: "semen_gathering_2026",
    slug: "retailer-semen-merah-putih-gathering-2026",
    date: "2026-06-11",
    image: "/Berita/Retailer Semen_merah_2026/001.JPEG",
  },
  {
    id: "wavin_gathering_2025",
    slug: "retailer-wavin-gathering-2025",
    date: "2025-07-15",
    image: "/Berita/Retailer Wavin 2025/img-01.jpg",
  },
  {
    id: "semen_gathering_2025",
    slug: "retailer-semen-merah-putih-gathering-2025",
    date: "2025-04-10",
    image: "/Berita/Retailer Gathering 2025/gathering-semen-01.png",
  },
];

export function getBeritaBySlug(slug: string): BeritaItem | undefined {
  return beritaperusahaan.find((item) => item.slug === slug);
}

export function getBeritaText(
  messages: BeritaMessages,
  id: string,
): BeritaText {
  return messages[id];
}

export function formatBeritaDate(isoDate: string, locale = "id-ID") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
