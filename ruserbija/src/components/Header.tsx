"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/roadmap", label: "Карта пути" },
  { href: "/topics", label: "Справочник" },
  { href: "/articles", label: "Статьи" },
  { href: "/guides", label: "Гайды" },
  { href: "/rates", label: "Курсы валют" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(243,245,249,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(13,27,76,0.1)",
      boxShadow: "0 1px 12px rgba(13,27,76,0.06)",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="Svalil.com — портал для эмигрантов в Сербии"
            style={{ height: 44, width: "auto", display: "block" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {NAV_LINKS.map(link => {
            const active = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} style={{
                padding: "6px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                textDecoration: "none",
                color: active ? "#2E5CAA" : "#4A5568",
                background: active ? "rgba(46,92,170,0.1)" : "transparent",
                border: active ? "1px solid rgba(46,92,170,0.2)" : "1px solid transparent",
                transition: "all 0.15s",
              }}>
                {link.label}
              </Link>
            );
          })}

          {/* Social links */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, paddingLeft: 12, borderLeft: "1px solid rgba(13,27,76,0.12)" }}>
            <a href="https://www.facebook.com/groups/svalil/" target="_blank" rel="noopener noreferrer"
              title="Facebook группа" className="hdr-soc hdr-fb">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://t.me/svalil_com" target="_blank" rel="noopener noreferrer"
              title="Telegram канал" className="hdr-soc hdr-tg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none",
            color: "#4A5568", cursor: "pointer", padding: 8,
          }}
          className="burger-btn"
          aria-label="Меню"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "#FFFFFF", borderBottom: "1px solid rgba(13,27,76,0.1)",
          padding: "12px 24px 16px",
          boxShadow: "0 4px 20px rgba(13,27,76,0.08)",
        }} className="mobile-menu">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", padding: "10px 0",
                fontSize: 15, fontWeight: 600,
                color: pathname.startsWith(link.href) ? "#2E5CAA" : "#4A5568",
                textDecoration: "none", borderBottom: "1px solid rgba(13,27,76,0.08)",
              }}>
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: 10, paddingTop: 12 }}>
            <a href="https://www.facebook.com/groups/svalil/" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#1877f2", textDecoration: "none", fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href="https://t.me/svalil_com" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#0088cc", textDecoration: "none", fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: block !important; }
        }
        .hdr-soc { display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;color:#94A3B8;border:1px solid transparent;text-decoration:none;transition:color 0.15s,border-color 0.15s,background 0.15s; }
        .hdr-fb:hover { color:#1877f2;background:rgba(24,119,242,0.08);border-color:rgba(24,119,242,0.2); }
        .hdr-tg:hover { color:#0088cc;background:rgba(0,136,204,0.08);border-color:rgba(0,136,204,0.2); }
      `}</style>
    </header>
  );
}
