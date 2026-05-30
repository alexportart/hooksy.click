// Маркировка "NEW" для свежих материалов (не старше 4 дней).

export default function NewBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 10, fontWeight: 800, letterSpacing: "0.06em",
      color: "#fff",
      background: "linear-gradient(135deg,#E53935 0%,#FB7185 100%)",
      borderRadius: 99, padding: "3px 9px",
      boxShadow: "0 2px 6px rgba(229,57,53,0.3)",
      textTransform: "uppercase", lineHeight: 1,
      ...style,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%", background: "#fff",
        display: "inline-block",
      }} />
      NEW
    </span>
  );
}
