"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const MIN_DISPLAY_MS = 350;
const MAX_DISPLAY_MS = 800;
const FADE_MS = 250;

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    if (sessionStorage.getItem("loader_shown")) {
      loader.style.display = "none";
      return;
    }
    sessionStorage.setItem("loader_shown", "true");

    loader.style.display = "flex";
    const start = performance.now();
    let done = false;

    const hide = () => {
      if (done) return;
      done = true;

      const elapsed = performance.now() - start;
      const wait = Math.max(MIN_DISPLAY_MS - elapsed, 0);

      window.setTimeout(() => {
        loader.style.opacity = "0";
        window.setTimeout(() => {
          loader.style.display = "none";
        }, FADE_MS);
      }, wait);
    };

    // Hard cap: jaminan loader tidak pernah menggantung lebih dari MAX_DISPLAY_MS,
    // apapun yang terjadi dengan loading resource sebenarnya.
    const hardCap = window.setTimeout(hide, MAX_DISPLAY_MS);

    // Sinyal asli: halaman sudah selesai load (bukan angka random dari setInterval)
    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => {
      window.clearTimeout(hardCap);
      window.removeEventListener("load", hide);
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      id="mas-page-loader"
      aria-hidden="true"
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0f172a",
        alignItems: "center",
        justifyContent: "center",
        transition: `opacity ${FADE_MS}ms ease`,
        opacity: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Image
            src="/loading-screen.png"
            alt="MAS Logo"
            width={120}
            height={80}
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#d23439",
              letterSpacing: "-0.01em",
            }}
          >
            Reddmas Group
          </span>
        </div>

        {/* Progress bar sekarang dekoratif murni (CSS animation di GPU),
            bukan JS interval yang terus mengubah DOM tiap 100ms. */}
        <div
          style={{
            width: "200px",
            height: "3px",
            backgroundColor: "#e2e8f0",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div className="mas-loader-sweep" />
        </div>
      </div>

      <style jsx>{`
        .mas-loader-sweep {
          height: 100%;
          width: 15%;
          border-radius: 9999px;
          background-color: #b22222;
          animation: mas-sweep 0.6s ease-in-out infinite;
        }
        @keyframes mas-sweep {
          0% {
            margin-left: 0%;
            width: 15%;
          }
          50% {
            margin-left: 55%;
            width: 40%;
          }
          100% {
            margin-left: 0%;
            width: 15%;
          }
        }
      `}</style>
    </div>
  );
}
