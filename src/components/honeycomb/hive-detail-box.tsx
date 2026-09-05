"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight, 
  ArrowUp, 
  TrendingUp 
} from "lucide-react";
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
      className="scroll-mt-24 pt-12 mt-12 border-t border-white/10 relative"
    >
      {/* Bilgi Bölümü Üst Başlık & Yukarı Çıkış Çubuğu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#FFC300] animate-ping" />
          <span className="text-xs sm:text-sm font-mono font-black text-[#FFC300] uppercase tracking-widest">
            // SEÇİLEN HİZMET VE EYLEM PLANI (#{activeService.num})
          </span>
        </div>

        <button
          onClick={scrollToFormationTop}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#FFC300] text-neutral-300 hover:text-black text-xs font-mono font-bold transition-all border border-white/10 hover:border-[#FFC300] shadow-sm cursor-pointer"
          title="Yukarı Kovan Formasyonuna Dön"
        >
          <ArrowUp className="w-3.5 h-3.5" />
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
          className="bg-gradient-to-b from-[#161616] via-[#121212] to-[#0D0D0D] border-2 border-[#FFC300]/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden"
        >
          {/* Arka Plan Sarısı Işık Halesi */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC300]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Üst Başlık Satırı */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 relative z-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0A0A0A] border-2 border-[#FFC300] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(255,195,0,0.3)] shrink-0">
                {activeIcon.emoji}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFC300] text-[#0A0A0A] text-xs font-mono font-black">
                    HİZMET #{activeService.num}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    {activeService.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    {activeService.badge}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans">
                  {activeService.title}
                </h2>
                <p className="text-sm sm:text-base text-[#FFC300] font-bold mt-1">
                  {activeService.tagline}
                </p>
              </div>
            </div>

            {/* Hızlı WhatsApp Bilgi Butonu */}
            <div className="shrink-0 flex items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:scale-105"
              >
                <span>WhatsApp&apos;tan Hızlı Bilgi Al 💬</span>
              </a>
            </div>
          </div>

          {/* Gövde Detayları: Açıklama, Teslimatlar & Metrik */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                  // Hizmet Kapsamı ve Yaklaşımımız:
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {activeService.heroDesc}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC300] mb-3">
                  // Bu Hizmette Sunduğumuz Garantili Çözümler:
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                  {activeService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sağ Kolon: Metrik Sonucu, Adımlar ve Aksiyonlar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#FFC300]/40 shadow-xl">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Ölçülebilir Sonuç & Taahhüt:
                </span>
                <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-[#FFC300]">
                  <TrendingUp className="w-5 h-5" />
                  <span>{activeService.metricsResult}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Nasıl Uyguluyoruz?
                </h4>
                <div className="space-y-2 text-xs text-neutral-300">
                  {activeService.howItWorks.map((step, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/hizmetler/${activeService.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Ayrıntılı Sayfayı Aç</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <a
                  href="/#iletisim"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Teklif Al</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
