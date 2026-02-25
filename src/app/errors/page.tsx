"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { errorStyles, ERROR_GROUPS, ERROR_META } from "@/data/errors";
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

export default function ErrorsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.errors;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("errors");
    else select("errors", id);
  }

  return (
    <>
      <TopBar
        title="Error Screens"
        description="404, connection, and failure states"
        itemCount={errorStyles.length}
      />
      <CatalogGrid columns={3}>
        {ERROR_GROUPS.map((group) => {
          const groupItems = errorStyles.filter(
            (item) => ERROR_META.find((m) => m.id === item.id)?.group === group
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
              <ErrorCard
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

function ErrorCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof errorStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const errorColor = colors.semantic.error;
  const isValidation = d.errorType === "validation";

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

          {isValidation ? (
            /* Validation summary — list style */
            <div style={{ padding: "12px", height: "186px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: errorColor, opacity: 0.8 }} />
                <div style={{ width: "60px", height: "4px", borderRadius: "2px", backgroundColor: errorColor, opacity: 0.4 }} />
              </div>
              {[0.9, 0.7, 0.8].map((w, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 8px", borderRadius: "4px",
                  backgroundColor: hexToRgba(errorColor, 0.06),
                  borderLeft: `2px solid ${hexToRgba(errorColor, 0.5)}`,
                }}>
                  <div style={{ width: `${w * 80}px`, height: "3px", borderRadius: "1.5px", backgroundColor: colors.textSecondary, opacity: 0.3 }} />
                </div>
              ))}
            </div>
          ) : (
            /* Centered error screen */
            <div className="flex flex-col items-center justify-center" style={{ height: "186px", padding: "16px" }}>
              {d.hasErrorCode && (
                <div style={{
                  fontSize: "24px", fontWeight: 800, color: hexToRgba(errorColor, 0.25),
                  marginBottom: "4px", lineHeight: 1,
                }}>
                  {d.errorType === "404" ? "404" : "ERR"}
                </div>
              )}
              {d.hasIcon && !d.hasErrorCode && (
                <div style={{
                  width: "28px", height: "28px", borderRadius: "9999px",
                  backgroundColor: hexToRgba(errorColor, 0.12),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "8px",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={errorColor} strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
              )}
              <div style={{ width: "70px", height: "5px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.25, marginBottom: "5px" }} />
              <div style={{ width: "100px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2, marginBottom: d.hasCta ? "12px" : "0" }} />
              {d.hasCta && (
                <div className="flex gap-1.5">
                  <div style={{ width: "48px", height: "14px", borderRadius: "4px", backgroundColor: colors.primary }} />
                  {d.hasSecondaryAction && (
                    <div style={{ width: "36px", height: "14px", borderRadius: "4px", border: `1px solid ${colors.border}` }} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: errorColor + "14", color: errorColor }}
          >
            {d.errorType}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
