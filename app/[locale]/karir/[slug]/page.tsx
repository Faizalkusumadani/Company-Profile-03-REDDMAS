import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Breadcrumbs from "@/components/Breadcrumb";
import {
  getAllJobs,
  getAllJobSlugs,
  getJobBySlug,
  formatIndonesianDate,
  isJobOpen,
} from "@/data/data-karir";
import { getTranslations, getLocale } from "next-intl/server";
import {
  MapPin,
  Briefcase,
  CalendarDays,
  ArrowRight,
  Mail,
} from "lucide-react";

const siteUrl = "https://reddmasgroup.com";

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const job = getJobBySlug(slug);
  const t = await getTranslations();

  if (!job) return { title: "Lowongan Tidak Ditemukan" };

  const title = t(`karir.jobs.${slug}.title`);
  const description = t(`karir.jobs.${slug}.description`);

  return {
    title: `${title} | Karir Reddmas Group`,
    description,
    openGraph: {
      title: `${title} | Reddmas Group`,
      description,
      url: `${siteUrl}/${locale}/karir/${slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/karir/${slug}`,
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug); // data struktural: location, type, postedDate, deadline

  if (!job) notFound();

  const t = await getTranslations();
  const locale = await getLocale();
  const open = isJobOpen(job);

  // Konten terjemahan berdasarkan slug
  const title = t(`karir.jobs.${slug}.title`);
  const department = t(`karir.jobs.${slug}.department`);
  const description = t(`karir.jobs.${slug}.description`);
  const responsibilities = t.raw(
    `karir.jobs.${slug}.responsibilities`,
  ) as string[];
  const requirements = t.raw(`karir.jobs.${slug}.requirements`) as string[];
  const benefits = t.raw(`karir.jobs.${slug}.benefits`) as string[] | undefined;

  const otherJobs = getAllJobs()
    .filter((j) => j.slug !== job.slug)
    .slice(0, 5);

  return (
    <div className="w-full py-20">
      <header>
        <Breadcrumbs
          title={title}
          items={[
            { label: t("nav.home"), href: `/` },
            { label: t("nav.career"), href: `/karir` },
            { label: title },
          ]}
        />
      </header>

      <section>
        <div className="max-w-6xl w-full mx-auto px-4 pt-48 md:pt-96 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                  <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-reddmas-red mb-2">
                    {department}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {title}
                  </h1>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    open
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {open ? t("karir.status_open") : t("karir.status_closed")}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {t("karir.limit_time")}{" "}
                  {formatIndonesianDate(job.deadline, locale)}
                </span>
              </div>

              {open && (
                <div className="mt-8 lg:hidden">
                  <a
                    href="mailto:recruitment@reddmasgroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-reddmas-red px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
                  >
                    {t("karir.cta_karir")}
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              )}

              <div className="mt-10 space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t("karir.content_h1_01")}
                  </h2>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t("karir.content_h1_02")}
                  </h2>
                  <ul className="mt-2 space-y-2 list-disc list-outside pl-5 text-gray-600">
                    {responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t("karir.content_h1_03")}
                  </h2>
                  <ul className="mt-2 space-y-2 list-disc list-outside pl-5 text-gray-600">
                    {requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                {benefits && benefits.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {t("karir.content_h1_04")}
                    </h2>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                      {benefits.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {open && (
                  <div className="hidden lg:block rounded-xl border border-gray-200 p-6 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-4">
                      {t("karir.desc_karir")}
                    </p>
                    <a
                      href="mailto:recruitment@reddmasgroup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-reddmas-red px-5 py-3 text-white font-medium hover:opacity-90 transition-opacity w-full"
                    >
                      {t("karir.cta_karir")}
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                )}

                {otherJobs.length > 0 && (
                  <div className="rounded-xl border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      {t("karir.header_side")}
                    </h3>
                    <ul className="space-y-4">
                      {otherJobs.map((j) => (
                        <li key={j.slug}>
                          <Link
                            href={`/karir/${j.slug}`}
                            className="group block rounded-lg p-3 -mx-3 hover:bg-gray-50 transition-colors"
                          >
                            <p className="text-sm font-medium text-gray-900 group-hover:text-reddmas-red transition-colors">
                              {t(`karir.jobs.${j.slug}.title`)}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {j.location}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/karir`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-reddmas-red hover:underline"
                    >
                      {t("karir.cta_side")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
