"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import LocaleToggle from "@/components/Switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

// ─── Types & Data ──────────────────────────────────────────────────────────────
interface NavItem {
  href?: string;
  labelKey: string;
  children?: { href: string; labelKey: string }[];
}

const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  {
    labelKey: "nav.about",
    children: [
      { href: "/tentang-kami/profil", labelKey: "nav.profil" },
      { href: "/tentang-kami/visi-misi", labelKey: "nav.visi-misi" },
      { href: "/tentang-kami/nilai-nilai", labelKey: "nav.nilai-nilai" },
      { href: "/tentang-kami/manajemen", labelKey: "nav.manajemen" },
    ],
  },
  {
    labelKey: "nav.business",
    children: [
      { href: "/bisnis/trading", labelKey: "nav.business_construction" },
      { href: "/bisnis/hvac", labelKey: "nav.business_services" },
      { href: "/bisnis/creative", labelKey: "nav.business_design" },
      { href: "/bisnis/information", labelKey: "nav.business_information" },
      { href: "/bisnis/food", labelKey: "nav.business_food" },
    ],
  },
  {
    labelKey: "nav.news",
    children: [
      { href: "/ruang-informasi/berita", labelKey: "nav.news_company" },
      { href: "/ruang-informasi/kegiatan", labelKey: "nav.news_activity" },
    ],
  },
  { href: "/karir", labelKey: "nav.career" },
  { href: "/kontak", labelKey: "nav.contact" },
];

const SCROLL_THRESHOLD = 70;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function stripLocale(path: string) {
  return path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}

function isPathActive(pathname: string, href: string) {
  const clean = stripLocale(pathname);
  if (href === "/") return clean === "/";
  return clean === href || clean.startsWith(`${href}/`);
}

function getActiveState(pathname: string, item: NavItem) {
  const childActive =
    item.children?.some((c) => isPathActive(pathname, c.href)) ?? false;
  const selfActive = item.href ? isPathActive(pathname, item.href) : false;
  return selfActive || childActive;
}

// ─── Shared: Logo ──────────────────────────────────────────────────────────────
function NavLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="shrink-0"
      aria-label="Reddmasgroup"
    >
      <Image
        src="/Logo-Reddmas-01.png"
        alt="Reddmasgroup"
        width={140}
        height={40}
        className="h-9 w-auto object-contain"
        priority
      />
    </Link>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DESKTOP
// ══════════════════════════════════════════════════════════════════════════════

function DesktopDropdown({
  items,
  pathname,
}: {
  items: { href: string; labelKey: string }[];
  pathname: string;
}) {
  const t = useTranslations();
  return (
    <motion.ul
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 top-full z-50 mt-4 w-86 overflow-hidden rounded-2xl border border-white/10 bg-reddmas-dark p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      {items.map((item) => {
        const active = isPathActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-reddmas-red"
                  : "text-white/65 hover:bg-white/8 hover:text-reddmas-red"
              }`}
            >
              {t(item.labelKey)}
              {active && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-reddmas-red" />
              )}
            </Link>
          </li>
        );
      })}
    </motion.ul>
  );
}

function DesktopNavUnderline({ show }: { show: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ scaleX: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ originX: 0.5 }}
      className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-reddmas-red"
    />
  );
}

function DesktopNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function handleMouseEnter() {
    clearCloseTimer();
    setOpen(true);
  }

  function handleMouseLeave() {
    // Delay kecil supaya cursor yang bergerak dari trigger ke panel dropdown
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  // Tutup dropdown saat klik di luar area item ini, atau saat tekan Escape.
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Bersihkan timer kalau komponen unmount saat timer masih berjalan.
  useEffect(() => clearCloseTimer, []);

  const active = getActiveState(pathname, item);

  if (item.children) {
    return (
      <li
        ref={ref}
        className="group relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`flex items-center gap-1.5 py-2 text-sm font-normal transition-colors sm:text-base ${
            active
              ? "text-reddmas-red"
              : "text-white/70 group-hover:text-reddmas-red"
          }`}
        >
          {t(item.labelKey)}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>
        {/* underline saat hover — murni CSS, tidak butuh state React */}
        <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 origin-center scale-x-0 rounded-full bg-reddmas-red opacity-0 transition-all duration-200 group-hover:scale-x-100 group-hover:opacity-100" />
        {active && <DesktopNavUnderline show />}
        <AnimatePresence>
          {open && (
            <DesktopDropdown items={item.children} pathname={pathname} />
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={item.href!}
        className={`inline-block py-2 text-sm font-normal transition-colors sm:text-base ${
          active
            ? "text-reddmas-red"
            : "text-white/70 group-hover:text-reddmas-red"
        }`}
      >
        {t(item.labelKey)}
      </Link>
      <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 origin-center scale-x-0 rounded-full bg-reddmas-red opacity-0 transition-all duration-200 group-hover:scale-x-100 group-hover:opacity-100" />
      {active && <DesktopNavUnderline show />}
    </li>
  );
}

function DesktopNavbar({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) {
  const headerRef = useRef<HTMLElement>(null);

  // ─── Efek scroll: classList.toggle langsung ke DOM (tanpa setState) ─────────
  useEffect(() => {
    const navbar = headerRef.current;
    if (!navbar) return;

    function updateNavbarOnScroll(): void {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      navbar!.classList.toggle("bg-[#0f172b]", isScrolled);
      navbar!.classList.toggle("border-white/10", isScrolled);
      navbar!.classList.toggle("shadow-lg", isScrolled);
      navbar!.classList.toggle("shadow-black/30", isScrolled);
      navbar!.classList.toggle("backdrop-blur-md", isScrolled);
      navbar!.classList.toggle("bg-transparent", !isScrolled);
      navbar!.classList.toggle("border-transparent", !isScrolled);
    }

    updateNavbarOnScroll();
    window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbarOnScroll);
  }, []);

  return (
    <header
      id="navbar"
      ref={headerRef}
      className="fixed top-0 z-50 hidden w-full border-b border-transparent bg-transparent transition-all duration-500 lg:block"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <NavLogo />
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.labelKey}
                item={item}
                pathname={pathname}
              />
            ))}
          </ul>
          <span className="h-5 w-px bg-white/15" aria-hidden="true" />
          <LocaleToggle currentLocale={locale} />
        </div>
      </nav>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE
// ══════════════════════════════════════════════════════════════════════════════

function MobileOverlay({
  open,
  onClose,
  pathname,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  locale: Locale;
}) {
  const t = useTranslations();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  // Kunci scroll body selama overlay terbuka, kembalikan otomatis saat ditutup.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function toggleExpand(key: string) {
    setExpandedKey((prev) => (prev === key ? null : key));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {open && (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 right-0 z-60 flex w-full flex-col bg-reddmas-dark sm:max-w-sm sm:border-l sm:border-white/10"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-5">
            <NavLogo onClick={onClose} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/8 hover:text-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav list */}
          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = getActiveState(pathname, item);
                const isExpanded = expandedKey === item.labelKey;

                return (
                  <li key={item.labelKey}>
                    {item.children ? (
                      <>
                        {/* Trigger Dropmenu */}
                        <button
                          onClick={() => toggleExpand(item.labelKey)}
                          aria-expanded={isExpanded}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-normal transition-colors ${
                            active
                              ? "bg-white/8 text-reddmas-red"
                              : "text-white/75 hover:bg-white/8 hover:text-reddmas-red"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-reddmas-red" />
                            )}
                            {t(item.labelKey)}
                          </span>
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 flex flex-col gap-0.5 overflow-hidden border-l border-white/10 pl-3"
                            >
                              {item.children.map((child) => {
                                const childIsActive = isPathActive(
                                  pathname,
                                  child.href,
                                );
                                return (
                                  // dropmenu
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                        childIsActive
                                          ? "text-reddmas-red bg-white/8"
                                          : "text-white/55 hover:bg-white/8 hover:text-reddmas-red"
                                      }`}
                                    >
                                      {t(child.labelKey)}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Link
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className={`flex items-center gap-2 rounded-lg px-3 py-3.5 text-base font-normal transition-colors ${
                          active
                            ? "bg-white/8 text-reddmas-red"
                            : "text-white/75 hover:bg-white/8 hover:text-reddmas-red"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-reddmas-red" />
                        )}
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Locale toggle */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-white/40">
                {locale === "id" ? "Bahasa" : "Language"}
              </span>
              <LocaleToggle currentLocale={locale} />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavbar({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // ─── Efek scroll: classList.toggle langsung ke DOM, tanpa setState ──────────
  // (1) bg solid saat lewat threshold, (2) sembunyikan saat scroll ke bawah,
  // tampil lagi saat scroll ke atas — semua lewat class, bukan React state.
  useEffect(() => {
    const navbar = headerRef.current;
    if (!navbar) return;

    function updateNavbarOnScroll(): void {
      const currentY = window.scrollY;
      const isScrolled = currentY > SCROLL_THRESHOLD;

      navbar!.classList.toggle("bg-[#0f172b]", isScrolled);
      navbar!.classList.toggle("shadow-md", isScrolled);
      navbar!.classList.toggle("shadow-black/20", isScrolled);
      navbar!.classList.toggle("backdrop-blur-md", isScrolled);
      navbar!.classList.toggle("bg-transparent", !isScrolled);

      const shouldHide =
        currentY > SCROLL_THRESHOLD && currentY > lastScrollY.current;
      navbar!.classList.toggle("-translate-y-full", shouldHide);
      navbar!.classList.toggle("translate-y-0", !shouldHide);

      lastScrollY.current = currentY;
    }

    updateNavbarOnScroll();
    window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbarOnScroll);
  }, []);

  return (
    <>
      <header
        id="navbar-mobile"
        ref={headerRef}
        className="fixed top-0 z-50 w-full translate-y-0 bg-transparent transition-all duration-300 lg:hidden"
      >
        <div className="flex items-center justify-between px-5 py-5">
          <NavLogo />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/8"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-3.5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </header>

      {/* Fullscreen overlay */}
      <MobileOverlay
        open={open}
        onClose={() => setOpen(false)}
        pathname={pathname}
        locale={locale}
      />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <>
      <DesktopNavbar pathname={pathname} locale={locale} />
      <MobileNavbar pathname={pathname} locale={locale} />
    </>
  );
}
