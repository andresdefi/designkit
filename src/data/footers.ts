import type { CatalogItem, FooterStyleData } from "@/lib/types";

export type FooterGroup = "Simple" | "Rich";

export interface FooterMeta {
  id: string;
  group: FooterGroup;
}

export const FOOTER_GROUPS: FooterGroup[] = ["Simple", "Rich"];

export const FOOTER_META: FooterMeta[] = [
  { id: "footer-simple", group: "Simple" },
  { id: "footer-minimal", group: "Simple" },
  { id: "footer-multi-column", group: "Simple" },
  { id: "footer-cta", group: "Rich" },
  { id: "footer-fat", group: "Rich" },
];

export const footerStyles: CatalogItem<FooterStyleData>[] = [
  // ── Simple ─────────────────────────────────────────────

  {
    id: "footer-simple",
    category: "footers",
    name: "Simple Centered",
    description: "Logo + copyright centered — minimal",
    data: {
      variant: "simple",
      columns: 0,
      css: {
        backgroundColor: "__surface",
        borderTop: "1px solid __border",
        padding: "16px 24px",
        textAlign: "center",
      },
      hasCta: false,
      hasNewsletter: false,
    },
  },
  {
    id: "footer-minimal",
    category: "footers",
    name: "Minimal One-Line",
    description: "Single line: links left, copyright right",
    data: {
      variant: "minimal",
      columns: 0,
      css: {
        backgroundColor: "__surface",
        borderTop: "1px solid __border",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      hasCta: false,
      hasNewsletter: false,
    },
  },
  {
    id: "footer-multi-column",
    category: "footers",
    name: "Multi-Column",
    description: "3-4 link columns + branding — standard corporate",
    data: {
      variant: "multi-column",
      columns: 4,
      css: {
        backgroundColor: "__surface",
        borderTop: "1px solid __border",
        padding: "24px",
      },
      hasCta: false,
      hasNewsletter: false,
    },
  },

  // ── Rich ───────────────────────────────────────────────

  {
    id: "footer-cta",
    category: "footers",
    name: "CTA Footer",
    description: "Call-to-action section above link columns — conversion",
    data: {
      variant: "cta",
      columns: 3,
      css: {
        backgroundColor: "__surface",
        borderTop: "1px solid __border",
        padding: "24px",
      },
      hasCta: true,
      hasNewsletter: false,
    },
  },
  {
    id: "footer-fat",
    category: "footers",
    name: "Fat Footer",
    description: "Links + newsletter + social + badges — comprehensive",
    data: {
      variant: "fat",
      columns: 4,
      css: {
        backgroundColor: "__surface",
        borderTop: "1px solid __border",
        padding: "24px",
      },
      hasCta: false,
      hasNewsletter: true,
    },
  },
];
