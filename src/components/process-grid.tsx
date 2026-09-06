import React from "react";
import { CircularBadge } from "./ui/circular-badge";

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "PLAN",
    subtitle: "Strateji & Analiz",
    description:
      "İşletmenizi, ciro hedeflerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz. Rakiplerinizi geride bırakacak Google & Meta reklam kanallarını, yerel harita SEO planını ve teknik büyüme yol haritasını kurguluyoruz.",
  },
  {
    number: "02",
    title: "DESIGN",
    subtitle: "Dönüşüm Odaklı Tasarım",
    description:
      "Stratejiyi yüksek dönüşümlü arayüzlere dönüştürüyoruz. Sizi sektörünüzde kurumsal olarak öne çıkaran, güven veren ve ziyaretçiyi doğrudan tek tıkla arama ve WhatsApp butonuna bağlayan satış odaklı deneyim inşa ediyoruz.",
  },
  {
    number: "03",
    title: "BUILD",
    subtitle: "Yüksek Hızlı Satış Altyapısı",
    description:
      "1.1 saniye altında açılan modern kod altyapısı, Google Core Web Vitals yeşil skor optimizasyonu ve web sitenizden gelen her müşteri talebini anında yetkilinin telefonuna düşüren bildirim motorlarıyla donatıyoruz.",
  },
  {
    number: "04",
    title: "GROW",
    subtitle: "Kesintisiz Ciro & Büyüme",
    description:
      "Yayına girdikten sonra da yalnız bırakmıyoruz. Google & Meta satış reklamları, yerel harita SEO hakimiyeti ve sürekli performans takibiyle işletmenizin müşteri akışını ve cirosunu kesintisiz katlıyoruz.",
  },
];

export const ProcessGrid: React.FC = () => {
  return (
    <section
      id="surec"
      className="relative overflow-hidden bg-[#FFFFFF] py-10 text-[#0A0A0A] sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Animated Header Coming from Above */}
        <div className="mb-8 flex flex-col justify-between gap-8 sm:mb-10 md:flex-row md:items-start">
          <div className="max-w-4xl">
            {/* Badge Tag */}
            <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
              <span className="h-2 w-2 rounded-full bg-[#0A0A0A]" />
              <span>4 AŞAMALI DİJİTAL BÜYÜME SÜRECİMİZ</span>
            </div>

            {/* Huge Headline */}
            <div className="overflow-hidden">
              <h2 className="font-sans text-4xl font-black uppercase leading-[0.98] tracking-[-0.04em] text-[#0A0A0A] sm:text-6xl md:text-7xl lg:text-[4.75rem]">
                CİRONUZU ARTIRAN SATIŞ SİSTEMLERİ TESADÜFEN OLMAZ. BİZ İŞİMİZİ ASLA ŞANSA
                BIRAKMIYORUZ.
              </h2>
            </div>

            {/* Action Pill Button */}
            <div className="mt-8">
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-neutral-800 hover:shadow-lg"
              >
                BİZİMLE ÇALIŞIN & BÜYÜYÜN ↗
              </a>
            </div>
          </div>

          {/* Rotating Circular Stamp Badge */}
          <div className="hidden shrink-0 pt-2 md:flex">
            <CircularBadge
              size={120}
              theme="light"
              text="★ GROWB DİJİTAL ★ DİJİTAL PAZARLAMA AJANSI ★ BÜYÜME ORTAĞINIZ "
              centerContent={<span className="text-xl">⚡</span>}
            />
          </div>
        </div>

        {/* 4-Column Grid: 01 PLAN, 02 DESIGN, 03 BUILD, 04 GROW */}
        <div className="grid grid-cols-1 gap-10 border-t border-neutral-200/80 pt-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Giant Faded Number */}
              <div className="mb-2.5 select-none font-sans text-5xl font-black leading-none tracking-tight text-[#D8D8D8] sm:text-6xl lg:text-[4.5rem]">
                {step.number}
              </div>

              {/* Huge Bold Title */}
              <h3 className="mb-2 font-sans text-3xl font-black uppercase leading-none tracking-[-0.04em] text-[#0A0A0A] sm:text-4xl lg:text-[2.75rem]">
                {step.title}
              </h3>

              <span className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-amber-600">
                {step.subtitle}
              </span>

              {/* Description */}
              <p className="text-sm font-normal leading-[1.65] text-[#4A4A4A] sm:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
