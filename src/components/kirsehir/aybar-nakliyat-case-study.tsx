import React from "react";
import Image from "next/image";
import { Award, ExternalLink, CheckCircle2 } from "lucide-react";

export function AybarNakliyatCaseStudy() {
  return (
    <section className="mb-20">
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#FFC300]/40 bg-gradient-to-br from-[#141414] via-[#121212] to-[#1A1A1A] p-8 shadow-2xl sm:p-12">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#FFC300]/10 blur-3xl" />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md">
              <Image
                src="/clients/kirsehir-aybar.webp"
                alt="Kırşehir Aybar Nakliyat Logo"
                width={64}
                height={64}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#FFC300]">
                <Award className="h-3.5 w-3.5" />
                <span>CANLI REFERANS VAKASI // KIRŞEHİR</span>
              </div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                Kırşehir Aybar Nakliyat
              </h2>
            </div>
          </div>

          <a
            href="https://www.kirsehiraybarnakliyat.com.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#FFC300] hover:text-black"
          >
            <span>kirsehiraybarnakliyat.com.tr</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Vaka Metrikleri */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
            <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
              Mobil Açılış Hızı
            </span>
            <span className="text-3xl font-black text-emerald-400">1.2 sn</span>
            <span className="mt-1 block text-xs text-neutral-500">Core Web Vitals Yeşil</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
            <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
              İlk 90 Gün Çağrı Artışı
            </span>
            <span className="text-3xl font-black text-[#FFC300]">+%92</span>
            <span className="mt-1 block text-xs text-neutral-500">Doğrudan Müşteri Telefonu</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
            <span className="mb-1 block font-mono text-xs uppercase text-neutral-400">
              Google Harita Konumu
            </span>
            <span className="text-3xl font-black text-white">1. Sıra</span>
            <span className="mt-1 block text-xs text-neutral-500">
              Kırşehir Local Pack Hakimiyeti
            </span>
          </div>
        </div>

        {/* Yapılan Operasyonlar */}
        <div className="space-y-3 text-sm text-neutral-300">
          <h3 className="mb-2 text-base font-bold text-white">
            Kırşehir Aybar Nakliyat İçin Ne Yaptık?
          </h3>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
              <span>
                Kırşehir ve çevre ilçeler için bölgesel NAP tutarlılığı ve Google İşletme Profili
                harita optimizasyonu.
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
              <span>
                Şeffaf &apos;Sabit Fiyat Garantisi&apos; ve asansörlü taşıma odağıyla kurumsal güven
                arayüzü kodlandı.
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
              <span>
                Form doldurulduğu anda 10 saniye içinde yetkili telefona düşen anlık WhatsApp lead
                bildirim motoru.
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
              <span>
                Mobil kullanıcıların tek tıkla arama yapabileceği optimize edilmiş arama ve teklif
                butonları.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
