"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Gauge,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Globe,
  MessageSquare,
  Activity,
} from "lucide-react";
import { WebsiteAuditResult, AuditData } from "./audit/website-audit-result";

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

    const t1 = setTimeout(
      () => setScanStatus("Mobil Core Web Vitals (LCP, FCP, CLS) metrikleri ölçülüyor..."),
      2500
    );
    const t2 = setTimeout(
      () => setScanStatus("Performans ve SEO optimizasyon açıkları derleniyor..."),
      6000
    );

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      clearTimeout(t1);
      clearTimeout(t2);

      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setResult(data.data);
        if (phone && kvkkConsent) {
          fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "HIZ_SKORU",
              phone,
              siteUrl: url,
              sector: sector || "Belirtilmedi",
              notes: `Canlı PageSpeed: ${data.data.speedScore}/100, LCP: ${data.data.lcp}, FCP: ${data.data.fcp}`,
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
      console.error("Audit fetch error:", err);
      setErrorInfo(
        "Bağlantı zaman aşımına uğradı. Lütfen URL adresinizi kontrol edip tekrar deneyiniz."
      );
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section
      id="skor-ogren"
      className="relative overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-12 font-sans text-white sm:py-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#141414] p-6 shadow-2xl sm:p-10">
          <form onSubmit={handleScan} aria-busy={isScanning} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <label
                  htmlFor="audit-url-input"
                  className="mb-2 block font-mono text-xs font-semibold uppercase text-neutral-300"
                >
                  Web Sitesi Adresiniz *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    id="audit-url-input"
                    type="text"
                    required
                    placeholder="www.firmaniz.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#1F1F1F] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label
                  htmlFor="audit-sector-input"
                  className="mb-2 block font-mono text-xs font-semibold uppercase text-neutral-300"
                >
                  Sektörünüz
                </label>
                <input
                  id="audit-sector-input"
                  type="text"
                  placeholder="Örn: Nakliyat, Klinik, Avukat, Turizm..."
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#1F1F1F] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="audit-phone-input"
                  className="mb-2 block font-mono text-xs font-semibold uppercase text-neutral-300"
                >
                  WhatsApp No (Opsiyonel)
                </label>
                <input
                  id="audit-phone-input"
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#1F1F1F] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex cursor-pointer select-none items-start gap-2 text-xs text-neutral-400">
                <input
                  id="audit-kvkk-checkbox"
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
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FFC300] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] shadow-lg transition-all hover:bg-[#e6b000] focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 sm:w-auto"
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

          {isScanning && (
            <div
              role="status"
              aria-live="polite"
              className="animate-in fade-in mt-6 flex items-center gap-3 rounded-2xl border border-[#FFC300]/20 bg-[#FFC300]/10 p-4 text-xs text-[#FFC300] duration-300"
            >
              <Activity className="h-4 w-4 shrink-0 animate-pulse" />
              <span>{scanStatus}</span>
            </div>
          )}

          {errorInfo && !isScanning && (
            <div
              role="alert"
              className="animate-in fade-in mt-6 space-y-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 text-neutral-300 duration-300"
            >
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
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#FFC300] px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-[#e6b000] focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Ücretsiz Rapor İste</span>
                </a>
              </div>
            </div>
          )}

          {result && !isScanning && <WebsiteAuditResult result={result} />}
        </div>
      </div>
    </section>
  );
};
