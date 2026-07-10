import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { hvacBrands } from "@/data/data-bisnis-hvac";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "HVAC Installation & Services",
    description:
      "Memberikan layanan instalasi dan perawatan sistem HVAC yang andal, hemat energi, dan ramah lingkungan untuk mendukung kenyamanan dan produktivitas pelanggan.",

    openGraph: {
      title: " Reddmasgroup | HVAC Installation & Services",
      description:
        "Memberikan layanan instalasi dan perawatan sistem HVAC yang andal, hemat energi, dan ramah lingkungan untuk mendukung kenyamanan dan produktivitas pelanggan.",
      url: `${siteUrl}/${locale}/HVAC Installation & Services`,
    },

    alternates: {
      canonical: `${siteUrl}/${locale}/HVAC Installation & Services`,
      languages: {
        "id-ID": `${siteUrl}/id/HVAC Installation & Services`,
        "en-US": `${siteUrl}/en/HVAC Installation & Services`,
      },
    },
  };
}

export default async function HvacPage() {
  const t = await getTranslations();

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.business_services")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.business") },
            { label: t("nav.business_services") },
          ]}
        />
      </header>

      {/* Sidebar */}
      <section id="HVAC">
        <div className="max-w-7xl mx-auto px-4 pt-50 md:pt-98 pb-20 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Sidebar Anchor — sticky */}
          <Sidebar
            title={t("nav.business")}
            navbarHeight={120}
            items={[{ label: t("nav.business_services"), href: "#content" }]}
          />

          {/* Konten utama */}
          <main className="flex-1 space-y-15 py-10">
            <section id="content">
              <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-[350]">
                <p>{t("havc.desc_01")}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                {hvacBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/bisnis/hvac/${brand.slug}`}
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
