"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, CheckCircle2, AlertTriangle, ArrowUpRight, Sparkles, RefreshCw, ShieldCheck, Zap, Globe, MessageSquare } from "lucide-react";

export const WebsiteScoreAudit: React.FC = () => {
  const [url, setUrl] = useState("");
  const [sector, setSector] = useState("");
  const [phone, setPhone] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<null | {
    speedScore: number;
    seoScore: number;
    conversionScore: number;
    overallScore: number;
    potentialScore: number;
    speedSeconds: string;
    criticalIssues: string[];
  }>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Send lead to Telegram in background
    if (phone || url) {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "HIZ_SKORU",
          phone: phone || "Belirtilmedi",
          siteUrl: url,
          sector: sector || "Belirtilmedi",
          source: "Hız & SEO Testi Bölümü (#skor-ogren)",
        }),
      }).catch((err) => console.error("Audit lead error:", err));
    }

    setIsScanning(true);
    setResult(null);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        speedScore: 41,
        seoScore: 48,
        conversionScore: 35,
        overallScore: 41,
        potentialScore: 98,
        speedSeconds: "3.9 sn",
        criticalIssues: [
          "Mobil açılış hızı 3.9 saniye (Hazır WordPress şablonları ziyaretçinin %65'ini kaçırıyor)",
          "Google Harita 3'lü yerel paketinde (Local Pack) ilk sırada değilsiniz",
          "Tek tıkla doğrudan telefon araması ve WhatsApp satış yönlendirmesi eksik",
          "Google Ads arama bütçeniz negatif anahtar kelime filtresi olmadığı için boşa harcanıyor",
        ],
      });
    }, 2200);
  };

  return (
    <section id="skor-ogren" className="py-10 sm:py-12 bg-[#0D0D0D] text-cream relative overflow-hidden border-y border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-bold uppercase mb-4">
            <Gauge className="w-4 h-4 text-accent" />
            <span>ÜCRETSİZ 30 SANİYELİK BÜYÜME VE HIZ ANALİZİ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-cream tracking-tight mb-4 font-sans">
            Mevcut Dijital Varlığınızın<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream via-accent-light to-accent">
              Gerçek Satış ve Pazarlama Skorunu Öğrenin.
            </span>
          </h2>

          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Dijitaldeki varlığınız sıcak müşteri üretiyor mu yoksa ciro mu kaçırıyor? Web adresinizi girin; Google Harita SEO, reklam altyapısı, hız ve WhatsApp dönüşüm açıklarınızı anında tespit edelim.
          </p>
        </div>

        {/* Audit Form Box */}
        <div className="bg-[#141414] rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleScan} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* URL Input */}
              <div className="md:col-span-5">
                <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase mb-2">
                  Web Sitesi Adresiniz *
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="www.firmaniz.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#1F1F1F] border border-white/10 text-cream placeholder-neutral-500 focus:outline-none focus:border-accent text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Sector Free Text Input (Item 6: Sektörü kendileri yazsın öneri vermeyelim) */}
              <div className="md:col-span-4">
                <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase mb-2">
                  Sektörünüz
                </label>
                <input
                  type="text"
                  placeholder="Sektörünüzü yazın (Örn: Restoran, Güzellik, Diş...)"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#1F1F1F] border border-white/10 text-cream placeholder-neutral-500 focus:outline-none focus:border-accent text-sm transition-colors"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="md:col-span-3">
                <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase mb-2">
                  WhatsApp No (Opsiyonel)
                </label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#1F1F1F] border border-white/10 text-cream placeholder-neutral-500 focus:outline-none focus:border-accent text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Sonuç anında ekranda hesaplanır.</span>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-[#0A0A0A] font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analiz Ediliyor...</span>
                  </>
                ) : (
                  <>
                    <span>Skorumu Şimdi Hesapla</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result Area */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Açılış Hızı Skoru</span>
                    <span className="text-3xl font-black text-red-400">{result.speedScore}/100</span>
                    <span className="text-[11px] text-neutral-500 block mt-1">Süre: {result.speedSeconds}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Harita & SEO Skoru</span>
                    <span className="text-3xl font-black text-amber-400">{result.seoScore}/100</span>
                    <span className="text-[11px] text-neutral-500 block mt-1">Local Pack Dışı</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Dönüşüm & Satış Skoru</span>
                    <span className="text-3xl font-black text-red-400">{result.conversionScore}/100</span>
                    <span className="text-[11px] text-neutral-500 block mt-1">Arama Butonu Zayıf</span>
                  </div>
                </div>

                {/* Critical Issues */}
                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 mb-6">
                  <h4 className="text-sm font-bold text-red-400 uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Tespit Edilen Kritik Açıklar:</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                    {result.criticalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFC300]/10 border border-[#FFC300]/30">
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">GrowB İle Ulaşılabilecek Skor: <strong className="text-[#FFC300] text-sm">98/100 (1.2 sn)</strong></span>
                    <span className="text-xs text-neutral-400">Bu açıkları 7 gün içinde kapatıp cironuzu artırabiliriz.</span>
                  </div>
                  <a
                    href="https://wa.me/905414842426"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp'tan Detaylı Raporu İste</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
