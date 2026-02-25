"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { cardStyles, CARD_GROUPS, CARD_META } from "@/data/cards";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode } from "@/lib/types";

// ── Color resolution helpers ────────────────────────────

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

// ── Color resolver for __special keys ───────────────────

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function resolveCardColor(val: string, colors: ColorMode): string {
  if (!val.includes("__")) return val;

  // Replace opacity variants first (more specific patterns before shorter ones)
  let resolved = val
    .replace(/__primary-(\d+)/g, (_, n) => hexToRgba(colors.primary, parseInt(n, 10) / 100))
    .replace(/__accent-(\d+)/g, (_, n) => hexToRgba(colors.accent, parseInt(n, 10) / 100));

  // Replace compound tokens before their shorter prefixes
  resolved = resolved
    .replace(/__primaryForeground/g, colors.primaryForeground)
    .replace(/__secondaryForeground/g, colors.secondaryForeground)
    .replace(/__accentForeground/g, colors.accentForeground)
    .replace(/__textSecondary/g, colors.textSecondary)
    .replace(/__textMuted/g, colors.textMuted)
    .replace(/__surfaceAlt/g, colors.surfaceAlt)
    .replace(/__primary/g, colors.primary)
    .replace(/__secondary/g, colors.secondary)
    .replace(/__accent/g, colors.accent)
    .replace(/__surface/g, colors.surface)
    .replace(/__border/g, colors.border)
    .replace(/__text/g, colors.text);

  return resolved;
}

function resolveCardCSS(
  cssRecord: Record<string, string>,
  colors: ColorMode,
): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    result[key] = resolveCardColor(val, colors);
  }
  return result as unknown as React.CSSProperties;
}

// ── Layout labels ───────────────────────────────────────

const LAYOUT_LABELS: Record<string, string> = {
  vertical: "Vertical",
  horizontal: "Horizontal",
};

// ── Main page ───────────────────────────────────────────

export default function CardsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.cards;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("cards");
    } else {
      select("cards", id);
    }
  }

  return (
    <>
      <TopBar
        title="Cards"
        description="Content containers — flat, elevated, glass, accented, neumorphic, special, and expressive layouts"
        itemCount={cardStyles.length}
      />

      <CatalogGrid columns={3}>
        {CARD_GROUPS.map((group) => {
          const groupItems = cardStyles.filter(
            (item) => CARD_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;

          return [
            <div
              key={`header-${group}`}
              className="col-span-full mt-2 first:mt-0"
            >
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">
                {groupItems.length} style{groupItems.length !== 1 ? "s" : ""}
              </p>
            </div>,

            ...groupItems.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <CardPreviewCard
                  key={item.id}
                  item={item}
                  isSelected={isSelected}
                  colors={colors}
                  onSelect={handleSelect}
                />
              );
            }),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

// ── Card preview card ───────────────────────────────────

function CardPreviewCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof cardStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const { css, hoverCss, hasImage, layout, variant } = item.data;
  const [hovered, setHovered] = useState(false);

  const baseStyle = resolveCardCSS(css, colors);
  const hoverStyle = hoverCss ? resolveCardCSS(hoverCss, colors) : {};
  const resolvedStyle = hovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

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
          style={{
            backgroundColor: colors.background,
            backgroundImage: `radial-gradient(circle at 25% 25%, ${hexToRgba(colors.primary, 0.12)}, transparent 60%), radial-gradient(circle at 75% 75%, ${hexToRgba(colors.accent, 0.1)}, transparent 60%)`,
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* Mini card preview */}
          <div
            style={{ ...resolvedStyle, isolation: "isolate" as const }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {variant === "stacked" && <StackedLayers colors={colors} />}
            {variant === "paper-stack" && <PaperStackLayers colors={colors} />}
            {variant === "card-ribbon" && <RibbonDecoration colors={colors} />}

            {hasImage && layout === "horizontal" ? (
              <HorizontalCardContent colors={colors} />
            ) : hasImage && variant === "full-bleed-image" ? (
              <FullBleedContent colors={colors} />
            ) : hasImage && variant === "image-header" ? (
              <ImageHeaderContent colors={colors} />
            ) : variant === "sectioned" ? (
              <SectionedContent colors={colors} />
            ) : variant === "cutout-window" ? (
              <CutoutWindowContent colors={colors} />
            ) : (
              <StandardCardContent colors={colors} />
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: colors.primary + "14",
              color: colors.primary,
            }}
          >
            {variant}
          </span>
          {layout === "horizontal" && (
            <span
              className="text-[8px] font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: colors.accent + "14",
                color: colors.accent,
              }}
            >
              {LAYOUT_LABELS[layout]}
            </span>
          )}
          {hasImage && (
            <span
              className="text-[8px] font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: colors.semantic.info + "14",
                color: colors.semantic.info,
              }}
            >
              image
            </span>
          )}
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}

// ── Card content variants ───────────────────────────────

function StandardCardContent({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        className="text-[10px] font-semibold"
        style={{ color: colors.text, marginBottom: "4px" }}
      >
        Card Title
      </div>
      <div
        className="text-[8px] leading-relaxed"
        style={{ color: colors.textMuted }}
      >
        Brief description of the card content goes here.
      </div>
    </>
  );
}

function ImageHeaderContent({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        style={{
          height: "48px",
          background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.2)}, ${hexToRgba(colors.accent, 0.2)})`,
        }}
      />
      <div style={{ padding: "10px 12px" }}>
        <div
          className="text-[10px] font-semibold"
          style={{ color: colors.text, marginBottom: "4px" }}
        >
          Card Title
        </div>
        <div className="text-[8px]" style={{ color: colors.textMuted }}>
          Brief description of the card content.
        </div>
      </div>
    </>
  );
}

function FullBleedContent({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        style={{
          height: "80px",
          background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.3)}, ${hexToRgba(colors.accent, 0.3)})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "8px 12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
        }}
      >
        <div
          className="text-[10px] font-semibold"
          style={{ color: "#ffffff" }}
        >
          Card Title
        </div>
        <div className="text-[8px]" style={{ color: "rgba(255,255,255,0.7)" }}>
          Overlaid text
        </div>
      </div>
    </>
  );
}

function HorizontalCardContent({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        style={{
          width: "60px",
          flexShrink: 0,
          background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.2)}, ${hexToRgba(colors.accent, 0.2)})`,
        }}
      />
      <div style={{ padding: "10px 12px", flex: 1 }}>
        <div
          className="text-[10px] font-semibold"
          style={{ color: colors.text, marginBottom: "4px" }}
        >
          Card Title
        </div>
        <div className="text-[8px]" style={{ color: colors.textMuted }}>
          Side-by-side layout.
        </div>
      </div>
    </>
  );
}

function StackedLayers({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "-4px",
          left: "6px",
          right: "6px",
          height: "100%",
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
          opacity: 0.5,
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-8px",
          left: "12px",
          right: "12px",
          height: "100%",
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
          opacity: 0.3,
          zIndex: -2,
        }}
      />
    </>
  );
}

function RibbonDecoration({ colors }: { colors: ColorMode }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "16px",
        width: "20px",
        height: "28px",
        backgroundColor: colors.primary,
        borderRadius: "0 0 4px 4px",
        zIndex: 1,
      }}
    />
  );
}

function PaperStackLayers({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "-3px",
          left: "4px",
          right: "4px",
          height: "100%",
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          opacity: 0.6,
          zIndex: -1,
          transform: "rotate(1.5deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-6px",
          left: "8px",
          right: "8px",
          height: "100%",
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          opacity: 0.35,
          zIndex: -2,
          transform: "rotate(-1deg)",
        }}
      />
    </>
  );
}

function SectionedContent({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        style={{
          padding: "8px 12px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          className="text-[9px] font-semibold uppercase tracking-wide"
          style={{ color: colors.primary }}
        >
          Header
        </div>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div
          className="text-[10px] font-semibold"
          style={{ color: colors.text, marginBottom: "4px" }}
        >
          Card Title
        </div>
        <div className="text-[8px]" style={{ color: colors.textMuted }}>
          Body content goes here.
        </div>
      </div>
      <div
        style={{
          padding: "6px 12px",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div className="text-[8px]" style={{ color: colors.textMuted }}>
          Footer
        </div>
      </div>
    </>
  );
}

function CutoutWindowContent({ colors }: { colors: ColorMode }) {
  return (
    <>
      <div
        className="text-[10px] font-semibold"
        style={{ color: colors.text, marginBottom: "6px" }}
      >
        Card Title
      </div>
      <div
        style={{
          height: "28px",
          margin: "0 -4px",
          borderRadius: "6px",
          border: `1px dashed ${colors.border}`,
          backgroundColor: colors.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-[7px]" style={{ color: colors.textMuted }}>
          window
        </span>
      </div>
      <div
        className="text-[8px] mt-1.5"
        style={{ color: colors.textMuted }}
      >
        Content below the cutout area.
      </div>
    </>
  );
}
