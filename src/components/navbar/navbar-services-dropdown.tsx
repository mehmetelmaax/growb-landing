"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface CoreServiceItem {
  title: string;
  desc: string;
  slug: string;
}

export const CORE_NAVBAR_SERVICES: CoreServiceItem[] = [
  {
    title: "Web Tasarım & Yazılım",
    desc: "Markanızı 7/24 müşterilerinizle buluşturan modern satış altyapısı",
    slug: "web-tasarim-yazilim",
  },
  {
    title: "Google Harita & Yerel SEO",
    desc: "Bölgenizdeki aramalarda 1. sıraya çıkın, doğrudan aranın",
    slug: "google-harita-yerel-seo",
  },
  {
    title: "Meta & Google Satış Reklamları",
    desc: "Doğrudan sıcak müşteri ve ciro kazandıran hedefli reklamlar",
    slug: "meta-reklam-yonetimi",
  },
  {
    title: "Sosyal Medya & Reels Video",
    desc: "Algoritmaları fetheden dikey Reels ve prestijli içerik akışı",
    slug: "video-reels-ai-produksiyon",
  },
  {
    title: "CRM & WhatsApp Satış Otomasyonu",
    desc: "Gece gelen müşterileri bile kaçırmayan 7/24 akıllı satış hattı",
    slug: "crm-whatsapp-takip",
  },
];

interface NavbarServicesDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const NavbarServicesDropdown: React.FC<NavbarServicesDropdownProps> = ({
  isOpen,
  onToggle,
  onClose,
  dropdownRef,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="services-dropdown-btn"
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="services-dropdown-panel"
        className={`relative inline-flex items-center py-1 transition-colors focus-visible:ring-2 focus-visible:ring-[#FFC300] ${
          isOpen ? "font-bold text-[#FFC300]" : "hover:text-white"
        }`}
      >
        <span>Hizmetler</span>
        <span className="absolute -right-3.5 -top-2.5 rounded-full bg-[#FFC300] px-1.5 py-0.5 text-[9px] font-black leading-none text-[#0A0A0A] shadow-sm">
          13
        </span>
      </button>

      <div
        id="services-dropdown-panel"
        role="region"
        aria-labelledby="services-dropdown-btn"
        onMouseLeave={onClose}
        className={`absolute left-1/2 top-full z-50 mt-4 w-[680px] -translate-x-1/2 rounded-3xl border border-neutral-200 bg-white p-6 text-[#0A0A0A] shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out sm:p-8 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 transform border-l border-t border-neutral-200 bg-white" />

        <div className="grid grid-cols-12 items-start gap-6">
          <div className="col-span-7 space-y-3">
            {CORE_NAVBAR_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                onClick={onClose}
                className="group -mx-2 block rounded-xl p-2 transition-all hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-[#FFC300]"
              >
                <h4 className="flex items-center justify-between text-sm font-bold text-neutral-900 transition-colors group-hover:text-amber-600">
                  <span>{service.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-amber-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </h4>
                <p className="mt-0.5 text-xs leading-snug text-neutral-500">{service.desc}</p>
              </Link>
            ))}
          </div>

          <div className="col-span-5 flex h-full flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50 p-4">
            <div>
              <h4 className="mb-1 text-sm font-black text-neutral-900">Tüm Hizmetlerimiz (13)</h4>
              <p className="mb-3 text-xs leading-relaxed text-neutral-600">
                Dijitaldeki tüm işlerinizi üstlenen 13 profesyonel operasyon.
              </p>
            </div>

            <div className="relative mb-3 h-24 w-full overflow-hidden rounded-xl border border-neutral-200">
              {/* TODO_CONTENT: [Gerçek ajans ekibi fotoğraf çekimi sonrası güncellenecek - Temsili stok fotoğrafı] */}
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                alt="Temsili görsel"
                fill
                className="object-cover"
              />
            </div>

            <Link
              href="/hizmetler"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0A0A0A] py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              <span>Tüm 13 Hizmeti Gör (Kovan)</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#FFC300]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
