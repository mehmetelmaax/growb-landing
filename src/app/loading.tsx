import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Sayfa içeriği yükleniyor..."
      className="min-h-screen bg-[#0A0A0A] px-4 py-8 sm:px-8"
    >
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-16 w-full rounded-2xl border border-white/5 bg-white/[0.03]" />

        <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
          <div className="h-6 w-48 rounded-full bg-white/10" />
          <div className="h-14 w-3/4 max-w-2xl rounded-2xl bg-white/10 sm:h-20" />
          <div className="h-4 w-1/2 max-w-md rounded bg-white/5" />
          <div className="h-12 w-44 rounded-full bg-[#FFC300]/20" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl border border-white/5 bg-white/[0.02] p-6" />
          ))}
        </div>
      </div>
      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
}
