import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { tradingBrands } from "@/data/data-bisnis-trading";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Trading & Distribution",
    description:
      "Menyediakan produk berkualitas tinggi secara efisien dan terpercaya melalui jaringan distribusi yang luas dan terintegrasi.",

    openGraph: {
      title: " Reddmasgroup | Trading & Distribution",
      description:
        "Menyediakan produk berkualitas tinggi secara efisien dan terpercaya melalui jaringan distribusi yang luas dan terintegrasi.",
      url: `${siteUrl}/${locale}/trading`,
    },

    alternates: {
      canonical: `${siteUrl}/${locale}/trading`,
      languages: {
        "id-ID": `${siteUrl}/id/trading`,
        "en-US": `${siteUrl}/en/trading`,
      },
    },
  };
}

export default async function TradingPage() {
  const t = await getTranslations();

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.business_construction")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.business") },
            { label: t("nav.business_construction") },
          ]}
        />
      </header>

      {/* Sidebar */}
      <section id="Trading & Distribution">
        <div className="max-w-7xl mx-auto px-4 pt-50 md:pt-98 pb-20 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Sidebar Anchor — sticky */}
          <Sidebar
            title={t("nav.business")}
            navbarHeight={120}
            items={[
              { label: t("nav.business_construction"), href: "#content" },
            ]}
          />

          {/* Konten utama */}
          <main className="flex-1 space-y-15 py-10">
            <section id="content">
              <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-[350]">
                <p>{t("trading.desc_01")}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                {tradingBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/bisnis/trading/${brand.slug}`}
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative aspect-3/2 bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 rounded-sm overflow-hidden">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain p-8"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center group-hover:text-reddmas-red transition-colors">
                      {brand.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}
