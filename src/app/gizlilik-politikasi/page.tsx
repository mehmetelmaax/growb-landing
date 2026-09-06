import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Server } from "lucide-react";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "GrowB Dijital resmi gizlilik politikası. Kullanıcı verilerinin güvenliği, şifreleme standartları ve üçüncü taraf entegrasyonları.",
  robots: { index: true, follow: true },
};

export default function GizlilikPolitikasiPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-[#FFC300] selection:text-black"
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#FFC300]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
            GİZLİLİK VE GÜVENLİK
          </span>
        </div>
      </header>

      <section className="border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            <ShieldCheck className="h-4 w-4" />
            Resmi Gizlilik ve Veri Güvenliği Beyanı
          </div>
          <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">
            Gizlilik Politikası
          </h1>
          <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
            GrowB Dijital olarak ziyaretçilerimizin ve müşterilerimizin mahremiyetine ve veri
            güvenliğine en yüksek düzeyde saygı gösteriyoruz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm leading-relaxed text-neutral-300 sm:px-6 sm:text-base">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Lock className="h-5 w-5 text-[#FFC300]" />
            1. Veri Güvenliği ve Şifreleme
          </h2>
          <p>
            GrowB web altyapısı üzerinde iletilen tüm veriler uçtan uca TLS 1.3 / SSL şifreleme
            protokolleri ile korunmaktadır. Sunucularımızda Strict-Transport-Security (HSTS),
            X-Content-Type-Options: nosniff ve katı frame-options güvenlik başlıkları aktiftir.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Eye className="h-5 w-5 text-[#FFC300]" />
            2. Toplanan Bilgiler ve Kullanım
          </h2>
          <p>
            Sitemizi ziyaret ettiğinizde teknik olarak oturum çerezleri, IP adresiniz ve tarayıcı
            kullanıcı aracısı (user-agent) güvenlik ve bot engelleme (honeypot, rate limiting)
            amacıyla geçici olarak işlenir. İletişim veya analiz formlarını doldurmadığınız sürece
            doğrudan şahsınızı belirleyen hiçbir bilgi kaydedilmez.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Server className="h-5 w-5 text-[#FFC300]" />
            3. Üçüncü Taraf Servis Sağlayıcılar
          </h2>
          <p>
            Web sitemiz yüksek erişilebilirlik ve performans sağlamak amacıyla küresel CDN ve sunucu
            ağları (Vercel Edge Network), serverless veri katmanı (Upstash Redis) ve e-posta
            altyapısı (Resend) kullanmaktadır. Bu sağlayıcılar sektör standardı SOC-2 ve ISO 27001
            güvenlik sertifikalarına sahiptir.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Çerezler ve Takip Teknolojileri</h2>
          <p>
            Sitemizde çerezler yalnızca site deneyimini iyileştirmek ve anonim performans verilerini
            ölçümlemek için kullanılır. Kullanıcılarımız istedikleri zaman Çerez Politikamız
            üzerinden tercihlerini değiştirebilir veya tarayıcı ayarlarından çerezleri silebilir.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 text-sm text-neutral-400">
          Politikamızla ilgili her türlü soru ve güvenlik geri bildiriminiz için{" "}
          <a href={SITE_CONFIG.getMailtoUrl()} className="font-medium text-[#FFC300] underline">
            {SITE_CONFIG.email}
          </a>{" "}
          üzerinden doğrudan teknik ekibimize ulaşabilirsiniz.
        </div>
      </section>
    </main>
  );
}
