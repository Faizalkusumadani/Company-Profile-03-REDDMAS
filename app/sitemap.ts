import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { beritaperusahaan } from "@/data/data-berita";
import { kegiatanperusahaan } from "@/data/data-kegiatan";

const baseUrl = "https://reddmasgroup.com";
const SITE_LAST_UPDATED = new Date("2026-08-01");

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "yearly" },
  { path: "/tentang-kami/profil", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/tentang-kami/visi-misi",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/tentang-kami/nilai-nilai",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/tentang-kami/manajemen",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/bisnis/trading", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bisnis/hvac", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bisnis/creative", priority: 0.6, changeFrequency: "monthly" },
  { path: "/bisnis/information", priority: 0.6, changeFrequency: "monthly" },
  { path: "/bisnis/food", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ruang-informasi/berita", priority: 0.8, changeFrequency: "weekly" },
  {
    path: "/ruang-informasi/kegiatan",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  { path: "/karir", priority: 0.7, changeFrequency: "weekly" },
  { path: "/kontak", priority: 0.5, changeFrequency: "yearly" },
];

type DynamicItem = {
  slug: string;
  updatedAt: string;
  images?: string[];
  image: string;
};

function buildDynamicUrls(
  items: DynamicItem[],
  basePath: string,
): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    items.map((item) => {
      const galleryImages =
        item.images && item.images.length > 0 ? item.images : [item.image];
      const path = `${basePath}/${item.slug}`;

      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly" as const,
        priority: locale === routing.defaultLocale ? 0.5 : 0.4,
        images: galleryImages.map((img) => `${baseUrl}${img}`),
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((l) => [l, `${baseUrl}/${l}${path}`]),
            ),
            "x-default": `${baseUrl}/${routing.defaultLocale}${path}`,
          },
        },
      };
    }),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: route.changeFrequency,
      priority:
        locale === routing.defaultLocale
          ? route.priority
          : route.priority - 0.1,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${baseUrl}/${l}${route.path}`]),
          ),
          "x-default": `${baseUrl}/${routing.defaultLocale}${route.path}`,
        },
      },
    })),
  );

  const beritaUrls = buildDynamicUrls(
    beritaperusahaan,
    "/ruang-informasi/berita",
  );
  const kegiatanUrls = buildDynamicUrls(
    kegiatanperusahaan,
    "/ruang-informasi/kegiatan",
  );

  return [...staticUrls, ...kegiatanUrls, ...beritaUrls];
}
