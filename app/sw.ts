/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type {
  PrecacheEntry,
  RuntimeCaching,
  SerwistGlobalConfig,
} from "serwist";
import {
  Serwist,
  StaleWhileRevalidate,
  NetworkFirst,
  ExpirationPlugin,
} from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// Pisahkan cache RSC payload dari cache halaman HTML penuh,
// biar gak ketuker pas full navigation (buka URL langsung / new tab).
const customCaching: RuntimeCaching[] = [
  // RSC prefetch (saat hover link)
  {
    matcher: ({ request, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      request.headers.get("Next-Router-Prefetch") === "1" &&
      sameOrigin,
    handler: new StaleWhileRevalidate({
      cacheName: "pages-rsc-prefetch",
      plugins: [
        new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 }),
      ],
    }),
  },
  // RSC navigation (klik link, client-side routing)
  {
    matcher: ({ request, sameOrigin }) =>
      request.headers.get("RSC") === "1" && sameOrigin,
    handler: new NetworkFirst({
      cacheName: "pages-rsc",
      plugins: [
        new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 }),
      ],
    }),
  },
  // Full HTML document (hard navigation / buka URL langsung)
  {
    matcher: ({ request, sameOrigin }) =>
      request.headers.get("RSC") !== "1" &&
      request.destination === "document" &&
      sameOrigin,
    handler: new NetworkFirst({
      cacheName: "pages-html",
      plugins: [
        new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 }),
      ],
    }),
  },
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [...customCaching, ...defaultCache],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
