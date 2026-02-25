"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { onboardingStyles, ONBOARDING_GROUPS, ONBOARDING_META } from "@/data/onboarding";
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

export default function OnboardingPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.onboarding;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("onboarding");
    else select("onboarding", id);
  }

  return (
    <>
      <TopBar
        title="Onboarding"
        description="First-run and tutorial flow patterns"
        itemCount={onboardingStyles.length}
      />
      <CatalogGrid columns={3}>
        {ONBOARDING_GROUPS.map((group) => {
          const groupItems = onboardingStyles.filter(
            (item) => ONBOARDING_META.find((m) => m.id === item.id)?.group === group
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
              <OnboardingCard
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

function OnboardingCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof onboardingStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;

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
          className="rounded-lg overflow-hidden flex flex-col"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "200px" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 shrink-0" style={{ height: "14px", backgroundColor: colors.surface }}>
            <div style={{ width: "14px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.4 }} />
            <div className="flex gap-1">
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px", overflow: "hidden" }}>
            {/* Step indicator at top — for stepped/carousel */}
            {d.hasStepIndicator && d.layout !== "checklist" && (
              <div style={{ display: "flex", gap: "4px", marginBottom: "10px", justifyContent: d.layout === "carousel" ? "center" : "flex-start" }}>
                {d.layout === "carousel" ? (
                  /* Dots */
                  Array.from({ length: d.stepCount }).map((_, i) => (
                    <div key={i} style={{
                      width: i === 0 ? "12px" : "5px", height: "5px",
                      borderRadius: "9999px",
                      backgroundColor: i === 0 ? colors.primary : hexToRgba(colors.textMuted, 0.25),
                    }} />
                  ))
                ) : (
                  /* Progress bar segments */
                  Array.from({ length: d.stepCount }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: "3px", borderRadius: "1.5px",
                      backgroundColor: i === 0 ? colors.primary : hexToRgba(colors.textMuted, 0.15),
                    }} />
                  ))
                )}
              </div>
            )}

            {/* Illustration placeholder — for carousel/welcome/cards */}
            {d.hasIllustration && d.layout !== "cards" && (
              <div style={{
                width: "100%", height: "60px",
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.12)}, ${hexToRgba(colors.accent, 0.12)})`,
                border: `1px solid ${hexToRgba(colors.primary, 0.08)}`,
                marginBottom: "10px", flexShrink: 0,
              }} />
            )}

            {/* Title + subtitle */}
            {d.layout !== "checklist" && d.layout !== "cards" && d.layout !== "tooltip" && (
              <div style={{ textAlign: d.layout === "carousel" || d.layout === "single-page" ? "center" : "left" as const }}>
                <div style={{ width: d.layout === "carousel" ? "80px" : "90px", height: "5px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.25, marginBottom: "5px", ...(d.layout === "carousel" || d.layout === "single-page" ? { margin: "0 auto 5px" } : {}) }} />
                <div style={{ width: d.layout === "carousel" ? "110px" : "70px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2, ...(d.layout === "carousel" || d.layout === "single-page" ? { margin: "0 auto" } : {}) }} />
              </div>
            )}

            {/* Checklist items */}
            {d.layout === "checklist" && (
              <>
                {d.hasStepIndicator && (
                  <div style={{ height: "3px", borderRadius: "1.5px", backgroundColor: hexToRgba(colors.primary, 0.12), marginBottom: "8px", position: "relative", overflow: "hidden" }}>
                    <div style={{ width: "40%", height: "100%", borderRadius: "1.5px", backgroundColor: colors.primary }} />
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {Array.from({ length: Math.min(d.stepCount, 4) }).map((_, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "5px 8px", borderRadius: "4px",
                      backgroundColor: i === 0 ? hexToRgba(colors.primary, 0.06) : "transparent",
                      border: `1px solid ${i === 0 ? hexToRgba(colors.primary, 0.15) : hexToRgba(colors.border, 0.5)}`,
                    }}>
                      <div style={{
                        width: "12px", height: "12px", borderRadius: "3px",
                        backgroundColor: i === 0 ? colors.primary : "transparent",
                        border: i === 0 ? "none" : `1.5px solid ${colors.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        {i === 0 && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={colors.primaryForeground} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      <div style={{
                        width: `${70 - i * 10}px`, height: "4px", borderRadius: "2px",
                        backgroundColor: i === 0 ? colors.textMuted : colors.text,
                        opacity: i === 0 ? 0.3 : 0.2,
                        textDecoration: i === 0 ? "line-through" : "none",
                      }} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Benefit cards */}
            {d.layout === "cards" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {Array.from({ length: Math.min(d.stepCount, 3) }).map((_, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px", borderRadius: "6px",
                    backgroundColor: colors.surface, border: `1px solid ${hexToRgba(colors.border, 0.5)}`,
                  }}>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "6px",
                      background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.15)}, ${hexToRgba(colors.accent, 0.15)})`,
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ width: "50px", height: "4px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.2, marginBottom: "3px" }} />
                      <div style={{ width: "70px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tooltip tour */}
            {d.layout === "tooltip" && (
              <div style={{ flex: 1, position: "relative" }}>
                {/* Fake UI elements */}
                <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                  <div style={{ width: "40px", height: "16px", borderRadius: "4px", backgroundColor: colors.surface, border: `1px solid ${colors.border}` }} />
                  <div style={{ width: "40px", height: "16px", borderRadius: "4px", backgroundColor: colors.surface, border: `1px solid ${colors.border}` }} />
                </div>
                <div style={{ width: "100%", height: "40px", borderRadius: "4px", backgroundColor: colors.surface, border: `1px solid ${colors.border}`, marginBottom: "8px" }} />
                {/* Tooltip */}
                <div style={{
                  position: "absolute", top: "4px", left: "50px",
                  padding: "6px 8px", borderRadius: "6px",
                  backgroundColor: colors.text, color: colors.background,
                  fontSize: "7px", maxWidth: "80px",
                  boxShadow: `0 2px 8px ${hexToRgba(colors.text, 0.15)}`,
                }}>
                  <div style={{ width: "50px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.background, opacity: 0.4, marginBottom: "2px" }} />
                  <div style={{ width: "35px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.background, opacity: 0.25 }} />
                  <div style={{
                    position: "absolute", bottom: "-3px", left: "12px",
                    width: "6px", height: "6px", backgroundColor: colors.text,
                    transform: "rotate(45deg)",
                  }} />
                </div>
              </div>
            )}

            {/* Video intro */}
            {d.layout === "video" && (
              <div className="flex flex-col items-center justify-center" style={{ flex: 1, gap: "8px" }}>
                <div style={{
                  width: "100%", height: "70px", borderRadius: "8px",
                  background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.1)}, ${hexToRgba(colors.accent, 0.1)})`,
                  border: `1px solid ${hexToRgba(colors.border, 0.5)}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "9999px",
                    backgroundColor: hexToRgba(colors.primary, 0.2),
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={colors.primary} stroke="none">
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                  </div>
                </div>
                <div style={{ width: "60px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
              </div>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Bottom CTA / Skip area */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
              {d.hasSkipButton && (
                <div style={{ width: "24px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.2 }} />
              )}
              <div style={{
                width: d.hasSkipButton ? "48px" : "100%", height: "14px", borderRadius: "4px",
                backgroundColor: colors.primary,
                marginLeft: d.hasSkipButton ? "auto" : undefined,
              }} />
            </div>
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
            {d.layout}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
