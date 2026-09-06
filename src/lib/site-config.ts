/**
 * GrowB Dijital — Global Kurumsal ve İletişim Yapılandırması
 * Tek Doğruluk Kaynağı (Single Source of Truth)
 */

export const SITE_CONFIG = {
  name: "Growb.",
  subName: "DİJİTAL PAZARLAMA AJANSI",
  location: "NEVŞEHİR",
  brandName: "GrowB Dijital",
  legalName: "GrowB Dijital",
  tagline: "Dijitaldeki tüm işlerinizi yöneten büyüme ortağınız.",

  // Telefon Yapılandırması (Mehmet Elma)
  phone: "0541 484 24 26",
  phoneRaw: "05414842426",
  phoneInternational: "+905414842426",

  // Telefon Yapılandırması (Bilge Taşyürek)
  bilgePhone: "0531 856 32 83",
  bilgePhoneRaw: "05318563283",
  bilgePhoneInternational: "+905318563283",

  // WhatsApp Yapılandırması
  whatsappNumber: "905414842426",
  bilgeWhatsappNumber: "905318563283",

  // E-Posta
  email: "info@growbdijital.com",

  // Adres ve Vergi Bilgileri
  address: "Online & Türkiye Geneli Kesintisiz Dijital Hizmet",
  addressLocality: "Nevşehir",
  addressRegion: "Kapadokya",
  addressCountry: "TR",
  taxOffice: "Nevşehir V.D.",
  taxNumber: "381 049 2910",
  taxInfo: "Nevşehir V.D. 381 049 2910",

  // Kurucu Bilgileri
  founder: "Mehmet Elma & Bilge Taşyürek",
  founderMehmet: "Mehmet Elma",
  founderBilge: "Bilge Taşyürek",
  founders: [
    {
      name: "Mehmet Elma",
      role: "Kurucu Ortak & Büyüme Danışmanı",
      phone: "0541 484 24 26",
      phoneRaw: "05414842426",
    },
    {
      name: "Bilge Taşyürek",
      role: "Kurucu Ortak & Büyüme Danışmanı",
      phone: "0531 856 32 83",
      phoneRaw: "05318563283",
    },
  ],
  founderRole: "Ajans Kurucuları & Büyüme Danışmanları",

  // Web Sitesi URL
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com",

  // Sosyal Hesaplar
  socials: {
    whatsapp: "https://wa.me/905414842426",
    instagram: "https://www.instagram.com/growb.dijital/",
  },
  instagramHandle: "@growb.dijital",

  // Dinamik Link Üreteçleri
  getWhatsappUrl(message?: string): string {
    const num = this.whatsappNumber;
    if (message) {
      return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
    }
    return `https://wa.me/${num}`;
  },
  getBilgeWhatsappUrl(message?: string): string {
    const num = this.bilgeWhatsappNumber;
    if (message) {
      return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
    }
    return `https://wa.me/${num}`;
  },
  getPhoneUrl(): string {
    return `tel:${this.phoneRaw}`;
  },
  getBilgePhoneUrl(): string {
    return `tel:${this.bilgePhoneRaw}`;
  },
  getMailtoUrl(subject?: string): string {
    if (subject) {
      return `mailto:${this.email}?subject=${encodeURIComponent(subject)}`;
    }
    return `mailto:${this.email}`;
  },
};

export type SiteConfig = typeof SITE_CONFIG;
