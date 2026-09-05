import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Nevşehir Dijital Pazarlama & Web Tasarım Ajansı | GrowB",
  description:
    "Nevşehir merkezli kurumsal dijital pazarlama ajansı GrowB. Nevşehir ve Kapadokya işletmeleri için satış odaklı web yazılımı, Google Ads ve harita SEO yönetimi.",
  alternates: {
    canonical: "/nevsehir-dijital-pazarlama-ajansi",
  },
};

export default function NevsehirLandingPage() {
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
            <span>NEVŞEHİR GENEL MERKEZ AVANTAJI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
            Nevşehir&apos;de Dijital İşlerinizi Üstlenen{" "}
            <span className="text-[#FFC300]">Yerel Büyüme Ortağınız.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Nevşehir merkezli kurumsal yapımızla uzaktan değil, birebir masaya oturarak işletmenizin cirosunu artıran web, reklam ve satış otomasyonları kuruyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:scale-105"
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
