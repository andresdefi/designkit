import type { CatalogItem, AnimationData } from "@/lib/types";

export type EntranceAnimationGroup = "Fade & Slide" | "Stagger & Reveal" | "Scroll-Triggered";

export interface EntranceAnimationMeta {
  id: string;
  group: EntranceAnimationGroup;
}

export const ENTRANCE_ANIMATION_GROUPS: EntranceAnimationGroup[] = ["Fade & Slide", "Stagger & Reveal", "Scroll-Triggered"];

export const ENTRANCE_ANIMATION_META: EntranceAnimationMeta[] = [
  { id: "ea-fade-in", group: "Fade & Slide" },
  { id: "ea-slide-up-fade", group: "Fade & Slide" },
  { id: "ea-slide-from-left", group: "Fade & Slide" },
  { id: "ea-slide-from-right", group: "Fade & Slide" },
  { id: "ea-scale-in", group: "Fade & Slide" },
  { id: "ea-stagger-children", group: "Stagger & Reveal" },
  { id: "ea-clip-reveal", group: "Stagger & Reveal" },
  { id: "ea-typewriter", group: "Stagger & Reveal" },
  { id: "ea-parallax", group: "Scroll-Triggered" },
  { id: "ea-reveal-on-scroll", group: "Scroll-Triggered" },
  { id: "ea-sticky-header-transition", group: "Scroll-Triggered" },
  { id: "ea-progress-indicator", group: "Scroll-Triggered" },
  { id: "ea-counter-on-visible", group: "Scroll-Triggered" },
];

export const entranceAnimationStyles: CatalogItem<AnimationData>[] = [
  {
    id: "ea-fade-in",
    category: "entrance-animations",
    name: "Fade In",
    description: "Element fades in from transparent to opaque",
    data: {
      variant: "fade-in",
      subtype: "fade",
      duration: "400ms",
      easing: "ease-out",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`,
    },
  },
  {
    id: "ea-slide-up-fade",
    category: "entrance-animations",
    name: "Slide Up Fade",
    description: "Element slides up from below while fading in",
    data: {
      variant: "slide-up-fade",
      subtype: "slide",
      duration: "500ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-slide-up-fade {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
    },
  },
  {
    id: "ea-slide-from-left",
    category: "entrance-animations",
    name: "Slide from Left",
    description: "Element slides in from the left edge",
    data: {
      variant: "slide-from-left",
      subtype: "slide",
      duration: "400ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-slide-left {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}`,
    },
  },
  {
    id: "ea-slide-from-right",
    category: "entrance-animations",
    name: "Slide from Right",
    description: "Element slides in from the right edge",
    data: {
      variant: "slide-from-right",
      subtype: "slide",
      duration: "400ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-slide-right {
  0% { opacity: 0; transform: translateX(20px); }
  100% { opacity: 1; transform: translateX(0); }
}`,
    },
  },
  {
    id: "ea-scale-in",
    category: "entrance-animations",
    name: "Scale In",
    description: "Element scales up from small to full size",
    data: {
      variant: "scale-in",
      subtype: "scale",
      duration: "400ms",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-scale-in {
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
}`,
    },
  },
  {
    id: "ea-stagger-children",
    category: "entrance-animations",
    name: "Stagger Children",
    description: "Child elements enter one by one with incremental delay",
    data: {
      variant: "stagger-children",
      subtype: "stagger",
      duration: "400ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-stagger-child {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
    },
  },
  {
    id: "ea-clip-reveal",
    category: "entrance-animations",
    name: "Clip Reveal",
    description: "Content is revealed via an expanding clip-path",
    data: {
      variant: "clip-reveal",
      subtype: "clip",
      duration: "600ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-clip-reveal {
  0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
  100% { opacity: 1; transform: scaleY(1); transform-origin: top; }
}`,
    },
  },
  {
    id: "ea-typewriter",
    category: "entrance-animations",
    name: "Typewriter",
    description: "Text appears character by character",
    data: {
      variant: "typewriter",
      subtype: "typewriter",
      duration: "1500ms",
      easing: "steps(20, end)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-ea-typewriter {
  0% { width: 0; }
  100% { width: 100%; }
}
@keyframes dk-ea-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`,
    },
  },
  {
    id: "ea-parallax",
    category: "entrance-animations",
    name: "Parallax",
    description: "Layers move at different speeds on scroll",
    data: {
      variant: "parallax",
      subtype: "scroll",
      duration: "continuous",
      easing: "linear",
      trigger: "scroll",
      cssKeyframes: `@keyframes dk-ea-parallax {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}`,
    },
  },
  {
    id: "ea-reveal-on-scroll",
    category: "entrance-animations",
    name: "Reveal on Scroll",
    description: "Elements fade in and slide up as they enter viewport",
    data: {
      variant: "reveal-on-scroll",
      subtype: "scroll",
      duration: "600ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "scroll",
      cssKeyframes: `@keyframes dk-ea-reveal-scroll {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
    },
  },
  {
    id: "ea-sticky-header-transition",
    category: "entrance-animations",
    name: "Sticky Header Transition",
    description: "Header shrinks and changes style on scroll",
    data: {
      variant: "sticky-header-transition",
      subtype: "scroll",
      duration: "200ms",
      easing: "ease-out",
      trigger: "scroll",
      cssProperties: { transform: "translateY(0)", opacity: "1" },
    },
  },
  {
    id: "ea-progress-indicator",
    category: "entrance-animations",
    name: "Progress Indicator",
    description: "Reading progress bar fills as user scrolls down",
    data: {
      variant: "progress-indicator",
      subtype: "scroll",
      duration: "continuous",
      easing: "linear",
      trigger: "scroll",
      cssKeyframes: `@keyframes dk-ea-progress {
  0% { transform: scaleX(0); transform-origin: left; }
  100% { transform: scaleX(1); transform-origin: left; }
}`,
    },
  },
  {
    id: "ea-counter-on-visible",
    category: "entrance-animations",
    name: "Counter on Visible",
    description: "Number counts up when scrolled into view",
    data: {
      variant: "counter-on-visible",
      subtype: "scroll",
      duration: "1000ms",
      easing: "ease-out",
      trigger: "scroll",
      cssKeyframes: `@keyframes dk-ea-counter-fade {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
    },
  },
];
