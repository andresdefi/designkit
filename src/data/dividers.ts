import type { CatalogItem, DividerStyleData } from "@/lib/types";

export type DividerGroup = "Line" | "Decorative";

export interface DividerMeta {
  id: string;
  group: DividerGroup;
}

export const DIVIDER_GROUPS: DividerGroup[] = ["Line", "Decorative"];

export const DIVIDER_META: DividerMeta[] = [
  { id: "solid-line", group: "Line" },
  { id: "dashed-line", group: "Line" },
  { id: "dotted-line", group: "Line" },
  { id: "with-text-label", group: "Decorative" },
  { id: "gradient-fade", group: "Decorative" },
  { id: "thick-decorative", group: "Decorative" },
  { id: "with-icon-centered", group: "Decorative" },
];

export const dividerStyles: CatalogItem<DividerStyleData>[] = [
  {
    id: "solid-line",
    category: "dividers",
    name: "Solid Line",
    description: "Simple solid horizontal rule",
    data: {
      variant: "solid",
      css: {
        borderTop: "1px solid __border",
        width: "100%",
      },
      style: "solid",
      hasLabel: false,
      hasIcon: false,
      thickness: "1px",
    },
  },
  {
    id: "dashed-line",
    category: "dividers",
    name: "Dashed Line",
    description: "Dashed horizontal rule for draft-like separation",
    data: {
      variant: "dashed",
      css: {
        borderTop: "1px dashed __border",
        width: "100%",
      },
      style: "dashed",
      hasLabel: false,
      hasIcon: false,
      thickness: "1px",
    },
  },
  {
    id: "dotted-line",
    category: "dividers",
    name: "Dotted Line",
    description: "Dotted horizontal rule for subtle separation",
    data: {
      variant: "dotted",
      css: {
        borderTop: "2px dotted __border",
        width: "100%",
      },
      style: "dotted",
      hasLabel: false,
      hasIcon: false,
      thickness: "2px",
    },
  },
  {
    id: "with-text-label",
    category: "dividers",
    name: "With Text Label",
    description: "Divider with centered text label like 'or' or 'continue'",
    data: {
      variant: "text-label",
      css: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        color: "__textMuted",
        fontSize: "12px",
      },
      style: "solid",
      hasLabel: true,
      hasIcon: false,
      thickness: "1px",
    },
  },
  {
    id: "gradient-fade",
    category: "dividers",
    name: "Gradient Fade",
    description: "Line that fades from primary to transparent at both ends",
    data: {
      variant: "gradient",
      css: {
        height: "1px",
        width: "100%",
        background: "linear-gradient(to right, transparent, __primary-40, transparent)",
      },
      style: "gradient",
      hasLabel: false,
      hasIcon: false,
      thickness: "1px",
    },
  },
  {
    id: "thick-decorative",
    category: "dividers",
    name: "Thick Decorative",
    description: "Bold accent-colored bar for strong visual separation",
    data: {
      variant: "thick",
      css: {
        height: "3px",
        width: "48px",
        backgroundColor: "__primary",
        borderRadius: "9999px",
      },
      style: "decorative",
      hasLabel: false,
      hasIcon: false,
      thickness: "3px",
    },
  },
  {
    id: "with-icon-centered",
    category: "dividers",
    name: "With Icon Centered",
    description: "Divider with a centered icon between two lines",
    data: {
      variant: "icon-centered",
      css: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        color: "__textMuted",
      },
      style: "solid",
      hasLabel: false,
      hasIcon: true,
      thickness: "1px",
    },
  },
];
