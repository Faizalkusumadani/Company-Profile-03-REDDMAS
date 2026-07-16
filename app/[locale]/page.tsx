import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import HeroCarousel from "@/components/Carousel";
import BrandMarquee from "@/components/Brandmarquee";
import principles from "@/data/principle";
import PrincipleTabs from "@/components/MenuTabs";
import {
  beritaperusahaan,
  getBeritaText,
  formatBeritaDate,
  BeritaMessages,
} from "@/data/data-berita";
import { MoveRight } from "lucide-react";

export default function HomePage() {
  const t = useTranslations();
  // Ambil objek teks berita (tag/title/excerpt/content) dari messages,
  // lalu digabung dengan data struktural (id/slug/date/image) dari data-berita.ts
  const beritaMessages = t.raw("berita") as BeritaMessages;

  return (
    <div className="relative w-full min-h-screen">
      <header className="relative w-full h-screen min-h-90 overflow-hidden">
        <HeroCarousel />
      </header>

      {/* --- Section Lini Bisnis --- */}
      <section id="Lini" className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-reddmas-red mb-2">
            {t("tag_lini")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-reddmas-dark leading-tight mb-3">
            {t("header_lini")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            {t("desc_lini")}
          </p>
          <div
            className="
              flex md:grid gap-5
              overflow-x-auto md:overflow-visible
              snap-x snap-mandatory md:snap-none
              -mx-6 px-6 md:mx-0 md:px-0
              pb-6 md:pb-0
              scrollbar-hide
              md:grid-cols-5
            "
          >
            {[
              {
                num: "01",
                title: "Trading & Distribution",
                desc: "Distribusi bahan bangunan dan mekanikal elektrik berkualitas tinggi",
                img: "/Talent/trading_distributor.png",
              },
              {
                num: "02",
                title: "Hvac Installation & Services",
                desc: "Installation dengan teknologi terbaru dan pelayanan prima",
                img: "/Talent/hvac_services.png",
              },
              {
                num: "03",
                title: "Creative, IP Licensing & Merchandising",
                desc: "Karya Desain Berlisensi untuk Jiwa Anime Anda",
                img: "/Talent/creative_merchadising.png",
              },
              {
                num: "04",
                title: "Information & Technology solutions",
                desc: "Solusi teknologi inovatif untuk transformasi digital bisnis Anda",
                img: "/Talent/information_technology.png",
              },
              {
                num: "05",
                title: "Food & Beverage",
                desc: "Konsep kuliner inovatif dengan cita rasa otentik dan pengalaman bersantap yang unik",
                img: "/Talent/food_beverage.png",
              },
            ].map((lini, index) => (
              <div
                key={lini.num}
                className={`group relative overflow-hidden border border-white/10 cursor-pointer
                  shrink-0 w-[68vw] sm:w-auto snap-center
                  md:transition-transform md:duration-500
                  ${index % 2 === 1 ? "md:translate-y-7" : "md:translate-y-0"}
                `}
                style={{ aspectRatio: "3/4.5" }}
              >
                {/* Background image */}
                <Image
                  src={lini.img}
                  alt={lini.title}
                  fill
                  className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                  sizes="(max-width: 640px) 68vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Overlay — permanen gelap di mobile, hover-based di desktop */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-t from-black/85 via-black/30 to-transparent
                    md:bg-linear-to-l md:from-black/60 md:via-black/10 md:to-transparent
                    md:group-hover:from-black/90 md:group-hover:via-black/80 md:group-hover:to-black/70
                    transition-all duration-300
                  "
                />

                {/* Content — title di atas, desc + tombol di bawah */}
                <div className="absolute inset-0 p-4 z-10 flex flex-col justify-end md:justify-between">
                  {/* Title */}
                  <p className="text-white md:group-hover:text-reddmas-red font-bold text-sm leading-snug drop-shadow-md md:ms-6">
                    {lini.title}
                  </p>

                  {/* Mobile: desc + tombol selalu tampil. Desktop: hover-reveal */}
                  <div
                    className="
                      mt-2 md:mt-0
                      opacity-100 translate-y-0
                      md:opacity-0 md:group-hover:opacity-100
                      md:translate-y-2 md:group-hover:translate-y-0
                      transition-all duration-300
                    "
                  >
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3 md:line-clamp-none">
                      {lini.desc}
                    </p>
                    <button className="text-xs sm:text-sm font-semibold text-white border border-reddmas-red px-3 py-1.5 rounded-full md:hover:bg-reddmas-red transition-colors duration-200">
                      {t("cta")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indikator swipe — hanya tampil di mobile */}
          <div className="flex justify-center gap-1.5 mt-2 md:hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </section>
      {/* --- Section About --- */}
      <section
        id="about"
        className="relative z-10 py-10 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bagian Kiri: Ilustrasi Geometris */}
          <div className="flex justify-center md:justify-end relative">
            <Image
              src="/Banner/Hero-Utama.png"
              width={900}
              height={600}
              priority
              quality={70}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px"
              className="w-full h-full z-10 object-contain mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]"
              alt="Tim PT Mega Adhitama Sejati"
            />
          </div>

          {/* Bagian Kanan: Konten Teks */}
          <div className="space-y-6 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-red-700 mb-2">
              {t("tag_reddmas")}
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-reddmas-dark leading-tight tracking-tight">
              {t("header_reddmas")}
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
              {t("desc_reddmas")}
            </p>

            <div className="pt-2">
              <Link
                href="/tentang-kami/profil"
                className="inline-flex items-center gap-3 px-6 py-3 border border-reddmas-red rounded-full text-sm font-medium text-reddmas-red hover:bg-reddmas-red hover:text-white hover:border-reddmas-red transition-colors duration-200 group"
              >
                {t("cta_reddmas")}
                <MoveRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section Berita Terbaru --- */}
      <section id="news" className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-reddmas-red mb-2">
                {t("berita.tag_news") || "Update Terbaru"}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-reddmas-dark leading-tight">
                {t("berita.header_news") || "Berita & Artikel"}
              </h2>
            </div>

            {/* Button Lihat Semua Berita */}
            <Link
              href="/ruang-informasi/berita"
              className="inline-flex items-center gap-2 self-start md:self-auto text-sm font-semibold text-reddmas-red hover:text-red-700 transition-colors duration-200 group"
            >
              {t("berita.view_all_news") || "Lihat Semua Berita"}
              <MoveRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Grid Card Berita (Mengambil 3 Data Teratas dari data-berita.ts) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaperusahaan.slice(0, 3).map((news) => {
              const text = getBeritaText(beritaMessages, news.id);

              return (
                <article
                  key={news.slug}
                  className="group flex flex-col justify-between"
                >
                  <Link
                    href={`/ruang-informasi/berita/${news.slug}`}
                    className="block w-full"
                  >
                    {/* Image Thumbnail dengan Efek Deselerasi Halus */}
                    <div className="aspect-16/10 relative w-full overflow-hidden bg-gray-50 rounded-xl mb-6">
                      <Image
                        src={news.image}
                        alt={text.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="text-xs text-gray-500 font-medium mb-3">
                      {formatBeritaDate(news.date)}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-medium tracking-tight text-gray-950 mb-3 group-hover:text-reddmas-red transition-colors duration-300 line-clamp-2">
                      {text.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">
                      {text.excerpt}
                    </p>

                    {/* Minimalist Link */}
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-reddmas-dark group-hover:text-reddmas-red transition-colors duration-300">
                      <span>{t("readMore")}</span>
                      <svg
                        className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Section Education --- */}
      <section
        id="education"
        className="relative z-10 py-24 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bagian Kanan: Konten Teks */}
          <div className="space-y-6 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-red-700 mb-2">
              {t("tag_bromo")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-reddmas-dark leading-tight tracking-tight">
              {t("header_bromo")}
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
              {t("desc_bromo")}
            </p>
          </div>
          {/* Bagian Kiri: Ilustrasi Geometris */}
          <div className="flex justify-center md:justify-end relative">
            <Image
              src="/Banner/Hero-Bromo.webp"
              width={900}
              height={600}
              priority
              quality={70}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px"
              className="w-full h-full z-10 object-contain mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]"
              alt="Tim PT Mega Adhitama Sejati"
            />
          </div>
        </div>
      </section>

      {/* --- Section Brandmarquee --- */}
      <section className="relative w-full overflow-hidden bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center md:mb-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-reddmas-red">
              {t("tag_brand")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-snug text-reddmas-dark">
              {t("header_brand")}
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
              {t("desc_brand")}
            </p>
          </div>

          <BrandMarquee />
        </div>
      </section>

      {/* --- Section Principle ----- */}
      <section id="principle" className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-red-700 mb-2">
            {t("tag_principle")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-reddmas-dark leading-tight mb-3">
            {t("header_principle")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            {t("desc_principle")}
          </p>

          <div className="mb-10">
            <PrincipleTabs principles={principles} />
          </div>
        </div>
      </section>
    </div>
  );
}
