import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle2, Lock, FileText, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | GrowB Dijital",
  description:
    "GrowB Dijital Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri sorumlusu sıfatıyla aydınlatma metni, işleme amaçları ve haklarınız.",
  robots: { index: true, follow: true },
};

export default function KvkkAydinlatmaPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-[#FFC300] selection:text-black"
    >
      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#FFC300]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-3 py-1 font-mono text-xs text-[#FFC300]">
            6698 SAYILI KVKK
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            <Shield className="h-4 w-4" />
            Hukuki Aydınlatma ve Rıza Bildirimi
          </div>
          <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">
            Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni
          </h1>
          <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
            Son Güncelleme: 1 Eylül 2026 | Veri Sorumlusu: GrowB Dijital Pazarlama Ajansı
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm leading-relaxed text-neutral-300 sm:px-6 sm:text-base">
        {/* 1. Veri Sorumlusu */}
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#141414] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Lock className="h-5 w-5 text-[#FFC300]" />
            1. Veri Sorumlusunun Kimliği
          </h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel
            verileriniz; veri sorumlusu olarak <strong>GrowB Dijital</strong> (Nevşehir Vergi
            Dairesi No: 381 049 2910, Kapadokya / Nevşehir) tarafından aşağıda açıklanan kapsamda
            hukuka ve dürüstlük kurallarına uygun olarak işlenmektedir.
          </p>
        </div>

        {/* 2. İşlenen Veriler */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <FileText className="h-5 w-5 text-[#FFC300]" />
            2. İşlenen Kişisel Veri Kategorileri
          </h2>
          <p>
            Web sitemiz üzerindeki teklif, analiz ve büyüme formları aracılığıyla aşağıdaki
            verileriniz işlenmektedir:
          </p>
          <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111] p-4">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FFC300]" />
              <div>
                <strong className="block text-sm text-white">Kimlik Bilgisi:</strong>
                <span className="text-xs text-neutral-400">Ad, Soyad, Yetkili Kişi Ünvanı.</span>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111] p-4">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FFC300]" />
              <div>
                <strong className="block text-sm text-white">İletişim Bilgisi:</strong>
                <span className="text-xs text-neutral-400">
                  Telefon / WhatsApp Numarası, E-posta Adresi.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111] p-4">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FFC300]" />
              <div>
                <strong className="block text-sm text-white">Müşteri İşlem Bilgisi:</strong>
                <span className="text-xs text-neutral-400">
                  Faaliyet Sektörü, Web Sitesi Adresi, İhtiyaç Notları.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111] p-4">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#FFC300]" />
              <div>
                <strong className="block text-sm text-white">İşlem Güvenliği Bilgisi:</strong>
                <span className="text-xs text-neutral-400">
                  IP Adresi, Onay Zaman Damgası, Form Kaynak Alanı.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Amaç */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>Kişisel verileriniz şu amaçlarla sınırlı olarak işlenmektedir:</p>
          <ul className="list-inside list-disc space-y-2 text-neutral-400">
            <li>
              Talep ettiğiniz 15 dakikalık büyüme ve analiz görüşmesinin planlanması ve yürütülmesi,
            </li>
            <li>
              İşletmenize özel dijital pazarlama, web altyapısı ve reklam tekliflerinin hazırlanması
              ve sunulması,
            </li>
            <li>
              Telefon ve WhatsApp aracılığıyla iletişim kurulması, müşteri adaylığı sürecinin
              yönetilmesi,
            </li>
            <li>
              Sistem güvenliğinin sağlanması, bot, spam ve sahte lead girişimlerinin engellenmesi
              (Rate limit ve honeypot doğrulaması).
            </li>
          </ul>
        </div>

        {/* 4. Hukuki Sebepler */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Kişisel Veri Toplamanın Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz, KVKK&apos;nın 5. maddesinin 2. fıkrasının (c) bendi uyarınca{" "}
            <em>
              &quot;Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&quot;
            </em>
            , (f) bendi uyarınca{" "}
            <em>
              &quot;İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri
              sorumlusunun meşru menfaatleri&quot;
            </em>{" "}
            ve formlarda verdiğiniz <strong>Açık Rıza</strong> hukuki sebeplerine dayalı olarak
            otomatik yollarla toplanmaktadır.
          </p>
        </div>

        {/* 5. Aktarım */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            5. Kişisel Verilerin Aktarımı ve Üçüncü Taraf İşleyiciler
          </h2>
          <p>
            Toplanan kişisel verileriniz teknik altyapı, analitik ölçüm ve operasyonel süreçler
            doğrultusunda aşağıdaki üçüncü taraf hizmet sağlayıcılara aktarılmaktadır:
          </p>
          <ul className="list-inside list-disc space-y-2 text-xs text-neutral-400">
            <li>
              <strong className="text-white">Google Ireland Ltd. (Google Analytics 4):</strong> Web
              sitesi performans ve trafik analizi amacıyla maskelenmiş IP ve gezinme verileri
              (Çerezler: _ga, _ga_*; Saklama: 2 yıl çerez / 14 ay analitik etkinlik verisi).
            </li>
            <li>
              <strong className="text-white">Meta Platforms Ireland Ltd. (Meta Pixel):</strong>{" "}
              Yalnızca açık rıza vermeniz halinde reklam dönüşüm ölçümü ve hedefleme amacıyla
              gezinme ve Lead dönüşüm verileri (Çerezler: _fbp, _fbc; Saklama: 90 gün).
            </li>
            <li>
              <strong className="text-white">Teknik Altyapı Sağlayıcıları:</strong> Güvenli bulut
              sunucu barındırma, anlık operasyon bildirim botları ve kurumsal e-posta servisleri.
            </li>
          </ul>
          <p className="text-xs text-neutral-400">
            Kişisel verileriniz hiçbir surette üçüncü şahıslara ticari amaçla satılmaz veya
            kiralanmaz.
          </p>
        </div>

        {/* 6. Saklama Süresi */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">6. Verilerin Saklanma Süresi</h2>
          <p>
            Tarafınızla iletişime geçilmesini müteakip ticari ilişkinin kurulmaması halinde
            verileriniz en geç <strong>3 yıl</strong> (Ticari Elektronik İletiler ve zamanaşımı
            mevzuatı gereği) sonra imha edilmekte veya anonim hale getirilmektedir.
          </p>
        </div>

        {/* 7. Haklar ve Başvuru */}
        <div className="space-y-4 rounded-2xl border border-[#FFC300]/30 bg-[#141414] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Mail className="h-5 w-5 text-[#FFC300]" />
            7. KVKK Madde 11 Kapsamındaki Haklarınız ve Başvuru
          </h2>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca veri sahibi olarak; verilerinizin işlenip
            işlenmediğini öğrenme, silinmesini veya düzeltilmesini talep etme ve kanuna aykırı
            işleme durumunda zararın giderilmesini talep etme hakkına sahipsiniz.
          </p>
          <div className="pt-2 text-sm text-neutral-400">
            Başvurularınızı kimliğinizi tevsik edici belgelerle birlikte doğrudan aşağıdaki kanala
            iletebilirsiniz:
            <div className="mt-2 font-mono font-bold text-white">
              E-Posta:{" "}
              <a href="mailto:info@growbdijital.com" className="text-[#FFC300] underline">
                info@growbdijital.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
