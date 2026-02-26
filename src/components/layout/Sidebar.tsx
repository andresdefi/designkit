"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryGroups, getCategoriesByGroup } from "@/lib/categories";
import { useDesignKit } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const { selections, sidebarCollapsed, toggleSidebar, appTheme, toggleAppTheme } = useDesignKit();
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  const selectionCount = Object.keys(selections).length;

  useEffect(() => {
    if (!helpOpen) return;
    function handleClick(e: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setHelpOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [helpOpen]);

  return (
    <aside
      aria-label="Navigation sidebar"
      className={`h-dvh border-r border-app-border bg-app-bg flex flex-col transition-all duration-200 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-app-border shrink-0">
        {!sidebarCollapsed && (
          <Link href="/" className="text-sm font-semibold text-app-text tracking-tight">
            DesignKit
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="text-app-text-muted hover:text-app-text-secondary transition-colors p-1"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {categoryGroups.map((group) => {
          const items = getCategoriesByGroup(group.id);
          return (
            <div key={group.id} className="mb-1">
              {!sidebarCollapsed && (
                <div className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-app-text-muted">
                  {group.label}
                </div>
              )}
              {items.map((cat) => {
                const isActive = pathname === `/${cat.id}`;
                const hasSelection = !!selections[cat.id];

                return (
                  <Link
                    key={cat.id}
                    href={`/${cat.id}`}
                    className={`flex items-center gap-3 px-4 py-1.5 text-sm transition-colors relative ${
                      isActive
                        ? "text-app-text bg-app-card-bg-selected"
                        : "text-app-text-secondary hover:text-app-text hover:bg-app-card-bg-hover"
                    }`}
                  >
                    <span className="w-5 text-center text-xs shrink-0 opacity-60">{cat.icon}</span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate">{cat.label}</span>
                        {hasSelection && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer — theme toggle + selection count + help */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3 border-t border-app-border shrink-0 space-y-2">
          <button
            onClick={toggleAppTheme}
            className="flex items-center gap-2 w-full text-xs text-app-text-secondary hover:text-app-text transition-colors py-1"
            aria-label={`Switch to ${appTheme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="text-sm">{appTheme === "dark" ? "☀️" : "🌙"}</span>
            <span>{appTheme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          <div className="flex items-center justify-between">
            <div className="text-xs text-app-text-muted">
              {selectionCount > 0 ? (
                <span>{selectionCount} selected</span>
              ) : (
                <span>No selections yet</span>
              )}
            </div>
            <div className="relative" ref={helpRef}>
              <button
                onClick={() => setHelpOpen((p) => !p)}
                className="text-xs text-app-text-muted hover:text-app-text-secondary transition-colors p-0.5"
                aria-label="Help and keyboard shortcuts"
              >
                ?
              </button>
              {helpOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-56 rounded-lg border border-app-border bg-app-bg shadow-lg p-3 z-50">
                  <div className="text-xs font-semibold text-app-text mb-2">DesignKit</div>
                  <p className="text-[10px] text-app-text-muted mb-3">
                    Build your design identity by selecting options from each category. Export the result or consume via the MCP server.
                  </p>
                  <div className="text-[10px] font-semibold text-app-text-secondary mb-1">Shortcuts</div>
                  <div className="space-y-0.5 text-[10px] text-app-text-muted">
                    <div className="flex justify-between"><span>Command palette</span><kbd className="text-app-text-secondary">Cmd+K</kbd></div>
                    <div className="flex justify-between"><span>Undo</span><kbd className="text-app-text-secondary">Cmd+Z</kbd></div>
                    <div className="flex justify-between"><span>Redo</span><kbd className="text-app-text-secondary">Cmd+Shift+Z</kbd></div>
                    <div className="flex justify-between"><span>Navigate grid</span><kbd className="text-app-text-secondary">Arrow keys</kbd></div>
                    <div className="flex justify-between"><span>Select / deselect</span><kbd className="text-app-text-secondary">Enter</kbd></div>
                    <div className="flex justify-between"><span>Close / deselect</span><kbd className="text-app-text-secondary">Esc</kbd></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed theme toggle */}
      {sidebarCollapsed && (
        <div className="px-4 py-3 border-t border-app-border shrink-0 flex justify-center">
          <button
            onClick={toggleAppTheme}
            className="text-sm text-app-text-secondary hover:text-app-text transition-colors"
            aria-label={`Switch to ${appTheme === "dark" ? "light" : "dark"} mode`}
          >
            {appTheme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      )}
    </aside>
  );
}
