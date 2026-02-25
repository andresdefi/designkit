"use client";

import { useEffect } from "react";

const loaded = new Set<string>();

/**
 * Injects Google Fonts <link> tags into <head>.
 * Deduplicates across calls. Fonts stay loaded after unmount.
 */
export function useGoogleFonts(urls: string[]) {
  useEffect(() => {
    for (const url of urls) {
      if (!url || loaded.has(url)) continue;
      loaded.add(url);

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
  }, [urls]);
}
