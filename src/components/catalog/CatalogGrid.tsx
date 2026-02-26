"use client";

import { useCallback, useRef, type ReactNode } from "react";

interface CatalogGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

/** Return all direct button/[role=button] children inside the grid (skip headers, divs, etc.) */
function getCards(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(":scope > button, :scope > [role='button']")
  );
}

/** Compute visible column count from the first card's row vs the second card's row */
function getVisibleCols(cards: HTMLElement[]): number {
  if (cards.length < 2) return 1;
  const firstTop = cards[0].getBoundingClientRect().top;
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].getBoundingClientRect().top !== firstTop) return i;
  }
  return cards.length; // all in one row
}

export function CatalogGrid({ children, columns = 3 }: CatalogGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const container = ref.current;
    if (!container) return;

    const { key } = e;
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) return;

    const cards = getCards(container);
    if (cards.length === 0) return;

    const active = document.activeElement as HTMLElement;
    const currentIndex = cards.indexOf(active);
    if (currentIndex === -1) return; // focus isn't on a card

    e.preventDefault();
    const cols = getVisibleCols(cards);
    let next = currentIndex;

    switch (key) {
      case "ArrowRight":
        next = Math.min(currentIndex + 1, cards.length - 1);
        break;
      case "ArrowLeft":
        next = Math.max(currentIndex - 1, 0);
        break;
      case "ArrowDown":
        next = Math.min(currentIndex + cols, cards.length - 1);
        break;
      case "ArrowUp":
        next = Math.max(currentIndex - cols, 0);
        break;
    }

    if (next !== currentIndex) {
      cards[next].focus();
      cards[next].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={ref}
      role="grid"
      aria-label="Catalog items"
      onKeyDown={handleKeyDown}
      className={`grid ${gridCols[columns]} gap-4 p-6`}
    >
      {children}
    </div>
  );
}
