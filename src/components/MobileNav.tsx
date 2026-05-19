const items = [
  { label: "Home", icon: "M3 12l9-9 9 9" },
  { label: "Docs", icon: "M4 6h16v12H4z" },
  { label: "Plus", fab: true },
  { label: "Stats", icon: "M4 18V10M10 18V6M16 18v-8" },
  { label: "Profile", icon: "M12 12a4 4 0 100-8 4 4 0 000 8z M6 20v-1a6 6 0 0112 0v1" },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex w-[min(100%-2rem,420px)] -translate-x-1/2 items-center justify-around rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-card backdrop-blur-xl lg:hidden">
      {items.map((item) =>
        item.fab ? (
          <button
            key="fab"
            type="button"
            className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-hooksy-pink text-2xl font-bold text-white shadow-glow transition hover:scale-110 active:scale-95"
            aria-label="Создать пост"
          >
            +
          </button>
        ) : (
          <button
            key={item.label}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-hooksy-navy/60 transition hover:bg-hooksy-lavender hover:text-hooksy-purple"
            aria-label={item.label}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ),
      )}
    </nav>
  );
}
