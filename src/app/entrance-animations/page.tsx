"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { entranceAnimationStyles, ENTRANCE_ANIMATION_GROUPS, ENTRANCE_ANIMATION_META } from "@/data/entrance-animations";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { AnimationData, ColorMode } from "@/lib/types";

function usePreviewColors(): ColorMode {
  const { colorPicks, colorMode, selections } = useDesignKit();
  const mode = colorMode as "light" | "dark";
  const picks = colorPicks[mode];
  const palette = colorPalettes.find((p) => p.id === selections.colors);
  const base = palette?.data[mode];
  const get = (key: string) =>
    picks[key] ?? (base as unknown as Record<string, string>)?.[key] ?? undefined;
  const getSemantic = (key: string) =>
    picks[`semantic.${key}`] ?? base?.semantic[key as keyof typeof base.semantic];
  return {
    background: get("background") ?? "#0a0a0a",
    surface: get("surface") ?? "#171717",
    surfaceAlt: get("surfaceAlt") ?? "#1a1a1a",
    border: get("border") ?? "#262626",
    text: get("text") ?? "#f5f5f5",
    textSecondary: get("textSecondary") ?? "#a3a3a3",
    textMuted: get("textMuted") ?? "#525252",
    primary: get("primary") ?? "#3b82f6",
    primaryForeground: get("primaryForeground") ?? "#ffffff",
    secondary: get("secondary") ?? "#262626",
    secondaryForeground: get("secondaryForeground") ?? "#f5f5f5",
    accent: get("accent") ?? "#8b5cf6",
    accentForeground: get("accentForeground") ?? "#ffffff",
    semantic: {
      success: getSemantic("success") ?? "#22c55e",
      warning: getSemantic("warning") ?? "#eab308",
      error: getSemantic("error") ?? "#ef4444",
      info: getSemantic("info") ?? "#3b82f6",
    },
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function EntranceAnimationsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections["entrance-animations"];
  const colors = usePreviewColors();

  return (
    <>
      <TopBar
        title="Entrance Animations"
        description="Fade-ins, staggers, scroll reveals, and typewriter effects"
        itemCount={entranceAnimationStyles.length}
      />
      <CatalogGrid columns={3}>
        {ENTRANCE_ANIMATION_GROUPS.map((group) => {
          const groupItems = entranceAnimationStyles.filter(
            (item) => ENTRANCE_ANIMATION_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;
          return [
            <div key={`header-${group}`} className="col-span-full mt-2 first:mt-0">
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">
                {groupItems.length} style{groupItems.length !== 1 ? "s" : ""}
              </p>
            </div>,
            ...groupItems.map((item) => (
              <EntranceAnimationCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={(id) => {
                  if (selectedId === id) deselect("entrance-animations");
                  else select("entrance-animations", id);
                }}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function EntranceAnimationCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: { id: string; name: string; description: string; data: AnimationData };
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const [key, setKey] = useState(0);
  const [playing, setPlaying] = useState(true);

  const replay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(false);
    requestAnimationFrame(() => {
      setKey((k) => k + 1);
      setPlaying(true);
    });
  }, []);

  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`group relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
        isSelected
          ? "border-blue-500 ring-1 ring-blue-500/30 bg-app-card-bg-selected"
          : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
      }`}
    >
      <style>{`
        @keyframes dk-ea-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes dk-ea-slide-up-fade { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes dk-ea-slide-left { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes dk-ea-slide-right { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes dk-ea-scale-in { 0% { opacity: 0; transform: scale(0.85); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes dk-ea-stagger-child { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes dk-ea-clip-reveal { 0% { opacity: 0; transform: scaleY(0); } 100% { opacity: 1; transform: scaleY(1); } }
        @keyframes dk-ea-typewriter { 0% { width: 0; } 100% { width: 100%; } }
        @keyframes dk-ea-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes dk-ea-reveal-scroll { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes dk-ea-parallax { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
        @keyframes dk-ea-progress { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
        @keyframes dk-ea-counter-fade { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[10px]">&#10003;</span>
        </div>
      )}
      <div className="p-4">
        <div
          className="rounded-lg overflow-hidden relative"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "160px" }}
        >
          {playing && (
            <EntranceDemo key={key} variant={d.variant} data={d} colors={colors} />
          )}
          {/* Replay button */}
          <div
            onClick={replay}
            style={{
              position: "absolute", bottom: "8px", right: "8px",
              width: "24px", height: "24px", borderRadius: "6px",
              backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 2,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: colors.primary + "14", color: colors.primary }}
          >
            {d.trigger}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-app-text-muted truncate">{item.description}</span>
          <span className="text-[8px] text-app-text-muted font-mono shrink-0">{d.duration}</span>
        </div>
      </div>
    </button>
  );
}

function EntranceDemo({ variant, data: d, colors }: { variant: string; data: AnimationData; colors: ColorMode }) {
  const bars = [0.85, 0.7, 0.6, 0.5, 0.75];
  const dur = d.duration;
  const ease = d.easing;

  if (variant === "fade-in") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", animation: `dk-ea-fade-in ${dur} ${ease} both` }}>
        {bars.map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: "8px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05) }} />
        ))}
      </div>
    );
  }

  if (variant === "slide-up-fade") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", animation: `dk-ea-slide-up-fade ${dur} ${ease} both` }}>
        {bars.map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: "8px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05) }} />
        ))}
      </div>
    );
  }

  if (variant === "slide-from-left") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", animation: `dk-ea-slide-left ${dur} ${ease} both` }}>
        {bars.map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: "8px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05) }} />
        ))}
      </div>
    );
  }

  if (variant === "slide-from-right") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", animation: `dk-ea-slide-right ${dur} ${ease} both` }}>
        {bars.map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: "8px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05) }} />
        ))}
      </div>
    );
  }

  if (variant === "scale-in") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", animation: `dk-ea-scale-in ${dur} ${ease} both` }}>
        {bars.map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: "8px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05) }} />
        ))}
      </div>
    );
  }

  if (variant === "stagger-children") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {bars.map((w, i) => (
          <div key={i} style={{
            width: `${w * 100}%`, height: "8px", borderRadius: "4px",
            backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05),
            animation: `dk-ea-stagger-child ${dur} ${ease} both`,
            animationDelay: `${i * 80}ms`,
          }} />
        ))}
      </div>
    );
  }

  if (variant === "clip-reveal") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", transformOrigin: "top", animation: `dk-ea-clip-reveal ${dur} ${ease} both` }}>
        {bars.map((w, i) => (
          <div key={i} style={{ width: `${w * 100}%`, height: "8px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05) }} />
        ))}
      </div>
    );
  }

  if (variant === "typewriter") {
    return (
      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
        <div style={{
          overflow: "hidden", whiteSpace: "nowrap",
          fontSize: "13px", fontWeight: 600, color: colors.text,
          borderRight: `2px solid ${colors.primary}`,
          animation: `dk-ea-typewriter ${dur} ${ease} both, dk-ea-blink 0.8s step-end infinite`,
          width: "auto", maxWidth: "100%",
        }}>
          Hello, World!
        </div>
        <div style={{ fontSize: "9px", color: colors.textMuted }}>Typewriter effect</div>
      </div>
    );
  }

  if (variant === "parallax") {
    return (
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px", height: "100%", justifyContent: "center" }}>
        <div style={{ animation: "dk-ea-parallax 2s ease-in-out infinite alternate" }}>
          <div style={{ width: "80%", height: "6px", borderRadius: "3px", backgroundColor: hexToRgba(colors.primary, 0.3), marginBottom: "6px" }} />
          <div style={{ width: "60%", height: "6px", borderRadius: "3px", backgroundColor: hexToRgba(colors.primary, 0.2) }} />
        </div>
        <div style={{ animation: "dk-ea-parallax 2s ease-in-out infinite alternate", animationDelay: "200ms" }}>
          <div style={{ width: "70%", height: "6px", borderRadius: "3px", backgroundColor: hexToRgba(colors.accent, 0.2), marginBottom: "6px" }} />
          <div style={{ width: "50%", height: "6px", borderRadius: "3px", backgroundColor: hexToRgba(colors.accent, 0.15) }} />
        </div>
        <div style={{ fontSize: "8px", color: colors.textMuted, textAlign: "center" }}>Layers move at different speeds</div>
      </div>
    );
  }

  if (variant === "reveal-on-scroll") {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {bars.map((w, i) => (
          <div key={i} style={{
            width: `${w * 100}%`, height: "8px", borderRadius: "4px",
            backgroundColor: hexToRgba(colors.primary, 0.15 + i * 0.05),
            animation: `dk-ea-reveal-scroll ${dur} ${ease} both`,
            animationDelay: `${i * 100}ms`,
          }} />
        ))}
      </div>
    );
  }

  if (variant === "sticky-header-transition") {
    return (
      <div style={{ padding: "0", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{
          padding: "8px 12px", backgroundColor: colors.surface, borderBottom: `1px solid ${colors.border}`,
          animation: `dk-ea-fade-in 300ms ease-out both`,
        }}>
          <div style={{ width: "60px", height: "5px", borderRadius: "3px", backgroundColor: colors.text, opacity: 0.3 }} />
        </div>
        <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {bars.slice(0, 3).map((w, i) => (
            <div key={i} style={{ width: `${w * 100}%`, height: "6px", borderRadius: "3px", backgroundColor: hexToRgba(colors.textMuted, 0.15) }} />
          ))}
        </div>
        <div style={{ fontSize: "8px", color: colors.textMuted, textAlign: "center", padding: "4px" }}>Header shrinks on scroll</div>
      </div>
    );
  }

  if (variant === "progress-indicator") {
    return (
      <div style={{ padding: "0", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{
          height: "3px", backgroundColor: colors.primary,
          transformOrigin: "left",
          animation: `dk-ea-progress 2s ease-out both`,
        }} />
        <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {bars.map((w, i) => (
            <div key={i} style={{ width: `${w * 100}%`, height: "6px", borderRadius: "3px", backgroundColor: hexToRgba(colors.textMuted, 0.15) }} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "counter-on-visible") {
    return <CounterOnVisibleDemo colors={colors} dur={dur} ease={ease} />;
  }

  return null;
}

function CounterOnVisibleDemo({ colors, dur, ease }: { colors: ColorMode; dur: string; ease: string }) {
  const [count, setCount] = useState(0);
  const target = 128;
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const steps = 20;
    const duration = parseInt(dur) || 1000;
    let step = 0;
    countRef.current = setInterval(() => {
      step++;
      setCount(Math.round((step / steps) * target));
      if (step >= steps && countRef.current) clearInterval(countRef.current);
    }, duration / steps);
    return () => { if (countRef.current) clearInterval(countRef.current); };
  }, [dur]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100%", gap: "4px",
      animation: `dk-ea-counter-fade ${dur} ${ease} both`,
    }}>
      <div style={{ fontSize: "32px", fontWeight: 700, color: colors.primary, fontVariantNumeric: "tabular-nums" }}>
        {count}
      </div>
      <div style={{ fontSize: "9px", color: colors.textMuted }}>Active users</div>
    </div>
  );
}
