"use client";

import { useDesignKit } from "@/lib/store";

interface TopBarProps {
  title: string;
  description?: string;
  itemCount?: number;
}

export function TopBar({ title, description, itemCount }: TopBarProps) {
  const { viewMode, setViewMode, colorMode, setColorMode, previewOpen, togglePreview } =
    useDesignKit();

  return (
    <header className="h-14 border-b border-app-border flex items-center justify-between px-6 shrink-0 bg-app-bg/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-app-text">{title}</h1>
        {description && (
          <span className="text-xs text-app-text-muted hidden sm:inline">{description}</span>
        )}
        {itemCount !== undefined && (
          <span className="text-[10px] font-medium text-app-text-muted bg-app-surface rounded-full px-2 py-0.5">
            {itemCount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {/* View mode toggle */}
        <div className="flex bg-app-card-bg rounded-md p-0.5 mr-2">
          <button
            onClick={() => setViewMode("isolated")}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              viewMode === "isolated"
                ? "bg-app-border-hover text-app-text"
                : "text-app-text-secondary hover:text-app-text"
            }`}
          >
            Isolated
          </button>
          <button
            onClick={() => setViewMode("context")}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              viewMode === "context"
                ? "bg-app-border-hover text-app-text"
                : "text-app-text-secondary hover:text-app-text"
            }`}
          >
            In Context
          </button>
        </div>

        {/* Color mode toggle */}
        <div className="flex bg-app-card-bg rounded-md p-0.5 mr-2">
          <button
            onClick={() => setColorMode("light")}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              colorMode === "light"
                ? "bg-app-border-hover text-app-text"
                : "text-app-text-secondary hover:text-app-text"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setColorMode("dark")}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              colorMode === "dark"
                ? "bg-app-border-hover text-app-text"
                : "text-app-text-secondary hover:text-app-text"
            }`}
          >
            Dark
          </button>
        </div>

        {/* Preview toggle */}
        <button
          onClick={togglePreview}
          className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-blue-600 text-white"
              : "bg-app-surface text-app-text-secondary hover:bg-app-border-hover"
          }`}
        >
          Preview
        </button>
      </div>
    </header>
  );
}
