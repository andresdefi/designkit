"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { colorPalettes } from "@/data/colors";
import { useDesignKit } from "@/lib/store";
import type { ColorMode } from "@/lib/types";

// All pickable color keys with labels
const COLOR_KEYS: { key: keyof ColorMode; label: string; short: string }[] = [
  { key: "background", label: "Background", short: "BG" },
  { key: "surface", label: "Surface", short: "Srf" },
  { key: "border", label: "Border", short: "Bdr" },
  { key: "primary", label: "Primary", short: "Pri" },
  { key: "secondary", label: "Secondary", short: "Sec" },
  { key: "accent", label: "Accent", short: "Acc" },
  { key: "text", label: "Text", short: "Txt" },
  { key: "textMuted", label: "Muted", short: "Mut" },
];

const SEMANTIC_KEYS = [
  { key: "success", label: "Success", short: "OK" },
  { key: "warning", label: "Warning", short: "Wrn" },
  { key: "error", label: "Error", short: "Err" },
  { key: "info", label: "Info", short: "Inf" },
];

export default function ColorsPage() {
  const {
    colorMode,
    selections,
    colorPicks,
    pickColor,
    unpickColor,
    select,
    deselect,
    resetColorPicks,
  } = useDesignKit();

  const mode = colorMode as "light" | "dark";
  const picks = colorPicks[mode];
  const pickCount = Object.keys(picks).length;

  // Select all colors from a palette
  function selectFullPalette(paletteId: string) {
    const palette = colorPalettes.find((p) => p.id === paletteId);
    if (!palette) return;

    const colors = palette.data[mode];

    // If this palette is already fully selected, deselect
    if (selections.colors === paletteId) {
      deselect("colors");
      resetColorPicks();
      return;
    }

    select("colors", paletteId);

    // Fill all color picks from this palette
    for (const { key } of COLOR_KEYS) {
      pickColor(mode, key, colors[key] as string);
    }
    for (const { key } of SEMANTIC_KEYS) {
      pickColor(mode, `semantic.${key}`, colors.semantic[key as keyof typeof colors.semantic]);
    }
  }

  // Pick a single color from a palette
  function pickSingleColor(key: string, value: string) {
    // If this color is already picked with this exact value, unpick it
    if (picks[key] === value) {
      unpickColor(mode, key);
    } else {
      pickColor(mode, key, value);
    }
  }

  return (
    <>
      <TopBar
        title="Color Palettes"
        description="Click a swatch to pick individual colors, or the card to select all"
        itemCount={colorPalettes.length}
      />

      {/* Your assembled palette summary */}
      {pickCount > 0 && (
        <div className="mx-6 mt-4 rounded-xl border border-app-border bg-app-card-bg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-app-text">
              Your Palette
              <span className="ml-2 text-app-text-muted font-normal">
                {pickCount} color{pickCount !== 1 ? "s" : ""} — {mode} mode
              </span>
            </h3>
            <button
              onClick={resetColorPicks}
              className="text-[10px] text-app-text-muted hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...COLOR_KEYS, ...SEMANTIC_KEYS.map((s) => ({ ...s, key: `semantic.${s.key}` as keyof ColorMode }))].map(
              ({ key, label }) => {
                const k = key as string;
                const value = picks[k];
                if (!value) return null;
                return (
                  <div key={k} className="flex items-center gap-1.5 group">
                    <div
                      className="w-6 h-6 rounded-md border border-app-border/50"
                      style={{ backgroundColor: value }}
                    />
                    <div className="text-[10px]">
                      <div className="text-app-text-secondary">{label}</div>
                      <div className="font-mono text-app-text-muted">{value.toUpperCase()}</div>
                    </div>
                    <button
                      onClick={() => unpickColor(mode, k)}
                      className="text-[9px] text-app-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 ml-0.5"
                    >
                      ✕
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Palette grid */}
      <CatalogGrid columns={3}>
        {colorPalettes.map((palette) => {
          const colors = palette.data[mode];
          const isFullySelected = selections.colors === palette.id;

          return (
            <div
              key={palette.id}
              className={`relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
                isFullySelected
                  ? "border-blue-500 ring-1 ring-blue-500/30 bg-app-card-bg-selected"
                  : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
              }`}
            >
              {/* Selection indicator */}
              {isFullySelected && (
                <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px]">✓</span>
                </div>
              )}

              {/* Swatches — each individually clickable */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-1.5 w-full">
                  {COLOR_KEYS.map(({ key, short }) => {
                    const value = colors[key] as string;
                    const isPicked = picks[key] === value;
                    return (
                      <button
                        key={key}
                        onClick={() => pickSingleColor(key, value)}
                        className="flex flex-col items-center gap-1 group/swatch"
                        title={`Pick ${short}: ${value}`}
                      >
                        <div
                          className={`w-full aspect-square rounded-md border transition-all ${
                            isPicked
                              ? "border-blue-500 ring-2 ring-blue-500/40 scale-105"
                              : "border-app-border/30 hover:border-app-border-hover hover:scale-105"
                          }`}
                          style={{ backgroundColor: value }}
                        />
                        <span className={`text-[8px] transition-colors ${
                          isPicked ? "text-blue-400 font-semibold" : "text-app-text-muted"
                        }`}>
                          {short}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Semantic colors */}
                <div className="flex gap-1 mt-2">
                  {SEMANTIC_KEYS.map(({ key, short }) => {
                    const value = colors.semantic[key as keyof typeof colors.semantic];
                    const pickKey = `semantic.${key}`;
                    const isPicked = picks[pickKey] === value;
                    return (
                      <button
                        key={key}
                        onClick={() => pickSingleColor(pickKey, value)}
                        className="flex items-center gap-1 group/swatch"
                        title={`Pick ${short}: ${value}`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-all ${
                            isPicked
                              ? "ring-2 ring-blue-500/40 scale-110"
                              : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: value }}
                        />
                        <span className={`text-[8px] transition-colors ${
                          isPicked ? "text-blue-400 font-semibold" : "text-app-text-muted"
                        }`}>
                          {short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card label — clicking here selects the full palette */}
              <button
                onClick={() => selectFullPalette(palette.id)}
                className="w-full px-4 pb-3 pt-1 border-t border-app-border/50 text-left hover:bg-app-card-bg-hover transition-colors"
              >
                <div className="text-xs font-medium text-app-text">{palette.name}</div>
                <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
                  {palette.description} — click to select all
                </div>
              </button>
            </div>
          );
        })}
      </CatalogGrid>
    </>
  );
}
