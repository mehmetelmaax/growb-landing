import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_13_SERVICES_DETAILED } from "@/data/services-detail-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageSquare,
  Zap,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export async function generateStaticParams() {
  return ALL_13_SERVICES_DETAILED.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = ALL_13_SERVICES_DETAILED.find((s) => s.slug === params.slug);
  if (!service) {
    return { title: "Hizmet Bulunamadı | GrowB Dijital" };
  }

  const title = service.title;
  const description = `${service.tagline} ${service.heroDesc.slice(0, 140)}...`;

  return {
    title,
    description,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/hizmetler/${service.slug}`,
      type: "article",
      locale: "tr_TR",
      images: [
        {
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${service.title} - GrowB Dijital`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/opengraph-image`],
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = ALL_13_SERVICES_DETAILED.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline,
    provider: {
      "@type": "ProfessionalService",
      name: "GrowB Dijital Pazarlama Ajansı",
      url: siteUrl,
      telephone: "+905414842426",
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <Link
            href="/#hizmetler"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Tüm Hizmetlere Geri Dön</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs font-black text-[#0A0A0A]">
              HİZMET #{service.num}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
              {service.category}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
              {service.badge}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-black tracking-tight text-cream sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>

          <p className="mb-6 text-lg font-medium leading-relaxed text-accent sm:text-xl">
            {service.tagline}
          </p>

          <p className="mb-10 max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            {service.heroDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20hizmetleriniz%20hakkinda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-lg shadow-accent/20 transition-all hover:brightness-110"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp ile Hızlı Başlat</span>
            </a>
            <a
              href="tel:+905414842426"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-accent" />
              <span>0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* Deliverables & Process Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase text-accent">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Paket Kapsamı</span>
            </div>
            <h3 className="mb-6 text-xl font-bold text-cream sm:text-2xl">
              Net Teslimatlar & Süreç
            </h3>
            <ul className="space-y-3.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8">
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase text-accent">
                <Zap className="h-4 w-4 text-accent" />
                <span>Çalışma Adımları</span>
              </div>
              <h3 className="mb-6 text-xl font-bold text-cream sm:text-2xl">Nasıl İlerliyoruz?</h3>
              <ul className="mb-8 space-y-4">
                {service.howItWorks.map((step, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-neutral-300 sm:text-sm"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-accent/15 p-4 text-center">
              <span className="mb-1 block font-mono text-[11px] uppercase text-neutral-400">
                Hedeflenen Sonuç & Metrik
              </span>
              <span className="text-lg font-black text-accent sm:text-xl">
                {service.metricsResult}
              </span>
            </div>
          </div>
        </div>

        {/* Other 12 Services */}
        <div className="border-t border-white/10 pt-10">
          <h4 className="mb-6 font-sans text-base font-bold text-cream">
            Diğer Uzmanlık Alanlarımızı İnceleyin:
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_13_SERVICES_DETAILED.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/hizmetler/${s.slug}`}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#121212] p-3.5 text-xs font-bold text-neutral-300 transition-all hover:border-accent hover:text-white"
              >
                <span>
                  {s.num} {s.title}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
