import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { creativeBrands } from "@/data/data-bisnis-creative";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Creative, IP Licensing & Merchandising",
    description:
      "Menciptakan dan mengelola konten kreatif serta lisensi IP & Merchandising yang bernilai tinggi melalui pendekatan desain, inovasi, dan strategi pemasaran yang efektif.",

    openGraph: {
      title: " Reddmasgroup | Creative, IP Licensing & Merchandising",
      description:
        "Menciptakan dan mengelola konten kreatif serta lisensi IP & Merchandising yang bernilai tinggi melalui pendekatan desain, inovasi, dan strategi pemasaran yang efektif.",
      url: `${siteUrl}/${locale}/Creative, IP Licensing & Merchandising`,
    },

    alternates: {
      canonical: `${siteUrl}/${locale}/Creative, IP Licensing & Merchandising`,
      languages: {
        "id-ID": `${siteUrl}/id/Creative, IP Licensing & Merchandising`,
        "en-US": `${siteUrl}/en/Creative, IP Licensing & Merchandising`,
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
          title={t("nav.business_design")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.business") },
            { label: t("nav.business_design") },
          ]}
        />
      </header>

      {/* Sidebar */}
      <section id="Creative, IP Licensing & Merchandising">
        <div className="max-w-7xl mx-auto px-4 pt-50 md:pt-98 pb-20 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Sidebar Anchor — sticky */}
          <Sidebar
            title={t("nav.business")}
            navbarHeight={120}
            items={[
              {
                label: t("nav.business_design"),
                href: "#content",
              },
            ]}
          />

          {/* Konten utama */}
          <main className="flex-1 space-y-15 py-10">
            <section id="content">
              <div className="space-y-6 text-gray-500 text-sm md:text-base leading-relaxed font-[350]">
                <p>{t("creative.desc_01")}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                {creativeBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/bisnis/creative/${brand.slug}`}
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
