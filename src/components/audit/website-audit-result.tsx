"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";

export interface AuditData {
  url: string;
  speedScore?: number;
  performanceScore?: number;
  seoScore: number;
  bestPracticesScore?: number;
  speedSeconds?: string;
  fcp: string;
  lcp: string;
  cls: string;
  tbt?: string;
  criticalIssues?: string[];
  isRealData?: boolean;
  cachedAt?: string;
}

interface WebsiteAuditResultProps {
  result: AuditData;
}

export const WebsiteAuditResult: React.FC<WebsiteAuditResultProps> = ({ result }) => {
  const perfScore = result.performanceScore ?? result.speedScore ?? 0;
  const seoScore = result.seoScore ?? 0;
  const bpScore = result.bestPracticesScore ?? 0;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-[#10B981]";
    if (score >= 50) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-[#10B981]/10 border-[#10B981]/30";
    if (score >= 50) return "bg-[#F59E0B]/10 border-[#F59E0B]/30";
    return "bg-[#EF4444]/10 border-[#EF4444]/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "İyi (90-100)";
    if (score >= 50) return "Geliştirilmeli (50-89)";
    return "Zayıf (0-49)";
  };

  const waUrl = SITE_CONFIG.getWhatsappUrl(
    `Merhaba GrowB Dijital, ${result.url} sitemin canlı PageSpeed analiz skorlarını (Performans: ${perfScore}/100, SEO: ${seoScore}/100, Best Practices: ${bpScore}/100) aldım. Hızlandırma ve optimizasyon görüşmesi yapmak istiyorum.`
  );

  return (
    <div
      role="region"
      aria-label="Google PageSpeed Canlı Analiz Sonuçları"
      className="animate-in fade-in slide-in-from-bottom-3 mt-8 border-t border-white/10 pt-8 duration-300"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>CANLI GOOGLE PAGESPEED SONUCU {result.cachedAt ? `(${result.cachedAt})` : ""}</span>
        </div>
        <span className="max-w-xs truncate font-mono text-xs text-neutral-400">{result.url}</span>
      </div>

      {/* 1. Skorlar (0-49 kırmızı, 50-89 sarı, 90-100 yeşil) */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className={`rounded-2xl border p-5 text-center ${getScoreBg(perfScore)}`}>
          <span className="mb-1 block font-mono text-xs font-semibold uppercase text-neutral-400">
            Performans Skoru
          </span>
          <span className={`text-4xl font-black tracking-tight ${getScoreColor(perfScore)}`}>
            {perfScore}/100
          </span>
          <span className="mt-1 block font-mono text-[10px] text-neutral-400">
            {getScoreLabel(perfScore)}
          </span>
        </div>

        <div className={`rounded-2xl border p-5 text-center ${getScoreBg(seoScore)}`}>
          <span className="mb-1 block font-mono text-xs font-semibold uppercase text-neutral-400">
            SEO Skoru
          </span>
          <span className={`text-4xl font-black tracking-tight ${getScoreColor(seoScore)}`}>
            {seoScore}/100
          </span>
          <span className="mt-1 block font-mono text-[10px] text-neutral-400">
            {getScoreLabel(seoScore)}
          </span>
        </div>

        <div className={`rounded-2xl border p-5 text-center ${getScoreBg(bpScore)}`}>
          <span className="mb-1 block font-mono text-xs font-semibold uppercase text-neutral-400">
            Best Practices Skoru
          </span>
          <span className={`text-4xl font-black tracking-tight ${getScoreColor(bpScore)}`}>
            {bpScore}/100
          </span>
          <span className="mt-1 block font-mono text-[10px] text-neutral-400">
            {getScoreLabel(bpScore)}
          </span>
        </div>
      </div>

      {/* 2. Skorların Altında Core Web Vitals Metrikleri (LCP, CLS, FCP) */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 text-center">
          <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
            LCP (Largest Contentful Paint)
          </span>
          <span className="text-2xl font-black text-white">{result.lcp}</span>
          <span className="mt-0.5 block font-mono text-[10px] text-neutral-500">Hedef: ≤ 2.5s</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 text-center">
          <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
            CLS (Cumulative Layout Shift)
          </span>
          <span className="text-2xl font-black text-white">{result.cls}</span>
          <span className="mt-0.5 block font-mono text-[10px] text-neutral-500">Hedef: ≤ 0.1</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 text-center">
          <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
            FCP (First Contentful Paint)
          </span>
          <span className="text-2xl font-black text-white">{result.fcp}</span>
          <span className="mt-0.5 block font-mono text-[10px] text-neutral-500">Hedef: ≤ 1.8s</span>
        </div>
      </div>

      {Boolean(result.criticalIssues && result.criticalIssues.length > 0) && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#141414] p-5">
          <div className="mb-3 flex items-center gap-2 text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Google Tarafından Tespit Edilen Kritik Sorunlar ({result.criticalIssues?.length})
            </span>
          </div>
          <ul className="space-y-2">
            {result.criticalIssues?.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F59E0B]" />
                <span className="leading-relaxed">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

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
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-[#FFC300] px-5 py-2.5 text-xs font-bold text-[#0A0A0A] shadow-lg transition-all hover:bg-[#e6b000] focus-visible:ring-2 focus-visible:ring-white"
        >
          <MessageSquare className="h-4 w-4" />
          <span>WhatsApp&apos;tan Çözüm Planı İste</span>
        </a>
      </div>
    </div>
  );
};
