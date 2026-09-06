import dynamic from "next/dynamic";
import { Preloader } from "@/components/preloader";
import { BackgroundEffects } from "@/components/background-effects";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { WorkTogetherMarquee } from "@/components/work-together-marquee";
import { Pricing } from "@/components/pricing";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

const Manifesto = dynamic(() => import("@/components/manifesto").then((mod) => mod.Manifesto), {
  ssr: false,
});
const WhoAreWe = dynamic(() => import("@/components/who-are-we").then((mod) => mod.WhoAreWe), {
  ssr: false,
});
const ServicesHoverList = dynamic(
  () => import("@/components/services-hover-list").then((mod) => mod.ServicesHoverList),
  { ssr: false }
);
const ProcessGrid = dynamic(
  () => import("@/components/process-grid").then((mod) => mod.ProcessGrid),
  { ssr: false }
);
const Metrics = dynamic(() => import("@/components/metrics").then((mod) => mod.Metrics), {
  ssr: false,
});
const FeaturedWorks = dynamic(
  () => import("@/components/featured-works").then((mod) => mod.FeaturedWorks),
  { ssr: false }
);
const WebsiteScoreAudit = dynamic(
  () => import("@/components/website-score-audit").then((mod) => mod.WebsiteScoreAudit),
  { ssr: false }
);
const Faq = dynamic(() => import("@/components/faq").then((mod) => mod.Faq), {
  ssr: false,
});

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
