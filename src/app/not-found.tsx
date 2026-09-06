import React from "react";
import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-4 py-16 text-center text-white"
    >
      <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-white/15 bg-[#121212] p-8 shadow-2xl sm:p-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#FFC300]">
          <Compass className="h-3.5 w-3.5" />
          <span>404 // SAYFA BULUNAMADI</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
          Yolunuz Kaybolmuş Olabilir.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Aşağıdaki bağlantıları
          kullanarak aradığınız bölüme hızla ulaşabilirsiniz.
        </p>

        <div className="my-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
          <Link
            href="/hizmetler"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-neutral-200 transition-colors hover:border-[#FFC300] hover:text-[#FFC300]"
          >
            🐝 Hizmetlerimiz
          </Link>
          <Link
            href="/fiyatlar"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-neutral-200 transition-colors hover:border-[#FFC300] hover:text-[#FFC300]"
          >
            💳 Fiyatlarımız
          </Link>
          <Link
            href="/#projeler"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-neutral-200 transition-colors hover:border-[#FFC300] hover:text-[#FFC300]"
          >
            🚀 Referanslar
          </Link>
          <Link
            href="/#iletisim"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-neutral-200 transition-colors hover:border-[#FFC300] hover:text-[#FFC300]"
          >
            📞 İletişim
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC300] px-8 py-3.5 text-sm font-black text-[#0A0A0A] shadow-lg transition-all hover:bg-[#FFA000] active:scale-95"
        >
          <Home className="h-4 w-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>
    </main>
  );
}
