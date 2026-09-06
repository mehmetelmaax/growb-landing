"use client";

import React from "react";
import Link from "next/link";

interface ConsultationModalFieldsProps {
  formData: {
    siteUrl: string;
    sector: string;
    phone: string;
    contactName: string;
    website: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      siteUrl: string;
      sector: string;
      phone: string;
      contactName: string;
      website: string;
    }>
  >;
  kvkkConsent: boolean;
  setKvkkConsent: (v: boolean) => void;
  onFieldFocus: (f: string) => void;
  onFieldBlur: (f: string) => void;
}

export const ConsultationModalFields: React.FC<ConsultationModalFieldsProps> = ({
  formData,
  setFormData,
  kvkkConsent,
  setKvkkConsent,
  onFieldFocus,
  onFieldBlur,
}) => {
  return (
    <>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={formData.website}
        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
      />
      <div>
        <label htmlFor="hero-site-url" className="mb-1 block font-mono text-xs text-neutral-300">
          Web Siteniz veya İşletme Adınız *
        </label>
        <input
          id="hero-site-url"
          type="text"
          required
          placeholder="örn: www.ornekisletme.com veya Güven Nakliyat"
          value={formData.siteUrl}
          onFocus={() => onFieldFocus("siteUrl")}
          onBlur={() => onFieldBlur("siteUrl")}
          onChange={(e) => setFormData((prev) => ({ ...prev, siteUrl: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hero-sector" className="mb-1 block font-mono text-xs text-neutral-300">
            Sektörünüz
          </label>
          <input
            id="hero-sector"
            type="text"
            placeholder="örn: Klinik, Nakliyat"
            value={formData.sector}
            onFocus={() => onFieldFocus("sector")}
            onBlur={() => onFieldBlur("sector")}
            onChange={(e) => setFormData((prev) => ({ ...prev, sector: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="hero-name" className="mb-1 block font-mono text-xs text-neutral-300">
            Yetkili Adı
          </label>
          <input
            id="hero-name"
            type="text"
            placeholder="Adınız Soyadınız"
            value={formData.contactName}
            onFocus={() => onFieldFocus("contactName")}
            onBlur={() => onFieldBlur("contactName")}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="hero-phone" className="mb-1 block font-mono text-xs text-neutral-300">
          WhatsApp Telefon Numaranız *
        </label>
        <input
          id="hero-phone"
          type="tel"
          required
          placeholder="05XX XXX XX XX"
          value={formData.phone}
          onFocus={() => onFieldFocus("phone")}
          onBlur={() => onFieldBlur("phone")}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
        />
      </div>

      <div className="flex select-none items-start gap-2 pt-1 text-xs text-neutral-400">
        <input
          id="kvkk-consent-modal"
          type="checkbox"
          required
          checked={kvkkConsent}
          onChange={(e) => setKvkkConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer rounded border border-white/20 bg-white/5 text-[#FFC300] accent-[#FFC300] focus:ring-[#FFC300]"
        />
        <label htmlFor="kvkk-consent-modal" className="cursor-pointer">
          <Link
            href="/kvkk-aydinlatma-metni"
            target="_blank"
            className="text-white underline hover:text-[#FFC300]"
          >
            KVKK Aydınlatma Metni
          </Link>
          &apos;ni okudum, iletişim kurulmasına rıza veriyorum. *
        </label>
      </div>

      {formData.phone.trim().length > 3 && !kvkkConsent && (
        <p className="rounded-lg border border-[#FFC300]/20 bg-[#FFC300]/5 px-3 py-2 text-center font-mono text-xs text-[#FFC300]">
          ⚡ Lütfen yukarıdaki KVKK onay kutusunu işaretleyiniz.
        </p>
      )}
    </>
  );
};
