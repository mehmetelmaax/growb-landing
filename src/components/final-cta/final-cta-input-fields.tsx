import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";

interface FinalCtaInputFieldsProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  sector: string;
  setSector: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  onFieldFocus: (field: string) => void;
  onFieldBlur: (field: string) => void;
}

export const FinalCtaInputFields: React.FC<FinalCtaInputFieldsProps> = ({
  name,
  setName,
  phone,
  setPhone,
  sector,
  setSector,
  notes,
  setNotes,
  onFieldFocus,
  onFieldBlur,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="final-name"
            className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-neutral-400"
          >
            Yetkili Adı Soyadı
          </label>
          <input
            id="final-name"
            type="text"
            value={name}
            onFocus={() => onFieldFocus("name")}
            onBlur={() => onFieldBlur("name")}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn: Mehmet Demir"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="final-phone"
            className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]"
          >
            Telefon Numarası *
          </label>
          <input
            id="final-phone"
            type="tel"
            required
            value={phone}
            onFocus={() => onFieldFocus("phone")}
            onBlur={() => onFieldBlur("phone")}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={SITE_CONFIG.phone}
            className="w-full rounded-xl border border-[#FFC300]/50 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#FFC300] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="final-sector"
          className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-neutral-400"
        >
          Sektörünüz / İşletmeniz
        </label>
        <input
          id="final-sector"
          type="text"
          value={sector}
          onFocus={() => onFieldFocus("sector")}
          onBlur={() => onFieldBlur("sector")}
          onChange={(e) => setSector(e.target.value)}
          placeholder="Örn: Evden Eve Nakliyat, Klinik, Otel..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#FFC300] focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="final-notes"
          className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-neutral-400"
        >
          Eklemek İstediğiniz Not (Opsiyonel)
        </label>
        <textarea
          id="final-notes"
          rows={2}
          value={notes}
          onFocus={() => onFieldFocus("notes")}
          onBlur={() => onFieldBlur("notes")}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Örn: Mevcut sitemiz var ancak Google Haritalarda çıkmıyoruz..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#FFC300] focus:outline-none"
        />
      </div>
    </>
  );
};
