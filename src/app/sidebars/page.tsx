"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { MiniSidebarFrame } from "@/components/catalog/MiniAppFrame";
import { sidebarStyles, SIDEBAR_GROUPS, SIDEBAR_META } from "@/data/sidebars";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, SidebarStyleData } from "@/lib/types";

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

export default function SidebarsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.sidebars;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("sidebars");
    else select("sidebars", id);
  }

  return (
    <>
      <TopBar
        title="Sidebars"
        description="Side navigation panels — fixed, collapsible, floating, grouped, minimal, and dark variants"
        itemCount={sidebarStyles.length}
      />
      <CatalogGrid columns={3}>
        {SIDEBAR_GROUPS.map((group) => {
          const groupItems = sidebarStyles.filter(
            (item) => SIDEBAR_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;
          return [
            <div key={`header-${group}`} className="col-span-full mt-2 first:mt-0">
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">{groupItems.length} style{groupItems.length !== 1 ? "s" : ""}</p>
            </div>,
            ...groupItems.map((item) => (
              <SidebarPreviewCard key={item.id} item={item} isSelected={selectedId === item.id} colors={colors} onSelect={handleSelect} />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function SidebarPreviewCard({
  item, isSelected, colors, onSelect,
}: {
  item: (typeof sidebarStyles)[number]; isSelected: boolean; colors: ColorMode; onSelect: (id: string) => void;
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
        <MiniSidebarFrame
          colors={colors}
          height={160}
          sidebarSlot={<SidebarPreview data={data} colors={colors} />}
        />
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          {data.isCollapsible && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.primary + "14", color: colors.primary }}>collapsible</span>
          )}
          {data.hasGroupHeaders && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.accent + "14", color: colors.accent }}>grouped</span>
          )}
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{item.description}</div>
      </div>
    </button>
  );
}

function SidebarPreview({ data, colors }: { data: SidebarStyleData; colors: ColorMode }) {
  const sidebarStyle = resolveCSS(data.css, colors);
  const isMinimal = data.variant === "minimal";
  const isFloating = data.variant === "floating";
  const items = isMinimal ? ["H", "S", "M", "G"] : ["Dashboard", "Analytics", "Settings", "Help"];
  const width = isMinimal ? "36px" : isFloating ? "80px" : "80px";

  return (
    <div style={{ ...sidebarStyle, width, display: "flex", flexDirection: "column", gap: "2px" }}>
      {data.hasGroupHeaders && (
        <div style={{ padding: "4px 14px 2px", fontSize: "5px", fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Main
        </div>
      )}
      {items.map((label, i) => {
        const isActive = i === 0;
        const itemStyle = resolveCSS(data.itemCss, colors);
        const activeStyle = isActive ? resolveCSS(data.activeItemCss, colors) : {};
        return (
          <div key={label} style={{ ...itemStyle, ...activeStyle, fontSize: isMinimal ? "8px" : "7px", cursor: "default" }}>
            {isMinimal ? (
              <span style={{ width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{label}</span>
            ) : label}
          </div>
        );
      })}
      {data.hasGroupHeaders && items.length > 2 && (
        <>
          <div style={{ height: "1px", backgroundColor: colors.border, margin: "4px 14px" }} />
          <div style={{ padding: "4px 14px 2px", fontSize: "5px", fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Other
          </div>
        </>
      )}
    </div>
  );
}
