"use client";

import { useState, useCallback } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { pageTransitionStyles, PAGE_TRANSITION_GROUPS, PAGE_TRANSITION_META } from "@/data/page-transitions";
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

export default function PageTransitionsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections["page-transitions"];
  const colors = usePreviewColors();

  return (
    <>
      <TopBar
        title="Page Transitions"
        description="Fades, slides, and morph effects between pages"
        itemCount={pageTransitionStyles.length}
      />
      <CatalogGrid columns={3}>
        {PAGE_TRANSITION_GROUPS.map((group) => {
          const groupItems = pageTransitionStyles.filter(
            (item) => PAGE_TRANSITION_META.find((m) => m.id === item.id)?.group === group
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
              <PageTransitionCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={(id) => {
                  if (selectedId === id) deselect("page-transitions");
                  else select("page-transitions", id);
                }}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function PageTransitionCard({
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
  const [step, setStep] = useState<0 | 1>(0);
  const [animating, setAnimating] = useState(false);

  const play = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (animating || d.variant === "none") return;
    setAnimating(true);
    setStep((prev) => (prev === 0 ? 1 : 0));
    const dur = parseInt(d.duration) || 300;
    setTimeout(() => setAnimating(false), dur + 50);
  }, [animating, d.variant, d.duration]);

  const getPageAnimation = (isEntering: boolean): React.CSSProperties => {
    if (!animating) return { opacity: 1 };
    const dur = d.duration;
    const ease = d.easing;
    switch (d.variant) {
      case "fade":
        return isEntering
          ? { animation: `dk-pt-fade-in ${dur} ${ease} forwards` }
          : { animation: `dk-pt-fade-out ${dur} ${ease} forwards` };
      case "slide-left":
        return isEntering
          ? { animation: `dk-pt-slide-in-right ${dur} ${ease} forwards` }
          : { animation: `dk-pt-slide-out-left ${dur} ${ease} forwards` };
      case "slide-up":
        return isEntering
          ? { animation: `dk-pt-slide-up ${dur} ${ease} forwards` }
          : { animation: `dk-pt-fade-out ${dur} ${ease} forwards` };
      case "scale-zoom":
        return isEntering
          ? { animation: `dk-pt-scale-in ${dur} ${ease} forwards` }
          : { animation: `dk-pt-scale-out ${dur} ${ease} forwards` };
      case "shared-element-morph":
        return isEntering
          ? { animation: `dk-pt-morph-in ${dur} ${ease} forwards` }
          : { animation: `dk-pt-fade-out ${dur} ${ease} forwards` };
      case "blur-transition":
        return isEntering
          ? { animation: `dk-pt-blur-in ${dur} ${ease} forwards` }
          : { animation: `dk-pt-blur-out ${dur} ${ease} forwards` };
      default: return {};
    }
  };

  const pageColors = [
    { bg: hexToRgba(colors.primary, 0.08), accent: colors.primary, label: "Page A" },
    { bg: hexToRgba(colors.accent, 0.08), accent: colors.accent, label: "Page B" },
  ];
  const current = pageColors[step];
  const prev = pageColors[step === 0 ? 1 : 0];

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
        @keyframes dk-pt-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes dk-pt-fade-out { 0% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes dk-pt-slide-in-right { 0% { transform: translateX(100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes dk-pt-slide-out-left { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(-100%); opacity: 0; } }
        @keyframes dk-pt-slide-up { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes dk-pt-scale-in { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes dk-pt-scale-out { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.1); opacity: 0; } }
        @keyframes dk-pt-morph-in { 0% { transform: scale(0.8) translateY(10px); opacity: 0; } 60% { transform: scale(1.02); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes dk-pt-blur-in { 0% { opacity: 0; transform: scale(1.02); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes dk-pt-blur-out { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.98); } }
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
          {/* Mini page views */}
          <div style={{ position: "absolute", inset: 0 }}>
            {/* Exiting page */}
            {animating && (
              <div
                style={{
                  position: "absolute", inset: "8px",
                  borderRadius: "6px",
                  backgroundColor: prev.bg,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
                  ...getPageAnimation(false),
                }}
              >
                <div style={{ width: "40px", height: "4px", borderRadius: "2px", backgroundColor: prev.accent, opacity: 0.5 }} />
                <div style={{ width: "60px", height: "3px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2 }} />
              </div>
            )}
            {/* Current page */}
            <div
              style={{
                position: "absolute", inset: "8px",
                borderRadius: "6px",
                backgroundColor: current.bg,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
                ...(animating ? getPageAnimation(true) : {}),
              }}
            >
              <div style={{ width: "40px", height: "4px", borderRadius: "2px", backgroundColor: current.accent, opacity: 0.5 }} />
              <div style={{ width: "60px", height: "3px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2 }} />
              <div style={{ width: "50px", height: "3px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
              <div style={{ fontSize: "8px", color: colors.textMuted, marginTop: "4px" }}>{current.label}</div>
            </div>
          </div>
          {/* Play button */}
          <div
            onClick={play}
            style={{
              position: "absolute", bottom: "8px", right: "8px",
              width: "24px", height: "24px", borderRadius: "6px",
              backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: d.variant === "none" ? "default" : "pointer",
              opacity: d.variant === "none" ? 0.3 : 1,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill={colors.text} stroke="none">
              <polygon points="5 3 19 12 5 21 5 3" />
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
            {d.subtype}
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
