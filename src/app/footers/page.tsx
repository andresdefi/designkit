"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { MiniAppFrame } from "@/components/catalog/MiniAppFrame";
import { footerStyles, FOOTER_GROUPS, FOOTER_META } from "@/data/footers";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, FooterStyleData } from "@/lib/types";

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

function resolveColor(val: string, colors: ColorMode): string {
  if (!val.includes("__")) return val;
  return val
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
}

function resolveCSS(cssRecord: Record<string, string>, colors: ColorMode): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    result[key] = resolveColor(val, colors);
  }
  return result as unknown as React.CSSProperties;
}

export default function FootersPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.footers;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("footers");
    else select("footers", id);
  }

  return (
    <>
      <TopBar
        title="Footers"
        description="Page footer layouts — simple, multi-column, CTA, and comprehensive styles"
        itemCount={footerStyles.length}
      />
      <CatalogGrid columns={3}>
        {FOOTER_GROUPS.map((group) => {
          const groupItems = footerStyles.filter(
            (item) => FOOTER_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;
          return [
            <div key={`header-${group}`} className="col-span-full mt-2 first:mt-0">
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">{groupItems.length} style{groupItems.length !== 1 ? "s" : ""}</p>
            </div>,
            ...groupItems.map((item) => (
              <FooterPreviewCard key={item.id} item={item} isSelected={selectedId === item.id} colors={colors} onSelect={handleSelect} />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function FooterPreviewCard({
  item, isSelected, colors, onSelect,
}: {
  item: (typeof footerStyles)[number]; isSelected: boolean; colors: ColorMode; onSelect: (id: string) => void;
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
        <MiniAppFrame
          colors={colors}
          height={160}
          bottomSlot={<FooterMiniPreview data={data} colors={colors} />}
        />
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          {data.columns > 0 && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.primary + "14", color: colors.primary }}>
              {data.columns}col
            </span>
          )}
          {data.hasCta && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.accent + "14", color: colors.accent }}>cta</span>
          )}
          {data.hasNewsletter && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.semantic.info + "14", color: colors.semantic.info }}>newsletter</span>
          )}
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{item.description}</div>
      </div>
    </button>
  );
}

function FooterMiniPreview({ data, colors }: { data: FooterStyleData; colors: ColorMode }) {
  const footerStyle = resolveCSS(data.css, colors);

  if (data.variant === "simple") {
    return (
      <div style={footerStyle}>
        <div style={{ width: "10px", height: "10px", borderRadius: "3px", backgroundColor: colors.primary, margin: "0 auto 4px" }} />
        <div style={{ fontSize: "5px", color: colors.textMuted, textAlign: "center" }}>2026 Company Inc.</div>
      </div>
    );
  }

  if (data.variant === "minimal") {
    return (
      <div style={footerStyle}>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <span key={l} style={{ fontSize: "5px", color: colors.textSecondary }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: "5px", color: colors.textMuted }}>2026 Company</span>
      </div>
    );
  }

  if (data.variant === "cta") {
    return (
      <div style={footerStyle}>
        <div style={{ backgroundColor: colors.primary + "10", borderRadius: "6px", padding: "8px", marginBottom: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "7px", fontWeight: 600, color: colors.text, marginBottom: "3px" }}>Ready to start?</div>
          <div style={{ display: "inline-block", padding: "2px 8px", borderRadius: "3px", fontSize: "5px", backgroundColor: colors.primary, color: colors.primaryForeground }}>Sign up free</div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Product", "Company", "Legal"].map((col) => (
            <div key={col} style={{ flex: 1 }}>
              <div style={{ fontSize: "5px", fontWeight: 600, color: colors.text, marginBottom: "2px" }}>{col}</div>
              <div style={{ fontSize: "4px", color: colors.textMuted }}>Link 1</div>
              <div style={{ fontSize: "4px", color: colors.textMuted }}>Link 2</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.variant === "fat") {
    return (
      <div style={footerStyle}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
          {["Product", "Company", "Legal", "Social"].map((col) => (
            <div key={col} style={{ flex: 1 }}>
              <div style={{ fontSize: "5px", fontWeight: 600, color: colors.text, marginBottom: "2px" }}>{col}</div>
              <div style={{ fontSize: "4px", color: colors.textMuted }}>Link 1</div>
              <div style={{ fontSize: "4px", color: colors.textMuted }}>Link 2</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: colors.primary }} />
            <span style={{ fontSize: "5px", color: colors.textMuted }}>Newsletter: </span>
            <div style={{ width: "40px", height: "8px", borderRadius: "2px", border: `1px solid ${colors.border}`, backgroundColor: colors.background }} />
          </div>
          <span style={{ fontSize: "4px", color: colors.textMuted }}>2026 Company</span>
        </div>
      </div>
    );
  }

  // multi-column default
  return (
    <div style={footerStyle}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
        {["Product", "Company", "Resources", "Legal"].map((col) => (
          <div key={col} style={{ flex: 1 }}>
            <div style={{ fontSize: "5px", fontWeight: 600, color: colors.text, marginBottom: "2px" }}>{col}</div>
            <div style={{ fontSize: "4px", color: colors.textMuted }}>Link 1</div>
            <div style={{ fontSize: "4px", color: colors.textMuted }}>Link 2</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: "6px" }}>
        <span style={{ fontSize: "4px", color: colors.textMuted }}>2026 Company Inc. All rights reserved.</span>
      </div>
    </div>
  );
}
