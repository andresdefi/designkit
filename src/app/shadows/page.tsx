"use client";

import { TopBar } from "@/components/layout/TopBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { shadowSystems, SHADOW_GROUPS, SHADOW_META } from "@/data/shadows";
import { useDesignKit } from "@/lib/store";

const ELEVATION_STEPS = ["sm", "md", "lg", "xl", "2xl"] as const;

export default function ShadowsPage() {
  const { selections, select, deselect } = useDesignKit();
  const selectedId = selections.shadows;

  function handleSelect(id: string) {
    if (selectedId === id) {
      deselect("shadows");
    } else {
      select("shadows", id);
    }
  }

  return (
    <>
      <TopBar
        title="Shadows"
        description="Elevation and shadow systems — select one for your design"
        itemCount={shadowSystems.length}
      />

      <CatalogGrid columns={3}>
        {SHADOW_GROUPS.map((group) => {
          const groupItems = shadowSystems.filter(
            (item) => SHADOW_META.find((m) => m.id === item.id)?.group === group
          );
          if (groupItems.length === 0) return null;

          return [
            <div
              key={`header-${group}`}
              className="col-span-full mt-2 first:mt-0"
            >
              <h2 className="text-xs font-semibold text-app-text">{group}</h2>
              <p className="text-[10px] text-app-text-muted mt-0.5">
                {groupItems.length} shadow{groupItems.length !== 1 ? "s" : ""}
              </p>
            </div>,

            ...groupItems.map((item) => {
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

                  <div className="p-4">
                    {/* Elevation step cards — always light bg for shadow visibility */}
                    <div className="bg-neutral-200 rounded-lg p-3">
                      <div className="flex items-end gap-2 justify-center">
                        {ELEVATION_STEPS.map((step) => {
                          const shadow = item.data[step];
                          return (
                            <div key={step} className="flex flex-col items-center gap-1.5">
                              <div
                                className="w-9 h-9 rounded-md bg-white"
                                style={{ boxShadow: shadow }}
                              />
                              <span className="text-[7px] font-mono text-neutral-500">{step}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Inner shadow sample */}
                      {item.data.inner !== "none" && (
                        <div className="mt-2 flex items-center gap-2 justify-center">
                          <div
                            className="w-full h-6 rounded-md bg-white"
                            style={{ boxShadow: item.data.inner }}
                          />
                          <span className="text-[7px] font-mono text-neutral-500 shrink-0">inner</span>
                        </div>
                      )}
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
            }),
          ];
        })}
      </CatalogGrid>
    </>
  );
}
