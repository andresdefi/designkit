import type { CatalogItem, TableStyleData } from "@/lib/types";

export type TableGroup = "Standard" | "Styled" | "Interactive";

export interface TableMeta {
  id: string;
  group: TableGroup;
}

export const TABLE_GROUPS: TableGroup[] = ["Standard", "Styled", "Interactive"];

export const TABLE_META: TableMeta[] = [
  { id: "simple-clean", group: "Standard" },
  { id: "striped-rows", group: "Styled" },
  { id: "bordered", group: "Standard" },
  { id: "hoverable-rows", group: "Interactive" },
  { id: "compact-dense", group: "Standard" },
  { id: "card-rows", group: "Styled" },
  { id: "sticky-header", group: "Interactive" },
  { id: "with-selection", group: "Interactive" },
];

export const tableStyles: CatalogItem<TableStyleData>[] = [
  {
    id: "simple-clean",
    category: "tables",
    name: "Simple Clean",
    description: "Minimal table with light bottom borders between rows",
    data: {
      variant: "simple",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
      },
      headerCss: {
        padding: "8px 12px",
        borderBottom: "2px solid __border",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
      rowCss: {
        padding: "10px 12px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasStickyHeader: false,
      hasRowSelection: false,
      density: "default",
    },
  },
  {
    id: "striped-rows",
    category: "tables",
    name: "Striped Rows",
    description: "Alternating row backgrounds for easy scanning",
    data: {
      variant: "striped",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
      },
      headerCss: {
        padding: "8px 12px",
        borderBottom: "2px solid __border",
        backgroundColor: "__surface",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
      },
      rowCss: {
        padding: "10px 12px",
        color: "__text",
        fontSize: "14px",
      },
      altRowCss: {
        backgroundColor: "__surfaceAlt",
      },
      hasStickyHeader: false,
      hasRowSelection: false,
      density: "default",
    },
  },
  {
    id: "bordered",
    category: "tables",
    name: "Bordered",
    description: "Full grid borders around every cell",
    data: {
      variant: "bordered",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid __border",
      },
      headerCss: {
        padding: "8px 12px",
        border: "1px solid __border",
        backgroundColor: "__surface",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
      },
      rowCss: {
        padding: "10px 12px",
        border: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasStickyHeader: false,
      hasRowSelection: false,
      density: "default",
    },
  },
  {
    id: "hoverable-rows",
    category: "tables",
    name: "Hoverable Rows",
    description: "Rows highlight on hover for interactive feel",
    data: {
      variant: "hoverable",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
      },
      headerCss: {
        padding: "8px 12px",
        borderBottom: "2px solid __border",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
      },
      rowCss: {
        padding: "10px 12px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
        transition: "background-color 150ms ease",
        cursor: "pointer",
      },
      hoverRowCss: {
        backgroundColor: "__primary-08",
      },
      hasStickyHeader: false,
      hasRowSelection: false,
      density: "default",
    },
  },
  {
    id: "compact-dense",
    category: "tables",
    name: "Compact Dense",
    description: "Tight padding for data-heavy tables",
    data: {
      variant: "compact",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
      },
      headerCss: {
        padding: "4px 8px",
        borderBottom: "1px solid __border",
        color: "__textMuted",
        fontSize: "11px",
        fontWeight: "600",
        textAlign: "left",
      },
      rowCss: {
        padding: "4px 8px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "12px",
      },
      hasStickyHeader: false,
      hasRowSelection: false,
      density: "compact",
    },
  },
  {
    id: "card-rows",
    category: "tables",
    name: "Card Rows",
    description: "Each row styled as a separate card with spacing between",
    data: {
      variant: "card-rows",
      containerCss: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 6px",
      },
      headerCss: {
        padding: "8px 16px",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
      },
      rowCss: {
        padding: "12px 16px",
        backgroundColor: "__surface",
        color: "__text",
        fontSize: "14px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      },
      hasStickyHeader: false,
      hasRowSelection: false,
      density: "relaxed",
    },
  },
  {
    id: "sticky-header",
    category: "tables",
    name: "Sticky Header",
    description: "Header row stays fixed while scrolling through data",
    data: {
      variant: "sticky",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
      },
      headerCss: {
        padding: "8px 12px",
        borderBottom: "2px solid __border",
        backgroundColor: "__surface",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
        position: "sticky",
        top: "0",
        zIndex: "1",
      },
      rowCss: {
        padding: "10px 12px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
      },
      hasStickyHeader: true,
      hasRowSelection: false,
      density: "default",
    },
  },
  {
    id: "with-selection",
    category: "tables",
    name: "With Selection",
    description: "Rows with checkboxes for multi-select operations",
    data: {
      variant: "selection",
      containerCss: {
        width: "100%",
        borderCollapse: "collapse",
      },
      headerCss: {
        padding: "8px 12px",
        borderBottom: "2px solid __border",
        color: "__textMuted",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "left",
      },
      rowCss: {
        padding: "10px 12px",
        borderBottom: "1px solid __border",
        color: "__text",
        fontSize: "14px",
        transition: "background-color 150ms ease",
      },
      hoverRowCss: {
        backgroundColor: "__primary-05",
      },
      hasStickyHeader: false,
      hasRowSelection: true,
      density: "default",
    },
  },
];
