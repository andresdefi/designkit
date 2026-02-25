"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { MiniAppFrame } from "@/components/catalog/MiniAppFrame";
import { navigationStyles, NAVIGATION_GROUPS, NAVIGATION_META } from "@/data/navigation";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, NavigationStyleData } from "@/lib/types";

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

function resolveNavColor(val: string, colors: ColorMode): string {
  if (!val.includes("__")) return val;
  let resolved = val
    .replace(/__primary-(\d+)/g, (_, n) => hexToRgba(colors.primary, parseInt(n, 10) / 100))
    .replace(/__accent-(\d+)/g, (_, n) => hexToRgba(colors.accent, parseInt(n, 10) / 100))
    .replace(/__surface-(\d+)/g, (_, n) => hexToRgba(colors.surface.replace("#", "").length === 6 ? colors.surface : "#171717", parseInt(n, 10) / 100));
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
    .replace(/__background/g, colors.background)
    .replace(/__text/g, colors.text);
  return resolved;
}

function resolveCSS(cssRecord: Record<string, string>, colors: ColorMode): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    result[key] = resolveNavColor(val, colors);
  }
  return result as unknown as React.CSSProperties;
}

export default function NavigationPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.navigation;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("navigation");
    } else {
      select("navigation", id);
    }
  }

  return (
    <>
      <TopBar
        title="Navigation Bars"
        description="Top bars, mobile bottom tabs, and breadcrumbs — the structural elements that guide users through your app"
        itemCount={navigationStyles.length}
      />

      <CatalogGrid columns={3}>
        {NAVIGATION_GROUPS.map((group) => {
          const groupItems = navigationStyles.filter(
            (item) => NAVIGATION_META.find((m) => m.id === item.id)?.group === group
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

            ...groupItems.map((item) => (
              <NavPreviewCard
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

function NavPreviewCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof navigationStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
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
        {data.subtype === "topbar" && (
          <TopBarPreview data={data} colors={colors} hovered={hovered} />
        )}
        {data.subtype === "mobile-bottom" && (
          <MobileBottomPreview data={data} colors={colors} hovered={hovered} />
        )}
        {data.subtype === "breadcrumb" && (
          <BreadcrumbPreview data={data} colors={colors} />
        )}
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
            {data.subtype}
          </span>
          {data.position !== "static" && (
            <span
              className="text-[8px] font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: colors.accent + "14",
                color: colors.accent,
              }}
            >
              {data.position}
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

// ── Topbar subtype preview ──────────────────────────────

function TopBarPreview({
  data,
  colors,
  hovered,
}: {
  data: NavigationStyleData;
  colors: ColorMode;
  hovered: boolean;
}) {
  const navStyle = resolveCSS(data.css, colors);
  const isFilled = data.variant === "filled-solid";
  const isTransparent = data.variant === "transparent-overlay";
  const linkColor = isFilled ? colors.primaryForeground : colors.textSecondary;
  const textColor = isFilled ? colors.primaryForeground : colors.text;

  const topSlot = (
    <div style={navStyle}>
      {data.hasLogo && (
        <div className="flex items-center" style={{ gap: "6px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "3px",
              backgroundColor: isFilled ? colors.primaryForeground : colors.primary,
            }}
          />
          <span style={{ fontSize: "8px", fontWeight: 600, color: textColor }}>App</span>
        </div>
      )}
      {data.layout === "centered" && (
        <div className="flex items-center" style={{ gap: "12px" }}>
          {["Home", "About", "Blog"].map((link) => (
            <span key={link} style={{ fontSize: "7px", color: linkColor }}>{link}</span>
          ))}
        </div>
      )}
      {data.layout !== "centered" && (
        <div className="flex items-center" style={{ gap: "8px" }}>
          {data.layout.includes("center") && (
            <div className="flex items-center" style={{ gap: "10px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {["Features", "Pricing"].map((link) => (
                <span key={link} style={{ fontSize: "7px", color: linkColor }}>{link}</span>
              ))}
            </div>
          )}
          {!data.layout.includes("center") && (
            <div className="flex items-center" style={{ gap: "10px" }}>
              {["Features", "Pricing", "Docs"].map((link) => (
                <span key={link} style={{ fontSize: "7px", color: linkColor }}>{link}</span>
              ))}
            </div>
          )}
          {data.hasAvatar && (
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                backgroundColor: colors.accent,
                flexShrink: 0,
              }}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <MiniAppFrame
      colors={isTransparent ? { ...colors, background: colors.primary + "20" } : colors}
      topSlot={topSlot}
    />
  );
}

// ── Mobile bottom subtype preview ───────────────────────

function MobileBottomPreview({
  data,
  colors,
  hovered,
}: {
  data: NavigationStyleData;
  colors: ColorMode;
  hovered: boolean;
}) {
  const navStyle = resolveCSS(data.css, colors);
  const isFab = data.variant === "bottom-fab";
  const isPill = data.variant === "floating-pill";
  const isSheet = data.variant === "bottom-sheet";
  const isHamburger = data.variant === "hamburger";

  if (isHamburger) {
    const topSlot = (
      <div style={navStyle}>
        <div className="flex items-center" style={{ gap: "6px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "3px", backgroundColor: colors.primary }} />
          <span style={{ fontSize: "8px", fontWeight: 600, color: colors.text }}>App</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", cursor: "pointer" }}>
          <div style={{ width: "12px", height: "1.5px", backgroundColor: colors.text, borderRadius: "1px" }} />
          <div style={{ width: "12px", height: "1.5px", backgroundColor: colors.text, borderRadius: "1px" }} />
          <div style={{ width: "8px", height: "1.5px", backgroundColor: colors.text, borderRadius: "1px" }} />
        </div>
      </div>
    );
    return <MiniAppFrame colors={colors} topSlot={topSlot} />;
  }

  const icons = ["H", "S", isFab ? "+" : "N", "M", "P"];

  const bottomSlot = (
    <div style={{ position: "relative" }}>
      {isPill ? (
        <div style={{ padding: "8px 16px" }}>
          <div style={navStyle}>
            {icons.slice(0, 4).map((icon, i) => (
              <div key={i} className="flex flex-col items-center" style={{ gap: "2px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: i === 0 ? colors.primary : colors.textMuted + "40", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "6px", color: i === 0 ? colors.primaryForeground : colors.textMuted }}>{icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : isSheet ? (
        <div style={navStyle}>
          <div style={{ width: "32px", height: "3px", borderRadius: "2px", backgroundColor: colors.textMuted + "40", margin: "0 auto 8px" }} />
          <div className="flex flex-wrap" style={{ gap: "8px" }}>
            {["Home", "Search", "Notifications", "Profile"].map((label, i) => (
              <span key={label} style={{ fontSize: "7px", color: i === 0 ? colors.primary : colors.textSecondary, padding: "3px 8px", borderRadius: "6px", backgroundColor: i === 0 ? colors.primary + "14" : colors.surfaceAlt }}>{label}</span>
            ))}
          </div>
        </div>
      ) : (
        <div style={navStyle}>
          {icons.map((icon, i) => {
            const isCenter = isFab && i === 2;
            return (
              <div key={i} className="flex flex-col items-center" style={{ gap: "2px", position: isCenter ? "relative" : undefined }}>
                {isCenter ? (
                  <div style={{ width: "22px", height: "22px", borderRadius: "9999px", backgroundColor: colors.primary, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-12px", boxShadow: `0 2px 8px ${colors.primary}40` }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: colors.primaryForeground }}>+</span>
                  </div>
                ) : (
                  <>
                    <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: i === 0 ? colors.primary + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "6px", color: i === 0 ? colors.primary : colors.textMuted }}>{icon}</span>
                    </div>
                    <span style={{ fontSize: "5px", color: i === 0 ? colors.primary : colors.textMuted }}>{["Home", "Search", "", "Mail", "Me"][i]}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return <MiniAppFrame colors={colors} bottomSlot={bottomSlot} />;
}

// ── Breadcrumb subtype preview ──────────────────────────

function BreadcrumbPreview({
  data,
  colors,
}: {
  data: NavigationStyleData;
  colors: ColorMode;
}) {
  const separator =
    data.layout === "slash" ? "/" :
    data.layout === "chevron" ? "›" : "·";

  const crumbs = ["Home", "Products", "Details"];

  const topSlot = (
    <div style={{ ...resolveCSS(data.css, colors) }}>
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center" style={{ gap: data.css.gap }}>
          <span style={{ fontSize: "7px", color: i === crumbs.length - 1 ? colors.text : colors.textMuted }}>
            {crumb}
          </span>
          {i < crumbs.length - 1 && (
            <span style={{ fontSize: "7px", color: colors.textMuted }}>{separator}</span>
          )}
        </span>
      ))}
    </div>
  );

  return <MiniAppFrame colors={colors} topSlot={topSlot} height={120} />;
}
