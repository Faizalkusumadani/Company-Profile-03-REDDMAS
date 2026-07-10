import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import Timeline from "@/components/Timeline";
import { timelineData } from "@/data/timeline";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Profil Perusahaan",
    description:
      "Reddmas Group membangun ekosistem bisnis terintegrasi: Trading, HVAC Installation, IT Solutions, Creative IP, dan F&B. Inovasi & kolaborasi untuk pertumbuhan berkelanjutan.",

    openGraph: {
      title: " Reddmasgroup | Profil Perusahaan",
      description:
        "Reddmas Group membangun ekosistem bisnis terintegrasi: Trading, HVAC Installation, IT Solutions, Creative IP, dan F&B. Inovasi & kolaborasi untuk pertumbuhan berkelanjutan.",
      url: `${siteUrl}/${locale}/profil Perusahaan`,
    },

    alternates: {
      canonical: `${siteUrl}/${locale}/profil Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/profil Perusahaan`,
        "en-US": `${siteUrl}/en/profil Perusahaan`,
      },
    },
  };
}

export default async function ProfilPage() {
  const t = await getTranslations();

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.profil")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.profil") },
          ]}
        />
      </header>
      {/* Sidebar */}
      <section id="profile-perusahaan">
        <div className="max-w-7xl mx-auto px-4 pt-50 md:pt-98 pb-20 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Sidebar Anchor — sticky */}
          <Sidebar
            title={t("nav.about")}
            navbarHeight={120}
            items={[
              { label: t("nav.profil"), href: "#Profil-perusahaan" },
              { label: t("nav.histori"), href: "#history" },
            ]}
          />

          {/* Konten utama */}
          <main className="flex-1 space-y-15 py-10">
            <section id="Profil-perusahaan">
              <h2 className="text-3xl md:text-4xl font-bold text-reddmas-dark leading-tight tracking-tight mb-6">
                {t("nav.profil")}
              </h2>
              <div className="flex justify-center relative mb-8">
                <Image
                  src="/Banner/image-company.png"
                  width={900}
                  height={600}
                  priority
                  quality={70}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px"
                  className="w-full h-full z-10 object-contain mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]"
                  alt="Tim PT Mega Adhitama Sejati"
                />
              </div>
              <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                <p>{t("company-profile.desc_paragraf_1")}</p>
                <p>{t("company-profile.desc_paragraf_2")}</p>
                <p>{t("company-profile.desc_paragraf_3")}</p>
              </div>
            </section>
            <section id="history">
              <h1 className="text-3xl md:text-4xl font-bold text-reddmas-dark leading-tight tracking-tight mb-6">
                {t("nav.histori")}
              </h1>
              <div className="flex justify-center relative mb-8">
                <Image
                  src="/Banner/Carousel-04.png"
                  width={900}
                  height={600}
                  priority
                  quality={70}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px"
                  className="w-full h-full z-10 object-contain mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]"
                  alt="Tim PT Mega Adhitama Sejati"
                />
              </div>
              <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                <p>{t("company-profile.desc_paragraf_4")}</p>
                <p>{t("company-profile.desc_paragraf_5")}</p>
                <p>{t("company-profile.desc_paragraf_6")}</p>
              </div>

              {/* 2. Panggil Komponen Timeline Disini */}
              <div className="mt-12 bg-gray-50/50 rounded-2xl py-8">
                <Timeline items={timelineData} />
              </div>
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}
