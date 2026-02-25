"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { pricingStyles, PRICING_GROUPS, PRICING_META } from "@/data/pricing";
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

export default function PricingPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.pricing;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("pricing");
    else select("pricing", id);
  }

  return (
    <>
      <TopBar
        title="Pricing"
        description="Pricing card and table layouts for subscription and billing pages"
        itemCount={pricingStyles.length}
      />
      <CatalogGrid columns={3}>
        {PRICING_GROUPS.map((group) => {
          const groupItems = pricingStyles.filter(
            (item) => PRICING_META.find((m) => m.id === item.id)?.group === group
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
              <PricingPreviewCard
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

function PricingPreviewCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof pricingStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const { css, headerCss, priceCss, isFeatured, hasToggle, hasTrialBadge, variant } = item.data;
  const containerStyle = resolveCSS(css, colors);
  const headerStyle = headerCss ? resolveCSS(headerCss, colors) : undefined;
  const priceStyle = priceCss ? resolveCSS(priceCss, colors) : undefined;

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
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}
        >
          <div style={{ ...containerStyle, padding: undefined }}>
            {isFeatured && variant === "featured" && (
              <div style={{
                position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                backgroundColor: colors.primary, color: colors.primaryForeground,
                fontSize: "8px", fontWeight: 600, padding: "2px 10px", borderRadius: "0 0 6px 6px",
              }}>
                Popular
              </div>
            )}
            {hasTrialBadge && (
              <div style={{
                position: "absolute", top: "8px", right: "8px",
                backgroundColor: colors.semantic.success + "18", color: colors.semantic.success,
                fontSize: "8px", fontWeight: 600, padding: "2px 6px", borderRadius: "9999px",
              }}>
                14-day trial
              </div>
            )}
            {headerStyle && variant === "gradient-header" ? (
              <>
                <div style={{ ...headerStyle, fontSize: "12px", padding: "12px" }}>Pro Plan</div>
                <div style={{ padding: "12px", textAlign: "center" as const }}>
                  <div style={{ ...priceStyle, fontSize: "22px" }}>$29<span style={{ fontSize: "10px", color: colors.textMuted }}>/mo</span></div>
                  <div style={{ fontSize: "9px", color: colors.textMuted, marginTop: "4px" }}>Billed monthly</div>
                </div>
              </>
            ) : (
              <div style={{ padding: "12px", textAlign: item.data.layout === "horizontal" ? ("left" as const) : ("center" as const) }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: colors.text, marginBottom: "4px" }}>Pro Plan</div>
                {hasToggle && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "8px", color: colors.textMuted }}>Monthly</span>
                    <div style={{ width: "20px", height: "12px", borderRadius: "9999px", backgroundColor: colors.primary, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "2px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#fff" }} />
                    </div>
                    <span style={{ fontSize: "8px", color: colors.text, fontWeight: 600 }}>Annual</span>
                  </div>
                )}
                <div style={{ ...priceStyle, fontSize: "22px" }}>$29<span style={{ fontSize: "10px", color: colors.textMuted }}>/mo</span></div>
                <div style={{ fontSize: "9px", color: colors.textMuted, marginTop: "4px" }}>Everything you need</div>
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
            {item.data.layout}
          </span>
          {isFeatured && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded"
              style={{ backgroundColor: colors.accent + "14", color: colors.accent }}>
              featured
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
