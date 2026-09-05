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
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FFC300] selection:text-black font-sans">
      {/* Header Bar */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#FFC300] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-[#FFC300]">
            6698 SAYILI KVKK
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FFC300] uppercase mb-4 tracking-wider">
            <Shield className="w-4 h-4" />
            Hukuki Aydınlatma ve Rıza Bildirimi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Son Güncelleme: 1 Eylül 2026 | Veri Sorumlusu: GrowB Dijital Pazarlama Ajansı
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
        {/* 1. Veri Sorumlusu */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#FFC300]" />
            1. Veri Sorumlusunun Kimliği
          </h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel verileriniz;
            veri sorumlusu olarak <strong>GrowB Dijital</strong> (Nevşehir Vergi Dairesi No: 381 049 2910, Kapadokya / Nevşehir)
            tarafından aşağıda açıklanan kapsamda hukuka ve dürüstlük kurallarına uygun olarak işlenmektedir.
          </p>
        </div>

        {/* 2. İşlenen Veriler */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FFC300]" />
            2. İşlenen Kişisel Veri Kategorileri
          </h2>
          <p>Web sitemiz üzerindeki teklif, analiz ve büyüme formları aracılığıyla aşağıdaki verileriniz işlenmektedir:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <li className="p-4 rounded-xl bg-[#111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-1" />
              <div>
                <strong className="text-white block text-sm">Kimlik Bilgisi:</strong>
                <span className="text-xs text-neutral-400">Ad, Soyad, Yetkili Kişi Ünvanı.</span>
              </div>
            </li>
            <li className="p-4 rounded-xl bg-[#111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-1" />
              <div>
                <strong className="text-white block text-sm">İletişim Bilgisi:</strong>
                <span className="text-xs text-neutral-400">Telefon / WhatsApp Numarası, E-posta Adresi.</span>
              </div>
            </li>
            <li className="p-4 rounded-xl bg-[#111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-1" />
              <div>
                <strong className="text-white block text-sm">Müşteri İşlem Bilgisi:</strong>
                <span className="text-xs text-neutral-400">Faaliyet Sektörü, Web Sitesi Adresi, İhtiyaç Notları.</span>
              </div>
            </li>
            <li className="p-4 rounded-xl bg-[#111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-1" />
              <div>
                <strong className="text-white block text-sm">İşlem Güvenliği Bilgisi:</strong>
                <span className="text-xs text-neutral-400">IP Adresi, Onay Zaman Damgası, Form Kaynak Alanı.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Amaç */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>Kişisel verileriniz şu amaçlarla sınırlı olarak işlenmektedir:</p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>Talep ettiğiniz 15 dakikalık büyüme ve analiz görüşmesinin planlanması ve yürütülmesi,</li>
            <li>İşletmenize özel dijital pazarlama, web altyapısı ve reklam tekliflerinin hazırlanması ve sunulması,</li>
            <li>Telefon ve WhatsApp aracılığıyla iletişim kurulması, müşteri adaylığı sürecinin yönetilmesi,</li>
            <li>Sistem güvenliğinin sağlanması, bot, spam ve sahte lead girişimlerinin engellenmesi (Rate limit ve honeypot doğrulaması).</li>
          </ul>
        </div>

        {/* 4. Hukuki Sebepler */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Kişisel Veri Toplamanın Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz, KVKK&apos;nın 5. maddesinin 2. fıkrasının (c) bendi uyarınca <em>&quot;Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&quot;</em>,
            (f) bendi uyarınca <em>&quot;İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri&quot;</em> ve formlarda verdiğiniz <strong>Açık Rıza</strong> hukuki sebeplerine dayalı olarak otomatik yollarla toplanmaktadır.
          </p>
        </div>

        {/* 5. Aktarım */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">5. Kişisel Verilerin Aktarımı</h2>
          <p>
            Toplanan kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi ve teknik altyapının yürütülmesi amacıyla yalnızca operasyonel hizmet sağlayıcılarımıza (güvenli sunucu barındırma altyapısı, anlık operasyon bildirim botları ve e-posta servisleri) aktarılmakta olup üçüncü şahıslara ticari amaçla satılmamakta veya kiralanmamaktadır.
          </p>
        </div>

        {/* 6. Saklama Süresi */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">6. Verilerin Saklanma Süresi</h2>
          <p>
            Tarafınızla iletişime geçilmesini müteakip ticari ilişkinin kurulmaması halinde verileriniz en geç <strong>3 yıl</strong> (Ticari Elektronik İletiler ve zamanaşımı mevzuatı gereği) sonra imha edilmekte veya anonim hale getirilmektedir.
          </p>
        </div>

        {/* 7. Haklar ve Başvuru */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-[#FFC300]/30 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#FFC300]" />
            7. KVKK Madde 11 Kapsamındaki Haklarınız ve Başvuru
          </h2>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca veri sahibi olarak; verilerinizin işlenip işlenmediğini öğrenme, silinmesini veya düzeltilmesini talep etme ve kanuna aykırı işleme durumunda zararın giderilmesini talep etme hakkına sahipsiniz.
          </p>
          <div className="pt-2 text-sm text-neutral-400">
            Başvurularınızı kimliğinizi tevsik edici belgelerle birlikte doğrudan aşağıdaki kanala iletebilirsiniz:
            <div className="mt-2 text-white font-mono font-bold">
              E-Posta: <a href="mailto:info@growbdijital.com" className="text-[#FFC300] underline">info@growbdijital.com</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
