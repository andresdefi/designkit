import type { CatalogItem, AnimationData } from "@/lib/types";

export type ButtonAnimationGroup = "Scale & Bounce" | "Effects";

export interface ButtonAnimationMeta {
  id: string;
  group: ButtonAnimationGroup;
}

export const BUTTON_ANIMATION_GROUPS: ButtonAnimationGroup[] = ["Scale & Bounce", "Effects"];

export const BUTTON_ANIMATION_META: ButtonAnimationMeta[] = [
  { id: "scale-down", group: "Scale & Bounce" },
  { id: "bounce-press", group: "Scale & Bounce" },
  { id: "3d-push", group: "Scale & Bounce" },
  { id: "ripple", group: "Effects" },
  { id: "color-flash", group: "Effects" },
  { id: "glow-pulse", group: "Effects" },
  { id: "none", group: "Effects" },
];

export const buttonAnimationStyles: CatalogItem<AnimationData>[] = [
  {
    id: "scale-down",
    category: "button-animations",
    name: "Scale Down",
    description: "Button shrinks slightly on press, springs back on release",
    data: {
      variant: "scale-down",
      subtype: "scale",
      duration: "150ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "click",
      cssKeyframes: `@keyframes dk-btn-scale-down {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}`,
      cssProperties: { transform: "scale(0.95)" },
    },
  },
  {
    id: "bounce-press",
    category: "button-animations",
    name: "Bounce Press",
    description: "Button bounces down on press with elastic overshoot",
    data: {
      variant: "bounce-press",
      subtype: "bounce",
      duration: "400ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      trigger: "click",
      cssKeyframes: `@keyframes dk-btn-bounce {
  0% { transform: scale(1); }
  30% { transform: scale(0.92); }
  50% { transform: scale(1.02); }
  70% { transform: scale(0.98); }
  100% { transform: scale(1); }
}`,
      cssProperties: { transform: "scale(0.92)" },
    },
  },
  {
    id: "3d-push",
    category: "button-animations",
    name: "3D Push",
    description: "Button tilts with perspective as if physically pressed",
    data: {
      variant: "3d-push",
      subtype: "3d",
      duration: "200ms",
      easing: "ease-out",
      trigger: "click",
      cssKeyframes: `@keyframes dk-btn-3d-push {
  0% { transform: perspective(500px) rotateX(0deg); }
  50% { transform: perspective(500px) rotateX(4deg) translateY(1px); }
  100% { transform: perspective(500px) rotateX(0deg); }
}`,
      cssProperties: { transform: "perspective(500px) rotateX(4deg)" },
    },
  },
  {
    id: "ripple",
    category: "button-animations",
    name: "Ripple",
    description: "Material-style ripple circle expands from click point",
    data: {
      variant: "ripple",
      subtype: "ripple",
      duration: "500ms",
      easing: "ease-out",
      trigger: "click",
      cssKeyframes: `@keyframes dk-btn-ripple {
  0% { transform: scale(0); opacity: 0.5; }
  100% { transform: scale(2.5); opacity: 0; }
}`,
      cssProperties: { transform: "scale(2.5)", opacity: "0" },
    },
  },
  {
    id: "color-flash",
    category: "button-animations",
    name: "Color Flash",
    description: "Button briefly flashes brighter on click",
    data: {
      variant: "color-flash",
      subtype: "color",
      duration: "200ms",
      easing: "ease-out",
      trigger: "click",
      cssKeyframes: `@keyframes dk-btn-flash {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}`,
      cssProperties: { opacity: "0.7" },
    },
  },
  {
    id: "glow-pulse",
    category: "button-animations",
    name: "Glow Pulse",
    description: "Button emits a pulsing glow on hover",
    data: {
      variant: "glow-pulse",
      subtype: "glow",
      duration: "1500ms",
      easing: "ease-in-out",
      trigger: "hover",
      cssKeyframes: `@keyframes dk-btn-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(59,130,246,0.3); }
  50% { box-shadow: 0 0 20px rgba(59,130,246,0.6); }
}`,
    },
  },
  {
    id: "none",
    category: "button-animations",
    name: "None",
    description: "No animation — instant state change on click",
    data: {
      variant: "none",
      subtype: "none",
      duration: "0ms",
      easing: "linear",
      trigger: "click",
    },
  },
];
