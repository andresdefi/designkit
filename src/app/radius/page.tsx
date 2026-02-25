"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { radiusSystems } from "@/data/radius";
import { useDesignKit } from "@/lib/store";

const SIZE_STEPS = ["sm", "md", "lg", "xl", "2xl"] as const;

const COMPONENT_SHAPES: { key: keyof typeof radiusSystems[0]["data"]; label: string; w: string; h: string }[] = [
  { key: "button", label: "Button", w: "w-full", h: "h-7" },
  { key: "card", label: "Card", w: "w-full", h: "h-10" },
  { key: "input", label: "Input", w: "w-full", h: "h-7" },
  { key: "badge", label: "Badge", w: "w-10", h: "h-5" },
];

export default function RadiusPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.radius;

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("radius");
    } else {
      select("radius", id);
    }
  }

  return (
    <>
      <TopBar
        title="Border Radius"
        description="Corner rounding philosophies — select one for your design"
        itemCount={radiusSystems.length}
      />

      <CatalogGrid columns={3}>
        {radiusSystems.map((item) => {
          const isSelected = selectedId === item.id;

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
                {/* Size step squares */}
                <div className="flex items-end gap-2 justify-center">
                  {SIZE_STEPS.map((size) => {
                    const value = item.data[size];
                    const dim = size === "sm" ? 24 : size === "md" ? 28 : size === "lg" ? 32 : size === "xl" ? 36 : 40;
                    return (
                      <div key={size} className="flex flex-col items-center gap-1">
                        <div
                          className={`border-2 transition-colors ${
                            isSelected
                              ? "border-blue-500/50 bg-blue-500/10"
                              : "border-app-text-muted/25 bg-app-surface"
                          }`}
                          style={{
                            width: dim,
                            height: dim,
                            borderRadius: value,
                          }}
                        />
                        <span className="text-[7px] font-mono text-app-text-muted">{size}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Component shape preview */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-app-border/30">
                  {COMPONENT_SHAPES.map(({ key, label, h }) => (
                    <div key={key} className="flex flex-col items-center gap-0.5">
                      <div
                        className={`w-full ${h} border transition-colors ${
                          isSelected
                            ? "border-blue-500/40 bg-blue-500/8"
                            : "border-app-text-muted/20 bg-app-surface/50"
                        }`}
                        style={{ borderRadius: item.data[key] }}
                      />
                      <span className="text-[7px] text-app-text-muted">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
                <div className="text-xs font-medium text-app-text">{item.name}</div>
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
