"use client";

import { useMemo, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { useDesignKit } from "@/lib/store";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import {
  TYPE_SCALE_PRESETS,
  generateTypeScale,
  getPresetByIdOrDefault,
} from "@/lib/typography-utils";
import {
  getTypographyItems,
  getAllFontUrls,
  getFontUrlsForPairing,
  FONT_PAIRINGS,
  TYPOGRAPHY_GROUPS,
} from "@/data/typography";

const SCALE_SPECIMEN_STEPS = [
  { key: "h1", label: "H1" },
  { key: "h2", label: "H2" },
  { key: "h3", label: "H3" },
  { key: "h4", label: "H4" },
  { key: "h5", label: "H5" },
  { key: "h6", label: "H6" },
  { key: "body", label: "Body" },
  { key: "bodySmall", label: "Body Small" },
  { key: "caption", label: "Caption" },
  { key: "overline", label: "Overline" },
  { key: "button", label: "Button" },
] as const;

export default function TypographyPage() {
  const { typeScale, setTypeScale, selections, select, deselect } =
    useDesignKit();
  const [specimenOpen, setSpecimenOpen] = useState(false);

  // Load all fonts on mount
  const fontUrls = useMemo(() => getAllFontUrls(), []);
  useGoogleFonts(fontUrls);

  // Also load the selected pairing's fonts specifically (ensures priority)
  const selectedFontUrls = useMemo(
    () => (selections.typography ? getFontUrlsForPairing(selections.typography) : []),
    [selections.typography]
  );
  useGoogleFonts(selectedFontUrls);

  const items = useMemo(() => getTypographyItems(typeScale), [typeScale]);
  const selectedId = selections.typography;
  const selectedPairing = FONT_PAIRINGS.find((p) => p.id === selectedId);

  // Compute the scale for the specimen
  const preset = getPresetByIdOrDefault(typeScale);
  const specimenScale = useMemo(
    () =>
      generateTypeScale(
        16,
        preset.ratio,
        selectedPairing?.headingWeight ?? 700,
        selectedPairing?.bodyWeight ?? 400
      ),
    [preset.ratio, selectedPairing?.headingWeight, selectedPairing?.bodyWeight]
  );

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("typography");
    } else {
      select("typography", id);
    }
  }

  return (
    <>
      <TopBar
        title="Typography"
        description="Browse font pairings — select one for your design system"
        itemCount={FONT_PAIRINGS.length}
      />

      {/* Type scale selector */}
      <div className="px-6 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted mr-1">
            Type Scale
          </span>
          <div className="flex bg-app-card-bg rounded-lg p-0.5">
            {TYPE_SCALE_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setTypeScale(p.id)}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                  typeScale === p.id
                    ? "bg-app-border-hover text-app-text font-medium"
                    : "text-app-text-secondary hover:text-app-text"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-app-text-muted ml-2">
            {preset.ratio}
          </span>
          <button
            onClick={() => setSpecimenOpen(!specimenOpen)}
            className="text-[10px] text-app-text-secondary hover:text-blue-400 transition-colors ml-auto"
          >
            {specimenOpen ? "Hide scale" : "Show scale"}
          </button>
        </div>
      </div>

      {/* Type scale specimen — collapsible */}
      {specimenOpen && (
        <div className="mx-6 mt-3 rounded-xl border border-app-border bg-app-card-bg overflow-hidden">
          <div className="px-4 py-3 border-b border-app-border/50">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted">
              Type Scale Specimen
              {selectedPairing && (
                <span className="normal-case tracking-normal font-normal ml-2">
                  — {selectedPairing.name}
                </span>
              )}
            </h3>
          </div>
          <div className="divide-y divide-app-border/30">
            {SCALE_SPECIMEN_STEPS.map(({ key, label }) => {
              const step = specimenScale[key];
              const isHeading = key.startsWith("h");
              const isOverline = key === "overline";
              const fontFamily = selectedPairing
                ? isHeading
                  ? `'${selectedPairing.headingFont}', sans-serif`
                  : `'${selectedPairing.bodyFont}', sans-serif`
                : undefined;

              return (
                <div
                  key={key}
                  className="flex items-baseline gap-4 px-4 py-2.5"
                >
                  {/* Label + meta */}
                  <div className="w-24 shrink-0">
                    <div className="text-[10px] font-medium text-app-text-secondary">
                      {label}
                    </div>
                    <div className="text-[9px] font-mono text-app-text-muted">
                      {step.size} / {step.lineHeight}
                    </div>
                  </div>

                  {/* Sample text */}
                  <div
                    className="flex-1 text-app-text truncate"
                    style={{
                      fontFamily,
                      fontSize: step.size,
                      lineHeight: step.lineHeight,
                      fontWeight: step.weight,
                      letterSpacing: step.letterSpacing,
                      textTransform: isOverline ? "uppercase" : undefined,
                    }}
                  >
                    {isHeading
                      ? "Design with purpose"
                      : key === "button"
                        ? "Get Started"
                        : key === "overline"
                          ? "Category"
                          : "The quick brown fox jumps over the lazy dog"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grouped grid */}
      <CatalogGrid columns={3}>
        {TYPOGRAPHY_GROUPS.map((group) => {
          const groupItems = items.filter(
            (item) =>
              FONT_PAIRINGS.find((p) => p.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;

          return [
            <div
              key={`header-${group}`}
              className="col-span-full mt-2 first:mt-0"
            >
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">
                {groupItems.length} pairing{groupItems.length !== 1 ? "s" : ""}
              </p>
            </div>,

            ...groupItems.map((item) => {
              const isSelected = selectedId === item.id;
              const pairing = FONT_PAIRINGS.find((p) => p.id === item.id)!;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`group relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
                    isSelected
                      ? "border-blue-500 ring-1 ring-blue-500/30 bg-app-card-bg-selected"
                      : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                  )}

                  <div className="p-4 space-y-3">
                    <div
                      className="text-lg font-bold leading-tight text-app-text"
                      style={{
                        fontFamily: `'${pairing.headingFont}', sans-serif`,
                        fontWeight: pairing.headingWeight,
                      }}
                    >
                      Design with purpose
                    </div>

                    <div
                      className="text-xs leading-relaxed text-app-text-secondary"
                      style={{
                        fontFamily: `'${pairing.bodyFont}', sans-serif`,
                        fontWeight: pairing.bodyWeight,
                      }}
                    >
                      Great typography creates visual hierarchy and guides
                      the reader through content naturally. Every font
                      choice shapes how your message feels.
                    </div>

                    {pairing.monoFont && (
                      <div
                        className="text-[10px] leading-relaxed text-app-text-muted bg-app-surface rounded-md px-2 py-1.5 font-mono"
                        style={{
                          fontFamily: `'${pairing.monoFont}', monospace`,
                        }}
                      >
                        {"const theme = { font: '" +
                          pairing.headingFont.split(",")[0].replace(/'/g, "").trim() +
                          "' }"}
                      </div>
                    )}
                  </div>

                  <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
                    <div className="text-xs font-medium text-app-text">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            }),
          ];
        })}
      </CatalogGrid>
    </>
  );
}
