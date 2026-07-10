import { getTranslations, getMessages, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import {
  kegiatanperusahaan,
  getKegiatanText,
  formatKegiatanDate,
  type KegiatanMessages,
} from "@/data/data-kegiatan";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Kegiatan",
    description:
      "Seputar kegiatan yang dilakukan seluruh jajaran karyawan Reddmasgroup",
    openGraph: {
      title: " Reddmasgroup | Kegiatan",
      description:
        "Seputar kegiatan yang dilakukan seluruh jajaran karyawan Reddmasgroup",
      url: `${siteUrl}/${locale}/kegiatan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/kegiatan`,
      languages: {
        "id-ID": `${siteUrl}/id/kegiatan`,
        "en-US": `${siteUrl}/en/kegiatan`,
      },
    },
  };
}

export default async function KegiatanPage() {
  const t = await getTranslations();
  const messages = await getMessages();
  const kegiatanMessages = messages.kegiatan as unknown as KegiatanMessages;

  // Urutkan dari yang terbaru
  const items = [...kegiatanperusahaan].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Pisahkan item pertama sebagai "Featured/Sorotan Utama"
  const featuredItem = items[0];
  const remainingItems = items.slice(1);

  const featuredText = featuredItem
    ? getKegiatanText(kegiatanMessages, featuredItem.id)
    : null;
  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.news_activity")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.business") },
            { label: t("nav.news_activity") },
          ]}
        />
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-48 md:pt-80 pb-20">
        {/* 1. FEATURED SECTION (Kegiatan Terbaru - Desain Sinematik) */}
        {featuredItem && featuredText && (
          <section className="py-20 md:py-28">
            <Link
              href={`/ruang-informasi/kegiatan/${featuredItem.slug}`}
              className="group block"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Widescreen Image Thumbnail */}
                <div className="lg:col-span-7 aspect-video md:aspect-21/9 lg:aspect-16/10 relative w-full overflow-hidden bg-gray-100 rounded-2xl transition-all duration-500 ease-out">
                  <Image
                    src={featuredItem.image}
                    alt={featuredText.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                  {/* Overlay Hitam Halus Saat Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Konten Teks Samping */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold tracking-widest text-reddmas-red uppercase">
                      {t("kegiatan.header-activities")}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">
                      {formatKegiatanDate(featuredItem.date)}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-reddmas-dark mb-4 group-hover:text-reddmas-red transition-colors duration-300 leading-snug">
                    {featuredText.title}
                  </h2>

                  <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                    {featuredText.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-reddmas-dark group-hover:text-reddmas-red transition-colors duration-300">
                    <span>{t("readMore")}</span>
                    <svg
                      className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* 2. GRID SECTION (Sisa Kegiatan - Elegan & Bersih) */}
        {remainingItems.length > 0 && (
          <section>
            {/* Sub-heading section kecil yang minimalis */}
            <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
                {t("kegiatan.header-archive")}
              </h3>
              <span className="text-xs text-gray-400">
                {remainingItems.length} Artikel
              </span>
            </div>

            {/* Grid 2 Kolom untuk look yang kokoh dan seimbang */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24">
              {remainingItems.map((item) => {
                const text = getKegiatanText(kegiatanMessages, item.id);

                return (
                  <article
                    key={item.slug}
                    className="group flex flex-col justify-between"
                  >
                    <Link
                      href={`/ruang-informasi/kegiatan/${item.slug}`}
                      className="block w-full"
                    >
                      {/* Image Thumbnail dengan Efek Deselerasi Halus */}
                      <div className="aspect-16/10 relative w-full overflow-hidden bg-gray-50 rounded-xl mb-6">
                        <Image
                          src={item.image}
                          alt={text.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        />
                      </div>

                      {/* Meta info */}
                      <div className="text-xs text-gray-500 font-medium mb-3">
                        {formatKegiatanDate(item.date)}
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-medium tracking-tight text-gray-950 mb-3 group-hover:text-reddmas-red transition-colors duration-300 line-clamp-2">
                        {text.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">
                        {text.excerpt}
                      </p>

                      {/* Minimalist Link */}
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-reddmas-dark group-hover:text-reddmas-red transition-colors duration-300">
                        <span>{t("readMore")}</span>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
