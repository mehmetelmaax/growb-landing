import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie, Check, Sliders } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası | GrowB Dijital",
  description:
    "GrowB Dijital çerez kullanım politikası, zorunlu ve analitik çerez türleri, çerez tercihlerinizi nasıl yöneteceğiniz.",
  robots: { index: true, follow: true },
};

export default function CerezPolitikasiPage() {
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
            ÇEREZ YÖNETİMİ
          </span>
        </div>
      </header>

      <section className="border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            <Cookie className="h-4 w-4" />
            Şeffaf Çerez Kullanım Kılavuzu
          </div>
          <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">
            Çerez (Cookie) Politikası
          </h1>
          <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
            GrowB Dijital olarak sitemizin kusursuz çalışması ve ziyaretçi deneyiminizin en üst
            düzeye çıkarılması için çerezlerden faydalanıyoruz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm leading-relaxed text-neutral-300 sm:px-6 sm:text-base">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Çerez Nedir?</h2>
          <p>
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza
            kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin düzgün çalışmasını,
            tercihlerin hatırlanmasını ve sitenin nasıl kullanıldığının anonim olarak analiz
            edilmesini sağlar.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">2. Sitemizde Kullanılan Çerez Türleri</h2>
          <div className="space-y-4">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-[#141414] p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-white">
                  <Check className="h-4 w-4 text-[#FFC300]" />
                  Zorunlu ve Güvenlik Çerezleri
                </h3>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-neutral-300">
                  Her Zaman Aktif
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                Web sitemizin temel fonksiyonlarını yerine getirebilmesi, form gönderimlerindeki
                rate limiting ve CSRF güvenlik denetimlerinin çalışabilmesi için zorunludur. Bu
                çerezler kapatılamaz.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-[#141414] p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-white">
                  <Sliders className="h-4 w-4 text-[#FFC300]" />
                  Performans ve Analitik Çerezleri
                </h3>
                <span className="rounded border border-[#FFC300]/30 bg-[#FFC300]/20 px-2 py-0.5 font-mono text-xs text-[#FFC300]">
                  Rızaya Bağlı
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                Hangi sayfaların daha çok ziyaret edildiğini, ziyaret sürelerini ve tıklama
                haritalarını anonim olarak ölçümleyerek web sitemizin hızını ve içeriğini
                geliştirmemize yardımcı olur. Yalnızca çerez bildiriminde onay vermeniz halinde
                yüklenir.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            3. Çerez Tercihlerini Nasıl Değiştirebilirsiniz?
          </h2>
          <p>
            Web sitemizi ilk ziyaretinizde karşınıza çıkan çerez bildirim çubuğundan tercihlerinizi
            belirleyebilirsiniz. Ayrıca kullandığınız web tarayıcısının ayarlarından çerezleri
            dilediğiniz zaman silebilir veya engelleyebilirsiniz:
          </p>
          <ul className="list-inside list-disc space-y-1 text-xs text-neutral-400">
            <li>
              Google Chrome: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri
            </li>
            <li>
              Mozilla Firefox: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri
            </li>
            <li>Apple Safari: Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
