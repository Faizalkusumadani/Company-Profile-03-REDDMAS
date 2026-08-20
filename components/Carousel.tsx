"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { slides, type Slide } from "@/data/slides";

// ─── Motion-wrapped locale-aware Link ─────────────────────────────────────────
const MotionLink = motion.create(Link);

// ─── Constants ────────────────────────────────────────────────────────────────
const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 0.9; // dipakai BERSAMA oleh background & content
const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.55;
const SWIPE_THRESHOLD = 45; // px, jarak minimum drag horizontal dianggap swipe

// Posisi konten per slide (0-indexed). "center" | "left"
const SLIDE_ALIGN: ("center" | "left")[] = [
  "left",
  "left",
  "left",
  "center",
  "center",
];

// atur headling
const SLIDE_VERTICAL_OFFSET: string[] = ["", "", "", ""];

// ─── Animated headline ────────────────────────────────────────────────────────
function AnimatedHeadline({
  words,
  accentColor,
  accentIndices,
  align,
  reduceMotion,
}: {
  words: string[];
  accentColor: string;
  accentIndices: number[];
  align: "center" | "left";
  reduceMotion: boolean;
}) {
  const rows: string[][] = [];
  for (let i = 0; i < words.length; i += 3) {
    rows.push(words.slice(i, i + 3));
  }

  let gi = 0;
  return (
    <div className={align === "left" ? "text-left" : "text-center"}>
      {rows.map((row, ri) => (
        <div key={ri} className="overflow-hidden">
          {row.map((word) => {
            const idx = gi++;
            return (
              <motion.span
                key={idx}
                className="mr-2.5 inline-block font-extrabold uppercase tracking-wide drop-shadow-lg md:mr-3"
                style={{
                  color: accentIndices.includes(idx) ? accentColor : "#ffffff",
                  fontSize: "clamp(1.75rem, 7vw, 3.75rem)",
                  lineHeight: 1.15,
                  textShadow: "0 2px 16px rgba(0,0,0,0.45)",
                }}
                initial={reduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={
                  reduceMotion
                    ? { duration: 0.3, delay: 0.05 * idx }
                    : {
                        duration: WORD_DURATION,
                        delay: 0.2 + idx * WORD_STAGGER,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }
                }
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Slide content overlay ────────────────────────────────────────────────────
function SlideContent({
  slide,
  t,
  align,
  showCta,
  reduceMotion,
}: {
  slide: Slide;
  t: ReturnType<typeof useTranslations>;
  align: "center" | "left";
  showCta: boolean;
  reduceMotion: boolean;
}) {
  const wordCount = slide.headlineKeys.length;
  const bodyDelay = reduceMotion ? 0.1 : 0.2 + wordCount * WORD_STAGGER + 0.1;
  const ctaDelay = bodyDelay + 0.12;
  const words = slide.headlineKeys.map((k) => t(k));
  const isLeft = align === "left";

  return (
    <div
      className={`relative z-10 flex flex-col px-1 ${
        isLeft ? "items-start" : "items-center text-center"
      }`}
    >
      {/* Headline */}
      <AnimatedHeadline
        words={words}
        accentColor={slide.accentColor}
        accentIndices={slide.headlineAccentIndices}
        align={align}
        reduceMotion={reduceMotion}
      />

      {/* Divider */}
      <motion.div
        className="my-5 h-px md:my-6"
        style={{ background: `rgba(${slide.accentColorRgb}, 0.65)` }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 48, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: Math.max(bodyDelay - 0.1, 0),
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />

      {/* Body */}
      <motion.p
        className={`text-sm font-light leading-relaxed text-white/70 md:text-lg ${
          isLeft ? "max-w-xs sm:max-w-lg" : "max-w-xs sm:max-w-3xl"
        }`}
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: bodyDelay,
          ease: "easeOut",
        }}
      >
        {t(slide.bodyKey)}
      </motion.p>

      {/* CTA — hanya slide terakhir */}
      {showCta && (
        <MotionLink
          href={slide.ctaHref}
          className="mt-6 flex items-center gap-2.5 rounded-full border px-6 py-3 text-xs font-semibold tracking-wide backdrop-blur-sm transition-all duration-200 md:mt-7 md:px-8 md:py-3.5 md:text-sm"
          style={{
            color: "#ffffff",
            borderColor: `rgba(${slide.accentColorRgb}, 0.45)`,
            background: `rgba(${slide.accentColorRgb}, 0.12)`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: ctaDelay,
            ease: "easeOut",
          }}
          whileHover={{
            background: `rgba(${slide.accentColorRgb}, 0.28)`,
            scale: 1.02,
          }}
          whileTap={{ scale: 0.97 }}
        >
          {t(slide.ctaKey)}
          <span aria-hidden="true" className="text-base">
            →
          </span>
        </MotionLink>
      )}
    </div>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────
function ArrowBtn({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-black/40 md:h-12 md:w-12"
    >
      <motion.span
        whileHover={{ x: dir === "prev" ? -2 : 2 }}
        className="text-base leading-none md:text-lg"
        aria-hidden="true"
      >
        {dir === "prev" ? "←" : "→"}
      </motion.span>
    </button>
  );
}

// ─── Main carousel ────────────────────────────────────────────────────────────
export default function HeroCarousel() {
  const t = useTranslations("slides");
  const reduceMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);

  // ── Touch/swipe tracking ──
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
    pausedAtRef.current = 0;
    startRef.current = null;
  }, []);

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );

  // ── Autoplay via requestAnimationFrame ──
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (isHovered) return;

    const tick = (now: number) => {
      if (startRef.current === null) {
        startRef.current = now - (pausedAtRef.current / 100) * SLIDE_DURATION;
      }
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      pausedAtRef.current = 0;
      startRef.current = null;
      setProgress(0);
      setCurrent((c) => (c + 1) % slides.length);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, isHovered]);

  // ── Preload gambar slide berikutnya ──

  // ── Swipe handlers (mobile) ──
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
    setIsHovered(true);
    pausedAtRef.current = progress;
    startRef.current = null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    setIsHovered(false);
    startRef.current = null;
    if (!start) return;

    const end = e.changedTouches[0];
    const deltaX = end.clientX - start.x;
    const deltaY = end.clientY - start.y;
    touchStartRef.current = null;

    // Abaikan kalau gerakan lebih vertikal (user lagi scroll halaman)
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX > SWIPE_THRESHOLD) {
      prev();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      next();
    }
  };

  const slide = slides[current];
  const align = SLIDE_ALIGN[current] ?? "center";
  const isLeft = align === "left";
  const transitionDuration = reduceMotion ? 0.3 : TRANSITION_DURATION;

  return (
    <section
      className="group/carousel absolute top-0 w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: 480, touchAction: "pan-y" }}
      aria-label="Hero carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => {
        setIsHovered(true);
        pausedAtRef.current = progress;
        startRef.current = null;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startRef.current = null;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={`slide-${current}`}
          className="absolute inset-0"
          initial={current === 0 ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration, ease: "easeInOut" }}
        >
          {/* Background image */}
          <Image
            src={slide.imageSrc}
            alt=""
            fill
            quality={70}
            priority
            fetchPriority={current === 0 ? "high" : "auto"} // opsional: cuma slide pertama yang "high"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)",
            }}
          />
          {/* Top gradient */}
          <div
            className="absolute inset-x-0 top-0 h-32 md:h-40"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
          {/* Left gradient — untuk slide align "left" */}
          {isLeft && (
            <div
              className="absolute inset-y-0 left-0 w-2/3"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
              }}
            />
          )}
          {/* Accent tint */}
          <div
            className="absolute inset-0"
            style={{ background: `rgba(${slide.accentColorRgb}, 0.05)` }}
          />

          {/* Content */}
          <div
            className={`absolute inset-0 flex flex-col justify-center ${
              isLeft
                ? "items-start px-6 sm:px-10 md:px-24 lg:px-32"
                : "items-center px-6"
            }`}
          >
            <div className={SLIDE_VERTICAL_OFFSET[current] ?? ""}>
              <SlideContent
                slide={slide}
                t={t}
                align={align}
                showCta={current === slides.length - 1}
                reduceMotion={!!reduceMotion}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Side arrows — selalu tampil di mobile, hover-reveal di desktop ── */}
      <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 opacity-80 transition-opacity duration-300 md:left-8 md:opacity-0 md:group-hover/carousel:opacity-100">
        <ArrowBtn dir="prev" onClick={prev} />
      </div>
      <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 opacity-80 transition-opacity duration-300 md:right-8 md:opacity-0 md:group-hover/carousel:opacity-100">
        <ArrowBtn dir="next" onClick={next} />
      </div>

      {/* ── Bottom index bar: counter + segmented progress ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-7xl items-stretch">
          {/* Counter */}
          <div className="flex shrink-0 items-center gap-2 border-r border-white/10 px-3.5 py-3 font-mono text-[11px] tracking-[0.15em] text-white/40 md:gap-2.5 md:px-8 md:py-4 md:text-xs">
            <span className="text-white">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-white/25">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>

          {/* Segmented progress index — pengganti dots */}
          <div
            className="flex flex-1 items-stretch"
            role="tablist"
            aria-label="Slide navigation"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="group relative flex-1 border-r border-white/10 outline-none last:border-r-0"
              >
                {/* Track (belum terisi) */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15" />
                {/* Fill — penuh untuk slide yang sudah lewat, animasi progress untuk yang aktif */}
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-reddmas-red transition-[width] duration-100 ease-linear"
                  style={{
                    width:
                      i < current
                        ? "100%"
                        : i === current
                          ? `${progress}%`
                          : "0%",
                  }}
                />
                <span className="hidden select-none px-2 py-4 text-center font-mono text-[10px] tracking-[0.2em] text-white/30 transition-colors duration-200 group-hover:text-white/70 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block h-11 sm:hidden" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
