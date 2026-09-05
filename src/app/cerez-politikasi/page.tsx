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
            ÇEREZ YÖNETİMİ
          </span>
        </div>
      </header>

      <section className="py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FFC300] uppercase mb-4 tracking-wider">
            <Cookie className="w-4 h-4" />
            Şeffaf Çerez Kullanım Kılavuzu
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Çerez (Cookie) Politikası
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            GrowB Dijital olarak sitemizin kusursuz çalışması ve ziyaretçi deneyiminizin en üst düzeye çıkarılması için çerezlerden faydalanıyoruz.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Çerez Nedir?</h2>
          <p>
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin düzgün çalışmasını, tercihlerin hatırlanmasını ve sitenin nasıl kullanıldığının anonim olarak analiz edilmesini sağlar.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">2. Sitemizde Kullanılan Çerez Türleri</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFC300]" />
                  Zorunlu ve Güvenlik Çerezleri
                </h3>
                <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-neutral-300">Her Zaman Aktif</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Web sitemizin temel fonksiyonlarını yerine getirebilmesi, form gönderimlerindeki rate limiting ve CSRF güvenlik denetimlerinin çalışabilmesi için zorunludur. Bu çerezler kapatılamaz.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#FFC300]" />
                  Performans ve Analitik Çerezleri
                </h3>
                <span className="text-xs font-mono bg-[#FFC300]/20 text-[#FFC300] px-2 py-0.5 rounded border border-[#FFC300]/30">
                  Rızaya Bağlı
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hangi sayfaların daha çok ziyaret edildiğini, ziyaret sürelerini ve tıklama haritalarını anonim olarak ölçümleyerek web sitemizin hızını ve içeriğini geliştirmemize yardımcı olur. Yalnızca çerez bildiriminde onay vermeniz halinde yüklenir.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Çerez Tercihlerini Nasıl Değiştirebilirsiniz?</h2>
          <p>
            Web sitemizi ilk ziyaretinizde karşınıza çıkan çerez bildirim çubuğundan tercihlerinizi belirleyebilirsiniz. Ayrıca kullandığınız web tarayıcısının ayarlarından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz:
          </p>
          <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1">
            <li>Google Chrome: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri</li>
            <li>Mozilla Firefox: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri</li>
            <li>Apple Safari: Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
