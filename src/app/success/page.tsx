"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { successStyles, SUCCESS_GROUPS, SUCCESS_META } from "@/data/success";
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

export default function SuccessPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.success;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("success");
    else select("success", id);
  }

  return (
    <>
      <TopBar
        title="Success States"
        description="Confirmation and completion screens"
        itemCount={successStyles.length}
      />
      <CatalogGrid columns={3}>
        {SUCCESS_GROUPS.map((group) => {
          const groupItems = successStyles.filter(
            (item) => SUCCESS_META.find((m) => m.id === item.id)?.group === group
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
              <SuccessCard
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

function SuccessCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof successStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const successColor = colors.semantic.success;

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

          {/* Content — centered success */}
          <div className="flex flex-col items-center justify-center" style={{ height: "186px", padding: "16px", position: "relative" }}>
            {/* Confetti dots */}
            {d.type === "confetti" && (
              <>
                {[
                  { x: "15%", y: "20%", bg: colors.primary },
                  { x: "75%", y: "15%", bg: colors.accent },
                  { x: "85%", y: "35%", bg: successColor },
                  { x: "10%", y: "60%", bg: colors.accent },
                  { x: "80%", y: "65%", bg: colors.primary },
                  { x: "25%", y: "80%", bg: successColor },
                ].map((dot, i) => (
                  <div key={i} style={{
                    position: "absolute", left: dot.x, top: dot.y,
                    width: "4px", height: "4px", borderRadius: "9999px",
                    backgroundColor: dot.bg, opacity: 0.4,
                  }} />
                ))}
              </>
            )}

            {/* Success icon */}
            <div style={{
              width: d.type === "card-flip" ? "36px" : "32px",
              height: d.type === "card-flip" ? "36px" : "32px",
              borderRadius: d.type === "card-flip" ? "8px" : "9999px",
              backgroundColor: hexToRgba(successColor, 0.15),
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "10px",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={successColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Title */}
            <div style={{ width: "70px", height: "5px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.25, marginBottom: "5px" }} />
            {/* Subtitle */}
            <div style={{ width: "100px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2, marginBottom: "12px" }} />

            {/* Countdown text for redirect type */}
            {d.hasRedirect && (
              <div style={{ width: "50px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.15, marginBottom: "8px" }} />
            )}

            {/* CTA */}
            {d.hasCta && (
              <div style={{ width: "52px", height: "14px", borderRadius: "4px", backgroundColor: colors.primary }} />
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: successColor + "14", color: successColor }}
          >
            {d.type}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
