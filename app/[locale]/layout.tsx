import type { Metadata } from "next";
import { SerwistProvider } from "@serwist/turbopack/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pageloader from "@/components/Pageloader";
import { Poppins } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// ─── Site Config ──────────────────────────────────────────────────────────────
const siteConfig = {
  url: "https://reddmasgroup.com/",
  name: "Reddmas Group",
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
        "id-ID": `${siteConfig.url}id`,
        "en-US": `${siteConfig.url}en`,
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

  const messages = await getMessages();

  const appBody = (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Pageloader />
      <Navbar locale={locale as Locale} />
      <main className="bg-zinc-50 min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );

  return (
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <body>
        {process.env.NODE_ENV === "production" ? (
          <SerwistProvider swUrl="/serwist/sw.js">{appBody}</SerwistProvider>
        ) : (
          appBody
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
