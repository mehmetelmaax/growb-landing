"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 2.4 saniye (2-3 saniye arası estetik giriş efekti)
    const timer = setTimeout(() => {
      setShow(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Parıldayan Altın Halo Arka Plan */}
          <div className="absolute w-72 h-72 rounded-full bg-[#FFC300]/10 blur-[120px] pointer-events-none" />

          {/* Logo Animasyonu: 0-2.4s boyunca merkezde parlar ve köşeye süzülür */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ 
              opacity: [0, 1, 1, 1, 0],
              scale: [0.8, 1.05, 1, 1, 0.45],
              x: [0, 0, 0, 0, -220],
              y: [15, 0, 0, 0, -260],
            }}
            transition={{ 
              duration: 2.3, 
              times: [0, 0.25, 0.55, 0.8, 1], 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex items-baseline text-6xl sm:text-8xl font-black text-white tracking-tight relative z-10 font-sans"
          >
            <span>Growb</span>
            <motion.span 
              animate={{ 
                scale: [1, 1.25, 1], 
                filter: ["drop-shadow(0 0 0px #FFC300)", "drop-shadow(0 0 16px #FFC300)", "drop-shadow(0 0 4px #FFC300)"] 
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#FFC300] text-7xl sm:text-9xl leading-none inline-block ml-0.5"
            >
              .
            </motion.span>
          </motion.div>

          {/* Alt Slogan & İlerleme Çizgisi */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.9, 0.9, 0], y: [10, 0, 0, -10] }}
            transition={{ duration: 2.1, times: [0, 0.3, 0.75, 1], ease: "easeInOut" }}
            className="mt-6 flex flex-col items-center gap-2 relative z-10"
          >
            <span className="text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">
              Büyüme Ortağınız
            </span>
            <div className="w-28 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-[#FFC300]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
