"use client";

import React, { useState, useRef, useCallback } from "react";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Unlock, 
  ArrowDown 
} from "lucide-react";
import { ALL_13_SERVICES_DETAILED } from "@/data/services-detail-data";
import { ServiceCardDisplay } from "@/components/services/service-card-display";
import { ServiceDetailModal } from "@/components/services/service-detail-modal";
import { useServicesWheelLock } from "@/components/services/use-services-wheel-lock";

export const ServicesHoverList: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const totalServices = ALL_13_SERVICES_DETAILED.length;

  const goToCard = useCallback((targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= totalServices) return;
    setDirection(targetIdx > currentIndex ? 1 : -1);
    setCurrentIndex(targetIdx);
  }, [currentIndex, totalServices]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < totalServices - 1) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, [totalServices]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const { skipAllServices } = useServicesWheelLock({
    totalServices,
    onNext: handleNext,
    onPrev: handlePrev,
    sectionRef,
  });

  const activeService = ALL_13_SERVICES_DETAILED[currentIndex] ?? ALL_13_SERVICES_DETAILED[0]!;

  return (
    <section 
      id="hizmetler" 
      ref={sectionRef}
      className="relative min-h-[92vh] sm:min-h-screen bg-[#0A0A0A] text-white border-t border-white/10 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FFC300 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFC300]/[0.035] rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* SOL SÜTUN: BAŞLIK & KONTROLLER */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold tracking-wider text-[#FFC300] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>13 UZMANLIK ALANIMIZ // DİJİTAL BÜYÜME</span>
            </div>

            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[2.85rem] text-white leading-[1.12] tracking-[-0.03em]">
              Dijitaldeki tüm işlerinizi üstlenen; markanızı sektörün{" "}
              <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
                en çok ciro üreten liderine
              </span>{" "}
              dönüştüren pazarlama ortağınızız.
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed font-sans font-normal max-w-xl">
              Geleneksel ajansların dağınık ve yavaş süreçlerini unutun. Google & Meta satış reklamlarından yerel harita SEO hakimiyetine, 4K video ve Reels prodüksiyonundan WhatsApp CRM satış otomasyonuna kadar tüm dijital işlerinizi tek merkezden yönetiyoruz.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                <span className="font-black text-[#FFC300] text-sm tracking-wide">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-neutral-500">/</span>
                <span className="text-neutral-300 font-bold">13 Hizmet</span>
              </div>

              <div className="w-24 sm:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFC300] transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / totalServices) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToCard(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  aria-label="Önceki hizmet"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 disabled:opacity-25 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => goToCard(currentIndex + 1)}
                  disabled={currentIndex === totalServices - 1}
                  aria-label="Sonraki hizmet"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 disabled:opacity-25 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 pt-1">
              {currentIndex < totalServices - 1 ? (
                <div className="flex items-center gap-1.5 text-[#FFC300]">
                  <Lock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Kaydırarak ilerleyin ({13 - (currentIndex + 1)} hizmet kaldı)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Unlock className="w-3.5 h-3.5" />
                  <span className="font-bold">13/13 Tamamlandı! Aşağı kaydırabilirsiniz ↓</span>
                </div>
              )}
              <span className="text-neutral-600">•</span>
              <button
                type="button"
                onClick={skipAllServices}
                className="text-[#FFC300] hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors hover:underline"
                title="Tüm hizmet kartlarını atla ve sonraki sayfaya in"
              >
                <span>Tümünü atla</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* SAĞ SÜTUN: 3D FLIP KART GÖSTERİMİ */}
          <ServiceCardDisplay
            activeService={activeService}
            direction={direction}
            onOpenDetail={() => setIsDetailModalOpen(true)}
          />

        </div>
      </div>

      {/* HİZMET DETAY AL MODALI */}
      <ServiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        service={activeService}
      />
    </section>
  );
};
