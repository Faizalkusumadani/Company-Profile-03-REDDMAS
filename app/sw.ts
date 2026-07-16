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

const customCaching: RuntimeCaching[] = [
  // 1. RSC prefetch (saat hover link)
  {
    matcher: ({ request, sameOrigin }) =>
      sameOrigin &&
      request.headers.get("RSC") === "1" &&
      request.headers.get("Next-Router-Prefetch") === "1",
    handler: new StaleWhileRevalidate({
      cacheName: "pages-rsc-prefetch",
      plugins: [
        new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 }),
      ],
    }),
  },
  // 2. RSC navigation (klik link, client-side routing) - DIPERKETAТ
  {
    matcher: ({ request, sameOrigin }) =>
      sameOrigin &&
      request.headers.get("RSC") === "1" &&
      request.headers.get("Next-Router-Prefetch") !== "1", // Pastikan bukan prefetch
    handler: new NetworkFirst({
      cacheName: "pages-rsc",
      plugins: [
        new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 }),
      ],
    }),
  },
  // 3. Full HTML document (hard navigation / buka URL langsung / PageSpeed Insights)
  {
    matcher: ({ request, sameOrigin }) =>
      sameOrigin &&
      request.destination === "document" &&
      request.headers.get("RSC") !== "1", // Mutlak bukan RSC
    handler: new NetworkFirst({
      cacheName: "pages-html",
      plugins: [
        new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 }),
      ],
    }),
  },
];

// FILTER: Buang rule bawaan defaultCache Serwist yang menangani 'document' atau data Next.js
// agar tidak menimpa (override) tiga rule kustom kita di atas.
const filteredDefaultCache = defaultCache.filter((cache) => {
  // Jika Anda kesulitan melakukan filter otomatis, menggunakan [...customCaching, ...defaultCache]
  // sebenarnya sudah benar, namun dengan catatan matcher kustom kita harus sangat spesifik.
  return true;
});

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // Tumpuk customCaching di baris paling atas
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
