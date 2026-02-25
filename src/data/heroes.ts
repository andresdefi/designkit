import type { CatalogItem, HeroStyleData } from "@/lib/types";

export type HeroGroup = "Text-Focused" | "Image-Focused" | "Decorative";

export interface HeroMeta {
  id: string;
  group: HeroGroup;
}

export const HERO_GROUPS: HeroGroup[] = ["Text-Focused", "Image-Focused", "Decorative"];

export const HERO_META: HeroMeta[] = [
  { id: "hero-centered-text", group: "Text-Focused" },
  { id: "hero-split", group: "Text-Focused" },
  { id: "hero-minimal", group: "Text-Focused" },
  { id: "hero-full-image", group: "Image-Focused" },
  { id: "hero-gradient", group: "Image-Focused" },
  { id: "hero-video", group: "Image-Focused" },
  { id: "hero-animated", group: "Decorative" },
  { id: "hero-floating-cards", group: "Decorative" },
];

export const heroStyles: CatalogItem<HeroStyleData>[] = [
  // ── Text-Focused ───────────────────────────────────────

  {
    id: "hero-centered-text",
    category: "heroes",
    name: "Centered Text",
    description: "Large heading + subtitle centered, CTA below — standard",
    data: {
      variant: "centered-text",
      layout: "centered",
      css: {
        backgroundColor: "__background",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      hasImage: false,
      hasGradient: false,
      minHeight: "320px",
    },
  },
  {
    id: "hero-split",
    category: "heroes",
    name: "Split Layout",
    description: "Text left, image/illustration right — product pages",
    data: {
      variant: "split",
      layout: "split",
      css: {
        backgroundColor: "__background",
        padding: "32px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
      },
      hasImage: true,
      hasGradient: false,
      minHeight: "280px",
    },
  },
  {
    id: "hero-minimal",
    category: "heroes",
    name: "Minimal",
    description: "Just large text, nothing else — editorial/statement",
    data: {
      variant: "minimal",
      layout: "centered",
      css: {
        backgroundColor: "__background",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      hasImage: false,
      hasGradient: false,
      minHeight: "240px",
    },
  },

  // ── Image-Focused ──────────────────────────────────────

  {
    id: "hero-full-image",
    category: "heroes",
    name: "Full Image Background",
    description: "Full-bleed image with text overlay — visual impact",
    data: {
      variant: "full-image",
      layout: "full-image",
      css: {
        position: "relative",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      contentCss: {
        position: "relative",
        zIndex: "1",
      },
      hasImage: true,
      hasGradient: false,
      minHeight: "360px",
    },
  },
  {
    id: "hero-gradient",
    category: "heroes",
    name: "Gradient Background",
    description: "Bold gradient bg with centered text — modern SaaS",
    data: {
      variant: "gradient",
      layout: "centered",
      css: {
        background: "linear-gradient(135deg, __primary, __accent)",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      hasImage: false,
      hasGradient: true,
      minHeight: "320px",
    },
  },
  {
    id: "hero-video",
    category: "heroes",
    name: "Video Background",
    description: "Video loop background with overlay text — immersive",
    data: {
      variant: "video",
      layout: "full-image",
      css: {
        position: "relative",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      },
      contentCss: {
        position: "relative",
        zIndex: "1",
      },
      hasImage: true,
      hasGradient: false,
      minHeight: "360px",
    },
  },

  // ── Decorative ─────────────────────────────────────────

  {
    id: "hero-animated",
    category: "heroes",
    name: "Animated / Particle",
    description: "Subtle animated dots/grid background — tech/AI products",
    data: {
      variant: "animated",
      layout: "centered",
      css: {
        backgroundColor: "__background",
        backgroundImage: "radial-gradient(__primary-15 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      hasImage: false,
      hasGradient: false,
      minHeight: "320px",
    },
  },
  {
    id: "hero-floating-cards",
    category: "heroes",
    name: "Floating Cards",
    description: "Cards floating around centered text — feature showcase",
    data: {
      variant: "floating-cards",
      layout: "centered",
      css: {
        backgroundColor: "__background",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
      },
      hasImage: false,
      hasGradient: false,
      minHeight: "320px",
    },
  },
];
