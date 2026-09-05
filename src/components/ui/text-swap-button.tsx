"use client";

import React from "react";
import Link from "next/link";

interface TextSwapButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  icon?: React.ReactNode;
}

export const TextSwapButton: React.FC<TextSwapButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  icon,
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 overflow-hidden group select-none";

  const variantStyles = {
    primary:
      "bg-accent text-[#0A0A0A] hover:bg-accent-hover hover:shadow-[0_0_25px_rgba(255,195,0,0.45)] px-6 py-3 text-sm md:text-base",
    outline:
      "border border-white/10 text-cream hover:border-accent hover:text-accent bg-surface/50 backdrop-blur-md px-5 py-2.5 text-sm",
    secondary:
      "bg-surface text-cream border border-white/10 hover:border-accent/40 px-6 py-3 text-sm",
  };

  const content = (
    <>
      <span className="inline-flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">
        {children}
        {icon && <span className="text-current transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
      <span className="absolute inset-0 inline-flex items-center justify-center gap-2 translate-y-[150%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-current">
        {children}
        {icon && <span className="text-current">{icon}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {content}
    </button>
  );
};
