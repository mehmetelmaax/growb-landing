import { Preloader } from "@/components/preloader";
import { BackgroundEffects } from "@/components/background-effects";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { FeaturedWorks } from "@/components/featured-works";
import { WhoAreWe } from "@/components/who-are-we";
import { ProcessGrid } from "@/components/process-grid";
import { WebsiteScoreAudit } from "@/components/website-score-audit";
import { ServicesHoverList } from "@/components/services-hover-list";
import { WorkTogetherMarquee } from "@/components/work-together-marquee";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* 0. Logo Splash Animation into Corner */}
      <Preloader />

      {/* 1. Dynamic Ambient Background System */}
      <BackgroundEffects />

      {/* 2. Navbar (Geniş siyah bar, aşağı inince ferah buzlu cam yüzen kapsül) */}
      <Navbar />

      {/* 3. Hero Screen (Can alıcı stüdyo kompozisyonu, cutout kart & video görüşme hapı) */}
      <Hero />

      {/* 4. Altında Çalıştığımız Markalar Slayt Biçiminde Döner */}
      <LogoMarquee />

      {/* 5. Biz Kimiz (Who Are We) */}
      <WhoAreWe />

      {/* 6. Hizmetlerimiz (13 Hizmet Kartı) */}
      <ServicesHoverList />

      {/* 7. 4 Aşamalı Planlama & Büyüme Süreci (01 PLAN, 02 DESIGN, 03 BUILD, 04 GROW) */}
      <ProcessGrid />

      {/* 8. Birlikte Çalışalım / Birlikte Büyüyelim Marquee (Süreç Sonrası Dinamik Köprü) */}
      <WorkTogetherMarquee />

      {/* 9. Fiyatlandırma & Kampanya Paketleri */}
      <Pricing />

      {/* 10. Canlı Referanslarımız (Yayında Olan Canlı Projelerimiz) */}
      <FeaturedWorks />

      {/* 11. Site Checker / Website Skorunu Öğren (Hız & SEO Testi) */}
      <WebsiteScoreAudit />

      {/* 12. Sıkça Sorulan Sorular (FAQ) */}
      <Faq />

      {/* 13. Final İletişim Formu */}
      <FinalCta />

      {/* 14. Footer */}
      <Footer />
    </main>
  );
}
