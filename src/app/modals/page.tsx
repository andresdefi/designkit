"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { modalStyles, MODAL_GROUPS, MODAL_META } from "@/data/modals";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode, ModalStyleData } from "@/lib/types";

function usePreviewColors(): ColorMode {
  const { colorPicks, colorMode, selections } = useDesignKit();
  const mode = colorMode as "light" | "dark";
  const picks = colorPicks[mode];
  const palette = colorPalettes.find((p) => p.id === selections.colors);
  const base = palette?.data[mode];
  const get = (key: string) => picks[key] ?? (base as unknown as Record<string, string>)?.[key] ?? undefined;
  const getSemantic = (key: string) => picks[`semantic.${key}`] ?? base?.semantic[key as keyof typeof base.semantic];
  return {
    background: get("background") ?? "#0a0a0a", surface: get("surface") ?? "#171717",
    surfaceAlt: get("surfaceAlt") ?? "#1a1a1a", border: get("border") ?? "#262626",
    text: get("text") ?? "#f5f5f5", textSecondary: get("textSecondary") ?? "#a3a3a3",
    textMuted: get("textMuted") ?? "#525252", primary: get("primary") ?? "#3b82f6",
    primaryForeground: get("primaryForeground") ?? "#ffffff", secondary: get("secondary") ?? "#262626",
    secondaryForeground: get("secondaryForeground") ?? "#f5f5f5", accent: get("accent") ?? "#8b5cf6",
    accentForeground: get("accentForeground") ?? "#ffffff",
    semantic: { success: getSemantic("success") ?? "#22c55e", warning: getSemantic("warning") ?? "#eab308", error: getSemantic("error") ?? "#ef4444", info: getSemantic("info") ?? "#3b82f6" },
  };
}

function resolveColor(val: string, colors: ColorMode): string {
  if (!val.includes("__")) return val;
  return val
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
}

function resolveCSS(cssRecord: Record<string, string>, colors: ColorMode): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssRecord)) {
    if (key.startsWith("__")) continue;
    result[key] = resolveColor(val, colors);
  }
  return result as unknown as React.CSSProperties;
}

export default function ModalsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.modals;
  const colors = usePreviewColors();

  function handleSelect(id: string) {
    if (selectedId === id) deselect("modals");
    else select("modals", id);
  }

  return (
    <>
      <TopBar
        title="Modals & Sheets"
        description="Overlays, dialogs, drawers, and transient UI — center dialogs, bottom sheets, side drawers, popovers, and toasts"
        itemCount={modalStyles.length}
      />
      <CatalogGrid columns={3}>
        {MODAL_GROUPS.map((group) => {
          const groupItems = modalStyles.filter(
            (item) => MODAL_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;
          return [
            <div key={`header-${group}`} className="col-span-full mt-2 first:mt-0">
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">{groupItems.length} style{groupItems.length !== 1 ? "s" : ""}</p>
            </div>,
            ...groupItems.map((item) => (
              <ModalPreviewCard key={item.id} item={item} isSelected={selectedId === item.id} colors={colors} onSelect={handleSelect} />
            )),
          ];
        })}
      </CatalogGrid>
    </>
  );
}

function ModalPreviewCard({
  item, isSelected, colors, onSelect,
}: {
  item: (typeof modalStyles)[number]; isSelected: boolean; colors: ColorMode; onSelect: (id: string) => void;
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
        <ModalMiniPreview data={data} colors={colors} />
      </div>
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-app-text">{item.name}</span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.primary + "14", color: colors.primary }}>
            {data.subtype}
          </span>
          {data.hasOverlay && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.accent + "14", color: colors.accent }}>overlay</span>
          )}
        </div>
        <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{item.description}</div>
      </div>
    </button>
  );
}

function ModalMiniPreview({ data, colors }: { data: ModalStyleData; colors: ColorMode }) {
  const overlayStyle = resolveCSS(data.css, colors);
  const panelStyle = resolveCSS(data.panelCss, colors);

  // The mini app screen
  return (
    <div style={{
      width: "100%", height: "160px", borderRadius: "8px",
      border: `1px solid ${colors.border}`, backgroundColor: colors.background,
      overflow: "hidden", position: "relative",
    }}>
      {/* Placeholder content behind */}
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ height: "4px", width: "60%", borderRadius: "2px", backgroundColor: colors.textMuted + "25" }} />
        <div style={{ height: "4px", width: "40%", borderRadius: "2px", backgroundColor: colors.textMuted + "18" }} />
        <div style={{ height: "4px", width: "50%", borderRadius: "2px", backgroundColor: colors.textMuted + "15" }} />
      </div>

      {/* Overlay + Panel */}
      {data.subtype === "center" && (
        <div style={{ ...overlayStyle, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...panelStyle, maxWidth: "140px", padding: "10px" }}>
            <div style={{ fontSize: "7px", fontWeight: 600, color: colors.text, marginBottom: "4px" }}>Confirm action</div>
            <div style={{ fontSize: "5px", color: colors.textMuted, marginBottom: "6px" }}>Are you sure?</div>
            <div style={{ display: "flex", gap: "4px" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "2px", borderRadius: "3px", fontSize: "5px", backgroundColor: colors.primary, color: colors.primaryForeground }}>Confirm</div>
              <div style={{ flex: 1, textAlign: "center", padding: "2px", borderRadius: "3px", fontSize: "5px", border: `1px solid ${colors.border}`, color: colors.textSecondary }}>Cancel</div>
            </div>
          </div>
        </div>
      )}

      {data.subtype === "command" && (
        <div style={{ ...overlayStyle, position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "16px" }}>
          <div style={{ ...panelStyle, maxWidth: "160px" }}>
            <div style={{ padding: "8px 10px", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: "5px", color: colors.textMuted }}>Type a command...</div>
            </div>
            <div style={{ padding: "4px" }}>
              {["Search files", "Open settings", "New document"].map((cmd) => (
                <div key={cmd} style={{ padding: "3px 6px", borderRadius: "3px", fontSize: "5px", color: colors.textSecondary }}>
                  {cmd}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {data.subtype === "fullscreen" && (
        <div style={{ ...overlayStyle, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...panelStyle, position: "absolute", inset: "4px", borderRadius: "4px", display: "flex", flexDirection: "column", padding: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "7px", fontWeight: 600, color: colors.text }}>Full Screen</span>
              <span style={{ fontSize: "8px", color: colors.textMuted, cursor: "pointer" }}>x</span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center" }}>
              <div style={{ height: "3px", width: "60%", borderRadius: "2px", backgroundColor: colors.textMuted + "20" }} />
              <div style={{ height: "3px", width: "45%", borderRadius: "2px", backgroundColor: colors.textMuted + "15" }} />
            </div>
          </div>
        </div>
      )}

      {data.subtype === "bottom-sheet" && (
        <div style={{ ...overlayStyle, position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
          <div style={{ ...panelStyle, width: "100%", padding: "8px 12px" }}>
            <div style={{ width: "24px", height: "3px", borderRadius: "2px", backgroundColor: colors.textMuted + "40", margin: "0 auto 6px" }} />
            <div style={{ fontSize: "7px", fontWeight: 600, color: colors.text, marginBottom: "4px" }}>Sheet Title</div>
            <div style={{ fontSize: "5px", color: colors.textMuted }}>Content slides up from bottom</div>
          </div>
        </div>
      )}

      {data.subtype === "drawer" && (
        <div style={{ ...overlayStyle, position: "absolute", inset: 0, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ ...panelStyle, width: "100px", height: "100%", padding: "10px" }}>
            <div style={{ fontSize: "7px", fontWeight: 600, color: colors.text, marginBottom: "6px" }}>Details</div>
            <div style={{ fontSize: "5px", color: colors.textMuted, marginBottom: "3px" }}>Field 1</div>
            <div style={{ fontSize: "5px", color: colors.textMuted, marginBottom: "3px" }}>Field 2</div>
            <div style={{ fontSize: "5px", color: colors.textMuted }}>Field 3</div>
          </div>
        </div>
      )}

      {data.subtype === "popover" && (
        <div style={{ position: "absolute", top: "28px", left: "12px" }}>
          <div style={panelStyle}>
            {["Edit", "Duplicate", "Delete"].map((action) => (
              <div key={action} style={{ padding: "3px 8px", borderRadius: "3px", fontSize: "5px", color: action === "Delete" ? colors.semantic.error : colors.textSecondary }}>
                {action}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.subtype === "toast" && (
        <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
          <div style={{ ...panelStyle, display: "flex", alignItems: "center", gap: "6px", padding: "6px 10px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: colors.semantic.success }} />
            <span style={{ fontSize: "5px", color: colors.text }}>Changes saved</span>
          </div>
        </div>
      )}
    </div>
  );
}
