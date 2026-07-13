"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import type { Partner, PartnerCategory } from "@/data/principle";

interface PrincipleTabsProps {
  principles: Partner[];
}

const TAB_ORDER: PartnerCategory[] = [
  "mep",
  "building_materials",
  "ev_charger",
  "sanitary",
  "computer",
];

export default function PrincipleTabs({ principles }: PrincipleTabsProps) {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const availableTabs = useMemo(
    () => TAB_ORDER.filter((cat) => principles.some((p) => p.category === cat)),
    [principles],
  );

  const [activeTab, setActiveTab] = useState<PartnerCategory>(
    () => (availableTabs.includes("mep") ? "mep" : availableTabs[0]) ?? "mep",
  );

  const tabs = useMemo(
    () =>
      availableTabs.map((cat) => ({
        value: cat,
        label: t(`principle_tab_${cat}`),
      })),
    [availableTabs, t],
  );

  const filtered = useMemo(
    () => principles.filter((p) => p.category === activeTab),
    [principles, activeTab],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateFade = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftFade(scrollLeft > 4);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 4);
    };

    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [tabs]);

  // FIX: Menggunakan manual container scroll untuk mencegah kegagalan viewport shifting di mobile
  const handleSelectTab = (
    value: PartnerCategory,
    buttonEl: HTMLButtonElement,
  ) => {
    setActiveTab(value);

    const container = scrollRef.current;
    if (!container) return;

    // Hitung posisi horizontal agar tab yang dipilih berada di tengah container
    const containerWidth = container.clientWidth;
    const buttonLeft = buttonEl.offsetLeft;
    const buttonWidth = buttonEl.clientWidth;

    const targetScrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Tab menu */}
      <div className="relative mb-8 border-b border-slate-200">
        <motion.div
          ref={scrollRef}
          layoutScroll
          role="tablist"
          aria-label={t("principle_tabs_label")}
          className="flex snap-x snap-proximity touch-pan-x gap-1 overflow-x-auto overscroll-x-contain px-1 scroll-smooth [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scrollbar-none sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={(e) => handleSelectTab(tab.value, e.currentTarget)}
                className={`relative shrink-0 snap-start select-none whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium outline-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-reddmas-red/40 focus-visible:ring-offset-2 sm:px-5 sm:py-3.5 ${
                  isActive
                    ? "bg-red-50/60 text-reddmas-red font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-reddmas-red active:bg-slate-100"
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="principle-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-reddmas-red"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Fade Efek Kiri & Kanan (Menggunakan utilitas standar Tailwind v3/v4 agar kompatibel) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white to-transparent transition-opacity duration-200 sm:hidden ${
            showLeftFade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent transition-opacity duration-200 sm:hidden ${
            showRightFade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Grid logo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6"
        >
          {filtered.map((principle) => {
            const Card = (
              <div className="group relative flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition hover:-translate-y-0.5 hover:border-reddmas-red/40 hover:shadow-md sm:h-30 sm:px-8">
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-reddmas-red/15 transition group-hover:opacity-100" />
                <Image
                  src={principle.logo}
                  alt={principle.name}
                  width={220}
                  height={64}
                  className="h-10 w-auto max-w-full object-contain opacity-90 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 sm:h-12"
                />
              </div>
            );

            return principle.href ? (
              <a
                key={principle.name}
                href={principle.href}
                aria-label={principle.name}
                className="outline-none focus-visible:ring-2 focus-visible:ring-reddmas-red/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {Card}
              </a>
            ) : (
              <div key={principle.name}>{Card}</div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-400">
          {t("principle_empty")}
        </p>
      )}
    </div>
  );
}
