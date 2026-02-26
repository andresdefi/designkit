"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { categories, categoryGroups, getCategoriesByGroup } from "@/lib/categories";
import { useDesignKit } from "@/lib/store";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toggleAppTheme, togglePreview, toggleSidebar, appTheme, presets, loadPreset, undo, redo, canUndo, canRedo } = useDesignKit();

  // Cmd+K / Ctrl+K to toggle
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
      setOpen(false);
    },
    [router]
  );

  const runAction = useCallback(
    (fn: () => void) => {
      fn();
      setOpen(false);
    },
    []
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg">
        <Command
          className="rounded-xl border border-app-border bg-app-bg shadow-2xl overflow-hidden"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Command.Input
            placeholder="Search categories, actions..."
            className="w-full px-4 py-3 text-sm text-app-text bg-transparent border-b border-app-border outline-none placeholder:text-app-text-muted"
            autoFocus
          />

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-app-text-muted">
              No results found.
            </Command.Empty>

            {/* Categories grouped */}
            {categoryGroups.map((group) => {
              const items = getCategoriesByGroup(group.id);
              return (
                <Command.Group
                  key={group.id}
                  heading={group.label}
                  className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-app-text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
                >
                  {items.map((cat) => (
                    <Command.Item
                      key={cat.id}
                      value={`${cat.label} ${cat.description}`}
                      onSelect={() => navigate(`/${cat.id}`)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
                    >
                      <span className="w-5 text-center text-xs opacity-60">{cat.icon}</span>
                      <span>{cat.label}</span>
                      <span className="ml-auto text-[10px] text-app-text-muted">{cat.description}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}

            {/* Presets */}
            {presets.length > 0 && (
              <Command.Group
                heading="Presets"
                className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-app-text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {presets.map((p) => (
                  <Command.Item
                    key={p.id}
                    value={`Load preset ${p.name}`}
                    onSelect={() => runAction(() => loadPreset(p.id))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
                  >
                    <span className="w-5 text-center text-xs opacity-60">&#9733;</span>
                    <span>{p.name}</span>
                    <span className="ml-auto text-[10px] text-app-text-muted">
                      {Object.keys(p.selections).length} selections
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Actions */}
            <Command.Group
              heading="Actions"
              className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-app-text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              <Command.Item
                value="Toggle theme light dark mode"
                onSelect={() => runAction(toggleAppTheme)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
              >
                <span className="w-5 text-center text-xs opacity-60">
                  {appTheme === "dark" ? "☀️" : "🌙"}
                </span>
                <span>Toggle {appTheme === "dark" ? "light" : "dark"} mode</span>
              </Command.Item>
              <Command.Item
                value="Toggle preview panel"
                onSelect={() => runAction(togglePreview)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
              >
                <span className="w-5 text-center text-xs opacity-60">👁</span>
                <span>Toggle preview panel</span>
              </Command.Item>
              <Command.Item
                value="Toggle sidebar collapse expand"
                onSelect={() => runAction(toggleSidebar)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
              >
                <span className="w-5 text-center text-xs opacity-60">▮</span>
                <span>Toggle sidebar</span>
              </Command.Item>
              {canUndo && (
                <Command.Item
                  value="Undo last change"
                  onSelect={() => runAction(undo)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
                >
                  <span className="w-5 text-center text-xs opacity-60">&#8617;</span>
                  <span>Undo</span>
                  <span className="ml-auto text-[10px] text-app-text-muted">Cmd+Z</span>
                </Command.Item>
              )}
              {canRedo && (
                <Command.Item
                  value="Redo last change"
                  onSelect={() => runAction(redo)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-app-text-secondary cursor-pointer data-[selected=true]:bg-app-card-bg-hover data-[selected=true]:text-app-text"
                >
                  <span className="w-5 text-center text-xs opacity-60">&#8618;</span>
                  <span>Redo</span>
                  <span className="ml-auto text-[10px] text-app-text-muted">Cmd+Shift+Z</span>
                </Command.Item>
              )}
            </Command.Group>
          </Command.List>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-app-border text-[10px] text-app-text-muted">
            <span>Navigate with arrow keys</span>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-app-surface rounded text-[9px] font-mono">Enter</kbd>
              <span>to select</span>
              <kbd className="px-1.5 py-0.5 bg-app-surface rounded text-[9px] font-mono">Esc</kbd>
              <span>to close</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}
