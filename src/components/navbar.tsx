"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import Image from "next/image";

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
    { title: "Web Tasarım & Yazılım", desc: "Markanızı 7/24 müşterilerinizle buluşturan modern satış altyapısı", slug: "web-tasarim-yazilim" },
    { title: "Google Harita & Yerel SEO", desc: "Bölgenizdeki aramalarda 1. sıraya çıkın, doğrudan aranın", slug: "google-harita-yerel-seo" },
    { title: "Meta & Google Satış Reklamları", desc: "Doğrudan sıcak müşteri ve ciro kazandıran hedefli reklamlar", slug: "meta-reklam-yonetimi" },
    { title: "Sosyal Medya & Reels Video", desc: "Algoritmaları fetheden dikey Reels ve prestijli içerik akışı", slug: "video-reels-ai-produksiyon" },
    { title: "CRM & WhatsApp Satış Otomasyonu", desc: "Gece gelen müşterileri bile kaçırmayan 7/24 akıllı satış hattı", slug: "crm-whatsapp-takip" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "top-3 sm:top-4 px-3 sm:px-6"
          : "top-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-5"
      }`}
    >
      {/* Siyahı Büyültülmüş, Ferah ve Güçlü Üst Bar */}
      <div
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
          isScrolled
            ? "w-full max-w-5xl px-7 py-3 rounded-full bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white gap-6 xl:gap-8"
            : "w-full max-w-7xl mx-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-[#0A0A0A] border border-white/15 shadow-2xl text-white"
        }`}
      >
        {/* Brand Logo - Solda Growb. */}
        <div className="flex items-center justify-start lg:flex-1">
          <Link href="/" className="flex items-center shrink-0 group">
            <span className="font-black text-2xl tracking-tight text-white group-hover:opacity-90 transition-opacity">
              Growb<span className="text-[#FFC300]">.</span>
            </span>
          </Link>
        </div>

        {/* Masaüstü Menü Grubu: Tam Ortalanmış Nav Menüleri */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-sm font-medium text-neutral-300">
          
          {/* Hizmetler Dropdown (13 Badge ile) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsServicesOpen((prev) => !prev)}
              onMouseEnter={() => setIsServicesOpen(true)}
              className={`relative inline-flex items-center py-1 transition-colors ${
                isServicesOpen ? "text-[#FFC300] font-bold" : "hover:text-white"
              }`}
            >
              <span>Hizmetler</span>
              <span className="absolute -top-2.5 -right-3.5 px-1.5 py-0.5 rounded-full bg-[#FFC300] text-[#0A0A0A] text-[9px] font-black leading-none shadow-sm">
                13
              </span>
            </button>

            {/* MadeByShape Floating Card */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[680px] bg-white text-[#0A0A0A] rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] z-50 border border-neutral-200"
                >
                  <div className="w-3.5 h-3.5 bg-white border-t border-l border-neutral-200 absolute -top-2 left-1/2 -translate-x-1/2 transform rotate-45" />

                  <div className="grid grid-cols-12 gap-6 items-start">
                    <div className="col-span-7 space-y-4">
                      {coreServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/hizmetler/${service.slug}`}
                          onClick={() => setIsServicesOpen(false)}
                          className="group block p-2 -mx-2 rounded-xl hover:bg-neutral-50 transition-all"
                        >
                          <h4 className="text-sm font-bold text-neutral-900 group-hover:text-amber-600 transition-colors flex items-center justify-between">
                            <span>{service.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-600" />
                          </h4>
                          <p className="text-xs text-neutral-500 leading-snug mt-0.5">
                            {service.desc}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="col-span-5 bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 flex flex-col justify-between h-full">
                      <div>
                        <h4 className="text-sm font-black text-neutral-900 mb-1">
                          Tüm Hizmetlerimiz (13)
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                          Dijitaldeki tüm işlerinizi üstlenen, cironuzu katlayan 13 profesyonel pazarlama operasyonu.
                        </p>
                      </div>

                      <div className="relative w-full h-24 rounded-xl overflow-hidden mb-3 border border-neutral-200">
                        <Image
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                          alt="GrowB Dijital Strateji"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <Link
                        href="/hizmetler"
                        onClick={() => setIsServicesOpen(false)}
                        className="w-full py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Tüm 13 Hizmeti Gör (Kovan)</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FFC300]" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#about" onClick={unlockScroll} className="hover:text-white transition-colors">
            Hakkımızda
          </Link>

          <Link href="/#surec" onClick={unlockScroll} className="hover:text-white transition-colors">
            Süreç
          </Link>

          <Link href="/fiyatlar" onClick={unlockScroll} className="hover:text-white transition-colors">
            Fiyatlarımız
          </Link>

          <Link href="/#projeler" onClick={unlockScroll} className="hover:text-white transition-colors">
            Referanslar
          </Link>

          <Link href="/#skor-ogren" onClick={unlockScroll} className="hover:text-white transition-colors">
            Skor Testi
          </Link>

          <Link href="/#iletisim" onClick={unlockScroll} className="hover:text-white transition-colors">
            İletişim
          </Link>
        </nav>

        {/* Sağ Taraf: Tema İkonu ve Proje Başlat Butonu */}
        <div className="hidden lg:flex items-center justify-end lg:flex-1 gap-4 xl:gap-5 shrink-0">
          {/* Moon / Tema İkonu */}
          <button
            type="button"
            onClick={() => setIsDarkIcon((prev) => !prev)}
            aria-label="Tema Modu"
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            {isDarkIcon ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#FFC300]" />}
          </button>

          {/* Siyahın Sağ Üstüne Oturan Buton: Proje Başlat ↗ */}
          <a
            href="#iletisim"
            onClick={unlockScroll}
            className="px-5 py-2.5 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-bold text-xs sm:text-sm tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Proje Başlat</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobil Kontroller */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <a
            href="#iletisim"
            className="px-4 py-2 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-bold text-xs inline-flex items-center gap-1"
          >
            <span>Başlat</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </a>

          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Menü"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto fixed top-20 left-4 right-4 bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 text-white space-y-4 shadow-2xl z-50 lg:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">Menü</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Link
              href="/hizmetler"
              onClick={unlockScroll}
              className="flex items-center justify-between text-base font-bold text-neutral-200"
            >
              <span>Hizmetlerimiz (Kovan)</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#FFC300] text-black text-[10px] font-black">13</span>
            </Link>
            <Link href="/#about" onClick={unlockScroll} className="block text-base font-bold text-neutral-200">
              Hakkımızda
            </Link>
            <Link href="/#surec" onClick={unlockScroll} className="block text-base font-bold text-neutral-200">
              Süreçlerimiz
            </Link>
            <Link href="/fiyatlar" onClick={unlockScroll} className="block text-base font-bold text-[#FFC300]">
              Fiyatlarımız & Kampanyalar
            </Link>
            <Link href="/#projeler" onClick={unlockScroll} className="block text-base font-bold text-neutral-200">
              Referanslar
            </Link>
            <Link href="/#skor-ogren" onClick={unlockScroll} className="block text-base font-bold text-neutral-200">
              Hız & SEO Skor Testi
            </Link>
            <Link href="/#iletisim" onClick={unlockScroll} className="block text-base font-bold text-neutral-200">
              İletişim
            </Link>

            <div className="pt-3 border-t border-white/10">
              <a
                href="#iletisim"
                onClick={unlockScroll}
                className="w-full py-3 rounded-full bg-[#FFC300] text-[#0A0A0A] font-bold text-sm flex items-center justify-center gap-1.5"
              >
                <span>Proje Başlat</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
