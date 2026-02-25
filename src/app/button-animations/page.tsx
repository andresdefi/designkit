"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { buttonAnimationStyles, BUTTON_ANIMATION_GROUPS, BUTTON_ANIMATION_META } from "@/data/button-animations";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { AnimationData, ColorMode } from "@/lib/types";

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

export default function ButtonAnimationsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections["button-animations"];
  const colors = usePreviewColors();

  return (
    <>
      <TopBar
        title="Button Animations"
        description="Press effects, ripples, and click feedback"
        itemCount={buttonAnimationStyles.length}
      />
      <CatalogGrid columns={3}>
        {BUTTON_ANIMATION_GROUPS.map((group) => {
          const groupItems = buttonAnimationStyles.filter(
            (item) => BUTTON_ANIMATION_META.find((m) => m.id === item.id)?.group === group
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
              <ButtonAnimationCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                colors={colors}
                onSelect={(id) => {
                  if (selectedId === id) deselect("button-animations");
                  else select("button-animations", id);
                }}
              />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function ButtonAnimationCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: { id: string; name: string; description: string; data: AnimationData };
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const [playing, setPlaying] = useState(false);
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);

  const handlePlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (d.variant === "ripple") {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setPlaying(true);
    const dur = parseInt(d.duration) || 400;
    setTimeout(() => { setPlaying(false); setRipplePos(null); }, dur);
  };

  const getButtonAnimation = (): React.CSSProperties => {
    if (!playing) return {};
    switch (d.variant) {
      case "scale-down": return { transform: "scale(0.95)", transition: `transform ${d.duration} ${d.easing}` };
      case "bounce-press": return { animation: `dk-btn-bounce ${d.duration} ${d.easing}` };
      case "3d-push": return { animation: `dk-btn-3d-push ${d.duration} ${d.easing}` };
      case "color-flash": return { animation: `dk-btn-flash ${d.duration} ${d.easing}` };
      case "none": return {};
      default: return {};
    }
  };

  const isHoverType = d.trigger === "hover";

  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`group relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
        isSelected
          ? "border-blue-500 ring-1 ring-blue-500/30 bg-app-card-bg-selected"
          : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
      }`}
    >
      <style>{`
        @keyframes dk-btn-bounce {
          0% { transform: scale(1); }
          30% { transform: scale(0.92); }
          50% { transform: scale(1.02); }
          70% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
        @keyframes dk-btn-3d-push {
          0% { transform: perspective(500px) rotateX(0deg); }
          50% { transform: perspective(500px) rotateX(4deg) translateY(1px); }
          100% { transform: perspective(500px) rotateX(0deg); }
        }
        @keyframes dk-btn-flash {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes dk-btn-ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes dk-btn-glow-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 20px rgba(59,130,246,0.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[10px]">&#10003;</span>
        </div>
      )}
      <div className="p-4">
        <div
          className="rounded-lg overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "160px" }}
        >
          {/* Interactive demo button */}
          <div
            onClick={(e) => { e.stopPropagation(); if (!isHoverType) handlePlay(e); }}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "10px 28px",
              borderRadius: "8px",
              backgroundColor: colors.primary,
              color: colors.primaryForeground,
              fontSize: "13px",
              fontWeight: 600,
              cursor: d.variant === "none" ? "default" : "pointer",
              ...getButtonAnimation(),
              ...(isHoverType && !playing ? {} : {}),
            }}
            onMouseEnter={() => { if (isHoverType) setPlaying(true); }}
            onMouseLeave={() => { if (isHoverType) setPlaying(false); }}
            className={isHoverType && d.variant === "glow-pulse" && playing ? "" : ""}
          >
            {d.variant === "glow-pulse" && isHoverType && playing && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: "8px",
                animation: `dk-btn-glow-pulse 1.5s ease-in-out infinite`,
                pointerEvents: "none",
              }} />
            )}
            {d.variant === "ripple" && playing && ripplePos && (
              <span
                style={{
                  position: "absolute",
                  left: ripplePos.x,
                  top: ripplePos.y,
                  width: "20px",
                  height: "20px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  transform: "translate(-50%, -50%)",
                  animation: `dk-btn-ripple ${d.duration} ${d.easing} forwards`,
                  pointerEvents: "none",
                }}
              />
            )}
            {isHoverType ? "Hover me" : "Click me"}
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
            {d.trigger}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-app-text-muted truncate">{item.description}</span>
          <span className="text-[8px] text-app-text-muted font-mono shrink-0">{d.duration}</span>
        </div>
      </div>
    </button>
  );
}
