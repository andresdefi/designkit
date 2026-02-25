import type { CatalogItem, AnimationData } from "@/lib/types";

export type PageTransitionGroup = "Simple" | "Complex";

export interface PageTransitionMeta {
  id: string;
  group: PageTransitionGroup;
}

export const PAGE_TRANSITION_GROUPS: PageTransitionGroup[] = ["Simple", "Complex"];

export const PAGE_TRANSITION_META: PageTransitionMeta[] = [
  { id: "pt-fade", group: "Simple" },
  { id: "pt-slide-left", group: "Simple" },
  { id: "pt-slide-up", group: "Simple" },
  { id: "pt-none", group: "Simple" },
  { id: "pt-scale-zoom", group: "Complex" },
  { id: "pt-shared-element-morph", group: "Complex" },
  { id: "pt-blur-transition", group: "Complex" },
];

export const pageTransitionStyles: CatalogItem<AnimationData>[] = [
  {
    id: "pt-fade",
    category: "page-transitions",
    name: "Fade",
    description: "Pages cross-fade between each other",
    data: {
      variant: "fade",
      subtype: "fade",
      duration: "300ms",
      easing: "ease-in-out",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-pt-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes dk-pt-fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}`,
    },
  },
  {
    id: "pt-slide-left",
    category: "page-transitions",
    name: "Slide Left",
    description: "New page slides in from the right, old slides out left",
    data: {
      variant: "slide-left",
      subtype: "slide",
      duration: "350ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-pt-slide-in-right {
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
@keyframes dk-pt-slide-out-left {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
}`,
    },
  },
  {
    id: "pt-slide-up",
    category: "page-transitions",
    name: "Slide Up",
    description: "New page slides up from bottom, old fades out",
    data: {
      variant: "slide-up",
      subtype: "slide",
      duration: "350ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-pt-slide-up {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`,
    },
  },
  {
    id: "pt-none",
    category: "page-transitions",
    name: "None",
    description: "No transition — instant page swap",
    data: {
      variant: "none",
      subtype: "none",
      duration: "0ms",
      easing: "linear",
      trigger: "mount",
    },
  },
  {
    id: "pt-scale-zoom",
    category: "page-transitions",
    name: "Scale Zoom",
    description: "New page scales up from center with a zoom effect",
    data: {
      variant: "scale-zoom",
      subtype: "scale",
      duration: "400ms",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-pt-scale-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes dk-pt-scale-out {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.1); opacity: 0; }
}`,
    },
  },
  {
    id: "pt-shared-element-morph",
    category: "page-transitions",
    name: "Shared Element Morph",
    description: "Elements morph and reposition between page states",
    data: {
      variant: "shared-element-morph",
      subtype: "morph",
      duration: "500ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-pt-morph-in {
  0% { transform: scale(0.8) translateY(10px); opacity: 0; }
  60% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}`,
    },
  },
  {
    id: "pt-blur-transition",
    category: "page-transitions",
    name: "Blur Transition",
    description: "Old page blurs out while new page blurs in",
    data: {
      variant: "blur-transition",
      subtype: "blur",
      duration: "400ms",
      easing: "ease-in-out",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-pt-blur-in {
  0% { opacity: 0; transform: scale(1.02); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes dk-pt-blur-out {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.98); }
}`,
    },
  },
];
