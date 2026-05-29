import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1.5px solid rgba(13,27,76,0.1)",
      background: "#FFFFFF",
      marginTop: 80,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "44px 24px 32px",
      }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 10 }}>
            <img
              src="/logo.png"
              alt="Svalil.com"
              style={{ height: 48, width: "auto", display: "block" }}
            />
          </div>
          <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, maxWidth: 320 }}>
            Портал для русскоязычных эмигрантов в Сербии. AI-анализ, статьи, гайды.
          </p>
          <SocialLinks />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "16px 24px",
        borderTop: "1px solid rgba(13,27,76,0.08)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ fontSize: 12, color: "#94A3B8" }}>
          © {year} Svalil.com — портал для эмигрантов в Сербии
        </span>
        <span style={{ fontSize: 12, color: "#CBD5E0" }}>
          AI-анализ Facebook-групп
        </span>
      </div>
    </footer>
  );
}
