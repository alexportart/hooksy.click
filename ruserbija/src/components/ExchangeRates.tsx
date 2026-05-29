"use client";

import { useState, useEffect, useCallback } from "react";

interface Rates {
  RSD_per_USD: number;
  RSD_per_EUR: number;
  RSD_per_RUB: number;
  USD_per_RUB: number;
  updatedAt: string;
}

const STYLES = `
  @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes spin { to{transform:rotate(360deg)} }
  .shimmer-sm { background:linear-gradient(90deg,#EEF1F6 25%,#E2E8F0 50%,#EEF1F6 75%);background-size:400px 100%;animation:shimmer 1.4s infinite;border-radius:4px;display:inline-block; }
  .spin { animation:spin 0.7s linear infinite;display:inline-block; }
  .rate-pill { display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid rgba(13,27,76,0.1);border-radius:12px;padding:9px 14px;flex:1;min-width:0;transition:border-color 0.15s,background 0.15s;cursor:pointer;text-align:left; }
  .rate-pill:hover { border-color:rgba(46,92,170,0.25); }
  .rate-pill.active { border-color:#2E5CAA;background:rgba(46,92,170,0.05); }
  .calc-select { appearance:none;-webkit-appearance:none;border:1.5px solid rgba(13,27,76,0.13);border-radius:8px;padding:7px 28px 7px 10px;font-size:13px;font-weight:600;color:#0D1B4C;cursor:pointer;outline:none;font-family:'Rubik',sans-serif;background:#F3F5F9 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 8px center; }
  .calc-select:focus { border-color:#2E5CAA; }
  .calc-input { border:1.5px solid rgba(13,27,76,0.13);border-radius:8px;padding:7px 10px;font-size:14px;font-weight:700;color:#0D1B4C;font-family:'Rubik',sans-serif;outline:none;width:90px;background:#fff;transition:border-color 0.15s; }
  .calc-input:focus { border-color:#2E5CAA; }
  .exchange-link { display:inline-flex;align-items:center;gap:5px;color:#2E5CAA;text-decoration:none;font-size:12px;font-weight:600;transition:opacity 0.15s; }
  .exchange-link:hover { opacity:0.75; }
  .refresh-btn { background:none;border:none;cursor:pointer;color:#94A3B8;font-size:14px;padding:2px 4px;transition:color 0.15s;line-height:1; }
  .refresh-btn:hover { color:#2E5CAA; }
`;

const PAIRS = [
  { from:"USD", fromFlag:"🇺🇸", fromName:"Доллар США", to:"RSD", toFlag:"🇷🇸", key:"RSD_per_USD" as keyof Rates, decimals:2 },
  { from:"EUR", fromFlag:"🇪🇺", fromName:"Евро",       to:"RSD", toFlag:"🇷🇸", key:"RSD_per_EUR" as keyof Rates, decimals:2 },
  { from:"RUB", fromFlag:"🇷🇺", fromName:"Рубль",      to:"RSD", toFlag:"🇷🇸", key:"RSD_per_RUB" as keyof Rates, decimals:3 },
];

const CALC_OPTIONS = [
  { label:"USD → RSD", key:"RSD_per_USD" as keyof Rates, to:"RSD" },
  { label:"EUR → RSD", key:"RSD_per_EUR" as keyof Rates, to:"RSD" },
  { label:"RUB → RSD", key:"RSD_per_RUB" as keyof Rates, to:"RSD" },
  { label:"RSD → USD", key:"RSD_per_USD" as keyof Rates, to:"USD", inverse:true },
  { label:"RSD → EUR", key:"RSD_per_EUR" as keyof Rates, to:"EUR", inverse:true },
  { label:"RSD → RUB", key:"RSD_per_RUB" as keyof Rates, to:"RUB", inverse:true },
];

export default function ExchangeRates() {
  const [rates, setRates]     = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [time, setTime]       = useState("");
  const [amount, setAmount]   = useState("100");
  const [pairIdx, setPairIdx] = useState(0);

  const fetchRates = useCallback(async (manual = false) => {
    if (manual) setSpinning(true);
    try {
      const res = await fetch("/api/rates");
      if (!res.ok) throw new Error();
      const data: Rates = await res.json();
      setRates(data);
      setTime(new Date(data.updatedAt).toLocaleTimeString("ru-RU", { hour:"2-digit", minute:"2-digit" }));
    } catch {}
    finally { setLoading(false); setSpinning(false); }
  }, []);

  useEffect(() => {
    fetchRates();
    const t = setInterval(() => fetchRates(), 10 * 60 * 1000);
    return () => clearInterval(t);
  }, [fetchRates]);

  const opt = CALC_OPTIONS[pairIdx];
  const rate = rates ? Number(rates[opt.key]) : 0;
  const num = parseFloat(amount.replace(",", ".")) || 0;
  const result = rate > 0 && num > 0
    ? Math.round(opt.inverse ? num / rate : num * rate).toLocaleString("ru-RU")
    : "—";

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
      <style>{STYLES}</style>

      <div style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase",
        color: "#2E5CAA", background: "rgba(46,92,170,0.07)", border: "1.5px solid rgba(46,92,170,0.15)",
        borderRadius: 99, padding: "4px 12px", marginBottom: 12,
      }}>
        💱 Курсы валют
      </div>

      <div style={{
        background: "#fff", border: "1.5px solid rgba(13,27,76,0.09)",
        borderRadius: 16, padding: "14px 18px",
      }}>
        {/* Верхняя строка: курсы + кнопка */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          {PAIRS.map((p, i) => {
            const val = rates ? Number(rates[p.key]) : undefined;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPairIdx(i)}
                className={`rate-pill${pairIdx === i ? " active" : ""}`}
                style={{ flex: "1 1 120px", maxWidth: 180 }}
              >
                <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{p.fromFlag}</span>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, lineHeight: 1, marginBottom: 2, whiteSpace: "nowrap" }}>
                    {p.from} → {p.to}
                  </div>
                  {loading || !val
                    ? <span className="shimmer-sm" style={{ width: 55, height: 13 }}>&nbsp;</span>
                    : <span style={{ fontSize: 14, fontWeight: 800, color: "#0D1B4C", fontFamily: "'Rubik',sans-serif", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                        {val.toFixed(p.decimals)}
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#94A3B8", marginLeft: 3 }}>{p.to}</span>
                      </span>
                  }
                </div>
              </button>
            );
          })}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <a href="https://poisk.rs/money_exchange/" target="_blank" rel="noopener noreferrer" className="exchange-link">
              🗺 Обменники
            </a>
            <button className="refresh-btn" onClick={() => fetchRates(true)} title="Обновить">
              <span className={spinning ? "spin" : ""}>↻</span>
            </button>
          </div>
        </div>

        {/* Разделитель */}
        <div style={{ height: 1, background: "rgba(13,27,76,0.07)", marginBottom: 10 }} />

        {/* Калькулятор — горизонтальный */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0D1B4C", flexShrink: 0, fontFamily: "'Rubik',sans-serif" }}>Калькулятор</span>
          <select className="calc-select" value={pairIdx} onChange={e => setPairIdx(Number(e.target.value))}>
            {CALC_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
          </select>
          <input
            className="calc-input"
            type="number" min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="100"
          />
          <span style={{ color: "#CBD5E0", fontSize: 16, flexShrink: 0 }}>=</span>
          <div style={{
            background: "rgba(46,92,170,0.07)", border: "1.5px solid rgba(46,92,170,0.15)",
            borderRadius: 8, padding: "7px 12px", minWidth: 90,
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#2E5CAA", fontFamily: "'Rubik',sans-serif" }}>
              {loading ? "…" : result}
            </span>
            <span style={{ fontSize: 10, color: "#6B7280", marginLeft: 4, fontWeight: 600 }}>{opt.to}</span>
          </div>
        </div>

        {/* Подпись */}
        <div style={{ marginTop: 8, fontSize: 10, color: "#CBD5E0" }}>
          {time ? `Обновлено в ${time} · ` : ""}open.er-api.com · обновляется каждые 10 мин
        </div>
      </div>
    </div>
  );
}
