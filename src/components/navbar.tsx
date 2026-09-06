"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Moon, Sun } from "lucide-react";
import { NavbarServicesDropdown } from "./navbar/navbar-services-dropdown";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkIcon, setIsDarkIcon] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsServicesOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setIsServicesOpen(false);
    setIsMobileOpen(false);
  };

  const coreServices = [
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

  return (
    <header
      className={`pointer-events-none fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "top-3 px-3 sm:top-4 sm:px-6" : "top-0 px-4 py-4 sm:px-6 sm:py-5 lg:px-8"
      }`}
    >
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "w-full max-w-5xl gap-6 rounded-full border border-white/20 bg-[#0A0A0A]/95 px-7 py-3 text-white shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl xl:gap-8"
            : "mx-auto w-full max-w-7xl rounded-2xl border border-white/15 bg-[#0A0A0A] px-6 py-3.5 text-white shadow-2xl sm:px-8"
        }`}
      >
        <div className="flex items-center justify-start lg:flex-1">
          <Link href="/" className="group flex shrink-0 items-center">
            <span className="text-2xl font-black tracking-tight text-white transition-opacity group-hover:opacity-90">
              Growb<span className="text-[#FFC300]">.</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-6 text-sm font-medium text-neutral-300 lg:flex xl:gap-8">
          <NavbarServicesDropdown
            isOpen={isServicesOpen}
            onClose={() => setIsServicesOpen(false)}
            dropdownRef={dropdownRef}
            coreServices={coreServices}
          />

          <Link
            href="/#about"
            onClick={unlockScroll}
            className="transition-colors hover:text-white"
          >
            Hakkımızda
          </Link>

          <Link
            href="/#surec"
            onClick={unlockScroll}
            className="transition-colors hover:text-white"
          >
            Süreç
          </Link>

          <Link
            href="/fiyatlar"
            onClick={unlockScroll}
            className="transition-colors hover:text-white"
          >
            Fiyatlarımız
          </Link>

          <Link
            href="/#projeler"
            onClick={unlockScroll}
            className="transition-colors hover:text-white"
          >
            Referanslar
          </Link>

          <Link
            href="/#skor-ogren"
            onClick={unlockScroll}
            className="transition-colors hover:text-white"
          >
            Skor Testi
          </Link>

          <Link
            href="/#iletisim"
            onClick={unlockScroll}
            className="transition-colors hover:text-white"
          >
            İletişim
          </Link>
        </nav>

        {/* Sağ Taraf: Tema İkonu ve Proje Başlat Butonu */}
        <div className="hidden shrink-0 items-center justify-end gap-4 lg:flex lg:flex-1 xl:gap-5">
          {/* Moon / Tema İkonu */}
          <button
            type="button"
            onClick={() => setIsDarkIcon((prev) => !prev)}
            aria-label="Tema Modu"
            className="p-1 text-neutral-400 transition-colors hover:text-white"
          >
            {isDarkIcon ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#FFC300]" />}
          </button>

          {/* Siyahın Sağ Üstüne Oturan Buton: Proje Başlat ↗ */}
          <a
            href="#iletisim"
            onClick={unlockScroll}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFC300] px-5 py-2.5 text-xs font-bold tracking-tight text-[#0A0A0A] shadow-md transition-all hover:scale-105 hover:bg-[#FFA000] active:scale-95 sm:text-sm"
          >
            <span>Proje Başlat</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobil Kontroller */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href="#iletisim"
            className="inline-flex items-center gap-1 rounded-full bg-[#FFC300] px-4 py-2 text-xs font-bold text-[#0A0A0A] hover:bg-[#FFA000]"
          >
            <span>Başlat</span>
            <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
          </a>

          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Menü"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü (Pure CSS Transition) */}
      <div
        className={`pointer-events-auto fixed left-4 right-4 top-20 z-50 space-y-4 rounded-3xl border border-white/15 bg-[#0A0A0A]/95 p-6 text-white shadow-2xl backdrop-blur-2xl transition-all duration-200 ease-out lg:hidden ${
          isMobileOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
            Menü
          </span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 text-neutral-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Link
          href="/hizmetler"
          onClick={unlockScroll}
          className="flex items-center justify-between text-base font-bold text-neutral-200"
        >
          <span>Hizmetlerimiz (Kovan)</span>
          <span className="rounded-full bg-[#FFC300] px-1.5 py-0.5 text-[10px] font-black text-black">
            13
          </span>
        </Link>
        <Link
          href="/#about"
          onClick={unlockScroll}
          className="block text-base font-bold text-neutral-200"
        >
          Hakkımızda
        </Link>
        <Link
          href="/#surec"
          onClick={unlockScroll}
          className="block text-base font-bold text-neutral-200"
        >
          Süreçlerimiz
        </Link>
        <Link
          href="/fiyatlar"
          onClick={unlockScroll}
          className="block text-base font-bold text-[#FFC300]"
        >
          Fiyatlarımız & Kampanyalar
        </Link>
        <Link
          href="/#projeler"
          onClick={unlockScroll}
          className="block text-base font-bold text-neutral-200"
        >
          Referanslar
        </Link>
        <Link
          href="/#skor-ogren"
          onClick={unlockScroll}
          className="block text-base font-bold text-neutral-200"
        >
          Hız & SEO Skor Testi
        </Link>
        <Link
          href="/#iletisim"
          onClick={unlockScroll}
          className="block text-base font-bold text-neutral-200"
        >
          İletişim
        </Link>

        <div className="border-t border-white/10 pt-3">
          <a
            href="#iletisim"
            onClick={unlockScroll}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#FFC300] py-3 text-sm font-bold text-[#0A0A0A]"
          >
            <span>Proje Başlat</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </header>
  );
};
