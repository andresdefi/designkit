"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { emptyStateStyles, EMPTY_STATE_GROUPS, EMPTY_STATE_META } from "@/data/empty-states";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, EmptyStateStyleData } from "@/lib/types";

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

export default function EmptyStatesPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections["empty-states"];
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("empty-states");
    else select("empty-states", id);
  }

  return (
    <>
      <TopBar
        title="Empty States"
        description="Blank screen designs for when there's no content to display"
        itemCount={emptyStateStyles.length}
      />
      <CatalogGrid columns={3}>
        {EMPTY_STATE_GROUPS.map((group) => {
          const groupItems = emptyStateStyles.filter(
            (item) => EMPTY_STATE_META.find((m) => m.id === item.id)?.group === group
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
              <EmptyStateCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={handleSelect}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function EmptyStateCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof emptyStateStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const toneColor =
    d.tone === "error" ? colors.semantic.error :
    d.tone === "info" ? colors.semantic.info :
    d.tone === "friendly" ? colors.accent :
    colors.textMuted;

  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`group relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
        isSelected
          ? "border-blue-500 ring-1 ring-blue-500/30 bg-app-card-bg-selected"
          : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[10px]">&#10003;</span>
        </div>
      )}
      <div className="p-4">
        {/* Mini device frame */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "200px" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-3" style={{ height: "14px", backgroundColor: colors.surface }}>
            <div className="flex gap-0.5">
              <div style={{ width: "14px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.4 }} />
            </div>
            <div className="flex gap-1">
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
            </div>
          </div>

          {/* Content area — centered empty state */}
          <div className="flex flex-col items-center justify-center" style={{ height: "186px", padding: "16px" }}>
            {/* Illustration / Icon placeholder */}
            {d.hasIllustration && (
              <div style={{
                width: "40px", height: "40px",
                borderRadius: d.illustrationCss.borderRadius ?? "9999px",
                background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.2)}, ${hexToRgba(colors.accent, 0.2)})`,
                border: `1px solid ${hexToRgba(colors.primary, 0.15)}`,
                marginBottom: "10px",
              }} />
            )}
            {d.hasIcon && !d.hasIllustration && (
              <div style={{
                width: "28px", height: "28px",
                borderRadius: "6px",
                backgroundColor: hexToRgba(toneColor, 0.12),
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "8px",
              }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "9999px", backgroundColor: toneColor, opacity: 0.6 }} />
              </div>
            )}

            {/* Title bar */}
            <div style={{
              width: "80px", height: "5px", borderRadius: "2px",
              backgroundColor: colors.text, opacity: 0.25,
              marginBottom: "5px",
            }} />

            {/* Subtitle bar */}
            <div style={{
              width: "110px", height: "4px", borderRadius: "2px",
              backgroundColor: colors.textMuted, opacity: 0.2,
              marginBottom: d.hasCta ? "12px" : "0",
            }} />

            {/* CTA button */}
            {d.hasCta && (
              <div className="flex gap-1.5" style={{ marginTop: "4px" }}>
                <div style={{
                  width: "52px", height: "14px", borderRadius: "4px",
                  backgroundColor: colors.primary,
                }} />
                {d.hasSecondaryAction && (
                  <div style={{
                    width: "40px", height: "14px", borderRadius: "4px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: "transparent",
                  }} />
                )}
              </div>
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
            {d.layout}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
