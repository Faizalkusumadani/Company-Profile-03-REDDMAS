import { getTranslations, getMessages, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import {
  kegiatanperusahaan,
  getKegiatanBySlug,
  getKegiatanText,
  formatKegiatanDate,
  type KegiatanMessages,
} from "@/data/data-kegiatan";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com/";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return kegiatanperusahaan.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const item = getKegiatanBySlug(slug);

  if (!item) {
    return { title: "Kegiatan tidak ditemukan" };
  }

  const messages = await getMessages({ locale });
  const kegiatanMessages = messages.kegiatan as unknown as KegiatanMessages;
  const text = getKegiatanText(kegiatanMessages, item.id);

  return {
    title: text.title,
    description: text.excerpt,
    openGraph: {
      title: `Reddmasgroup | ${text.title}`,
      description: text.excerpt,
      url: `${siteUrl}/${locale}/kegiatan/${item.slug}`,
      images: [{ url: item.image }],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/kegiatan/${item.slug}`,
      languages: {
        "id-ID": `${siteUrl}/id/kegiatan/${item.slug}`,
        "en-US": `${siteUrl}/en/kegiatan/${item.slug}`,
      },
    },
  };
}

export default async function KegiatanDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations();
  const messages = await getMessages();
  const kegiatanMessages = messages.kegiatan as unknown as KegiatanMessages;

  const item = getKegiatanBySlug(slug);
  if (!item) {
    notFound();
  }

  const text = getKegiatanText(kegiatanMessages, item.id);

  const kegiatanLainnya = [...kegiatanperusahaan].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={text.tag}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.news") },
            {
              label: t("nav.news_activity"),
              href: "/ruang-informasi/kegiatan",
            },
            { label: text.tag },
          ]}
        />
      </header>

      <section id="kegiatan">
        <div className="px-4 pt-50 md:pt-98 pb-20 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <article className="order-1 lg:col-span-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {text.title}
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm mb-6">
                  {t("posted")} Admin &mdash; {formatKegiatanDate(item.date)}
                </p>
                <div className="relative w-full h-64 md:h-112 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={item.image}
                    alt={text.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                  {text.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>

              {/*  sidebar */}
              <aside className="order-2 lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-linear-to-r from-red-600 to-reddmas-red px-6 py-2">
                    <h2 className="text-white text-lg font-bold tracking-wide">
                      {t("activities")} {t("others")}
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200 max-h-max overflow-y-auto">
                    {kegiatanLainnya.map((kegiatan) => {
                      const kegiatanText = getKegiatanText(
                        kegiatanMessages,
                        kegiatan.id,
                      );
                      const isActive = kegiatan.slug === slug;
                      return (
                        <Link
                          key={kegiatan.slug}
                          href={`/ruang-informasi/kegiatan/${kegiatan.slug}`}
                          className={`block p-4 transition-colors duration-200 group ${
                            isActive ? "bg-gray-100" : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="relative w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={kegiatan.image}
                                alt={kegiatanText.title}
                                fill
                                sizes="128px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <h3
                                className={`font-semibold text-sm leading-snug mb-2 line-clamp-3 transition-colors ${
                                  isActive
                                    ? "text-mas-red"
                                    : "text-gray-900 group-hover:text-mas-red"
                                }`}
                              >
                                {kegiatanText.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 mb-3">
                                {kegiatanText.excerpt}
                              </p>
                              <div className="flex items-center text-gray-500 text-xs mt-auto">
                                <Calendar className="w-4 h-4 mr-1.5" />
                                <time className="font-medium">
                                  {formatKegiatanDate(kegiatan.date)}
                                </time>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
