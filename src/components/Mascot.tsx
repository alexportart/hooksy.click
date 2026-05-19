type MascotProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  withHook?: boolean;
};

const sizes = { sm: 48, md: 72, lg: 96 };

export function Mascot({ className = "", size = "md", withHook = true }: MascotProps) {
  const s = sizes[size];

  return (
    <svg
      width={s}
      height={s * 1.35}
      viewBox="0 0 80 108"
      fill="none"
      className={`drop-shadow-lg ${className}`}
      aria-hidden
    >
      {withHook && (
        <path
          d="M40 4 C40 4 52 8 56 20"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {withHook && (
        <path
          d="M56 20 C62 24 68 32 64 40"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}
      <ellipse cx="40" cy="58" rx="28" ry="32" fill="url(#mascotGrad)" />
      <ellipse cx="40" cy="62" rx="22" ry="24" fill="url(#mascotGradInner)" opacity="0.6" />
      <circle cx="30" cy="52" r="6" fill="#fff" />
      <circle cx="50" cy="52" r="6" fill="#fff" />
      <circle cx="31" cy="53" r="3" fill="#111827" />
      <circle cx="51" cy="53" r="3" fill="#111827" />
      <circle cx="32" cy="51" r="1" fill="#fff" />
      <circle cx="52" cy="51" r="1" fill="#fff" />
      <path
        d="M32 68 Q40 76 48 68"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="26" cy="60" rx="4" ry="2.5" fill="#FF4DB3" opacity="0.35" />
      <ellipse cx="54" cy="60" rx="4" ry="2.5" fill="#FF4DB3" opacity="0.35" />
      <defs>
        <linearGradient id="mascotGrad" x1="12" y1="30" x2="68" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4DB3" />
          <stop offset="0.5" stopColor="#6A3CFF" />
          <stop offset="1" stopColor="#FF9D3D" />
        </linearGradient>
        <linearGradient id="mascotGradInner" x1="20" y1="40" x2="60" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD54D" stopOpacity="0.3" />
          <stop offset="1" stopColor="#6A3CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
