import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale } from "next-intl/server";
import { visiMisiData } from "@/data/visi-misi";

const siteUrl = "https://reddmasgroup.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Visi & Misi Perusahaan",
    description: "Visi & Misi Reddmas Group didirikan",
    openGraph: {
      title: " Reddmasgroup | Visi & Misi Perusahaan",
      description: "Visi & Misi Reddmas Group didirikan",
      url: `${siteUrl}/${locale}/visi-misi Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/visi-misi Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/visi-misi Perusahaan`,
        "en-US": `${siteUrl}/en/visi-misi Perusahaan`,
      },
    },
  };
}

interface MisiPoint {
  title: string;
  description: string;
}

export default async function Visi_MisiPage() {
  const t = await getTranslations();

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.visi-misi")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.visi-misi") },
          ]}
        />
      </header>

      <section id="visi-misi">
        <div className="max-w-7xl w-full mx-auto px-4 py-50 md:py-98 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visiMisiData.map(({ id, icon: Icon }) => (
              <div key={id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-reddmas-red/10 shrink-0">
                    <Icon className="w-7 h-7 text-reddmas-red" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-reddmas-dark">
                    {t(`visiMisi.${id}.title`)}
                  </h2>
                </div>

                {id === "visi" && (
                  <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                    {t("visiMisi.visi.description")}
                  </p>
                )}

                {id === "misi" && (
                  <ol className="space-y-8">
                    {(() => {
                      const rawList = t.raw("visiMisi.misi.list");
                      const list: MisiPoint[] = Array.isArray(rawList)
                        ? rawList
                        : Object.values(rawList ?? {});

                      return list.map((point: MisiPoint, idx: number) => (
                        <li key={point.title} className="flex gap-4">
                          <span className="text-reddmas-red font-bold text-lg shrink-0 w-6">
                            {idx + 1}.
                          </span>
                          <div>
                            <h3 className="text-reddmas-red font-bold text-lg mb-1">
                              {point.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {point.description}
                            </p>
                          </div>
                        </li>
                      ));
                    })()}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
