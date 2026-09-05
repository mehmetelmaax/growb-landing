"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  MapPin, 
  Smartphone, 
  Palette, 
  Target, 
  Rocket, 
  Video, 
  PenTool, 
  Search, 
  ShoppingCart, 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Phone, 
  Sparkles, 
  Grid, 
  Hexagon, 
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Crown,
  Zap
} from "lucide-react";
import { ALL_13_SERVICES_DETAILED, ServiceDetail } from "@/data/services-detail-data";

const SERVICE_ICONS: Record<string, { emoji: string }> = {
  "web-tasarim-yazilim": { emoji: "💻" },
  "google-harita-yerel-seo": { emoji: "📍" },
  "sosyal-medya-yonetimi": { emoji: "📱" },
  "grafik-tasarim-kurumsal-kimlik": { emoji: "🎨" },
  "meta-reklam-yonetimi": { emoji: "🎯" },
  "google-ads-reklamlari": { emoji: "🚀" },
  "video-reels-ai-produksiyon": { emoji: "🎬" },
  "icerik-yazarligi-satis-metni": { emoji: "✍️" },
  "seo-organik-gorunurluk": { emoji: "🔍" },
  "e-ticaret-satis-sistemleri": { emoji: "🛒" },
  "crm-whatsapp-takip": { emoji: "💬" },
  "rakip-pazar-analizi": { emoji: "📊" },
  "aylik-buyume-danismanligi": { emoji: "👑" },
};

export const HoneycombHive: React.FC = () => {
  // 6 - 1 - 6 FORMATI BÖLÜMLERİ
  // Kanat 1: İlk 6 Hizmet (01-06: Dijital Varlık & Reklam)
  const wing1Services = ALL_13_SERVICES_DETAILED.slice(0, 6);

  // Merkez: 1 Ana Hizmet (13: Kovan Kalbi / Aylık Büyüme Danışmanlığı)
  const centerService = ALL_13_SERVICES_DETAILED.find((s) => s.slug === "aylik-buyume-danismanligi") || ALL_13_SERVICES_DETAILED[12];

  // Kanat 2: İkinci 6 Hizmet (07-12: Büyüme, Prodüksiyon & Otomasyon)
  const wing2Services = ALL_13_SERVICES_DETAILED.slice(6, 12);

  const [selectedSlug, setSelectedSlug] = useState<string>(centerService.slug);
  const [viewMode, setViewMode] = useState<"formation" | "grid">("formation");

  // Bilgi bölümü referansı
  const detailSectionRef = useRef<HTMLDivElement>(null);
  const formationTopRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  // 2. KULLANICI TALEBİ: Hangi hizmetin üzerine tıklarsa aşağı bilgi bölümüne indir
  // =========================================================================
  const handleSelectService = (slug: string) => {
    setSelectedSlug(slug);

    setTimeout(() => {
      if (detailSectionRef.current) {
        const yOffset = -90; // Navbar boşluğu
        const y = detailSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const scrollToFormationTop = () => {
    if (formationTopRef.current) {
      const yOffset = -90;
      const y = formationTopRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const activeService = ALL_13_SERVICES_DETAILED.find((s) => s.slug === selectedSlug) || centerService;
  const activeIcon = SERVICE_ICONS[activeService.slug] || { emoji: "🐝" };

  const waMessage = `Merhaba GrowB Dijital, ${activeService.title} hizmetiniz hakkında detaylı bilgi ve teklif almak istiyorum.`;
  const waUrl = `https://wa.me/905414842426?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="w-full relative" ref={formationTopRef}>
      {/* Üst Mod Seçimi: 6-1-6 Kovan Formasyonu vs Kart Listesi */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC300]" />
            <span>6 - 1 - 6 KOVAN DİZİLİMİ</span>
          </div>
          <span className="text-xs font-mono text-neutral-400 hidden md:inline">
            (6 Varlık Peteği + 1 Merkez Kovan + 6 Büyüme Peteği)
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-full">
          <button
            onClick={() => setViewMode("formation")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              viewMode === "formation"
                ? "bg-[#FFC300] text-[#0A0A0A] shadow-md scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Hexagon className="w-3.5 h-3.5" />
            <span>6 - 1 - 6 Formasyonu</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              viewMode === "grid"
                ? "bg-[#FFC300] text-[#0A0A0A] shadow-md scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Kart Listesi (13)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. KULLANICI TALEBİ: HİZMETLERİMİZİ 6 - 1 - 6 FORMATINDA GÖSTER          */}
      {/* ========================================================================= */}
      {viewMode === "formation" && (
        <div className="space-y-6 sm:space-y-8 my-6">
          
          {/* İPUCU BİLGİLENDİRME ROZETİ */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] shadow-[0_0_20px_rgba(255,195,0,0.15)]">
              <span className="animate-bounce">👇</span>
              <span>İncelemek istediğiniz peteğe tıklayın; ekran otomatik olarak aşağıdaki bilgi bölümüne kayar.</span>
            </span>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* BİRİNCİ 6'LI KANAT: DİJİTAL VARLIK & SATIŞ KANALLARI (01 - 06)   */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-3xl bg-neutral-950/60 border border-white/5 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <span className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-wider flex items-center gap-2">
                <span>▲ 1. KANAT // 6 DİJİTAL VARLIK & REKLAM KANALI</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                01 - 06 Numaralı Hizmetler
              </span>
            </div>

            {/* 6'LI PETEK SIRASI */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2">
              {wing1Services.map((service, idx) => {
                const isSelected = selectedSlug === service.slug;
                const iconData = SERVICE_ICONS[service.slug] || { emoji: "🐝" };
                const floatClass = idx % 2 === 0 ? "hex-float-odd" : "hex-float-even";

                return (
                  <div
                    key={service.slug}
                    onClick={() => handleSelectService(service.slug)}
                    className={`hex-cell w-[130px] h-[150px] sm:w-[155px] sm:h-[180px] md:w-[165px] md:h-[190px] ${floatClass} ${isSelected ? "active scale-105" : ""}`}
                    role="button"
                    tabIndex={0}
                    title="Detayını görmek için tıklayın (Aşağı bilgi bölümüne iner)"
                  >
                    <div className="hex-cell-inner">
                      <span className="text-[10px] sm:text-xs font-mono font-black text-[#FFC300] tracking-widest mb-1">
                        #{service.num}
                      </span>
                      <div className="text-2xl sm:text-3xl mb-1">
                        {iconData.emoji}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-white leading-tight px-1 line-clamp-2">
                        {service.title}
                      </span>
                      <span className="text-[9px] font-mono text-[#FFC300]/80 mt-1 uppercase tracking-tighter hidden sm:block">
                        {service.badge}
                      </span>
                      <div className="mt-1 flex items-center gap-0.5 text-[9px] font-mono text-white/50 group-hover:text-[#FFC300]">
                        <span>Detay</span>
                        <ArrowDown className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ORTADAKİ 1'Lİ MERKEZ: KOVANIN YÖNETİM MERKEZİ & STRATEJİ (13)   */}
          {/* ------------------------------------------------------------- */}
          <div className="flex flex-col items-center justify-center my-6 relative py-4">
            
            {/* Üst Bağlantı Işık Hattı */}
            <div className="w-px h-8 bg-gradient-to-b from-[#FFC300] to-transparent mb-2" />

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFC300]/20 border border-[#FFC300] text-xs font-mono font-black text-[#FFC300] uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(255,195,0,0.3)] animate-pulse">
              <Crown className="w-4 h-4 text-[#FFC300]" />
              <span>KOVANIN KALBİ // 1 MERKEZ YÖNETİM & STRATEJİ</span>
            </div>

            {/* MERKEZ DEV KOVAN PETEĞİ */}
            <div
              onClick={() => handleSelectService(centerService.slug)}
              className={`hex-cell w-[170px] h-[195px] sm:w-[210px] sm:h-[240px] md:w-[230px] md:h-[265px] transition-all duration-300 ${
                selectedSlug === centerService.slug ? "active scale-110" : "scale-105"
              }`}
              role="button"
              tabIndex={0}
              title="Merkez Kovan Stratejisi (Detay için tıklayın)"
            >
              <div className="hex-cell-inner !bg-[radial-gradient(circle_at_50%_25%,#3a2c00_0%,#1a1400_85%)] !border-2 !border-[#FFC300] shadow-[0_0_45px_rgba(255,195,0,0.4)]">
                <span className="text-xs sm:text-sm font-mono font-black text-[#FFC300] tracking-widest mb-1 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-[#FFC300]" />
                  <span>#{centerService.num} MERKEZ</span>
                </span>
                <div className="text-3xl sm:text-4xl mb-1">
                  👑
                </div>
                <span className="text-xs sm:text-sm font-black text-white leading-tight px-2 text-center">
                  {centerService.title}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-[#FFC300] mt-1 font-bold">
                  Birebir ROI Ortaklığı
                </span>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFC300] text-black text-[10px] font-black uppercase tracking-wider">
                  <span>Detayı Gör</span>
                  <ArrowDown className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Alt Bağlantı Işık Hattı */}
            <div className="w-px h-8 bg-gradient-to-t from-[#FFC300] to-transparent mt-4" />
          </div>

          {/* ------------------------------------------------------------- */}
          {/* İKİNCİ 6'LI KANAT: BÜYÜME, PRODÜKSİYON & OTOMASYON (07 - 12)    */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-3xl bg-neutral-950/60 border border-white/5 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <span className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-wider flex items-center gap-2">
                <span>▼ 2. KANAT // 6 BÜYÜME, PRODÜKSİYON & OTOMASYON MOTORU</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                07 - 12 Numaralı Hizmetler
              </span>
            </div>

            {/* 6'LI PETEK SIRASI */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2">
              {wing2Services.map((service, idx) => {
                const isSelected = selectedSlug === service.slug;
                const iconData = SERVICE_ICONS[service.slug] || { emoji: "🐝" };
                const floatClass = idx % 2 === 0 ? "hex-float-odd" : "hex-float-even";

                return (
                  <div
                    key={service.slug}
                    onClick={() => handleSelectService(service.slug)}
                    className={`hex-cell w-[130px] h-[150px] sm:w-[155px] sm:h-[180px] md:w-[165px] md:h-[190px] ${floatClass} ${isSelected ? "active scale-105" : ""}`}
                    role="button"
                    tabIndex={0}
                    title="Detayını görmek için tıklayın (Aşağı bilgi bölümüne iner)"
                  >
                    <div className="hex-cell-inner">
                      <span className="text-[10px] sm:text-xs font-mono font-black text-[#FFC300] tracking-widest mb-1">
                        #{service.num}
                      </span>
                      <div className="text-2xl sm:text-3xl mb-1">
                        {iconData.emoji}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-white leading-tight px-1 line-clamp-2">
                        {service.title}
                      </span>
                      <span className="text-[9px] font-mono text-[#FFC300]/80 mt-1 uppercase tracking-tighter hidden sm:block">
                        {service.badge}
                      </span>
                      <div className="mt-1 flex items-center gap-0.5 text-[9px] font-mono text-white/50 group-hover:text-[#FFC300]">
                        <span>Detay</span>
                        <ArrowDown className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* GÖRÜNÜM 2: 13 HİZMETİN KAPSAMLI KART IZGARASI */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {ALL_13_SERVICES_DETAILED.map((service) => {
            const iconData = SERVICE_ICONS[service.slug] || { emoji: "🐝" };
            return (
              <div
                key={service.slug}
                onClick={() => handleSelectService(service.slug)}
                className="bg-[#121212] hover:bg-[#161616] border border-white/10 hover:border-[#FFC300]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:scale-[1.02] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#FFC300]">
                      {service.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      {service.badge}
                    </span>
                  </div>

                  <div className="text-3xl mb-3">{iconData.emoji}</div>

                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2 group-hover:text-[#FFC300] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {service.tagline}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-neutral-300">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono font-bold text-[#FFC300]">
                    {service.metricsResult}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all">
                    <span>Aşağı İndir</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. KULLANICI TALEBİ: AŞAĞI BİLGİ BÖLÜMÜ (TIKLAYINCA BURAYA İNER)            */}
      {/* ========================================================================= */}
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
                  <span>WhatsApp'tan Hızlı Bilgi Al 💬</span>
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
                {/* Ciro / Hedef Metrik Rozeti */}
                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#FFC300]/40 shadow-xl">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Ölçülebilir Sonuç & Taahhüt:
                  </span>
                  <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-[#FFC300]">
                    <TrendingUp className="w-5 h-5" />
                    <span>{activeService.metricsResult}</span>
                  </div>
                </div>

                {/* 3 Aşamalı Süreç */}
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

                {/* Alt Eylemler */}
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

    </div>
  );
};
