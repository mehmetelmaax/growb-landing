import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export const metadata: Metadata = {
  title: "Nevşehir Dijital Pazarlama & Web Tasarım Ajansı",
  description:
    "Nevşehir merkezli kurumsal dijital pazarlama ajansı GrowB. Nevşehir ve Kapadokya işletmeleri için satış odaklı web yazılımı, Google Ads ve harita SEO yönetimi.",
  alternates: {
    canonical: "/nevsehir-dijital-pazarlama-ajansi",
  },
  openGraph: {
    title: "Nevşehir Dijital Pazarlama & Web Tasarım Ajansı",
    description:
      "Nevşehir ve Kapadokya işletmeleri için satış odaklı web yazılımı, Google Ads ve harita SEO.",
    url: `${siteUrl}/nevsehir-dijital-pazarlama-ajansi`,
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Nevşehir Dijital Pazarlama - GrowB Dijital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nevşehir Dijital Pazarlama & Web Tasarım Ajansı",
    description: "Nevşehir işletmeleri için telefon çaldıran dijital pazarlama ve yerel SEO.",
    images: [`${siteUrl}/opengraph-image`],
  },
};

export default function NevsehirLandingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nevşehir Dijital Pazarlama",
        item: `${siteUrl}/nevsehir-dijital-pazarlama-ajansi`,
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] font-sans text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 lg:px-12"
      >
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 transition-colors hover:text-[#FFC300]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        <section className="mx-auto mb-16 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-4 py-2 font-mono text-xs font-bold text-[#FFC300]">
            <MapPin className="h-4 w-4" />
            <span>NEVŞEHİR GENEL MERKEZ AVANTAJI</span>
          </div>

          <h1 className="mb-6 text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nevşehir&apos;de Dijital İşlerinizi Üstlenen{" "}
            <span className="text-[#FFC300]">Yerel Büyüme Ortağınız.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
            Nevşehir merkezli kurumsal yapımızla uzaktan değil, birebir masaya oturarak işletmenizin
            cirosunu artıran web, reklam ve satış otomasyonları kuruyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-lg transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
            >
              Nevşehir Ofisimizden Teklif Alın
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
