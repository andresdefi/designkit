"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { inputStyles, INPUT_GROUPS, INPUT_META } from "@/data/inputs";
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

function resolveInputColor(val: string, colors: ColorMode): string {
  if (val === "__primary") return colors.primary;
  if (val === "__error") return colors.semantic.error;
  if (val === "__surface") return colors.surface;
  if (val === "__border") return colors.border;
  if (val === "__text") return colors.text;
  if (val === "__textMuted") return colors.textMuted;
  if (val === "__primaryForeground") return colors.primaryForeground;

  // Pattern: __primary-20 → rgba(primary, 0.20)
  const primaryMatch = val.match(/^__primary-(\d+)$/);
  if (primaryMatch) {
    return hexToRgba(colors.primary, parseInt(primaryMatch[1], 10) / 100);
  }
  const errorMatch = val.match(/^__error-(\d+)$/);
  if (errorMatch) {
    return hexToRgba(colors.semantic.error, parseInt(errorMatch[1], 10) / 100);
  }

  return val;
}

function resolveInputCSS(
  stateCSS: Record<string, string>,
  colors: ColorMode,
): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(stateCSS)) {
    if (key.startsWith("__")) continue; // skip internal meta keys
    result[key] = resolveInputColor(val, colors);
  }
  return result as unknown as React.CSSProperties;
}

// ── Subtype labels ──────────────────────────────────────

const SUBTYPE_LABELS: Record<string, string> = {
  text: "Text",
  select: "Select",
  checkbox: "Checkbox",
  radio: "Radio",
  toggle: "Toggle",
  search: "Search",
  slider: "Slider",
  textarea: "Textarea",
};

// ── Main page ───────────────────────────────────────────

export default function InputsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.inputs;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("inputs");
    } else {
      select("inputs", id);
    }
  }

  return (
    <>
      <TopBar
        title="Inputs & Form Elements"
        description="Text fields, selects, checkboxes, radios, search bars, sliders, and textareas"
        itemCount={inputStyles.length}
      />

      <CatalogGrid columns={3}>
        {INPUT_GROUPS.map((group) => {
          const groupItems = inputStyles.filter(
            (item) => INPUT_META.find((m) => m.id === item.id)?.group === group
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
                <InputCard
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

// ── Input preview card ──────────────────────────────────

function InputCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof inputStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const { css, subtype, variant, hasFloatingLabel } = item.data;

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
            border: `1px solid ${colors.border}`,
          }}
        >
          {(subtype === "text" || subtype === "textarea" || subtype === "search" || subtype === "select") && (
            <TextLikePreview css={css} colors={colors} subtype={subtype} hasFloatingLabel={hasFloatingLabel} variant={variant} />
          )}
          {(subtype === "checkbox" || subtype === "toggle") && (
            <CheckboxPreview css={css} colors={colors} subtype={subtype} variant={variant} />
          )}
          {subtype === "radio" && (
            <RadioPreview css={css} colors={colors} variant={variant} />
          )}
          {subtype === "slider" && (
            <SliderPreview css={css} colors={colors} variant={variant} />
          )}
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
            {SUBTYPE_LABELS[subtype] ?? subtype}
          </span>
          {hasFloatingLabel && (
            <span
              className="text-[8px] font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: colors.accent + "14",
                color: colors.accent,
              }}
            >
              float
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

// ── Preview renderers per subtype ───────────────────────

/** Text inputs, textareas, search, select — show 5 states side by side */
function TextLikePreview({
  css,
  colors,
  subtype,
  hasFloatingLabel,
  variant,
}: {
  css: (typeof inputStyles)[number]["data"]["css"];
  colors: ColorMode;
  subtype: string;
  hasFloatingLabel: boolean;
  variant: string;
}) {
  const states = [
    { label: "default", stateCSS: css.default },
    { label: "focus", stateCSS: { ...css.default, ...css.focus } },
    { label: "filled", stateCSS: { ...css.default, ...css.filled } },
    { label: "error", stateCSS: { ...css.default, ...css.error } },
    { label: "disabled", stateCSS: { ...css.default, ...css.disabled } },
  ];

  const isTextarea = subtype === "textarea";
  const isSearch = subtype === "search";
  const isSelect = subtype === "select";
  const isExpanding = variant === "expanding";

  return (
    <div className="flex flex-col gap-2.5">
      {states.map((state) => {
        const style = resolveInputCSS(state.stateCSS, colors);
        const isWide = !isExpanding || state.label === "focus";

        return (
          <div key={state.label} className="flex items-start gap-2">
            <span
              className="text-[7px] font-mono w-[38px] shrink-0 pt-2 text-right"
              style={{ color: colors.textMuted }}
            >
              {state.label}
            </span>
            <div className="flex-1 relative">
              {isSearch && (
                <svg
                  className="absolute left-2.5 top-1/2 -translate-y-1/2"
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke={state.label === "error" ? colors.semantic.error : colors.textMuted}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              )}
              {isSelect && (
                <svg
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
              {hasFloatingLabel && (
                <span
                  className="absolute text-[7px] pointer-events-none"
                  style={{
                    color: state.label === "focus" ? colors.primary : colors.textMuted,
                    left: "12px",
                    top: state.label === "default" ? "10px" : "4px",
                    fontSize: state.label === "default" ? "9px" : "7px",
                    transition: "all 200ms ease",
                  }}
                >
                  Label
                </span>
              )}
              {isTextarea ? (
                <div
                  className="w-full text-[10px] outline-none"
                  style={{
                    ...style,
                    color: state.label === "disabled" ? colors.textMuted : colors.text,
                    minHeight: "44px",
                    maxHeight: "44px",
                    ...(isWide ? {} : { width: "60%" }),
                  }}
                >
                  {state.label === "filled" || state.label === "error" ? "Some text content..." : ""}
                </div>
              ) : (
                <div
                  className="w-full text-[10px] outline-none truncate"
                  style={{
                    ...style,
                    color: state.label === "disabled" ? colors.textMuted : (state.label === "filled" || state.label === "error" ? colors.text : colors.textMuted),
                    lineHeight: "1.4",
                    display: "block",
                    ...(isWide ? {} : { width: "60%" }),
                  }}
                >
                  {state.label === "filled" || state.label === "error"
                    ? (isSelect ? "Option 1" : "user@example.com")
                    : (hasFloatingLabel && state.label === "default" ? "" : (isSelect ? "Choose..." : "Placeholder..."))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Checkbox / toggle — show checked vs unchecked side by side */
function CheckboxPreview({
  css,
  colors,
  subtype,
  variant,
}: {
  css: (typeof inputStyles)[number]["data"]["css"];
  colors: ColorMode;
  subtype: string;
  variant: string;
}) {
  const isToggle = subtype === "toggle";
  const uncheckedStyle = resolveInputCSS(css.default, colors);
  const checkedStyle = resolveInputCSS({ ...css.default, ...css.filled }, colors);
  const disabledStyle = resolveInputCSS({ ...css.default, ...css.disabled }, colors);

  if (isToggle) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 justify-center">
          {/* Off */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative" style={{ ...uncheckedStyle, display: "flex", alignItems: "center" }}>
              <div
                className="rounded-full bg-white shadow-sm"
                style={{
                  width: variant === "toggle-ios" ? "20px" : "16px",
                  height: variant === "toggle-ios" ? "20px" : "16px",
                  transition: "transform 200ms ease",
                }}
              />
            </div>
            <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>off</span>
          </div>
          {/* On */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative" style={{ ...checkedStyle, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <div
                className="rounded-full bg-white shadow-sm"
                style={{
                  width: variant === "toggle-ios" ? "20px" : "16px",
                  height: variant === "toggle-ios" ? "20px" : "16px",
                  transition: "transform 200ms ease",
                  ...(variant === "toggle-android" ? { boxShadow: "0 1px 3px rgba(0,0,0,0.3)" } : {}),
                }}
              />
            </div>
            <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>on</span>
          </div>
          {/* Disabled */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative" style={{ ...disabledStyle, display: "flex", alignItems: "center" }}>
              <div
                className="rounded-full bg-white/50 shadow-sm"
                style={{
                  width: variant === "toggle-ios" ? "20px" : "16px",
                  height: variant === "toggle-ios" ? "20px" : "16px",
                }}
              />
            </div>
            <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>off</span>
          </div>
        </div>
      </div>
    );
  }

  // Checkbox
  return (
    <div className="flex items-center gap-4 justify-center py-2">
      {/* Unchecked */}
      <div className="flex flex-col items-center gap-1">
        <div style={uncheckedStyle} />
        <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>off</span>
      </div>
      {/* Checked */}
      <div className="flex flex-col items-center gap-1">
        <div style={checkedStyle} className="flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>on</span>
      </div>
      {/* Disabled */}
      <div className="flex flex-col items-center gap-1">
        <div style={disabledStyle} />
        <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>off</span>
      </div>
    </div>
  );
}

/** Radio — show selected/unselected states */
function RadioPreview({
  css,
  colors,
  variant,
}: {
  css: (typeof inputStyles)[number]["data"]["css"];
  colors: ColorMode;
  variant: string;
}) {
  const defaultStyle = resolveInputCSS(css.default, colors);
  const selectedStyle = resolveInputCSS({ ...css.default, ...css.filled }, colors);
  const disabledStyle = resolveInputCSS({ ...css.default, ...css.disabled }, colors);

  if (variant === "segmented") {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="flex" style={{ border: `1px solid ${colors.border}`, borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ ...selectedStyle, borderRadius: "0", border: "none" }} className="text-[9px] font-medium">
            Daily
          </div>
          <div style={{ ...defaultStyle, borderRadius: "0", border: "none", borderLeft: `1px solid ${colors.border}`, color: colors.text }} className="text-[9px]">
            Weekly
          </div>
          <div style={{ ...defaultStyle, borderRadius: "0", border: "none", borderLeft: `1px solid ${colors.border}`, color: colors.text }} className="text-[9px]">
            Monthly
          </div>
        </div>
      </div>
    );
  }

  if (variant === "chip") {
    return (
      <div className="flex items-center gap-2 justify-center py-2 flex-wrap">
        <div style={selectedStyle} className="text-[9px] font-medium">React</div>
        <div style={{ ...defaultStyle, color: colors.text }} className="text-[9px]">Vue</div>
        <div style={{ ...defaultStyle, color: colors.text }} className="text-[9px]">Svelte</div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="flex flex-col gap-2 py-1">
        <div style={selectedStyle} className="text-[9px] font-medium flex items-center gap-2">
          <div style={{ width: "10px", height: "10px", borderRadius: "9999px", border: `4px solid ${colors.primary}`, backgroundColor: "transparent" }} />
          <span style={{ color: colors.text }}>Pro Plan</span>
        </div>
        <div style={{ ...defaultStyle, color: colors.text }} className="text-[9px] flex items-center gap-2">
          <div style={{ width: "10px", height: "10px", borderRadius: "9999px", border: `2px solid ${colors.border}`, backgroundColor: "transparent" }} />
          <span>Free Plan</span>
        </div>
      </div>
    );
  }

  // Standard / filled radio
  return (
    <div className="flex items-center gap-4 justify-center py-2">
      {/* Unselected */}
      <div className="flex flex-col items-center gap-1">
        <div style={defaultStyle} />
        <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>off</span>
      </div>
      {/* Selected */}
      <div className="flex flex-col items-center gap-1">
        <div style={selectedStyle} />
        <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>on</span>
      </div>
      {/* Disabled */}
      <div className="flex flex-col items-center gap-1">
        <div style={disabledStyle} />
        <span className="text-[7px] font-mono" style={{ color: colors.textMuted }}>off</span>
      </div>
    </div>
  );
}

/** Slider — visual slider bar at different positions */
function SliderPreview({
  css,
  colors,
  variant,
}: {
  css: (typeof inputStyles)[number]["data"]["css"];
  colors: ColorMode;
  variant: string;
}) {
  const trackHeight = css.default.height ?? "4px";
  const trackRadius = css.default.borderRadius ?? "2px";
  const trackBg = resolveInputColor(css.default.backgroundColor ?? "__border", colors);
  const fillBg = resolveInputColor(css.default.__trackFillBg ?? "__primary", colors);
  const thumbBg = resolveInputColor(css.default.__thumbBg ?? "__primary", colors);
  const thumbSize = css.default.__thumbSize ?? "16px";
  const showSteps = variant === "stepped";
  const showLabel = variant === "labeled";

  const positions = [30, 65, 85];

  return (
    <div className="flex flex-col gap-4 py-3 px-2">
      {positions.map((pos) => (
        <div key={pos} className="relative flex items-center">
          <span
            className="text-[7px] font-mono w-[24px] shrink-0 text-right mr-2"
            style={{ color: colors.textMuted }}
          >
            {pos}%
          </span>
          <div className="flex-1 relative flex items-center" style={{ height: thumbSize }}>
            {/* Track background */}
            <div
              className="w-full absolute"
              style={{
                height: trackHeight,
                borderRadius: trackRadius,
                backgroundColor: trackBg,
              }}
            />
            {/* Track fill */}
            <div
              className="absolute left-0"
              style={{
                height: trackHeight,
                borderRadius: trackRadius,
                backgroundColor: fillBg,
                width: `${pos}%`,
              }}
            />
            {/* Step marks */}
            {showSteps && (
              <>
                {[0, 25, 50, 75, 100].map((step) => (
                  <div
                    key={step}
                    className="absolute"
                    style={{
                      left: `${step}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "9999px",
                      backgroundColor: step <= pos ? fillBg : trackBg,
                      border: `1px solid ${step <= pos ? fillBg : colors.border}`,
                    }}
                  />
                ))}
              </>
            )}
            {/* Thumb */}
            <div
              className="absolute"
              style={{
                left: `${pos}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: thumbSize,
                height: thumbSize,
                borderRadius: "9999px",
                backgroundColor: thumbBg,
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
            {/* Label tooltip */}
            {showLabel && (
              <div
                className="absolute text-[7px] font-mono font-medium"
                style={{
                  left: `${pos}%`,
                  top: "-16px",
                  transform: "translateX(-50%)",
                  backgroundColor: thumbBg,
                  color: colors.primaryForeground,
                  padding: "1px 4px",
                  borderRadius: "4px",
                }}
              >
                {pos}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
