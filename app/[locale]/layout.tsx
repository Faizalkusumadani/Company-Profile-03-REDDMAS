import type { Metadata } from "next";
import { SerwistProvider } from "@serwist/turbopack/react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pageloader from "@/components/Pageloader";
import CookieConsent from "@/components/Cookie";
import { Poppins } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Site Config ──────────────────────────────────────────────────────────────
const siteConfig = {
  url: "https://reddmasgroup.com/",
  name: "Reddmas Group",
  shortName: "Reddmas",
  description:
    "Reddmas Group membangun ekosistem bisnis terintegrasi: Trading, HVAC Installation, IT Solutions, Creative IP, dan F&B. Inovasi & kolaborasi untuk pertumbuhan berkelanjutan.",
  ogImage: "/og-image.png",
} as const;

// ─── Static Params (wajib untuk static generation per locale) ────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: `${siteConfig.name} | Beranda`,
      template: `${siteConfig.name} | %s`,
    },

    description: siteConfig.description,

    keywords: [
      "Reddmas Group ",
      "membangun ekosistem",
      "bisnis terintegrasi",
      "Trading, HVAC Installation, IT Solutions, Creative IP, dan F&B.",
      "Inovasi & kolaborasi untuk pertumbuhan berkelanjutan",
    ],

    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Google Search Console / Bing Webmaster (lewat env var, jangan hardcode).
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    }),

    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      url: `${siteConfig.url}${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} | Beranda`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `Banner ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | Beranda`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },

    alternates: {
      canonical: `${siteConfig.url}${locale}`,
      languages: {
        id: `${siteConfig.url}id`,
        en: `${siteConfig.url}en`,
        "x-default": `${siteConfig.url}id`,
      },
    },

    manifest: "/manifest.webmanifest",

    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
  };
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Guard: kalau locale di URL tidak terdaftar (mis. /fr/...), 404
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Wajib dipanggil supaya static rendering per-locale bekerja dengan benar
  setRequestLocale(locale);

  // Dynamic Schema JSON-LD per Locale — tetap di layout karena ini
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}#organization`,
    description: `${siteConfig.description}`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}${locale}`,
    logo: `${siteConfig.url}/og-image.png`,
    image: `${siteConfig.url}${siteConfig.ogImage.replace(/^\//, "")}`,
    telephone: "+62-21-5835-1648",
    email: "customersupport@reddmasgroup.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Ciputra International Tokopedia Care Tower, 20th Floor, Unit 20.01 Jl. Lingkar Luar Barat No. 101",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      postalCode: "11740",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.172975522228764,
      longitude: 106.73014006061322,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "DKI Jakarta" },
      { "@type": "AdministrativeArea", name: "Banten" },
      { "@type": "AdministrativeArea", name: "Jawa Barat" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:30",
    },
    sameAs: [
      "https://www.instagram.com/reddmas.group?igsh=MWFoeDhnejF4eGNi",
      "https://www.linkedin.com/company/reddmas-group/",
      "https://www.youtube.com/@reddmasgroup",
    ],
  };
  const messages = await getMessages();

  const appBody = (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Pageloader />
      <Navbar locale={locale as Locale} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CookieConsent gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </NextIntlClientProvider>
  );

  return (
    <html lang={locale} className={`${poppins.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background">
        {process.env.NODE_ENV === "production" ? (
          <SerwistProvider swUrl="/serwist/sw.js">{appBody}</SerwistProvider>
        ) : (
          appBody
        )}
      </body>
    </html>
  );
}
