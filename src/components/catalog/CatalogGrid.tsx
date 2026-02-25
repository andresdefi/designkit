"use client";

import type { ReactNode } from "react";

interface CatalogGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function CatalogGrid({ children, columns = 3 }: CatalogGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 p-6`}>
      {children}
    </div>
  );
}
