"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("GrowB Uygulama Hatası:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-4 py-16 text-center text-white"
    >
      <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-red-500/20 bg-[#121212] p-8 shadow-2xl sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400">
          // HATA OLUŞTU
        </span>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
          Beklenmeyen Bir Aksilik Çıktı
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          Sayfa yüklenirken geçici bir bağlantı veya sistem hatası meydana geldi.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-neutral-600">Hata Kodu: {error.digest}</p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC300] px-6 py-3 text-sm font-bold text-[#0A0A0A] shadow-md transition-all hover:bg-[#FFA000] active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Tekrar Dene</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            <Home className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
