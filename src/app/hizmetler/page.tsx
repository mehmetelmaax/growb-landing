import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Phone, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

const HoneycombHive = dynamic(
  () => import("@/components/honeycomb-hive").then((mod) => mod.HoneycombHive),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer), {
  ssr: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export const metadata: Metadata = {
  title: "Tüm Hizmetlerimiz (13 Uzmanlık Alanı) | GrowB Dijital Büyüme Kovanı",
  description:
    "Web yazılımından Google & Meta satış reklamlarına, harita SEO liderliğinden video prodüksiyona ve WhatsApp CRM otomasyonuna kadar GrowB Dijital'in 13 uzmanlık alanını keşfedin.",
  alternates: {
    canonical: "/hizmetler",
  },
  openGraph: {
    title: "Tüm Hizmetlerimiz (13 Uzmanlık Alanı) | GrowB Dijital Büyüme Kovanı",
    description: "KOBİ'ler için telefon çaldıran ve ciro akıtan 13 uzmanlık alanı.",
    url: `${siteUrl}/hizmetler`,
    type: "website",
    locale: "tr_TR",
  },
};

export default function ServicesIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A]">
      {/* ========================================================= */}
      {/* 1. KULLANICI TALEBİ: ARKA PLANA ÖZEL GÖRSEL & KOVAN ATMOSFERİ */}
      {/* ========================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Yüksek Çözünürlüklü Altın Petek & Ağ Arka Plan Görseli (Next/Image WebP/AVIF) */}
        <div className="absolute inset-0 scale-105 opacity-40 mix-blend-screen">
          <Image
            src="/services-hive-bg.webp"
            alt="GrowB Dijital Kovan ve Petek Arka Planı"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="pointer-events-none object-cover object-center"
          />
        </div>

        {/* Çok Katmanlı Kademeli Siyah & Altın Degrade Karartma */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,195,0,0.15),transparent_80%)]" />

        {/* Dinamik Ambient Işık Noktaları */}
        <div className="animate-pulse-subtle pointer-events-none absolute left-4 top-1/4 h-96 w-96 rounded-full bg-[#FFC300]/10 blur-[130px]" />
        <div className="animate-float-slow pointer-events-none absolute bottom-1/3 right-4 h-[480px] w-[480px] rounded-full bg-[#FFA000]/10 blur-[150px]" />
      </div>

      {/* Üst Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-12"
      >
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
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#FFC300]/30 bg-white/5 px-4 py-2 font-mono text-xs font-bold text-[#FFC300] shadow-[0_0_25px_rgba(255,195,0,0.18)]">
            <span className="text-base">🐝</span>
            <span>GROWB BÜYÜME KOVANI // 6 - 1 - 6 EKOSİSTEM FORMASYONU</span>
          </div>

          <h1 className="mb-6 font-sans text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            13 Uzmanlık Alanı, Tek Bir{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/50 decoration-4">
              Büyüme Ekosistemi.
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
            Karmaşık değil, kovan gibi düzenli. 6 Dijital Varlık Kanalı ve 6 Büyüme & Otomasyon
            Motoru, ortadaki GrowB Büyüme Stratejisi ile birleşerek her gün işletmenizin kasasına
            net ciro akıtır.
          </p>

          {/* 3 Temel Güvence Rozeti */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-neutral-300 sm:gap-6">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#FFC300]" />
              <span>13 Tamamlayıcı Dijital Hizmet</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
              <ShieldCheck className="h-4 w-4 text-[#FFC300]" />
              <span>Sözleşmeli Performans Taahhüdü</span>
            </div>
            <a
              href="tel:05414842426"
              className="flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-3.5 py-2 font-bold text-[#FFC300] transition-all hover:bg-[#FFC300] hover:text-black"
            >
              <Phone className="h-4 w-4" />
              <span>Canlı Danışman: 0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* 6-1-6 İNTERAKTİF PETEK KOVAN VİTRİNİ & DETAY ÇEKMECESİ */}
        <HoneycombHive />

        {/* Alt Hızlı Teklif / İletişim Çağrısı */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-80 -translate-x-1/2 rounded-full bg-[#FFC300]/15 blur-3xl" />

          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            İŞLETME ANALİZİ & TEKLİF
          </span>
          <h2 className="mb-4 font-sans text-2xl font-black tracking-tight text-white sm:text-4xl">
            Hangi Hizmetlerin İşletmenizi Büyüteceğini Birlikte Belirleyelim
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm text-neutral-400 sm:text-base">
            Bütçenizi en doğru kanallara paylaştırarak maksimum dönüşüm elde etmeniz için 15
            dakikalık ücretsiz dijital büyüme analizi planlayalım.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-[0_10px_25px_rgba(255,195,0,0.3)] transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
            >
              Ücretsiz Analiz & Teklif Al
            </Link>
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20GrowB%20hizmetleri%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 sm:text-sm"
            >
              WhatsApp'tan Yazın
            </a>
          </div>
        </div>
      </main>

      {/* Alt Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
