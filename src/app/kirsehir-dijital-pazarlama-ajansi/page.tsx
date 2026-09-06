import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowLeft, CheckCircle2, ExternalLink, Award } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export const metadata: Metadata = {
  title: "Kırşehir Dijital Pazarlama, Web Tasarım & Yerel SEO Ajansı | GrowB",
  description:
    "Kırşehir ve çevre ilçelerdeki KOBİ'ler için Google Harita 1. sıra SEO, satış odaklı Next.js web tasarım ve niyet odaklı Google Ads yönetimi. Kırşehir Aybar Nakliyat canlı başarı vakası.",
  alternates: {
    canonical: "/kirsehir-dijital-pazarlama-ajansi",
  },
  openGraph: {
    title: "Kırşehir Dijital Pazarlama, Web Tasarım & Yerel SEO Ajansı | GrowB",
    description: "Kırşehir esnafı ve işletmeleri için telefon çaldıran büyüme sistemleri.",
    url: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`,
    type: "website",
    locale: "tr_TR",
  },
};

export default function KirsehirLandingPage() {
  const kirsehirSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GrowB Dijital — Kırşehir Dijital Pazarlama & Yerel SEO",
    url: `${siteUrl}/kirsehir-dijital-pazarlama-ajansi`,
    telephone: "+905414842426",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kirsehirSchema) }}
      />
      <Navbar />

      <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 lg:px-12">
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
              href="https://wa.me/905414842426?text=Merhaba,%20K%C4%B1r%C5%9Fehir%20i%C5%9Fletmem%20i%C3%A7in%20yerel%20SEO%20ve%20web%20hizmeti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 sm:text-sm"
            >
              WhatsApp&apos;tan Danışın
            </a>
          </div>
        </section>

        {/* CANLI BAŞARI VAKASI: KIRŞEHİR AYBAR NAKLİYAT */}
        <section className="mb-20">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#FFC300]/40 bg-gradient-to-br from-[#141414] via-[#121212] to-[#1A1A1A] p-8 shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#FFC300]/10 blur-3xl" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md">
                  <Image
                    src="/clients/kirsehir-aybar.webp"
                    alt="Kırşehir Aybar Nakliyat Logo"
                    width={64}
                    height={64}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#FFC300]">
                    <Award className="h-3.5 w-3.5" />
                    <span>CANLI REFERANS VAKASI // KIRŞEHİR</span>
                  </div>
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    Kırşehir Aybar Nakliyat
                  </h2>
                </div>
              </div>

              <a
                href="https://www.kirsehiraybarnakliyat.com.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#FFC300] hover:text-black"
              >
                <span>kirsehiraybarnakliyat.com.tr</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Vaka Metrikleri */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
                <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                  Mobil Açılış Hızı
                </span>
                <span className="text-3xl font-black text-emerald-400">1.2 sn</span>
                <span className="mt-1 block text-xs text-neutral-500">Core Web Vitals Yeşil</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
                <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                  İlk 90 Gün Çağrı Artışı
                </span>
                <span className="text-3xl font-black text-[#FFC300]">+%92</span>
                <span className="mt-1 block text-xs text-neutral-500">
                  Doğrudan Müşteri Telefonu
                </span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
                <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                  Google Harita Konumu
                </span>
                <span className="text-3xl font-black text-white">1. Sıra</span>
                <span className="mt-1 block text-xs text-neutral-500">
                  Kırşehir Local Pack Hakimiyeti
                </span>
              </div>
            </div>

            {/* Yapılan Operasyonlar */}
            <div className="space-y-3 text-sm text-neutral-300">
              <h3 className="mb-2 text-base font-bold text-white">
                Kırşehir Aybar Nakliyat İçin Ne Yaptık?
              </h3>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    Kırşehir ve çevre ilçeler için bölgesel NAP tutarlılığı ve Google İşletme
                    Profili harita optimizasyonu.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    Şeffaf &apos;Sabit Fiyat Garantisi&apos; ve asansörlü taşıma odağıyla kurumsal
                    güven arayüzü kodlandı.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    Form doldurulduğu anda 10 saniye içinde yetkili telefona düşen anlık WhatsApp
                    lead bildirim motoru.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    Mobil kullanıcıların tek tıkla arama yapabileceği optimize edilmiş arama ve
                    teklif butonları.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

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
