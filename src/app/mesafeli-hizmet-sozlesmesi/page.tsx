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
            6502 SAYILI KANUN UYARINCA
          </span>
        </div>
      </header>

      <section className="border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            <FileCheck className="h-4 w-4" />
            Hukuki Çerçeve Şartları
          </div>
          <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">
            Mesafeli Hizmet Sözleşmesi
          </h1>
          <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
            Dijital pazarlama, web tasarım, yazılım altyapısı ve danışmanlık hizmetlerine ilişkin
            genel çerçeve sözleşmesi.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm leading-relaxed text-neutral-300 sm:px-6 sm:text-base">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Madde 1 — Taraflar</h2>
          <div className="space-y-1 rounded-xl border border-white/10 bg-[#141414] p-4 text-xs text-neutral-300">
            <div>
              <strong>Hizmet Sağlayıcı:</strong> GrowB Dijital (Nevşehir V.D. 381 049 2910)
            </div>
            <div>
              <strong>Adres:</strong> Kapadokya / Nevşehir
            </div>
            <div>
              <strong>E-Posta:</strong> info@growbdijital.com | <strong>Telefon:</strong> 0541 484
              24 26
            </div>
          </div>
          <p className="pt-1 text-xs text-neutral-400">
            <strong>Alıcı (Müşteri):</strong> Web sitesi üzerinden teklif talep eden veya hizmet
            siparişi veren gerçek ya da tüzel kişi.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Madde 2 — Sözleşmenin Konusu</h2>
          <p>
            İşbu sözleşmenin konusu; Alıcı&apos;nın Hizmet Sağlayıcı&apos;ya ait web sitesi
            üzerinden elektronik ortamda siparişini verdiği dijital pazarlama, yazılım, web tasarım,
            arama motoru optimizasyonu (SEO), reklam yönetimi veya otomasyon hizmetlerinin satışı ve
            ifası ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
            Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin
            belirlenmesidir.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Madde 3 — Hizmet Bedeli ve İfa</h2>
          <p>
            Hizmet bedelleri, taraflarca mutabık kalınan teklif formunda veya seçilen hizmet
            paketinde belirtilen tutardır. Proje başlangıcında taraflar arasında iş planı
            oluşturulur; aşamalı teslim modellerinde yazılı onay süreçleri işletilir.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <AlertCircle className="h-5 w-5 text-[#FFC300]" />
            Madde 4 — Cayma Hakkı ve İstisnaları
          </h2>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinin (ğ) bendi uyarınca;{" "}
            <em>
              &quot;Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim
              edilen gayrimaddi mallara ilişkin sözleşmeler&quot;
            </em>{" "}
            ve (a) bendi uyarınca{" "}
            <em>
              &quot;Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen veya
              tüketicinin istekleri ya da kişisel ihtiyaçları doğrultusunda hazırlanan mallara
              ilişkin sözleşmelerde&quot;
            </em>{" "}
            cayma hakkı kullanılamaz. Özel tasarım, kodlama ve anında yayına alınan reklam yönetimi
            hizmetlerinde ifaya başlandıktan sonra cayma hakkı geçerli değildir.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Scale className="h-5 w-5 text-[#FFC300]" />
            Madde 5 — Uyuşmazlıkların Çözümü
          </h2>
          <p>
            İşbu sözleşmeden doğabilecek uyuşmazlıklarda Ticaret Bakanlığı&apos;nca ilan edilen
            değere kadar Tüketici Hakem Heyetleri, bu değerin üzerindeki uyuşmazlıklarda ise
            Nevşehir Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </div>
      </section>
    </main>
  );
}
