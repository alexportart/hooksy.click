import type { ReactNode } from "react";

type StickerProps = {
  children: ReactNode;
  variant?: "pink" | "yellow" | "purple" | "orange";
  className?: string;
};

const variants = {
  pink: "bg-hooksy-pink text-white",
  yellow: "bg-hooksy-yellow text-hooksy-navy",
  purple: "bg-hooksy-purple text-white",
  orange: "bg-hooksy-orange text-hooksy-navy",
};

export function Sticker({ children, variant = "pink", className = "" }: StickerProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-soft ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
