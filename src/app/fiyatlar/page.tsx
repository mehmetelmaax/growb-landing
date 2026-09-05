import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CampaignPricing } from "@/components/campaign-pricing";
import { PricingTabsClient } from "@/components/pricing-tabs-client";
import { 
  ESTABLISHMENT_PACKAGES,
  MONTHLY_GROWTH_PACKAGES 
} from "@/data/pricing-catalog-data";
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Phone, 
  Percent 
} from "lucide-react";

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
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative">
        {/* Arka Plan Deseni */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#FFC300 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Geri Dönüş Linki */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-[#FFC300] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Hero Başlık Alanı */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] mb-6 shadow-[0_0_25px_rgba(255,195,0,0.15)]">
            <Sparkles className="w-4 h-4 text-[#FFC300]" />
            <span>ŞEFFAF FİYATLANDIRMA // GİZLİ MASRAF YOK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
            Ölçülebilir Büyüme, Kuruşuna Kadar{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/50 decoration-4">
              Net Fiyatlar.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Piyasadaki ucu açık tekliflerin ve sürpriz faturaların aksine; ister her şey dahil anahtar teslim kovan paketleri, ister aylık büyüme yönetimi, isterseniz de 12 farklı uzmanlığımızdan modüler tekil hizmet alımı.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#FFC300]" />
              <span>Sözleşmeli Fiyat Garantisi</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
              <Percent className="w-4 h-4 text-[#FFC300]" />
              <span>%50 Başlangıç - %50 Teslimde Ödeme</span>
            </div>
            <a 
              href="tel:05414842426" 
              className="flex items-center gap-2 bg-[#FFC300]/10 hover:bg-[#FFC300] text-[#FFC300] hover:text-black px-3.5 py-2 rounded-full border border-[#FFC300]/30 transition-all font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Danışma Hattı: 0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* 3 ÖZEL KAMPANYA ALANI (Decoy / Anchoring) */}
        <div className="mb-20">
          <CampaignPricing />
        </div>

        {/* KATALOG AYIRICI BAŞLIK */}
        <div className="text-center max-w-3xl mx-auto mb-10 pt-12 border-t border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-neutral-300 uppercase mb-3">
            <span>RESMİ FİYAT LİSTESİ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Tüm Standart Paketler & 12 Uzmanlık Tarifesi
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Kuruluş paketleri, aylık büyüme sözleşmeleri ve tekil uzmanlık hizmetlerinin tüm detayları.
          </p>
        </div>

        {/* İNTERAKTİF CLIENT TAB'LERİ */}
        <PricingTabsClient />

        {/* ALT ÇAĞRI KARTI */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-[#FFC300]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#FFC300]/15 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono font-bold text-[#FFC300] uppercase tracking-wider block mb-2">
            ÖZEL PROJE VE FİYATLANDIRMA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 font-sans">
            İşletmenize Özel Teklif Almak İster misiniz?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mb-8">
            İhtiyaçlarınızı dinleyelim, bütçenize ve hedeflerinize en uygun paket kombinasyonunu 15 dakika içinde hazırlayalım.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(255,195,0,0.3)] hover:scale-105"
            >
              Hemen Teklif İste
            </Link>
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20fiyat%20listenizi%20inceledim,%20i%C5%9Fletmem%20i%C3%A7in%20teklif%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all border border-white/20"
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
