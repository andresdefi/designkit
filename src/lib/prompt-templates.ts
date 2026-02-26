import type { Category, CategoryGroup } from "./types";

export interface PromptTemplate {
  id: string;
  label: string;
  category: CategoryGroup | Category;
  template: string;
  placeholders: string[];
}

export const promptTemplates: PromptTemplate[] = [
  // ── Foundations ──────────────────────────────────────────────
  {
    id: "colors-mood",
    label: "Palette by mood",
    category: "colors",
    template: "Create a color palette that feels {mood}",
    placeholders: ["mood"],
  },
  {
    id: "colors-reference",
    label: "Palette from reference",
    category: "colors",
    template: "Create a palette inspired by {reference}",
    placeholders: ["reference"],
  },
  {
    id: "typography-mood",
    label: "Font pairing by mood",
    category: "typography",
    template: "Add a font pairing that feels {mood}",
    placeholders: ["mood"],
  },
  {
    id: "typography-specific",
    label: "Specific font pairing",
    category: "typography",
    template: "Add a pairing using {headingFont} + {bodyFont}",
    placeholders: ["headingFont", "bodyFont"],
  },
  {
    id: "spacing-usecase",
    label: "Spacing for use case",
    category: "spacing",
    template: "Create a spacing system optimized for {useCase}",
    placeholders: ["useCase"],
  },

  // ── Components ──────────────────────────────────────────────
  {
    id: "buttons-mood",
    label: "Buttons by mood",
    category: "buttons",
    template: "Add button styles that feel {mood}",
    placeholders: ["mood"],
  },
  {
    id: "buttons-variant",
    label: "Button variant",
    category: "buttons",
    template: "Create a {style} button variant",
    placeholders: ["style"],
  },
  {
    id: "cards-usecase",
    label: "Card for use case",
    category: "cards",
    template: "Design a card style for {useCase}",
    placeholders: ["useCase"],
  },
  {
    id: "inputs-style",
    label: "Input style",
    category: "inputs",
    template: "Create a {style} input style for {useCase}",
    placeholders: ["style", "useCase"],
  },

  // ── Structure ───────────────────────────────────────────────
  {
    id: "navigation-type",
    label: "Navigation by type",
    category: "navigation",
    template: "Create a {type} navigation pattern",
    placeholders: ["type"],
  },
  {
    id: "modals-style",
    label: "Modal style",
    category: "modals",
    template: "Design a {style} modal that feels {mood}",
    placeholders: ["style", "mood"],
  },
  {
    id: "heroes-layout",
    label: "Hero section",
    category: "heroes",
    template: "Create a hero section with a {layout} layout for {useCase}",
    placeholders: ["layout", "useCase"],
  },

  // ── Content ─────────────────────────────────────────────────
  {
    id: "content-component",
    label: "Content component",
    category: "content",
    template: "Add a {component} style that matches {aesthetic}",
    placeholders: ["component", "aesthetic"],
  },
  {
    id: "badges-style",
    label: "Badge style",
    category: "badges",
    template: "Create a {shape} badge style for {useCase}",
    placeholders: ["shape", "useCase"],
  },
  {
    id: "tables-density",
    label: "Table style",
    category: "tables",
    template: "Design a {density} table optimized for {dataType}",
    placeholders: ["density", "dataType"],
  },

  // ── UX Patterns ─────────────────────────────────────────────
  {
    id: "patterns-screen",
    label: "Pattern screen",
    category: "patterns",
    template: "Design a {pattern} screen for {context}",
    placeholders: ["pattern", "context"],
  },
  {
    id: "empty-states-tone",
    label: "Empty state",
    category: "empty-states",
    template: "Create a {tone} empty state for {context}",
    placeholders: ["tone", "context"],
  },
  {
    id: "errors-type",
    label: "Error screen",
    category: "errors",
    template: "Design a {type} error screen with a {tone} tone",
    placeholders: ["type", "tone"],
  },

  // ── Motion ──────────────────────────────────────────────────
  {
    id: "motion-animations",
    label: "Animations by mood",
    category: "motion",
    template: "Create {type} animations that feel {mood}",
    placeholders: ["type", "mood"],
  },
  {
    id: "hover-effect",
    label: "Hover effect",
    category: "hover-animations",
    template: "Design a {style} hover effect for interactive elements",
    placeholders: ["style"],
  },
];

export function getTemplatesForCategory(category: Category): PromptTemplate[] {
  return promptTemplates.filter(
    (t) => t.category === category,
  );
}

export function getTemplatesForGroup(group: CategoryGroup): PromptTemplate[] {
  return promptTemplates.filter(
    (t) => t.category === group,
  );
}
