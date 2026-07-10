import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale, getMessages } from "next-intl/server";
import { coreValuesData } from "@/data/core-values";
import CoreValuesList from "@/components/CoreValuesList";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Nilai-Nilai Perusahaan",
    description:
      "Tentang Perusaahaan Reddmasgroup yang didirikan pada tahun 2012",
    openGraph: {
      title: " Reddmasgroup | nilai-nilai Perusahaan",
      description:
        "Tentang Perusaahaan Reddmasgroup yang didirikan pada tahun 2012",
      url: `${siteUrl}/${locale}/nilai-nilai Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/nilai-nilai Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/nilai-nilai Perusahaan`,
        "en-US": `${siteUrl}/en/nilai-nilai Perusahaan`,
      },
    },
  };
}

interface CoreValueText {
  title: string;
  description: string;
}

export default async function Nilai_NilaiPage() {
  const t = await getTranslations();
  const messages = await getMessages();

  const coreValuesMessages = (
    messages as {
      corevalues: Record<string, CoreValueText> & { heading: string };
    }
  ).corevalues;

  const items = coreValuesData
    .map(({ id, accentColor }) => {
      const value = coreValuesMessages?.[id];

      if (!value) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[nilai-nilai] Key "coreValues.${id}" tidak ditemukan di file translation. ` +
              `Pastikan key ini ada di messages/id.json dan messages/en.json.`,
          );
        }
        return null;
      }

      return {
        id,
        accentColor,
        title: value.title,
        description: value.description,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.nilai-nilai")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.nilai-nilai") },
          ]}
        />
      </header>

      {/* Ditambahkan min-h-[600px] agar section memiliki ruang tinggi yang cukup untuk menampung watermark di pojok */}
      <section id="nilai-nilai" className="relative w-full overflow-hidden">
        {/* REFAKTOR WATERMARK: Posisi dipindah ke kanan bawah dengan opasitas super tipis (4%) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-5%] bottom-1.25 hidden h-120 w-120 opacity-[0.04] md:block lg:right-[2%] lg:bottom-2.5 lg:h-120 lg:w-120"
        >
          <Image src="/Logo-icon.png" alt="" fill className="object-contain" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-48 sm:pt-95 pb-20">
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-reddmas-dark md:text-4xl">
              {t("corevalues.heading")}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
              {t("corevalues.desc_corevalues")}
            </p>
          </div>

          {/* Dekorasi Tambahan: Membungkus list dengan border-t atau membiarkannya mengalir */}
          <div className="border-t border-gray-100 pt-8 [&_>_div]:border-b [&_>_div]:border-gray-50 [&_>_div]:pb-8">
            <CoreValuesList items={items} />
          </div>
        </div>
      </section>
    </div>
  );
}
