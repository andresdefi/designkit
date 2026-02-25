import type { CatalogItem, SidebarStyleData } from "@/lib/types";

export type SidebarGroup = "Standard" | "Minimal";

export interface SidebarMeta {
  id: string;
  group: SidebarGroup;
}

export const SIDEBAR_GROUPS: SidebarGroup[] = ["Standard", "Minimal"];

export const SIDEBAR_META: SidebarMeta[] = [
  { id: "sidebar-fixed", group: "Standard" },
  { id: "sidebar-collapsible", group: "Standard" },
  { id: "sidebar-floating", group: "Standard" },
  { id: "sidebar-grouped", group: "Minimal" },
  { id: "sidebar-minimal", group: "Minimal" },
  { id: "sidebar-dark", group: "Minimal" },
];

export const sidebarStyles: CatalogItem<SidebarStyleData>[] = [
  // ── Standard ───────────────────────────────────────────

  {
    id: "sidebar-fixed",
    category: "sidebars",
    name: "Fixed Full-Height",
    description: "Always visible, full-height, scrollable — admin panels",
    data: {
      variant: "fixed",
      css: {
        backgroundColor: "__surface",
        borderRight: "1px solid __border",
        height: "100%",
        padding: "12px 0",
      },
      itemCss: {
        padding: "6px 14px",
        color: "__textSecondary",
        borderRadius: "0",
        transition: "background-color 150ms ease, color 150ms ease",
      },
      activeItemCss: {
        color: "__primary",
        backgroundColor: "__primary-08",
        borderRight: "2px solid __primary",
      },
      hoverItemCss: {
        backgroundColor: "__surfaceAlt",
        color: "__text",
      },
      isCollapsible: false,
      hasGroupHeaders: false,
      width: "180px",
    },
  },
  {
    id: "sidebar-collapsible",
    category: "sidebars",
    name: "Collapsible Icon-Only",
    description: "Toggle between full labels and icon-only — space efficient",
    data: {
      variant: "collapsible",
      css: {
        backgroundColor: "__surface",
        borderRight: "1px solid __border",
        height: "100%",
        padding: "12px 0",
        transition: "width 200ms ease",
      },
      itemCss: {
        padding: "8px 12px",
        color: "__textSecondary",
        borderRadius: "6px",
        margin: "0 8px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 150ms ease",
      },
      activeItemCss: {
        color: "__primary",
        backgroundColor: "__primary-10",
      },
      hoverItemCss: {
        backgroundColor: "__surfaceAlt",
        color: "__text",
      },
      isCollapsible: true,
      hasGroupHeaders: false,
      width: "200px",
      collapsedWidth: "56px",
    },
  },
  {
    id: "sidebar-floating",
    category: "sidebars",
    name: "Floating",
    description: "Gap from edges, rounded, elevated — modern SaaS",
    data: {
      variant: "floating",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        height: "calc(100% - 16px)",
        margin: "8px",
        padding: "12px 0",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      },
      itemCss: {
        padding: "7px 14px",
        color: "__textSecondary",
        borderRadius: "8px",
        margin: "0 8px",
        transition: "all 150ms ease",
      },
      activeItemCss: {
        color: "__primary",
        backgroundColor: "__primary-10",
      },
      hoverItemCss: {
        backgroundColor: "__surfaceAlt",
        color: "__text",
      },
      isCollapsible: false,
      hasGroupHeaders: false,
      width: "200px",
    },
  },

  // ── Minimal ────────────────────────────────────────────

  {
    id: "sidebar-grouped",
    category: "sidebars",
    name: "Grouped Sections",
    description: "Sections with headers and dividers — complex apps",
    data: {
      variant: "grouped",
      css: {
        backgroundColor: "__surface",
        borderRight: "1px solid __border",
        height: "100%",
        padding: "12px 0",
      },
      itemCss: {
        padding: "6px 14px",
        color: "__textSecondary",
        borderRadius: "0",
        transition: "all 150ms ease",
      },
      activeItemCss: {
        color: "__primary",
        backgroundColor: "__primary-08",
      },
      hoverItemCss: {
        backgroundColor: "__surfaceAlt",
        color: "__text",
      },
      isCollapsible: false,
      hasGroupHeaders: true,
      width: "200px",
    },
  },
  {
    id: "sidebar-minimal",
    category: "sidebars",
    name: "Minimal Icon",
    description: "Icon-only, tooltips on hover — ultra-clean",
    data: {
      variant: "minimal",
      css: {
        backgroundColor: "__surface",
        borderRight: "1px solid __border",
        height: "100%",
        padding: "12px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      itemCss: {
        padding: "8px",
        color: "__textMuted",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 150ms ease",
      },
      activeItemCss: {
        color: "__primary",
        backgroundColor: "__primary-10",
      },
      hoverItemCss: {
        backgroundColor: "__surfaceAlt",
        color: "__text",
      },
      isCollapsible: false,
      hasGroupHeaders: false,
      width: "56px",
    },
  },
  {
    id: "sidebar-dark",
    category: "sidebars",
    name: "Dark Sidebar",
    description: "Dark bg contrasting with light content — high contrast",
    data: {
      variant: "dark",
      css: {
        backgroundColor: "#1a1a2e",
        borderRight: "none",
        height: "100%",
        padding: "12px 0",
      },
      itemCss: {
        padding: "7px 14px",
        color: "rgba(255,255,255,0.6)",
        borderRadius: "0",
        transition: "all 150ms ease",
      },
      activeItemCss: {
        color: "#ffffff",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderLeft: "2px solid __primary",
      },
      hoverItemCss: {
        backgroundColor: "rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.85)",
      },
      isCollapsible: false,
      hasGroupHeaders: false,
      width: "200px",
    },
  },
];
