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

// Named presets
const PRESETS_KEY = "designkit-presets";

export interface Preset {
  id: string;
  name: string;
  selections: Selections;
  colorPicks: { light: ColorPicks; dark: ColorPicks };
  typeScale: string;
  createdAt: number;
}

function loadPresets(): Preset[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(PRESETS_KEY) || "[]");
  } catch {
    return [];
  }
}

function savePresets(presets: Preset[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

// Undo/redo history
interface DesignSnapshot {
  selections: Selections;
  colorPicks: { light: ColorPicks; dark: ColorPicks };
  typeScale: string;
}

const MAX_HISTORY = 50;
let _undoStack: DesignSnapshot[] = [];
let _redoStack: DesignSnapshot[] = [];
let _skipSnapshot = false;

function takeSnapshot(state: { selections: Selections; colorPicks: { light: ColorPicks; dark: ColorPicks }; typeScale: string }): DesignSnapshot {
  return {
    selections: { ...state.selections },
    colorPicks: { light: { ...state.colorPicks.light }, dark: { ...state.colorPicks.dark } },
    typeScale: state.typeScale,
  };
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

  // Named presets
  presets: Preset[];
  savePreset: (name: string) => void;
  loadPreset: (id: string) => void;
  deletePreset: (id: string) => void;
  renamePreset: (id: string, name: string) => void;

  // Undo/redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
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

      // Named presets
      presets: loadPresets(),

      savePreset: (name) => {
        const state = get();
        const preset: Preset = {
          id: `preset-${Date.now()}`,
          name,
          selections: { ...state.selections },
          colorPicks: {
            light: { ...state.colorPicks.light },
            dark: { ...state.colorPicks.dark },
          },
          typeScale: state.typeScale,
          createdAt: Date.now(),
        };
        const next = [...get().presets, preset];
        savePresets(next);
        set({ presets: next });
      },

      loadPreset: (id) => {
        const preset = get().presets.find((p) => p.id === id);
        if (!preset) return;
        set({
          selections: { ...preset.selections },
          colorPicks: {
            light: { ...preset.colorPicks.light },
            dark: { ...preset.colorPicks.dark },
          },
          typeScale: preset.typeScale,
        });
      },

      deletePreset: (id) => {
        const next = get().presets.filter((p) => p.id !== id);
        savePresets(next);
        set({ presets: next });
      },

      renamePreset: (id, name) => {
        const next = get().presets.map((p) =>
          p.id === id ? { ...p, name } : p
        );
        savePresets(next);
        set({ presets: next });
      },

      // Undo/redo
      canUndo: false,
      canRedo: false,

      undo: () => {
        if (_undoStack.length === 0) return;
        const current = takeSnapshot(get());
        _redoStack.push(current);
        const prev = _undoStack.pop()!;
        _skipSnapshot = true;
        set({
          selections: prev.selections,
          colorPicks: prev.colorPicks,
          typeScale: prev.typeScale,
          canUndo: _undoStack.length > 0,
          canRedo: true,
        });
        _skipSnapshot = false;
      },

      redo: () => {
        if (_redoStack.length === 0) return;
        const current = takeSnapshot(get());
        _undoStack.push(current);
        const next = _redoStack.pop()!;
        _skipSnapshot = true;
        set({
          selections: next.selections,
          colorPicks: next.colorPicks,
          typeScale: next.typeScale,
          canUndo: true,
          canRedo: _redoStack.length > 0,
        });
        _skipSnapshot = false;
      },
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
        sidebarCollapsed: state.sidebarCollapsed,
        previewOpen: state.previewOpen,
      }),
    }
  )
);

// Auto-sync selections to the API + undo history (browser only)
if (typeof window !== "undefined") {
  let syncTimer: ReturnType<typeof setTimeout> | null = null;

  useDesignKit.subscribe((state, prev) => {
    // Only react when design-relevant state changes
    if (
      state.selections === prev.selections &&
      state.colorPicks === prev.colorPicks &&
      state.typeScale === prev.typeScale
    ) {
      return;
    }

    // Push previous state onto undo stack (unless this change came from undo/redo)
    if (!_skipSnapshot) {
      _undoStack.push(takeSnapshot(prev));
      if (_undoStack.length > MAX_HISTORY) _undoStack.shift();
      _redoStack = [];
      useDesignKit.setState({ canUndo: true, canRedo: false });
    }

    // Debounced API sync
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

  // Cmd+Z / Cmd+Shift+Z global keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (!(e.metaKey || e.ctrlKey) || e.key !== "z") return;
    // Don't intercept when focus is in an input/textarea
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
    e.preventDefault();
    if (e.shiftKey) {
      useDesignKit.getState().redo();
    } else {
      useDesignKit.getState().undo();
    }
  });
}
