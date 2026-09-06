import type { ServiceDetail } from "@/data/services-detail-data";
import { SITE_CONFIG } from "@/lib/site-config";

export function getServiceDetailSchemas(service: ServiceDetail, siteUrl: string) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline,
    provider: {
      "@type": "ProfessionalService",
      name: "GrowB Dijital Pazarlama Ajansı",
      url: siteUrl,
      telephone: SITE_CONFIG.phoneInternational,
    },
    areaServed: ["Nevşehir", "Kırşehir", "Konya", "Aksaray", "Türkiye"].map((name) => ({
      "@type": name === "Türkiye" ? "Country" : "AdministrativeArea",
      name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Kapsamı ve Çıktıları`,
      itemListElement: service.deliverables.map((item, index) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
        position: index + 1,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Hizmetlerimiz", item: `${siteUrl}/hizmetler` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteUrl}/hizmetler/${service.slug}`,
      },
    ],
  };

  return { serviceSchema, breadcrumbSchema };
}
