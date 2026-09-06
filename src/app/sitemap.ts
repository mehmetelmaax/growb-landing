import { MetadataRoute } from "next";
import { ALL_13_SERVICES_DETAILED } from "@/data/services-detail-data";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_CONFIG.siteUrl;

  // İçerik ve sürüm bazlı sabit tarihler (Google lastmod sinyalinin güvenilir kalması için)
  const coreLastMod = new Date("2026-09-06T12:00:00.000Z");
  const servicesLastMod = new Date("2026-09-01T00:00:00.000Z");
  const localLastMod = new Date("2026-09-01T00:00:00.000Z");
  const legalLastMod = new Date("2026-03-01T00:00:00.000Z");

  // 1. Temel Sayfalar (Son büyük optimizasyon ve kampanya tarihi)
  const coreRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: coreLastMod,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/fiyatlar`,
      lastModified: coreLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hizmetler`,
      lastModified: coreLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // 2. İl Bazlı Yerel SEO Sayfaları
  const localRoutes = [
    {
      url: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`,
      lastModified: localLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/nevsehir-dijital-pazarlama-ajansi`,
      lastModified: localLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/kapadokya-web-tasarim`,
      lastModified: localLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/konya-dijital-pazarlama`,
      lastModified: localLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/aksaray-dijital-pazarlama`,
      lastModified: localLastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // 3. 13 Hizmet Detay Rotaları
  const serviceRoutes = ALL_13_SERVICES_DETAILED.map((service) => ({
    url: `${siteUrl}/hizmetler/${service.slug}`,
    lastModified: servicesLastMod,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // 4. Yasal Sayfalar (Seyrek güncellenen statik metinler)
  const legalRoutes = [
    {
      url: `${siteUrl}/kvkk-aydinlatma-metni`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/gizlilik-politikasi`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cerez-politikasi`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/mesafeli-hizmet-sozlesmesi`,
      lastModified: legalLastMod,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return [...coreRoutes, ...localRoutes, ...serviceRoutes, ...legalRoutes];
}
