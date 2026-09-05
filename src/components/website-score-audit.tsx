"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Globe,
  MessageSquare,
  Activity
} from "lucide-react";

interface AuditData {
  url: string;
  speedScore: number;
  seoScore: number;
  speedSeconds: string;
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
  criticalIssues: string[];
  isRealData: boolean;
  cachedAt?: string;
}

export const WebsiteScoreAudit: React.FC = () => {
  const [url, setUrl] = useState("");
  const [sector, setSector] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("Google PageSpeed motoru başlatılıyor...");
  const [result, setResult] = useState<AuditData | null>(null);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    if (phone && !kvkkConsent) {
      alert("Telefon numaranız ile iletişime geçebilmemiz için KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir.");
      return;
    }

    setIsScanning(true);
    setResult(null);
    setErrorInfo(null);
    setScanStatus("Google Lighthouse v10 analiz motoruna bağlanılıyor...");

    const statusTimer1 = setTimeout(() => {
      setScanStatus("Mobil Core Web Vitals (LCP, FCP, CLS) metrikleri ölçülüyor...");
    }, 2500);

    const statusTimer2 = setTimeout(() => {
      setScanStatus("Performans ve SEO optimizasyon açıkları derleniyor...");
    }, 6000);

    try {
      // 1. Gerçek Google PageSpeed API Çağrısı
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      clearTimeout(statusTimer1);
      clearTimeout(statusTimer2);

      const data = await res.json();

      if (res.ok && data.success && data.data) {
        setResult(data.data);

        // 2. Telefon ve KVKK onayı verilmişse lead bildirimini ilet
        if (phone && kvkkConsent) {
          fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "HIZ_SKORU",
              phone: phone,
              siteUrl: url,
              sector: sector || "Belirtilmedi",
              notes: `Canlı PageSpeed Skoru: ${data.data.speedScore}/100, LCP: ${data.data.lcp}, FCP: ${data.data.fcp}`,
              source: "Hız & SEO Testi Bölümü (#skor-ogren)",
              kvkkConsent: true,
            }),
          }).catch((err) => console.error("Audit lead error:", err));
        }
      } else {
        setErrorInfo(
          data.error ||
            "Web sitenizin adresine Google sunucuları üzerinden erişilemedi. Web siteniz güvenlik duvarı arkasında olabilir veya alan adı yayında olmayabilir."
        );
      }
    } catch (err) {
      clearTimeout(statusTimer1);
      clearTimeout(statusTimer2);
      console.error("Audit scan error:", err);
      setErrorInfo(
        "Bağlantı zaman aşımına uğradı. Web siteniz için 15 dakikalık manuel büyüme analizi talep edebilirsiniz."
      );
    } finally {
      setIsScanning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-emerald-500/10 border-emerald-500/30";
    if (score >= 50) return "bg-amber-500/10 border-amber-500/30";
    return "bg-red-500/10 border-red-500/30";
  };

  return (
    <section id="skor-ogren" className="py-12 sm:py-16 bg-[#0D0D0D] text-white relative overflow-hidden border-y border-white/10 font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FFC300]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC300]/15 border border-[#FFC300]/30 text-[#FFC300] text-xs font-mono font-bold uppercase mb-4">
            <Gauge className="w-4 h-4 text-[#FFC300]" />
            <span>CANLI GOOGLE PAGESPEED & CORE WEB VITALS TESTİ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Mevcut Dijital Varlığınızın<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#FFC300]">
              Gerçek Satış ve Hız Skorunu Öğrenin.
            </span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Google Lighthouse v10 analiz motoruyla web sitenizi canlı tarıyoruz. Gerçek mobil açılış hızı, LCP, CLS ve teknik optimizasyon açıklarınızı şeffaf olarak görün.
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
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#1F1F1F] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC300] text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Sector */}
              <div className="md:col-span-4">
                <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase mb-2">
                  Sektörünüz
                </label>
                <input
                  type="text"
                  placeholder="Örn: Nakliyat, Klinik, Avukat, Turizm..."
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#1F1F1F] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC300] text-sm transition-colors"
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
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#1F1F1F] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC300] text-sm transition-colors"
                />
              </div>
            </div>

            {/* KVKK Onay Kutusu */}
            <div className="pt-1">
              <label className="flex items-start gap-2 text-xs text-neutral-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={kvkkConsent}
                  onChange={(e) => setKvkkConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded bg-[#1F1F1F] border border-white/20 text-[#FFC300] focus:ring-[#FFC300] accent-[#FFC300]"
                />
                <span>
                  <Link href="/kvkk-aydinlatma-metni" target="_blank" className="text-white underline hover:text-[#FFC300]">
                    KVKK Aydınlatma Metni
                  </Link>
                  &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza veriyorum.
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#FFC300]" />
                <span>Google PageSpeed v5 API ile canlı ölçüm yapılır.</span>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FFC300] hover:bg-[#e6b000] text-[#0A0A0A] font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-[#FFC300]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Google Ölçüyor...</span>
                  </>
                ) : (
                  <>
                    <span>Canlı Skoru Şimdi Hesapla</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Tarama Durum Bildirimi */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-[#FFC300]/10 border border-[#FFC300]/20 flex items-center gap-3 text-xs text-[#FFC300]"
            >
              <Activity className="w-4 h-4 animate-pulse shrink-0" />
              <span>{scanStatus}</span>
            </motion.div>
          )}

          {/* Hata veya Güvenlik Duvarı Durumu (Fallback) */}
          {errorInfo && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-neutral-300 space-y-4"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-400 mb-1">Otomatik Tarama Sınırlaması</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">{errorInfo}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-neutral-400">
                  Uzmanlarımız sitenizi ve rakiplerinizi manuel inceleyip 15 dakikalık ücretsiz rapor hazırlayabilir.
                </span>
                <a
                  href={`https://wa.me/905414842426?text=${encodeURIComponent("Merhaba, web sitem için 15 dakikalık ücretsiz analiz talep ediyorum: " + url)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#FFC300] hover:bg-[#e6b000] text-black font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ücretsiz Rapor İste</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* Gerçek Sonuç Alanı */}
          <AnimatePresence>
            {result && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                {/* Rozet */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CANLI GOOGLE LIGHTHOUSE SONUCU {result.cachedAt ? `(${result.cachedAt})` : ""}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 truncate max-w-xs">{result.url}</span>
                </div>

                {/* Skor Kartları */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-2xl border text-center ${getScoreBg(result.speedScore)}`}>
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Mobil Hız Skoru</span>
                    <span className={`text-3xl font-black ${getScoreColor(result.speedScore)}`}>
                      {result.speedScore}/100
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-1">LCP: {result.lcp}</span>
                  </div>

                  <div className={`p-4 rounded-2xl border text-center ${getScoreBg(result.seoScore)}`}>
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Google SEO Skoru</span>
                    <span className={`text-3xl font-black ${getScoreColor(result.seoScore)}`}>
                      {result.seoScore}/100
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-1">FCP: {result.fcp}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Düzen Kayması (CLS)</span>
                    <span className="text-3xl font-black text-neutral-200">{result.cls}</span>
                    <span className="text-[11px] text-neutral-500 block mt-1">Hedef: &lt; 0.1</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Bloklama Süresi (TBT)</span>
                    <span className="text-3xl font-black text-neutral-200">{result.tbt}</span>
                    <span className="text-[11px] text-neutral-500 block mt-1">Hedef: &lt; 200ms</span>
                  </div>
                </div>

                {/* Kritik Açıklar */}
                {result.criticalIssues.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 mb-6">
                    <h4 className="text-sm font-bold text-amber-400 uppercase mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Google Tarafından Tespit Edilen İyileştirme Fırsatları:</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                      {result.criticalIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#FFC300] font-bold mt-0.5">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Aksiyon Kutusu */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#FFC300]/10 border border-[#FFC300]/30">
                  <div className="text-left">
                    <span className="text-sm font-bold text-white block">
                      GrowB Next.js Mimarisi ile Hedef: <strong className="text-[#FFC300]">95+ Core Web Vitals</strong>
                    </span>
                    <span className="text-xs text-neutral-400">
                      Mobil açılış hızınızı 1.5 saniyenin altına indirip Google reklam maliyetinizi düşürebiliriz.
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/905414842426?text=${encodeURIComponent(`Merhaba GrowB Dijital, ${result.url} sitemin canlı PageSpeed analiz skorunu (${result.speedScore}/100) aldım. Detaylı optimizasyon görüşmesi yapmak istiyorum.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#FFC300] hover:bg-[#e6b000] text-[#0A0A0A] font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp&apos;tan Çözüm Planı İste</span>
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
