import type { CatalogItem, LoadingStyleData } from "@/lib/types";

export type LoadingGroup = "Skeleton" | "Full Page" | "Inline";

export interface LoadingMeta {
  id: string;
  group: LoadingGroup;
}

export const LOADING_GROUPS: LoadingGroup[] = ["Skeleton", "Full Page", "Inline"];

export const LOADING_META: LoadingMeta[] = [
  { id: "skeleton-shimmer", group: "Skeleton" },
  { id: "skeleton-pulse", group: "Skeleton" },
  { id: "skeleton-stagger", group: "Skeleton" },
  { id: "spinner-centered", group: "Full Page" },
  { id: "progress-bar", group: "Full Page" },
  { id: "content-placeholder", group: "Full Page" },
  { id: "lazy-image-blurup", group: "Inline" },
  { id: "pull-to-refresh", group: "Inline" },
  { id: "inline-button-loading", group: "Inline" },
];

export const loadingStyles: CatalogItem<LoadingStyleData>[] = [
  {
    id: "skeleton-shimmer",
    category: "loading",
    name: "Skeleton Shimmer",
    description: "Skeleton placeholder lines with a sliding shimmer gradient",
    data: {
      variant: "skeleton-shimmer",
      type: "skeleton",
      containerCss: { display: "flex", flexDirection: "column", gap: "8px", padding: "16px" },
      elementCss: { height: "12px", borderRadius: "4px" },
      animationStyle: "shimmer",
      lineCount: 4,
      isFullPage: false,
    },
  },
  {
    id: "skeleton-pulse",
    category: "loading",
    name: "Skeleton Pulse",
    description: "Skeleton placeholder lines that pulse in opacity",
    data: {
      variant: "skeleton-pulse",
      type: "skeleton",
      containerCss: { display: "flex", flexDirection: "column", gap: "8px", padding: "16px" },
      elementCss: { height: "12px", borderRadius: "4px" },
      animationStyle: "pulse",
      lineCount: 4,
      isFullPage: false,
    },
  },
  {
    id: "skeleton-stagger",
    category: "loading",
    name: "Skeleton Stagger",
    description: "Skeleton lines that appear one by one with staggered timing",
    data: {
      variant: "skeleton-stagger",
      type: "skeleton",
      containerCss: { display: "flex", flexDirection: "column", gap: "8px", padding: "16px" },
      elementCss: { height: "12px", borderRadius: "4px" },
      animationStyle: "stagger",
      lineCount: 4,
      isFullPage: false,
    },
  },
  {
    id: "spinner-centered",
    category: "loading",
    name: "Spinner Centered",
    description: "Full-screen centered spinner with optional loading text",
    data: {
      variant: "spinner-centered",
      type: "spinner",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" },
      elementCss: { width: "32px", height: "32px", borderRadius: "9999px", borderWidth: "3px" },
      animationStyle: "spin",
      lineCount: 0,
      isFullPage: true,
    },
  },
  {
    id: "progress-bar",
    category: "loading",
    name: "Progress Bar",
    description: "Horizontal progress bar that fills from left to right",
    data: {
      variant: "progress-bar",
      type: "progress",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px", gap: "12px" },
      elementCss: { height: "6px", borderRadius: "3px", width: "100%" },
      animationStyle: "fill",
      lineCount: 0,
      isFullPage: true,
    },
  },
  {
    id: "content-placeholder",
    category: "loading",
    name: "Content Placeholder",
    description: "Card-shaped skeleton placeholder mimicking a content layout",
    data: {
      variant: "content-placeholder",
      type: "placeholder",
      containerCss: { display: "flex", flexDirection: "column", gap: "12px", padding: "16px" },
      elementCss: { borderRadius: "8px" },
      animationStyle: "pulse",
      lineCount: 3,
      isFullPage: false,
    },
  },
  {
    id: "lazy-image-blurup",
    category: "loading",
    name: "Lazy Image Blur-Up",
    description: "Blurred placeholder that sharpens when the image loads",
    data: {
      variant: "lazy-image-blurup",
      type: "inline",
      containerCss: { display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
      elementCss: { width: "100%", height: "80px", borderRadius: "8px" },
      animationStyle: "blur",
      lineCount: 0,
      isFullPage: false,
    },
  },
  {
    id: "pull-to-refresh",
    category: "loading",
    name: "Pull to Refresh",
    description: "Mobile pull-down indicator with spinner at top of content",
    data: {
      variant: "pull-to-refresh",
      type: "inline",
      containerCss: { display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 16px" },
      elementCss: { width: "20px", height: "20px", borderRadius: "9999px", borderWidth: "2px" },
      animationStyle: "spin",
      lineCount: 0,
      isFullPage: false,
    },
  },
  {
    id: "inline-button-loading",
    category: "loading",
    name: "Inline Button Loading",
    description: "Button that shows a spinner inside while loading",
    data: {
      variant: "inline-button-loading",
      type: "inline",
      containerCss: { display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
      elementCss: { width: "14px", height: "14px", borderRadius: "9999px", borderWidth: "2px" },
      animationStyle: "spin",
      lineCount: 0,
      isFullPage: false,
    },
  },
];
