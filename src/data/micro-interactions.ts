import type { CatalogItem, AnimationData } from "@/lib/types";

export type MicroInteractionGroup = "Toggles" | "Feedback" | "UI";

export interface MicroInteractionMeta {
  id: string;
  group: MicroInteractionGroup;
}

export const MICRO_INTERACTION_GROUPS: MicroInteractionGroup[] = ["Toggles", "Feedback", "UI"];

export const MICRO_INTERACTION_META: MicroInteractionMeta[] = [
  { id: "mi-toggle-flip", group: "Toggles" },
  { id: "mi-checkbox-draw", group: "Toggles" },
  { id: "mi-heart-pop", group: "Feedback" },
  { id: "mi-count-up-numbers", group: "Feedback" },
  { id: "mi-pull-to-refresh", group: "UI" },
  { id: "mi-swipe-delete", group: "UI" },
  { id: "mi-tooltip-fade", group: "UI" },
  { id: "mi-menu-expand", group: "UI" },
];

export const microInteractionStyles: CatalogItem<AnimationData>[] = [
  {
    id: "mi-toggle-flip",
    category: "micro-interactions",
    name: "Toggle Flip",
    description: "Toggle switch slides with spring overshoot",
    data: {
      variant: "toggle-flip",
      subtype: "toggle",
      duration: "300ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      trigger: "click",
      cssKeyframes: `@keyframes dk-mi-toggle-on {
  0% { transform: translateX(0); }
  70% { transform: translateX(22px); }
  85% { transform: translateX(18px); }
  100% { transform: translateX(20px); }
}`,
    },
  },
  {
    id: "mi-checkbox-draw",
    category: "micro-interactions",
    name: "Checkbox Draw",
    description: "Checkmark draws itself with a stroke animation",
    data: {
      variant: "checkbox-draw",
      subtype: "checkbox",
      duration: "300ms",
      easing: "ease-out",
      trigger: "click",
      cssKeyframes: `@keyframes dk-mi-check-draw {
  0% { stroke-dashoffset: 24; }
  100% { stroke-dashoffset: 0; }
}`,
    },
  },
  {
    id: "mi-heart-pop",
    category: "micro-interactions",
    name: "Heart Pop",
    description: "Heart icon scales up and bounces on like",
    data: {
      variant: "heart-pop",
      subtype: "feedback",
      duration: "400ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      trigger: "click",
      cssKeyframes: `@keyframes dk-mi-heart-pop {
  0% { transform: scale(1); }
  30% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`,
    },
  },
  {
    id: "mi-count-up-numbers",
    category: "micro-interactions",
    name: "Count Up Numbers",
    description: "Number animates from 0 to target value",
    data: {
      variant: "count-up-numbers",
      subtype: "feedback",
      duration: "800ms",
      easing: "ease-out",
      trigger: "mount",
      cssKeyframes: `@keyframes dk-mi-count-fade {
  0% { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
    },
  },
  {
    id: "mi-pull-to-refresh",
    category: "micro-interactions",
    name: "Pull to Refresh",
    description: "Spinner appears with elastic pull-down gesture",
    data: {
      variant: "pull-to-refresh",
      subtype: "ui",
      duration: "400ms",
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      trigger: "click",
      cssKeyframes: `@keyframes dk-mi-pull-down {
  0% { transform: translateY(-20px); opacity: 0; }
  60% { transform: translateY(4px); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}`,
    },
  },
  {
    id: "mi-swipe-delete",
    category: "micro-interactions",
    name: "Swipe Delete",
    description: "Item slides off screen to reveal delete action",
    data: {
      variant: "swipe-delete",
      subtype: "ui",
      duration: "300ms",
      easing: "ease-out",
      trigger: "click",
      cssKeyframes: `@keyframes dk-mi-swipe-off {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}`,
      cssProperties: { transform: "translateX(100%)", opacity: "0" },
    },
  },
  {
    id: "mi-tooltip-fade",
    category: "micro-interactions",
    name: "Tooltip Fade",
    description: "Tooltip fades in with slight upward shift",
    data: {
      variant: "tooltip-fade",
      subtype: "ui",
      duration: "150ms",
      easing: "ease-out",
      trigger: "hover",
      cssKeyframes: `@keyframes dk-mi-tooltip-in {
  0% { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
      cssProperties: { transform: "translateY(0)", opacity: "1" },
    },
  },
  {
    id: "mi-menu-expand",
    category: "micro-interactions",
    name: "Menu Expand",
    description: "Dropdown menu scales and fades in from top",
    data: {
      variant: "menu-expand",
      subtype: "ui",
      duration: "200ms",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      trigger: "click",
      cssKeyframes: `@keyframes dk-mi-menu-in {
  0% { opacity: 0; transform: scaleY(0.9) translateY(-4px); transform-origin: top; }
  100% { opacity: 1; transform: scaleY(1) translateY(0); transform-origin: top; }
}`,
    },
  },
];
