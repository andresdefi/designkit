"use client";

import { useState, useRef, useEffect } from "react";
import { categories, categoryGroups, getCategoriesByGroup } from "@/lib/categories";
import { promptTemplates } from "@/lib/prompt-templates";
import type { Category } from "@/lib/types";

export function GeneratePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("colors");
  const [prompt, setPrompt] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const relevantTemplates = promptTemplates.filter(
    (t) => t.category === selectedCategory,
  );

  // Fall back to group-level templates if no category-specific ones exist
  const categoryMeta = categories.find((c) => c.id === selectedCategory);
  const groupTemplates = categoryMeta
    ? promptTemplates.filter((t) => t.category === categoryMeta.group)
    : [];

  const displayTemplates =
    relevantTemplates.length > 0 ? relevantTemplates : groupTemplates;

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50">
      {/* Floating panel */}
      {isOpen && (
        <div role="dialog" aria-modal="true" aria-label="AI Generate panel" className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-xl border border-app-border bg-app-bg shadow-2xl overflow-hidden">
          {/* Coming Soon overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-app-bg/60 backdrop-blur-[2px] rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-app-accent/10 px-3 py-1 text-xs font-medium text-app-accent">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Coming Soon
              </span>
              <p className="text-xs text-app-text-muted text-center max-w-[200px]">
                AI-powered generation will be available in a future update.
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-app-border">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-app-accent"
                aria-hidden="true"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              <h2 className="text-sm font-semibold text-app-text">
                AI Generate
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-app-text-muted hover:text-app-text transition-colors p-1 rounded-md hover:bg-app-card-bg-hover"
              aria-label="Close generate panel"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body (dimmed behind overlay) */}
          <div className="p-4 space-y-4 opacity-50 pointer-events-none select-none">
            {/* Category selector */}
            <div className="space-y-1.5">
              <label
                htmlFor="ai-category-select"
                className="text-xs font-medium text-app-text-secondary"
              >
                Category
              </label>
              <select
                id="ai-category-select"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as Category)
                }
                className="w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text outline-none"
                disabled
              >
                {categoryGroups.map((group) => (
                  <optgroup key={group.id} label={group.label}>
                    {getCategoriesByGroup(group.id).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Quick prompt chips */}
            {displayTemplates.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-app-text-secondary">
                  Quick prompts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {displayTemplates.slice(0, 4).map((tpl) => (
                    <button
                      key={tpl.id}
                      className="inline-flex items-center rounded-full border border-app-border bg-app-card-bg px-2.5 py-1 text-xs text-app-text-secondary hover:bg-app-card-bg-hover hover:text-app-text transition-colors"
                      disabled
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt input */}
            <div className="space-y-1.5">
              <label
                htmlFor="ai-prompt-input"
                className="text-xs font-medium text-app-text-secondary"
              >
                Custom prompt
              </label>
              <textarea
                id="ai-prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to generate..."
                rows={3}
                className="w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text placeholder:text-app-text-muted outline-none resize-none"
                disabled
              />
            </div>

            {/* Generate button */}
            <button
              className="w-full rounded-lg bg-app-accent px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed"
              disabled
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all ${
          isOpen
            ? "bg-app-accent text-white shadow-app-accent/25"
            : "bg-app-surface border border-app-border text-app-text-secondary hover:text-app-text hover:bg-app-card-bg-hover hover:border-app-border-hover"
        }`}
        aria-label={isOpen ? "Close AI generate panel" : "Open AI generate panel"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
      </button>
    </div>
  );
}
