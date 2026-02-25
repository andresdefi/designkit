"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { microInteractionStyles, MICRO_INTERACTION_GROUPS, MICRO_INTERACTION_META } from "@/data/micro-interactions";
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

export default function MicroInteractionsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections["micro-interactions"];
  const colors = usePreviewColors();

  return (
    <>
      <TopBar
        title="Micro-interactions"
        description="Toggles, feedback, and small UI animations"
        itemCount={microInteractionStyles.length}
      />
      <CatalogGrid columns={3}>
        {MICRO_INTERACTION_GROUPS.map((group) => {
          const groupItems = microInteractionStyles.filter(
            (item) => MICRO_INTERACTION_META.find((m) => m.id === item.id)?.group === group
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
              <MicroInteractionCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={(id) => {
                  if (selectedId === id) deselect("micro-interactions");
                  else select("micro-interactions", id);
                }}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function MicroInteractionCard({
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
        @keyframes dk-mi-heart-pop {
          0% { transform: scale(1); }
          30% { transform: scale(1.3); }
          50% { transform: scale(0.95); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes dk-mi-check-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes dk-mi-swipe-off {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes dk-mi-tooltip-in {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dk-mi-menu-in {
          0% { opacity: 0; transform: scaleY(0.9) translateY(-4px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes dk-mi-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dk-mi-count-fade {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
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
          className="rounded-lg overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "160px" }}
        >
          <MicroDemo variant={d.variant} data={d} colors={colors} />
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

function MicroDemo({ variant, data: d, colors }: { variant: string; data: AnimationData; colors: ColorMode }) {
  const [toggled, setToggled] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const targetCount = 42;
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerAnimation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const dur = parseInt(d.duration) || 400;
    if (variant === "toggle-flip" || variant === "checkbox-draw") {
      setToggled((prev) => !prev);
      setAnimating(true);
      setTimeout(() => setAnimating(false), dur);
    } else if (variant === "heart-pop") {
      setToggled((prev) => !prev);
      setAnimating(true);
      setTimeout(() => setAnimating(false), dur);
    } else if (variant === "count-up-numbers") {
      setCount(0);
      setAnimating(true);
      if (countRef.current) clearInterval(countRef.current);
      const steps = 20;
      let step = 0;
      countRef.current = setInterval(() => {
        step++;
        setCount(Math.round((step / steps) * targetCount));
        if (step >= steps) {
          if (countRef.current) clearInterval(countRef.current);
          setAnimating(false);
        }
      }, dur / steps);
    } else if (variant === "swipe-delete") {
      if (swiped) { setSwiped(false); return; }
      setSwiped(true);
      setAnimating(true);
      setTimeout(() => setAnimating(false), dur);
    } else if (variant === "menu-expand") {
      setMenuOpen((prev) => !prev);
    } else if (variant === "pull-to-refresh") {
      setAnimating(true);
      setTimeout(() => setAnimating(false), dur + 600);
    }
  }, [variant, d.duration, swiped]);

  useEffect(() => {
    return () => { if (countRef.current) clearInterval(countRef.current); };
  }, []);

  if (variant === "toggle-flip") {
    return (
      <div onClick={triggerAnimation} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "40px", height: "22px", borderRadius: "11px",
          backgroundColor: toggled ? colors.primary : colors.border,
          padding: "2px",
          display: "flex", alignItems: "center",
          justifyContent: toggled ? "flex-end" : "flex-start",
          transition: `background-color ${d.duration} ${d.easing}`,
        }}>
          <div style={{
            width: "18px", height: "18px", borderRadius: "9999px",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            transition: `transform ${d.duration} ${d.easing}`,
          }} />
        </div>
        <span style={{ fontSize: "10px", color: colors.textSecondary }}>
          {toggled ? "On" : "Off"}
        </span>
      </div>
    );
  }

  if (variant === "checkbox-draw") {
    return (
      <div onClick={triggerAnimation} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "20px", height: "20px", borderRadius: "4px",
          border: `2px solid ${toggled ? colors.primary : colors.border}`,
          backgroundColor: toggled ? colors.primary : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: `all ${d.duration} ${d.easing}`,
        }}>
          {toggled && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 24, strokeDashoffset: animating ? undefined : 0, animation: animating ? `dk-mi-check-draw ${d.duration} ${d.easing} forwards` : undefined }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span style={{ fontSize: "10px", color: colors.textSecondary }}>
          {toggled ? "Checked" : "Unchecked"}
        </span>
      </div>
    );
  }

  if (variant === "heart-pop") {
    return (
      <div onClick={triggerAnimation} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <svg
          width="28" height="28" viewBox="0 0 24 24"
          fill={toggled ? colors.semantic.error : "none"}
          stroke={toggled ? colors.semantic.error : colors.textMuted}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: animating ? `dk-mi-heart-pop ${d.duration} ${d.easing}` : undefined }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span style={{ fontSize: "9px", color: colors.textMuted }}>Tap to like</span>
      </div>
    );
  }

  if (variant === "count-up-numbers") {
    return (
      <div onClick={triggerAnimation} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <div style={{
          fontSize: "28px", fontWeight: 700, color: colors.primary, fontVariantNumeric: "tabular-nums",
          animation: animating ? `dk-mi-count-fade 400ms ease-out` : undefined,
        }}>
          {count}
        </div>
        <span style={{ fontSize: "9px", color: colors.textMuted }}>Click to count</span>
      </div>
    );
  }

  if (variant === "pull-to-refresh") {
    return (
      <div onClick={triggerAnimation} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", width: "100px" }}>
        {animating && (
          <div style={{
            width: "16px", height: "16px", borderRadius: "9999px",
            border: `2px solid ${hexToRgba(colors.primary, 0.2)}`,
            borderTopColor: colors.primary,
            animation: "dk-mi-spin 0.8s linear infinite",
          }} />
        )}
        {[0.9, 0.7, 0.5].map((w, i) => (
          <div key={i} style={{
            width: `${w * 100}%`, height: "6px", borderRadius: "3px",
            backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
            transform: animating ? `translateY(${animating ? 4 : 0}px)` : undefined,
            transition: `transform ${d.duration} ${d.easing}`,
          }} />
        ))}
        <span style={{ fontSize: "8px", color: colors.textMuted }}>Click to pull</span>
      </div>
    );
  }

  if (variant === "swipe-delete") {
    return (
      <div onClick={triggerAnimation} style={{ cursor: "pointer", position: "relative", width: "120px" }}>
        {/* Delete background */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "6px",
          backgroundColor: hexToRgba(colors.semantic.error, 0.15),
          display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px",
        }}>
          <span style={{ fontSize: "8px", color: colors.semantic.error, fontWeight: 600 }}>Delete</span>
        </div>
        {/* Item */}
        <div style={{
          position: "relative",
          padding: "8px 12px", borderRadius: "6px",
          backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
          animation: swiped && animating ? `dk-mi-swipe-off ${d.duration} ${d.easing} forwards` : undefined,
          transform: swiped && !animating ? "translateX(100%)" : undefined,
          opacity: swiped && !animating ? 0 : undefined,
        }}>
          <div style={{ fontSize: "10px", color: colors.text }}>List item</div>
          <div style={{ fontSize: "8px", color: colors.textMuted }}>Swipe to delete</div>
        </div>
      </div>
    );
  }

  if (variant === "tooltip-fade") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        {hovered && (
          <div style={{
            padding: "4px 8px", borderRadius: "4px",
            backgroundColor: colors.text, color: colors.background,
            fontSize: "9px", fontWeight: 500,
            animation: `dk-mi-tooltip-in ${d.duration} ${d.easing} forwards`,
          }}>
            Tooltip text
          </div>
        )}
        <div
          onMouseEnter={(e) => { e.stopPropagation(); setHovered(true); }}
          onMouseLeave={(e) => { e.stopPropagation(); setHovered(false); }}
          style={{
            padding: "6px 16px", borderRadius: "6px",
            backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
            fontSize: "10px", color: colors.textSecondary, cursor: "pointer",
          }}
        >
          Hover me
        </div>
      </div>
    );
  }

  if (variant === "menu-expand") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", position: "relative" }}>
        <div
          onClick={triggerAnimation}
          style={{
            padding: "6px 16px", borderRadius: "6px",
            backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
            fontSize: "10px", color: colors.textSecondary, cursor: "pointer",
            display: "flex", alignItems: "center", gap: "4px",
          }}
        >
          Menu
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {menuOpen && (
          <div style={{
            padding: "4px", borderRadius: "6px",
            backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            animation: `dk-mi-menu-in ${d.duration} ${d.easing}`,
            transformOrigin: "top",
            width: "90px",
          }}>
            {["Edit", "Copy", "Delete"].map((label) => (
              <div key={label} style={{
                padding: "4px 8px", borderRadius: "4px",
                fontSize: "9px", color: colors.text,
              }}>
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
