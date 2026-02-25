"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Selections } from "./types";
import { catalogRegistry, getRandomItemId } from "./catalog-registry";

// Individual color picks — key is color role (e.g. "primary"), value is hex
export type DeviceFrame = "mobile" | "tablet" | "desktop" | "frameless";

interface ColorPicks {
  [key: string]: string;
}

interface DesignKitStore {
  // Selections — one item ID per category
  selections: Selections;
  select: (category: Category, itemId: string) => void;
  deselect: (category: Category) => void;
  resetCategory: (category: Category) => void;
  resetAll: () => void;
  isSelected: (category: Category, itemId: string) => boolean;

  // Individual color picks — assembled from any palettes
  colorPicks: { light: ColorPicks; dark: ColorPicks };
  pickColor: (mode: "light" | "dark", key: string, value: string) => void;
  unpickColor: (mode: "light" | "dark", key: string) => void;
  resetColorPicks: () => void;

  // Lock / randomize
  locked: Partial<Record<Category, boolean>>;
  toggleLock: (cat: Category) => void;
  randomizeAll: () => void;
  randomizeCategory: (cat: Category) => void;

  // Preview controls
  deviceFrame: DeviceFrame;
  setDeviceFrame: (frame: DeviceFrame) => void;
  previewZoom: number; // 0.5, 0.75, 1, or -1 for "fit"
  setPreviewZoom: (zoom: number) => void;

  // UI state
  previewOpen: boolean;
  togglePreview: () => void;
  viewMode: "isolated" | "context";
  setViewMode: (mode: "isolated" | "context") => void;
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark") => void;
  typeScale: string;
  setTypeScale: (scale: string) => void;
  appTheme: "light" | "dark";
  toggleAppTheme: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useDesignKit = create<DesignKitStore>()(
  persist(
    (set, get) => ({
      // Selections
      selections: {},

      select: (category, itemId) =>
        set((state) => ({
          selections: { ...state.selections, [category]: itemId },
        })),

      deselect: (category) =>
        set((state) => {
          const next = { ...state.selections };
          delete next[category];
          return { selections: next };
        }),

      resetCategory: (category) =>
        set((state) => {
          const next = { ...state.selections };
          delete next[category];
          return { selections: next };
        }),

      resetAll: () => set({ selections: {}, colorPicks: { light: {}, dark: {} } }),

      isSelected: (category, itemId) => get().selections[category] === itemId,

      // Color picks
      colorPicks: { light: {}, dark: {} },

      pickColor: (mode, key, value) =>
        set((state) => ({
          colorPicks: {
            ...state.colorPicks,
            [mode]: { ...state.colorPicks[mode], [key]: value },
          },
        })),

      unpickColor: (mode, key) =>
        set((state) => {
          const next = { ...state.colorPicks[mode] };
          delete next[key];
          return {
            colorPicks: { ...state.colorPicks, [mode]: next },
          };
        }),

      resetColorPicks: () =>
        set({ colorPicks: { light: {}, dark: {} }, selections: {} }),

      // Lock / randomize
      locked: {},

      toggleLock: (cat) =>
        set((state) => ({
          locked: { ...state.locked, [cat]: !state.locked[cat] },
        })),

      randomizeAll: () =>
        set((state) => {
          const next = { ...state.selections };
          for (const cat of Object.keys(catalogRegistry) as Category[]) {
            if (state.locked[cat]) continue;
            const id = getRandomItemId(cat);
            if (id) next[cat] = id;
          }
          return { selections: next };
        }),

      randomizeCategory: (cat) =>
        set((state) => {
          const id = getRandomItemId(cat);
          if (!id) return {};
          return { selections: { ...state.selections, [cat]: id } };
        }),

      // Preview controls
      deviceFrame: "mobile",
      setDeviceFrame: (frame) => set({ deviceFrame: frame }),
      previewZoom: 1,
      setPreviewZoom: (zoom) => set({ previewZoom: zoom }),

      // UI state
      previewOpen: false,
      togglePreview: () => set((s) => ({ previewOpen: !s.previewOpen })),
      viewMode: "isolated",
      setViewMode: (mode) => set({ viewMode: mode }),
      colorMode: "light",
      setColorMode: (mode) => set({ colorMode: mode }),
      typeScale: "default",
      setTypeScale: (scale) => set({ typeScale: scale }),
      appTheme: "dark",
      toggleAppTheme: () =>
        set((s) => ({ appTheme: s.appTheme === "dark" ? "light" : "dark" })),
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: "designkit-selections",
      partialize: (state) => ({
        selections: state.selections,
        colorPicks: state.colorPicks,
        colorMode: state.colorMode,
        typeScale: state.typeScale,
        viewMode: state.viewMode,
        appTheme: state.appTheme,
        locked: state.locked,
        deviceFrame: state.deviceFrame,
        previewZoom: state.previewZoom,
      }),
    }
  )
);

// Auto-sync selections to the API (browser only)
if (typeof window !== "undefined") {
  let syncTimer: ReturnType<typeof setTimeout> | null = null;

  useDesignKit.subscribe((state, prev) => {
    // Only sync when design-relevant state changes
    if (
      state.selections === prev.selections &&
      state.colorPicks === prev.colorPicks &&
      state.typeScale === prev.typeScale
    ) {
      return;
    }

    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      fetch("/api/designkit/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selections: state.selections,
          colorPicks: state.colorPicks,
          typeScale: state.typeScale,
        }),
      }).catch(() => {
        // Silent — localStorage remains primary persistence
      });
    }, 500);
  });
}
