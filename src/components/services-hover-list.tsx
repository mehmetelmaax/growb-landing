"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  Phone,
  MessageSquare,
  Lock,
  Unlock,
  ArrowDown
} from "lucide-react";
import { ALL_13_SERVICES_DETAILED, ServiceDetail } from "@/data/services-detail-data";

export const ServicesHoverList: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isSectionLocked, setIsSectionLocked] = useState<boolean>(false);
  
  const currentIndexRef = useRef(0);
  const isLockedRef = useRef(false);
  const lastStepTimeRef = useRef(0);
  const totalServices = ALL_13_SERVICES_DETAILED.length;

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isLockedRef.current = isSectionLocked;
  }, [isSectionLocked]);

  const goToCard = useCallback((targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= totalServices) return;
    setDirection(targetIdx > currentIndexRef.current ? 1 : -1);
    setCurrentIndex(targetIdx);
  }, [totalServices]);

  // =========================================================================
  // 13 HİZMET KİLİT MEKANİZMASI: Fiziksel Overflow Kilidi!
  // Ekrana gelindiğinde sayfa %100 kilitlenir, her kaydırmada 1 kart flip yapar.
  // 13. Hizmet bitene kadar sayfa ASLA aşağı inemez!
  // =========================================================================
  const isCompletedServicesRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let resetTimer: NodeJS.Timeout | null = null;

    const lockPage = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      isLockedRef.current = true;
      setIsSectionLocked(true);
    };

    const unlockPage = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      isLockedRef.current = false;
      setIsSectionLocked(false);
    };

    // Scroll kontrolü: Kullanıcı sayfayı kaydırıp Hizmetler bölümüne ulaştığında
    const handleScrollCheck = () => {
      if (isCompletedServicesRef.current) return;
      const rect = sectionEl.getBoundingClientRect();
      // Bölüm ekranda tam görünür olduğunda (tepeye 60px ve altı ekranda)
      if (rect.top <= 60 && rect.bottom >= window.innerHeight * 0.4) {
        if (!isLockedRef.current) {
          sectionEl.scrollIntoView({ behavior: "auto", block: "start" });
          lockPage();
        }
      }
    };

    window.addEventListener("scroll", handleScrollCheck, { passive: true });

    const handleWheel = (e: WheelEvent) => {
      if (isCompletedServicesRef.current) return;

      const rect = sectionEl.getBoundingClientRect();
      const isInSection = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.4;

      if (!isInSection && !isLockedRef.current) return;

      // Bölümdeyken sayfanın aşağı/yukarı kaçmasını fiziksel olarak engelle!
      e.preventDefault();

      // Eğer henüz kilitli değilse hemen kilitle
      if (!isLockedRef.current) {
        sectionEl.scrollIntoView({ behavior: "auto", block: "start" });
        lockPage();
      }

      const now = Date.now();
      if (now - lastStepTimeRef.current < 200) return;

      if (e.deltaY > 0) {
        // AŞAĞI KAYDIRMA -> Sıradaki kart
        lastStepTimeRef.current = now;
        if (currentIndexRef.current < totalServices - 1) {
          const next = currentIndexRef.current + 1;
          goToCard(next);
        } else {
          // 13. KARTTA ve tekrar aşağı kaydırdı -> KİLİT AÇILIR, AŞAĞI SAYFAYA İZİN VERİLİR!
          isCompletedServicesRef.current = true;
          unlockPage();
        }
      } else if (e.deltaY < 0) {
        // YUKARI KAYDIRMA -> Önceki kart
        lastStepTimeRef.current = now;
        if (currentIndexRef.current > 0) {
          const prev = currentIndexRef.current - 1;
          goToCard(prev);
        } else {
          // 1. KARTTA ve yukarı kaydırdı -> Yukarı serbestçe çıkabilsin
          unlockPage();
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isLockedRef.current && !isCompletedServicesRef.current) {
        e.preventDefault();
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLockedRef.current || isCompletedServicesRef.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 30) {
        // Aşağı kaydırma
        if (currentIndexRef.current < totalServices - 1) {
          goToCard(currentIndexRef.current + 1);
        } else {
          isCompletedServicesRef.current = true;
          unlockPage();
        }
      } else if (deltaY < -30) {
        if (currentIndexRef.current > 0) {
          goToCard(currentIndexRef.current - 1);
        } else {
          unlockPage();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (isLockedRef.current) {
        unlockPage();
      }
      window.removeEventListener("scroll", handleScrollCheck);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [goToCard, totalServices]);

  // "Tümünü atla ↓" Butonu
  const skipAllServices = () => {
    setIsSectionLocked(false);
    isLockedRef.current = false;
    goToCard(totalServices - 1);
    const nextEl = document.getElementById("randevu-al") || document.getElementById("iletisim");
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detay Al Modalı
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailForm, setDetailForm] = useState({ name: "", phone: "", note: "" });
  const [isDetailSubmitting, setIsDetailSubmitting] = useState(false);
  const [isDetailSubmitted, setIsDetailSubmitted] = useState(false);

  const activeService: ServiceDetail = ALL_13_SERVICES_DETAILED[currentIndex] || ALL_13_SERVICES_DETAILED[0];

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailForm.phone) return;
    setIsDetailSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DETAY_AL",
          name: detailForm.name || "Belirtilmedi",
          phone: detailForm.phone,
          service: activeService.title,
          notes: detailForm.note || "",
          source: `Hizmetler Bölümü (#${activeService.num} ${activeService.title} Detay Al Modalı)`,
        }),
      });
    } catch (err) {
      console.error("Detail lead submission error:", err);
    } finally {
      setIsDetailSubmitting(false);
      setIsDetailSubmitted(true);
    }
  };

  const getWaServiceUrl = () => {
    const msg = `Merhaba GrowB Dijital, "${activeService.title}" hizmetiniz hakkında detaylı bilgi ve teklif almak istiyorum.\n\n👤 Yetkili: ${detailForm.name || "Yetkili"}\n📞 Tel: ${detailForm.phone || ""}`;
    return `https://wa.me/905414842426?text=${encodeURIComponent(msg)}`;
  };

  // 3D Kart Çevirme Animasyonu
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
    <section 
      id="hizmetler" 
      ref={sectionRef}
      className="relative min-h-[92vh] sm:min-h-screen bg-[#0A0A0A] text-white border-t border-white/10 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Arka Plan Nokta Deseni & Işık Halesi */}
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
          
          {/* SOL SÜTUN: BAŞLIK, METİN, KİLİT DURUMU VE SAYFA KONTROLLERİ */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-4 sm:space-y-6">
            
            {/* Üst Rozet */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold tracking-wider text-[#FFC300] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>13 UZMANLIK ALANIMIZ // DİJİTAL BÜYÜME</span>
            </div>

            {/* Başlık */}
            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[2.85rem] text-white leading-[1.12] tracking-[-0.03em]">
              Dijitaldeki tüm işlerinizi üstlenen; markanızı sektörün{" "}
              <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
                en çok ciro üreten liderine
              </span>{" "}
              dönüştüren pazarlama ortağınızız.
            </h2>

            {/* Açıklama */}
            <p className="text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed font-sans font-normal max-w-xl">
              Geleneksel ajansların dağınık ve yavaş süreçlerini unutun. Google & Meta satış reklamlarından yerel harita SEO hakimiyetine, 4K video ve Reels prodüksiyonundan WhatsApp CRM satış otomasyonuna kadar tüm dijital işlerinizi tek merkezden yönetiyoruz.
            </p>

            {/* Kilit Durumu, Sayaç & Kontroller */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full">
              
              {/* Sayfa Sayacı: "01 / 13 Hizmet" */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                <span className="font-black text-[#FFC300] text-sm tracking-wide">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-neutral-500">/</span>
                <span className="text-neutral-300 font-bold">13 Hizmet</span>
              </div>

              {/* İnce İlerleme Çubuğu */}
              <div className="w-24 sm:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFC300] transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / totalServices) * 100}%` }}
                />
              </div>

              {/* Ok Butonları */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToCard(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  aria-label="Önceki hizmet"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 disabled:opacity-25 disabled:hover:bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => goToCard(currentIndex + 1)}
                  disabled={currentIndex === totalServices - 1}
                  aria-label="Sonraki hizmet"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 disabled:opacity-25 disabled:hover:bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Kilit Bilgisi & Tümünü Atla */}
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

          {/* SAĞ SÜTUN: AYNI SAYFA İÇİNDE SIRAYLA GEÇEN 13 HİZMET KARTI */}
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
                      onClick={() => {
                        setIsDetailSubmitted(false);
                        setIsDetailModalOpen(true);
                      }}
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

        </div>
      </div>

      {/* HİZMET DETAY AL POPUP MODALI */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 select-text"
            >
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {!isDetailSubmitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFC300] uppercase mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>HİZMET DETAYI & TEKLİF FORMU</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    {activeService.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-6">
                    Bu uzmanlık alanımız hakkında detaylı bilgi, kapsam ve işletmenize özel teklif almak için numaranızı iletin.
                  </p>

                  <form onSubmit={handleDetailSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Yetkili Adı Soyadı
                      </label>
                      <input
                        type="text"
                        placeholder="Adınız ve Soyadınız"
                        value={detailForm.name}
                        onChange={(e) => setDetailForm({ ...detailForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        WhatsApp Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="05XX XXX XX XX"
                        value={detailForm.phone}
                        onChange={(e) => setDetailForm({ ...detailForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Varsa Özel Notunuz
                      </label>
                      <textarea
                        rows={2}
                        placeholder="İşletmeniz veya beklentiniz hakkında kısa not..."
                        value={detailForm.note}
                        onChange={(e) => setDetailForm({ ...detailForm, note: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isDetailSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-sm tracking-tight transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isDetailSubmitting ? (
                        <span>İletiliyor...</span>
                      ) : (
                        <>
                          <span>Detay ve Teklif İste</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Talebiniz Alındı!</h3>
                  <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                    <strong>{activeService.title}</strong> talebiniz doğrudan yetkili ekibimize iletildi. En kısa sürede WhatsApp veya telefon ile geri dönüş yapılacaktır.
                  </p>
                  <a
                    href={getWaServiceUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm tracking-tight transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp ile Hızlı Bağlan</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
