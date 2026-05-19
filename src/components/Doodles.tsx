import type { ReactNode } from "react";

export function CursorClick({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" className={className} aria-hidden>
      <path
        d="M4 4 L4 24 L10 18 L14 28 L18 26 L14 16 L22 16 Z"
        fill="#111827"
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function DashedPath({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" className={`animate-dash ${className}`} aria-hidden>
      <path
        d="M8 50 Q40 10 80 30 T112 8"
        stroke="#6A3CFF"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M8 0 L9 6 L16 8 L9 10 L8 16 L7 10 L0 8 L7 6 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HookIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 3 C8 3 5 6 5 10 C5 14 8 16 10 17 L9 21 H15 L14 17 C16 16 19 14 19 10 C19 6 16 3 12 3 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FloatingHearts({ className = "" }: { className?: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className={className} aria-hidden>
      <path d="M12 28 C12 22 18 18 22 22 C26 18 32 22 32 28 C32 36 22 44 22 44 C22 44 12 36 12 28 Z" fill="#FF4DB3" opacity="0.7" />
      <path d="M52 12 C52 8 56 5 59 8 C62 5 66 8 66 12 C66 17 59 22 59 22 C59 22 52 17 52 12 Z" fill="#6A3CFF" opacity="0.6" />
      <path d="M58 48 L62 56 L70 56 L64 61 L66 70 L58 65 L50 70 L52 61 L46 56 L54 56 Z" fill="#FFD54D" />
    </svg>
  );
}

export function ArrowDoodle({ className = "", flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 48 32"
      className={`${flip ? "scale-x-[-1]" : ""} ${className}`}
      aria-hidden
    >
      <path
        d="M4 16 H36 M28 8 L40 16 L28 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SpeechBubble({ className = "", children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={`relative rounded-2xl border-2 border-hooksy-navy bg-white px-3 py-2 text-sm font-semibold shadow-soft ${className}`}
    >
      {children}
      <span className="absolute -bottom-2 left-4 h-3 w-3 rotate-45 border-b-2 border-r-2 border-hooksy-navy bg-white" />
    </div>
  );
}
