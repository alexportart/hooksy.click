"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// Поросёнок периодически выезжает с правого края, висит 5–10 сек,
// затем медленно растворяется за 2 сек. По клику — облачко с фразой.

type Phase = "hidden" | "sliding" | "visible" | "fading";

export default function PorosenokPeek() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [top, setTop] = useState(40);          // % от высоты вьюпорта
  const [bubble, setBubble] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  const runCycle = useCallback(() => {
    // случайная вертикальная позиция (15–70% высоты), чтобы не перекрывать хедер
    setTop(15 + Math.random() * 55);
    setBubble(false);
    setPhase("sliding");

    // видим 4–7 секунд
    const visibleMs = 4000 + Math.random() * 3000;
    later(() => setPhase("visible"), 600);             // доехал
    later(() => setPhase("fading"), 600 + visibleMs);  // начал растворяться
    later(() => {                                      // спрятался
      setPhase("hidden");
      setBubble(false);
    }, 600 + visibleMs + 2000);
  }, []);

  // Планировщик: показ рандомно раз в 2–5 минут
  const randomGap = () => 120000 + Math.random() * 180000; // 120–300 сек
  useEffect(() => {
    let alive = true;
    const schedule = (delay: number) => {
      later(() => {
        if (!alive) return;
        runCycle();
        schedule(randomGap());
      }, delay);
    };
    schedule(randomGap());
    return () => {
      alive = false;
      clearTimers();
    };
  }, [runCycle]);

  if (phase === "hidden") return null;

  const onImage = phase === "visible" || phase === "fading";

  return (
    <div
      style={{
        position: "fixed",
        top: `${top}vh`,
        right: 0,
        zIndex: 60,
        pointerEvents: "none",
        transform: "translateX(0%)",
        opacity: 1,
        animation:
          phase === "sliding" ? "porosenok-slide-in 0.6s ease-out forwards" :
          phase === "fading"  ? "porosenok-fade-out 2s ease-in forwards" :
          undefined,
      }}
    >
      <div style={{ position: "relative", pointerEvents: "auto" }}>
        {/* облачко с фразой */}
        {bubble && onImage && (
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 55,
              transform: "translateY(-100%)",
              background: "#fff",
              border: "2px solid #2E5CAA",
              borderRadius: 16,
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 700,
              color: "#0D1B4C",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 24px rgba(13,27,76,0.2)",
              animation: "porosenok-bubble 0.25s ease-out",
            }}
          >
            Я свалил из Рашки, а ты?
            {/* хвостик облачка */}
            <span
              style={{
                position: "absolute",
                bottom: -10,
                right: 28,
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "12px solid #2E5CAA",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: -7,
                right: 30,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "10px solid #fff",
              }}
            />
          </div>
        )}

        <img
          src="/porosenok.png"
          alt="Поросёнок свалил из Рашки"
          onClick={() => onImage && setBubble(true)}
          style={{
            width: "clamp(120px, 16vw, 190px)",
            height: "auto",
            display: "block",
            cursor: "pointer",
            filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
            userSelect: "none",
          }}
          draggable={false}
        />
      </div>

      <style>{`
        @keyframes porosenok-slide-in {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0%);   opacity: 1; }
        }
        @keyframes porosenok-fade-out {
          from { opacity: 1; transform: translateX(0%); }
          to   { opacity: 0; transform: translateX(0%); }
        }
        @keyframes porosenok-bubble {
          from { opacity: 0; transform: translateY(-100%) scale(0.9); }
          to   { opacity: 1; transform: translateY(-100%) scale(1); }
        }
      `}</style>
    </div>
  );
}
