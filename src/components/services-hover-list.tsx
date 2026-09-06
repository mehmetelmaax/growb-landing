"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
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

  const goToCard = useCallback(
    (targetIdx: number) => {
      if (targetIdx < 0 || targetIdx >= totalServices) return;
      setDirection(targetIdx > currentIndex ? 1 : -1);
      setCurrentIndex(targetIdx);
    },
    [currentIndex, totalServices]
  );

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
      className="relative flex min-h-[92vh] select-none items-center justify-center overflow-hidden border-t border-white/10 bg-[#0A0A0A] px-4 py-10 text-white sm:min-h-screen sm:px-6 sm:py-16 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#FFC300 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[#FFC300]/[0.035] blur-[170px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          {/* SOL SÜTUN: BAŞLIK & KONTROLLER */}
          <div className="flex flex-col items-start space-y-4 sm:space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
              <span>13 UZMANLIK ALANIMIZ // DİJİTAL BÜYÜME</span>
            </div>

            <h2 className="font-sans text-2xl font-black leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem]">
              Dijitaldeki tüm işlerinizi üstlenen; markanızı sektörün{" "}
              <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
                en çok ciro üreten liderine
              </span>{" "}
              dönüştüren pazarlama ortağınızız.
            </h2>

            <p className="max-w-xl font-sans text-xs font-normal leading-relaxed text-neutral-300 sm:text-sm lg:text-base">
              Geleneksel ajansların dağınık ve yavaş süreçlerini unutun. Google & Meta satış
              reklamlarından yerel harita SEO hakimiyetine, 4K video ve Reels prodüksiyonundan
              WhatsApp CRM satış otomasyonuna kadar tüm dijital işlerinizi tek merkezden
              yönetiyoruz.
            </p>

            <div className="flex w-full flex-wrap items-center gap-3.5 pt-2 sm:gap-4">
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300">
                <span className="text-sm font-black tracking-wide text-[#FFC300]">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-neutral-500">/</span>
                <span className="font-bold text-neutral-300">13 Hizmet</span>
              </div>

              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10 sm:w-32">
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
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => goToCard(currentIndex + 1)}
                  disabled={currentIndex === totalServices - 1}
                  aria-label="Sonraki hizmet"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
                <span>Okları veya butonları kullanarak tüm hizmetleri inceleyin</span>
              </div>
              <span className="hidden text-neutral-600 sm:inline">•</span>
              <button
                type="button"
                onClick={skipAllServices}
                className="flex cursor-pointer items-center gap-1 font-bold text-[#FFC300] transition-colors hover:text-white hover:underline"
                title="Süreç bölümüne ilerle"
              >
                <span>Sürece İlerle</span>
                <ArrowDown className="h-3 w-3" />
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
