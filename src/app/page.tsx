"use client";

import Link from "next/link";
import { categoryGroups, getCategoriesByGroup } from "@/lib/categories";
import { useDesignKit } from "@/lib/store";

export default function HomePage() {
  const { selections } = useDesignKit();
  const selectionCount = Object.keys(selections).length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-app-text mb-2">DesignKit</h1>
        <p className="text-sm text-app-text-secondary max-w-lg">
          Browse design elements, pick what matches your app&apos;s personality,
          and export a config that keeps every screen consistent.
        </p>
        {selectionCount > 0 && (
          <p className="text-xs text-blue-400 mt-3">
            {selectionCount} element{selectionCount !== 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {/* Category groups */}
      <div className="space-y-8">
        {categoryGroups.map((group) => {
          const cats = getCategoriesByGroup(group.id);
          return (
            <div key={group.id}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-app-text-muted mb-3">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {cats.map((cat) => {
                  const hasSelection = !!selections[cat.id];
                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.id}`}
                      className={`group relative rounded-lg border p-4 transition-all ${
                        hasSelection
                          ? "border-blue-500/30 bg-blue-500/5"
                          : "border-app-border bg-app-card-bg hover:border-app-border-hover hover:bg-app-card-bg-hover"
                      }`}
                    >
                      <div className="text-lg mb-2 opacity-50 group-hover:opacity-80 transition-opacity">
                        {cat.icon}
                      </div>
                      <div className="text-sm font-medium text-app-text">{cat.label}</div>
                      <div className="text-[10px] text-app-text-muted mt-0.5">{cat.description}</div>
                      {hasSelection && (
                        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
