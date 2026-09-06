import React from "react";
import Link from "next/link";
import { ArrowUpRight, Star, Globe, MessageSquare } from "lucide-react";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { SITE_CONFIG } from "@/data/content";
import { FooterNavColumns } from "./footer/footer-nav-columns";

export const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="relative w-full select-none border-t border-white/10 bg-[#0A0A0A] px-3 py-8 sm:px-6 sm:py-12 lg:px-10"
    >
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-stretch gap-4 sm:gap-6 lg:flex-row">
        {/* Sol Dikey Sosyal Medya Hapı */}
        <div className="z-20 hidden shrink-0 flex-col items-center justify-center gap-5 self-center rounded-full border border-white/20 bg-white/10 px-3 py-7 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:flex">
          <a
            href={SITE_CONFIG.getWhatsappUrl("Merhaba GrowB Dijital, footer üzerinden ulaşıyorum.")}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-all duration-300 hover:bg-[#25D366] hover:text-[#0A0A0A] hover:shadow-[0_0_20px_#25D366] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            aria-label="WhatsApp İletişim"
            title="WhatsApp"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
          <a
            href={SITE_CONFIG.siteUrl}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-all duration-300 hover:bg-[#FFC300] hover:text-[#0A0A0A] hover:shadow-[0_0_20px_#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
            aria-label="GrowB Web Sitesi Ana Sayfası"
            title="GrowB Web"
          >
            <Globe className="h-4 w-4" />
          </a>
        </div>

        {/* Ana Koyu Kart */}
        <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-neutral-800 bg-[#111111] p-6 text-white shadow-2xl sm:rounded-[3rem] sm:p-10 md:p-12 lg:p-14">
          <div className="mb-6 flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-neutral-300 backdrop-blur-xl lg:hidden">
            <a
              href={SITE_CONFIG.getWhatsappUrl("Merhaba GrowB Dijital, web sitenizden ulaşıyorum.")}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#25D366]"
              aria-label="WhatsApp İletişim"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.siteUrl}
              className="transition-colors hover:text-[#FFC300]"
              aria-label="Web Sitesi"
            >
              <Globe className="h-4 w-4" />
            </a>
          </div>

          <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:mb-10 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-bold text-emerald-400">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              <span>Yeni İş Ortaklıklarına Açık • Eylül 2026 Kontenjanı</span>
            </div>

            <ScrollToTopButton />
          </div>

          <div className="mb-10 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col items-start space-y-4 lg:col-span-4">
              <div className="flex items-center gap-2">
                <span className="font-sans text-2xl font-black tracking-tight text-white">
                  Growb<span className="text-[#FFC300]">.</span>
                </span>
                <span className="rounded-full border border-[#FFC300]/30 bg-[#FFC300]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FFC300]">
                  BÜYÜME AJANSI
                </span>
              </div>

              <p className="max-w-sm font-sans text-xs leading-relaxed text-neutral-300 sm:text-sm">
                Dağınık ajans süreçlerini unutun. Web tasarımından Google reklamlarına ve WhatsApp
                satış botlarına kadar tüm operasyonu üstlenen kurumsal büyüme ortağınız.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#iletisim"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFC300] px-6 py-3 text-xs font-extrabold tracking-tight text-[#0A0A0A] shadow-[0_10px_25px_rgba(255,195,0,0.3)] transition-all duration-200 hover:scale-105 hover:bg-[#FFA000] focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
                >
                  <span>Projeyi Başlat</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                </a>

                <a
                  href={SITE_CONFIG.getWhatsappUrl("Merhaba GrowB Dijital, bilgi almak istiyorum.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/15 px-4 py-3 font-mono text-xs font-bold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFC300]"
                >
                  <span>WhatsApp Hattı</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-black text-white">
                  G
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 text-[#FFC300]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FFC300] text-[#FFC300]" />
                    ))}
                  </div>
                  <span className="mt-0.5 text-[11px] font-medium text-neutral-300">
                    5.0 / 5.0 • Google İşletme Doğrulanmış Profil
                  </span>
                </div>
              </div>
            </div>

            <FooterNavColumns />
          </div>

          <div className="relative flex w-full select-none flex-col items-center justify-center overflow-hidden py-4 sm:py-8">
            <h2 className="cursor-default whitespace-nowrap text-center font-sans text-[11vw] font-black leading-none tracking-[-0.04em] text-white transition-colors duration-500 hover:text-[#FFC300] sm:text-[9.5vw]">
              Büyüme Ortağın<span className="text-[#FFC300]">.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 font-sans text-xs text-neutral-400 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-black text-white">
                Growb<span className="text-[#FFC300]">.</span>
              </span>
              <span>© GrowB Dijital 2026</span>
              <span className="text-neutral-600" aria-hidden="true">
                |
              </span>
              <span>Kapadokya / Nevşehir</span>
              <span className="text-neutral-600" aria-hidden="true">
                |
              </span>
              <span className="text-neutral-300">Tüm Hakları Saklıdır</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 sm:gap-4">
              <Link
                href="/kvkk-aydinlatma-metni"
                className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
              >
                KVKK Aydınlatma Metni
              </Link>
              <span className="text-neutral-600" aria-hidden="true">
                |
              </span>
              <Link
                href="/gizlilik-politikasi"
                className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
              >
                Gizlilik Politikası
              </Link>
              <span className="text-neutral-600" aria-hidden="true">
                |
              </span>
              <Link
                href="/cerez-politikasi"
                className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
              >
                Çerez Politikası
              </Link>
              <span className="text-neutral-600" aria-hidden="true">
                |
              </span>
              <Link
                href="/mesafeli-hizmet-sozlesmesi"
                className="rounded transition-colors hover:text-[#FFC300] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
              >
                Mesafeli Hizmet Sözleşmesi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
