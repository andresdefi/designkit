import type { CatalogItem, ImageStyleData } from "@/lib/types";

export type ImageGroup = "Shape" | "Overlay" | "Frame";

export interface ImageMeta {
  id: string;
  group: ImageGroup;
}

export const IMAGE_GROUPS: ImageGroup[] = ["Shape", "Overlay", "Frame"];

export const IMAGE_META: ImageMeta[] = [
  { id: "rounded-corners", group: "Shape" },
  { id: "circle-crop", group: "Shape" },
  { id: "color-overlay", group: "Overlay" },
  { id: "gradient-overlay", group: "Overlay" },
  { id: "text-overlay", group: "Overlay" },
  { id: "parallax-ready", group: "Frame" },
  { id: "border-frame", group: "Frame" },
  { id: "aspect-ratio-locked", group: "Frame" },
];

export const imageStyles: CatalogItem<ImageStyleData>[] = [
  {
    id: "rounded-corners",
    category: "images",
    name: "Rounded Corners",
    description: "Image with smooth rounded corners",
    data: {
      variant: "rounded",
      css: {
        borderRadius: "12px",
        overflow: "hidden",
        width: "100%",
      },
      shape: "rounded",
      hasOverlay: false,
      hasCaption: false,
      aspectRatio: "16/9",
    },
  },
  {
    id: "circle-crop",
    category: "images",
    name: "Circle Crop",
    description: "Perfectly circular image crop for profile or feature images",
    data: {
      variant: "circle",
      css: {
        borderRadius: "9999px",
        overflow: "hidden",
        width: "120px",
        height: "120px",
      },
      shape: "circle",
      hasOverlay: false,
      hasCaption: false,
      aspectRatio: "1/1",
    },
  },
  {
    id: "color-overlay",
    category: "images",
    name: "Color Overlay",
    description: "Image with a semi-transparent primary color overlay",
    data: {
      variant: "color-overlay",
      css: {
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      },
      overlayCss: {
        position: "absolute",
        inset: "0",
        backgroundColor: "__primary-40",
        mixBlendMode: "multiply",
      },
      shape: "rounded",
      hasOverlay: true,
      hasCaption: false,
      aspectRatio: "16/9",
    },
  },
  {
    id: "gradient-overlay",
    category: "images",
    name: "Gradient Overlay",
    description: "Image with a bottom-to-top gradient for text readability",
    data: {
      variant: "gradient-overlay",
      css: {
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      },
      overlayCss: {
        position: "absolute",
        inset: "0",
        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)",
      },
      shape: "rounded",
      hasOverlay: true,
      hasCaption: false,
      aspectRatio: "16/9",
    },
  },
  {
    id: "text-overlay",
    category: "images",
    name: "Text Overlay",
    description: "Image with text content overlaid at the bottom",
    data: {
      variant: "text-overlay",
      css: {
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      },
      overlayCss: {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        padding: "12px 16px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
        color: "#ffffff",
      },
      shape: "rounded",
      hasOverlay: true,
      hasCaption: true,
      aspectRatio: "16/9",
    },
  },
  {
    id: "parallax-ready",
    category: "images",
    name: "Parallax Ready",
    description: "Full-bleed image container optimized for parallax scrolling",
    data: {
      variant: "parallax",
      css: {
        borderRadius: "0px",
        overflow: "hidden",
        width: "100%",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      shape: "square",
      hasOverlay: false,
      hasCaption: false,
      aspectRatio: "21/9",
    },
  },
  {
    id: "border-frame",
    category: "images",
    name: "Border Frame",
    description: "Image wrapped in a decorative border frame",
    data: {
      variant: "border-frame",
      css: {
        borderRadius: "4px",
        overflow: "hidden",
        border: "3px solid __border",
        padding: "4px",
        backgroundColor: "__surface",
        width: "100%",
      },
      shape: "rounded",
      hasOverlay: false,
      hasCaption: false,
      aspectRatio: "4/3",
    },
  },
  {
    id: "aspect-ratio-locked",
    category: "images",
    name: "Aspect Ratio Locked",
    description: "Image container that maintains a fixed aspect ratio",
    data: {
      variant: "aspect-locked",
      css: {
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
        aspectRatio: "3/2",
      },
      shape: "rounded",
      hasOverlay: false,
      hasCaption: false,
      aspectRatio: "3/2",
    },
  },
];
