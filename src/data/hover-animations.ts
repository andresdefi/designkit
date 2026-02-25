import type { CatalogItem, AnimationData } from "@/lib/types";

export type HoverAnimationGroup = "Transform" | "Reveal";

export interface HoverAnimationMeta {
  id: string;
  group: HoverAnimationGroup;
}

export const HOVER_ANIMATION_GROUPS: HoverAnimationGroup[] = ["Transform", "Reveal"];

export const HOVER_ANIMATION_META: HoverAnimationMeta[] = [
  { id: "lift-shadow", group: "Transform" },
  { id: "scale-up", group: "Transform" },
  { id: "icon-nudge", group: "Transform" },
  { id: "color-shift", group: "Reveal" },
  { id: "underline-slide", group: "Reveal" },
  { id: "glow", group: "Reveal" },
  { id: "background-slide", group: "Reveal" },
  { id: "border-reveal", group: "Reveal" },
];

export const hoverAnimationStyles: CatalogItem<AnimationData>[] = [
  {
    id: "lift-shadow",
    category: "hover-animations",
    name: "Lift & Shadow",
    description: "Element lifts up with increased shadow on hover",
    data: {
      variant: "lift-shadow",
      subtype: "transform",
      duration: "200ms",
      easing: "ease-out",
      trigger: "hover",
      cssProperties: { transform: "translateY(-2px)", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
    },
  },
  {
    id: "scale-up",
    category: "hover-animations",
    name: "Scale Up",
    description: "Element scales up slightly on hover",
    data: {
      variant: "scale-up",
      subtype: "transform",
      duration: "200ms",
      easing: "ease-out",
      trigger: "hover",
      cssProperties: { transform: "scale(1.03)" },
    },
  },
  {
    id: "icon-nudge",
    category: "hover-animations",
    name: "Icon Nudge",
    description: "Arrow or icon shifts right on hover to suggest action",
    data: {
      variant: "icon-nudge",
      subtype: "transform",
      duration: "200ms",
      easing: "ease-out",
      trigger: "hover",
      cssProperties: { transform: "translateX(4px)" },
    },
  },
  {
    id: "color-shift",
    category: "hover-animations",
    name: "Color Shift",
    description: "Background color transitions to a tinted version on hover",
    data: {
      variant: "color-shift",
      subtype: "color",
      duration: "200ms",
      easing: "ease-out",
      trigger: "hover",
      cssProperties: { opacity: "0.85" },
    },
  },
  {
    id: "underline-slide",
    category: "hover-animations",
    name: "Underline Slide",
    description: "Underline expands from left to right on hover",
    data: {
      variant: "underline-slide",
      subtype: "reveal",
      duration: "250ms",
      easing: "ease-out",
      trigger: "hover",
      cssKeyframes: `@keyframes dk-underline-slide {
  0% { transform: scaleX(0); transform-origin: left; }
  100% { transform: scaleX(1); transform-origin: left; }
}`,
      cssProperties: { transform: "scaleX(1)" },
    },
  },
  {
    id: "glow",
    category: "hover-animations",
    name: "Glow",
    description: "Soft glow appears around the element on hover",
    data: {
      variant: "glow",
      subtype: "glow",
      duration: "300ms",
      easing: "ease-out",
      trigger: "hover",
      cssProperties: { boxShadow: "0 0 16px rgba(59,130,246,0.4)" },
    },
  },
  {
    id: "background-slide",
    category: "hover-animations",
    name: "Background Slide",
    description: "Background fills from left to right on hover",
    data: {
      variant: "background-slide",
      subtype: "reveal",
      duration: "300ms",
      easing: "ease-out",
      trigger: "hover",
      cssKeyframes: `@keyframes dk-bg-slide {
  0% { background-size: 0% 100%; }
  100% { background-size: 100% 100%; }
}`,
    },
  },
  {
    id: "border-reveal",
    category: "hover-animations",
    name: "Border Reveal",
    description: "Border fades in or transitions color on hover",
    data: {
      variant: "border-reveal",
      subtype: "reveal",
      duration: "200ms",
      easing: "ease-out",
      trigger: "hover",
      cssProperties: { borderColor: "currentColor" },
    },
  },
];
