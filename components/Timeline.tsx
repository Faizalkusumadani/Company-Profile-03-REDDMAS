"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { TimelineItem } from "@/data/timeline";

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const t = useTranslations("timeline.items");
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal: fade + slide in saat card masuk viewport
  useEffect(() => {
    const cards =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          observer.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-8">
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0 border border-gray-300 top-18 bottom-18" />
      <div className="block md:hidden absolute left-4 -translate-x-1/2 w-0 border-l-2 border-dashed border-gray-300 top-8 bottom-8" />

      <div className="flex flex-col gap-8">
        {items.map((item, index) => {
          const isRight = index % 2 === 1;
          const title = t(`${item.id}.title`);
          const description = t(`${item.id}.description`);

          const initialTranslate = isRight
            ? "translateX(24px)"
            : "translateX(-24px)";

          return (
            <div key={item.id} className="relative flex items-center w-full">
              {/* ── Desktop ── */}
              <div
                className={`hidden md:flex items-center w-full ${
                  isRight ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="w-[calc(50%-2.5rem)]">
                  <div
                    data-reveal
                    style={{
                      opacity: 0,
                      transform: initialTranslate,
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-shadow duration-300"
                  >
                    <div className="h-0.75 bg-red-600" />
                    <div className="p-5">
                      <p className="font-semibold text-gray-900 text-sm md:text-base leading-snug mb-2">
                        {title}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-6 shrink-0 border-t-2 border-dashed border-gray-300" />
                <div className="flex-1" />
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center w-4 h-4 rounded-full border-2 border-red-600 bg-white">
                <div className="w-2 h-2 rounded-full bg-red-600" />
              </div>

              <span
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-sm font-bold text-red-600 tracking-wide whitespace-nowrap ${
                  isRight
                    ? "right-[calc(50%+0.75rem)]"
                    : "left-[calc(50%+0.75rem)]"
                }`}
              >
                {item.year}
              </span>

              {/* ── Mobile ── */}
              <div className="flex md:hidden items-start gap-3 w-full">
                <div className="relative shrink-0 w-8 pt-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 rounded-full border-2 border-red-600 bg-white flex items-center justify-center relative z-10">
                      <div className="w-2 h-2 rounded-full bg-red-600" />
                    </div>
                    <span className="text-[10px] font-bold text-red-600 tracking-wide">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="h-0.75 bg-red-600" />
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm leading-snug mb-1.5">
                      {title}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
