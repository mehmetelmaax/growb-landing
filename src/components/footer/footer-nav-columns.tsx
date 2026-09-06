import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";

export const FooterNavColumns: React.FC = () => {
  return (
    <>
      {/* Kolon 2: Büyüme & Keşif */}
      <div className="flex flex-col lg:col-span-2">
        <span className="mb-4 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#FFC300]">
          <span>// KEŞİF</span>
        </span>
        <ul className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
          <li>
            <a
              href="/#manifesto"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Büyüme Manifestosu
            </a>
          </li>
          <li>
            <a
              href="/#hizmetler"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              13 Uzmanlık Hizmeti
            </a>
          </li>
          <li>
            <a
              href="/#surec"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              4 Aşamalı Süreç
            </a>
          </li>
          <li>
            <a
              href="/#metrikler"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Saha Metrikleri
            </a>
          </li>
          <li>
            <Link
              href="/fiyatlar"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Fiyat Tarifemiz
            </Link>
          </li>
          <li>
            <a
              href="/#projeler"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Canlı Referanslar
            </a>
          </li>
          <li>
            <a
              href="/#skor-ogren"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Hız & SEO Testi
            </a>
          </li>
          <li>
            <a
              href="/#sss"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Sıkça Sorulanlar
            </a>
          </li>
        </ul>
      </div>

      {/* Kolon 3: Hizmetlerimiz (13 Uzmanlık) */}
      <div className="flex flex-col lg:col-span-3">
        <span className="mb-4 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#FFC300]">
          <span>// HİZMETLERİMİZ</span>
          <span className="rounded-full bg-[#FFC300] px-1.5 py-0.5 text-[9px] font-black text-[#0A0A0A]">
            13
          </span>
        </span>
        <ul className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
          <li>
            <Link
              href="/hizmetler/web-tasarim-yazilim"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Web Tasarım & Yazılım
            </Link>
          </li>
          <li>
            <Link
              href="/hizmetler/google-harita-yerel-seo"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Google Harita & Yerel SEO
            </Link>
          </li>
          <li>
            <Link
              href="/hizmetler/google-ads-reklamlari"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Google Ads Performans
            </Link>
          </li>
          <li>
            <Link
              href="/hizmetler/meta-reklam-yonetimi"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              Meta (Instagram/FB) Reklam
            </Link>
          </li>
          <li>
            <Link
              href="/hizmetler/video-reels-ai-produksiyon"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              4K Dikey Reels Video
            </Link>
          </li>
          <li>
            <Link
              href="/hizmetler/crm-whatsapp-takip"
              className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              WhatsApp CRM Satış Botu
            </Link>
          </li>
          <li>
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-1 rounded pt-1 font-mono text-xs font-bold text-[#FFC300] hover:underline focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            >
              <span>Tüm 13 Hizmeti İncele (6-1-6)</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Kolon 4: İletişim & Ofis */}
      <div className="flex flex-col lg:col-span-3">
        <span className="mb-4 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#FFC300]">
          <span>// İLETİŞİM & OFİS</span>
        </span>
        <div className="flex flex-col space-y-3 text-sm text-neutral-300">
          <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <MapPin className="h-4 w-4 shrink-0 text-[#FFC300]" />
              <span>{SITE_CONFIG.location} / Kapadokya Bölgesi</span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400">{SITE_CONFIG.address}</p>
          </div>

          <a
            href={SITE_CONFIG.getPhoneUrl()}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-all hover:border-[#FFC300]/40 hover:bg-[#FFC300]/10 focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFC300]/10 text-[#FFC300]">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-neutral-400">
                  Doğrudan Danışman Hattı
                </span>
                <span className="text-xs font-bold text-white transition-colors group-hover:text-[#FFC300]">
                  {SITE_CONFIG.phone}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-colors group-hover:text-[#FFC300]" />
          </a>

          <a
            href={SITE_CONFIG.getMailtoUrl()}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-all hover:border-[#FFC300]/40 hover:bg-[#FFC300]/10 focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFC300]/10 text-[#FFC300]">
                <Mail className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-neutral-400">
                  E-Posta Teklif & Bilgi
                </span>
                <span className="text-xs font-bold text-white transition-colors group-hover:text-[#FFC300]">
                  {SITE_CONFIG.email}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-colors group-hover:text-[#FFC300]" />
          </a>

          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-all hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E1306C]/15 text-[#E1306C]">
                <Instagram className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-neutral-400">Instagram</span>
                <span className="text-xs font-bold text-white transition-colors group-hover:text-[#E1306C]">
                  {SITE_CONFIG.instagramHandle}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-colors group-hover:text-[#E1306C]" />
          </a>

          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-3 font-mono text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#FFC300]" />
              <span>Pzt - Cmt: 09:00 - 19:00</span>
            </span>
            <span className="font-bold text-emerald-400">Açık</span>
          </div>
        </div>
      </div>
    </>
  );
};
