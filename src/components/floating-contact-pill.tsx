"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingContactPill: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-white text-neutral-950 border border-neutral-200 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-2 pl-3 pr-2 group hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all select-none"
        >
          {/* Avatar with Online Pulse Badge */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-neutral-100 relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Mehmet Demir"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
          </div>

          {/* Name & Role */}
          <div className="flex flex-col pr-1 text-left hidden sm:flex">
            <span className="text-sm font-bold text-neutral-950 leading-tight">
              Mehmet Demir
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">
              Ajans Kurucusu
            </span>
          </div>

          {/* Action Button */}
          <a
            href="#iletisim"
            className="px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>GÖRÜŞME BAŞLAT</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
