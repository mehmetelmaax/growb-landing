import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama & Yazılım",
    short_name: "GrowB",
    description: "KOBİ'ler için telefon çaldıran ve ciro akıtan kapalı devre büyüme sistemleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#FFC300",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
