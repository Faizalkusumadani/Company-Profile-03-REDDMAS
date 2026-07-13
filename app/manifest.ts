import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reddmas Group",
    short_name: "Reddmas",
    description:
      "Reddmas Group membangun ekosistem bisnis terintegrasi: Trading, HVAC Installation, IT Solutions, Creative IP, dan F&B. Inovasi & kolaborasi untuk pertumbuhan berkelanjutan.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
