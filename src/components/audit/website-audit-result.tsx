"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, MessageSquare } from "lucide-react";

export interface AuditData {
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

interface WebsiteAuditResultProps {
  result: AuditData;
}

export const WebsiteAuditResult: React.FC<WebsiteAuditResultProps> = ({ result }) => {
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

  const waMessage = encodeURIComponent(
    `Merhaba GrowB Dijital, ${result.url} sitemin canlı PageSpeed analiz skorunu (${result.speedScore}/100) aldım. Detaylı optimizasyon görüşmesi yapmak istiyorum.`
  );

  return (
    <div
      role="region"
      aria-label="Google Lighthouse Canlı Analiz Sonuçları"
      className="animate-in fade-in slide-in-from-bottom-3 mt-8 border-t border-white/10 pt-8 duration-300"
    >
      <div className="mb-6 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>
            CANLI GOOGLE LIGHTHOUSE SONUCU {result.cachedAt ? `(${result.cachedAt})` : ""}
          </span>
        </div>
        <span className="max-w-xs truncate font-mono text-xs text-neutral-400">{result.url}</span>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className={`rounded-2xl border p-4 text-center ${getScoreBg(result.speedScore)}`}>
          <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
            Mobil Hız Skoru
          </span>
          <span className={`text-3xl font-black ${getScoreColor(result.speedScore)}`}>
            {result.speedScore}/100
          </span>
        </div>
        <div className={`rounded-2xl border p-4 text-center ${getScoreBg(result.seoScore)}`}>
          <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">SEO Skoru</span>
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

      {result.criticalIssues.length > 0 && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#141414] p-5">
          <div className="mb-3 flex items-center gap-2 text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Google Tarafından Tespit Edilen Kritik Sorunlar ({result.criticalIssues.length})
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
          href={`https://wa.me/905414842426?text=${waMessage}`}
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
