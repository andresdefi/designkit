"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { heroStyles, HERO_GROUPS, HERO_META } from "@/data/heroes";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, HeroStyleData } from "@/lib/types";

function usePreviewColors(): ColorMode {
  const { colorPicks, colorMode, selections } = useDesignKit();
  const mode = colorMode as "light" | "dark";
  const picks = colorPicks[mode];
  const palette = colorPalettes.find((p) => p.id === selections.colors);
  const base = palette?.data[mode];
  const get = (key: string) => picks[key] ?? (base as unknown as Record<string, string>)?.[key] ?? undefined;
  const getSemantic = (key: string) => picks[`semantic.${key}`] ?? base?.semantic[key as keyof typeof base.semantic];
  return {
    background: get("background") ?? "#0a0a0a", surface: get("surface") ?? "#171717",
    surfaceAlt: get("surfaceAlt") ?? "#1a1a1a", border: get("border") ?? "#262626",
    text: get("text") ?? "#f5f5f5", textSecondary: get("textSecondary") ?? "#a3a3a3",
    textMuted: get("textMuted") ?? "#525252", primary: get("primary") ?? "#3b82f6",
    primaryForeground: get("primaryForeground") ?? "#ffffff", secondary: get("secondary") ?? "#262626",
    secondaryForeground: get("secondaryForeground") ?? "#f5f5f5", accent: get("accent") ?? "#8b5cf6",
    accentForeground: get("accentForeground") ?? "#ffffff",
    semantic: { success: getSemantic("success") ?? "#22c55e", warning: getSemantic("warning") ?? "#eab308", error: getSemantic("error") ?? "#ef4444", info: getSemantic("info") ?? "#3b82f6" },
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

export default function HeroesPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.heroes;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("heroes");
    else select("heroes", id);
  }

  return (
    <>
      <TopBar
        title="Hero Sections"
        description="Landing page header layouts — text-focused, image-focused, and decorative styles"
        itemCount={heroStyles.length}
      />
      <CatalogGrid columns={3}>
        {HERO_GROUPS.map((group) => {
          const groupItems = heroStyles.filter(
            (item) => HERO_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;
          return [
            <div key={`header-${group}`} className="col-span-full mt-2 first:mt-0">
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">{groupItems.length} style{groupItems.length !== 1 ? "s" : ""}</p>
            </div>,
            ...groupItems.map((item) => (
              <HeroPreviewCard key={item.id} item={item} isSelected={selectedId === item.id} colors={colors} onSelect={handleSelect} />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function HeroPreviewCard({
  item, isSelected, colors, onSelect,
}: {
  item: (typeof heroStyles)[number]; isSelected: boolean; colors: ColorMode; onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const data = item.data;

  return (
    <button
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <HeroMiniPreview data={data} colors={colors} />
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.primary + "14", color: colors.primary }}>
            {data.layout}
          </span>
          {data.hasImage && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.semantic.info + "14", color: colors.semantic.info }}>image</span>
          )}
          {data.hasGradient && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.accent + "14", color: colors.accent }}>gradient</span>
          )}
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{item.description}</div>
      </div>
    </button>
  );
}

function HeroMiniPreview({ data, colors }: { data: HeroStyleData; colors: ColorMode }) {
  const heroStyle = resolveCSS(data.css, colors);
  const isGradient = data.hasGradient;
  const isFullImage = data.layout === "full-image";
  const isSplit = data.layout === "split";
  const isFloatingCards = data.variant === "floating-cards";
  const textColor = isGradient || isFullImage ? colors.primaryForeground : colors.text;
  const subColor = isGradient || isFullImage ? colors.primaryForeground + "bb" : colors.textSecondary;

  return (
    <div
      style={{
        ...heroStyle,
        minHeight: "120px",
        padding: "16px",
        borderRadius: "8px",
        border: `1px solid ${colors.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isFullImage && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.35)}, ${hexToRgba(colors.accent, 0.35)})`,
        }} />
      )}

      {isFloatingCards && (
        <>
          <div style={{
            position: "absolute", top: "10px", right: "12px", width: "28px", height: "20px",
            borderRadius: "4px", backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transform: "rotate(6deg)", zIndex: 0,
          }} />
          <div style={{
            position: "absolute", bottom: "14px", left: "10px", width: "24px", height: "18px",
            borderRadius: "4px", backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transform: "rotate(-4deg)", zIndex: 0,
          }} />
        </>
      )}

      <div style={{ position: "relative", zIndex: 1, display: "flex", ...(isSplit ? { alignItems: "center", gap: "12px" } : { flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }) }}>
        <div style={{ flex: isSplit ? 1 : undefined }}>
          <div style={{ fontSize: data.variant === "minimal" ? "12px" : "10px", fontWeight: 700, color: textColor, marginBottom: "4px" }}>
            {data.variant === "minimal" ? "Big Statement" : "Build Better Apps"}
          </div>
          {data.variant !== "minimal" && (
            <div style={{ fontSize: "7px", color: subColor, marginBottom: "8px" }}>
              The platform for modern teams
            </div>
          )}
          {data.variant !== "minimal" && (
            <div style={{
              display: "inline-block", padding: "3px 10px", borderRadius: "4px", fontSize: "6px", fontWeight: 600,
              backgroundColor: isGradient || isFullImage ? "rgba(255,255,255,0.2)" : colors.primary,
              color: isGradient || isFullImage ? "#ffffff" : colors.primaryForeground,
            }}>
              Get Started
            </div>
          )}
        </div>
        {isSplit && (
          <div style={{
            width: "50px", height: "50px", borderRadius: "8px", flexShrink: 0,
            background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.2)}, ${hexToRgba(colors.accent, 0.2)})`,
            border: `1px solid ${colors.border}`,
          }} />
        )}
      </div>
    </div>
  );
}
