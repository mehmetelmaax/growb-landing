"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Gauge,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Globe,
  MessageSquare,
  Activity,
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
      alert(
        "Telefon numaranız ile iletişime geçebilmemiz için KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir."
      );
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
    <section
      id="skor-ogren"
      className="relative overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-12 font-sans text-white sm:py-16"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/15 px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-[#FFC300]">
            <Gauge className="h-4 w-4 text-[#FFC300]" />
            <span>CANLI GOOGLE PAGESPEED & CORE WEB VITALS TESTİ</span>
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Mevcut Dijital Varlığınızın
            <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-[#FFC300] bg-clip-text text-transparent">
              Gerçek Satış ve Hız Skorunu Öğrenin.
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
            Google Lighthouse v10 analiz motoruyla web sitenizi canlı tarıyoruz. Gerçek mobil açılış
            hızı, LCP, CLS ve teknik optimizasyon açıklarınızı şeffaf olarak görün.
          </p>
        </div>

        {/* Audit Form Box */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#141414] p-6 shadow-2xl sm:p-10">
          <form onSubmit={handleScan} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              {/* URL Input */}
              <div className="md:col-span-5">
                <label className="mb-2 block font-mono text-xs font-semibold uppercase text-neutral-300">
                  Web Sitesi Adresiniz *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="www.firmaniz.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#1F1F1F] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                  />
                </div>
              </div>

              {/* Sector */}
              <div className="md:col-span-4">
                <label className="mb-2 block font-mono text-xs font-semibold uppercase text-neutral-300">
                  Sektörünüz
                </label>
                <input
                  type="text"
                  placeholder="Örn: Nakliyat, Klinik, Avukat, Turizm..."
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#1F1F1F] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="md:col-span-3">
                <label className="mb-2 block font-mono text-xs font-semibold uppercase text-neutral-300">
                  WhatsApp No (Opsiyonel)
                </label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#1F1F1F] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                />
              </div>
            </div>

            {/* KVKK Onay Kutusu */}
            <div className="pt-1">
              <label className="flex cursor-pointer select-none items-start gap-2 text-xs text-neutral-400">
                <input
                  type="checkbox"
                  checked={kvkkConsent}
                  onChange={(e) => setKvkkConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border border-white/20 bg-[#1F1F1F] text-[#FFC300] accent-[#FFC300] focus:ring-[#FFC300]"
                />
                <span>
                  <Link
                    href="/kvkk-aydinlatma-metni"
                    target="_blank"
                    className="text-white underline hover:text-[#FFC300]"
                  >
                    KVKK Aydınlatma Metni
                  </Link>
                  &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza
                  veriyorum.
                </span>
              </label>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-[#FFC300]" />
                <span>Google PageSpeed v5 API ile canlı ölçüm yapılır.</span>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FFC300] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] shadow-lg transition-all hover:bg-[#e6b000] hover:shadow-[#FFC300]/20 disabled:opacity-50 sm:w-auto"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Google Ölçüyor...</span>
                  </>
                ) : (
                  <>
                    <span>Canlı Skoru Şimdi Hesapla</span>
                    <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Tarama Durum Bildirimi */}
          {isScanning && (
            <div className="animate-in fade-in mt-6 flex items-center gap-3 rounded-2xl border border-[#FFC300]/20 bg-[#FFC300]/10 p-4 text-xs text-[#FFC300] duration-300">
              <Activity className="h-4 w-4 shrink-0 animate-pulse" />
              <span>{scanStatus}</span>
            </div>
          )}

          {/* Hata veya Güvenlik Duvarı Durumu (Fallback) */}
          {errorInfo && !isScanning && (
            <div className="animate-in fade-in mt-6 space-y-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 text-neutral-300 duration-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <h4 className="mb-1 text-sm font-bold text-amber-400">
                    Otomatik Tarama Sınırlaması
                  </h4>
                  <p className="text-xs leading-relaxed text-neutral-300">{errorInfo}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-2 sm:flex-row">
                <span className="text-xs text-neutral-400">
                  Uzmanlarımız sitenizi ve rakiplerinizi manuel inceleyip 15 dakikalık ücretsiz
                  rapor hazırlayabilir.
                </span>
                <a
                  href={`https://wa.me/905414842426?text=${encodeURIComponent("Merhaba, web sitem için 15 dakikalık ücretsiz analiz talep ediyorum: " + url)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#FFC300] px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-[#e6b000]"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Ücretsiz Rapor İste</span>
                </a>
              </div>
            </div>
          )}

          {/* Gerçek Sonuç Alanı */}
          {result && !isScanning && (
            <div className="animate-in fade-in slide-in-from-bottom-3 mt-8 border-t border-white/10 pt-8 duration-300">
              {/* Rozet */}
              <div className="mb-6 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>
                    CANLI GOOGLE LIGHTHOUSE SONUCU {result.cachedAt ? `(${result.cachedAt})` : ""}
                  </span>
                </div>
                <span className="max-w-xs truncate font-mono text-xs text-neutral-500">
                  {result.url}
                </span>
              </div>

              {/* Skor Kartları */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div
                  className={`rounded-2xl border p-4 text-center ${getScoreBg(result.speedScore)}`}
                >
                  <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                    Mobil Hız Skoru
                  </span>
                  <span className={`text-3xl font-black ${getScoreColor(result.speedScore)}`}>
                    {result.speedScore}/100
                  </span>
                </div>
                <div
                  className={`rounded-2xl border p-4 text-center ${getScoreBg(result.seoScore)}`}
                >
                  <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                    SEO Skoru
                  </span>
                  <span className={`text-3xl font-black ${getScoreColor(result.seoScore)}`}>
                    {result.seoScore}/100
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 text-center">
                  <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                    Açılış Hızı
                  </span>
                  <span className="text-3xl font-black text-white">{result.speedSeconds}</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 text-center">
                  <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
                    LCP (Ana İçerik)
                  </span>
                  <span className="text-3xl font-black text-white">{result.lcp}</span>
                </div>
              </div>

              {/* Kritik Sorunlar ve Teşhis Listesi */}
              {result.criticalIssues.length > 0 && (
                <div className="mb-6 rounded-2xl border border-white/10 bg-[#141414] p-5">
                  <div className="mb-3 flex items-center gap-2 text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Google Tarafından Tespit Edilen Kritik Sorunlar (
                      {result.criticalIssues.length})
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {result.criticalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span className="leading-relaxed">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Harekete Geçirme & Teklif Köprüsü */}
              <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#FFC300]/20 bg-gradient-to-r from-[#FFC300]/10 via-[#FFC300]/5 to-transparent p-6 sm:flex-row">
                <div className="text-center sm:text-left">
                  <h4 className="mb-1 text-sm font-bold text-white">
                    Bu skorları 95+ yeşil bölgeye taşımak ister misiniz?
                  </h4>
                  <span className="text-xs text-neutral-400">
                    Mobil açılış hızınızı 1.5 saniyenin altına indirip Google reklam maliyetinizi
                    düşürebiliriz.
                  </span>
                </div>
                <a
                  href={`https://wa.me/905414842426?text=${encodeURIComponent(`Merhaba GrowB Dijital, ${result.url} sitemin canlı PageSpeed analiz skorunu (${result.speedScore}/100) aldım. Detaylı optimizasyon görüşmesi yapmak istiyorum.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-[#FFC300] px-5 py-2.5 text-xs font-bold text-[#0A0A0A] shadow-lg transition-all hover:bg-[#e6b000]"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp&apos;tan Çözüm Planı İste</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
