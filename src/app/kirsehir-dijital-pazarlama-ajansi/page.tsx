import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft } from "lucide-react";
import { AybarNakliyatCaseStudy } from "@/components/kirsehir/aybar-nakliyat-case-study";
import { SITE_CONFIG } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export const metadata: Metadata = {
  title: "Kırşehir Dijital Pazarlama, Web Tasarım & Yerel SEO Ajansı",
  description:
    "Kırşehir ve çevre ilçelerdeki KOBİ'ler için Google Harita 1. sıra SEO, satış odaklı Next.js web tasarım ve niyet odaklı Google Ads yönetimi. Kırşehir Aybar Nakliyat canlı başarı vakası.",
  alternates: {
    canonical: "/kirsehir-dijital-pazarlama-ajansi",
  },
  openGraph: {
    title: "Kırşehir Dijital Pazarlama, Web Tasarım & Yerel SEO Ajansı",
    description: "Kırşehir esnafı ve işletmeleri için telefon çaldıran büyüme sistemleri.",
    url: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`,
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Kırşehir Dijital Pazarlama - GrowB Dijital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kırşehir Dijital Pazarlama, Web Tasarım & Yerel SEO Ajansı",
    description: "Kırşehir KOBİ'leri için doğrudan telefon çaldıran dijital pazarlama.",
    images: [`${siteUrl}/opengraph-image`],
  },
};

export default function KirsehirLandingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kırşehir Dijital Pazarlama",
        item: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`,
      },
    ],
  };

  const kirsehirSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GrowB Dijital — Kırşehir Dijital Pazarlama & Yerel SEO",
    url: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`,
    telephone: SITE_CONFIG.phoneInternational,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kırşehir",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kırşehir",
      addressRegion: "İç Anadolu",
      addressCountry: "TR",
    },
    priceRange: "₺₺₺",
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] font-sans text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kirsehirSchema) }}
      />
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 lg:px-12"
      >
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 transition-colors hover:text-[#FFC300]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mx-auto mb-16 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-4 py-2 font-mono text-xs font-bold text-[#FFC300]">
            <MapPin className="h-4 w-4" />
            <span>KIRŞEHİR BÖLGESEL BÜYÜME VE YEREL SEO DİKEYİ</span>
          </div>

          <h1 className="mb-6 text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Kırşehir&apos;de Telefonunuzu Çaldıran{" "}
            <span className="text-[#FFC300]">Yerel SEO ve Web Altyapısı.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
            Kırşehir Merkez, Kaman, Mucur ve çevre ilçelerdeki potansiyel müşteriler Google&apos;da
            ustanızı, firmanızı veya hizmetinizi aradığında ilk sırada siz çıkın. Hazır WordPress
            şablonlarıyla değil; 1.2 saniyede açılan modern Next.js siteleri ve harita liderliğiyle
            büyüyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-[0_10px_25px_rgba(255,195,0,0.3)] transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
            >
              Kırşehir İçin Büyüme Görüşmesi Planla
            </Link>
            <a
              href={SITE_CONFIG.getWhatsappUrl(
                "Merhaba, Kırşehir işletmem için yerel SEO ve web hizmeti hakkında bilgi almak istiyorum."
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 sm:text-sm"
            >
              WhatsApp&apos;tan Danışın
            </a>
          </div>
        </section>

        {/* CANLI BAŞARI VAKASI: KIRŞEHİR AYBAR NAKLİYAT */}
        <AybarNakliyatCaseStudy />

        {/* Kırşehir Bölgesel Hizmetlerimiz */}
        <section className="mb-20 space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-4xl">
              Kırşehir İşletmelerine Özel 3 Büyüme Adımı
            </h2>
            <p className="text-sm text-neutral-400">
              Kırşehir&apos;de sadece tabela asmak yetmez; dijitalde arayan müşteriyi kapıda
              karşılamalısınız.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#141414] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC300]/30 bg-[#FFC300]/10 font-mono font-bold text-[#FFC300]">
                01
              </div>
              <h3 className="text-lg font-bold text-white">
                Google Harita & 3&apos;lü Paket Hakimiyeti
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Kırşehir içi aramalarda (&quot;Kırşehir nakliyat&quot;, &quot;Kırşehir oto
                çekici&quot;, &quot;Kırşehir usta&quot;) Google Haritalar&apos;da ilk 3 sıraya
                yerleşmenizi sağlıyoruz.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#141414] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC300]/30 bg-[#FFC300]/10 font-mono font-bold text-[#FFC300]">
                02
              </div>
              <h3 className="text-lg font-bold text-white">1.2 Saniyede Açılan Satış Sitesi</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Kullanıcı beklemez; 2 saniyeyi geçen siteleri terk eder. Next.js ile kodlanan
                siteniz ziyaretçiyi anında arama ve WhatsApp butonuna bağlar.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#141414] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC300]/30 bg-[#FFC300]/10 font-mono font-bold text-[#FFC300]">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Negatif Kelime Filtreli Google Ads</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Reklam bütçenizi boşa tıklamalara yedirmeyiz. Sadece Kırşehir ve hedef rotalardan
                sıcak müşteri aratan yüksek niyetli kampanyalar kurgularız.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-[#FFC300]/30 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-8 text-center shadow-2xl sm:p-12">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-4xl">
            Kırşehir&apos;deki İşletmenizi Büyütelim
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-neutral-400">
            Kurucumuzla 15 dakikalık büyüme görüşmesi ayarlayın; Kırşehir pazarındaki fırsatları ve
            rakip açıklarınızı inceleyelim.
          </p>
          <Link
            href="/#iletisim"
            className="inline-flex rounded-full bg-[#FFC300] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-[0_10px_25px_rgba(255,195,0,0.3)] transition-all hover:scale-105 hover:bg-[#FFA000] sm:text-sm"
          >
            Hemen Teklif İste
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
