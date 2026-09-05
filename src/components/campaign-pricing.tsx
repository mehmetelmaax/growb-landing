import React from "react";
import { Check, Sparkles, ArrowUpRight, Flame, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";

export const CampaignPricing: React.FC = () => {
  const getWaLink = (campaignName: string, price: string) => {
    const msg = `Merhaba GrowB Dijital, "${campaignName}" kampanyanız (${price}) için başvurmak ve yerimi ayırtmak istiyorum.`;
    return SITE_CONFIG.getWhatsappUrl(msg);
  };

  return (
    <section id="kampanyalar" className="w-full relative py-4 sm:py-6">
      {/* Üst Vurgu Başlığı */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] uppercase mb-4 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-[#FFC300] animate-pulse" />
          <span>SINIRLI KONTENJAN // DÖNEMSEL TANIŞMA KAMPANYALARI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 font-sans">
          Büyümeye Hazır Markalar İçin{" "}
          <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
            3 Özel Kampanya.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
          İlk peteğinizi riske girmeden örmeniz için maliyetleri düşürdük, hediye hizmetlerle değerini ikiye katladık.
        </p>
      </div>

      {/* 3 KOLONLU ANCHORING / DECOY DÜZENİ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto mb-6">
        
        {/* ==================================================== */}
        {/* KAMPANYA 2 — "VİTRİN PETEĞİ" (SOLDA, KÜÇÜK BLOK)     */}
        {/* ==================================================== */}
        <div className="lg:col-span-4 bg-[#111111] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl self-center">
          <div>
            {/* Üst Etiket */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                GİRİŞ TEKLİFİ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300">
                5 Günde Teslim
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Küçük başlayın, sonra büyütün.
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-5">
              Tek sayfa, 5 günde. Beğenirseniz tam siteye geçin, ödediğiniz düşülsün.
            </p>

            {/* Fiyat */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-5">
              <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1">
                <span>₺15.000</span>
                <span className="text-xs font-mono text-neutral-400 font-normal">+KDV</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                Tek seferlik kurulum bedeli
              </span>
            </div>

            {/* Vurgu Kutusu */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs font-medium leading-snug mb-5">
              💡 <strong>3 ay içinde</strong> tam siteye geçerseniz ödediğiniz <strong>₺15.000</strong> fiyattan düşülür.
            </div>

            {/* Paket İçeriği */}
            <div className="space-y-2.5 text-xs text-neutral-300 mb-6">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                Paket İçeriği:
              </span>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Tek sayfa dönüşüm odaklı site (hizmetler, referanslar, iletişim)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Google Harita profili kurulumu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>WhatsApp butonu ve iletişim formu entegrasyonu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Google Analytics kurulumu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>5 iş gününde anahtar teslim</span>
              </div>
            </div>
          </div>

          <a
            href={getWaLink("Vitrin Peteği Giriş Teklifi", "₺15.000")}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Vitrinimi Kurun</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* ==================================================== */}
        {/* KAMPANYA 1 — "İLK PETEK" (ORTADA, EN BÜYÜK VE VURGULU)*/}
        {/* ==================================================== */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#1C1704] via-[#141208] to-[#0A0A0A] border-2 border-[#FFC300] rounded-3xl p-6 sm:p-9 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_70px_rgba(255,195,0,0.22)] relative lg:-translate-y-3 z-10">
          
          {/* Üst Kıtlık / Kontenjan Rozeti */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#FFC300] text-[#0A0A0A] text-xs font-mono font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 fill-black" />
            <span>BU AY 5 MARKA // 3 KONTENJAN KALDI</span>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pt-2">
              <span className="text-xs font-mono font-bold text-[#FFC300] uppercase tracking-wider">
                ANA KAMPANYA // TANIŞMA FIRSATI 🐝
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFC300]/20 border border-[#FFC300]/40 text-[10px] font-mono font-bold text-[#FFC300]">
                12 Günde Teslim
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 font-sans">
              Yeni tanışıyoruz. İlk peteğinizi biz örelim.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-medium">
              Markanızın dijital temeli tek seferde kuruluyor: web siteniz, logonuz, Google Harita profiliniz ve WhatsApp altyapınız. 12 günde teslim.
            </p>

            {/* İndirimli Fiyat Kutusu */}
            <div className="p-5 rounded-2xl bg-black/60 border border-[#FFC300]/40 mb-5 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-base text-neutral-400 line-through font-mono">₺39.900</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
                  -₺15.000 İndirim
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#FFC300] tracking-tight flex items-baseline gap-1">
                <span>₺24.900</span>
                <span className="text-xs font-mono text-neutral-400 font-normal">+KDV</span>
              </div>
            </div>

            {/* Vurgu Kutusu: 28.500 TL Hediye */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#FFC300]/20 to-amber-500/10 border border-[#FFC300]/50 text-[#FFC300] text-xs sm:text-sm font-bold leading-snug mb-4 shadow-sm flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#FFC300] shrink-0" />
              <span>₺28.500 değerinde ek hizmet hediye.</span>
            </div>

            {/* Şart Kutusu */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-mono leading-relaxed mb-6">
              📌 <strong>Şart:</strong> 3 aylık Temel büyüme paketi (₺14.900/ay) ile birlikte geçerlidir.
            </div>

            {/* Paket İçeriği */}
            <div className="space-y-2.5 text-xs text-neutral-200 mb-8">
              <span className="text-[10px] font-mono font-bold text-[#FFC300] uppercase tracking-wider block">
                Dahil Olan Tüm Hizmetler:
              </span>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span><strong>5-6 sayfa</strong> mobil uyumlu web sitesi</span>
              </div>
              <div className="flex items-start gap-2 bg-[#FFC300]/10 p-2 rounded-lg border border-[#FFC300]/20">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span><strong>Profesyonel logo tasarımı</strong> (Temel yerine Profesyonel — <em>ücretsiz yükseltme, ₺7.500 değerinde</em>)</span>
              </div>
              <div className="flex items-start gap-2 bg-[#FFC300]/10 p-2 rounded-lg border border-[#FFC300]/20">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span><strong>Google Harita profili kurulumu</strong> (<em>hediye, ₺7.500 değerinde</em>)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span>WhatsApp ve iletişim formu entegrasyonu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Google Analytics ve Meta Pixel kurulumu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Sayfa satış metinlerinin profesyonel yazımı</span>
              </div>
              <div className="flex items-start gap-2 bg-[#FFC300]/10 p-2 rounded-lg border border-[#FFC300]/20">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span><strong>3 ay ücretsiz site bakımı</strong> (<em>hediye, ₺13.500 değerinde</em>)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Teslimde 1 saat canlı kullanım ve yönetim eğitimi</span>
              </div>
            </div>
          </div>

          <a
            href={getWaLink("İlk Petek Tanışma Fırsatı", "₺24.900")}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,195,0,0.35)] hover:scale-105"
          >
            <span>Yerimi Ayırt</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>

        {/* ==================================================== */}
        {/* KAMPANYA 3 — "KOVAN TAM DOLSUN" (SAĞDA, BÜYÜK MÜŞTERİ) */}
        {/* ==================================================== */}
        <div className="lg:col-span-4 bg-[#111111] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl self-center">
          <div>
            {/* Üst Etiket */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                BÜYÜK MÜŞTERİ FIRSATI
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-mono font-bold text-red-400">
                2 Marka ile Sınırlı
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Online satışa tam donanımlı başlayın.
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-5">
              Mağazanız, markanız, reklamınız ve içeriğiniz hazır teslim edilir.
            </p>

            {/* Fiyat */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-neutral-400 line-through font-mono">₺89.900</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                  -₺25.000 İndirim
                </span>
              </div>
              <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1">
                <span>₺64.900</span>
                <span className="text-xs font-mono text-neutral-400 font-normal">+KDV</span>
              </div>
            </div>

            {/* Vurgu Kutusu */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs font-medium leading-snug mb-4">
              ✨ <strong>₺25.000 indirim + ₺27.000 değerinde</strong> hediye hizmet.
            </div>

            {/* Şart Kutusu */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-mono leading-relaxed mb-5">
              📌 <strong>Şart:</strong> 6 aylık Büyüme paketi (₺32.900/ay) ile birlikte geçerlidir.
            </div>

            {/* Paket İçeriği */}
            <div className="space-y-2 text-xs text-neutral-300 mb-6 max-h-72 overflow-y-auto pr-1">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                Paket İçeriği:
              </span>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>8-12 sayfa kurumsal web sitesi + blog altyapısı</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Kurumsal kimlik paketi (logo, renk-font kılavuzu, kartvizit, sosyal medya şablonları)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Google Harita kurulumu ve optimizasyonu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>WhatsApp otomatik yanıt sistemi kurulumu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Sayfa metinleri + 10 adet reklam metni</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>3 adet reels video prodüksiyonu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Rakip analizi raporu (3 rakip)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Meta veya Google reklam hesabı kurulumu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>Analitik ve dönüşüm takibi kurulumu</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>3 saat strateji danışmanlığı</span>
              </div>
              <div className="flex items-start gap-2 text-[#FFC300]">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>6 ay ücretsiz site bakımı (hediye)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                <span>25 iş gününde teslim</span>
              </div>
            </div>
          </div>

          <a
            href={getWaLink("Kovan Tam Dolsun Fırsatı", "₺64.900")}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Görüşme Planla</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

      </div>

      {/* ORTAK KOŞULLAR (ÜÇ BLOĞUN ALTINDA KÜÇÜK PUNTO) */}
      <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-neutral-400 text-xs leading-relaxed">
        <div className="flex items-center gap-2 text-neutral-300 font-mono font-bold text-xs uppercase mb-2">
          <AlertCircle className="w-4 h-4 text-[#FFC300]" />
          <span>Kampanya Ortak Koşulları:</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc list-inside text-[11px] font-sans">
          <li>Fiyatlar KDV hariçtir.</li>
          <li>Kampanyalar 31 Ekim 2026&apos;ya kadar veya kontenjan dolana dek geçerlidir.</li>
          <li>Belirtilen aylık paket taahhüdü zorunludur; erken çıkışta hediye hizmetlerin bedeli faturalandırılır.</li>
          <li>Ödeme: %50 sözleşmede, %50 teslimde.</li>
          <li>Alan adı, hosting ve lisans bedelleri dahil değildir.</li>
          <li>Kampanyalar birbiriyle veya başka indirimlerle birleştirilemez.</li>
        </ul>
      </div>
    </section>
  );
};
