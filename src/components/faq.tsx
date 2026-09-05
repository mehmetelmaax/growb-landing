"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "@/data/content";
import { Plus } from "lucide-react";

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="sss" className="py-8 sm:py-10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase block mb-3">
            // AKLINIZA TAKILANLAR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-cream tracking-tight mb-4">
            Sıkça Sorulan Sorular.
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto font-normal">
            Esnafımızın ve büyüme ortaklarımızın bize en sık danıştığı konuları ve verdiğimiz yazılı taahhütleri şeffaflıkla derledik.
          </p>
        </div>

        {/* 8 Accordion Items */}
        <div className="flex flex-col gap-3.5">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-surface border border-white/10 hover:border-accent/40 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left text-cream select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold tracking-tight pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? "border-accent bg-accent text-[#0A0A0A]"
                        : "border-white/10 bg-surface-dark text-muted"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-white/5 font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
