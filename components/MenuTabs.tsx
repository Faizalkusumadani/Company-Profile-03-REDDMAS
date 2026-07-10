"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import type { Partner, PartnerCategory } from "@/data/principle";

interface PrincipleTabsProps {
  principles: Partner[];
}

// Urutan tab tetap, terlepas dari urutan data — supaya konsisten setiap render.
// "mep" ditaruh paling depan karena jadi default tab yang aktif.
const TAB_ORDER: PartnerCategory[] = [
  "mep",
  "building_materials",
  "ev_charger",
  "sanitary",
];

export default function PrincipleTabs({ principles }: PrincipleTabsProps) {
  const t = useTranslations();

  const availableTabs = useMemo(
    () => TAB_ORDER.filter((cat) => principles.some((p) => p.category === cat)),
    [principles],
  );

  // Default ke "mep" kalau datanya ada; kalau tidak, fallback ke tab pertama yang tersedia.
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

  return (
    <div>
      {/* Tab menu — scrollable horizontal di mobile, wrap di layar lebih lebar */}
      <div className="relative mb-8">
        <div
          role="tablist"
          aria-label={t("principle_tabs_label")}
          className="flex gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] scrollbar-none sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.value)}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-reddmas-red/40 focus-visible:ring-offset-2 ${
                  isActive
                    ? "text-white"
                    : "border border-slate-200 text-slate-600 hover:border-reddmas-red/40 hover:text-reddmas-red"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="principle-tab-pill"
                    className="absolute inset-0 rounded-full bg-reddmas-red"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Petunjuk visual bahwa tab bisa di-scroll, hanya tampil di mobile */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-white to-transparent sm:hidden" />
      </div>

      {/* Grid logo — fade singkat setiap kali tab berganti */}
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
