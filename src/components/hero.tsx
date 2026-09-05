"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Send, 
  MessageSquare, 
  Globe, 
  Briefcase, 
  Phone,
  Zap,
  Lock,
  Unlock
} from "lucide-react";

// ============================================================
// 13 UZMANLIK ALANI POLEN / PETEK GEOMETRİSİ (1 MERKEZ + 12 DIŞ)
// Başlangıçta SADECE ORTASI GROWB (1/13) VAR VE SAYFA KİLİTLİ.
// Aşağı kaydırdıkça polenler sırayla gelir: 1 -> 2 -> 3 ... -> 13.
// 13 polen tamamlanınca kilit açılır ve sayfa aşağı kaymaya izin verilir.
// ============================================================
export interface HivePollen {
  id: string;
  slug: string;
  shortName: string;
  fullName: string;
  tagline: string;
  icon: string;
  cx: number;
  cy: number;
  order: number; // 1: Merkez Growb, 2-13: Sırayla eklenen polenler
  isCenter?: boolean;
}

export const HIVE_POLLENS: HivePollen[] = [
  // 1. MERKEZ KOVAN (İLK BAŞTA VAR OLAN MERKEZ)
  {
    id: "strateji",
    slug: "aylik-buyume-danismanligi",
    shortName: "Growb.",
    fullName: "GrowB Büyüme Stratejisi & Danışmanlık",
    tagline: "Kovanın yönetim merkezi: Kuruşuna kadar şeffaf ROI ve birebir ciro ortaklığı.",
    icon: "👑",
    cx: 260,
    cy: 230,
    order: 1,
    isCenter: true,
  },
  // 2. Polen: Google Ads
  {
    id: "google-ads",
    slug: "google-ads-reklamlari",
    shortName: "Google Ads",
    fullName: "Google Ads Arama & Harita Reklamları",
    tagline: "Satın alma anında en tepede çıkın; 500+ negatif filtreyle bütçe koruması.",
    icon: "🚀",
    cx: 260,
    cy: 148,
    order: 2,
  },
  // 3. Polen: Google Harita
  {
    id: "google-harita",
    slug: "google-harita-yerel-seo",
    shortName: "Google Harita",
    fullName: "Google Harita & Yerel SEO",
    tagline: "Bölgenizdeki her aramada haritalarda 1. sıraya oturun, doğrudan aranın.",
    icon: "📍",
    cx: 331,
    cy: 189,
    order: 3,
  },
  // 4. Polen: Meta Reklam
  {
    id: "meta",
    slug: "meta-reklam-yonetimi",
    shortName: "Meta Reklam",
    fullName: "Meta Reklam Yönetimi (Instagram & FB)",
    tagline: "Doğrudan WhatsApp mesajı ve sıcak müşteri getiren hedefli reklamlar.",
    icon: "🎯",
    cx: 331,
    cy: 271,
    order: 4,
  },
  // 5. Polen: SEO
  {
    id: "seo",
    slug: "seo-organik-gorunurluk",
    shortName: "SEO",
    fullName: "SEO & Organik Görünürlük",
    tagline: "Reklam vermeyi bıraktığınızda bile durmayan kesintisiz müşteri akışı.",
    icon: "🔍",
    cx: 260,
    cy: 312,
    order: 5,
  },
  // 6. Polen: CRM & WhatsApp
  {
    id: "crm",
    slug: "crm-whatsapp-takip",
    shortName: "CRM & WhatsApp",
    fullName: "CRM & WhatsApp Satış Otomasyonu",
    tagline: "Gece gelen müşteriyi bile kaçırmayan 7/24 akıllı karşılama botu.",
    icon: "💬",
    cx: 189,
    cy: 271,
    order: 6,
  },
  // 7. Polen: Video & Reels
  {
    id: "video",
    slug: "video-reels-ai-produksiyon",
    shortName: "Video & Reels",
    fullName: "Video, Reels & AI Prodüksiyon",
    tagline: "Algoritmaları fetheden, kaydırıp geçilmeyen dinamik dikey videolar.",
    icon: "🎬",
    cx: 189,
    cy: 189,
    order: 7,
  },
  // 8. Polen: E-Ticaret
  {
    id: "eticaret",
    slug: "e-ticaret-satis-sistemleri",
    shortName: "E-Ticaret",
    fullName: "E-Ticaret & Satış Sistemleri",
    tagline: "7/24 online sipariş toplayan, kargo ve sanal POS entegreli mağaza motoru.",
    icon: "🛒",
    cx: 402,
    cy: 230,
    order: 8,
  },
  // 9. Polen: İçerik Yazarlığı
  {
    id: "icerik",
    slug: "icerik-yazarligi-satis-metni",
    shortName: "İçerik Yazarlığı",
    fullName: "İçerik Yazarlığı & Satış Metni",
    tagline: "Ziyaretçiyi sayfada tutan ve tek tıkla satın almaya ikna eden metinler.",
    icon: "✍️",
    cx: 118,
    cy: 230,
    order: 9,
  },
  // 10. Polen: Rakip Analizi
  {
    id: "rakip",
    slug: "rakip-pazar-analizi",
    shortName: "Rakip Analizi",
    fullName: "Pazar, Sektör & Rakip Analizi",
    tagline: "Rakiplerinizin nerelerden müşteri aldığını ve açıklarını ortaya çıkaran röntgen.",
    icon: "📊",
    cx: 331,
    cy: 107,
    order: 10,
  },
  // 11. Polen: Grafik Tasarım
  {
    id: "grafik",
    slug: "grafik-tasarim-kurumsal-kimlik",
    shortName: "Grafik Tasarım",
    fullName: "Grafik Tasarım & Kurumsal Kimlik",
    tagline: "Akılda kalıcı profesyonel logo, renk paleti ve tescile hazır marka kimliği.",
    icon: "🎨",
    cx: 189,
    cy: 107,
    order: 11,
  },
  // 12. Polen: Web Tasarım
  {
    id: "web-tasarim",
    slug: "web-tasarim-yazilim",
    shortName: "Web Tasarım",
    fullName: "Web Tasarım & Satış Altyapısı",
    tagline: "1.1 saniyede açılan, mobil kusursuz ve doğrudan sıcak müşteri üreten siteler.",
    icon: "💻",
    cx: 189,
    cy: 353,
    order: 12,
  },
  // 13. Polen: Sosyal Medya
  {
    id: "sosyal-medya",
    slug: "sosyal-medya-yonetimi",
    shortName: "Sosyal Medya",
    fullName: "Sosyal Medya Yönetimi",
    tagline: "Marka prestijinizi zirveye taşıyan, güven veren düzenli içerik akışı.",
    icon: "📱",
    cx: 331,
    cy: 353,
    order: 13,
  },
];

function getHexPath(cx: number, cy: number, r: number = 44): string {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push([x, y]);
  }
  return `M ${points.map((p) => p.join(",")).join(" L ")} Z`;
}

export const Hero: React.FC = () => {
  // Başlangıçta sadece merkez Growb var (1/13) ve sayfa kilitli
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [hoveredPollen, setHoveredPollen] = useState<HivePollen | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  const revealedCountRef = useRef(1);
  const isCompletedRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    revealedCountRef.current = revealedCount;
  }, [revealedCount]);

  useEffect(() => {
    isCompletedRef.current = isCompleted;
  }, [isCompleted]);

  // =========================================================================
  // HERO KİLİT MEKANİZMASI: Fiziksel Overflow & Height Kilidi
  // 13 Polen Dolana Kadar Sayfa %100 Kilitlidir.
  // =========================================================================
  useEffect(() => {
    // Tarayıcının sayfayı otomatik aşağı kaydırmasını engelle
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.scrollY > 0 && !isCompletedRef.current) {
        window.scrollTo(0, 0);
      }
    }

    const lock = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
    };

    const unlock = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";
    };

    // Henüz 13 polen tamamlanmadıysa fiziksel overflow kilidini etkinleştir!
    if (!isCompleted) {
      lock();
    } else {
      unlock();
    }

    const handleWheel = (e: WheelEvent) => {
      // 13 polen tamamlandıysa serbest bırak
      if (isCompletedRef.current) return;

      // Kilit devredeyken sayfanın aşağı kaymasını fiziksel olarak engelle
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 160) return;

      if (e.deltaY > 0) {
        // AŞAĞI KAYDIRMA: 1 polen ekle (1 -> 2 -> ... -> 13)
        lastWheelTimeRef.current = now;
        setRevealedCount((prev) => {
          const next = Math.min(13, prev + 1);
          if (next === 13) {
            // 13 polen doldu! 400ms sonra kilit çözülür
            setTimeout(() => {
              setIsCompleted(true);
              unlock();
            }, 400);
          }
          return next;
        });
      } else if (e.deltaY < 0) {
        // YUKARI KAYDIRMA: 1 polen geri al
        lastWheelTimeRef.current = now;
        setRevealedCount((prev) => Math.max(1, prev - 1));
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isCompletedRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isCompletedRef.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 25) {
        // Aşağı kaydırma
        setRevealedCount((prev) => {
          const next = Math.min(13, prev + 1);
          if (next === 13) {
            setTimeout(() => {
              setIsCompleted(true);
              unlock();
            }, 400);
          }
          return next;
        });
      } else if (deltaY < -25) {
        setRevealedCount((prev) => Math.max(1, prev - 1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (isCompletedRef.current) {
        unlock();
      }
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isCompleted]);

  // Kovanı Doldur Kısayolu
  const completeInstantly = () => {
    setRevealedCount(13);
    setIsCompleted(true);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.style.height = "";
    document.body.style.height = "";
  };

  // Form State
  const [formData, setFormData] = useState({ siteUrl: "", sector: "", phone: "", contactName: "" });
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.siteUrl || !formData.phone || !kvkkConsent) return;
    setIsSubmittingLead(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DETAY_AL",
          name: formData.contactName || "Yetkili",
          phone: formData.phone,
          siteUrl: formData.siteUrl,
          sector: formData.sector || "Belirtilmedi",
          source: "Hero Ekranı (Ücretsiz Analiz & Detay Al Modalı)",
          kvkkConsent: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Form iletilemedi. Lütfen bilgilerinizi kontrol ediniz.");
      }
    } catch (err) {
      console.error("Hero lead submission error:", err);
      alert("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const getWaReportUrl = () => {
    const msg = `Merhaba GrowB Dijital, sitem ve sektörüm için Ücretsiz Analiz Raporu talep ediyorum.\n\n🌐 Web Sitesi / İşletme: ${formData.siteUrl}\n🏢 Sektör: ${formData.sector || "Belirtilmedi"}\n📞 Telefon: ${formData.phone}\n👤 Yetkili: ${formData.contactName || "Yetkili"}`;
    return `https://wa.me/905414842426?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Arka Plan Işıkları */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#FFC300]/[0.06] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#FFC300]/[0.04] rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* SOL SÜTUN: METİNLER & AKSİYONLAR */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          
          {/* Üst Rozet & Telefon */}
          <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFC300]/30 text-xs font-mono font-bold tracking-wider text-[#FFC300] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC300] animate-pulse" />
              <span>GROWB DİJİTAL BÜYÜME AJANSI</span>
            </div>

            <a
              href="tel:05414842426"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors shadow-sm"
              title="Doğrudan Arayın: 0541 484 24 26"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-bold text-white tracking-wide">0541 484 24 26</span>
            </a>
          </div>

          {/* Başlık */}
          <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black tracking-[-0.035em] leading-[1.08] text-white font-sans mb-5 sm:mb-6">
            Markanızı dijitalde{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
              büyütüyoruz.
            </span>
          </h1>

          {/* Açıklama */}
          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-xl leading-relaxed font-normal mb-6 sm:mb-8 font-sans">
            Strateji, reklam yönetimi, içerik üretimi, SEO ve satış altyapısı.{" "}
            <strong className="text-white font-semibold">13 uzmanlık alanı tek çatı altında</strong> — ayrı ayrı tedarikçiyle uğraşmayın.
          </p>

          {/* Aksiyon Butonları */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-8 sm:mb-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setIsAnalysisModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-sm sm:text-base tracking-tight shadow-[0_10px_35px_rgba(255,195,0,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Ücretsiz Analiz İsteyin</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:05414842426"
              className="inline-flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#FFC300] text-white transition-all shadow-md group cursor-pointer hover:scale-105 active:scale-95"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFC300] flex items-center justify-center text-[#0A0A0A] shadow-sm group-hover:rotate-12 transition-transform">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-neutral-400">Hemen Arayın / WhatsApp</span>
                <span className="text-xs sm:text-base font-black tracking-tight text-white group-hover:text-[#FFC300] transition-colors font-mono">
                  0541 484 24 26
                </span>
              </div>
            </a>

            <a
              href="#hizmetler"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-300 hover:text-[#FFC300] transition-colors group px-2 py-2"
            >
              <span>Hizmetleri görün</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Güven Damgası */}
          <div className="pt-4 sm:pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 w-full text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Türkiye&apos;nin her yerinden markalarla çalışıyoruz.</span>
            </div>
            <a
              href="tel:05414842426"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-[#FFC300] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>Doğrudan İletişim: <strong className="text-white">0541 484 24 26</strong></span>
            </a>
          </div>

        </div>

        {/* SAĞ SÜTUN: GROWB KOVANI (ORTASI GROWB BAŞLAR, SCROLL İLE 13 POLEN SIRAYLA GELİR) */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          
          {/* Durum Rozeti & Canlı Kilit Göstergesi */}
          <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-2 text-xs font-mono text-neutral-300 select-none">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <strong className="text-emerald-400">✨ Kovan tamamlandı! Sayfa akışı serbest ↓</strong>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#FFC300] animate-pulse" />
                  <span>
                    🐝 GrowB Kovanı Örülüyor: <strong className="text-[#FFC300] text-sm">{revealedCount}/13</strong>{" "}
                    <span className="text-neutral-400">(Aşağı kaydırın)</span>
                  </span>
                </>
              )}
            </div>

            {!isCompleted && (
              <button
                type="button"
                onClick={completeInstantly}
                className="text-[11px] text-[#FFC300] hover:underline flex items-center gap-1 font-bold cursor-pointer transition-colors"
                title="Kovanı anında tamamla ve kilidi aç"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Kovanı Doldur</span>
              </button>
            )}
          </div>

          {/* MASAÜSTÜ & MOBİL: 13 POLEN KOVAN ÇİZİMİ */}
          <div className="relative w-full max-w-[520px] aspect-[520/450]">
            <svg
              viewBox="0 0 520 450"
              className="w-full h-full overflow-visible select-none"
            >
              <defs>
                {/* Merkez GrowB Kovanı Altın Gradyanı */}
                <radialGradient id="centerGrowbGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="60%" stopColor="#FFC300" />
                  <stop offset="100%" stopColor="#E69500" />
                </radialGradient>

                {/* Altın Parıltı Efekti */}
                <filter id="pollenGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FFC300" floodOpacity="0.45" />
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* 1. Henüz Örülmemiş Polenlerin Taslak Çizgisi (Blueprint) */}
              {HIVE_POLLENS.map((pollen) => {
                if (pollen.order <= revealedCount) return null;
                const pathData = getHexPath(pollen.cx, pollen.cy, 44);
                return (
                  <path
                    key={`blueprint-${pollen.id}`}
                    d={pathData}
                    fill="rgba(255, 195, 0, 0.015)"
                    stroke="rgba(255, 195, 0, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    className="transition-opacity duration-300"
                  />
                );
              })}

              {/* 2. Scroll ile Sırayla Gelen Polenler */}
              {HIVE_POLLENS.map((pollen) => {
                const isRevealed = pollen.order <= revealedCount;
                if (!isRevealed) return null;

                const isHovered = hoveredPollen?.id === pollen.id;
                const r = pollen.isCenter ? 48 : 44;
                const pathData = getHexPath(pollen.cx, pollen.cy, r);

                return (
                  <Link
                    key={pollen.id}
                    href={`/hizmetler/${pollen.slug}`}
                    aria-label={`${pollen.fullName} — hizmet ${pollen.order}/13`}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredPollen(pollen)}
                    onMouseLeave={() => setHoveredPollen(null)}
                  >
                    <g
                      filter="url(#pollenGlow)"
                      style={{
                        transformOrigin: `${pollen.cx}px ${pollen.cy}px`,
                        animation: "popInPollen 0.38s cubic-bezier(0.16, 1, 0.3, 1) both",
                      }}
                      className="transition-transform duration-200 group-hover:scale-105"
                    >
                      {/* Petek / Polen Gövdesi */}
                      <path
                        d={pathData}
                        fill={
                          pollen.isCenter
                            ? (isHovered ? "#FFFFFF" : "url(#centerGrowbGrad)")
                            : (isHovered ? "#FFC300" : "#141414")
                        }
                        stroke={
                          pollen.isCenter
                            ? "#FFFFFF"
                            : (isHovered ? "#FFFFFF" : "rgba(255, 195, 0, 0.5)")
                        }
                        strokeWidth={pollen.isCenter ? "3" : isHovered ? "2.5" : "1.4"}
                        className="transition-colors duration-200 shadow-xl"
                      />

                      {/* Polen İçi İçerik */}
                      {pollen.isCenter ? (
                        <>
                          <text
                            x={pollen.cx}
                            y={pollen.cy - 7}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#0A0A0A"
                            className="font-black font-sans text-[20px] select-none pointer-events-none"
                          >
                            Growb
                          </text>
                          <circle
                            cx={pollen.cx + 34}
                            cy={pollen.cy - 12}
                            r="3.5"
                            fill="#FFFFFF"
                            className="animate-pulse"
                          />
                          <text
                            x={pollen.cx}
                            y={pollen.cy + 16}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#1A1A1A"
                            className="font-mono font-black text-[9px] uppercase tracking-[0.16em] select-none pointer-events-none"
                          >
                            BÜYÜME MERKEZİ
                          </text>
                        </>
                      ) : (
                        <>
                          <text
                            x={pollen.cx}
                            y={pollen.cy - 9}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-[17px] select-none pointer-events-none"
                          >
                            {pollen.icon}
                          </text>
                          <text
                            x={pollen.cx}
                            y={pollen.cy + 14}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={isHovered ? "#0A0A0A" : "#FFFFFF"}
                            className="font-mono font-bold text-[9.5px] select-none pointer-events-none transition-colors duration-200"
                          >
                            {pollen.shortName}
                          </text>
                        </>
                      )}
                    </g>
                  </Link>
                );
              })}
            </svg>
          </div>

          {/* Alt Kovan Açıklaması / Hover Bilgisi */}
          <div className="mt-3 text-center min-h-[22px] text-xs font-mono text-neutral-400">
            {hoveredPollen ? (
              <span className="text-white">
                👉 <strong className="text-[#FFC300]">{hoveredPollen.fullName}:</strong> {hoveredPollen.tagline}
              </span>
            ) : isCompleted ? (
              <span className="text-emerald-400 font-bold">
                ✓ 13/13 Polen tamamlandı! Aşağı kaydırarak devam edebilirsiniz.
              </span>
            ) : (
              <span className="text-neutral-400">
                Fare tekerleğini aşağı kaydırın; her hamlede bir arı poleni eklenir ({13 - revealedCount} polen kaldı).
              </span>
            )}
          </div>

        </div>

      </div>

      {/* ÜCRETSİZ ANALİZ MODALI */}
      <AnimatePresence>
        {isAnalysisModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAnalysisModalOpen(false)}
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
                onClick={() => setIsAnalysisModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFC300] uppercase mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>ÜCRETSİZ DİJİTAL ANALİZ RAPORU</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    Sitenizi & Rakiplerinizi İnceleyelim
                  </h3>
                  <p className="text-sm text-neutral-400 mb-6">
                    Web sitenizin hız, Google Harita SEO ve reklam açıklarını 15 dakikada tespit edip WhatsApp üzerinden ücretsiz raporlayalım.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Web Siteniz veya İşletme Adınız *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="örn: www.ornekisletme.com veya Güven Nakliyat"
                        value={formData.siteUrl}
                        onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Sektörünüz
                      </label>
                      <input
                        type="text"
                        placeholder="örn: Nakliyat, Klinik, Avukat, E-Ticaret"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Yetkili Adı Soyadı
                      </label>
                      <input
                        type="text"
                        placeholder="Adınız ve Soyadınız"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* KVKK Onay Kutusu */}
                    <label className="flex items-start gap-2 text-xs text-neutral-400 cursor-pointer select-none pt-1">
                      <input
                        type="checkbox"
                        required
                        checked={kvkkConsent}
                        onChange={(e) => setKvkkConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded bg-white/5 border border-white/20 text-[#FFC300] focus:ring-[#FFC300] accent-[#FFC300]"
                      />
                      <span>
                        <Link href="/kvkk-aydinlatma-metni" target="_blank" className="text-white underline hover:text-[#FFC300]">
                          KVKK Aydınlatma Metni
                        </Link>
                        &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza veriyorum. *
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmittingLead || !kvkkConsent}
                      className="w-full py-3.5 rounded-xl bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-sm tracking-tight transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingLead ? (
                        <span>Rapor Talebi Alınıyor...</span>
                      ) : (
                        <>
                          <span>Ücretsiz Analiz Raporunu İlet</span>
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
                    İşletmenizin web ve dijital varlığı analiz sırasına alındı. Beklemek istemiyorsanız doğrudan kurucumuzla WhatsApp üzerinden görüşebilirsiniz.
                  </p>
                  <a
                    href={getWaReportUrl()}
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
