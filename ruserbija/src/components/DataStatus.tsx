"use client";

import { useEffect, useState } from "react";
import { Database, ChevronDown } from "lucide-react";

interface TopicStat  { id: string; label: string; postsCount: number; }
interface DataStatusInfo { updatedAt: string | null; totalPosts: number; topics: TopicStat[]; }

const DS = `
  .ds-wrap { position:relative; display:inline-block; }
  .ds-btn  { display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:8px;background:#fff;border:1.5px solid rgba(13,27,76,0.1);color:#6B7280;font-size:11.5px;font-weight:500;cursor:pointer;transition:border-color 0.15s;font-family:'Rubik',sans-serif;white-space:nowrap; }
  .ds-btn:hover { border-color:#2E5CAA;color:#2E5CAA; }
  .ds-drop { position:absolute;left:0;top:calc(100% + 6px);z-index:50;background:#fff;border:1.5px solid rgba(13,27,76,0.1);border-radius:12px;box-shadow:0 8px 24px rgba(13,27,76,0.1);min-width:320px;overflow:hidden; }
  .ds-row  { display:flex;justify-content:space-between;align-items:center;padding:6px 12px;border-bottom:1px solid rgba(13,27,76,0.06);font-size:11.5px; }
  .ds-row:last-child { border-bottom:none; }
`;

export default function DataStatus() {
  const [info, setInfo]   = useState<DataStatusInfo | null>(null);
  const [open, setOpen]   = useState(false);

  useEffect(() => {
    fetch("/api/data-status").then(r => r.json()).then(setInfo).catch(() => {});
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest(".ds-wrap")) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!info?.updatedAt) return null;

  const diffH = Math.floor((Date.now() - new Date(info.updatedAt).getTime()) / 3600000);
  const age   = diffH > 0 ? `${diffH} ч назад` : "< 1 ч";

  return (
    <div className="ds-wrap">
      <style>{DS}</style>
      <button className="ds-btn" onClick={() => setOpen(v => !v)}>
        <span style={{ width:5,height:5,borderRadius:"50%",background:"#27AE60",boxShadow:"0 0 5px #27AE60",display:"inline-block",flexShrink:0 }} />
        <Database size={10} strokeWidth={2} />
        <span>{info.totalPosts} постов · {age}</span>
        <ChevronDown size={10} strokeWidth={2.5} style={{ opacity:0.5, transform: open?"rotate(180deg)":"none", transition:"transform 0.15s" }} />
      </button>

      {open && (
        <div className="ds-drop fade-up">
          <div style={{ padding:"8px 12px 6px", borderBottom:"1px solid rgba(13,27,76,0.07)", fontSize:11, color:"#94A3B8", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" }}>
            База данных · {new Date(info.updatedAt).toLocaleDateString("ru-RU")}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", maxHeight:220, overflowY:"auto" }}>
            {info.topics.map(t => (
              <div key={t.id} className="ds-row">
                <span style={{ color:"#4A5568" }}>{t.label}</span>
                <span style={{ fontWeight:700, color: t.postsCount > 0 ? "#2E5CAA" : "#CBD5E0", fontSize:12 }}>
                  {t.postsCount > 0 ? t.postsCount : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
