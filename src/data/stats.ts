import type { CatalogItem, StatStyleData } from "@/lib/types";

export type StatGroup = "Simple" | "Card" | "Visual";

export interface StatMeta {
  id: string;
  group: StatGroup;
}

export const STAT_GROUPS: StatGroup[] = ["Simple", "Card", "Visual"];

export const STAT_META: StatMeta[] = [
  { id: "large-number-label", group: "Simple" },
  { id: "with-icon", group: "Simple" },
  { id: "with-trend-arrow", group: "Simple" },
  { id: "card-stat", group: "Card" },
  { id: "inline-stat", group: "Simple" },
  { id: "progress-ring", group: "Visual" },
  { id: "sparkline", group: "Visual" },
  { id: "comparison-stat", group: "Visual" },
];

export const statStyles: CatalogItem<StatStyleData>[] = [
  {
    id: "large-number-label",
    category: "stats",
    name: "Large Number + Label",
    description: "Bold number with a small label underneath",
    data: {
      variant: "large-number",
      layout: "stacked",
      css: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2px",
      },
      valueCss: {
        fontSize: "28px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: false,
      hasChart: false,
    },
  },
  {
    id: "with-icon",
    category: "stats",
    name: "With Icon",
    description: "Stat with a leading icon for quick visual identification",
    data: {
      variant: "with-icon",
      layout: "stacked",
      css: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
      },
      valueCss: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "__text",
      },
      hasIcon: true,
      hasTrend: false,
      hasChart: false,
    },
  },
  {
    id: "with-trend-arrow",
    category: "stats",
    name: "With Trend Arrow",
    description: "Number with an up/down trend indicator and percentage",
    data: {
      variant: "trend-arrow",
      layout: "stacked",
      css: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px",
      },
      valueCss: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: true,
      hasChart: false,
    },
  },
  {
    id: "card-stat",
    category: "stats",
    name: "Card Stat",
    description: "Stat enclosed in a card container with surface background",
    data: {
      variant: "card",
      layout: "card",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      },
      valueCss: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: true,
      hasChart: false,
    },
  },
  {
    id: "inline-stat",
    category: "stats",
    name: "Inline Stat",
    description: "Horizontal layout with label and value side by side",
    data: {
      variant: "inline",
      layout: "inline",
      css: {
        display: "flex",
        alignItems: "baseline",
        gap: "8px",
      },
      valueCss: {
        fontSize: "20px",
        fontWeight: "700",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: false,
      hasChart: false,
    },
  },
  {
    id: "progress-ring",
    category: "stats",
    name: "Progress Ring",
    description: "Circular progress indicator with the value centered inside",
    data: {
      variant: "progress-ring",
      layout: "stacked",
      css: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      },
      valueCss: {
        fontSize: "18px",
        fontWeight: "700",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: false,
      hasChart: true,
    },
  },
  {
    id: "sparkline",
    category: "stats",
    name: "Sparkline",
    description: "Small inline chart below the stat value showing trend",
    data: {
      variant: "sparkline",
      layout: "stacked",
      css: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "6px",
      },
      valueCss: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: false,
      hasChart: true,
    },
  },
  {
    id: "comparison-stat",
    category: "stats",
    name: "Comparison",
    description: "Side-by-side current vs previous period comparison",
    data: {
      variant: "comparison",
      layout: "inline",
      css: {
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
      },
      valueCss: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "__text",
      },
      hasIcon: false,
      hasTrend: true,
      hasChart: false,
    },
  },
];
