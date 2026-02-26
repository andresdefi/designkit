"use client";

import { useState } from "react";
import { useDesignKit } from "@/lib/store";
import { categories } from "@/lib/categories";
import { ExportModal } from "@/components/export/ExportModal";
import type { Category } from "@/lib/types";

export function SelectionPanel() {
  const {
    selections, colorPicks, deselect, resetAll, previewOpen,
    unpickColor, resetColorPicks, locked, toggleLock, randomizeCategory,
    presets, savePreset, loadPreset, deletePreset,
  } = useDesignKit();
  const [exportOpen, setExportOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [showPresetInput, setShowPresetInput] = useState(false);

  if (!previewOpen) return null;

  const selectedEntries = Object.entries(selections) as [Category, string][];
  const lightPickCount = Object.keys(colorPicks.light).length;
  const darkPickCount = Object.keys(colorPicks.dark).length;
  const totalColorPicks = lightPickCount + darkPickCount;
  const hasAnything = selectedEntries.length > 0 || totalColorPicks > 0;

  return (
    <>
      <aside aria-label="Selection panel" className="w-72 h-dvh border-l border-app-border bg-app-bg flex flex-col shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-app-border shrink-0">
          <span className="text-sm font-semibold text-app-text">Selections</span>
          {hasAnything && (
            <button
              onClick={() => {
                resetAll();
                resetColorPicks();
              }}
              className="text-[10px] text-app-text-muted hover:text-red-400 transition-colors"
            >
              Reset all
            </button>
          )}
        </div>

        {/* Selection list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!hasAnything ? (
            <div className="text-center py-12">
              <p className="text-sm text-app-text-muted">No selections yet</p>
              <p className="text-xs text-app-text-muted mt-1 opacity-60">
                Browse categories and click items to select them
              </p>
            </div>
          ) : (
            <>
              {/* Category selections */}
              {selectedEntries.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted mb-2">
                    Categories
                  </div>
                  <div className="space-y-1.5">
                    {selectedEntries.map(([categoryId, itemId]) => {
                      const cat = categories.find((c) => c.id === categoryId);
                      const isLocked = !!locked[categoryId];
                      return (
                        <div
                          key={categoryId}
                          className="flex items-center justify-between bg-app-card-bg rounded-lg px-3 py-2"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] text-app-text-muted uppercase tracking-wider">
                              {cat?.label ?? categoryId}
                            </div>
                            <div className="text-xs text-app-text truncate">{itemId}</div>
                          </div>
                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            <button
                              onClick={() => randomizeCategory(categoryId)}
                              className="text-app-text-muted hover:text-blue-400 transition-colors text-xs p-0.5"
                              aria-label={`Randomize ${cat?.label}`}
                              title={`Randomize ${cat?.label}`}
                            >
                              🎲
                            </button>
                            <button
                              onClick={() => toggleLock(categoryId)}
                              className={`transition-colors text-xs p-0.5 ${
                                isLocked
                                  ? "text-amber-400 hover:text-amber-300"
                                  : "text-app-text-muted hover:text-app-text"
                              }`}
                              aria-label={isLocked ? `Unlock ${cat?.label}` : `Lock ${cat?.label}`}
                              title={isLocked ? `Unlock ${cat?.label}` : `Lock ${cat?.label}`}
                            >
                              {isLocked ? "🔒" : "🔓"}
                            </button>
                            <button
                              onClick={() => deselect(categoryId)}
                              className="text-app-text-muted hover:text-red-400 transition-colors text-xs p-0.5"
                              aria-label={`Remove ${cat?.label} selection`}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color picks summary */}
              {totalColorPicks > 0 && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted mb-2">
                    Color Picks
                  </div>
                  {lightPickCount > 0 && (
                    <ColorPickList
                      label="Light"
                      picks={colorPicks.light}
                      onRemove={(key) => unpickColor("light", key)}
                    />
                  )}
                  {darkPickCount > 0 && (
                    <ColorPickList
                      label="Dark"
                      picks={colorPicks.dark}
                      onRemove={(key) => unpickColor("dark", key)}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Presets */}
        <div className="px-4 py-3 border-t border-app-border shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted">
              Presets
            </span>
            {hasAnything && !showPresetInput && (
              <button
                onClick={() => setShowPresetInput(true)}
                className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
              >
                Save current
              </button>
            )}
          </div>

          {showPresetInput && (
            <form
              className="flex gap-1.5 mb-2"
              onSubmit={(e) => {
                e.preventDefault();
                const name = presetName.trim();
                if (!name) return;
                savePreset(name);
                setPresetName("");
                setShowPresetInput(false);
              }}
            >
              <input
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name..."
                aria-label="Preset name"
                className="flex-1 min-w-0 px-2 py-1 text-xs bg-app-surface border border-app-border rounded text-app-text placeholder:text-app-text-muted outline-none focus:border-blue-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowPresetInput(false);
                    setPresetName("");
                  }
                }}
              />
              <button
                type="submit"
                className="px-2 py-1 text-[10px] font-medium bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
              >
                Save
              </button>
            </form>
          )}

          {presets.length === 0 ? (
            <p className="text-[10px] text-app-text-muted opacity-60">
              No saved presets
            </p>
          ) : (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {presets.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 group"
                >
                  <button
                    onClick={() => loadPreset(p.id)}
                    className="flex-1 min-w-0 text-left text-xs text-app-text-secondary hover:text-app-text truncate transition-colors"
                    title={`Load "${p.name}"`}
                  >
                    {p.name}
                  </button>
                  <span className="text-[9px] text-app-text-muted shrink-0">
                    {Object.keys(p.selections).length}
                  </span>
                  <button
                    onClick={() => deletePreset(p.id)}
                    className="text-app-text-muted hover:text-red-400 transition-colors text-[10px] opacity-0 group-hover:opacity-100 shrink-0"
                    aria-label={`Delete preset "${p.name}"`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export button */}
        {hasAnything && (
          <div className="p-4 border-t border-app-border shrink-0">
            <button
              onClick={() => setExportOpen(true)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Export Config
            </button>
          </div>
        )}
      </aside>

      {/* Export modal */}
      {exportOpen && <ExportModal onClose={() => setExportOpen(false)} />}
    </>
  );
}

function ColorPickList({
  label,
  picks,
  onRemove,
}: {
  label: string;
  picks: Record<string, string>;
  onRemove: (key: string) => void;
}) {
  const entries = Object.entries(picks);
  if (entries.length === 0) return null;

  return (
    <div className="mb-2">
      <div className="text-[9px] text-app-text-muted mb-1">{label} mode</div>
      <div className="flex flex-wrap gap-1">
        {entries.map(([key, value]) => (
          <button
            key={key}
            onClick={() => onRemove(key)}
            className="group flex items-center gap-1 bg-app-card-bg rounded px-1.5 py-0.5 hover:bg-red-500/10 transition-colors"
            title={`${key}: ${value} — click to remove`}
            aria-label={`Remove ${key} color pick`}
          >
            <div
              className="w-3 h-3 rounded-sm border border-app-border/30"
              style={{ backgroundColor: value }}
            />
            <span className="text-[9px] text-app-text-muted group-hover:text-red-400 transition-colors">
              {key.replace("semantic.", "")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
