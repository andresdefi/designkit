import type { CatalogItem, SuccessStyleData } from "@/lib/types";

export type SuccessGroup = "Animated" | "Static";

export interface SuccessMeta {
  id: string;
  group: SuccessGroup;
}

export const SUCCESS_GROUPS: SuccessGroup[] = ["Animated", "Static"];

export const SUCCESS_META: SuccessMeta[] = [
  { id: "checkmark-animation", group: "Animated" },
  { id: "confetti-celebration", group: "Animated" },
  { id: "card-flip-reveal", group: "Animated" },
  { id: "simple-text-confirmation", group: "Static" },
  { id: "redirect-countdown", group: "Static" },
];

export const successStyles: CatalogItem<SuccessStyleData>[] = [
  {
    id: "checkmark-animation",
    category: "success",
    name: "Checkmark Animation",
    description: "Animated circle + checkmark that draws in on completion",
    data: {
      variant: "checkmark",
      type: "checkmark",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "56px", height: "56px", borderRadius: "9999px", marginBottom: "16px" },
      hasAnimation: true,
      hasRedirect: false,
      hasCta: true,
    },
  },
  {
    id: "confetti-celebration",
    category: "success",
    name: "Confetti Celebration",
    description: "Bursting confetti particles with a congratulations message",
    data: {
      variant: "confetti",
      type: "confetti",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px", position: "relative", overflow: "hidden" },
      iconCss: { width: "48px", height: "48px", borderRadius: "9999px", marginBottom: "16px" },
      hasAnimation: true,
      hasRedirect: false,
      hasCta: true,
    },
  },
  {
    id: "card-flip-reveal",
    category: "success",
    name: "Card Flip Reveal",
    description: "Card flips to reveal success state on the back side",
    data: {
      variant: "card-flip",
      type: "card-flip",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "48px", height: "48px", borderRadius: "12px", marginBottom: "16px" },
      hasAnimation: true,
      hasRedirect: false,
      hasCta: true,
    },
  },
  {
    id: "simple-text-confirmation",
    category: "success",
    name: "Simple Text Confirmation",
    description: "Clean text-only confirmation with success icon and a CTA",
    data: {
      variant: "text",
      type: "text",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "40px", height: "40px", borderRadius: "9999px", marginBottom: "12px" },
      hasAnimation: false,
      hasRedirect: false,
      hasCta: true,
    },
  },
  {
    id: "redirect-countdown",
    category: "success",
    name: "Redirect Countdown",
    description: "Success message with a countdown timer before auto-redirect",
    data: {
      variant: "countdown",
      type: "countdown",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      iconCss: { width: "40px", height: "40px", borderRadius: "9999px", marginBottom: "12px" },
      hasAnimation: false,
      hasRedirect: true,
      hasCta: false,
    },
  },
];
