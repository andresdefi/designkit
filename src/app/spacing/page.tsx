"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { spacingSystems } from "@/data/spacing";
import { useDesignKit } from "@/lib/store";

/** First N scale entries to show in the bar preview */
const PREVIEW_STEPS = 8;

export default function SpacingPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.spacing;

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("spacing");
    } else {
      select("spacing", id);
    }
  }

  return (
    <>
      <TopBar
        title="Spacing"
        description="Spacing scales and density systems — select one for your design"
        itemCount={spacingSystems.length}
      />

      <CatalogGrid columns={3}>
        {spacingSystems.map((item) => {
          const isSelected = selectedId === item.id;
          const scaleEntries = Object.entries(item.data.scale);
          const previewEntries = scaleEntries.slice(0, PREVIEW_STEPS);
          const maxPx = Math.max(
            ...previewEntries.map(([, v]) => parseFloat(v) || 0),
            1
          );

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
                {/* Scale ruler — proportional bars */}
                <div className="space-y-1.5">
                  {previewEntries.map(([key, value]) => {
                    const px = parseFloat(value) || 0;
                    const pct = maxPx > 0 ? (px / maxPx) * 100 : 0;
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-[8px] font-mono text-app-text-muted w-6 text-right shrink-0">
                          {key}
                        </span>
                        <div className="flex-1 h-2.5 bg-app-surface rounded-sm overflow-hidden">
                          <div
                            className={`h-full rounded-sm transition-all ${
                              isSelected ? "bg-blue-500/60" : "bg-app-text-muted/25"
                            }`}
                            style={{ width: `${Math.max(pct, 2)}%` }}
                          />
                        </div>
                        <span className="text-[8px] font-mono text-app-text-muted w-8 shrink-0">
                          {value.startsWith("clamp") ? "fluid" : value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Mini layout density demo */}
                <div className="flex items-end gap-[2px] pt-1 border-t border-app-border/30">
                  {[1, 2, 3, 4, 3].map((h, i) => (
                    <div
                      key={i}
                      className={`rounded-[2px] flex-1 transition-colors ${
                        isSelected ? "bg-blue-500/30" : "bg-app-text-muted/15"
                      }`}
                      style={{
                        height: `${h * (item.data.baseUnit <= 4 ? 4 : item.data.baseUnit <= 8 ? 3 : 2.5)}px`,
                        marginTop: `${Math.min(item.data.baseUnit, 8)}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
                <div className="flex items-baseline justify-between">
                  <div className="text-xs font-medium text-app-text">{item.name}</div>
                  <div className="text-[9px] font-mono text-app-text-muted">
                    {item.data.baseUnit}px base
                  </div>
                </div>
                <div className="text-[10px] text-app-text-muted mt-0.5 truncate">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </CatalogGrid>
    </>
  );
}
