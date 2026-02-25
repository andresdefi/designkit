"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { loadingStyles, LOADING_GROUPS, LOADING_META } from "@/data/loading";
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

export default function LoadingPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.loading;
  const colors = usePreviewColors();

  return (
    <>
      <style>{`
        @keyframes dk-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes dk-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes dk-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dk-fill {
          0% { width: 10%; }
          50% { width: 70%; }
          100% { width: 95%; }
        }
        @keyframes dk-blur-up {
          0% { opacity: 0.5; filter: blur(4px) saturate(1.2); }
          100% { opacity: 1; filter: blur(0px) saturate(1); }
        }
      `}</style>
      <TopBar
        title="Loading"
        description="Skeletons, spinners, and progress indicators"
        itemCount={loadingStyles.length}
      />
      <CatalogGrid columns={3}>
        {LOADING_GROUPS.map((group) => {
          const groupItems = loadingStyles.filter(
            (item) => LOADING_META.find((m) => m.id === item.id)?.group === group
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
              <LoadingCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={(id) => {
                  if (selectedId === id) deselect("loading");
                  else select("loading", id);
                }}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function LoadingCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof loadingStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const skeletonBg = hexToRgba(colors.textMuted, 0.15);

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
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "200px" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-3" style={{ height: "14px", backgroundColor: colors.surface }}>
            <div style={{ width: "14px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.4 }} />
            <div className="flex gap-1">
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
            </div>
          </div>

          {/* Content area */}
          <div style={{ height: "186px", padding: "12px", display: "flex", flexDirection: "column" }}>
            {d.type === "skeleton" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                {/* Header skeleton */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "9999px",
                    backgroundColor: skeletonBg,
                    ...(d.animationStyle === "pulse" ? { animation: "dk-pulse 1.5s ease-in-out infinite" } : {}),
                    ...(d.animationStyle === "stagger" ? { animation: "dk-pulse 1.5s ease-in-out infinite", animationDelay: "0ms" } : {}),
                    position: "relative", overflow: "hidden",
                  }}>
                    {d.animationStyle === "shimmer" && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(90deg, transparent, ${hexToRgba(colors.text, 0.06)}, transparent)`,
                        animation: "dk-shimmer 1.5s ease-in-out infinite",
                      }} />
                    )}
                  </div>
                  <div style={{
                    width: "80px", height: "8px", borderRadius: "4px",
                    backgroundColor: skeletonBg,
                    position: "relative", overflow: "hidden",
                    ...(d.animationStyle === "pulse" ? { animation: "dk-pulse 1.5s ease-in-out infinite" } : {}),
                    ...(d.animationStyle === "stagger" ? { animation: "dk-pulse 1.5s ease-in-out infinite", animationDelay: "100ms" } : {}),
                  }}>
                    {d.animationStyle === "shimmer" && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(90deg, transparent, ${hexToRgba(colors.text, 0.06)}, transparent)`,
                        animation: "dk-shimmer 1.5s ease-in-out infinite",
                      }} />
                    )}
                  </div>
                </div>
                {/* Content lines */}
                {Array.from({ length: d.lineCount }).map((_, i) => (
                  <div key={i} style={{
                    width: `${85 - i * 12}%`, height: "8px", borderRadius: "4px",
                    backgroundColor: skeletonBg,
                    position: "relative", overflow: "hidden",
                    ...(d.animationStyle === "pulse" ? { animation: "dk-pulse 1.5s ease-in-out infinite" } : {}),
                    ...(d.animationStyle === "stagger" ? { animation: "dk-pulse 1.5s ease-in-out infinite", animationDelay: `${(i + 2) * 100}ms` } : {}),
                  }}>
                    {d.animationStyle === "shimmer" && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(90deg, transparent, ${hexToRgba(colors.text, 0.06)}, transparent)`,
                        animation: "dk-shimmer 1.5s ease-in-out infinite",
                        animationDelay: `${i * 150}ms`,
                      }} />
                    )}
                  </div>
                ))}
                {/* Card skeleton */}
                <div style={{
                  flex: 1, borderRadius: "6px",
                  backgroundColor: skeletonBg,
                  position: "relative", overflow: "hidden",
                  marginTop: "4px",
                  ...(d.animationStyle === "pulse" ? { animation: "dk-pulse 1.5s ease-in-out infinite" } : {}),
                  ...(d.animationStyle === "stagger" ? { animation: "dk-pulse 1.5s ease-in-out infinite", animationDelay: `${(d.lineCount + 2) * 100}ms` } : {}),
                }}>
                  {d.animationStyle === "shimmer" && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(90deg, transparent, ${hexToRgba(colors.text, 0.06)}, transparent)`,
                      animation: "dk-shimmer 1.5s ease-in-out infinite",
                      animationDelay: `${d.lineCount * 150}ms`,
                    }} />
                  )}
                </div>
              </div>
            )}

            {d.type === "spinner" && (
              <div className="flex flex-col items-center justify-center" style={{ flex: 1, gap: "10px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "9999px",
                  border: `3px solid ${hexToRgba(colors.primary, 0.2)}`,
                  borderTopColor: colors.primary,
                  animation: "dk-spin 0.8s linear infinite",
                }} />
                <div style={{ width: "50px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2 }} />
              </div>
            )}

            {d.type === "progress" && (
              <div className="flex flex-col items-center justify-center" style={{ flex: 1, gap: "10px", padding: "0 16px" }}>
                <div style={{ width: "50px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2, marginBottom: "4px" }} />
                <div style={{ width: "100%", height: "5px", borderRadius: "3px", backgroundColor: hexToRgba(colors.primary, 0.12), overflow: "hidden", position: "relative" }}>
                  <div style={{
                    height: "100%", borderRadius: "3px",
                    backgroundColor: colors.primary,
                    animation: "dk-fill 2s ease-in-out infinite",
                  }} />
                </div>
                <div style={{ width: "30px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
              </div>
            )}

            {d.type === "placeholder" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                {Array.from({ length: d.lineCount }).map((_, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "8px", padding: "8px",
                    borderRadius: "6px", border: `1px solid ${hexToRgba(colors.border, 0.5)}`,
                    backgroundColor: colors.surface,
                  }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "6px",
                      backgroundColor: skeletonBg, flexShrink: 0,
                      animation: "dk-pulse 1.5s ease-in-out infinite",
                      animationDelay: `${i * 200}ms`,
                    }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center" }}>
                      <div style={{ width: "70%", height: "5px", borderRadius: "2px", backgroundColor: skeletonBg, animation: "dk-pulse 1.5s ease-in-out infinite", animationDelay: `${i * 200 + 100}ms` }} />
                      <div style={{ width: "50%", height: "4px", borderRadius: "2px", backgroundColor: skeletonBg, animation: "dk-pulse 1.5s ease-in-out infinite", animationDelay: `${i * 200 + 200}ms` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {d.type === "inline" && d.animationStyle === "blur" && (
              <div className="flex items-center justify-center" style={{ flex: 1 }}>
                <div style={{
                  width: "100%", height: "80px", borderRadius: "8px",
                  background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.15)}, ${hexToRgba(colors.accent, 0.15)})`,
                  animation: "dk-blur-up 2s ease-in-out infinite alternate",
                }} />
              </div>
            )}

            {d.type === "inline" && d.animationStyle === "spin" && d.variant === "pull-to-refresh" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "16px", height: "16px", borderRadius: "9999px",
                  border: `2px solid ${hexToRgba(colors.primary, 0.2)}`,
                  borderTopColor: colors.primary,
                  animation: "dk-spin 0.8s linear infinite",
                }} />
                {/* Content lines below */}
                {[0.9, 0.7, 0.8, 0.6].map((w, i) => (
                  <div key={i} style={{
                    width: `${w * 100}%`, height: "24px", borderRadius: "4px",
                    backgroundColor: colors.surface, border: `1px solid ${hexToRgba(colors.border, 0.5)}`,
                  }} />
                ))}
              </div>
            )}

            {d.type === "inline" && d.variant === "inline-button-loading" && (
              <div className="flex flex-col items-center justify-center" style={{ flex: 1, gap: "12px" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  padding: "8px 20px", borderRadius: "6px",
                  backgroundColor: colors.primary, color: colors.primaryForeground,
                }}>
                  <div style={{
                    width: "12px", height: "12px", borderRadius: "9999px",
                    border: `2px solid ${hexToRgba(colors.primaryForeground, 0.3)}`,
                    borderTopColor: colors.primaryForeground,
                    animation: "dk-spin 0.8s linear infinite",
                  }} />
                  <div style={{ width: "36px", height: "4px", borderRadius: "2px", backgroundColor: colors.primaryForeground, opacity: 0.5 }} />
                </div>
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
            {d.animationStyle}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
