import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CampaignPricing } from "@/components/campaign-pricing";
import { PricingTabsClient } from "@/components/pricing-tabs-client";
import { ESTABLISHMENT_PACKAGES, MONTHLY_GROWTH_PACKAGES } from "@/data/pricing-catalog-data";
import { Sparkles, ShieldCheck, ArrowLeft, Phone, Percent } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export const metadata: Metadata = {
  title: "Fiyatlandırma & Paket Tarifesi | GrowB Dijital",
  description:
    "GrowB Dijital şeffaf ve net fiyatlandırma tarifesi. Anahtar teslim kuruluş kovanları, aylık büyüme yönetimi sözleşmeleri ve modüler tekil hizmet paketleri.",
  alternates: {
    canonical: "/fiyatlar",
  },
  openGraph: {
    title: "Fiyatlandırma & Paket Tarifesi | GrowB Dijital",
    description: "Ölçülebilir büyüme, kuruşuna kadar net fiyatlar. Gizli masraf yok.",
    url: `${siteUrl}/fiyatlar`,
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiyatlandırma & Paket Tarifesi | GrowB Dijital",
    description: "Şeffaf paket tarifeleri ve sözleşmeli fiyat garantisi.",
  },
};

export default function PricingPage() {
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "GrowB Dijital Pazarlama ve Büyüme Paketleri",
    url: `${siteUrl}/fiyatlar`,
    provider: {
      "@type": "ProfessionalService",
      name: "GrowB Dijital Pazarlama Ajansı",
      telephone: "+905414842426",
      url: siteUrl,
    },
    itemListElement: [
      ...ESTABLISHMENT_PACKAGES.map((pkg, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        name: pkg.name,
        description: pkg.description,
        price: pkg.rawPrice,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/fiyatlar`,
      })),
      ...MONTHLY_GROWTH_PACKAGES.map((pkg, idx) => ({
        "@type": "Offer",
        position: ESTABLISHMENT_PACKAGES.length + idx + 1,
        name: pkg.name,
        description: pkg.description,
        price: pkg.rawPrice,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/fiyatlar`,
      })),
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] font-sans text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-12"
      >
        {/* Arka Plan Deseni */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#FFC300 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Geri Dönüş Linki */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 transition-colors hover:text-[#FFC300]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Hero Başlık Alanı */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#FFC300]/30 bg-white/5 px-4 py-2 font-mono text-xs font-bold text-[#FFC300] shadow-[0_0_25px_rgba(255,195,0,0.15)]">
            <Sparkles className="h-4 w-4 text-[#FFC300]" />
            <span>ŞEFFAF FİYATLANDIRMA // GİZLİ MASRAF YOK</span>
          </div>

          <h1 className="mb-6 text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ölçülebilir Büyüme, Kuruşuna Kadar{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/50 decoration-4">
              Net Fiyatlar.
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
            Piyasadaki ucu açık tekliflerin ve sürpriz faturaların aksine; ister her şey dahil
            anahtar teslim kovan paketleri, ister aylık büyüme yönetimi, isterseniz de 12 farklı
            uzmanlığımızdan modüler tekil hizmet alımı.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-neutral-300 sm:gap-6">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
              <ShieldCheck className="h-4 w-4 text-[#FFC300]" />
              <span>Sözleşmeli Fiyat Garantisi</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
              <Percent className="h-4 w-4 text-[#FFC300]" />
              <span>%50 Başlangıç - %50 Teslimde Ödeme</span>
            </div>
            <a
              href="tel:05414842426"
              className="flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-3.5 py-2 font-bold text-[#FFC300] transition-all hover:bg-[#FFC300] hover:text-black"
            >
              <Phone className="h-4 w-4" />
              <span>Danışma Hattı: 0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* 3 ÖZEL KAMPANYA ALANI (Decoy / Anchoring) */}
        <div className="mb-20">
          <CampaignPricing />
        </div>

        {/* KATALOG AYIRICI BAŞLIK */}
        <div className="mx-auto mb-10 max-w-3xl border-t border-white/10 pt-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-neutral-300">
            <span>RESMİ FİYAT LİSTESİ</span>
          </div>
          <h2 className="mb-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
            Tüm Standart Paketler & 12 Uzmanlık Tarifesi
          </h2>
          <p className="text-xs text-neutral-400 sm:text-sm">
            Kuruluş paketleri, aylık büyüme sözleşmeleri ve tekil uzmanlık hizmetlerinin tüm
            detayları.
          </p>
        </div>

        {/* İNTERAKTİF CLIENT TAB'LERİ */}
        <PricingTabsClient />

        {/* ALT ÇAĞRI KARTI */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-[#FFC300]/30 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-96 -translate-x-1/2 rounded-full bg-[#FFC300]/15 blur-3xl" />

          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            ÖZEL PROJE VE FİYATLANDIRMA
          </span>
          <h2 className="mb-4 font-sans text-2xl font-black tracking-tight text-white sm:text-4xl">
            İşletmenize Özel Teklif Almak İster misiniz?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm text-neutral-400 sm:text-base">
            İhtiyaçlarınızı dinleyelim, bütçenize ve hedeflerinize en uygun paket kombinasyonunu 15
            dakika içinde hazırlayalım.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-[0_10px_25px_rgba(255,195,0,0.3)] transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
            >
              Hemen Teklif İste
            </Link>
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20fiyat%20listenizi%20inceledim,%20i%C5%9Fletmem%20i%C3%A7in%20teklif%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 sm:text-sm"
            >
              WhatsApp&apos;tan Danışın 💬
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
