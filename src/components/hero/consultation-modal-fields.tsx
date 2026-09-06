"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, Video, PhoneCall } from "lucide-react";

export interface ConsultationFormData {
  siteUrl: string;
  sector: string;
  phone: string;
  contactName: string;
  website: string;
  appointmentDate: string;
  appointmentTime: string;
  meetingType: string;
}

interface ConsultationModalFieldsProps {
  formData: ConsultationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ConsultationFormData>>;
  kvkkConsent: boolean;
  setKvkkConsent: (v: boolean) => void;
  onFieldFocus: (f: string) => void;
  onFieldBlur: (f: string) => void;
}

const DATE_OPTIONS = ["Bugün", "Yarın", "Pazartesi", "İlk Uygun Gün"];
const TIME_OPTIONS = ["10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00", "17:00 - 19:00"];
const CHANNEL_OPTIONS = [
  { id: "Telefon Görüşmesi", icon: PhoneCall, label: "Telefon" },
  { id: "Google Meet", icon: Video, label: "Google Meet" },
];

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

      {/* Randevu Günü ve Saati Seçimi */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#FFC300]">
            <Calendar className="h-3.5 w-3.5" />
            <span>Tercih Edilen Randevu Günü</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-400">
            <Clock className="h-3 w-3" />
            <span>15 Dk Görüşme</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {DATE_OPTIONS.map((d) => {
            const isSelected = formData.appointmentDate === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, appointmentDate: d }))}
                className={`rounded-lg px-2 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#FFC300] text-black shadow-sm"
                    : "border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>

        <div className="mt-3">
          <label className="mb-1.5 block font-mono text-[11px] uppercase text-neutral-400">
            Saat Aralığı
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {TIME_OPTIONS.map((t) => {
              const isSelected = formData.appointmentTime === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, appointmentTime: t }))}
                  className={`rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold transition-all ${
                    isSelected
                      ? "border border-[#FFC300] bg-[#FFC300]/20 text-[#FFC300]"
                      : "border border-white/5 bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-1.5 block font-mono text-[11px] uppercase text-neutral-400">
            Görüşme Kanalı
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CHANNEL_OPTIONS.map((c) => {
              const isSelected = formData.meetingType === c.id;
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, meetingType: c.id }))}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "border border-[#FFC300]/50 bg-[#FFC300]/15 text-[#FFC300]"
                      : "border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hero-name" className="mb-1 block font-mono text-xs text-neutral-300">
            Yetkili Adı Soyadı *
          </label>
          <input
            id="hero-name"
            type="text"
            required
            placeholder="Mehmet Bey"
            value={formData.contactName}
            onFocus={() => onFieldFocus("contactName")}
            onBlur={() => onFieldBlur("contactName")}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="hero-phone" className="mb-1 block font-mono text-xs text-[#FFC300]">
            Telefon Numarası *
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
            className="w-full rounded-xl border border-[#FFC300]/40 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hero-site-url" className="mb-1 block font-mono text-xs text-neutral-300">
            Web Siteniz / İşletmeniz
          </label>
          <input
            id="hero-site-url"
            type="text"
            placeholder="örn: www.ornek.com veya Firma Adı"
            value={formData.siteUrl}
            onFocus={() => onFieldFocus("siteUrl")}
            onBlur={() => onFieldBlur("siteUrl")}
            onChange={(e) => setFormData((prev) => ({ ...prev, siteUrl: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="hero-sector" className="mb-1 block font-mono text-xs text-neutral-300">
            Sektörünüz
          </label>
          <input
            id="hero-sector"
            type="text"
            placeholder="örn: Nakliyat, Klinik, Otel"
            value={formData.sector}
            onFocus={() => onFieldFocus("sector")}
            onBlur={() => onFieldBlur("sector")}
            onChange={(e) => setFormData((prev) => ({ ...prev, sector: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
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
          &apos;ni okudum, randevu için iletişim kurulmasına onay veriyorum. *
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
