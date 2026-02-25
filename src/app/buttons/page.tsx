"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { buttonStyles, BUTTON_GROUPS, BUTTON_META } from "@/data/buttons";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ButtonColorStrategy, ColorMode } from "@/lib/types";

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

export function resolveButtonColors(
  colors: ColorMode,
  strategy: ButtonColorStrategy
): { bg: string; text: string; border?: string } {
  switch (strategy) {
    case "solid":
      return { bg: colors.primary, text: colors.primaryForeground };
    case "outline":
      return { bg: "transparent", text: colors.primary, border: colors.primary };
    case "ghost":
      return { bg: "transparent", text: colors.primary };
    case "soft":
      return { bg: colors.primary + "18", text: colors.primary };
    case "surface":
      return { bg: colors.surface, text: colors.text, border: colors.border };
    case "gradient":
      return { bg: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, text: colors.primaryForeground };
  }
}

// ── Size definitions ────────────────────────────────────

const SIZES = [
  { key: "sm", label: "S", padding: "4px 10px", fontSize: "11px" },
  { key: "md", label: "M", padding: "6px 14px", fontSize: "12px" },
  { key: "lg", label: "L", padding: "8px 18px", fontSize: "13px" },
] as const;

// ── Strategy / animation labels ─────────────────────────

const STRATEGY_LABELS: Record<ButtonColorStrategy, string> = {
  solid: "Solid",
  outline: "Outline",
  ghost: "Ghost",
  soft: "Soft",
  surface: "Surface",
  gradient: "Gradient",
};

// ── Keyframe animations for animated button styles ──────

/** Map animation name → CSS class name applied to the button span */
const ANIM_CLASS_MAP: Record<string, string> = {
  shimmer: "dk-anim-shimmer",
  "glow-pulse": "dk-anim-glow-pulse",
  spinner: "dk-anim-spinner",
};

/**
 * Injects @keyframes + animation classes into the page.
 * Uses CSS custom properties (--dk-primary-rgb) set on the preview area
 * so animations adapt to the selected palette.
 * Wrapped in prefers-reduced-motion to respect user preferences.
 */
function AnimatedButtonStyles() {
  return (
    <style>{`
      @media (prefers-reduced-motion: no-preference) {
        @keyframes dk-shimmer-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes dk-glow-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(var(--dk-primary-rgb), 0.4); }
          50%      { box-shadow: 0 0 0 6px rgba(var(--dk-primary-rgb), 0.0), 0 0 16px rgba(var(--dk-primary-rgb), 0.2); }
        }

        @keyframes dk-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .dk-anim-shimmer {
          position: relative;
          overflow: hidden;
        }
        .dk-anim-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.25) 50%,
            transparent 60%
          );
          animation: dk-shimmer-sweep 2.5s ease-in-out infinite;
          pointer-events: none;
        }

        .dk-anim-glow-pulse {
          animation: dk-glow-pulse-ring 2s ease-in-out infinite;
        }

        .dk-anim-spinner {
          position: relative;
        }
        .dk-anim-spinner::after {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 6px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: dk-spin 0.7s linear infinite;
          vertical-align: middle;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .dk-anim-shimmer::after,
        .dk-anim-glow-pulse,
        .dk-anim-spinner::after {
          animation: none !important;
        }
        .dk-anim-shimmer::after {
          display: none;
        }
        .dk-anim-spinner::after {
          display: none;
        }
      }
    `}</style>
  );
}

// ── Main page ───────────────────────────────────────────

export default function ButtonsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.buttons;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("buttons");
    } else {
      select("buttons", id);
    }
  }

  // Compute primary RGB for CSS variable (used by keyframe animations)
  const primaryRgb = hexToRgbString(colors.primary);

  return (
    <>
      <AnimatedButtonStyles />
      <TopBar
        title="Buttons"
        description="Button styles and interactions — select one for your design"
        itemCount={buttonStyles.length}
      />

      <CatalogGrid columns={3}>
        {BUTTON_GROUPS.map((group) => {
          const groupItems = buttonStyles.filter(
            (item) => BUTTON_META.find((m) => m.id === item.id)?.group === group
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
                <ButtonCard
                  key={item.id}
                  item={item}
                  isSelected={isSelected}
                  colors={colors}
                  primaryRgb={primaryRgb}
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

// ── Button preview card ─────────────────────────────────

/** Hex to rgba helper for tinted backgrounds */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Hex to "r,g,b" string for CSS custom properties */
function hexToRgbString(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

/**
 * Resolve special __hover* keys from CSS state records into real color values.
 * Keys like __hoverBg: "primary-10" → backgroundColor: rgba(primary, 0.10)
 * Keys like __hoverBg: "primary-solid" → backgroundColor: primary hex
 * Keys like __hoverText: "primaryForeground" → color: primaryForeground hex
 * Keys like __hoverShadow: "glow" → boxShadow with primary glow
 * Keys like __hoverBorderBottom: "primary" → borderBottom color
 * Keys like __defaultBg: "primary-05" → default background tint
 */
function resolveSpecialKeys(
  stateCSS: Record<string, string>,
  colors: ColorMode,
  target: React.CSSProperties
) {
  for (const [key, val] of Object.entries(stateCSS)) {
    if (key === "__hoverBg" || key === "__defaultBg") {
      if (val === "primary-solid") {
        target.backgroundColor = colors.primary;
      } else if (val.startsWith("primary-")) {
        const alpha = parseInt(val.split("-")[1], 10) / 100;
        target.backgroundColor = hexToRgba(colors.primary, alpha);
      }
    } else if (key === "__hoverText") {
      if (val === "primaryForeground") {
        target.color = colors.primaryForeground;
      } else if (val === "primary") {
        target.color = colors.primary;
      }
    } else if (key === "__hoverBorderBottom") {
      target.borderBottomColor = colors.primary;
    } else if (key === "__hoverShadow") {
      if (val === "glow") {
        target.boxShadow = `0 0 14px ${hexToRgba(colors.primary, 0.4)}, 0 0 28px ${hexToRgba(colors.primary, 0.2)}`;
      } else if (val === "glow-tight") {
        target.boxShadow = `0 0 8px ${hexToRgba(colors.primary, 0.5)}, 0 0 16px ${hexToRgba(colors.primary, 0.3)}`;
      } else if (val === "neon") {
        target.boxShadow = `0 0 10px ${hexToRgba(colors.primary, 0.5)}, 0 0 24px ${hexToRgba(colors.primary, 0.3)}, inset 0 0 10px ${hexToRgba(colors.primary, 0.1)}`;
      } else if (val === "neon-tight") {
        target.boxShadow = `0 0 6px ${hexToRgba(colors.primary, 0.6)}, 0 0 14px ${hexToRgba(colors.primary, 0.4)}`;
      } else if (val === "pulse") {
        target.boxShadow = `0 0 0 4px ${hexToRgba(colors.primary, 0.3)}, 0 0 16px ${hexToRgba(colors.primary, 0.2)}`;
      }
    } else if (!key.startsWith("__")) {
      // Regular CSS property — apply as-is
      (target as Record<string, string>)[key] = val;
    }
  }
}

function ButtonCard({
  item,
  isSelected,
  colors,
  primaryRgb,
  onSelect,
}: {
  item: (typeof buttonStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  primaryRgb: string;
  onSelect: (id: string) => void;
}) {
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);
  const [pressedSize, setPressedSize] = useState<string | null>(null);

  const { colorStrategy, css, supportsSizes, animation } = item.data;
  const resolved = resolveButtonColors(colors, colorStrategy);
  const animClass = animation ? ANIM_CLASS_MAP[animation] ?? "" : "";

  function getButtonStyle(
    size: (typeof SIZES)[number],
    isHover: boolean,
    isActive: boolean,
    isDisabled: boolean
  ): React.CSSProperties {
    // Start with structural CSS, filtering out __ keys
    const base: React.CSSProperties = {
      padding: size.padding,
      fontSize: size.fontSize,
      lineHeight: "1.4",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: isDisabled ? "not-allowed" : "pointer",
      fontWeight: 500,
      whiteSpace: "nowrap",
    };

    // Apply structural defaults (non-__ keys)
    for (const [key, val] of Object.entries(css.default)) {
      if (!key.startsWith("__")) {
        (base as Record<string, string>)[key] = val;
      }
    }

    // Apply __default* special keys (like __defaultBg)
    resolveSpecialKeys(css.default, colors, base);

    // Apply color strategy
    if (colorStrategy === "gradient") {
      base.background = resolved.bg;
    } else if (!base.backgroundColor || base.backgroundColor === "transparent") {
      base.backgroundColor = resolved.bg;
    } else if (resolved.bg !== "transparent") {
      base.backgroundColor = resolved.bg;
    }
    base.color = resolved.text;
    if (resolved.border && !css.default.border?.includes("currentColor")) {
      base.borderColor = resolved.border;
      if (css.default.outline) {
        base.outlineColor = resolved.border;
      }
    }

    // State-specific overrides
    if (isDisabled) {
      resolveSpecialKeys(css.disabled, colors, base);
    } else if (isActive) {
      resolveSpecialKeys(css.hover, colors, base);
      resolveSpecialKeys(css.active, colors, base);
    } else if (isHover) {
      resolveSpecialKeys(css.hover, colors, base);
    }

    return base;
  }

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
        {/* Preview area */}
        <div
          className="rounded-lg p-4 flex flex-col gap-3"
          style={{
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
            // CSS variable for keyframe animations to reference
            "--dk-primary-rgb": primaryRgb,
          } as React.CSSProperties}
        >
          {/* Default vs Hover comparison */}
          <div className="flex items-center gap-3 justify-center">
            <div className="flex flex-col items-center gap-1">
              <span className={animClass || undefined} style={getButtonStyle(SIZES[1], false, false, false)}>
                Default
              </span>
              <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>rest</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={animClass || undefined} style={getButtonStyle(SIZES[1], true, false, false)}>
                Hover
              </span>
              <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>hover</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={animClass || undefined} style={getButtonStyle(SIZES[1], false, true, false)}>
                Press
              </span>
              <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>active</span>
            </div>
          </div>

          {/* Interactive row: sizes + shapes */}
          <div className="flex items-center gap-1.5 justify-center flex-wrap">
            {(supportsSizes ? SIZES : [SIZES[1]]).map((size) => {
              const isHover = hoveredSize === `${item.id}-${size.key}`;
              const isActive = pressedSize === `${item.id}-${size.key}`;

              return (
                <span
                  key={size.key}
                  className={animClass || undefined}
                  style={getButtonStyle(size, isHover, isActive, false)}
                  onMouseEnter={() => setHoveredSize(`${item.id}-${size.key}`)}
                  onMouseLeave={() => { setHoveredSize(null); setPressedSize(null); }}
                  onMouseDown={(e) => { e.stopPropagation(); setPressedSize(`${item.id}-${size.key}`); }}
                  onMouseUp={() => setPressedSize(null)}
                >
                  {supportsSizes ? size.label : "Button"}
                </span>
              );
            })}
            {/* Pill shape */}
            <span
              style={{
                ...getButtonStyle(SIZES[0], false, false, false),
                borderRadius: "9999px",
              }}
            >
              Pill
            </span>
            {/* Disabled */}
            <span style={getButtonStyle(SIZES[0], false, false, true)}>
              Off
            </span>
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
            {STRATEGY_LABELS[colorStrategy]}
          </span>
          {animation && (
            <span
              className="text-[8px] font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: colors.accent + "14",
                color: colors.accent,
              }}
            >
              {animation}
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
