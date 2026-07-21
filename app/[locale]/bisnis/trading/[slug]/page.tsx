import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Breadcrumbs from "@/components/Breadcrumb";
import {
  getTradingBrandBySlug,
  getTradingBrandSlugs,
} from "@/data/data-bisnis-trading";
import type { Metadata } from "next";

const siteUrl = "https://reddmasgroup.com";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getTradingBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const brand = getTradingBrandBySlug(slug);
  if (!brand) return {};

  const desc =
    brand.description[locale as "id" | "en"]?.[0] ?? brand.description.id[0];

  return {
    title: `${brand.name} | Trading & Distribution`,
    description: desc,
    openGraph: {
      title: `Reddmasgroup | ${brand.name}  `,
      description: desc,
      url: `${siteUrl}/bisnis/trading/${slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/bisnis/trading/${slug}`,
      languages: {
        "id-ID": `${siteUrl}/id/bisnis/trading/${slug}`,
        "en-US": `${siteUrl}/en/bisnis/trading/${slug}`,
      },
    },
  };
}

export default async function TradingDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations();
  const brand = getTradingBrandBySlug(slug);

  if (!brand) notFound();

  const desc = brand.description[locale as "id" | "en"] ?? brand.description.id;
  const contactLabel =
    locale === "id"
      ? "Untuk informasi lebih lanjut silahkan menghubungi"
      : "For further information, please contact";

  const contactItems = [
    {
      icon: MapPin,
      label: locale === "id" ? "Alamat" : "Address",
      value: brand.address.join(", "),
      href: null,
    },
    {
      icon: Phone,
      label: locale === "id" ? "Telepon" : "Phone",
      value: brand.telp,
      href: `tel:${brand.telp}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: brand.email,
      href: `mailto:${brand.email}`,
    },
    {
      icon: Globe,
      label: locale === "id" ? "Situs Web" : "Website",
      value: brand.web,
      href: brand.href,
      external: true,
    },
  ];

  return (
    <div className="w-full py-20">
      {/* Breadcrumb hero (top-0) */}
      <header>
        <Breadcrumbs
          title={brand.name}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.business") },
            {
              label: t("nav.business_construction"),
              href: "/bisnis/trading",
            },
            { label: brand.name },
          ]}
        />
      </header>

      {/* Konten */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-50 sm:pt-98 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kiri: konten (7/12) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-reddmas-red" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Trading &amp; Distribution
              </span>
            </div>

            {/* Judul */}
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-reddmas-red leading-tight tracking-tight">
              {brand.name}
            </h1>

            {/* Deskripsi */}
            <div className="space-y-5 text-gray-600 text-sm md:text-base leading-[1.85]">
              {desc.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Instagram */}
            <div className="pt-2">
              <a
                href={brand.instagram || brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5  hover:bg-reddmas-red text-reddmas-red hover:text-white text-sm font-semibold px-7 py-3.5 rounded-2xl border border-reddmas-red transition-colors duration-300"
              >
                <FaInstagram size={20} />
                {locale === "id" ? "Kunjungi Instagram" : "Visit Instagram"}
              </a>
            </div>

            {/* Kontak */}
            <div className="pt-8 mt-4 border-t border-gray-200 space-y-6">
              <p className="text-reddmas-dark font-semibold text-sm">
                {contactLabel}
              </p>

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {contactItems.map(
                  ({ icon: Icon, label, value, href, external }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-50 border border-gray-100 text-gray-500 shrink-0 mt-0.5">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-reddmas-red mb-0.5">
                          {label}
                        </dt>
                        <dd className="text-sm text-gray-600 font-medium leading-relaxed">
                          {href ? (
                            <a
                              href={href}
                              {...(external
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                              className="hover:text-reddmas-red transition-colors break-all"
                            >
                              {value}
                            </a>
                          ) : (
                            <span className="wrap-break-word">{value}</span>
                          )}
                        </dd>
                      </div>
                    </div>
                  ),
                )}
              </dl>
            </div>
          </div>

          {/* Kanan: logo (5/12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="border border-gray-200 rounded-lg p-10 sm:p-12 shadow-sm">
              <div className="relative aspect-square w-full max-w-md mx-auto">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 448px) 100vw, 448px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
