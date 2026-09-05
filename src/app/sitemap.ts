import { MetadataRoute } from "next";
import { ALL_13_SERVICES_DETAILED } from "@/data/services-detail-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";
  const now = new Date();

  // 1. Temel Sayfalar
  const coreRoutes = [
    { url: `${siteUrl}`, lastModified: now, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${siteUrl}/fiyatlar`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteUrl}/hizmetler`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // 2. İl Bazlı Yerel SEO Sayfaları
  const localRoutes = [
    { url: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteUrl}/nevsehir-dijital-pazarlama-ajansi`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteUrl}/kapadokya-web-tasarim`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteUrl}/konya-dijital-pazarlama`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/aksaray-dijital-pazarlama`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // 3. 13 Hizmet Detay Rotaları
  const serviceRoutes = ALL_13_SERVICES_DETAILED.map((service) => ({
    url: `${siteUrl}/hizmetler/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // 4. Yasal Sayfalar
  const legalRoutes = [
    { url: `${siteUrl}/kvkk-aydinlatma-metni`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/gizlilik-politikasi`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/cerez-politikasi`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/mesafeli-hizmet-sozlesmesi`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [...coreRoutes, ...localRoutes, ...serviceRoutes, ...legalRoutes];
}
