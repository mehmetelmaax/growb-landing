import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  MapPin, 
  Star, 
  Globe,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Zap,
  MessageSquare
} from "lucide-react";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { SITE_CONFIG } from "@/data/content";

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative w-full bg-[#0A0A0A] py-8 sm:py-12 px-3 sm:px-6 lg:px-10 border-t border-white/10 select-none">
      {/* Kapsayıcı: Sol Dikey Buzlu Cam Sosyal Medya Hapı + Ana Koyu Kart */}
      <div className="max-w-[1440px] mx-auto relative flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch">
        
        {/* ========================================================= */}
        {/* SOL DİKEY SOSYAL MEDYA HAPI: BUZLU CAM & SARI YANAN HOVER */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-col items-center justify-center py-7 px-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.5)] shrink-0 self-center gap-5 z-20">
          <a
            href={SITE_CONFIG.getWhatsappUrl("Merhaba GrowB Dijital, footer üzerinden ulaşıyorum.")}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-[#0A0A0A] hover:bg-[#25D366] hover:shadow-[0_0_20px_#25D366] transition-all duration-300"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href={SITE_CONFIG.siteUrl}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-[#0A0A0A] hover:bg-[#FFC300] hover:shadow-[0_0_20px_#FFC300] transition-all duration-300"
            aria-label="GrowB Web"
            title="GrowB Web"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>

        {/* ========================================================= */}
        {/* ANA KOYU KART: 4 KOLONLU NAVİGASYON VE İLETİŞİM             */}
        {/* ========================================================= */}
        <div className="flex-1 bg-[#111111] text-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 lg:p-14 relative overflow-hidden shadow-2xl border border-neutral-800">
          
          {/* Mobil Buzlu Cam Sosyal Medya Rozeti */}
          <div className="lg:hidden flex items-center gap-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-neutral-300 mb-6 w-fit">
            <a 
              href={SITE_CONFIG.getWhatsappUrl("Merhaba GrowB Dijital, web sitenizden ulaşıyorum.")} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a 
              href={SITE_CONFIG.siteUrl} 
              className="hover:text-[#FFC300] transition-colors"
              aria-label="Web Sitesi"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Üst Kısım: Canlı Durum Rozeti & SAĞ ÜST YUKARI ÇIK BUTONU */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Yeni İş Ortaklıklarına Açık • Eylül 2026 Kontenjanı</span>
            </div>

            <ScrollToTopButton />
          </div>

          {/* 4 Kolonlu Zenginleştirilmiş Navigasyon ve İletişim Izgarası */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-10 items-start">
            
            {/* Kolon 1: Projeyi Başlat, Logo Açıklaması & Hızlı WhatsApp */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl text-white tracking-tight font-sans">
                  Growb<span className="text-[#FFC300]">.</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFC300]/15 border border-[#FFC300]/30 text-[#FFC300] text-[10px] font-mono font-bold">
                  BÜYÜME AJANSI
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-sm">
                Dağınık ajans süreçlerini unutun. Web tasarımından Google reklamlarına ve WhatsApp satış botlarına kadar tüm operasyonu üstlenen kurumsal büyüme ortağınız.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#iletisim"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:scale-105 shadow-[0_10px_25px_rgba(255,195,0,0.3)]"
                >
                  <span>Projeyi Başlat</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </a>

                <a
                  href={SITE_CONFIG.getWhatsappUrl("Merhaba GrowB Dijital, bilgi almak istiyorum.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-mono font-bold transition-all"
                >
                  <span>WhatsApp Hattı</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Google Değerlendirmesi */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-xs">
                  G
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-[#FFC300] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFC300] text-[#FFC300]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium mt-0.5">
                    5.0 / 5.0 • Google İşletme Doğrulanmış Profil
                  </span>
                </div>
              </div>
            </div>

            {/* Kolon 2: Büyüme & Keşif */}
            <div className="lg:col-span-2 flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC300] uppercase mb-4 flex items-center gap-1.5">
                <span>// KEŞİF</span>
              </span>
              <ul className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
                <li><a href="#manifesto" className="hover:text-[#FFC300] transition-colors">Büyüme Manifestosu</a></li>
                <li><a href="#hizmetler" className="hover:text-[#FFC300] transition-colors">13 Uzmanlık Hizmeti</a></li>
                <li><a href="#surec" className="hover:text-[#FFC300] transition-colors">4 Aşamalı Süreç</a></li>
                <li><a href="#metrikler" className="hover:text-[#FFC300] transition-colors">Saha Metrikleri</a></li>
                <li><Link href="/fiyatlar" className="hover:text-[#FFC300] transition-colors">Fiyat Tarifemiz</Link></li>
                <li><a href="#projeler" className="hover:text-[#FFC300] transition-colors">Canlı Referanslar</a></li>
                <li><a href="#skor-ogren" className="hover:text-[#FFC300] transition-colors">Hız & SEO Testi</a></li>
                <li><a href="#sss" className="hover:text-[#FFC300] transition-colors">Sıkça Sorulanlar</a></li>
              </ul>
            </div>

            {/* Kolon 3: Hizmetlerimiz (13 Uzmanlık) */}
            <div className="lg:col-span-3 flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC300] uppercase mb-4 flex items-center gap-1.5">
                <span>// HİZMETLERİMİZ</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#FFC300] text-[#0A0A0A] text-[9px] font-black">13</span>
              </span>
              <ul className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
                <li><Link href="/hizmetler/web-tasarim-yazilim" className="hover:text-[#FFC300] transition-colors">Web Tasarım & Yazılım</Link></li>
                <li><Link href="/hizmetler/google-harita-yerel-seo" className="hover:text-[#FFC300] transition-colors">Google Harita & Yerel SEO</Link></li>
                <li><Link href="/hizmetler/google-ads-reklamlari" className="hover:text-[#FFC300] transition-colors">Google Ads Performans</Link></li>
                <li><Link href="/hizmetler/meta-reklam-yonetimi" className="hover:text-[#FFC300] transition-colors">Meta (Instagram/FB) Reklam</Link></li>
                <li><Link href="/hizmetler/video-reels-ai-produksiyon" className="hover:text-[#FFC300] transition-colors">4K Dikey Reels Video</Link></li>
                <li><Link href="/hizmetler/crm-whatsapp-takip" className="hover:text-[#FFC300] transition-colors">WhatsApp CRM Satış Botu</Link></li>
                <li>
                  <Link href="/hizmetler" className="text-xs font-mono font-bold text-[#FFC300] hover:underline pt-1 inline-flex items-center gap-1">
                    <span>Tüm 13 Hizmeti İncele (6-1-6)</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolon 4: İletişim & Ofis & Doğrudan Destek */}
            <div className="lg:col-span-3 flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC300] uppercase mb-4 flex items-center gap-1.5">
                <span>// İLETİŞİM & OFİS</span>
              </span>
              <div className="flex flex-col space-y-3 text-sm text-neutral-300">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <MapPin className="w-4 h-4 text-[#FFC300] shrink-0" />
                    <span>{SITE_CONFIG.location} / Kapadokya Bölgesi</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {SITE_CONFIG.address}
                  </p>
                </div>

                <a 
                  href={SITE_CONFIG.getPhoneUrl()} 
                  className="p-3 rounded-2xl bg-white/[0.04] hover:bg-[#FFC300]/10 border border-white/10 hover:border-[#FFC300]/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FFC300]/10 flex items-center justify-center text-[#FFC300]">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block">Doğrudan Danışman</span>
                      <span className="text-xs font-bold text-white group-hover:text-[#FFC300] transition-colors">{SITE_CONFIG.phone}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFC300] transition-colors" />
                </a>

                <a 
                  href={SITE_CONFIG.getMailtoUrl()} 
                  className="p-3 rounded-2xl bg-white/[0.04] hover:bg-[#FFC300]/10 border border-white/10 hover:border-[#FFC300]/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FFC300]/10 flex items-center justify-center text-[#FFC300]">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block">E-Posta Teklifi</span>
                      <span className="text-xs font-bold text-white group-hover:text-[#FFC300] transition-colors">{SITE_CONFIG.email}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFC300] transition-colors" />
                </a>

                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#FFC300]" />
                  <span>Çalışma Saatleri: Pzt - Cmt 09:00 - 19:00</span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* DEKORATİF BANT: 4 TEMEL BÜYÜME TAAHHÜDÜ                    */}
          {/* ========================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-4 border-t border-b border-white/10 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#FFC300] shrink-0" />
              <span>1.1s Ultra Hızlı Web</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC300] shrink-0" />
              <span>Sözleşmeli Performans</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#FFC300] shrink-0" />
              <span>Google Harita 1. Sıra</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#FFC300] shrink-0" />
              <span>7/24 WhatsApp CRM Hattı</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DEV BEYAZ YAZI: Büyüme Ortağın                             */}
          {/* ========================================================= */}
          <div className="w-full overflow-hidden select-none py-4 sm:py-8 flex flex-col items-center justify-center relative">
            <h2 className="text-[11vw] sm:text-[9.5vw] font-black tracking-[-0.04em] text-white leading-none whitespace-nowrap font-sans text-center hover:text-[#FFC300] transition-colors duration-500 cursor-default">
              Büyüme Ortağın<span className="text-[#FFC300]">.</span>
            </h2>
          </div>

          {/* ========================================================= */}
          {/* ALT TELİF HAKKI & LİNKLER                                  */}
          {/* ========================================================= */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-black text-white text-sm">Growb<span className="text-[#FFC300]">.</span></span>
              <span>© GrowB Dijital 2026</span>
              <span className="text-neutral-700">|</span>
              <span>Kapadokya / Nevşehir</span>
              <span className="text-neutral-700">|</span>
              <span className="text-neutral-400">Tüm Hakları Saklıdır</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-neutral-400 text-xs">
              <Link href="/kvkk-aydinlatma-metni" className="hover:text-[#FFC300] transition-colors">
                KVKK Aydınlatma Metni
              </Link>
              <span className="text-neutral-700">|</span>
              <Link href="/gizlilik-politikasi" className="hover:text-[#FFC300] transition-colors">
                Gizlilik Politikası
              </Link>
              <span className="text-neutral-700">|</span>
              <Link href="/cerez-politikasi" className="hover:text-[#FFC300] transition-colors">
                Çerez Politikası
              </Link>
              <span className="text-neutral-700">|</span>
              <Link href="/mesafeli-hizmet-sozlesmesi" className="hover:text-[#FFC300] transition-colors">
                Mesafeli Hizmet Sözleşmesi
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
