"use client";

import { useState, useEffect } from "react";

interface AnchorItem {
  label: string;
  href: string;
}

interface SidebarAnchorProps {
  title: string;
  items: AnchorItem[];
  navbarHeight?: number;
}

export default function SidebarAnchor({
  title,
  items,
  navbarHeight = 80,
}: SidebarAnchorProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Detect section yang sedang aktif saat scroll
  useEffect(() => {
    const sectionIds = items.map((item) => item.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // Offset agar aktif sedikit sebelum elemen menyentuh atas viewport
        rootMargin: `-${navbarHeight + 16}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, navbarHeight]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const top =
      el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <aside
      className="w-full md:sticky md:self-start md:w-56 md:shrink-0"
      style={{ top: `${navbarHeight + 16}px` }}
    >
      {/* Title */}
      <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-3 px-1">
        {title}
      </p>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-1" />

      {/* Nav items */}
      <nav>
        <ul className="flex flex-col">
          {items.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeId === id;

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`flex items-center gap-2 py-2.5 px-1 text-base border-b border-gray-100 transition-colors duration-150 group ${
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-600 hover:text-red-600"
                  }`}
                >
                  {/* Chevron */}
                  <svg
                    className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-400 group-hover:text-red-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
