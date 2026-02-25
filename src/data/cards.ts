import type { CatalogItem, CardStyleData } from "@/lib/types";

export type CardGroup = "Flat" | "Elevated" | "Glass & Gradient" | "Accented" | "Neumorphic" | "Special" | "Expressive";

export interface CardMeta {
  id: string;
  group: CardGroup;
}

export const CARD_GROUPS: CardGroup[] = [
  "Flat",
  "Elevated",
  "Glass & Gradient",
  "Accented",
  "Neumorphic",
  "Special",
  "Expressive",
];

export const CARD_META: CardMeta[] = [
  // Flat (5)
  { id: "flat", group: "Flat" },
  { id: "flat-border", group: "Flat" },
  { id: "minimal-text", group: "Flat" },
  { id: "dotted-border", group: "Flat" },
  { id: "outlined-dashed", group: "Flat" },
  // Elevated (6)
  { id: "soft-shadow", group: "Elevated" },
  { id: "material-elevated", group: "Elevated" },
  { id: "heavy-shadow", group: "Elevated" },
  { id: "colored-shadow", group: "Elevated" },
  { id: "floating", group: "Elevated" },
  { id: "gradient-shadow", group: "Elevated" },
  // Glass & Gradient (5)
  { id: "glassmorphic", group: "Glass & Gradient" },
  { id: "gradient-border", group: "Glass & Gradient" },
  { id: "gradient-fill", group: "Glass & Gradient" },
  { id: "frosted-dark", group: "Glass & Gradient" },
  { id: "split-card", group: "Glass & Gradient" },
  // Accented (5)
  { id: "accent-top", group: "Accented" },
  { id: "accent-left", group: "Accented" },
  { id: "outlined-bold", group: "Accented" },
  { id: "card-ribbon", group: "Accented" },
  { id: "sectioned", group: "Accented" },
  // Neumorphic (3)
  { id: "neumorphic-raised", group: "Neumorphic" },
  { id: "neumorphic-inset", group: "Neumorphic" },
  { id: "inset-recessed", group: "Neumorphic" },
  // Special (10)
  { id: "brutalist", group: "Special" },
  { id: "image-header", group: "Special" },
  { id: "full-bleed-image", group: "Special" },
  { id: "horizontal", group: "Special" },
  { id: "interactive-tilt", group: "Special" },
  { id: "expandable", group: "Special" },
  { id: "hover-reveal", group: "Special" },
  { id: "stacked", group: "Special" },
  { id: "paper-stack", group: "Special" },
  { id: "cutout-window", group: "Special" },
  // Expressive (6)
  { id: "neon-glow", group: "Expressive" },
  { id: "retro-pixel", group: "Expressive" },
  { id: "claymorphism", group: "Expressive" },
  { id: "spotlight", group: "Expressive" },
  { id: "overlay-pattern", group: "Expressive" },
  { id: "morphing-border", group: "Expressive" },
];

// NOTE on color convention:
// Colors are resolved dynamically from the active palette at render time.
// Special keys prefixed with __ are interpreted by the renderer:
//   __primary     -> colors.primary
//   __primary-10  -> rgba(primary, 0.10)
//   __surface     -> colors.surface
//   __border      -> colors.border
//   __text        -> colors.text
//   __textMuted   -> colors.textMuted
//   __accent      -> colors.accent
// The CSS here is structural only — shape, shadow, border-width, transitions, etc.

export const cardStyles: CatalogItem<CardStyleData>[] = [
  // ── Flat ──────────────────────────────────────────────────

  {
    id: "flat",
    category: "cards",
    name: "Flat",
    description: "Clean card with surface background, no border or shadow",
    data: {
      variant: "flat",
      css: {
        backgroundColor: "__surface",
        borderRadius: "12px",
        padding: "16px",
        transition: "background-color 200ms ease",
      },
      hoverCss: {
        backgroundColor: "__surfaceAlt",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "flat-border",
    category: "cards",
    name: "Flat + Border",
    description: "Flat card with a subtle 1px border for definition",
    data: {
      variant: "flat-border",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 200ms ease",
      },
      hoverCss: {
        borderColor: "__primary-30",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "minimal-text",
    category: "cards",
    name: "Minimal Text",
    description: "No background — just content with subtle separator",
    data: {
      variant: "minimal-text",
      css: {
        backgroundColor: "transparent",
        borderBottom: "1px solid __border",
        borderRadius: "0",
        padding: "16px 0",
        transition: "border-color 200ms ease",
      },
      hoverCss: {
        borderBottomColor: "__primary-40",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Elevated ──────────────────────────────────────────────

  {
    id: "soft-shadow",
    category: "cards",
    name: "Soft Shadow",
    description: "Gentle elevation with a diffuse, soft box shadow",
    data: {
      variant: "soft-shadow",
      css: {
        backgroundColor: "__surface",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
        transform: "translateY(-2px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "material-elevated",
    category: "cards",
    name: "Material Elevated",
    description: "Material Design-style tiered shadow for depth",
    data: {
      variant: "material-elevated",
      css: {
        backgroundColor: "__surface",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "box-shadow 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "heavy-shadow",
    category: "cards",
    name: "Heavy Shadow",
    description: "Bold, dramatic shadow for high-emphasis cards",
    data: {
      variant: "heavy-shadow",
      css: {
        backgroundColor: "__surface",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 28px 56px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.15)",
        transform: "translateY(-4px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "colored-shadow",
    category: "cards",
    name: "Colored Shadow",
    description: "Shadow tinted with the primary color for brand emphasis",
    data: {
      variant: "colored-shadow",
      css: {
        backgroundColor: "__surface",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 14px __primary-25",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 8px 28px __primary-40",
        transform: "translateY(-2px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Glass & Gradient ──────────────────────────────────────

  {
    id: "glassmorphic",
    category: "cards",
    name: "Glassmorphic",
    description: "Frosted glass effect with backdrop blur and translucent fill",
    data: {
      variant: "glassmorphic",
      css: {
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color 300ms ease, background-color 300ms ease",
      },
      hoverCss: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.2)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "gradient-border",
    category: "cards",
    name: "Gradient Border",
    description: "Transparent card with a gradient-shimmer border effect",
    data: {
      variant: "gradient-border",
      css: {
        backgroundColor: "__surface",
        border: "2px solid __primary-30",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 300ms ease",
      },
      hoverCss: {
        borderColor: "__primary-60",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "gradient-fill",
    category: "cards",
    name: "Gradient Fill",
    description: "Subtle gradient background from primary to accent",
    data: {
      variant: "gradient-fill",
      css: {
        background: "linear-gradient(135deg, __primary-15, __accent-15)",
        border: "1px solid __primary-20",
        borderRadius: "12px",
        padding: "16px",
        transition: "opacity 300ms ease",
      },
      hoverCss: {
        opacity: "0.9",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Accented ──────────────────────────────────────────────

  {
    id: "accent-top",
    category: "cards",
    name: "Accent Top Border",
    description: "Card with a bold primary-colored top border strip",
    data: {
      variant: "accent-top",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderTop: "3px solid __primary",
        borderRadius: "0 0 12px 12px",
        padding: "16px",
        transition: "border-color 200ms ease, box-shadow 200ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "accent-left",
    category: "cards",
    name: "Accent Left Border",
    description: "Card with a thick primary-colored left stripe",
    data: {
      variant: "accent-left",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderLeft: "4px solid __primary",
        borderRadius: "0 12px 12px 0",
        padding: "16px",
        transition: "border-color 200ms ease, box-shadow 200ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "outlined-bold",
    category: "cards",
    name: "Outlined Bold",
    description: "Thick 2px border with transparent background",
    data: {
      variant: "outlined-bold",
      css: {
        backgroundColor: "transparent",
        border: "2px solid __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 200ms ease",
      },
      hoverCss: {
        borderColor: "__primary",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "card-ribbon",
    category: "cards",
    name: "Card with Ribbon",
    description: "Card with a small colored ribbon badge in the corner",
    data: {
      variant: "card-ribbon",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 200ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Neumorphic ────────────────────────────────────────────

  {
    id: "neumorphic-raised",
    category: "cards",
    name: "Neumorphic Raised",
    description: "Soft extruded look with dual opposing shadows",
    data: {
      variant: "neumorphic-raised",
      css: {
        backgroundColor: "__surface",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "6px 6px 14px rgba(0,0,0,0.25), -6px -6px 14px rgba(255,255,255,0.07)",
        transition: "box-shadow 300ms ease",
      },
      hoverCss: {
        boxShadow: "8px 8px 18px rgba(0,0,0,0.3), -8px -8px 18px rgba(255,255,255,0.09)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "neumorphic-inset",
    category: "cards",
    name: "Neumorphic Inset",
    description: "Pressed-in neumorphic look with inset shadows",
    data: {
      variant: "neumorphic-inset",
      css: {
        backgroundColor: "__surface",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.25), inset -4px -4px 10px rgba(255,255,255,0.06)",
        transition: "box-shadow 300ms ease",
      },
      hoverCss: {
        boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.15), inset -2px -2px 6px rgba(255,255,255,0.04)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Special ───────────────────────────────────────────────

  {
    id: "brutalist",
    category: "cards",
    name: "Brutalist",
    description: "Hard black border with offset shadow — bold and raw",
    data: {
      variant: "brutalist",
      css: {
        backgroundColor: "__surface",
        border: "2px solid __text",
        borderRadius: "0",
        padding: "16px",
        boxShadow: "4px 4px 0 __text",
        transition: "box-shadow 150ms ease, transform 150ms ease",
      },
      hoverCss: {
        boxShadow: "6px 6px 0 __text",
        transform: "translate(-2px, -2px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "image-header",
    category: "cards",
    name: "Image Header",
    description: "Card with an image zone at the top, content below",
    data: {
      variant: "image-header",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "0",
        overflow: "hidden",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transform: "translateY(-2px)",
      },
      hasImage: true,
      layout: "vertical",
    },
  },
  {
    id: "full-bleed-image",
    category: "cards",
    name: "Full-Bleed Image",
    description: "Image fills the entire card, text overlaid at bottom",
    data: {
      variant: "full-bleed-image",
      css: {
        backgroundColor: "__surface",
        borderRadius: "12px",
        padding: "0",
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
        transform: "translateY(-2px)",
      },
      hasImage: true,
      layout: "vertical",
    },
  },
  {
    id: "horizontal",
    category: "cards",
    name: "Horizontal",
    description: "Side-by-side layout with image left, content right",
    data: {
      variant: "horizontal",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "0",
        overflow: "hidden",
        display: "flex",
        transition: "box-shadow 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      },
      hasImage: true,
      layout: "horizontal",
    },
  },
  {
    id: "interactive-tilt",
    category: "cards",
    name: "Interactive Tilt",
    description: "Card tilts toward the cursor on hover for depth effect",
    data: {
      variant: "interactive-tilt",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        transformStyle: "preserve-3d",
        perspective: "600px",
      },
      hoverCss: {
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "expandable",
    category: "cards",
    name: "Expandable",
    description: "Compact card that expands to reveal more content on click",
    data: {
      variant: "expandable",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        transition: "box-shadow 200ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "hover-reveal",
    category: "cards",
    name: "Hover Reveal",
    description: "Hidden action bar or content revealed on hover",
    data: {
      variant: "hover-reveal",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        overflow: "hidden",
        transition: "border-color 200ms ease, box-shadow 200ms ease",
      },
      hoverCss: {
        borderColor: "__primary-30",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "stacked",
    category: "cards",
    name: "Stacked Cards",
    description: "Layered card effect with offset background layers behind",
    data: {
      variant: "stacked",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        position: "relative",
        transition: "transform 200ms ease",
      },
      hoverCss: {
        transform: "translateY(-4px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "paper-stack",
    category: "cards",
    name: "Paper Stack",
    description: "Multiple offset paper layers fanned behind the card",
    data: {
      variant: "paper-stack",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "8px",
        padding: "16px",
        position: "relative",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
      },
      hoverCss: {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "cutout-window",
    category: "cards",
    name: "Cutout Window",
    description: "Card with a transparent inner section creating a window effect",
    data: {
      variant: "cutout-window",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 200ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Flat (continued) ────────────────────────────────────

  {
    id: "dotted-border",
    category: "cards",
    name: "Dotted Border",
    description: "Lightweight dotted outline with a draft/placeholder feel",
    data: {
      variant: "dotted-border",
      css: {
        backgroundColor: "__surface",
        border: "2px dotted __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 200ms ease",
      },
      hoverCss: {
        borderColor: "__primary-40",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "outlined-dashed",
    category: "cards",
    name: "Outlined Dashed",
    description: "Dashed border with a sketchy, draft-like feel",
    data: {
      variant: "outlined-dashed",
      css: {
        backgroundColor: "transparent",
        border: "2px dashed __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 200ms ease, background-color 200ms ease",
      },
      hoverCss: {
        borderColor: "__primary-50",
        backgroundColor: "__primary-05",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Elevated (continued) ────────────────────────────────

  {
    id: "floating",
    category: "cards",
    name: "Floating",
    description: "Extra-large soft shadow, feels detached from the page",
    data: {
      variant: "floating",
      css: {
        backgroundColor: "__surface",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 24px 64px rgba(0,0,0,0.16), 0 8px 20px rgba(0,0,0,0.08)",
        transform: "translateY(-4px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "gradient-shadow",
    category: "cards",
    name: "Gradient Shadow",
    description: "Shadow blends primary and accent color tints",
    data: {
      variant: "gradient-shadow",
      css: {
        backgroundColor: "__surface",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "4px 4px 14px __primary-25, -4px 4px 14px __accent-25",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "6px 6px 24px __primary-35, -6px 6px 24px __accent-35",
        transform: "translateY(-2px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Glass & Gradient (continued) ────────────────────────

  {
    id: "frosted-dark",
    category: "cards",
    name: "Frosted Dark",
    description: "Dark glassmorphic effect with blur on a dark translucent background",
    data: {
      variant: "frosted-dark",
      css: {
        backgroundColor: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color 300ms ease, background-color 300ms ease",
      },
      hoverCss: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderColor: "rgba(255,255,255,0.14)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "split-card",
    category: "cards",
    name: "Split Card",
    description: "Two-tone background with a hard-stop gradient split",
    data: {
      variant: "split-card",
      css: {
        background: "linear-gradient(135deg, __primary-18 50%, __accent-18 50%)",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "opacity 300ms ease, box-shadow 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Accented (continued) ────────────────────────────────

  {
    id: "sectioned",
    category: "cards",
    name: "Sectioned",
    description: "Distinct header, body, and footer zones separated by divider lines",
    data: {
      variant: "sectioned",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "0",
        overflow: "hidden",
        transition: "box-shadow 200ms ease",
      },
      hoverCss: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Neumorphic (continued) ──────────────────────────────

  {
    id: "inset-recessed",
    category: "cards",
    name: "Inset Recessed",
    description: "Sunken into the page with a darker background and inner shadow",
    data: {
      variant: "inset-recessed",
      css: {
        backgroundColor: "rgba(0,0,0,0.2)",
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "inset 0 3px 8px rgba(0,0,0,0.3), inset 0 -1px 3px rgba(255,255,255,0.04)",
        transition: "box-shadow 300ms ease",
      },
      hoverCss: {
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), inset 0 -1px 3px rgba(255,255,255,0.05)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },

  // ── Expressive ──────────────────────────────────────────

  {
    id: "neon-glow",
    category: "cards",
    name: "Neon Glow",
    description: "Vivid primary-colored glow border and shadow with a cyberpunk feel",
    data: {
      variant: "neon-glow",
      css: {
        backgroundColor: "rgba(0,0,0,0.6)",
        border: "2px solid __primary-70",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 0 16px __primary-40, 0 0 32px __primary-20, inset 0 0 12px __primary-10",
        transition: "box-shadow 300ms ease, border-color 300ms ease",
      },
      hoverCss: {
        borderColor: "__primary",
        boxShadow: "0 0 28px __primary-60, 0 0 48px __primary-30, inset 0 0 16px __primary-15",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "retro-pixel",
    category: "cards",
    name: "Retro Pixel",
    description: "Pixelated 8-bit aesthetic with stepped borders and hard offset shadow",
    data: {
      variant: "retro-pixel",
      css: {
        backgroundColor: "__surface",
        border: "3px solid __text",
        borderRadius: "0",
        padding: "16px",
        boxShadow: "6px 6px 0 __primary",
        imageRendering: "pixelated",
        transition: "box-shadow 150ms ease, transform 150ms ease",
      },
      hoverCss: {
        boxShadow: "8px 8px 0 __primary",
        transform: "translate(-2px, -2px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "claymorphism",
    category: "cards",
    name: "Claymorphism",
    description: "Rounded, inflated 3D look with heavy rounded shadow",
    data: {
      variant: "claymorphism",
      css: {
        backgroundColor: "__primary-22",
        border: "1px solid __primary-30",
        borderRadius: "24px",
        padding: "20px",
        boxShadow: "0 8px 24px __primary-20, inset 0 -4px 8px __primary-12",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      },
      hoverCss: {
        boxShadow: "0 12px 32px __primary-30, inset 0 -6px 12px __primary-15",
        transform: "translateY(-2px)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "spotlight",
    category: "cards",
    name: "Spotlight",
    description: "Radial gradient highlight appears on hover for a spotlight effect",
    data: {
      variant: "spotlight",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "background 300ms ease, border-color 300ms ease",
      },
      hoverCss: {
        background: "radial-gradient(circle at center, __primary-20, transparent 70%)",
        borderColor: "__primary-40",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "overlay-pattern",
    category: "cards",
    name: "Overlay Pattern",
    description: "Subtle repeating geometric dot pattern on the background",
    data: {
      variant: "overlay-pattern",
      css: {
        backgroundColor: "__surface",
        backgroundImage: "radial-gradient(__primary-20 1.5px, transparent 1.5px)",
        backgroundSize: "7px 7px",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 200ms ease, box-shadow 200ms ease",
      },
      hoverCss: {
        borderColor: "__primary-30",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
  {
    id: "morphing-border",
    category: "cards",
    name: "Morphing Border",
    description: "Border color shifts and animates on hover from primary to accent",
    data: {
      variant: "morphing-border",
      css: {
        backgroundColor: "__surface",
        border: "2px solid __primary-50",
        borderRadius: "12px",
        padding: "16px",
        transition: "border-color 400ms ease, box-shadow 400ms ease",
      },
      hoverCss: {
        borderColor: "__accent",
        boxShadow: "0 0 16px __accent-30",
      },
      hasImage: false,
      layout: "vertical",
    },
  },
];
