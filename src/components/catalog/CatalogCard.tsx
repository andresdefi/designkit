"use client";

import type { ReactNode } from "react";
import type { Category } from "@/lib/types";
import { useDesignKit } from "@/lib/store";

interface CatalogCardProps {
  category: Category;
  itemId: string;
  name: string;
  description?: string;
  children: ReactNode;
}

export function CatalogCard({ category, itemId, name, description, children }: CatalogCardProps) {
  const { isSelected, select, deselect } = useDesignKit();
  const selected = isSelected(category, itemId);

  function handleClick() {
    if (selected) {
      deselect(category);
    } else {
      select(category, itemId);
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`${selected ? "Deselect" : "Select"} ${name}${description ? ": " + description : ""}`}
      aria-pressed={selected}
      className={`group relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
        selected
          ? "border-blue-500 ring-1 ring-blue-500/30 bg-app-card-bg-selected"
          : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
      }`}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[10px]">✓</span>
        </div>
      )}

      {/* Preview area */}
      <div className="p-4 min-h-[120px] flex items-center justify-center">
        {children}
      </div>

      {/* Label */}
      <div className="px-4 pb-3 pt-1 border-t border-app-border/50">
        <div className="text-xs font-medium text-app-text">{name}</div>
        {description && (
          <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{description}</div>
        )}
      </div>
    </button>
  );
}
