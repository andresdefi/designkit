import type { CatalogItem, ModalStyleData } from "@/lib/types";

export type ModalGroup = "Dialogs" | "Sheets & Drawers" | "Overlays";

export interface ModalMeta {
  id: string;
  group: ModalGroup;
}

export const MODAL_GROUPS: ModalGroup[] = ["Dialogs", "Sheets & Drawers", "Overlays"];

export const MODAL_META: ModalMeta[] = [
  { id: "modal-center", group: "Dialogs" },
  { id: "modal-command", group: "Dialogs" },
  { id: "modal-fullscreen", group: "Dialogs" },
  { id: "modal-bottom-sheet", group: "Sheets & Drawers" },
  { id: "modal-drawer-right", group: "Sheets & Drawers" },
  { id: "modal-popover", group: "Overlays" },
  { id: "modal-toast", group: "Overlays" },
];

export const modalStyles: CatalogItem<ModalStyleData>[] = [
  // ── Dialogs ────────────────────────────────────────────

  {
    id: "modal-center",
    category: "modals",
    name: "Center Dialog",
    description: "Standard centered modal with overlay — confirmations",
    data: {
      variant: "center",
      subtype: "center",
      css: {
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      },
      panelCss: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
        maxWidth: "400px",
        width: "100%",
      },
      hasOverlay: true,
      animationDirection: "center",
    },
  },
  {
    id: "modal-command",
    category: "modals",
    name: "Command Palette",
    description: "Centered top-third, search input — Cmd+K style",
    data: {
      variant: "command",
      subtype: "command",
      css: {
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      },
      panelCss: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
        maxWidth: "480px",
        width: "100%",
        overflow: "hidden",
      },
      hasOverlay: true,
      animationDirection: "top",
    },
  },
  {
    id: "modal-fullscreen",
    category: "modals",
    name: "Full Screen",
    description: "Takes over entire viewport — immersive flows",
    data: {
      variant: "fullscreen",
      subtype: "fullscreen",
      css: {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      panelCss: {
        backgroundColor: "__background",
        width: "100%",
        height: "100%",
      },
      hasOverlay: true,
      animationDirection: "center",
    },
  },

  // ── Sheets & Drawers ───────────────────────────────────

  {
    id: "modal-bottom-sheet",
    category: "modals",
    name: "Bottom Sheet",
    description: "Slides up from bottom, rounded top — mobile-first",
    data: {
      variant: "bottom-sheet",
      subtype: "bottom-sheet",
      css: {
        backgroundColor: "rgba(0,0,0,0.4)",
      },
      panelCss: {
        backgroundColor: "__surface",
        borderTop: "1px solid __border",
        borderRadius: "16px 16px 0 0",
        padding: "16px 20px",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
      },
      hasOverlay: true,
      animationDirection: "bottom",
    },
  },
  {
    id: "modal-drawer-right",
    category: "modals",
    name: "Side Drawer",
    description: "Slides in from right, full-height — detail panels",
    data: {
      variant: "drawer-right",
      subtype: "drawer",
      css: {
        backgroundColor: "rgba(0,0,0,0.4)",
      },
      panelCss: {
        backgroundColor: "__surface",
        borderLeft: "1px solid __border",
        width: "320px",
        height: "100%",
        padding: "20px",
        boxShadow: "-8px 0 32px rgba(0,0,0,0.15)",
      },
      hasOverlay: true,
      animationDirection: "right",
    },
  },

  // ── Overlays ───────────────────────────────────────────

  {
    id: "modal-popover",
    category: "modals",
    name: "Popover",
    description: "Small, anchored to trigger element — quick actions",
    data: {
      variant: "popover",
      subtype: "popover",
      css: {},
      panelCss: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "8px",
        padding: "8px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        minWidth: "160px",
      },
      hasOverlay: false,
      animationDirection: "center",
    },
  },
  {
    id: "modal-toast",
    category: "modals",
    name: "Toast / Snackbar",
    description: "Corner-anchored notification — transient feedback",
    data: {
      variant: "toast",
      subtype: "toast",
      css: {},
      panelCss: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "8px",
        padding: "10px 14px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        maxWidth: "320px",
      },
      hasOverlay: false,
      animationDirection: "bottom",
    },
  },
];
