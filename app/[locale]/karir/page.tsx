import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumb";
import JobCard from "@/components/JobCard";
import { getAllJobs } from "@/data/data-karir";
import { getTranslations, getLocale } from "next-intl/server";

const siteUrl = "https://reddmasgroup.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Karir Perusahaan | Reddmas Group",
    description: "Lowongan karir Reddmas Group yang dapat dihubungi",
    openGraph: {
      title: "Reddmas Group | Karir Perusahaan",
      description: "Lowongan karir Reddmas Group yang dapat dihubungi",
      url: `${siteUrl}/${locale}/karir`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/karir`,
      languages: {
        "id-ID": `${siteUrl}/id/karir`,
        "en-US": `${siteUrl}/en/karir`,
      },
    },
  };
}

export default async function KarirPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const jobs = getAllJobs();

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={t("nav.career")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.career") },
          ]}
        />
      </header>

      <section id="karir">
        <div className="max-w-7xl w-full mx-auto px-4 pt-50 md:pt-98 pb-20 space-y-10">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              {t("karir.header_karir")}
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
              {t("karir.desc_karir")}
            </p>
          </div>
          {/* Attention banner — peringatan anti-penipuan rekrutmen */}
          <div
            role="alert"
            className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 md:px-6 md:py-5"
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
              aria-hidden="true"
            />
            <div className="text-sm text-amber-900">
              <p className="font-semibold text-amber-950">
                {t("karir.warning_title")}
              </p>
              <p className="mt-1 leading-relaxed">
                {t.rich("karir.warning_body", {
                  strong: (chunks) => (
                    <strong className="font-semibold text-amber-950">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </div>
          </div>
          {/* Job list */}
          <div>
            {jobs.length > 0 ? (
              <>
                <p className="mb-5 text-sm font-medium text-gray-500">
                  {t("karir.job_count", { count: jobs.length })}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.slug} job={job} locale={locale} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-16 text-center">
                <p className="text-gray-500">{t("karir.empty_state")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
