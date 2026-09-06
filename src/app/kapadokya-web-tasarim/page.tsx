import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapadokya Butik Otel Web Tasarım & Turizm Pazarlaması | GrowB",
  description:
    "Kapadokya butik otelleri, balon turları ve turizm acenteleri için komisyonsuz doğrudan rezervasyon üreten çok dilli web tasarım ve uluslararası dijital reklam yönetimi.",
  alternates: {
    canonical: "/kapadokya-web-tasarim",
  },
};

export default function KapadokyaLandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] font-sans text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A]">
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
            <span>KAPADOKYA TURİZM VE BUTİK OTEL ÇÖZÜMLERİ</span>
          </div>

          <h1 className="mb-6 text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Komisyonculara Boğulmadan{" "}
            <span className="text-[#FFC300]">Doğrudan Rezervasyon Altyapısı.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
            Kapadokya&apos;daki otel, balon ve transfer işletmelerinizi Booking veya acente
            komisyonlarına mahkum etmeden; kendi sitenizden sıcak rezervasyon toplayan çok dilli
            satış motorları kuruyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-lg transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
            >
              Turizm Büyüme Paketini İnceleyin
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
