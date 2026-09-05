"use client";

import React from "react";

export const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0A0A0A] text-xs font-bold hover:bg-[#FFC300] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer font-sans shrink-0"
      aria-label="Sayfanın en başına dön"
    >
      <span>Eyvah dibin dibine indim! Beni acil yukarı fırlat</span>
      <span className="text-sm">👆</span>
    </button>
  );
};
