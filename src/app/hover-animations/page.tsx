"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { hoverAnimationStyles, HOVER_ANIMATION_GROUPS, HOVER_ANIMATION_META } from "@/data/hover-animations";
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

export default function HoverAnimationsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections["hover-animations"];
  const colors = usePreviewColors();

  return (
    <>
      <TopBar
        title="Hover Animations"
        description="Lifts, reveals, and interactive hover feedback"
        itemCount={hoverAnimationStyles.length}
      />
      <CatalogGrid columns={3}>
        {HOVER_ANIMATION_GROUPS.map((group) => {
          const groupItems = hoverAnimationStyles.filter(
            (item) => HOVER_ANIMATION_META.find((m) => m.id === item.id)?.group === group
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
              <HoverAnimationCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={(id) => {
                  if (selectedId === id) deselect("hover-animations");
                  else select("hover-animations", id);
                }}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function HoverAnimationCard({
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
  const [hovered, setHovered] = useState(false);

  const getHoverStyle = (): React.CSSProperties => {
    if (!hovered) return {};
    switch (d.variant) {
      case "lift-shadow": return { transform: "translateY(-2px)", boxShadow: `0 8px 25px ${hexToRgba(colors.primary, 0.15)}` };
      case "scale-up": return { transform: "scale(1.03)" };
      case "icon-nudge": return {};
      case "color-shift": return { backgroundColor: hexToRgba(colors.primary, 0.12) };
      case "glow": return { boxShadow: `0 0 16px ${hexToRgba(colors.primary, 0.4)}` };
      case "border-reveal": return { borderColor: colors.primary };
      default: return {};
    }
  };

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
        @keyframes dk-underline-expand {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes dk-bg-slide-fill {
          0% { background-size: 0% 100%; }
          100% { background-size: 100% 100%; }
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
          {/* Interactive hover demo */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              width: "140px",
              padding: "16px",
              borderRadius: "10px",
              backgroundColor: colors.surface,
              border: `1px solid ${d.variant === "border-reveal" && !hovered ? "transparent" : colors.border}`,
              cursor: "pointer",
              transition: `all ${d.duration} ${d.easing}`,
              ...getHoverStyle(),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: colors.text }}>Card Title</div>
              {d.variant === "icon-nudge" && (
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round"
                  style={{ transition: `transform ${d.duration} ${d.easing}`, transform: hovered ? "translateX(4px)" : "translateX(0)" }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </div>
            <div style={{ fontSize: "9px", color: colors.textMuted, marginTop: "4px" }}>
              Hover this card
            </div>
            {d.variant === "underline-slide" && (
              <div style={{
                height: "2px", marginTop: "8px", borderRadius: "1px",
                backgroundColor: colors.primary,
                transform: hovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: `transform ${d.duration} ${d.easing}`,
              }} />
            )}
            {d.variant === "background-slide" && (
              <div style={{
                height: "3px", marginTop: "8px", borderRadius: "2px",
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: hovered ? "100% 100%" : "0% 100%",
                transition: `background-size ${d.duration} ${d.easing}`,
              }} />
            )}
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
