import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft, ExternalLink } from "lucide-react";


export const metadata: Metadata = {
  title: "Aksaray Dijital Pazarlama, Web Tasarım & Harita SEO | GrowB",
  description:
    "Aksaray sanayi ve nakliyat işletmeleri için yüksek dönüşümlü web tasarım, Google Ads ve yerel SEO. Öz Aksaray Nakliyat canlı referans vakası.",
  alternates: {
    canonical: "/aksaray-dijital-pazarlama",
  },
};

export default function AksarayLandingPage() {
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
            <span>AKSARAY VE SANAYİ ODAKLI DİJİTAL BÜYÜME</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
            Aksaray&apos;da Sıcak Müşteri Telefonu Çaldıran{" "}
            <span className="text-[#FFC300]">Satış Sistemleri.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Aksaray OSB ve lojistik sektöründe rekabet avantajı kazandıran kurumsal web siteleri ve niyet odaklı reklam kurguları.
          </p>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#FFC300]/30 text-left mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#FFC300] uppercase">CANLI REFERANS VAKASI</span>
              <a
                href="https://www.ozaksaraynakliyat.com.tr/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                ozaksaraynakliyat.com.tr <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Öz Aksaray Nakliyat</h3>
            <p className="text-xs text-neutral-300">
              Aksaray şehirlerarası nakliyat ve asansörlü taşımada Google yerel aramalarda ilk sıra konumu ve mobil arama optimizasyonu sağlandı.
            </p>
          </div>

          <Link
            href="/#iletisim"
            className="inline-flex px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-105"
          >
            Aksaray İçin Teklif Alın
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
