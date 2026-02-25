import type { CatalogItem, OnboardingStyleData } from "@/lib/types";

export type OnboardingGroup = "Multi-Step" | "Single Screen" | "Interactive";

export interface OnboardingMeta {
  id: string;
  group: OnboardingGroup;
}

export const ONBOARDING_GROUPS: OnboardingGroup[] = ["Multi-Step", "Single Screen", "Interactive"];

export const ONBOARDING_META: OnboardingMeta[] = [
  { id: "carousel-swipe", group: "Multi-Step" },
  { id: "progressive-disclosure", group: "Multi-Step" },
  { id: "checklist", group: "Multi-Step" },
  { id: "single-page-welcome", group: "Single Screen" },
  { id: "benefit-cards", group: "Single Screen" },
  { id: "tooltip-tour", group: "Interactive" },
  { id: "video-intro", group: "Interactive" },
];

export const onboardingStyles: CatalogItem<OnboardingStyleData>[] = [
  {
    id: "carousel-swipe",
    category: "onboarding",
    name: "Carousel Swipe",
    description: "Swipeable carousel with illustration, text, and dot indicators",
    data: {
      variant: "carousel",
      layout: "carousel",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      stepIndicatorCss: { display: "flex", gap: "6px", marginTop: "16px" },
      hasStepIndicator: true,
      hasSkipButton: true,
      hasIllustration: true,
      stepCount: 3,
    },
  },
  {
    id: "progressive-disclosure",
    category: "onboarding",
    name: "Progressive Disclosure",
    description: "Step-by-step form with progress bar at top",
    data: {
      variant: "progressive",
      layout: "stepped",
      containerCss: { display: "flex", flexDirection: "column", padding: "24px" },
      stepIndicatorCss: { display: "flex", gap: "4px", marginBottom: "16px" },
      hasStepIndicator: true,
      hasSkipButton: false,
      hasIllustration: false,
      stepCount: 4,
    },
  },
  {
    id: "checklist",
    category: "onboarding",
    name: "Checklist",
    description: "Getting-started checklist with completion progress",
    data: {
      variant: "checklist",
      layout: "checklist",
      containerCss: { display: "flex", flexDirection: "column", padding: "20px", gap: "8px" },
      stepIndicatorCss: { height: "4px", borderRadius: "2px", marginBottom: "12px" },
      hasStepIndicator: true,
      hasSkipButton: true,
      hasIllustration: false,
      stepCount: 5,
    },
  },
  {
    id: "single-page-welcome",
    category: "onboarding",
    name: "Single Page Welcome",
    description: "Full-screen welcome with illustration and a single get-started CTA",
    data: {
      variant: "welcome",
      layout: "single-page",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" },
      stepIndicatorCss: {},
      hasStepIndicator: false,
      hasSkipButton: false,
      hasIllustration: true,
      stepCount: 1,
    },
  },
  {
    id: "benefit-cards",
    category: "onboarding",
    name: "Benefit Cards",
    description: "Grid or list of feature/benefit cards highlighting key value props",
    data: {
      variant: "benefit-cards",
      layout: "cards",
      containerCss: { display: "flex", flexDirection: "column", padding: "20px", gap: "8px" },
      stepIndicatorCss: {},
      hasStepIndicator: false,
      hasSkipButton: true,
      hasIllustration: true,
      stepCount: 3,
    },
  },
  {
    id: "tooltip-tour",
    category: "onboarding",
    name: "Tooltip Tour",
    description: "Guided tooltip sequence highlighting UI elements one by one",
    data: {
      variant: "tooltip-tour",
      layout: "tooltip",
      containerCss: { display: "flex", flexDirection: "column", padding: "16px", position: "relative" },
      stepIndicatorCss: { display: "flex", gap: "4px" },
      hasStepIndicator: true,
      hasSkipButton: true,
      hasIllustration: false,
      stepCount: 4,
    },
  },
  {
    id: "video-intro",
    category: "onboarding",
    name: "Video Intro",
    description: "Centered video player with skip and continue buttons",
    data: {
      variant: "video",
      layout: "video",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" },
      stepIndicatorCss: {},
      hasStepIndicator: false,
      hasSkipButton: true,
      hasIllustration: false,
      stepCount: 1,
    },
  },
];
