import { Preloader } from "@/components/preloader";
import { BackgroundEffects } from "@/components/background-effects";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { LogoMarquee } from "@/components/logo-marquee";
import { WhoAreWe } from "@/components/who-are-we";
import { ServicesHoverList } from "@/components/services-hover-list";
import { ProcessGrid } from "@/components/process-grid";
import { Metrics } from "@/components/metrics";
import { FeaturedWorks } from "@/components/featured-works";
import { WebsiteScoreAudit } from "@/components/website-score-audit";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { WorkTogetherMarquee } from "@/components/work-together-marquee";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { FAQ_DATA } from "@/data/content";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A] font-sans"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 0. Logo Splash Animation into Corner */}
      <Preloader />

      {/* 1. Dynamic Ambient Background System */}
      <BackgroundEffects />

      {/* 2. Navbar (Geniş siyah bar, aşağı inince ferah buzlu cam yüzen kapsül) */}
      <Navbar />

      {/* 3. Hero Screen (Can alıcı stüdyo kompozisyonu, cutout kart & video görüşme hapı) */}
      <Hero />

      {/* 4. Manifesto (Kinetik Tipografi Büyüme Manifestosu) */}
      <Manifesto />

      {/* 5. Altında Çalıştığımız Markalar Slayt Biçiminde Döner */}
      <LogoMarquee />

      {/* 6. Biz Kimiz (Who Are We) */}
      <WhoAreWe />

      {/* 7. Hizmetlerimiz (13 Hizmet Kartı) */}
      <ServicesHoverList />

      {/* 8. 4 Aşamalı Planlama & Büyüme Süreci (01 PLAN, 02 DESIGN, 03 BUILD, 04 GROW) */}
      <ProcessGrid />

      {/* 9. Saha Verileri & Metrikler */}
      <Metrics />

      {/* 10. Birlikte Çalışalım / Birlikte Büyüyelim Marquee (Süreç Sonrası Dinamik Köprü) */}
      <WorkTogetherMarquee />

      {/* 9. Fiyatlandırma & Kampanya Paketleri */}
      <div className="content-visibility-auto">
        <Pricing />
      </div>

      {/* 10. Canlı Referanslarımız (Yayında Olan Canlı Projelerimiz) */}
      <div className="content-visibility-auto">
        <FeaturedWorks />
      </div>

      {/* 11. Site Checker / Website Skorunu Öğren (Hız & SEO Testi) */}
      <div className="content-visibility-auto">
        <WebsiteScoreAudit />
      </div>

      {/* 12. Sıkça Sorulan Sorular (FAQ) */}
      <div className="content-visibility-auto">
        <Faq />
      </div>

      {/* 13. Final İletişim Formu */}
      <FinalCta />

      {/* 14. Footer */}
      <Footer />
    </main>
  );
}
