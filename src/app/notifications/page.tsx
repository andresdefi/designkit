"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { notificationStyles, NOTIFICATION_GROUPS, NOTIFICATION_META } from "@/data/notifications";
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

function getSemanticColor(colors: ColorMode, semantic: string): string {
  switch (semantic) {
    case "success": return colors.semantic.success;
    case "warning": return colors.semantic.warning;
    case "error": return colors.semantic.error;
    case "info": return colors.semantic.info;
    default: return colors.textSecondary;
  }
}

export default function NotificationsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.notifications;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("notifications");
    else select("notifications", id);
  }

  return (
    <>
      <TopBar
        title="Notifications"
        description="Toasts, banners, alerts, and permission prompts"
        itemCount={notificationStyles.length}
      />
      <CatalogGrid columns={3}>
        {NOTIFICATION_GROUPS.map((group) => {
          const groupItems = notificationStyles.filter(
            (item) => NOTIFICATION_META.find((m) => m.id === item.id)?.group === group
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
              <NotificationCard
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

function NotificationCard({
  item,
  isSelected,
  colors,
  onSelect,
}: {
  item: (typeof notificationStyles)[number];
  isSelected: boolean;
  colors: ColorMode;
  onSelect: (id: string) => void;
}) {
  const d = item.data;
  const semColor = getSemanticColor(colors, d.semanticColor);
  const isPermission = d.subtype.startsWith("permission-");

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
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, height: "200px", position: "relative" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 shrink-0" style={{ height: "14px", backgroundColor: colors.surface }}>
            <div style={{ width: "14px", height: "4px", borderRadius: "2px", backgroundColor: colors.textMuted, opacity: 0.4 }} />
            <div className="flex gap-1">
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
              <div style={{ width: "8px", height: "4px", borderRadius: "1px", backgroundColor: colors.textMuted, opacity: 0.3 }} />
            </div>
          </div>

          {/* Background content lines — simulates app content behind notification */}
          <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {[0.7, 0.9, 0.6, 0.8, 0.5, 0.7].map((w, i) => (
              <div key={i} style={{
                width: `${w * 100}%`, height: "6px", borderRadius: "3px",
                backgroundColor: colors.textMuted, opacity: 0.06,
              }} />
            ))}
          </div>

          {/* Notification overlay */}
          {/* Toast (top or bottom) */}
          {d.subtype === "toast" && (
            <div style={{
              position: "absolute",
              ...(d.position === "top" ? { top: "20px" } : { bottom: "8px" }),
              left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 10px", borderRadius: "6px",
              backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
              boxShadow: `0 2px 8px ${hexToRgba(colors.text, 0.08)}`,
              maxWidth: "85%",
            }}>
              {d.hasIcon && (
                <div style={{ width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: hexToRgba(semColor, 0.2), flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "9999px", backgroundColor: semColor }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ width: "48px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.text, opacity: 0.25 }} />
              </div>
              {d.hasCloseButton && (
                <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: colors.textMuted, opacity: 0.2, flexShrink: 0 }} />
              )}
              {/* Auto-dismiss progress bar */}
              {d.isAutoDismiss && d.variant === "dismissable-auto" && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", borderRadius: "0 0 6px 6px", overflow: "hidden",
                }}>
                  <div style={{ width: "60%", height: "100%", backgroundColor: semColor, opacity: 0.5 }} />
                </div>
              )}
            </div>
          )}

          {/* Floating notification */}
          {d.subtype === "floating" && (
            <div style={{
              position: "absolute", top: "20px", right: "6px",
              display: "flex", flexDirection: "column", gap: "3px",
              padding: "8px 10px", borderRadius: "8px",
              backgroundColor: colors.surface, border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${hexToRgba(colors.text, 0.1)}`,
              width: "110px",
            }}>
              {d.hasIcon && (
                <div style={{ width: "14px", height: "14px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.12), marginBottom: "2px" }} />
              )}
              <div style={{ width: "70px", height: "4px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.2 }} />
              <div style={{ width: "50px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
              {d.hasAction && (
                <div style={{ width: "36px", height: "10px", borderRadius: "3px", backgroundColor: colors.primary, marginTop: "2px" }} />
              )}
              {d.hasCloseButton && (
                <div style={{ position: "absolute", top: "5px", right: "5px", width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: colors.textMuted, opacity: 0.2 }} />
              )}
            </div>
          )}

          {/* Banner */}
          {d.subtype === "banner" && (
            <div style={{
              position: "absolute", top: "14px", left: 0, right: 0,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              padding: "5px 10px",
              backgroundColor: hexToRgba(semColor, 0.1),
              borderBottom: `1px solid ${hexToRgba(semColor, 0.15)}`,
            }}>
              <div style={{ width: "60px", height: "3px", borderRadius: "1.5px", backgroundColor: semColor, opacity: 0.5 }} />
              {d.hasAction && (
                <div style={{ width: "28px", height: "8px", borderRadius: "3px", backgroundColor: semColor, opacity: 0.3 }} />
              )}
              {d.hasCloseButton && (
                <div style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: semColor, opacity: 0.2, position: "absolute", right: "8px" }} />
              )}
            </div>
          )}

          {/* Inline alert */}
          {d.subtype === "inline-alert" && (
            <div style={{
              position: "absolute", top: "50%", left: "8px", right: "8px",
              transform: "translateY(-50%)",
              display: "flex", alignItems: "flex-start", gap: "6px",
              padding: "8px 10px", borderRadius: "6px",
              backgroundColor: hexToRgba(semColor, 0.08),
              borderLeft: `2px solid ${semColor}`,
            }}>
              {d.hasIcon && (
                <div style={{ width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: hexToRgba(semColor, 0.2), flexShrink: 0 }} />
              )}
              <div>
                <div style={{ width: "48px", height: "3px", borderRadius: "1.5px", backgroundColor: semColor, opacity: 0.5, marginBottom: "3px" }} />
                <div style={{ width: "70px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.2 }} />
              </div>
              {d.hasCloseButton && (
                <div style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: colors.textMuted, opacity: 0.2, marginLeft: "auto", flexShrink: 0 }} />
              )}
            </div>
          )}

          {/* Snackbar */}
          {d.subtype === "snackbar" && (
            <div style={{
              position: "absolute", bottom: "8px", left: "8px", right: "8px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
              padding: "7px 10px", borderRadius: "6px",
              backgroundColor: colors.text, color: colors.background,
            }}>
              <div style={{ width: "60px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.background, opacity: 0.5 }} />
              {d.hasAction && (
                <div style={{ fontSize: "7px", fontWeight: 600, color: colors.primary, flexShrink: 0 }}>
                  <div style={{ width: "24px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.primary }} />
                </div>
              )}
            </div>
          )}

          {/* Permission bottom sheet */}
          {d.subtype === "permission-sheet" && (
            <>
              <div style={{ position: "absolute", inset: 0, top: "14px", backgroundColor: hexToRgba(colors.text, 0.3) }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                backgroundColor: colors.surface, borderRadius: "10px 10px 0 0",
                padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              }}>
                <div style={{ width: "24px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.3, marginBottom: "2px" }} />
                {d.hasIcon && <div style={{ width: "20px", height: "20px", borderRadius: "9999px", backgroundColor: hexToRgba(colors.primary, 0.12) }} />}
                <div style={{ width: "56px", height: "4px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.2 }} />
                <div style={{ width: "80px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
                <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                  <div style={{ width: "40px", height: "12px", borderRadius: "4px", backgroundColor: colors.primary }} />
                  <div style={{ width: "32px", height: "12px", borderRadius: "4px", border: `1px solid ${colors.border}` }} />
                </div>
              </div>
            </>
          )}

          {/* Permission modal */}
          {d.subtype === "permission-modal" && (
            <>
              <div style={{ position: "absolute", inset: 0, top: "14px", backgroundColor: hexToRgba(colors.text, 0.3) }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                backgroundColor: colors.surface, borderRadius: "8px", border: `1px solid ${colors.border}`,
                padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
                width: "120px",
              }}>
                {d.hasIcon && <div style={{ width: "20px", height: "20px", borderRadius: "9999px", backgroundColor: hexToRgba(colors.primary, 0.12) }} />}
                <div style={{ width: "56px", height: "4px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.2 }} />
                <div style={{ width: "80px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
                <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                  <div style={{ width: "36px", height: "12px", borderRadius: "4px", backgroundColor: colors.primary }} />
                  <div style={{ width: "28px", height: "12px", borderRadius: "4px", border: `1px solid ${colors.border}` }} />
                </div>
              </div>
            </>
          )}

          {/* Permission inline banner */}
          {d.subtype === "permission-banner" && (
            <div style={{
              position: "absolute", top: "50%", left: "8px", right: "8px",
              transform: "translateY(-50%)",
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 10px", borderRadius: "6px",
              backgroundColor: hexToRgba(colors.primary, 0.06),
              border: `1px solid ${hexToRgba(colors.primary, 0.12)}`,
            }}>
              {d.hasIcon && <div style={{ width: "14px", height: "14px", borderRadius: "4px", backgroundColor: hexToRgba(colors.primary, 0.15), flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ width: "40px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.text, opacity: 0.2, marginBottom: "2px" }} />
                <div style={{ width: "60px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
              </div>
              <div style={{ width: "30px", height: "10px", borderRadius: "3px", backgroundColor: colors.primary, flexShrink: 0 }} />
            </div>
          )}

          {/* Permission fullscreen */}
          {d.subtype === "permission-fullscreen" && (
            <div style={{
              position: "absolute", inset: 0, top: "14px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px",
              backgroundColor: colors.background, padding: "16px",
            }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "9999px", background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.15)}, ${hexToRgba(colors.accent, 0.15)})` }} />
              <div style={{ width: "60px", height: "4px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.2 }} />
              <div style={{ width: "90px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
              <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                <div style={{ width: "44px", height: "14px", borderRadius: "4px", backgroundColor: colors.primary }} />
              </div>
            </div>
          )}

          {/* Permission pre-primer */}
          {d.subtype === "permission-primer" && (
            <>
              <div style={{ position: "absolute", inset: 0, top: "14px", backgroundColor: hexToRgba(colors.text, 0.3) }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                backgroundColor: colors.surface, borderRadius: "8px", border: `1px solid ${colors.border}`,
                padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                width: "110px",
              }}>
                {d.hasIcon && <div style={{ width: "18px", height: "18px", borderRadius: "9999px", backgroundColor: hexToRgba(colors.primary, 0.12) }} />}
                <div style={{ width: "48px", height: "4px", borderRadius: "2px", backgroundColor: colors.text, opacity: 0.2 }} />
                <div style={{ width: "72px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.15 }} />
                <div style={{ width: "72px", height: "3px", borderRadius: "1.5px", backgroundColor: colors.textMuted, opacity: 0.1 }} />
                <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                  <div style={{ width: "36px", height: "12px", borderRadius: "4px", backgroundColor: colors.primary }} />
                  <div style={{ width: "28px", height: "12px", borderRadius: "4px", border: `1px solid ${colors.border}` }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: isPermission ? colors.accent + "14" : semColor + "14",
              color: isPermission ? colors.accent : semColor,
            }}
          >
            {d.position}
          </span>
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
          {item.description}
        </div>
      </div>
    </button>
  );
}
