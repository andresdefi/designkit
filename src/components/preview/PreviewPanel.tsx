"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useDesignKit } from "@/lib/store";
import { colorPalettes } from "@/data/colors";
import { getTypographyItems, getFontUrlsForPairing } from "@/data/typography";
import { spacingSystems } from "@/data/spacing";
import { radiusSystems } from "@/data/radius";
import { shadowSystems } from "@/data/shadows";
import { buttonStyles } from "@/data/buttons";
import { inputStyles } from "@/data/inputs";
import { cardStyles } from "@/data/cards";
import { navigationStyles } from "@/data/navigation";
import { heroStyles } from "@/data/heroes";
import { footerStyles } from "@/data/footers";
import { badgeStyles } from "@/data/badges";
import { avatarStyles } from "@/data/avatars";
import { listStyles } from "@/data/lists";
import { tableStyles } from "@/data/tables";
import { pricingStyles } from "@/data/pricing";
import { testimonialStyles } from "@/data/testimonials";
import { statStyles } from "@/data/stats";
import { dividerStyles } from "@/data/dividers";
import { imageStyles } from "@/data/images";
import { emptyStateStyles } from "@/data/empty-states";
import { loadingStyles } from "@/data/loading";
import { onboardingStyles } from "@/data/onboarding";
import { errorStyles } from "@/data/errors";
import { successStyles } from "@/data/success";
import { notificationStyles } from "@/data/notifications";
import { buttonAnimationStyles } from "@/data/button-animations";
import { hoverAnimationStyles } from "@/data/hover-animations";
import { pageTransitionStyles } from "@/data/page-transitions";
import { microInteractionStyles } from "@/data/micro-interactions";
import { entranceAnimationStyles } from "@/data/entrance-animations";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import type { ColorMode, TypographyData, TypeStep, SpacingData, RadiusData, ShadowData, ButtonStyleData, ButtonColorStrategy, InputStyleData, CardStyleData, NavigationStyleData, HeroStyleData, FooterStyleData, BadgeStyleData, AvatarStyleData, StatStyleData, DividerStyleData, TableStyleData, EmptyStateStyleData, LoadingStyleData, OnboardingStyleData, ErrorStyleData, SuccessStyleData, NotificationStyleData, AnimationData } from "@/lib/types";
import type { DeviceFrame } from "@/lib/store";

/**
 * Resolves the user's current color selections into a full ColorMode object.
 * Uses colorPicks first, falls back to the selected palette, then to defaults.
 */
function useResolvedColors(): ColorMode | null {
  const { colorPicks, colorMode, selections } = useDesignKit();
  const mode = colorMode as "light" | "dark";
  const picks = colorPicks[mode];

  const palette = colorPalettes.find((p) => p.id === selections.colors);
  const base = palette?.data[mode];

  const hasAnyPicks = Object.keys(picks).length > 0;
  if (!hasAnyPicks && !base) return null;

  const get = (key: string) => picks[key] ?? (base ? (base as unknown as Record<string, string>)[key] : undefined);
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

function useResolvedTypography(): TypographyData | null {
  const { selections, typeScale } = useDesignKit();
  const typoId = selections.typography;

  return useMemo(() => {
    if (!typoId) return null;
    const items = getTypographyItems(typeScale);
    return items.find((i) => i.id === typoId)?.data ?? null;
  }, [typoId, typeScale]);
}

function useResolvedSpacing(): SpacingData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.spacing) return null;
    return spacingSystems.find((s) => s.id === selections.spacing)?.data ?? null;
  }, [selections.spacing]);
}

function useResolvedRadius(): RadiusData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.radius) return null;
    return radiusSystems.find((r) => r.id === selections.radius)?.data ?? null;
  }, [selections.radius]);
}

function useResolvedShadows(): ShadowData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.shadows) return null;
    return shadowSystems.find((s) => s.id === selections.shadows)?.data ?? null;
  }, [selections.shadows]);
}

function useResolvedButtonStyle(): ButtonStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.buttons) return null;
    return buttonStyles.find((b) => b.id === selections.buttons)?.data ?? null;
  }, [selections.buttons]);
}

function useResolvedInputStyle(): InputStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.inputs) return null;
    return inputStyles.find((i) => i.id === selections.inputs)?.data ?? null;
  }, [selections.inputs]);
}

function useResolvedCardStyle(): CardStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.cards) return null;
    return cardStyles.find((c) => c.id === selections.cards)?.data ?? null;
  }, [selections.cards]);
}

function useResolvedNavigationStyle(): NavigationStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.navigation) return null;
    return navigationStyles.find((n) => n.id === selections.navigation)?.data ?? null;
  }, [selections.navigation]);
}

function useResolvedHeroStyle(): HeroStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.heroes) return null;
    return heroStyles.find((h) => h.id === selections.heroes)?.data ?? null;
  }, [selections.heroes]);
}

function useResolvedFooterStyle(): FooterStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.footers) return null;
    return footerStyles.find((f) => f.id === selections.footers)?.data ?? null;
  }, [selections.footers]);
}

function useResolvedBadgeStyle(): BadgeStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.badges) return null;
    return badgeStyles.find((b) => b.id === selections.badges)?.data ?? null;
  }, [selections.badges]);
}

function useResolvedAvatarStyle(): AvatarStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.avatars) return null;
    return avatarStyles.find((a) => a.id === selections.avatars)?.data ?? null;
  }, [selections.avatars]);
}

function useResolvedStatStyle(): StatStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.stats) return null;
    return statStyles.find((s) => s.id === selections.stats)?.data ?? null;
  }, [selections.stats]);
}

function useResolvedDividerStyle(): DividerStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.dividers) return null;
    return dividerStyles.find((d) => d.id === selections.dividers)?.data ?? null;
  }, [selections.dividers]);
}

function useResolvedListStyle() {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.lists) return null;
    return listStyles.find((l) => l.id === selections.lists)?.data ?? null;
  }, [selections.lists]);
}

function useResolvedTableStyle() {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.tables) return null;
    return tableStyles.find((t) => t.id === selections.tables)?.data ?? null;
  }, [selections.tables]);
}

function useResolvedPricingStyle() {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.pricing) return null;
    return pricingStyles.find((p) => p.id === selections.pricing)?.data ?? null;
  }, [selections.pricing]);
}

function useResolvedTestimonialStyle() {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.testimonials) return null;
    return testimonialStyles.find((t) => t.id === selections.testimonials)?.data ?? null;
  }, [selections.testimonials]);
}

function useResolvedImageStyle() {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.images) return null;
    return imageStyles.find((i) => i.id === selections.images)?.data ?? null;
  }, [selections.images]);
}

function useResolvedEmptyStatePattern(): EmptyStateStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections["empty-states"]) return null;
    return emptyStateStyles.find((e) => e.id === selections["empty-states"])?.data ?? null;
  }, [selections["empty-states"]]);
}

function useResolvedLoadingPattern(): LoadingStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.loading) return null;
    return loadingStyles.find((l) => l.id === selections.loading)?.data ?? null;
  }, [selections.loading]);
}

function useResolvedOnboardingPattern(): OnboardingStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.onboarding) return null;
    return onboardingStyles.find((o) => o.id === selections.onboarding)?.data ?? null;
  }, [selections.onboarding]);
}

function useResolvedErrorPattern(): ErrorStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.errors) return null;
    return errorStyles.find((e) => e.id === selections.errors)?.data ?? null;
  }, [selections.errors]);
}

function useResolvedSuccessPattern(): SuccessStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.success) return null;
    return successStyles.find((s) => s.id === selections.success)?.data ?? null;
  }, [selections.success]);
}

function useResolvedNotificationPattern(): NotificationStyleData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections.notifications) return null;
    return notificationStyles.find((n) => n.id === selections.notifications)?.data ?? null;
  }, [selections.notifications]);
}

function useResolvedButtonAnimation(): AnimationData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections["button-animations"]) return null;
    return buttonAnimationStyles.find((b) => b.id === selections["button-animations"])?.data ?? null;
  }, [selections["button-animations"]]);
}

function useResolvedHoverAnimation(): AnimationData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections["hover-animations"]) return null;
    return hoverAnimationStyles.find((h) => h.id === selections["hover-animations"])?.data ?? null;
  }, [selections["hover-animations"]]);
}

function useResolvedPageTransition(): AnimationData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections["page-transitions"]) return null;
    return pageTransitionStyles.find((p) => p.id === selections["page-transitions"])?.data ?? null;
  }, [selections["page-transitions"]]);
}

function useResolvedMicroInteraction(): AnimationData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections["micro-interactions"]) return null;
    return microInteractionStyles.find((m) => m.id === selections["micro-interactions"])?.data ?? null;
  }, [selections["micro-interactions"]]);
}

function useResolvedEntranceAnimation(): AnimationData | null {
  const { selections } = useDesignKit();
  return useMemo(() => {
    if (!selections["entrance-animations"]) return null;
    return entranceAnimationStyles.find((e) => e.id === selections["entrance-animations"])?.data ?? null;
  }, [selections["entrance-animations"]]);
}

/** Hex to rgba for button tinted backgrounds */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Resolve __hover* / __default* special keys from button CSS state records */
function resolveButtonSpecialKeys(
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
      (target as Record<string, string>)[key] = val;
    }
  }
}

function resolveButtonColors(
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

/** Scale a TypeStep down for the preview mini-app (420px container) */
const PREVIEW_SCALE = 0.55;

function scaleStep(step: TypeStep): React.CSSProperties {
  const sizePx = parseFloat(step.size) * 16 * PREVIEW_SCALE;
  const lhPx = parseFloat(step.lineHeight) * 16 * PREVIEW_SCALE;
  return {
    fontSize: `${sizePx}px`,
    lineHeight: `${lhPx}px`,
    fontWeight: step.weight,
    ...(step.letterSpacing ? { letterSpacing: step.letterSpacing } : {}),
  };
}

// ── Device frame dimensions ──────────────────────────────
const DEVICE_WIDTHS: Record<DeviceFrame, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
  frameless: 420,
};

// ── Preview Toolbar ──────────────────────────────────────
function PreviewToolbar() {
  const {
    deviceFrame, setDeviceFrame,
    previewZoom, setPreviewZoom,
    viewMode, setViewMode,
    randomizeAll, resetAll, resetColorPicks,
  } = useDesignKit();

  const frames: { id: DeviceFrame; label: string; icon: string }[] = [
    { id: "mobile", label: "Mobile", icon: "📱" },
    { id: "tablet", label: "Tablet", icon: "📋" },
    { id: "desktop", label: "Desktop", icon: "🖥" },
    { id: "frameless", label: "Frameless", icon: "⊡" },
  ];

  const zooms = [
    { value: 0.5, label: "50%" },
    { value: 0.75, label: "75%" },
    { value: 1, label: "100%" },
    { value: -1, label: "Fit" },
  ];

  return (
    <div className="border-b border-app-border shrink-0 px-3 py-2 space-y-1.5">
      {/* Row 1: device frames + zoom + view mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {frames.map((f) => (
            <button
              key={f.id}
              onClick={() => setDeviceFrame(f.id)}
              className={`px-1.5 py-0.5 rounded text-xs transition-colors ${
                deviceFrame === f.id
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-app-text-muted hover:text-app-text hover:bg-app-card-bg"
              }`}
              title={f.label}
            >
              {f.icon}
            </button>
          ))}
          <div className="w-px h-4 bg-app-border mx-1.5" />
          {zooms.map((z) => (
            <button
              key={z.value}
              onClick={() => setPreviewZoom(z.value)}
              className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                previewZoom === z.value
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-app-text-muted hover:text-app-text hover:bg-app-card-bg"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setViewMode(viewMode === "isolated" ? "context" : "isolated")}
          className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
            viewMode === "context"
              ? "bg-blue-600/20 text-blue-400"
              : "text-app-text-muted hover:text-app-text hover:bg-app-card-bg"
          }`}
          title={viewMode === "isolated" ? "Switch to context view" : "Switch to isolated view"}
        >
          {viewMode === "isolated" ? "☐" : "▦"}
        </button>
      </div>
      {/* Row 2: randomize + reset */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={randomizeAll}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-app-text-muted hover:text-app-text hover:bg-app-card-bg transition-colors"
          title="Randomize all unlocked categories"
        >
          🎲 Randomize
        </button>
        <button
          onClick={() => { resetAll(); resetColorPicks(); }}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-app-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Reset all selections"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

// ── Device Frame Wrapper ─────────────────────────────────
function DeviceFrameWrapper({
  frame,
  children,
}: {
  frame: DeviceFrame;
  children: React.ReactNode;
}) {
  const width = DEVICE_WIDTHS[frame];

  if (frame === "frameless") {
    return <div style={{ width }}>{children}</div>;
  }

  if (frame === "mobile") {
    return (
      <div
        style={{
          width: width + 24,
          backgroundColor: "#1a1a1a",
          borderRadius: "32px",
          padding: "12px",
          border: "2px solid #333",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "4px 12px 6px", color: "#999", fontSize: "9px" }}
        >
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2" /><line x1="23" y1="13" x2="23" y2="11" /></svg>
          </div>
        </div>
        {/* Content */}
        <div style={{ borderRadius: "20px", overflow: "hidden" }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center" style={{ paddingTop: "8px" }}>
          <div style={{ width: "100px", height: "4px", borderRadius: "2px", backgroundColor: "#555" }} />
        </div>
      </div>
    );
  }

  if (frame === "tablet") {
    return (
      <div
        style={{
          width: width + 20,
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          padding: "10px",
          border: "2px solid #333",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ borderRadius: "8px", overflow: "hidden" }}>
          {children}
        </div>
      </div>
    );
  }

  // desktop
  return (
    <div
      style={{
        width: width + 16,
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
        border: "1px solid #333",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center"
        style={{ padding: "6px 10px", backgroundColor: "#222", borderBottom: "1px solid #333", gap: "6px" }}
      >
        <div className="flex gap-1.5">
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#28c840" }} />
        </div>
        <div
          style={{
            flex: 1,
            height: "18px",
            borderRadius: "4px",
            backgroundColor: "#333",
            fontSize: "8px",
            color: "#777",
            display: "flex",
            alignItems: "center",
            paddingLeft: "8px",
          }}
        >
          myapp.com
        </div>
      </div>
      <div style={{ padding: "8px" }}>
        {children}
      </div>
    </div>
  );
}

// ── Context Mode Shell ───────────────────────────────────
function ContextShell({
  children,
  colors,
}: {
  children: React.ReactNode;
  colors: ColorMode;
}) {
  return (
    <div className="flex" style={{ backgroundColor: colors.background }}>
      {/* Mini sidebar */}
      <div
        style={{
          width: "48px",
          backgroundColor: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          padding: "8px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ width: 20, height: 20, borderRadius: "4px", backgroundColor: colors.primary }} />
        <div style={{ width: 16, height: 2, borderRadius: "1px", backgroundColor: colors.textMuted, marginTop: "4px" }} />
        <div style={{ width: 16, height: 2, borderRadius: "1px", backgroundColor: colors.border }} />
        <div style={{ width: 16, height: 2, borderRadius: "1px", backgroundColor: colors.border }} />
        <div style={{ width: 16, height: 2, borderRadius: "1px", backgroundColor: colors.border }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Breadcrumb */}
        <div
          style={{
            padding: "6px 12px",
            borderBottom: `1px solid ${colors.border}`,
            fontSize: "9px",
            color: colors.textMuted,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>Home</span>
          <span>/</span>
          <span style={{ color: colors.text }}>Dashboard</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PreviewPanel() {
  const { previewOpen, selections, deviceFrame, previewZoom, viewMode } = useDesignKit();
  const colors = useResolvedColors();
  const typography = useResolvedTypography();
  const spacing = useResolvedSpacing();
  const radius = useResolvedRadius();
  const shadows = useResolvedShadows();
  const buttonStyle = useResolvedButtonStyle();
  const inputStyle = useResolvedInputStyle();
  const cardStyle = useResolvedCardStyle();
  const navigationStyle = useResolvedNavigationStyle();
  const heroStyle = useResolvedHeroStyle();
  const footerStyle = useResolvedFooterStyle();
  const badgeStyle = useResolvedBadgeStyle();
  const avatarStyle = useResolvedAvatarStyle();
  const statStyle = useResolvedStatStyle();
  const dividerStyle = useResolvedDividerStyle();
  const listStyle = useResolvedListStyle();
  const tableStyle = useResolvedTableStyle();
  const pricingStyle = useResolvedPricingStyle();
  const testimonialStyle = useResolvedTestimonialStyle();
  const imageStyle = useResolvedImageStyle();
  const emptyStatePattern = useResolvedEmptyStatePattern();
  const loadingPattern = useResolvedLoadingPattern();
  const onboardingPattern = useResolvedOnboardingPattern();
  const errorPattern = useResolvedErrorPattern();
  const successPattern = useResolvedSuccessPattern();
  const notificationPattern = useResolvedNotificationPattern();
  const buttonAnimation = useResolvedButtonAnimation();
  const hoverAnimation = useResolvedHoverAnimation();
  const pageTransition = useResolvedPageTransition();
  const microInteraction = useResolvedMicroInteraction();
  const entranceAnimation = useResolvedEntranceAnimation();

  const fontUrls = useMemo(
    () => (selections.typography ? getFontUrlsForPairing(selections.typography) : []),
    [selections.typography]
  );
  useGoogleFonts(fontUrls);

  // Compute "fit" zoom based on panel width vs device width
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [fitZoom, setFitZoom] = useState(1);

  useEffect(() => {
    if (previewZoom !== -1 || !scrollContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const panelWidth = entry.contentRect.width - 32; // padding
        const frameWidth = DEVICE_WIDTHS[deviceFrame] + (deviceFrame === "mobile" ? 24 : deviceFrame === "tablet" ? 20 : deviceFrame === "desktop" ? 16 : 0);
        setFitZoom(Math.min(1, panelWidth / frameWidth));
      }
    });
    observer.observe(scrollContainerRef.current);
    return () => observer.disconnect();
  }, [previewZoom, deviceFrame]);

  const zoom = previewZoom === -1 ? fitZoom : previewZoom;

  if (!previewOpen) return null;

  const hasAnything = colors || typography || spacing || radius || shadows || buttonStyle || inputStyle || cardStyle || navigationStyle || heroStyle || footerStyle || badgeStyle || avatarStyle || statStyle || dividerStyle || listStyle || tableStyle || pricingStyle || testimonialStyle || imageStyle || emptyStatePattern || loadingPattern || onboardingPattern || errorPattern || successPattern || notificationPattern || buttonAnimation || hoverAnimation || pageTransition || microInteraction || entranceAnimation;

  if (!hasAnything) {
    return (
      <aside className="w-[480px] h-dvh border-l border-app-border bg-app-bg flex flex-col shrink-0">
        <div className="flex items-center px-4 h-14 border-b border-app-border shrink-0">
          <span className="text-sm font-semibold text-app-text">Live Preview</span>
        </div>
        <PreviewToolbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-sm text-app-text-muted">Nothing selected yet</p>
            <p className="text-xs text-app-text-muted mt-1 opacity-60">
              Pick colors, typography, spacing, radius, or shadows to see a preview
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const fallbackColors: ColorMode = {
    background: "#0a0a0a",
    surface: "#171717",
    surfaceAlt: "#1a1a1a",
    border: "#262626",
    text: "#f5f5f5",
    textSecondary: "#a3a3a3",
    textMuted: "#525252",
    primary: "#3b82f6",
    primaryForeground: "#ffffff",
    secondary: "#262626",
    secondaryForeground: "#f5f5f5",
    accent: "#8b5cf6",
    accentForeground: "#ffffff",
    semantic: { success: "#22c55e", warning: "#eab308", error: "#ef4444", info: "#3b82f6" },
  };

  const sampleAppContent = (
    <SampleApp
      colors={colors}
      typography={typography}
      spacing={spacing}
      radius={radius}
      shadows={shadows}
      buttonStyle={buttonStyle}
      inputStyle={inputStyle}
      cardStyle={cardStyle}
      navigationStyle={navigationStyle}
      heroStyle={heroStyle}
      footerStyle={footerStyle}
      badgeStyle={badgeStyle}
      avatarStyle={avatarStyle}
      statStyle={statStyle}
      dividerStyle={dividerStyle}
      tableStyle={tableStyle}
      emptyStatePattern={emptyStatePattern}
      loadingPattern={loadingPattern}
      onboardingPattern={onboardingPattern}
      errorPattern={errorPattern}
      successPattern={successPattern}
      notificationPattern={notificationPattern}
      buttonAnimation={buttonAnimation}
      hoverAnimation={hoverAnimation}
      pageTransition={pageTransition}
      microInteraction={microInteraction}
      entranceAnimation={entranceAnimation}
    />
  );

  const wrappedContent = viewMode === "context" ? (
    <ContextShell colors={colors ?? fallbackColors}>
      {sampleAppContent}
    </ContextShell>
  ) : sampleAppContent;

  return (
    <aside className="w-[480px] h-dvh border-l border-app-border bg-app-bg flex flex-col shrink-0">
      <div className="flex items-center px-4 h-14 border-b border-app-border shrink-0">
        <span className="text-sm font-semibold text-app-text">Live Preview</span>
      </div>
      <PreviewToolbar />
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DeviceFrameWrapper frame={deviceFrame}>
            {wrappedContent}
          </DeviceFrameWrapper>
        </div>
      </div>
    </aside>
  );
}

// ── Spacing helpers ──────────────────────────────────────

/** Resolve a spacing value from the scale, using named keys with fallbacks */
function sp(spacing: SpacingData | null, target: number): string {
  if (!spacing) return `${target}px`;
  const scale = spacing.scale;
  const entries = Object.entries(scale);
  // Find exact or closest match
  let best = entries[0];
  let bestDiff = Infinity;
  for (const [key, val] of entries) {
    const px = parseFloat(val) || 0;
    const diff = Math.abs(px - target);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [key, val];
    }
  }
  return best[1];
}

/** Resolve __special keys in an input style's CSS record into real color values */
function resolveInputSpecialKeys(
  stateCSS: Record<string, string>,
  c: ColorMode
): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(stateCSS)) {
    if (key.startsWith("__")) continue;
    // Resolve color tokens
    if (val === "__primary") result[key] = c.primary;
    else if (val === "__error") result[key] = c.semantic.error;
    else if (val === "__surface") result[key] = c.surface;
    else if (val === "__border") result[key] = c.border;
    else if (val === "__text") result[key] = c.text;
    else if (val === "__textMuted") result[key] = c.textMuted;
    else if (val === "__primaryForeground") result[key] = c.primaryForeground;
    else {
      const primaryMatch = val.match(/^__primary-(\d+)$/);
      if (primaryMatch) {
        const alpha = parseInt(primaryMatch[1], 10) / 100;
        const clean = c.primary.replace("#", "");
        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);
        result[key] = `rgba(${r},${g},${b},${alpha})`;
      } else {
        const errorMatch = val.match(/^__error-(\d+)$/);
        if (errorMatch) {
          const alpha = parseInt(errorMatch[1], 10) / 100;
          const clean = c.semantic.error.replace("#", "");
          const r = parseInt(clean.substring(0, 2), 16);
          const g = parseInt(clean.substring(2, 4), 16);
          const b = parseInt(clean.substring(4, 6), 16);
          result[key] = `rgba(${r},${g},${b},${alpha})`;
        } else {
          result[key] = val;
        }
      }
    }
  }
  return result as unknown as React.CSSProperties;
}

/** Resolve __special keys in a card style's CSS record into real color values */
function resolveCardSpecialKeys(
  cssRecord: Record<string, string>,
  c: ColorMode
): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    if (!val.includes("__")) { result[key] = val; continue; }

    let resolved = val
      .replace(/__primary-(\d+)/g, (_, n) => hexToRgba(c.primary, parseInt(n, 10) / 100))
      .replace(/__accent-(\d+)/g, (_, n) => hexToRgba(c.accent, parseInt(n, 10) / 100));

    resolved = resolved
      .replace(/__primaryForeground/g, c.primaryForeground)
      .replace(/__secondaryForeground/g, c.secondaryForeground)
      .replace(/__accentForeground/g, c.accentForeground)
      .replace(/__textSecondary/g, c.textSecondary)
      .replace(/__textMuted/g, c.textMuted)
      .replace(/__surfaceAlt/g, c.surfaceAlt)
      .replace(/__primary/g, c.primary)
      .replace(/__secondary/g, c.secondary)
      .replace(/__accent/g, c.accent)
      .replace(/__surface/g, c.surface)
      .replace(/__border/g, c.border)
      .replace(/__text/g, c.text);

    result[key] = resolved;
  }
  return result as unknown as React.CSSProperties;
}

/** Resolve __special keys in structural CSS records */
function resolveStructuralCSS(
  cssRecord: Record<string, string>,
  c: ColorMode
): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    if (!val.includes("__")) { result[key] = val; continue; }
    let resolved = val
      .replace(/__primary-(\d+)/g, (_, n) => hexToRgba(c.primary, parseInt(n, 10) / 100))
      .replace(/__accent-(\d+)/g, (_, n) => hexToRgba(c.accent, parseInt(n, 10) / 100));
    resolved = resolved
      .replace(/__primaryForeground/g, c.primaryForeground)
      .replace(/__secondaryForeground/g, c.secondaryForeground)
      .replace(/__accentForeground/g, c.accentForeground)
      .replace(/__textSecondary/g, c.textSecondary)
      .replace(/__textMuted/g, c.textMuted)
      .replace(/__surfaceAlt/g, c.surfaceAlt)
      .replace(/__primary/g, c.primary)
      .replace(/__secondary/g, c.secondary)
      .replace(/__accent/g, c.accent)
      .replace(/__surface/g, c.surface)
      .replace(/__border/g, c.border)
      .replace(/__background/g, c.background)
      .replace(/__text/g, c.text);
    result[key] = resolved;
  }
  return result as unknown as React.CSSProperties;
}

/** A mini sample app that demonstrates the selected design system */
function SampleApp({
  colors,
  typography,
  spacing,
  radius,
  shadows,
  buttonStyle,
  inputStyle,
  cardStyle,
  navigationStyle,
  heroStyle,
  footerStyle,
  badgeStyle,
  avatarStyle,
  statStyle,
  dividerStyle,
  tableStyle,
  emptyStatePattern,
  loadingPattern,
  onboardingPattern,
  errorPattern,
  successPattern,
  notificationPattern,
  buttonAnimation,
  hoverAnimation,
  pageTransition,
  microInteraction,
  entranceAnimation,
}: {
  colors: ColorMode | null;
  typography: TypographyData | null;
  spacing: SpacingData | null;
  radius: RadiusData | null;
  shadows: ShadowData | null;
  buttonStyle: ButtonStyleData | null;
  inputStyle: InputStyleData | null;
  cardStyle: CardStyleData | null;
  navigationStyle: NavigationStyleData | null;
  heroStyle: HeroStyleData | null;
  footerStyle: FooterStyleData | null;
  badgeStyle: BadgeStyleData | null;
  avatarStyle: AvatarStyleData | null;
  statStyle: StatStyleData | null;
  dividerStyle: DividerStyleData | null;
  tableStyle: TableStyleData | null;
  emptyStatePattern: EmptyStateStyleData | null;
  loadingPattern: LoadingStyleData | null;
  onboardingPattern: OnboardingStyleData | null;
  errorPattern: ErrorStyleData | null;
  successPattern: SuccessStyleData | null;
  notificationPattern: NotificationStyleData | null;
  buttonAnimation: AnimationData | null;
  hoverAnimation: AnimationData | null;
  pageTransition: AnimationData | null;
  microInteraction: AnimationData | null;
  entranceAnimation: AnimationData | null;
}) {
  const c: ColorMode = colors ?? {
    background: "#0a0a0a",
    surface: "#171717",
    surfaceAlt: "#1a1a1a",
    border: "#262626",
    text: "#f5f5f5",
    textSecondary: "#a3a3a3",
    textMuted: "#525252",
    primary: "#3b82f6",
    primaryForeground: "#ffffff",
    secondary: "#262626",
    secondaryForeground: "#f5f5f5",
    accent: "#8b5cf6",
    accentForeground: "#ffffff",
    semantic: {
      success: "#22c55e",
      warning: "#eab308",
      error: "#ef4444",
      info: "#3b82f6",
    },
  };

  const t = typography;
  const headingFamily = t ? `'${t.headingFont}', sans-serif` : undefined;
  const bodyFamily = t ? `'${t.bodyFont}', sans-serif` : undefined;
  const monoFamily = t?.monoFont ? `'${t.monoFont}', monospace` : undefined;

  // Resolved radius values
  const r = radius;
  const rCard = r?.card ?? "12px";
  const rButton = r?.button ?? "6px";
  const rInput = r?.input ?? "6px";
  const rBadge = r?.badge ?? "9999px";
  const rModal = r?.modal ?? "12px";
  const rMd = r?.md ?? "6px";

  // Resolved shadow values
  const sh = shadows;
  const shSm = sh?.sm ?? "none";
  const shMd = sh?.md ?? "none";
  const shLg = sh?.lg ?? "none";
  const shXl = sh?.xl ?? "none";
  const shInner = sh?.inner ?? "none";

  // Spacing values — pick from scale based on target px
  const sp4 = sp(spacing, 4);
  const sp8 = sp(spacing, 8);
  const sp12 = sp(spacing, 12);
  const sp16 = sp(spacing, 16);
  const sp20 = sp(spacing, 20);
  const sp6 = sp(spacing, 6);

  // Scale-aware style helpers — accept extra styles to merge (avoids duplicate style props)
  const heading = (step: keyof TypographyData["scale"], fallbackClass: string, extra?: React.CSSProperties) => {
    if (t) {
      return { style: { ...scaleStep(t.scale[step]), fontFamily: headingFamily, color: c.text, ...extra } };
    }
    return { className: `${fallbackClass} font-bold`, style: { color: c.text, ...extra } };
  };

  const body = (step: keyof TypographyData["scale"], fallbackClass: string, extra?: React.CSSProperties) => {
    if (t) {
      return { style: { ...scaleStep(t.scale[step]), fontFamily: bodyFamily, color: c.textSecondary, ...extra } };
    }
    return { className: fallbackClass, style: { color: c.textSecondary, ...extra } };
  };

  const overline = (extra?: React.CSSProperties) => {
    if (t) {
      return { style: { ...scaleStep(t.scale.overline), fontFamily: bodyFamily, color: c.textMuted, textTransform: "uppercase" as const, ...extra } };
    }
    return { className: "text-[9px] uppercase tracking-wider", style: { color: c.textMuted, ...extra } };
  };

  const button = () => {
    if (t) {
      const s = scaleStep(t.scale.button);
      return { style: { ...s, fontFamily: bodyFamily } };
    }
    return { className: "text-[10px] font-medium" };
  };

  // Entrance animation — trigger on mount or when entranceAnimation changes
  const [entranceKey, setEntranceKey] = useState(0);
  const entranceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setEntranceKey((k) => k + 1);
  }, [entranceAnimation?.variant]);

  const entranceStyle: React.CSSProperties = {};
  if (entranceAnimation) {
    const dur = entranceAnimation.duration || "400ms";
    const ease = entranceAnimation.easing || "ease-out";
    if (entranceAnimation.cssProperties) {
      Object.assign(entranceStyle, {
        animation: `designkit-entrance ${dur} ${ease} both`,
      });
    }
  }

  // Build keyframe injection for entrance animation
  const entranceKeyframes = useMemo(() => {
    if (!entranceAnimation?.cssProperties) return null;
    const props = entranceAnimation.cssProperties;
    // Build a simple from→to animation using the cssProperties as "from" state
    const fromEntries = Object.entries(props).map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v}`).join("; ");
    return `@keyframes designkit-entrance { from { ${fromEntries} } to { opacity: 1; transform: none; } }`;
  }, [entranceAnimation]);

  return (
    <>
      {entranceKeyframes && <style>{entranceKeyframes}</style>}
      <div
        key={entranceKey}
        ref={entranceRef}
        className="overflow-hidden border"
        style={{
          backgroundColor: c.background,
          borderColor: c.border,
          color: c.text,
          fontFamily: bodyFamily,
          borderRadius: rModal,
          boxShadow: shXl,
          ...entranceStyle,
        }}
      >
      {/* Top nav — style-driven when navigation selected */}
      {navigationStyle && navigationStyle.subtype === "topbar" ? (
        <div style={resolveStructuralCSS(navigationStyle.css, c)}>
          {navigationStyle.hasLogo && (
            <div className="flex items-center" style={{ gap: sp8 }}>
              <div style={{
                width: "20px", height: "20px", borderRadius: rMd,
                backgroundColor: navigationStyle.variant === "filled-solid" ? c.primaryForeground : c.primary,
              }} />
              <span
                {...(t
                  ? { style: { ...scaleStep(t.scale.h6), fontFamily: headingFamily, color: navigationStyle.variant === "filled-solid" ? c.primaryForeground : c.text } }
                  : { className: "text-xs font-semibold", style: { color: navigationStyle.variant === "filled-solid" ? c.primaryForeground : c.text } }
                )}
              >
                MyApp
              </span>
            </div>
          )}
          <div className="flex items-center" style={{ gap: sp12 }}>
            <span {...body("bodySmall", "text-[10px]", { color: navigationStyle.variant === "filled-solid" ? c.primaryForeground : undefined })}>Dashboard</span>
            <span
              {...(t
                ? { style: { ...scaleStep(t.scale.caption), fontFamily: bodyFamily, color: navigationStyle.variant === "filled-solid" ? c.primaryForeground + "aa" : c.textMuted } }
                : { className: "text-[10px]", style: { color: navigationStyle.variant === "filled-solid" ? c.primaryForeground + "aa" : c.textMuted } }
              )}
            >
              Settings
            </span>
            {navigationStyle.hasAvatar && (
              <div style={{ width: "18px", height: "18px", borderRadius: "9999px", backgroundColor: c.accent }} />
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between border-b"
          style={{
            backgroundColor: c.surface,
            borderColor: c.border,
            padding: `${sp12} ${sp16}`,
          }}
        >
          <div className="flex items-center" style={{ gap: sp8 }}>
            <div className="w-6 h-6" style={{ backgroundColor: c.primary, borderRadius: rMd }} />
            <span
              {...(t
                ? { style: { ...scaleStep(t.scale.h6), fontFamily: headingFamily, color: c.text } }
                : { className: "text-xs font-semibold", style: { color: c.text } }
              )}
            >
              MyApp
            </span>
          </div>
          <div className="flex items-center" style={{ gap: sp12 }}>
            <span {...body("bodySmall", "text-[10px]")}>Dashboard</span>
            <span
              {...(t
                ? { style: { ...scaleStep(t.scale.caption), fontFamily: bodyFamily, color: c.textMuted } }
                : { className: "text-[10px]", style: { color: c.textMuted } }
              )}
            >
              Settings
            </span>
            <div style={avatarStyle ? {
              width: "20px", height: "20px",
              borderRadius: avatarStyle.shape === "circle" ? "9999px" : avatarStyle.shape === "rounded" ? "4px" : "0",
              backgroundColor: c.accent,
              border: avatarStyle.hasRing ? `2px solid ${c.primary}` : undefined,
            } : {
              width: "20px", height: "20px", borderRadius: "9999px", backgroundColor: c.accent,
            }} />
          </div>
        </div>
      )}

      {/* Hero section — style-driven when hero selected */}
      <div
        style={heroStyle ? {
          ...resolveStructuralCSS(heroStyle.css, c),
          padding: `${sp20} ${sp16}`,
          ...(heroStyle.hasGradient ? {} : {}),
        } : {
          backgroundColor: c.surfaceAlt,
          padding: `${sp20} ${sp16}`,
        }}
      >
        {heroStyle?.layout === "split" ? (
          <div style={{ display: "flex", alignItems: "center", gap: sp12 }}>
            <div style={{ flex: 1 }}>
              <div {...heading("h4", "text-base", { marginBottom: sp4, color: heroStyle.hasGradient ? c.primaryForeground : c.text })}>
                Welcome back
              </div>
              <div {...body("body", "text-xs", { marginBottom: sp12, color: heroStyle.hasGradient ? c.primaryForeground + "cc" : c.textSecondary })}>
                Here&apos;s what&apos;s happening today.
              </div>
              <div className="flex" style={{ gap: sp8 }}>
                <InteractivePreviewButton label="Get started" isPrimary buttonStyle={buttonStyle} colors={c} rButton={rButton} extraStyle={{ padding: `${sp6} ${sp12}`, boxShadow: shMd }} buttonTypo={button()} buttonAnimation={buttonAnimation} />
              </div>
            </div>
            <div style={{ width: "80px", height: "60px", borderRadius: rCard, background: `linear-gradient(135deg, ${hexToRgba(c.primary, 0.2)}, ${hexToRgba(c.accent, 0.2)})`, border: `1px solid ${c.border}`, flexShrink: 0 }} />
          </div>
        ) : (
          <>
            <div {...heading("h4", "text-base", { marginBottom: sp4, color: heroStyle?.hasGradient ? c.primaryForeground : c.text })}>
              Welcome back
            </div>
            <div {...body("body", "text-xs", { marginBottom: sp12, color: heroStyle?.hasGradient ? c.primaryForeground + "cc" : c.textSecondary })}>
              Here&apos;s what&apos;s happening with your projects today.
            </div>
            <div className="flex" style={{ gap: sp8 }}>
              <InteractivePreviewButton
                label="Get started"
                isPrimary
                buttonStyle={buttonStyle}
                colors={c}
                rButton={rButton}
                extraStyle={{ padding: `${sp6} ${sp12}`, boxShadow: shMd }}
                buttonTypo={button()}
                buttonAnimation={buttonAnimation}
              />
              <InteractivePreviewButton
                label="Learn more"
                isPrimary={false}
                buttonStyle={buttonStyle}
                colors={c}
                rButton={rButton}
                extraStyle={{ padding: `${sp6} ${sp12}` }}
                buttonTypo={button()}
                buttonAnimation={buttonAnimation}
              />
            </div>
          </>
        )}
      </div>

      {/* Stats row */}
      <div
        className={`grid grid-cols-3 ${statStyle?.layout === "card" ? "gap-2 p-2" : "gap-px"} border-b`}
        style={{ backgroundColor: statStyle?.layout === "card" ? c.surfaceAlt : c.border, borderColor: c.border }}
      >
        {[
          { label: "Users", value: "2,340", delta: "+12%" },
          { label: "Revenue", value: "$8.2k", delta: "+4.3%" },
          { label: "Tasks", value: "147", delta: "-2" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: c.surface,
              padding: `${sp12} ${sp12}`,
              ...(statStyle?.layout === "card" ? { border: `1px solid ${c.border}`, borderRadius: "8px" } : {}),
              ...(statStyle?.layout === "inline" ? { display: "flex", alignItems: "baseline", gap: sp8 } : {}),
            }}
          >
            {statStyle?.hasIcon && (
              <div style={{ width: "16px", height: "16px", borderRadius: "4px", backgroundColor: c.primary + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: sp4 }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={c.primary} strokeWidth="2.5"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
              </div>
            )}
            <div {...overline({ marginBottom: statStyle?.layout === "inline" ? "0" : sp4 })}>
              {stat.label}
            </div>
            <div {...heading("h5", "text-sm")}>
              {stat.value}
            </div>
            {statStyle?.hasTrend ? (
              <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={c.semantic.success} strokeWidth="3" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
                <span {...(t ? { style: { ...scaleStep(t.scale.caption), color: c.semantic.success } } : { className: "text-[10px]", style: { color: c.semantic.success } })}>{stat.delta}</span>
              </div>
            ) : (
              <div
                {...(t
                  ? { style: { ...scaleStep(t.scale.caption), color: c.semantic.success } }
                  : { className: "text-[10px]", style: { color: c.semantic.success } }
                )}
              >
                {stat.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Card list */}
      <div style={{ padding: sp16, backgroundColor: c.surfaceAlt }}>
        <div className="flex flex-col" style={{ gap: sp8 }}>
          {[
            { title: "Design system review", tag: "In Progress", tagColor: c.semantic.info },
            { title: "User interviews", tag: "Complete", tagColor: c.semantic.success },
            { title: "Bug fix: login flow", tag: "Urgent", tagColor: c.semantic.error },
          ].map((item) => {
            const cardBaseStyle: React.CSSProperties = cardStyle
              ? {
                  ...resolveCardSpecialKeys(cardStyle.css, c),
                  padding: `${sp8} ${sp12}`,
                }
              : {
                  backgroundColor: c.surface,
                  borderColor: c.border,
                  border: `1px solid ${c.border}`,
                  borderRadius: rCard,
                  padding: `${sp8} ${sp12}`,
                  boxShadow: shMd,
                };

            return (
              <HoverAnimatedCard
                key={item.title}
                hoverAnimation={hoverAnimation}
                baseStyle={cardBaseStyle}
                colors={c}
                shadows={sh}
              >
                <div>
                  <div
                    {...(t
                      ? { style: { ...scaleStep(t.scale.body), fontWeight: 500, fontFamily: bodyFamily, color: c.text } }
                      : { className: "text-xs font-medium", style: { color: c.text } }
                    )}
                  >
                    {item.title}
                  </div>
                  <div
                    {...(t
                      ? { style: { marginTop: sp4, ...scaleStep(t.scale.caption), fontFamily: bodyFamily, color: c.textMuted } }
                      : { className: "text-[10px]", style: { marginTop: sp4, color: c.textMuted } }
                    )}
                  >
                    Updated 2h ago
                  </div>
                </div>
                <span
                  className="font-medium"
                  {...(t
                    ? {
                        style: {
                          ...scaleStep(t.scale.caption),
                          backgroundColor: badgeStyle ? (badgeStyle.variant === "outline" ? "transparent" : badgeStyle.variant === "gradient" ? undefined : item.tagColor + "18") : item.tagColor + "18",
                          ...(badgeStyle?.variant === "gradient" ? { background: `linear-gradient(135deg, ${item.tagColor}, ${c.accent})`, color: c.primaryForeground } : {}),
                          color: badgeStyle?.variant === "gradient" ? c.primaryForeground : item.tagColor,
                          border: badgeStyle?.variant === "outline" ? `1px solid ${item.tagColor}` : undefined,
                          borderRadius: badgeStyle?.shape === "square" ? "4px" : rBadge,
                          padding: `${sp4} ${sp8}`,
                        },
                      }
                    : {
                        className: "font-medium text-[9px]",
                        style: {
                          backgroundColor: badgeStyle ? (badgeStyle.variant === "outline" ? "transparent" : item.tagColor + "18") : item.tagColor + "18",
                          color: item.tagColor,
                          border: badgeStyle?.variant === "outline" ? `1px solid ${item.tagColor}` : undefined,
                          borderRadius: badgeStyle?.shape === "square" ? "4px" : rBadge,
                          padding: `${sp4} ${sp8}`,
                        },
                      }
                  )}
                >
                  {badgeStyle?.hasDot && (
                    <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "9999px", backgroundColor: item.tagColor, marginRight: "4px", verticalAlign: "middle" }} />
                  )}
                  {item.tag}
                </span>
              </HoverAnimatedCard>
            );
          })}
        </div>
      </div>

      {/* Divider — style-driven when divider selected */}
      {dividerStyle && (
        <div style={{ padding: `0 ${sp16}`, marginBottom: sp8 }}>
          {dividerStyle.hasLabel ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: dividerStyle.thickness, backgroundColor: c.border }} />
              <span style={{ fontSize: "9px", color: c.textMuted }}>or</span>
              <div style={{ flex: 1, height: dividerStyle.thickness, backgroundColor: c.border }} />
            </div>
          ) : dividerStyle.hasIcon ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: dividerStyle.thickness, backgroundColor: c.border }} />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <div style={{ flex: 1, height: dividerStyle.thickness, backgroundColor: c.border }} />
            </div>
          ) : dividerStyle.style === "gradient" ? (
            <div style={{ height: dividerStyle.thickness, background: `linear-gradient(to right, transparent, ${hexToRgba(c.primary, 0.4)}, transparent)` }} />
          ) : dividerStyle.style === "decorative" ? (
            <div style={{ height: dividerStyle.thickness, width: "48px", backgroundColor: c.primary, borderRadius: "9999px" }} />
          ) : (
            <div style={{
              borderTop: `${dividerStyle.thickness} ${dividerStyle.style === "dashed" ? "dashed" : dividerStyle.style === "dotted" ? "dotted" : "solid"} ${c.border}`,
            }} />
          )}
        </div>
      )}

      {/* Table section */}
      {tableStyle && (
        <PreviewTable
          tableStyle={tableStyle}
          colors={c}
          typography={t}
          headingFamily={headingFamily}
          bodyFamily={bodyFamily}
          sp8={sp8}
          sp16={sp16}
          rMd={rMd}
          heading={heading}
          scaleStep={t ? scaleStep : undefined}
        />
      )}

      {/* Form section */}
      <div style={{ padding: `0 ${sp16} ${sp16} ${sp16}` }}>
        <div {...heading("h6", "text-xs", { marginBottom: sp8 })}>
          Quick action
        </div>
        <PreviewFormSection
          inputStyle={inputStyle}
          colors={c}
          bodyFamily={bodyFamily}
          monoFamily={monoFamily}
          typography={t}
          rInput={rInput}
          shadows={shadows}
          sp4={sp4}
          sp6={sp6}
          sp8={sp8}
          sp12={sp12}
        />
        <div className="flex" style={{ gap: sp8, marginTop: sp8 }}>
          <InteractivePreviewButton
            label="Create task"
            isPrimary
            buttonStyle={buttonStyle}
            colors={c}
            rButton={rButton}
            extraStyle={{ padding: `${sp6} ${sp12}`, boxShadow: shSm }}
            buttonTypo={button()}
            buttonAnimation={buttonAnimation}
          />
          <InteractivePreviewButton
            label="Cancel"
            isPrimary={false}
            buttonStyle={buttonStyle}
            colors={c}
            rButton={rButton}
            extraStyle={{ padding: `${sp6} ${sp12}` }}
            buttonTypo={button()}
            buttonAnimation={buttonAnimation}
          />
        </div>
      </div>

      {/* Alert examples */}
      <div style={{ padding: `0 ${sp16} ${sp16} ${sp16}` }}>
        <div className="flex flex-col" style={{ gap: sp6 }}>
          {[
            { text: "Deployment successful", color: c.semantic.success },
            { text: "API rate limit warning", color: c.semantic.warning },
            { text: "Build failed: check logs", color: c.semantic.error },
            { text: "New version available", color: c.semantic.info },
          ].map((alert) => (
            <div
              key={alert.text}
              className="flex items-center"
              style={{
                backgroundColor: alert.color + "12",
                color: alert.color,
                borderLeft: `2px solid ${alert.color}`,
                borderRadius: rMd,
                padding: `${sp6} ${sp12}`,
                gap: sp8,
                boxShadow: shSm,
                ...(t
                  ? { fontSize: scaleStep(t.scale.bodySmall).fontSize, lineHeight: scaleStep(t.scale.bodySmall).lineHeight }
                  : { fontSize: "10px" }
                ),
              }}
            >
              {alert.text}
            </div>
          ))}
        </div>
      </div>

      {/* UX Patterns indicators */}
      {(emptyStatePattern || loadingPattern || onboardingPattern || errorPattern || successPattern || notificationPattern) && (
        <div style={{ padding: `${sp8} ${sp16}`, borderTop: `1px solid ${c.border}` }}>
          <div {...overline({ marginBottom: sp6 })}>UX Patterns</div>
          <div className="flex flex-wrap" style={{ gap: sp4 }}>
            {loadingPattern && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.primary + "12", color: c.primary, fontWeight: 500,
              }}>
                {loadingPattern.animationStyle} {loadingPattern.type}
              </span>
            )}
            {notificationPattern && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.semantic.info + "12", color: c.semantic.info, fontWeight: 500,
              }}>
                {notificationPattern.subtype} · {notificationPattern.position}
              </span>
            )}
            {emptyStatePattern && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.textMuted + "18", color: c.textSecondary, fontWeight: 500,
              }}>
                empty: {emptyStatePattern.layout}
              </span>
            )}
            {errorPattern && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.semantic.error + "12", color: c.semantic.error, fontWeight: 500,
              }}>
                error: {errorPattern.errorType}
              </span>
            )}
            {successPattern && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.semantic.success + "12", color: c.semantic.success, fontWeight: 500,
              }}>
                success: {successPattern.type}
              </span>
            )}
            {onboardingPattern && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.accent + "12", color: c.accent, fontWeight: 500,
              }}>
                onboarding: {onboardingPattern.layout}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Motion indicators */}
      {(buttonAnimation || hoverAnimation || pageTransition || microInteraction || entranceAnimation) && (
        <div style={{ padding: `${sp8} ${sp16}`, borderTop: `1px solid ${c.border}` }}>
          <div {...overline({ marginBottom: sp6 })}>Motion</div>
          <div className="flex flex-wrap" style={{ gap: sp4 }}>
            {buttonAnimation && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.primary + "12", color: c.primary, fontWeight: 500,
              }}>
                btn: {buttonAnimation.variant} · {buttonAnimation.duration}
              </span>
            )}
            {hoverAnimation && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.accent + "12", color: c.accent, fontWeight: 500,
              }}>
                hover: {hoverAnimation.variant}
              </span>
            )}
            {pageTransition && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.semantic.info + "12", color: c.semantic.info, fontWeight: 500,
              }}>
                page: {pageTransition.variant}
              </span>
            )}
            {microInteraction && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.semantic.success + "12", color: c.semantic.success, fontWeight: 500,
              }}>
                micro: {microInteraction.variant}
              </span>
            )}
            {entranceAnimation && (
              <span style={{
                fontSize: "8px", padding: `${sp4} ${sp6}`, borderRadius: rMd,
                backgroundColor: c.semantic.warning + "12", color: c.semantic.warning, fontWeight: 500,
              }}>
                entrance: {entranceAnimation.variant}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer — style-driven when footer selected */}
      {footerStyle && (
        <div style={resolveStructuralCSS(footerStyle.css, c)}>
          {footerStyle.hasCta && (
            <div style={{
              backgroundColor: c.primary + "10",
              borderRadius: rMd,
              padding: `${sp8} ${sp12}`,
              marginBottom: sp8,
              textAlign: "center" as const,
            }}>
              <div {...body("bodySmall", "text-[10px]", { fontWeight: 600, color: c.text, marginBottom: sp4 })}>
                Ready to get started?
              </div>
              <span style={{
                display: "inline-block", padding: `${sp4} ${sp8}`, borderRadius: rButton, fontSize: "9px",
                backgroundColor: c.primary, color: c.primaryForeground,
              }}>
                Sign up free
              </span>
            </div>
          )}
          {footerStyle.columns > 0 && (
            <div style={{ display: "flex", gap: sp12, marginBottom: sp8 }}>
              {["Product", "Company", "Legal"].slice(0, Math.min(footerStyle.columns, 3)).map((col) => (
                <div key={col} style={{ flex: 1 }}>
                  <div {...(t
                    ? { style: { ...scaleStep(t.scale.caption), fontFamily: bodyFamily, fontWeight: 600, color: c.text, marginBottom: sp4 } }
                    : { className: "text-[9px] font-semibold", style: { color: c.text, marginBottom: sp4 } }
                  )}>
                    {col}
                  </div>
                  <div {...(t
                    ? { style: { ...scaleStep(t.scale.caption), fontFamily: bodyFamily, color: c.textMuted } }
                    : { className: "text-[8px]", style: { color: c.textMuted } }
                  )}>
                    Link 1
                  </div>
                  <div {...(t
                    ? { style: { ...scaleStep(t.scale.caption), fontFamily: bodyFamily, color: c.textMuted } }
                    : { className: "text-[8px]", style: { color: c.textMuted } }
                  )}>
                    Link 2
                  </div>
                </div>
              ))}
            </div>
          )}
          {footerStyle.hasNewsletter && (
            <div style={{ display: "flex", alignItems: "center", gap: sp8, marginBottom: sp8 }}>
              <div style={{
                flex: 1, height: "20px", borderRadius: rInput, border: `1px solid ${c.border}`,
                backgroundColor: c.background, padding: `0 ${sp8}`, display: "flex", alignItems: "center",
              }}>
                <span {...(t
                  ? { style: { ...scaleStep(t.scale.caption), color: c.textMuted } }
                  : { className: "text-[8px]", style: { color: c.textMuted } }
                )}>
                  your@email.com
                </span>
              </div>
              <span style={{
                padding: `${sp4} ${sp8}`, borderRadius: rButton, fontSize: "8px",
                backgroundColor: c.primary, color: c.primaryForeground,
              }}>
                Subscribe
              </span>
            </div>
          )}
          <div style={{ borderTop: footerStyle.columns > 0 || footerStyle.hasCta || footerStyle.hasNewsletter ? `1px solid ${c.border}` : undefined, paddingTop: sp6 }}>
            <span {...(t
              ? { style: { ...scaleStep(t.scale.caption), color: c.textMuted } }
              : { className: "text-[8px]", style: { color: c.textMuted } }
            )}>
              2026 Company Inc.
            </span>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

// ── Preview Table ────────────────────────────────────────

function PreviewTable({
  tableStyle,
  colors: c,
  typography: t,
  headingFamily,
  bodyFamily,
  sp8,
  sp16,
  rMd,
  heading,
  scaleStep: scaleStepFn,
}: {
  tableStyle: TableStyleData;
  colors: ColorMode;
  typography: TypographyData | null;
  headingFamily: string | undefined;
  bodyFamily: string | undefined;
  sp8: string;
  sp16: string;
  rMd: string;
  heading: (step: keyof TypographyData["scale"], fallbackClass: string, extra?: React.CSSProperties) => Record<string, unknown>;
  scaleStep?: (step: TypeStep) => React.CSSProperties;
}) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const rows = [
    { name: "Alice Chen", status: "Active", date: "Feb 24" },
    { name: "Bob Tanaka", status: "Pending", date: "Feb 23" },
    { name: "Carol Smith", status: "Inactive", date: "Feb 22" },
  ];

  const containerCSS = resolveStructuralCSS(tableStyle.containerCss, c);
  const headerCSS = resolveStructuralCSS(tableStyle.headerCss, c);
  const rowCSS = resolveStructuralCSS(tableStyle.rowCss, c);
  const altRowCSS = tableStyle.altRowCss ? resolveStructuralCSS(tableStyle.altRowCss, c) : null;
  const hoverRowCSS = tableStyle.hoverRowCss ? resolveStructuralCSS(tableStyle.hoverRowCss, c) : null;

  const cellPad = tableStyle.density === "compact" ? "4px 8px" : tableStyle.density === "relaxed" ? "10px 12px" : "6px 10px";
  const cellFont = t && scaleStepFn
    ? { ...scaleStepFn(t.scale.bodySmall), fontFamily: bodyFamily }
    : { fontSize: "10px" as const };
  const headerFont = t && scaleStepFn
    ? { ...scaleStepFn(t.scale.caption), fontFamily: bodyFamily, fontWeight: 600 as const }
    : { fontSize: "9px" as const, fontWeight: 600 as const };

  return (
    <div style={{ padding: `0 ${sp16} ${sp16} ${sp16}` }}>
      <div {...heading("h6", "text-xs", { marginBottom: sp8 })}>
        Recent activity
      </div>
      <div style={{ ...containerCSS, borderRadius: rMd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Status", "Date"].map((col) => (
                <th
                  key={col}
                  style={{
                    ...headerCSS,
                    padding: cellPad,
                    textAlign: "left",
                    ...headerFont,
                    color: c.textSecondary,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isAlt = altRowCSS && i % 2 === 1;
              const isHovered = hoveredRow === i && hoverRowCSS;
              return (
                <tr
                  key={row.name}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    ...rowCSS,
                    ...(isAlt ? altRowCSS : {}),
                    ...(isHovered ? hoverRowCSS : {}),
                    transition: "background-color 150ms ease",
                  }}
                >
                  <td style={{ padding: cellPad, ...cellFont, color: c.text }}>{row.name}</td>
                  <td style={{ padding: cellPad, ...cellFont, color: row.status === "Active" ? c.semantic.success : row.status === "Pending" ? c.semantic.warning : c.textMuted }}>{row.status}</td>
                  <td style={{ padding: cellPad, ...cellFont, color: c.textMuted }}>{row.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Interactive button for the preview ──────────────────

function InteractivePreviewButton({
  label,
  isPrimary,
  buttonStyle,
  colors,
  rButton,
  extraStyle,
  buttonTypo,
  buttonAnimation,
}: {
  label: string;
  isPrimary: boolean;
  buttonStyle: ButtonStyleData | null;
  colors: ColorMode;
  rButton: string;
  extraStyle?: React.CSSProperties;
  buttonTypo: { style?: React.CSSProperties; className?: string };
  buttonAnimation?: AnimationData | null;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Build base (default) style
  const buildBase = (): React.CSSProperties => {
    if (!buttonStyle) {
      return {
        backgroundColor: isPrimary ? colors.primary : colors.secondary,
        color: isPrimary ? colors.primaryForeground : colors.secondaryForeground,
        borderColor: isPrimary ? undefined : colors.border,
        border: isPrimary ? undefined : `1px solid ${colors.border}`,
        borderRadius: rButton,
        ...extraStyle,
      };
    }

    const strategy: ButtonColorStrategy =
      isPrimary
        ? buttonStyle.colorStrategy
        : buttonStyle.colorStrategy === "solid" || buttonStyle.colorStrategy === "gradient"
          ? "surface"
          : buttonStyle.colorStrategy;

    const resolved = resolveButtonColors(colors, strategy);
    const structural = { ...buttonStyle.css.default };
    delete structural.position;
    delete structural.overflow;

    const base: React.CSSProperties = {
      ...structural,
      color: resolved.text,
      borderRadius: structural.borderRadius ?? rButton,
      ...extraStyle,
    };

    // Apply __default* keys
    resolveButtonSpecialKeys(buttonStyle.css.default, colors, base);

    if (strategy === "gradient") {
      base.background = resolved.bg;
    } else if (!base.backgroundColor || base.backgroundColor === "transparent") {
      base.backgroundColor = resolved.bg;
    } else if (resolved.bg !== "transparent") {
      base.backgroundColor = resolved.bg;
    }
    base.color = resolved.text;
    if (resolved.border && !buttonStyle.css.default.border?.includes("currentColor")) {
      base.borderColor = resolved.border;
    }

    return base;
  };

  const base = buildBase();
  const style = { ...base };

  // Apply hover/active state overrides
  if (buttonStyle) {
    if (pressed) {
      resolveButtonSpecialKeys(buttonStyle.css.hover, colors, style);
      resolveButtonSpecialKeys(buttonStyle.css.active, colors, style);
    } else if (hovered) {
      resolveButtonSpecialKeys(buttonStyle.css.hover, colors, style);
    }
  }

  // Button animation transform on press
  const animTransform = useMemo(() => {
    if (!buttonAnimation) return {};
    const sub = buttonAnimation.subtype;
    if (sub === "scale") return { transform: "scale(0.95)" };
    if (sub === "bounce") return { transform: "scale(0.92)" };
    if (sub === "3d") return { transform: "scale(0.97) translateY(1px)" };
    return {};
  }, [buttonAnimation]);

  const handleClick = useCallback(() => {
    if (!buttonAnimation) return;
    setAnimating(true);
    const dur = parseInt(buttonAnimation.duration) || 200;
    setTimeout(() => setAnimating(false), dur);
  }, [buttonAnimation]);

  const transitionProp = buttonAnimation
    ? `transform ${buttonAnimation.duration || "150ms"} ${buttonAnimation.easing || "ease"}, background-color 150ms ease, color 150ms ease, box-shadow 150ms ease, border-color 150ms ease`
    : "background-color 150ms ease, color 150ms ease, box-shadow 150ms ease, border-color 150ms ease";

  return (
    <span
      className={`${buttonTypo.className ?? ""} flex-1 text-center cursor-pointer select-none`}
      style={{
        ...buttonTypo.style,
        ...style,
        transition: transitionProp,
        ...((pressed || animating) ? animTransform : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => { setPressed(true); handleClick(); }}
      onMouseUp={() => setPressed(false)}
    >
      {label}
    </span>
  );
}

// ── Hover Animated Card ──────────────────────────────────

function HoverAnimatedCard({
  children,
  hoverAnimation,
  baseStyle,
  colors,
  shadows,
}: {
  children: React.ReactNode;
  hoverAnimation: AnimationData | null;
  baseStyle: React.CSSProperties;
  colors: ColorMode;
  shadows: ShadowData | null;
}) {
  const [hovered, setHovered] = useState(false);

  const hoverStyle: React.CSSProperties = useMemo(() => {
    if (!hoverAnimation || !hovered) return {};
    const sub = hoverAnimation.subtype;
    if (sub === "lift" || sub === "lift-shadow") {
      return {
        transform: "translateY(-2px)",
        boxShadow: shadows?.lg ?? "0 4px 12px rgba(0,0,0,0.15)",
      };
    }
    if (sub === "scale" || sub === "scale-up") {
      return { transform: "scale(1.02)" };
    }
    if (sub === "glow") {
      return { boxShadow: `0 0 12px ${hexToRgba(colors.primary, 0.3)}` };
    }
    if (sub === "border-reveal") {
      return { borderColor: colors.primary };
    }
    if (sub === "color-shift") {
      return { backgroundColor: hexToRgba(colors.primary, 0.05) };
    }
    return {};
  }, [hoverAnimation, hovered, colors, shadows]);

  const dur = hoverAnimation?.duration || "200ms";
  const ease = hoverAnimation?.easing || "ease";

  return (
    <div
      className="flex items-center justify-between"
      style={{
        ...baseStyle,
        ...hoverStyle,
        transition: `transform ${dur} ${ease}, box-shadow ${dur} ${ease}, border-color ${dur} ${ease}, background-color ${dur} ${ease}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

// ── Preview form section — adapts to selected input subtype ──

function PreviewFormSection({
  inputStyle,
  colors: c,
  bodyFamily,
  monoFamily,
  typography: t,
  rInput,
  shadows,
  sp4,
  sp6,
  sp8,
  sp12,
}: {
  inputStyle: InputStyleData | null;
  colors: ColorMode;
  bodyFamily: string | undefined;
  monoFamily: string | undefined;
  typography: TypographyData | null;
  rInput: string;
  shadows: ShadowData | null;
  sp4: string;
  sp6: string;
  sp8: string;
  sp12: string;
}) {
  const fontStyle = t
    ? { fontSize: scaleStep(t.scale.bodySmall).fontSize, lineHeight: scaleStep(t.scale.bodySmall).lineHeight }
    : { fontSize: "12px" as const };

  const labelStyle: React.CSSProperties = t
    ? { ...scaleStep(t.scale.caption), fontFamily: bodyFamily, color: c.textSecondary }
    : { fontSize: "10px", color: c.textSecondary };

  // Fallback input style when nothing is selected
  const fallbackInputCSS: React.CSSProperties = {
    backgroundColor: c.surface,
    borderColor: c.border,
    border: `1px solid ${c.border}`,
    color: c.text,
    fontFamily: monoFamily ?? bodyFamily,
    borderRadius: rInput,
    padding: `${sp8} ${sp12}`,
    boxShadow: shadows?.inner ?? "none",
    ...fontStyle,
  };

  // Resolved input style (merges default state with color tokens)
  const resolvedInputCSS = inputStyle
    ? { ...resolveInputSpecialKeys(inputStyle.css.default, c), color: c.text, fontFamily: monoFamily ?? bodyFamily, ...fontStyle }
    : fallbackInputCSS;

  const subtype = inputStyle?.subtype;

  if (!inputStyle) {
    return <TextInputPreview css={resolvedInputCSS} focusCSS={null} />;
  }
  if (subtype === "text" || subtype === "search") {
    const focusCSS = { ...resolveInputSpecialKeys(inputStyle.css.default, c), ...resolveInputSpecialKeys(inputStyle.css.focus, c), color: c.text, fontFamily: monoFamily ?? bodyFamily, ...fontStyle };
    return <TextInputPreview css={resolvedInputCSS} focusCSS={focusCSS} />;
  }
  if (subtype === "select") {
    const focusCSS = { ...resolveInputSpecialKeys(inputStyle.css.default, c), ...resolveInputSpecialKeys(inputStyle.css.focus, c), color: c.text, fontFamily: monoFamily ?? bodyFamily, ...fontStyle };
    return <SelectPreview css={resolvedInputCSS} focusCSS={focusCSS} colors={c} />;
  }
  if (subtype === "textarea") {
    const focusCSS = { ...resolveInputSpecialKeys(inputStyle.css.default, c), ...resolveInputSpecialKeys(inputStyle.css.focus, c), color: c.text, fontFamily: monoFamily ?? bodyFamily, ...fontStyle };
    return <TextareaPreview css={resolvedInputCSS} focusCSS={focusCSS} />;
  }
  if (subtype === "checkbox" || subtype === "toggle") {
    return <CheckTogglePreview inputStyle={inputStyle} colors={c} labelStyle={labelStyle} sp8={sp8} />;
  }
  if (subtype === "radio") {
    return <RadioGroupPreview inputStyle={inputStyle} colors={c} labelStyle={labelStyle} fontStyle={fontStyle} sp6={sp6} sp8={sp8} />;
  }
  if (subtype === "slider") {
    return <SliderInteractive inputStyle={inputStyle} colors={c} labelStyle={labelStyle} monoFamily={monoFamily} bodyFamily={bodyFamily} sp4={sp4} />;
  }

  return <TextInputPreview css={resolvedInputCSS} focusCSS={null} />;
}

// ── Interactive sub-components ──────────────────────────

/** Text input that is typeable and shows focus style */
function TextInputPreview({ css, focusCSS }: { css: React.CSSProperties; focusCSS: React.CSSProperties | null }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type="text"
      placeholder="Search or type a command..."
      className="w-full outline-none"
      style={focused && focusCSS ? focusCSS : css}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

/** Select dropdown — real <select>, shows focus ring */
function SelectPreview({ css, focusCSS, colors: c }: { css: React.CSSProperties; focusCSS: React.CSSProperties; colors: ColorMode }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <select
        className="w-full outline-none appearance-none cursor-pointer"
        style={focused ? focusCSS : css}
        defaultValue="option1"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="option1">Design tokens</option>
        <option value="option2">Components</option>
        <option value="option3">Animations</option>
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke={c.textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

/** Textarea — typeable, shows focus style */
function TextareaPreview({ css, focusCSS }: { css: React.CSSProperties; focusCSS: React.CSSProperties }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder="Write your notes here..."
      className="w-full outline-none"
      style={{ ...(focused ? focusCSS : css), minHeight: "52px", resize: "none" as const }}
      rows={3}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

/** Checkbox / toggle — clickable to toggle on/off */
function CheckTogglePreview({
  inputStyle,
  colors: c,
  labelStyle,
  sp8,
}: {
  inputStyle: InputStyleData;
  colors: ColorMode;
  labelStyle: React.CSSProperties;
  sp8: string;
}) {
  const [checks, setChecks] = useState<Record<string, boolean>>({ a: true, b: false });
  const toggle = (key: string) => setChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  const unchecked = resolveInputSpecialKeys(inputStyle.css.default, c);
  const checked = { ...resolveInputSpecialKeys(inputStyle.css.default, c), ...resolveInputSpecialKeys(inputStyle.css.filled, c) };
  const isToggle = inputStyle.subtype === "toggle";
  const isIos = inputStyle.variant === "toggle-ios";
  const thumbSize = isIos ? "18px" : "14px";

  const items = [
    { key: "a", label: "Enable notifications" },
    { key: "b", label: "Auto-save drafts" },
  ];

  return (
    <div className="flex flex-col" style={{ gap: sp8 }}>
      {items.map(({ key, label }) => {
        const on = checks[key];
        return (
          <label
            key={key}
            className="flex items-center cursor-pointer select-none"
            style={{ gap: sp8 }}
            onClick={(e) => { e.preventDefault(); toggle(key); }}
          >
            {isToggle ? (
              <div
                style={{
                  ...(on ? checked : unchecked),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: on ? "flex-end" : "flex-start",
                  flexShrink: 0,
                  transition: "background-color 200ms ease",
                }}
              >
                <div
                  style={{
                    width: thumbSize,
                    height: thumbSize,
                    borderRadius: "9999px",
                    backgroundColor: "white",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    transition: "transform 200ms ease",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  ...(on ? checked : unchecked),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background-color 150ms ease, border-color 150ms ease",
                }}
              >
                {on && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            )}
            <span style={labelStyle}>{label}</span>
          </label>
        );
      })}
    </div>
  );
}

/** Radio group — clickable to switch selection */
function RadioGroupPreview({
  inputStyle,
  colors: c,
  labelStyle,
  fontStyle,
  sp6,
  sp8,
}: {
  inputStyle: InputStyleData;
  colors: ColorMode;
  labelStyle: React.CSSProperties;
  fontStyle: React.CSSProperties;
  sp6: string;
  sp8: string;
}) {
  const options = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState(0);

  const defaultCSS = resolveInputSpecialKeys(inputStyle.css.default, c);
  const selectedCSS = { ...resolveInputSpecialKeys(inputStyle.css.default, c), ...resolveInputSpecialKeys(inputStyle.css.filled, c) };
  const isSegmented = inputStyle.variant === "segmented";
  const isChip = inputStyle.variant === "chip";
  const isCard = inputStyle.variant === "card";

  if (isSegmented) {
    return (
      <div className="flex" style={{ border: `1px solid ${c.border}`, borderRadius: "8px", overflow: "hidden" }}>
        {options.map((opt, i) => (
          <div
            key={opt}
            onClick={() => setSelected(i)}
            style={{
              ...(i === selected ? selectedCSS : { ...defaultCSS, color: c.text }),
              borderRadius: "0",
              border: "none",
              borderLeft: i > 0 ? `1px solid ${c.border}` : undefined,
              flex: 1,
              textAlign: "center" as const,
              cursor: "pointer",
              transition: "background-color 150ms ease, color 150ms ease",
              ...fontStyle,
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    );
  }

  if (isChip) {
    return (
      <div className="flex flex-wrap" style={{ gap: sp6 }}>
        {options.map((opt, i) => (
          <span
            key={opt}
            onClick={() => setSelected(i)}
            style={{
              ...(i === selected ? selectedCSS : { ...defaultCSS, color: c.text }),
              cursor: "pointer",
              transition: "background-color 150ms ease, border-color 150ms ease",
              ...fontStyle,
            }}
          >
            {opt}
          </span>
        ))}
      </div>
    );
  }

  if (isCard) {
    return (
      <div className="flex flex-col" style={{ gap: sp6 }}>
        {options.map((opt, i) => (
          <div
            key={opt}
            onClick={() => setSelected(i)}
            className="flex items-center"
            style={{
              ...(i === selected ? selectedCSS : { ...defaultCSS, color: c.text }),
              cursor: "pointer",
              gap: sp8,
              transition: "border-color 200ms ease, background-color 200ms ease",
              ...fontStyle,
            }}
          >
            <div style={{
              width: "12px", height: "12px", borderRadius: "9999px",
              border: i === selected ? `4px solid ${c.primary}` : `2px solid ${c.border}`,
              flexShrink: 0,
              transition: "border 150ms ease",
            }} />
            {opt}
          </div>
        ))}
      </div>
    );
  }

  // Standard / filled radio
  return (
    <div className="flex flex-col" style={{ gap: sp8 }}>
      {options.map((opt, i) => (
        <label
          key={opt}
          className="flex items-center cursor-pointer"
          style={{ gap: sp8 }}
          onClick={(e) => { e.preventDefault(); setSelected(i); }}
        >
          <div style={{ ...(i === selected ? selectedCSS : defaultCSS), flexShrink: 0, transition: "border-color 150ms ease, border-width 150ms ease, background-color 150ms ease, box-shadow 150ms ease" }} />
          <span style={labelStyle}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

/** Slider — draggable thumb, click-to-seek, live value readout */
function SliderInteractive({
  inputStyle,
  colors: c,
  labelStyle,
  monoFamily,
  bodyFamily,
  sp4,
}: {
  inputStyle: InputStyleData;
  colors: ColorMode;
  labelStyle: React.CSSProperties;
  monoFamily: string | undefined;
  bodyFamily: string | undefined;
  sp4: string;
}) {
  const [value, setValue] = useState(60);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const trackBg = c.border;
  const fillBg = c.primary;
  const thumbBg = c.primary;

  const posFromEvent = useCallback((clientX: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    return inputStyle.variant === "stepped" ? Math.round(pct / 25) * 25 : pct;
  }, [value, inputStyle.variant]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    setValue(posFromEvent(e.clientX));
  }, [posFromEvent]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setValue(posFromEvent(e.clientX));
  }, [dragging, posFromEvent]);

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: sp4 }}>
        <span style={labelStyle}>Volume</span>
        <span style={{ ...labelStyle, fontFamily: monoFamily ?? bodyFamily }}>{value}%</span>
      </div>
      <div
        ref={trackRef}
        className="relative flex items-center cursor-pointer select-none"
        style={{ height: "22px", touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Track background */}
        <div className="w-full absolute" style={{ height: "4px", borderRadius: "2px", backgroundColor: trackBg }} />
        {/* Track fill */}
        <div className="absolute left-0" style={{ height: "4px", borderRadius: "2px", backgroundColor: fillBg, width: `${value}%`, transition: dragging ? "none" : "width 100ms ease" }} />
        {/* Step marks */}
        {inputStyle.variant === "stepped" && (
          <>
            {[0, 25, 50, 75, 100].map((step) => (
              <div key={step} className="absolute" style={{
                left: `${step}%`, top: "50%", transform: "translate(-50%, -50%)",
                width: "6px", height: "6px", borderRadius: "9999px",
                backgroundColor: step <= value ? fillBg : trackBg,
                transition: "background-color 100ms ease",
              }} />
            ))}
          </>
        )}
        {/* Thumb */}
        <div className="absolute" style={{
          left: `${value}%`, top: "50%",
          transform: `translate(-50%, -50%) scale(${dragging ? 1.2 : 1})`,
          width: "16px", height: "16px", borderRadius: "9999px",
          backgroundColor: thumbBg,
          boxShadow: dragging ? `0 0 0 4px ${c.primary}33, 0 1px 3px rgba(0,0,0,0.3)` : "0 1px 3px rgba(0,0,0,0.3)",
          transition: dragging ? "transform 50ms ease, box-shadow 100ms ease" : "left 100ms ease, transform 150ms ease, box-shadow 150ms ease",
        }} />
        {/* Label tooltip (for labeled variant, shows while dragging or always) */}
        {inputStyle.variant === "labeled" && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${value}%`, top: "-16px", transform: "translateX(-50%)",
              backgroundColor: thumbBg, color: c.primaryForeground,
              padding: "1px 5px", borderRadius: "3px", fontSize: "8px",
              fontFamily: monoFamily ?? bodyFamily,
              opacity: dragging ? 1 : 0.8,
              transition: dragging ? "none" : "left 100ms ease, opacity 150ms ease",
            }}
          >
            {value}
          </div>
        )}
      </div>
    </div>
  );
}
