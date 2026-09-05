"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, Send, ArrowUpRight } from "lucide-react";
import { ServiceDetail } from "@/data/services-detail-data";

interface ServiceCardDisplayProps {
  activeService: ServiceDetail;
  direction: number;
  onOpenDetail: () => void;
}

export const ServiceCardDisplay: React.FC<ServiceCardDisplayProps> = ({
  activeService,
  direction,
  onOpenDetail,
}) => {
  const cardVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.96,
      rotateX: dir > 0 ? -5 : 5,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.96,
      rotateX: dir > 0 ? 5 : -5,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="lg:col-span-6 relative w-full perspective-[1200px]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeService.slug}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full bg-[#121212] border-2 border-[#FFC300]/40 hover:border-[#FFC300]/70 rounded-[24px] sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,195,0,0.06)] transition-colors duration-200 select-text"
        >
          {/* Kart Üst Satırı: [01] Kategori ve Yeşil Rozet */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#FFC300] text-[#0A0A0A] font-mono font-black text-xs">
                {activeService.num}
              </span>
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                {activeService.category}
              </span>
            </div>

            <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shadow-sm">
              {activeService.badge}
            </span>
          </div>

          {/* Hizmet Başlığı */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FFC300] tracking-tight mb-3 font-sans">
            {activeService.title}
          </h3>

          {/* Hizmet Açıklama / Slogan */}
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-5 font-medium">
            {activeService.tagline}
          </p>

          {/* 3 Teslim Edilebilir Madde */}
          <div className="space-y-2.5 mb-6">
            {activeService.deliverables.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-300 leading-snug font-normal">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Kart Alt Satırı: Hedef Metrik & Hizmeti İncele Buton Grubu */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#FFC300]">
              <TrendingUp className="w-4 h-4 text-[#FFC300]" />
              <span>Hedef: {activeService.metricsResult}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenDetail}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs font-mono tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,195,0,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>DETAY AL</span>
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <Link
                href={`/hizmetler/${activeService.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-sm hover:scale-105"
              >
                <span>İncele</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
