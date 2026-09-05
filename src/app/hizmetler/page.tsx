import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HoneycombHive } from "@/components/honeycomb-hive";
import { Phone, ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tüm Hizmetlerimiz (13 Uzmanlık) | GrowB Dijital — 6-1-6 Büyüme Kovanı",
  description: "Web yazılımından Google & Meta satış reklamlarına, harita SEO liderliğinden video prodüksiyona ve WhatsApp otomasyonuna kadar GrowB Dijital'in 13 uzmanlık alanını 6-1-6 formatında keşfedin.",
};

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A] overflow-x-hidden relative">
      {/* ========================================================= */}
      {/* 1. KULLANICI TALEBİ: ARKA PLANA ÖZEL GÖRSEL & KOVAN ATMOSFERİ */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Yüksek Çözünürlüklü Altın Petek & Ağ Arka Plan Görseli */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen scale-105"
          style={{ backgroundImage: "url('/services-hive-bg.jpg')" }}
        />

        {/* Çok Katmanlı Kademeli Siyah & Altın Degrade Karartma */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,195,0,0.15),transparent_80%)]" />

        {/* Dinamik Ambient Işık Noktaları */}
        <div className="absolute top-1/4 left-4 w-96 h-96 bg-[#FFC300]/10 rounded-full blur-[130px] animate-pulse-subtle pointer-events-none" />
        <div className="absolute bottom-1/3 right-4 w-[480px] h-[480px] bg-[#FFA000]/10 rounded-full blur-[150px] animate-float-slow pointer-events-none" />
      </div>

      {/* Üst Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      <main className="pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] mb-6 shadow-[0_0_25px_rgba(255,195,0,0.18)]">
            <span className="text-base">🐝</span>
            <span>GROWB BÜYÜME KOVANI // 6 - 1 - 6 EKOSİSTEM FORMASYONU</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6 font-sans">
            13 Uzmanlık Alanı, Tek Bir{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/50 decoration-4">
              Büyüme Ekosistemi.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Karmaşık değil, kovan gibi düzenli. 6 Dijital Varlık Kanalı ve 6 Büyüme & Otomasyon Motoru, ortadaki GrowB Büyüme Stratejisi ile birleşerek her gün işletmenizin kasasına net ciro akıtır.
          </p>

          {/* 3 Temel Güvence Rozeti */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#FFC300]" />
              <span>13 Tamamlayıcı Dijital Hizmet</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#FFC300]" />
              <span>Sözleşmeli Performans Taahhüdü</span>
            </div>
            <a 
              href="tel:05414842426" 
              className="flex items-center gap-2 bg-[#FFC300]/10 hover:bg-[#FFC300] text-[#FFC300] hover:text-black px-3.5 py-2 rounded-full border border-[#FFC300]/30 transition-all font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Canlı Danışman: 0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* 6-1-6 İNTERAKTİF PETEK KOVAN VİTRİNİ & DETAY ÇEKMECESİ */}
        <HoneycombHive />

        {/* Alt Hızlı Teklif / İletişim Çağrısı */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#FFC300]/15 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono font-bold text-[#FFC300] uppercase tracking-wider block mb-2">
            İŞLETME ANALİZİ & TEKLİF
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 font-sans">
            Hangi Hizmetlerin İşletmenizi Büyüteceğini Birlikte Belirleyelim
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mb-8">
            Bütçenizi en doğru kanallara paylaştırarak maksimum dönüşüm elde etmeniz için 15 dakikalık ücretsiz dijital büyüme analizi planlayalım.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(255,195,0,0.3)] hover:scale-105"
            >
              Ücretsiz Analiz & Teklif Al
            </Link>
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20GrowB%20hizmetleri%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all border border-white/20"
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
