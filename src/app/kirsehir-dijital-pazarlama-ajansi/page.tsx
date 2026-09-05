import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  MapPin, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Award
} from "lucide-react";

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
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kirsehirSchema) }}
      />
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto relative">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-[#FFC300] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] mb-6">
            <MapPin className="w-4 h-4" />
            <span>KIRŞEHİR BÖLGESEL BÜYÜME VE YEREL SEO DİKEYİ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
            Kırşehir&apos;de Telefonunuzu Çaldıran{" "}
            <span className="text-[#FFC300]">Yerel SEO ve Web Altyapısı.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Kırşehir Merkez, Kaman, Mucur ve çevre ilçelerdeki potansiyel müşteriler Google&apos;da ustanızı, firmanızı veya hizmetinizi aradığında ilk sırada siz çıkın. Hazır WordPress şablonlarıyla değil; 1.2 saniyede açılan modern Next.js siteleri ve harita liderliğiyle büyüyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(255,195,0,0.3)] hover:scale-105"
            >
              Kırşehir İçin Büyüme Görüşmesi Planla
            </Link>
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20K%C4%B1r%C5%9Fehir%20i%C5%9Fletmem%20i%C3%A7in%20yerel%20SEO%20ve%20web%20hizmeti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all border border-white/20"
            >
              WhatsApp&apos;tan Danışın
            </a>
          </div>
        </section>

        {/* CANLI BAŞARI VAKASI: KIRŞEHİR AYBAR NAKLİYAT */}
        <section className="mb-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#141414] via-[#121212] to-[#1A1A1A] border-2 border-[#FFC300]/40 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC300]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md">
                  <img
                    src="/clients/kirsehir-aybar.webp"
                    alt="Kırşehir Aybar Nakliyat Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFC300] uppercase mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>CANLI REFERANS VAKASI // KIRŞEHİR</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Kırşehir Aybar Nakliyat
                  </h2>
                </div>
              </div>

              <a
                href="https://www.kirsehiraybarnakliyat.com.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-black text-xs font-bold font-mono transition-colors"
              >
                <span>kirsehiraybarnakliyat.com.tr</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Vaka Metrikleri */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase">Mobil Açılış Hızı</span>
                <span className="text-3xl font-black text-emerald-400">1.2 sn</span>
                <span className="text-xs text-neutral-500 block mt-1">Core Web Vitals Yeşil</span>
              </div>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase">İlk 90 Gün Çağrı Artışı</span>
                <span className="text-3xl font-black text-[#FFC300]">+%92</span>
                <span className="text-xs text-neutral-500 block mt-1">Doğrudan Müşteri Telefonu</span>
              </div>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase">Google Harita Konumu</span>
                <span className="text-3xl font-black text-white">1. Sıra</span>
                <span className="text-xs text-neutral-500 block mt-1">Kırşehir Local Pack Hakimiyeti</span>
              </div>
            </div>

            {/* Yapılan Operasyonlar */}
            <div className="space-y-3 text-sm text-neutral-300">
              <h3 className="font-bold text-white text-base mb-2">Kırşehir Aybar Nakliyat İçin Ne Yaptık?</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                  <span>Kırşehir ve çevre ilçeler için bölgesel NAP tutarlılığı ve Google İşletme Profili harita optimizasyonu.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                  <span>Şeffaf &apos;Sabit Fiyat Garantisi&apos; ve asansörlü taşıma odağıyla kurumsal güven arayüzü kodlandı.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                  <span>Form doldurulduğu anda 10 saniye içinde yetkili telefona düşen anlık WhatsApp lead bildirim motoru.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                  <span>Mobil kullanıcıların tek tıkla arama yapabileceği optimize edilmiş arama ve teklif butonları.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Kırşehir Bölgesel Hizmetlerimiz */}
        <section className="mb-20 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Kırşehir İşletmelerine Özel 3 Büyüme Adımı
            </h2>
            <p className="text-sm text-neutral-400">
              Kırşehir&apos;de sadece tabela asmak yetmez; dijitalde arayan müşteriyi kapıda karşılamalısınız.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC300]/10 border border-[#FFC300]/30 flex items-center justify-center text-[#FFC300] font-bold font-mono">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Google Harita & 3&apos;lü Paket Hakimiyeti</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Kırşehir içi aramalarda (&quot;Kırşehir nakliyat&quot;, &quot;Kırşehir oto çekici&quot;, &quot;Kırşehir usta&quot;) Google Haritalar&apos;da ilk 3 sıraya yerleşmenizi sağlıyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC300]/10 border border-[#FFC300]/30 flex items-center justify-center text-[#FFC300] font-bold font-mono">
                02
              </div>
              <h3 className="text-lg font-bold text-white">1.2 Saniyede Açılan Satış Sitesi</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Kullanıcı beklemez; 2 saniyeyi geçen siteleri terk eder. Next.js ile kodlanan siteniz ziyaretçiyi anında arama ve WhatsApp butonuna bağlar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC300]/10 border border-[#FFC300]/30 flex items-center justify-center text-[#FFC300] font-bold font-mono">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Negatif Kelime Filtreli Google Ads</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Reklam bütçenizi boşa tıklamalara yedirmeyiz. Sadece Kırşehir ve hedef rotalardan sıcak müşteri aratan yüksek niyetli kampanyalar kurgularız.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-[#FFC300]/30 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Kırşehir&apos;deki İşletmenizi Büyütelim
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-8">
            Kurucumuzla 15 dakikalık büyüme görüşmesi ayarlayın; Kırşehir pazarındaki fırsatları ve rakip açıklarınızı inceleyelim.
          </p>
          <Link
            href="/#iletisim"
            className="inline-flex px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(255,195,0,0.3)] hover:scale-105"
          >
            Hemen Teklif İste
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
