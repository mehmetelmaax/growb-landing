"use client";

import React from "react";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface WebsiteAuditErrorProps {
  errorInfo: string;
  url: string;
}

export const WebsiteAuditError: React.FC<WebsiteAuditErrorProps> = ({ errorInfo, url }) => {
  const waUrl = SITE_CONFIG.getWhatsappUrl(
    `Merhaba GrowB Dijital, web sitem için manuel 15 dakikalık hız ve SEO analizi talep ediyorum: ${url}`
  );

  return (
    <div
      role="alert"
      className="animate-in fade-in mt-6 space-y-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 text-neutral-300 duration-300"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <div>
          <h4 className="mb-1 text-sm font-bold text-amber-400">Otomatik Tarama Sınırlaması</h4>
          <p className="text-xs leading-relaxed text-neutral-300">{errorInfo}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-2 sm:flex-row">
        <span className="text-xs text-neutral-400">
          Uzmanlarımız sitenizi ve rakiplerinizi manuel inceleyip 15 dakikalık ücretsiz rapor
          hazırlayabilir.
        </span>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick("audit_error_manual_request", url)}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#FFC300] px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-[#e6b000] focus-visible:ring-2 focus-visible:ring-white"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Ücretsiz Rapor İste</span>
        </a>
      </div>
    </div>
  );
};
