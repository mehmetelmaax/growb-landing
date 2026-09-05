"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ESTABLISHMENT_PACKAGES, 
  ESTABLISHMENT_COMPARISON_ROWS, 
  MONTHLY_GROWTH_PACKAGES, 
  STANDALONE_SERVICES_PRICING, 
  COMMERCIAL_TERMS 
} from "@/data/pricing-catalog-data";
import { CampaignPricing } from "@/components/campaign-pricing";
import { 
  Check, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Layers, 
  FileText, 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  Percent, 
  Clock,
  RefreshCw,
  Gift
} from "lucide-react";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"kurulus" | "aylik" | "tekil" | "kosullar">("kurulus");
  const [standaloneCategory, setStandaloneCategory] = useState<string>("all");

  const filteredStandalone = standaloneCategory === "all"
    ? STANDALONE_SERVICES_PRICING
    : STANDALONE_SERVICES_PRICING.filter((s) => s.category === standaloneCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A] overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative">
        {/* Arka Plan Deseni */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#FFC300 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Geri Dönüş Linki */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-[#FFC300] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Hero Başlık Alanı */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] mb-6 shadow-[0_0_25px_rgba(255,195,0,0.15)]">
            <Sparkles className="w-4 h-4 text-[#FFC300]" />
            <span>ŞEFFAF FİYATLANDIRMA // GİZLİ MASRAF YOK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6 font-sans">
            Ölçülebilir Büyüme, Kuruşuna Kadar{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/50 decoration-4">
              Net Fiyatlar.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            Piyasadaki ucu açık tekliflerin ve sürpriz faturaların aksine; ister her şey dahil anahtar teslim kovan paketleri, ister aylık büyüme yönetimi, isterseniz de 12 farklı uzmanlığımızdan modüler tekil hizmet alımı.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#FFC300]" />
              <span>Sözleşmeli Fiyat Garantisi</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
              <Percent className="w-4 h-4 text-[#FFC300]" />
              <span>%50 Başlangıç - %50 Teslimde Ödeme</span>
            </div>
            <a 
              href="tel:05414842426" 
              className="flex items-center gap-2 bg-[#FFC300]/10 hover:bg-[#FFC300] text-[#FFC300] hover:text-black px-3.5 py-2 rounded-full border border-[#FFC300]/30 transition-all font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Danışma Hattı: 0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* 3 ÖZEL KAMPANYA ALANI (Decoy / Anchoring) */}
        <div className="mb-20">
          <CampaignPricing />
        </div>

        {/* KATALOG AYIRICI BAŞLIK */}
        <div className="text-center max-w-3xl mx-auto mb-10 pt-12 border-t border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-neutral-300 uppercase mb-3">
            <span>RESMİ FİYAT LİSTESİ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Tüm Standart Paketler & 12 Uzmanlık Tarifesi
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Kuruluş paketleri, aylık büyüme sözleşmeleri ve tekil uzmanlık hizmetlerinin tüm detayları.
          </p>
        </div>

        {/* 4 ANA SEKMELİ KATEGORİ SEÇİCİ */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-12 p-2 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("kurulus")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-mono font-bold transition-all ${
              activeTab === "kurulus"
                ? "bg-[#FFC300] text-[#0A0A0A] shadow-[0_0_25px_rgba(255,195,0,0.4)] scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>🐝 Kuruluş Paketleri (3 Kovan)</span>
          </button>

          <button
            onClick={() => setActiveTab("aylik")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-mono font-bold transition-all ${
              activeTab === "aylik"
                ? "bg-[#FFC300] text-[#0A0A0A] shadow-[0_0_25px_rgba(255,195,0,0.4)] scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>🚀 Aylık Büyüme Paketleri</span>
          </button>

          <button
            onClick={() => setActiveTab("tekil")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-mono font-bold transition-all ${
              activeTab === "tekil"
                ? "bg-[#FFC300] text-[#0A0A0A] shadow-[0_0_25px_rgba(255,195,0,0.4)] scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>📋 12 Uzmanlık Tekil Tarifesi</span>
          </button>

          <button
            onClick={() => setActiveTab("kosullar")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-mono font-bold transition-all ${
              activeTab === "kosullar"
                ? "bg-[#FFC300] text-[#0A0A0A] shadow-[0_0_25px_rgba(255,195,0,0.4)] scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>⚖️ Ticari Koşullar</span>
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SEKME 1: KURULUŞ PAKETLERİ (ANAHTAR TESLİM KOVANLAR) */}
        {/* ---------------------------------------------------- */}
        {activeTab === "kurulus" && (
          <div className="space-y-16">
            {/* 3 Paket Kartı */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {ESTABLISHMENT_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.isPopular
                      ? "bg-gradient-to-b from-[#181818] to-[#0D0D0D] border-2 border-[#FFC300] shadow-[0_20px_60px_rgba(255,195,0,0.2)] lg:-translate-y-2"
                      : "bg-[#121212] border border-white/10 hover:border-white/25 shadow-xl"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FFC300] text-[#0A0A0A] text-xs font-mono font-black uppercase tracking-wider shadow-md">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    {!pkg.isPopular && (
                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                        {pkg.badge}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Fiyat & Kazanç Blokları */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
                        <span>{pkg.price}</span>
                        <span className="text-xs font-mono text-neutral-400 font-normal">+KDV</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-xs">
                        <span className="text-neutral-400 line-through">
                          Tekil Değeri: {pkg.originalValue}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                          {pkg.savings}
                        </span>
                      </div>
                    </div>

                    {/* Hızlı Parametreler */}
                    <div className="space-y-2.5 text-xs font-mono text-neutral-300 mb-8">
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#FFC300]" /> Teslim Süresi:</span>
                        <span className="font-bold text-white">{pkg.deliveryTime}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400 flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-[#FFC300]" /> Ücretsiz Revizyon:</span>
                        <span className="font-bold text-white">{pkg.revisions}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400 flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-[#FFC300]" /> Bakım Hediyesi:</span>
                        <span className="font-bold text-[#FFC300]">{pkg.maintenanceGift}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/905414842426?text=${encodeURIComponent(`Merhaba GrowB Dijital, ${pkg.name} (${pkg.price}) hakkında teklif ve sözleşme detaylarını görüşmek istiyorum.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                      pkg.isPopular
                        ? "bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] hover:scale-105"
                        : "bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A]"
                    }`}
                  >
                    <span>Projeyi Başlat & Teklif Al</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>
              ))}
            </div>

            {/* DETAYLI KARŞILAŞTIRMA TABLOSU */}
            <div className="bg-[#121212] rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden shadow-2xl">
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-[#FFC300] uppercase tracking-wider block mb-1">
                  // EKSİKSİZ ŞEFFAFLIK
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  Kuruluş Paketleri Ayrıntılı Kapsam Matrisi
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/15 text-neutral-400 font-mono text-xs uppercase">
                      <th className="py-4 px-4 font-bold">Hizmet / Modül</th>
                      <th className="py-4 px-4 font-bold text-neutral-200">TEMEL PETEK (₺39.900)</th>
                      <th className="py-4 px-4 font-bold text-[#FFC300]">BÜYÜME KOVANI (₺89.900)</th>
                      <th className="py-4 px-4 font-bold text-amber-400">ALTIN KOVAN (₺169.900)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ESTABLISHMENT_COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-white/5 text-[#FFC300] font-mono text-[10px] flex items-center justify-center shrink-0">
                            {row.serviceCode}
                          </span>
                          <span>{row.label}</span>
                        </td>
                        <td className="py-4 px-4 text-neutral-300 leading-relaxed font-medium">
                          {row.temel}
                        </td>
                        <td className="py-4 px-4 text-[#FFC300] leading-relaxed font-semibold bg-[#FFC300]/[0.03]">
                          {row.buyume}
                        </td>
                        <td className="py-4 px-4 text-amber-200 leading-relaxed font-semibold">
                          {row.altin}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* SEKME 2: AYLIK BÜYÜME PAKETLERİ (SÜREKLİ CİRO AKIŞI) */}
        {/* ---------------------------------------------------- */}
        {activeTab === "aylik" && (
          <div className="space-y-12">
            {/* Özel İndirim Bildirimi */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFC300]/10 border border-[#FFC300]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <p className="text-xs sm:text-sm text-neutral-200 font-medium">
                  <strong className="text-[#FFC300] font-bold">Özel Avantaj:</strong> Kuruluş paketi alan müşterilerimiz, aylık büyüme paketlerine <strong className="text-white font-bold">ilk 3 ay %15 indirimli</strong> geçiş yapar.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFC300] text-[#0A0A0A] text-xs font-mono font-black shrink-0">
                %15 İNDİRİM HAKKI
              </span>
            </div>

            {/* 3 Aylık Paket Kartı */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {MONTHLY_GROWTH_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.isPopular
                      ? "bg-gradient-to-b from-[#181818] to-[#0D0D0D] border-2 border-[#FFC300] shadow-[0_20px_60px_rgba(255,195,0,0.2)] lg:-translate-y-2"
                      : "bg-[#121212] border border-white/10 hover:border-white/25 shadow-xl"
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#FFC300] uppercase tracking-wider block mb-2">
                      {pkg.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6">
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
                        <span>{pkg.price}</span>
                        <span className="text-xs font-mono text-neutral-400 font-normal">{pkg.period} +KDV</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-white/10 text-xs text-neutral-400">
                        Tekil Kalem Değeri: <span className="line-through">{pkg.originalValue}</span>
                      </div>
                    </div>

                    {/* Aylık Detaylar Listesi */}
                    <div className="space-y-3 text-xs text-neutral-300 mb-8">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Sosyal Medya:</strong> {pkg.socialMedia}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Reels Videosu:</strong> {pkg.reels}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Google Harita:</strong> {pkg.localSeo}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Organik SEO:</strong> {pkg.seo}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Reklam Yönetimi:</strong> {pkg.adsManagement}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>İçerik Metinleri:</strong> {pkg.content}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>CRM & WhatsApp:</strong> {pkg.crmSupport}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Site Bakımı:</strong> {pkg.siteMaintenance}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Raporlama:</strong> {pkg.reporting}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span><strong>Yanıt Süresi:</strong> {pkg.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/905414842426?text=${encodeURIComponent(`Merhaba GrowB Dijital, Aylık Büyüme Paketi (${pkg.name} - ${pkg.price}/ay) hakkında bilgi almak ve başlamak istiyorum.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                      pkg.isPopular
                        ? "bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] hover:scale-105"
                        : "bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A]"
                    }`}
                  >
                    <span>Aylık Yönetimi Başlat</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>
              ))}
            </div>

            {/* Peşin Ödeme İndirimleri Notu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-[#FFC300]/10 text-[#FFC300] flex items-center justify-center font-mono font-bold text-lg shrink-0">
                  %5
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">6 Ay Peşin Ödeme İndirimi</h4>
                  <p className="text-xs text-neutral-400">6 aylık sözleşmeyi peşin ödeyen müşterilerimize net %5 nakit indirim.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-[#FFC300]/10 text-[#FFC300] flex items-center justify-center font-mono font-bold text-lg shrink-0">
                  %10
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">12 Ay Peşin Ödeme İndirimi</h4>
                  <p className="text-xs text-neutral-400">Yıllık sözleşmeyi peşin ödeyen müşterilerimize net %10 nakit indirim.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* SEKME 3: 12 UZMANLIK ALANI TEKİL HİZMET FİYAT TARİFESİ*/}
        {/* ---------------------------------------------------- */}
        {activeTab === "tekil" && (
          <div className="space-y-8">
            {/* Alt Filtre */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase">
                12 Uzmanlık Alanından İhtiyacınız Olan Hizmeti Seçin:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "Tümü (12 Alan)" },
                  { id: "DİJİTAL VARLIK & REKLAM", label: "Varlık & Reklam" },
                  { id: "BÜYÜME & OTOMASYON", label: "Büyüme & Otomasyon" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStandaloneCategory(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                      standaloneCategory === f.id
                        ? "bg-[#FFC300] text-[#0A0A0A] shadow-sm"
                        : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 12 Hizmetin Kartları ve Tabloları */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredStandalone.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#121212] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all"
                >
                  <div>
                    {/* Başlık Satırı */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 font-mono font-bold text-xs text-[#FFC300]">
                        #{service.code}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-medium">
                      {service.description}
                    </p>

                    {/* Fiyat Listesi Tablosu */}
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-neutral-400 font-mono text-[11px] uppercase">
                            <th className="pb-2">Paket / Kalem</th>
                            <th className="pb-2">Kapsam</th>
                            <th className="pb-2 text-right">Fiyat</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {service.items.map((item, i) => (
                            <tr key={i} className="hover:bg-white/[0.02]">
                              <td className="py-2.5 pr-2 font-bold text-white whitespace-nowrap">
                                {item.name}
                              </td>
                              <td className="py-2.5 px-2 text-neutral-300">
                                {item.scope}
                              </td>
                              <td className="py-2.5 pl-2 text-right font-mono font-bold text-[#FFC300] whitespace-nowrap">
                                {item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Varsa Ek Kural / Not */}
                    {service.extraRule && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed mb-6 font-mono">
                        ⚠️ {service.extraRule}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Teklif Al Butonu */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-neutral-400">
                      Sözleşmeli & Taahhütlü Teslim
                    </span>
                    <a
                      href={`https://wa.me/905414842426?text=${encodeURIComponent(`Merhaba GrowB Dijital, #${service.code} ${service.title} hizmetiniz için teklif almak istiyorum.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <span>Teklif Al</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* SEKME 4: TİCARİ KOŞULLAR (15. MADDE & GÜVENCELER)    */}
        {/* ---------------------------------------------------- */}
        {activeTab === "kosullar" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-[#FFC300] uppercase tracking-wider block mb-1">
                  // RESMİ TİCARİ ÇERÇEVE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Çalışma Esasları, Ödeme ve Sözleşme Şartları
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                  Tüm müşterilerimizle kurumsal sözleşme imzalayarak hem iş takvimini hem de haklarınızı yasal güvenceye alıyoruz.
                </p>
              </div>

              <div className="space-y-4">
                {COMMERCIAL_TERMS.map((term, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#FFC300]/10 text-[#FFC300] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm text-neutral-200 leading-relaxed font-medium">
                      {term}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sınırsız Revizyon Uyarısı Notu */}
              <div className="mt-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed font-sans">
                <strong className="text-[#FFC300] font-bold block mb-1">📌 Revizyon Politikası Hakkında Bilgilendirme:</strong>
                Süreçlerin zamanında ve aksamadan teslim edilebilmesi için tüm paketlerde belirlenen revizyon tur sayıları uygulanır. "Sınırsız revizyon" güvencesi yalnızca <strong>Logo – Premium</strong> paketimize özeldir; diğer paketlerde kapsam dışı ek talepler saatlik danışmanlık tarifemizden faturalandırılır.
              </div>
            </div>
          </div>
        )}

        {/* ALT ÇAĞRI KARTI */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-[#FFC300]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#FFC300]/15 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono font-bold text-[#FFC300] uppercase tracking-wider block mb-2">
            ÖZEL PROJE VE FİYATLANDIRMA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 font-sans">
            İşletmenize Özel Teklif Almak İster misiniz?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mb-8">
            İhtiyaçlarınızı dinleyelim, bütçenize ve hedeflerinize en uygun paket kombinasyonunu 15 dakika içinde hazırlayalım.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#iletisim"
              className="px-8 py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(255,195,0,0.3)] hover:scale-105"
            >
              Hemen Teklif İste
            </Link>
            <a
              href="https://wa.me/905414842426?text=Merhaba,%20fiyat%20listenizi%20inceledim,%20i%C5%9Fletmem%20i%C3%A7in%20teklif%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all border border-white/20"
            >
              WhatsApp'tan Danışın 💬
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
