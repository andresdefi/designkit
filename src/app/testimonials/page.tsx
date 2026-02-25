"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { testimonialStyles, TESTIMONIAL_GROUPS, TESTIMONIAL_META } from "@/data/testimonials";
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

export default function TestimonialsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.testimonials;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("testimonials");
    else select("testimonials", id);
  }

  return (
    <>
      <TopBar
        title="Testimonials"
        description="Quote styles, review cards, and social proof layouts"
        itemCount={testimonialStyles.length}
      />
      <CatalogGrid columns={3}>
        {TESTIMONIAL_GROUPS.map((group) => {
          const groupItems = testimonialStyles.filter(
            (item) => TESTIMONIAL_META.find((m) => m.id === item.id)?.group === group
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
              <TestimonialPreviewCard
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

function TestimonialPreviewCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof testimonialStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const { css, quoteCss, hasAvatar, hasRating, hasMedia, layout } = item.data;
  const containerStyle = resolveCSS(css, colors);
  const quoteStyle = quoteCss ? resolveCSS(quoteCss, colors) : undefined;

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
          <div style={{ ...containerStyle, padding: containerStyle.padding ?? "12px" }}>
            {hasMedia && (
              <div style={{
                height: "48px", background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.2)}, ${hexToRgba(colors.accent, 0.2)})`,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="1.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            )}
            {layout === "pull-quote" && (
              <div style={{ fontSize: "28px", lineHeight: "1", color: colors.primary, opacity: 0.3, marginBottom: "4px" }}>&ldquo;</div>
            )}
            {hasRating && (
              <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="10" height="10" viewBox="0 0 24 24" fill={colors.semantic.warning} stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            )}
            <div style={{ ...quoteStyle, fontSize: layout === "pull-quote" ? "12px" : "10px" }}>
              &ldquo;This product changed everything for our team. Highly recommended.&rdquo;
            </div>
            {hasAvatar && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "9999px", backgroundColor: colors.primary + "20", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "9px", fontWeight: 600, color: colors.text }}>Jane Cooper</div>
                  <div style={{ fontSize: "8px", color: colors.textMuted }}>CEO, Acme Inc.</div>
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
            {layout}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
