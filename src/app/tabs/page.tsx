"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { MiniAppFrame } from "@/components/catalog/MiniAppFrame";
import { tabStyles, TAB_GROUPS, TAB_META } from "@/data/tabs";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, TabStyleData } from "@/lib/types";

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

export default function TabsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.tabs;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("tabs");
    else select("tabs", id);
  }

  return (
    <>
      <TopBar
        title="Tabs"
        description="Tab navigation styles — underline, pill, bordered, vertical, and more"
        itemCount={tabStyles.length}
      />
      <CatalogGrid columns={3}>
        {TAB_GROUPS.map((group) => {
          const groupItems = tabStyles.filter(
            (item) => TAB_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;
          return [
            <div key={`header-${group}`} className="col-span-full mt-2 first:mt-0">
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">{groupItems.length} style{groupItems.length !== 1 ? "s" : ""}</p>
            </div>,
            ...groupItems.map((item) => (
              <TabPreviewCard key={item.id} item={item} isSelected={selectedId === item.id} colors={colors} onSelect={handleSelect} />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function TabPreviewCard({
  item, isSelected, colors, onSelect,
}: {
  item: (typeof tabStyles)[number]; isSelected: boolean; colors: ColorMode; onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const data = item.data;
  const tabs = data.hasIcons ? ["Home", "Search", "Settings"] : ["General", "Billing", "Team"];

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
        <MiniAppFrame
          colors={colors}
          height={140}
          hideContentLines
          centerSlot={
            <div style={{ padding: "12px" }}>
              <TabSetPreview data={data} colors={colors} tabs={tabs} />
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ height: "3px", width: "60%", borderRadius: "2px", backgroundColor: colors.textMuted + "20" }} />
                <div style={{ height: "3px", width: "45%", borderRadius: "2px", backgroundColor: colors.textMuted + "15" }} />
              </div>
            </div>
          }
        />
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.primary + "14", color: colors.primary }}>
            {data.indicatorStyle}
          </span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.accent + "14", color: colors.accent }}>
            {data.orientation}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{item.description}</div>
      </div>
    </button>
  );
}

function TabSetPreview({ data, colors, tabs }: { data: TabStyleData; colors: ColorMode; tabs: string[] }) {
  const containerStyle = resolveCSS(data.containerCss, colors);
  const icons = ["H", "S", "G"];

  return (
    <div style={containerStyle}>
      {tabs.map((tab, i) => {
        const isActive = i === 0;
        const baseStyle = resolveCSS(data.tabCss, colors);
        const activeStyle = isActive ? resolveCSS(data.activeTabCss, colors) : {};
        return (
          <div key={tab} style={{ ...baseStyle, ...activeStyle, fontSize: "7px", cursor: "default" }}>
            {data.hasIcons && (
              <span style={{ fontSize: "8px", marginRight: data.orientation === "vertical" ? "4px" : "0", display: "block", textAlign: "center" }}>
                {icons[i]}
              </span>
            )}
            {tab}
          </div>
        );
      })}
    </div>
  );
}
