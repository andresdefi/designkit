import type { CatalogItem, TestimonialStyleData } from "@/lib/types";

export type TestimonialGroup = "Quote" | "Card" | "Social";

export interface TestimonialMeta {
  id: string;
  group: TestimonialGroup;
}

export const TESTIMONIAL_GROUPS: TestimonialGroup[] = ["Quote", "Card", "Social"];

export const TESTIMONIAL_META: TestimonialMeta[] = [
  { id: "simple-quote", group: "Quote" },
  { id: "avatar-name-role", group: "Quote" },
  { id: "card-testimonial", group: "Card" },
  { id: "large-pull-quote", group: "Quote" },
  { id: "carousel-ready", group: "Card" },
  { id: "star-rating", group: "Card" },
  { id: "social-style", group: "Social" },
  { id: "video-placeholder", group: "Social" },
];

export const testimonialStyles: CatalogItem<TestimonialStyleData>[] = [
  {
    id: "simple-quote",
    category: "testimonials",
    name: "Simple Quote",
    description: "Clean italic quote with attribution below",
    data: {
      variant: "simple",
      layout: "inline",
      css: {
        padding: "16px 0",
        borderLeft: "3px solid __primary",
        paddingLeft: "16px",
      },
      quoteCss: {
        fontSize: "15px",
        fontStyle: "italic",
        lineHeight: "1.6",
        color: "__text",
      },
      hasAvatar: false,
      hasRating: false,
      hasMedia: false,
    },
  },
  {
    id: "avatar-name-role",
    category: "testimonials",
    name: "Avatar + Name + Role",
    description: "Quote with author avatar, name, and role underneath",
    data: {
      variant: "avatar-name-role",
      layout: "inline",
      css: {
        padding: "16px 0",
      },
      quoteCss: {
        fontSize: "15px",
        fontStyle: "italic",
        lineHeight: "1.6",
        color: "__text",
        marginBottom: "12px",
      },
      hasAvatar: true,
      hasRating: false,
      hasMedia: false,
    },
  },
  {
    id: "card-testimonial",
    category: "testimonials",
    name: "Card Testimonial",
    description: "Quote wrapped in a card container with surface background",
    data: {
      variant: "card",
      layout: "card",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "20px",
      },
      quoteCss: {
        fontSize: "14px",
        lineHeight: "1.6",
        color: "__text",
        marginBottom: "12px",
      },
      hasAvatar: true,
      hasRating: false,
      hasMedia: false,
    },
  },
  {
    id: "large-pull-quote",
    category: "testimonials",
    name: "Large Pull Quote",
    description: "Oversized decorative quote marks with large text",
    data: {
      variant: "pull-quote",
      layout: "pull-quote",
      css: {
        padding: "24px",
        textAlign: "center",
        position: "relative",
      },
      quoteCss: {
        fontSize: "22px",
        fontWeight: "500",
        lineHeight: "1.4",
        color: "__text",
        fontStyle: "italic",
      },
      hasAvatar: false,
      hasRating: false,
      hasMedia: false,
    },
  },
  {
    id: "carousel-ready",
    category: "testimonials",
    name: "Carousel Ready",
    description: "Card-style testimonial designed for carousel/slider layouts",
    data: {
      variant: "carousel",
      layout: "card",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "16px",
        padding: "24px",
        textAlign: "center",
        minWidth: "280px",
      },
      quoteCss: {
        fontSize: "14px",
        lineHeight: "1.6",
        color: "__textSecondary",
        marginBottom: "16px",
      },
      hasAvatar: true,
      hasRating: false,
      hasMedia: false,
    },
  },
  {
    id: "star-rating",
    category: "testimonials",
    name: "Star Rating",
    description: "Testimonial card with a five-star rating display",
    data: {
      variant: "star-rating",
      layout: "card",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "20px",
      },
      quoteCss: {
        fontSize: "14px",
        lineHeight: "1.6",
        color: "__text",
        marginBottom: "12px",
      },
      hasAvatar: true,
      hasRating: true,
      hasMedia: false,
    },
  },
  {
    id: "social-style",
    category: "testimonials",
    name: "Social Style",
    description: "Tweet/post-like testimonial with social media formatting",
    data: {
      variant: "social",
      layout: "social",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        padding: "16px",
      },
      quoteCss: {
        fontSize: "14px",
        lineHeight: "1.5",
        color: "__text",
      },
      hasAvatar: true,
      hasRating: false,
      hasMedia: false,
    },
  },
  {
    id: "video-placeholder",
    category: "testimonials",
    name: "Video Placeholder",
    description: "Testimonial with an embedded video thumbnail area",
    data: {
      variant: "video",
      layout: "card",
      css: {
        backgroundColor: "__surface",
        border: "1px solid __border",
        borderRadius: "12px",
        overflow: "hidden",
      },
      quoteCss: {
        fontSize: "14px",
        lineHeight: "1.6",
        color: "__text",
        padding: "16px",
      },
      hasAvatar: true,
      hasRating: false,
      hasMedia: true,
    },
  },
];
