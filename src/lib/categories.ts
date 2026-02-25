import type { CategoryMeta, CategoryGroup } from "./types";

export const categoryGroups: { id: CategoryGroup; label: string }[] = [
  { id: "foundations", label: "Foundations" },
  { id: "components", label: "Components" },
  { id: "content", label: "Content" },
  { id: "structure", label: "Structure" },
  { id: "patterns", label: "UX Patterns" },
  { id: "motion", label: "Motion" },
];

export const categories: CategoryMeta[] = [
  // Foundations
  { id: "colors", label: "Color Palettes", group: "foundations", description: "Full color systems with light and dark modes", icon: "🎨" },
  { id: "typography", label: "Typography", group: "foundations", description: "Font pairings and type scales", icon: "Aa" },
  { id: "spacing", label: "Spacing", group: "foundations", description: "Spacing scales and density systems", icon: "↔" },
  { id: "radius", label: "Border Radius", group: "foundations", description: "Corner rounding philosophies", icon: "◻" },
  { id: "shadows", label: "Shadows", group: "foundations", description: "Elevation and shadow systems", icon: "◐" },

  // Components
  { id: "buttons", label: "Buttons", group: "components", description: "Button styles, shapes, and states", icon: "▢" },
  { id: "inputs", label: "Inputs & Forms", group: "components", description: "Text inputs, selects, checkboxes, toggles", icon: "▤" },
  { id: "cards", label: "Cards", group: "components", description: "Content container styles", icon: "▭" },

  // Content
  { id: "badges", label: "Badges & Chips", group: "content", description: "Labels, tags, and status indicators", icon: "●" },
  { id: "avatars", label: "Avatars", group: "content", description: "User image and initials styles", icon: "◉" },
  { id: "lists", label: "Lists", group: "content", description: "List item layouts and styles", icon: "☰" },
  { id: "tables", label: "Tables", group: "content", description: "Data table styles", icon: "▦" },
  { id: "pricing", label: "Pricing", group: "content", description: "Pricing card and table layouts", icon: "$" },
  { id: "testimonials", label: "Testimonials", group: "content", description: "Quote and review styles", icon: "❝" },
  { id: "stats", label: "Stats & Metrics", group: "content", description: "Number displays and indicators", icon: "#" },
  { id: "dividers", label: "Dividers", group: "content", description: "Separators and visual breaks", icon: "—" },
  { id: "images", label: "Image Treatments", group: "content", description: "Photo framing and overlay styles", icon: "▣" },

  // Structure
  { id: "navigation", label: "Navigation Bars", group: "structure", description: "Top bars and mobile bottom tabs", icon: "≡" },
  { id: "tabs", label: "Tabs", group: "structure", description: "Tab navigation styles", icon: "⊟" },
  { id: "sidebars", label: "Sidebars", group: "structure", description: "Side navigation panels", icon: "▮" },
  { id: "modals", label: "Modals & Sheets", group: "structure", description: "Overlays, dialogs, drawers", icon: "□" },
  { id: "heroes", label: "Hero Sections", group: "structure", description: "Landing page header layouts", icon: "▬" },
  { id: "footers", label: "Footers", group: "structure", description: "Page footer layouts", icon: "▁" },

  // UX Patterns
  { id: "empty-states", label: "Empty States", group: "patterns", description: "Blank screen designs", icon: "○" },
  { id: "loading", label: "Loading", group: "patterns", description: "Skeletons, spinners, progress", icon: "◌" },
  { id: "onboarding", label: "Onboarding", group: "patterns", description: "First-run and tutorial flows", icon: "→" },
  { id: "errors", label: "Error Screens", group: "patterns", description: "404, connection, and failure states", icon: "✕" },
  { id: "success", label: "Success States", group: "patterns", description: "Confirmation and completion", icon: "✓" },
  { id: "notifications", label: "Notifications", group: "patterns", description: "Toasts, banners, alerts", icon: "!" },

  // Motion
  { id: "button-animations", label: "Button Press", group: "motion", description: "Click and tap feedback", icon: "⊙" },
  { id: "hover-animations", label: "Hover Effects", group: "motion", description: "Mouse-over interactions", icon: "↗" },
  { id: "page-transitions", label: "Page Transitions", group: "motion", description: "Screen-to-screen motion", icon: "⇄" },
  { id: "micro-interactions", label: "Micro-interactions", group: "motion", description: "Toggle, check, like animations", icon: "✦" },
  { id: "entrance-animations", label: "Entrance Animations", group: "motion", description: "How elements appear on screen", icon: "↓" },
];

export function getCategoriesByGroup(group: CategoryGroup): CategoryMeta[] {
  return categories.filter((c) => c.group === group);
}

export function getCategoryMeta(id: string): CategoryMeta | undefined {
  return categories.find((c) => c.id === id);
}
