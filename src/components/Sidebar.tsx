import { Logo } from "./Logo";
import { HookIcon } from "./Doodles";
import { Mascot } from "./Mascot";

const navItems = [
  { id: "home", label: "Главная", icon: "M3 12l9-9 9 9M5 10v10h14V10", active: true },
  { id: "hooks", label: "Крючки", icon: "M12 3v18M8 8l4-4 4 4", active: false },
  { id: "templates", label: "Шаблоны", icon: "M4 6h16v12H4z M8 6V4h8v2", active: false },
  { id: "analytics", label: "Статистика", icon: "M4 18V10M10 18V6M16 18v-8M22 18V4", active: false },
];

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-hooksy-navy/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Закрыть меню"
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-hooksy-lavender/80 bg-white/90 p-5 shadow-card backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Logo className="mb-8" />

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all hover:scale-[1.02] ${
                item.active
                  ? "bg-hooksy-lavender text-hooksy-purple shadow-soft"
                  : "text-hooksy-navy/70 hover:bg-hooksy-lavender/50"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative mt-auto overflow-hidden rounded-3xl bg-gradient-to-br from-hooksy-lavender to-white p-4">
          <p className="text-xs font-bold uppercase text-hooksy-purple">Pro tip</p>
          <p className="mt-1 text-sm font-semibold leading-snug">1 клик до вирусности</p>
          <div className="absolute -right-2 -top-2 opacity-90">
            <Mascot size="sm" withHook={false} />
          </div>
        </div>

        <button
          type="button"
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-hooksy-navy/10 py-3 text-sm font-semibold transition hover:border-hooksy-purple hover:text-hooksy-purple"
        >
          <HookIcon className="text-hooksy-pink" />
          Настройки
        </button>
      </aside>
    </>
  );
}
