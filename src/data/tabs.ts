import type { CatalogItem, TabStyleData } from "@/lib/types";

export type TabGroup = "Horizontal" | "Vertical";

export interface TabMeta {
  id: string;
  group: TabGroup;
}

export const TAB_GROUPS: TabGroup[] = ["Horizontal", "Vertical"];

export const TAB_META: TabMeta[] = [
  { id: "tab-underline", group: "Horizontal" },
  { id: "tab-pill", group: "Horizontal" },
  { id: "tab-bordered", group: "Horizontal" },
  { id: "tab-scrollable", group: "Horizontal" },
  { id: "tab-vertical", group: "Vertical" },
  { id: "tab-icon-label", group: "Vertical" },
];

export const tabStyles: CatalogItem<TabStyleData>[] = [
  // ── Horizontal ─────────────────────────────────────────

  {
    id: "tab-underline",
    category: "tabs",
    name: "Underline",
    description: "Active tab has bottom border indicator — most common",
    data: {
      variant: "underline",
      orientation: "horizontal",
      containerCss: {
        display: "flex",
        borderBottom: "1px solid __border",
        gap: "0",
      },
      tabCss: {
        padding: "8px 14px",
        borderBottom: "2px solid transparent",
        color: "__textMuted",
        transition: "color 150ms ease, border-color 150ms ease",
      },
      activeTabCss: {
        color: "__primary",
        borderBottomColor: "__primary",
      },
      hoverTabCss: {
        color: "__text",
      },
      hasIcons: false,
      indicatorStyle: "underline",
    },
  },
  {
    id: "tab-pill",
    category: "tabs",
    name: "Pill / Button",
    description: "Active tab fills with background color — segmented control",
    data: {
      variant: "pill",
      orientation: "horizontal",
      containerCss: {
        display: "flex",
        gap: "4px",
        backgroundColor: "__surfaceAlt",
        padding: "3px",
        borderRadius: "8px",
      },
      tabCss: {
        padding: "6px 12px",
        borderRadius: "6px",
        color: "__textMuted",
        transition: "all 150ms ease",
      },
      activeTabCss: {
        backgroundColor: "__surface",
        color: "__text",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      },
      hoverTabCss: {
        color: "__text",
      },
      hasIcons: false,
      indicatorStyle: "pill",
    },
  },
  {
    id: "tab-bordered",
    category: "tabs",
    name: "Bordered",
    description: "Tab container has border, active tab connects — classic",
    data: {
      variant: "bordered",
      orientation: "horizontal",
      containerCss: {
        display: "flex",
        borderBottom: "1px solid __border",
        gap: "0",
      },
      tabCss: {
        padding: "8px 14px",
        border: "1px solid transparent",
        borderBottom: "none",
        borderRadius: "6px 6px 0 0",
        color: "__textMuted",
        marginBottom: "-1px",
        transition: "all 150ms ease",
      },
      activeTabCss: {
        backgroundColor: "__surface",
        color: "__text",
        borderColor: "__border",
      },
      hoverTabCss: {
        color: "__text",
        backgroundColor: "__surfaceAlt",
      },
      hasIcons: false,
      indicatorStyle: "border",
    },
  },
  {
    id: "tab-scrollable",
    category: "tabs",
    name: "Scrollable",
    description: "Horizontal scroll for many tabs, fade edges",
    data: {
      variant: "scrollable",
      orientation: "horizontal",
      containerCss: {
        display: "flex",
        borderBottom: "1px solid __border",
        gap: "0",
        overflowX: "auto",
      },
      tabCss: {
        padding: "8px 14px",
        borderBottom: "2px solid transparent",
        color: "__textMuted",
        whiteSpace: "nowrap",
        flexShrink: "0",
        transition: "color 150ms ease, border-color 150ms ease",
      },
      activeTabCss: {
        color: "__primary",
        borderBottomColor: "__primary",
      },
      hoverTabCss: {
        color: "__text",
      },
      hasIcons: false,
      indicatorStyle: "underline",
    },
  },

  // ── Vertical ───────────────────────────────────────────

  {
    id: "tab-vertical",
    category: "tabs",
    name: "Vertical",
    description: "Stacked vertically with left indicator — settings pages",
    data: {
      variant: "vertical",
      orientation: "vertical",
      containerCss: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        borderRight: "1px solid __border",
        paddingRight: "8px",
      },
      tabCss: {
        padding: "6px 12px",
        borderLeft: "2px solid transparent",
        borderRadius: "0 4px 4px 0",
        color: "__textMuted",
        transition: "all 150ms ease",
      },
      activeTabCss: {
        color: "__primary",
        borderLeftColor: "__primary",
        backgroundColor: "__primary-08",
      },
      hoverTabCss: {
        color: "__text",
        backgroundColor: "__surfaceAlt",
      },
      hasIcons: false,
      indicatorStyle: "underline",
    },
  },
  {
    id: "tab-icon-label",
    category: "tabs",
    name: "Icon + Label",
    description: "Icon above label per tab — dashboard navigation",
    data: {
      variant: "icon-label",
      orientation: "vertical",
      containerCss: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      },
      tabCss: {
        padding: "8px 12px",
        borderRadius: "8px",
        color: "__textMuted",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 150ms ease",
      },
      activeTabCss: {
        color: "__primary",
        backgroundColor: "__primary-10",
      },
      hoverTabCss: {
        color: "__text",
        backgroundColor: "__surfaceAlt",
      },
      hasIcons: true,
      indicatorStyle: "filled",
    },
  },
];
