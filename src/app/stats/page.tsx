"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { statStyles, STAT_GROUPS, STAT_META } from "@/data/stats";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode } from "@/lib/types";

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

function resolveColor(val: string, colors: ColorMode): string {
  if (!val.includes("__")) return val;
  let resolved = val
    .replace(/__primary-(\d+)/g, (_, n) => hexToRgba(colors.primary, parseInt(n, 10) / 100))
    .replace(/__accent-(\d+)/g, (_, n) => hexToRgba(colors.accent, parseInt(n, 10) / 100));
  resolved = resolved
    .replace(/__primaryForeground/g, colors.primaryForeground)
    .replace(/__textSecondary/g, colors.textSecondary)
    .replace(/__textMuted/g, colors.textMuted)
    .replace(/__surfaceAlt/g, colors.surfaceAlt)
    .replace(/__primary/g, colors.primary)
    .replace(/__accent/g, colors.accent)
    .replace(/__surface/g, colors.surface)
    .replace(/__border/g, colors.border)
    .replace(/__background/g, colors.background)
    .replace(/__text/g, colors.text);
  return resolved;
}

function resolveCSS(cssRecord: Record<string, string>, colors: ColorMode): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    result[key] = resolveColor(val, colors);
  }
  return result as unknown as React.CSSProperties;
}

export default function StatsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.stats;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("stats");
    else select("stats", id);
  }

  return (
    <>
      <TopBar
        title="Stats & Metrics"
        description="Number displays, trend indicators, and metric cards"
        itemCount={statStyles.length}
      />
      <CatalogGrid columns={3}>
        {STAT_GROUPS.map((group) => {
          const groupItems = statStyles.filter(
            (item) => STAT_META.find((m) => m.id === item.id)?.group === group
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
              <StatPreviewCard
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

function StatPreviewCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof statStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const { css, valueCss, hasIcon, hasTrend, hasChart, variant } = item.data;
  const containerStyle = resolveCSS(css, colors);
  const valueStyle = valueCss ? resolveCSS(valueCss, colors) : {};

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
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
        >
          <div style={containerStyle}>
            {hasIcon && (
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                backgroundColor: colors.primary + "18", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
                </svg>
              </div>
            )}
            <div style={{ ...valueStyle, fontSize: `${parseInt(valueStyle.fontSize as string || "24") * 0.65}px` }}>
              2,340
            </div>
            <div style={{ fontSize: "11px", color: colors.textMuted }}>Total Users</div>
            {hasTrend && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.semantic.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <span style={{ fontSize: "11px", color: colors.semantic.success, fontWeight: 600 }}>+12.5%</span>
              </div>
            )}
            {hasChart && variant === "progress-ring" && (
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ marginTop: "4px" }}>
                <circle cx="24" cy="24" r="20" fill="none" stroke={colors.border} strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="none" stroke={colors.primary} strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 20 * 0.72} ${2 * Math.PI * 20}`}
                  strokeLinecap="round" transform="rotate(-90 24 24)" />
              </svg>
            )}
            {hasChart && variant === "sparkline" && (
              <svg width="80" height="24" viewBox="0 0 80 24" style={{ marginTop: "2px" }}>
                <polyline
                  points="0,18 10,14 20,16 30,10 40,12 50,6 60,8 70,4 80,2"
                  fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
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
            {item.data.layout}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
