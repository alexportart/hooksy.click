export default function LoadingSkeleton() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "8px 0" }} className="fade-up">

      {/* Статус */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div className="shimmer-line" style={{ width: 8, height: 8, borderRadius: "50%" }} />
        <div className="shimmer-line" style={{ width: 160, height: 14 }} />
        <div style={{ marginLeft: "auto" }}>
          <div className="shimmer-line" style={{ width: 80, height: 12 }} />
        </div>
      </div>

      {/* AI-сводка */}
      <div style={{ marginBottom: 32 }}>
        <div className="shimmer-line" style={{ width: 100, height: 13, marginBottom: 14 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="shimmer-line" style={{ width: "100%", height: 14 }} />
          <div className="shimmer-line" style={{ width: "95%", height: 14 }} />
          <div className="shimmer-line" style={{ width: "88%", height: 14 }} />
          <div className="shimmer-line" style={{ width: "72%", height: 14 }} />
        </div>
      </div>

      {/* Рекомендации */}
      <div style={{ marginBottom: 32 }}>
        <div className="shimmer-line" style={{ width: 130, height: 13, marginBottom: 14 }} />
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
            <div className="shimmer-line" style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0 }} />
            <div className="shimmer-line" style={{ width: `${70 + i * 5}%`, height: 13 }} />
          </div>
        ))}
      </div>

      {/* Посты */}
      <div>
        <div className="shimmer-line" style={{ width: 160, height: 13, marginBottom: 14 }} />
        {[1, 2].map(i => (
          <div key={i} style={{
            background: "#fff", border: "1.5px solid rgba(13,27,76,0.08)",
            borderRadius: 14, padding: "16px 20px", marginBottom: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div className="shimmer-line" style={{ width: 120, height: 12 }} />
              <div className="shimmer-line" style={{ width: 80, height: 28, borderRadius: 20 }} />
            </div>
            <div className="shimmer-line" style={{ width: "100%", height: 13, marginBottom: 6 }} />
            <div className="shimmer-line" style={{ width: "80%", height: 13 }} />
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, marginTop: 24 }}>
        AI анализирует данные&hellip;
      </p>
    </div>
  );
}
