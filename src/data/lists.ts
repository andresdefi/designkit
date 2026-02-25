import type { CatalogItem, ListStyleData } from "@/lib/types";

export type ListGroup = "Simple" | "With Leading" | "With Trailing" | "Grouped" | "Interactive";

export interface ListMeta {
  id: string;
  group: ListGroup;
}

export const LIST_GROUPS: ListGroup[] = ["Simple", "With Leading", "With Trailing", "Grouped", "Interactive"];

export const LIST_META: ListMeta[] = [
  { id: "simple-text-row", group: "Simple" },
  { id: "with-leading-icon", group: "With Leading" },
  { id: "with-leading-avatar", group: "With Leading" },
  { id: "with-trailing-action", group: "With Trailing" },
  { id: "with-description", group: "Simple" },
  { id: "swipeable-actions", group: "Interactive" },
  { id: "grouped-sections", group: "Grouped" },
  { id: "inset-grouped", group: "Grouped" },
  { id: "with-checkbox", group: "Interactive" },
  { id: "with-toggle", group: "Interactive" },
  { id: "expandable-accordion", group: "Interactive" },
];

export const listStyles: CatalogItem<ListStyleData>[] = [
  {
    id: "simple-text-row",
    category: "lists",
    name: "Simple Text Row",
    description: "Clean single-line text list items",
    data: {
      variant: "simple",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: false,
      hasTrailingElement: false,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "with-leading-icon",
    category: "lists",
    name: "With Leading Icon",
    description: "List items with an icon on the left side",
    data: {
      variant: "leading-icon",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: true,
      hasTrailingElement: false,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "with-leading-avatar",
    category: "lists",
    name: "With Leading Avatar",
    description: "List items with an avatar circle on the left",
    data: {
      variant: "leading-avatar",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: true,
      hasTrailingElement: false,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "with-trailing-action",
    category: "lists",
    name: "With Trailing Action",
    description: "List items with an action element on the right",
    data: {
      variant: "trailing-action",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: false,
      hasTrailingElement: true,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "with-description",
    category: "lists",
    name: "With Description",
    description: "Two-line list items with title and subtitle",
    data: {
      variant: "description",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: false,
      hasTrailingElement: false,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "swipeable-actions",
    category: "lists",
    name: "Swipeable Actions",
    description: "List items with hidden swipe-to-reveal action buttons",
    data: {
      variant: "swipeable",
      css: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      },
      itemCss: {
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
        backgroundColor: "__surface",
        transition: "transform 200ms ease",
      },
      hasLeadingElement: false,
      hasTrailingElement: true,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "grouped-sections",
    category: "lists",
    name: "Grouped Sections",
    description: "List items organized under section headers",
    data: {
      variant: "grouped",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: false,
      hasTrailingElement: false,
      isGrouped: true,
      isExpandable: false,
    },
  },
  {
    id: "inset-grouped",
    category: "lists",
    name: "Inset Grouped",
    description: "iOS-style inset grouped list with rounded section containers",
    data: {
      variant: "inset-grouped",
      css: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
      itemCss: {
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
        backgroundColor: "__surface",
      },
      activeItemCss: {
        backgroundColor: "__primary-10",
      },
      hasLeadingElement: false,
      hasTrailingElement: false,
      isGrouped: true,
      isExpandable: false,
    },
  },
  {
    id: "with-checkbox",
    category: "lists",
    name: "With Checkbox",
    description: "Selectable list items with leading checkboxes",
    data: {
      variant: "checkbox",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
        cursor: "pointer",
      },
      activeItemCss: {
        backgroundColor: "__primary-05",
      },
      hasLeadingElement: true,
      hasTrailingElement: false,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "with-toggle",
    category: "lists",
    name: "With Toggle",
    description: "Settings-style list with trailing toggle switches",
    data: {
      variant: "toggle",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasLeadingElement: false,
      hasTrailingElement: true,
      isGrouped: false,
      isExpandable: false,
    },
  },
  {
    id: "expandable-accordion",
    category: "lists",
    name: "Expandable Accordion",
    description: "Collapsible list items that expand to show more content",
    data: {
      variant: "accordion",
      css: {
        display: "flex",
        flexDirection: "column",
      },
      itemCss: {
        padding: "12px 16px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
        cursor: "pointer",
        transition: "background-color 150ms ease",
      },
      activeItemCss: {
        backgroundColor: "__primary-05",
        borderLeft: "2px solid __primary",
      },
      hasLeadingElement: false,
      hasTrailingElement: true,
      isGrouped: false,
      isExpandable: true,
    },
  },
];
