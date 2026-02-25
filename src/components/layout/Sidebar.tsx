"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryGroups, getCategoriesByGroup } from "@/lib/categories";
import { useDesignKit } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const { selections, sidebarCollapsed, toggleSidebar, appTheme, toggleAppTheme } = useDesignKit();

  const selectionCount = Object.keys(selections).length;

  return (
    <aside
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

      {/* Footer — theme toggle + selection count */}
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
          <div className="text-xs text-app-text-muted">
            {selectionCount > 0 ? (
              <span>{selectionCount} selected</span>
            ) : (
              <span>No selections yet</span>
            )}
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
