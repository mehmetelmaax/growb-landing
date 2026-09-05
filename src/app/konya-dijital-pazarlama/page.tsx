import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Konya Dijital Pazarlama, Web Tasarım & Harita SEO | GrowB",
  description:
    "Konya Selçuklu, Meram ve Karatay işletmeleri için Google yerel SEO, yüksek hızlı web altyapısı ve reklam yönetimi. Konya Lider Nakliyat canlı referans vakası.",
  alternates: {
    canonical: "/konya-dijital-pazarlama",
  },
};

export default function KonyaLandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A] overflow-x-hidden font-sans">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto relative">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-[#FFC300] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        <section className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] mb-6">
            <MapPin className="w-4 h-4" />
            <span>KONYA BÖLGESEL PAZARLAMA VE SEO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
            Konya Pazarında Liderliğe Oynayan{" "}
            <span className="text-[#FFC300]">Satış Altyapıları.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Selçuklu, Karatay ve Meram&apos;da sanayi ve hizmet sektöründeki işletmelerinize 1.0 saniyede açılan modern satış makineleri kuruyoruz.
          </p>

          {/* Vaka Kutusu */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#FFC300]/30 text-left mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#FFC300] uppercase">CANLI REFERANS VAKASI</span>
              <a
                href="https://www.konyaliderevdeneve.com/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                konyaliderevdeneve.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Konya Lider Nakliyat</h3>
            <p className="text-xs text-neutral-300">
              1.0 saniye açılış hızı, Selçuklu ve Meram harita liderliği ve +%78 doğrudan müşteri çağrısı artışı ile Konya bölgesel nakliyat dominasyonu sağlandı.
            </p>
          </div>

          <Link
            href="/#iletisim"
            className="inline-flex px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-105"
          >
            Konya İçin Teklif Alın
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
