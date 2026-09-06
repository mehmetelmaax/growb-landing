"use client";

import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

interface WebsiteAuditInputsProps {
  url: string;
  setUrl: (v: string) => void;
  sector: string;
  setSector: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  kvkkConsent: boolean;
  setKvkkConsent: (v: boolean) => void;
}

export const WebsiteAuditInputs: React.FC<WebsiteAuditInputsProps> = ({
  url,
  setUrl,
  sector,
  setSector,
  phone,
  setPhone,
  website,
  setWebsite,
  kvkkConsent,
  setKvkkConsent,
}) => {
  return (
    <>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
      />
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
    </>
  );
};
