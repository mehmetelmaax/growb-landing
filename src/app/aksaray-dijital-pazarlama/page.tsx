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
            <span>AKSARAY VE SANAYİ ODAKLI DİJİTAL BÜYÜME</span>
          </div>

          <h1 className="mb-6 text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Aksaray&apos;da Sıcak Müşteri Telefonu Çaldıran{" "}
            <span className="text-[#FFC300]">Satış Sistemleri.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
            Aksaray OSB ve lojistik sektöründe rekabet avantajı kazandıran kurumsal web siteleri ve
            niyet odaklı reklam kurguları.
          </p>

          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-[#FFC300]/30 bg-[#141414] p-6 text-left">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-[#FFC300]">
                CANLI REFERANS VAKASI
              </span>
              <a
                href="https://www.ozaksaraynakliyat.com.tr/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
              >
                ozaksaraynakliyat.com.tr <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Öz Aksaray Nakliyat</h3>
            <p className="text-xs text-neutral-300">
              Aksaray şehirlerarası nakliyat ve asansörlü taşımada Google yerel aramalarda ilk sıra
              konumu ve mobil arama optimizasyonu sağlandı.
            </p>
          </div>

          <Link
            href="/#iletisim"
            className="inline-flex rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-lg transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
          >
            Aksaray İçin Teklif Alın
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
