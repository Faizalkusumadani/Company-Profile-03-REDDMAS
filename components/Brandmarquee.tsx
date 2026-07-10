"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { brands as defaultBrands, type Brand } from "@/data/brands";

const SCROLL_SPEED = 36;
const GAP = 64;
const LOGO_BOX_WIDTH = 200;
const LOGO_BOX_HEIGHT = 64;

// ─── Brand logo item ──────────────────────────────────────────────────────────
function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center px-2 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      style={{ width: LOGO_BOX_WIDTH, height: LOGO_BOX_HEIGHT }}
    >
      <Image
        src={brand.logoSrc}
        alt={brand.name}
        fill
        sizes={`${LOGO_BOX_WIDTH}px`}
        className="object-contain"
      />
    </div>
  );
}

// ─── Main marquee ─────────────────────────────────────────────────────────────

export default function BrandMarquee({
  brands = defaultBrands,
}: {
  brands?: Brand[];
}) {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0); // lebar 1 set brand (sebelum diduplikasi)

  // Duplikat list 2x supaya loop terlihat mulus: track kedua menyusul
  // persis di belakang track pertama. Saat x mencapai -halfWidth, reset
  // ke 0 — karena track kedua identik, mata tidak menangkap "patahan".
  const track = [...brands, ...brands];

  useEffect(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, [brands]);

  useAnimationFrame((_, delta) => {
    if (isHovered || reduceMotion) return;
    if (!halfWidthRef.current) return;

    const moveBy = (SCROLL_SPEED * delta) / 1000;
    let next = x.get() - moveBy;

    if (Math.abs(next) >= halfWidthRef.current) {
      next += halfWidthRef.current;
    }
    x.set(next);
  });

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fade gradient kiri — logo terasa "menghilang" halus, bukan terpotong */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32"
        style={{
          background:
            "linear-gradient(to right, white 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Fade gradient kanan */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32"
        style={{
          background:
            "linear-gradient(to left, white 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex w-max items-center"
          style={{ gap: GAP, x }}
        >
          {track.map((brand, i) => (
            <BrandLogo key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
