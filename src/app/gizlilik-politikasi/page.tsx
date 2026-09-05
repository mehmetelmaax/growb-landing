import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Server } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | GrowB Dijital",
  description:
    "GrowB Dijital resmi gizlilik politikası. Kullanıcı verilerinin güvenliği, şifreleme standartları ve üçüncü taraf entegrasyonları.",
  robots: { index: true, follow: true },
};

export default function GizlilikPolitikasiPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FFC300] selection:text-black font-sans">
      <header className="border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#FFC300] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
            GİZLİLİK VE GÜVENLİK
          </span>
        </div>
      </header>

      <section className="py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FFC300] uppercase mb-4 tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Resmi Gizlilik ve Veri Güvenliği Beyanı
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            GrowB Dijital olarak ziyaretçilerimizin ve müşterilerimizin mahremiyetine ve veri güvenliğine en yüksek düzeyde saygı gösteriyoruz.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#FFC300]" />
            1. Veri Güvenliği ve Şifreleme
          </h2>
          <p>
            GrowB web altyapısı üzerinde iletilen tüm veriler uçtan uca TLS 1.3 / SSL şifreleme protokolleri ile korunmaktadır. Sunucularımızda Strict-Transport-Security (HSTS), X-Content-Type-Options: nosniff ve katı frame-options güvenlik başlıkları aktiftir.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#FFC300]" />
            2. Toplanan Bilgiler ve Kullanım
          </h2>
          <p>
            Sitemizi ziyaret ettiğinizde teknik olarak oturum çerezleri, IP adresiniz ve tarayıcı kullanıcı aracısı (user-agent) güvenlik ve bot engelleme (honeypot, rate limiting) amacıyla geçici olarak işlenir. İletişim veya analiz formlarını doldurmadığınız sürece doğrudan şahsınızı belirleyen hiçbir bilgi kaydedilmez.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-[#FFC300]" />
            3. Üçüncü Taraf Servis Sağlayıcılar
          </h2>
          <p>
            Web sitemiz yüksek erişilebilirlik ve performans sağlamak amacıyla küresel CDN ve sunucu ağları (Vercel Edge Network), serverless veri katmanı (Upstash Redis) ve e-posta altyapısı (Resend) kullanmaktadır. Bu sağlayıcılar sektör standardı SOC-2 ve ISO 27001 güvenlik sertifikalarına sahiptir.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Çerezler ve Takip Teknolojileri</h2>
          <p>
            Sitemizde çerezler yalnızca site deneyimini iyileştirmek ve anonim performans verilerini ölçümlemek için kullanılır. Kullanıcılarımız istedikleri zaman Çerez Politikamız üzerinden tercihlerini değiştirebilir veya tarayıcı ayarlarından çerezleri silebilir.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 text-neutral-400 text-sm">
          Politikamızla ilgili her türlü soru ve güvenlik geri bildiriminiz için{" "}
          <a href="mailto:info@growbdijital.com" className="text-[#FFC300] underline font-medium">
            info@growbdijital.com
          </a>{" "}
          üzerinden doğrudan teknik ekibimize ulaşabilirsiniz.
        </div>
      </section>
    </main>
  );
}
