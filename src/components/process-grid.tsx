"use client";

import React from "react";
import { motion } from "framer-motion";
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
      "1.1 saniye altında açılan modern kod altyapısı, Google Core Web Vitals 95+ uyumu ve web sitenizden gelen her müşteri talebini anında yetkilinin telefonuna düşüren bildirim motorlarıyla donatıyoruz.",
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
    <section id="surec" className="bg-[#FFFFFF] text-[#0A0A0A] py-10 sm:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Animated Header Coming from Above */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8 sm:mb-10">
          <div className="max-w-4xl">
            {/* Badge Tag */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0A0A0A] uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
              <span>4 AŞAMALI DİJİTAL BÜYÜME SÜRECİMİZ</span>
            </motion.div>

            {/* Huge Headline */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black text-[#0A0A0A] tracking-[-0.04em] uppercase leading-[0.98] font-sans"
              >
                CİRONUZU ARTIRAN SATIŞ SİSTEMLERİ TESADÜFEN OLMAZ. BİZ İŞİMİZİ ASLA ŞANSA BIRAKMIYORUZ.
              </motion.h2>
            </div>

            {/* Action Pill Button */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="mt-8"
            >
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                BİZİMLE ÇALIŞIN & BÜYÜYÜN ↗
              </a>
            </motion.div>
          </div>

          {/* Rotating Circular Stamp Badge */}
          <div className="hidden md:flex shrink-0 pt-2">
            <CircularBadge
              size={120}
              theme="light"
              text="★ GROWB DİJİTAL ★ DİJİTAL PAZARLAMA AJANSI ★ BÜYÜME ORTAĞINIZ "
              centerContent={<span className="text-xl">⚡</span>}
            />
          </div>
        </div>

        {/* 4-Column Grid: 01 PLAN, 02 DESIGN, 03 BUILD, 04 GROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pt-8 border-t border-neutral-200/80">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: "easeOut" }}
              className="flex flex-col items-start text-left"
            >
              {/* Giant Faded Number */}
              <div className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-[#D8D8D8] tracking-tight leading-none mb-2.5 select-none font-sans">
                {step.number}
              </div>

              {/* Huge Bold Title */}
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0A0A0A] tracking-[-0.04em] leading-none uppercase mb-2 font-sans">
                {step.title}
              </h3>

              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mb-4">
                {step.subtitle}
              </span>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.65] font-normal">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
