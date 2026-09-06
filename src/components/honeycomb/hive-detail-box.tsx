"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, ArrowRight, ArrowUp, TrendingUp } from "lucide-react";
import { ServiceDetail } from "@/data/services-detail-data";
import { SITE_CONFIG } from "@/data/content";

interface HiveDetailBoxProps {
  activeService: ServiceDetail;
  activeIcon: { emoji: string };
  detailSectionRef: React.RefObject<HTMLDivElement>;
  scrollToFormationTop: () => void;
}

export const HiveDetailBox: React.FC<HiveDetailBoxProps> = ({
  activeService,
  activeIcon,
  detailSectionRef,
  scrollToFormationTop,
}) => {
  const waMessage = `Merhaba GrowB Dijital, ${activeService.title} hizmetiniz hakkında detaylı bilgi ve teklif almak istiyorum.`;
  const waUrl = SITE_CONFIG.getWhatsappUrl(waMessage);

  return (
    <div
      ref={detailSectionRef}
      id="bilgi-bolumu"
      className="relative mt-12 scroll-mt-24 border-t border-white/10 pt-12"
    >
      {/* Bilgi Bölümü Üst Başlık & Yukarı Çıkış Çubuğu */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-ping rounded-full bg-[#FFC300]" />
          <span className="font-mono text-xs font-black uppercase tracking-widest text-[#FFC300] sm:text-sm">
            // SEÇİLEN HİZMET VE EYLEM PLANI (#{activeService.num})
          </span>
        </div>

        <button
          onClick={scrollToFormationTop}
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-bold text-neutral-300 shadow-sm transition-all hover:border-[#FFC300] hover:bg-[#FFC300] hover:text-black"
          title="Yukarı Kovan Formasyonuna Dön"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span>6-1-6 Kovanına Geri Çık</span>
        </button>
      </div>

      {/* AKTİF HİZMET DETAY ÇEKMECESİ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.slug}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#FFC300]/50 bg-gradient-to-b from-[#161616] via-[#121212] to-[#0D0D0D] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.85)] sm:p-10 lg:p-12"
        >
          {/* Arka Plan Sarısı Işık Halesi */}
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#FFC300]/15 blur-3xl" />

          {/* Üst Başlık Satırı */}
          <div className="relative z-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[#FFC300] bg-[#0A0A0A] text-3xl shadow-[0_0_20px_rgba(255,195,0,0.3)] sm:h-16 sm:w-16">
                {activeIcon.emoji}
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-[#FFC300] px-2.5 py-0.5 font-mono text-xs font-black text-[#0A0A0A]">
                    HİZMET #{activeService.num}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {activeService.category}
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                    {activeService.badge}
                  </span>
                </div>

                <h2 className="font-sans text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {activeService.title}
                </h2>
                <p className="mt-1 text-sm font-bold text-[#FFC300] sm:text-base">
                  {activeService.tagline}
                </p>
              </div>
            </div>

            {/* Hızlı WhatsApp Bilgi Butonu */}
            <div className="flex shrink-0 items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-xs font-black tracking-wide text-black shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all hover:scale-105 hover:bg-[#20bd5a] focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:text-sm"
              >
                <span>WhatsApp&apos;tan Hızlı Bilgi Al 💬</span>
              </a>
            </div>
          </div>

          {/* Gövde Detayları: Açıklama, Teslimatlar & Metrik */}
          <div className="relative z-10 grid grid-cols-1 items-start gap-8 pt-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h3 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                  // Hizmet Kapsamı ve Yaklaşımımız:
                </h3>
                <p className="text-sm font-normal leading-relaxed text-neutral-300 sm:text-base">
                  {activeService.heroDesc}
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
                  // Bu Hizmette Sunduğumuz Garantili Çözümler:
                </h3>
                <ul className="space-y-2.5 text-xs text-neutral-300 sm:text-sm">
                  {activeService.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sağ Kolon: Metrik Sonucu, Adımlar ve Aksiyonlar */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-[#FFC300]/40 bg-[#0A0A0A] p-6 shadow-xl">
                <span className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                  Ölçülebilir Sonuç & Taahhüt:
                </span>
                <div className="flex items-center gap-2 text-lg font-black text-[#FFC300] sm:text-xl">
                  <TrendingUp className="h-5 w-5" />
                  <span>{activeService.metricsResult}</span>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Nasıl Uyguluyoruz?
                </h4>
                <div className="space-y-2 text-xs text-neutral-300">
                  {activeService.howItWorks.map((step, i) => (
                    <div key={i} className="rounded-lg border border-white/5 bg-black/40 p-2.5">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link
                  href={`/hizmetler/${activeService.slug}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#FFC300] hover:text-[#0A0A0A]"
                >
                  <span>Ayrıntılı Sayfayı Aç</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                </Link>

                <a
                  href="/#iletisim"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC300] px-5 py-3.5 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-md transition-all hover:bg-[#FFA000]"
                >
                  <span>Teklif Al</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
