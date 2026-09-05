import React from "react";
import Link from "next/link";
import { ArrowLeft, FileCheck, Scale, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Hizmet Sözleşmesi | GrowB Dijital",
  description:
    "GrowB Dijital mesafeli hizmet sözleşmesi çerçeve şartları, hizmet kapsamı, ifa koşulları ve tüketici hakları bilgilendirmesi.",
  robots: { index: true, follow: true },
};

export default function MesafeliHizmetSozlesmesiPage() {
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
            6502 SAYILI KANUN UYARINCA
          </span>
        </div>
      </header>

      <section className="py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FFC300] uppercase mb-4 tracking-wider">
            <FileCheck className="w-4 h-4" />
            Hukuki Çerçeve Şartları
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Mesafeli Hizmet Sözleşmesi
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Dijital pazarlama, web tasarım, yazılım altyapısı ve danışmanlık hizmetlerine ilişkin genel çerçeve sözleşmesi.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Madde 1 — Taraflar</h2>
          <div className="p-4 rounded-xl bg-[#141414] border border-white/10 text-xs space-y-1 text-neutral-300">
            <div><strong>Hizmet Sağlayıcı:</strong> GrowB Dijital (Nevşehir V.D. 381 049 2910)</div>
            <div><strong>Adres:</strong> Kapadokya / Nevşehir</div>
            <div><strong>E-Posta:</strong> info@growbdijital.com | <strong>Telefon:</strong> 0541 484 24 26</div>
          </div>
          <p className="text-xs text-neutral-400 pt-1">
            <strong>Alıcı (Müşteri):</strong> Web sitesi üzerinden teklif talep eden veya hizmet siparişi veren gerçek ya da tüzel kişi.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Madde 2 — Sözleşmenin Konusu</h2>
          <p>
            İşbu sözleşmenin konusu; Alıcı&apos;nın Hizmet Sağlayıcı&apos;ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği dijital pazarlama, yazılım, web tasarım, arama motoru optimizasyonu (SEO), reklam yönetimi veya otomasyon hizmetlerinin satışı ve ifası ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Madde 3 — Hizmet Bedeli ve İfa</h2>
          <p>
            Hizmet bedelleri, taraflarca mutabık kalınan teklif formunda veya seçilen hizmet paketinde belirtilen tutardır. Proje başlangıcında taraflar arasında iş planı oluşturulur; aşamalı teslim modellerinde yazılı onay süreçleri işletilir.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#FFC300]" />
            Madde 4 — Cayma Hakkı ve İstisnaları
          </h2>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinin (ğ) bendi uyarınca; <em>&quot;Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler&quot;</em> ve (a) bendi uyarınca <em>&quot;Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen veya tüketicinin istekleri ya da kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmelerde&quot;</em> cayma hakkı kullanılamaz. Özel tasarım, kodlama ve anında yayına alınan reklam yönetimi hizmetlerinde ifaya başlandıktan sonra cayma hakkı geçerli değildir.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#FFC300]" />
            Madde 5 — Uyuşmazlıkların Çözümü
          </h2>
          <p>
            İşbu sözleşmeden doğabilecek uyuşmazlıklarda Ticaret Bakanlığı&apos;nca ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değerin üzerindeki uyuşmazlıklarda ise Nevşehir Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </div>
      </section>
    </main>
  );
}
