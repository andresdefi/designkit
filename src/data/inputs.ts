import type { CatalogItem, InputStyleData } from "@/lib/types";

export type InputGroup = "Text Inputs" | "Select" | "Checkbox" | "Radio" | "Search" | "Slider" | "Textarea";

export interface InputMeta {
  id: string;
  group: InputGroup;
}

export const INPUT_GROUPS: InputGroup[] = [
  "Text Inputs",
  "Select",
  "Checkbox",
  "Radio",
  "Search",
  "Slider",
  "Textarea",
];

export const INPUT_META: InputMeta[] = [
  // Text Inputs
  { id: "underline-text", group: "Text Inputs" },
  { id: "bordered-text", group: "Text Inputs" },
  { id: "filled-text", group: "Text Inputs" },
  { id: "floating-label-text", group: "Text Inputs" },
  { id: "inset-label-text", group: "Text Inputs" },
  { id: "pill-text", group: "Text Inputs" },
  { id: "flush-text", group: "Text Inputs" },
  { id: "neumorphic-text", group: "Text Inputs" },
  { id: "frosted-glass-text", group: "Text Inputs" },
  { id: "thick-focus-text", group: "Text Inputs" },
  { id: "left-accent-text", group: "Text Inputs" },
  // Select
  { id: "bordered-select", group: "Select" },
  { id: "filled-select", group: "Select" },
  { id: "underline-select", group: "Select" },
  { id: "pill-select", group: "Select" },
  { id: "flush-select", group: "Select" },
  // Checkbox
  { id: "standard-checkbox", group: "Checkbox" },
  { id: "rounded-checkbox", group: "Checkbox" },
  { id: "circle-checkbox", group: "Checkbox" },
  { id: "toggle-ios", group: "Checkbox" },
  { id: "toggle-android", group: "Checkbox" },
  { id: "animated-check", group: "Checkbox" },
  { id: "fill-checkbox", group: "Checkbox" },
  // Radio
  { id: "standard-radio", group: "Radio" },
  { id: "filled-radio", group: "Radio" },
  { id: "card-radio", group: "Radio" },
  { id: "segmented-radio", group: "Radio" },
  { id: "chip-radio", group: "Radio" },
  // Search
  { id: "simple-search", group: "Search" },
  { id: "expanding-search", group: "Search" },
  { id: "command-palette", group: "Search" },
  { id: "pill-search", group: "Search" },
  { id: "filter-search", group: "Search" },
  // Slider
  { id: "standard-slider", group: "Slider" },
  { id: "stepped-slider", group: "Slider" },
  { id: "labeled-slider", group: "Slider" },
  // Textarea
  { id: "bordered-textarea", group: "Textarea" },
  { id: "filled-textarea", group: "Textarea" },
  { id: "floating-label-textarea", group: "Textarea" },
  { id: "flush-textarea", group: "Textarea" },
  { id: "neumorphic-textarea", group: "Textarea" },
];

// NOTE on color convention:
// Colors are resolved dynamically from the active palette at render time.
// Special keys prefixed with __ are interpreted by the renderer:
//   __primary     → colors.primary
//   __primary-20  → rgba(primary, 0.20)
//   __error       → colors.semantic.error
//   __surface     → colors.surface
//   __border      → colors.border
//   __text        → colors.text
//   __textMuted   → colors.textMuted
// The CSS here is structural only — shape, shadow, border-width, transitions, etc.

export const inputStyles: CatalogItem<InputStyleData>[] = [
  // ── Text Inputs ─────────────────────────────────────────

  {
    id: "underline-text",
    category: "inputs",
    name: "Underline",
    description: "Material-style bottom border only — minimal, elegant",
    data: {
      variant: "underline",
      subtype: "text",
      css: {
        default: {
          border: "none",
          borderBottom: "2px solid __border",
          borderRadius: "0",
          padding: "8px 2px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderBottomColor: "__primary",
          boxShadow: "0 1px 0 0 __primary",
        },
        filled: {
          borderBottomColor: "__textMuted",
        },
        error: {
          borderBottomColor: "__error",
          boxShadow: "0 1px 0 0 __error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
          borderBottomStyle: "dashed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "bordered-text",
    category: "inputs",
    name: "Bordered",
    description: "Full border box — classic, clean, universal",
    data: {
      variant: "bordered",
      subtype: "text",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "6px",
          padding: "8px 12px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "filled-text",
    category: "inputs",
    name: "Filled",
    description: "Solid fill background with no visible border",
    data: {
      variant: "filled",
      subtype: "text",
      css: {
        default: {
          border: "2px solid transparent",
          borderRadius: "8px",
          padding: "8px 12px",
          backgroundColor: "__surface",
          transition: "border-color 200ms ease, background-color 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          backgroundColor: "__surface",
        },
        filled: {
          backgroundColor: "__surface",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "floating-label-text",
    category: "inputs",
    name: "Floating Label",
    description: "Label animates from inside to top on focus",
    data: {
      variant: "floating-label",
      subtype: "text",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "6px",
          padding: "14px 12px 6px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: true,
    },
  },
  {
    id: "inset-label-text",
    category: "inputs",
    name: "Inset Label",
    description: "Label sits inside the border, moves up on focus",
    data: {
      variant: "inset-label",
      subtype: "text",
      css: {
        default: {
          border: "2px solid __border",
          borderRadius: "8px",
          padding: "16px 12px 6px",
          backgroundColor: "__surface",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderColor: "__primary",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: true,
    },
  },
  {
    id: "pill-text",
    category: "inputs",
    name: "Pill",
    description: "Fully rounded input with soft feel",
    data: {
      variant: "pill",
      subtype: "text",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "9999px",
          padding: "8px 18px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "flush-text",
    category: "inputs",
    name: "Flush",
    description: "No visible boundary at rest, underline on focus",
    data: {
      variant: "flush",
      subtype: "text",
      css: {
        default: {
          border: "none",
          borderBottom: "1px solid transparent",
          borderRadius: "0",
          padding: "8px 0",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderBottomColor: "__primary",
        },
        filled: {
          borderBottomColor: "__border",
        },
        error: {
          borderBottomColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "neumorphic-text",
    category: "inputs",
    name: "Neumorphic",
    description: "Soft inset shadows for a pressed-in effect",
    data: {
      variant: "neumorphic",
      subtype: "text",
      css: {
        default: {
          border: "none",
          borderRadius: "12px",
          padding: "10px 14px",
          backgroundColor: "__surface",
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.06)",
          transition: "box-shadow 200ms ease",
        },
        focus: {
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.06), 0 0 0 2px __primary-20",
        },
        filled: {},
        error: {
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.06), 0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "frosted-glass-text",
    category: "inputs",
    name: "Frosted Glass",
    description: "Translucent backdrop blur with subtle border",
    data: {
      variant: "frosted-glass",
      subtype: "text",
      css: {
        default: {
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          padding: "8px 14px",
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary-50",
          boxShadow: "0 0 16px __primary-15",
        },
        filled: {
          borderColor: "rgba(255,255,255,0.25)",
        },
        error: {
          borderColor: "__error-50",
          boxShadow: "0 0 16px __error-15",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "thick-focus-text",
    category: "inputs",
    name: "Thick Focus Ring",
    description: "Bordered input with a bold 3px focus ring",
    data: {
      variant: "thick-focus",
      subtype: "text",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "6px",
          padding: "8px 12px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 3px __primary-30",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 3px __error-30",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "left-accent-text",
    category: "inputs",
    name: "Left Accent",
    description: "Colored left border for visual hierarchy",
    data: {
      variant: "left-accent",
      subtype: "text",
      css: {
        default: {
          border: "1px solid __border",
          borderLeft: "3px solid __primary",
          borderRadius: "0 6px 6px 0",
          padding: "8px 12px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          borderLeftColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderLeftColor: "__primary",
        },
        error: {
          borderColor: "__error",
          borderLeftColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },

  // ── Select ──────────────────────────────────────────────

  {
    id: "bordered-select",
    category: "inputs",
    name: "Bordered Select",
    description: "Full border box with dropdown arrow",
    data: {
      variant: "bordered",
      subtype: "select",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "6px",
          padding: "8px 32px 8px 12px",
          backgroundColor: "transparent",
          appearance: "none",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "filled-select",
    category: "inputs",
    name: "Filled Select",
    description: "Solid fill dropdown with subtle bottom border",
    data: {
      variant: "filled",
      subtype: "select",
      css: {
        default: {
          border: "2px solid transparent",
          borderRadius: "8px",
          padding: "8px 32px 8px 12px",
          backgroundColor: "__surface",
          appearance: "none",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderColor: "__primary",
        },
        filled: {},
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "underline-select",
    category: "inputs",
    name: "Underline Select",
    description: "Material-style select with bottom border only",
    data: {
      variant: "underline",
      subtype: "select",
      css: {
        default: {
          border: "none",
          borderBottom: "2px solid __border",
          borderRadius: "0",
          padding: "8px 28px 8px 2px",
          backgroundColor: "transparent",
          appearance: "none",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderBottomColor: "__primary",
          boxShadow: "0 1px 0 0 __primary",
        },
        filled: {
          borderBottomColor: "__textMuted",
        },
        error: {
          borderBottomColor: "__error",
          boxShadow: "0 1px 0 0 __error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "pill-select",
    category: "inputs",
    name: "Pill Select",
    description: "Fully rounded select dropdown",
    data: {
      variant: "pill",
      subtype: "select",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "9999px",
          padding: "8px 36px 8px 18px",
          backgroundColor: "transparent",
          appearance: "none",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "flush-select",
    category: "inputs",
    name: "Flush Select",
    description: "Minimal select with no boundary at rest",
    data: {
      variant: "flush",
      subtype: "select",
      css: {
        default: {
          border: "none",
          borderBottom: "1px solid transparent",
          borderRadius: "0",
          padding: "8px 28px 8px 0",
          backgroundColor: "transparent",
          appearance: "none",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderBottomColor: "__primary",
        },
        filled: {
          borderBottomColor: "__border",
        },
        error: {
          borderBottomColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },

  // ── Checkbox ────────────────────────────────────────────

  {
    id: "standard-checkbox",
    category: "inputs",
    name: "Standard",
    description: "Classic square checkbox with checkmark",
    data: {
      variant: "standard",
      subtype: "checkbox",
      css: {
        default: {
          width: "18px",
          height: "18px",
          border: "2px solid __border",
          borderRadius: "4px",
          backgroundColor: "transparent",
          transition: "background-color 150ms ease, border-color 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          borderColor: "__primary",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "rounded-checkbox",
    category: "inputs",
    name: "Rounded",
    description: "Checkbox with soft rounded corners",
    data: {
      variant: "rounded",
      subtype: "checkbox",
      css: {
        default: {
          width: "18px",
          height: "18px",
          border: "2px solid __border",
          borderRadius: "6px",
          backgroundColor: "transparent",
          transition: "background-color 150ms ease, border-color 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          borderColor: "__primary",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "circle-checkbox",
    category: "inputs",
    name: "Circle",
    description: "Circular checkbox — softer personality",
    data: {
      variant: "circle",
      subtype: "checkbox",
      css: {
        default: {
          width: "18px",
          height: "18px",
          border: "2px solid __border",
          borderRadius: "9999px",
          backgroundColor: "transparent",
          transition: "background-color 150ms ease, border-color 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          borderColor: "__primary",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "toggle-ios",
    category: "inputs",
    name: "iOS Toggle",
    description: "iOS-style toggle switch with sliding knob",
    data: {
      variant: "toggle-ios",
      subtype: "toggle",
      css: {
        default: {
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          backgroundColor: "__border",
          border: "none",
          padding: "2px",
          transition: "background-color 200ms ease",
        },
        focus: {
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
        },
        error: {
          backgroundColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "toggle-android",
    category: "inputs",
    name: "Android Toggle",
    description: "Material Design toggle with elevated thumb",
    data: {
      variant: "toggle-android",
      subtype: "toggle",
      css: {
        default: {
          width: "40px",
          height: "20px",
          borderRadius: "10px",
          backgroundColor: "__border",
          border: "none",
          padding: "2px",
          transition: "background-color 200ms ease",
        },
        focus: {
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary-40",
        },
        error: {
          backgroundColor: "__error-40",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "animated-check",
    category: "inputs",
    name: "Animated Check",
    description: "Checkmark draws itself in with an animation",
    data: {
      variant: "animated-check",
      subtype: "checkbox",
      css: {
        default: {
          width: "20px",
          height: "20px",
          border: "2px solid __border",
          borderRadius: "4px",
          backgroundColor: "transparent",
          transition: "background-color 200ms ease, border-color 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          borderColor: "__primary",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "fill-checkbox",
    category: "inputs",
    name: "Fill",
    description: "Entire box fills with color when checked",
    data: {
      variant: "fill",
      subtype: "checkbox",
      css: {
        default: {
          width: "18px",
          height: "18px",
          border: "2px solid __border",
          borderRadius: "4px",
          backgroundColor: "transparent",
          transition: "background-color 200ms ease, border-color 200ms ease, transform 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          borderColor: "__primary",
          transform: "scale(1.1)",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },

  // ── Radio ───────────────────────────────────────────────

  {
    id: "standard-radio",
    category: "inputs",
    name: "Standard Radio",
    description: "Classic circle with inner dot when selected",
    data: {
      variant: "standard",
      subtype: "radio",
      css: {
        default: {
          width: "18px",
          height: "18px",
          border: "2px solid __border",
          borderRadius: "9999px",
          backgroundColor: "transparent",
          transition: "border-color 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__primary",
          borderWidth: "5px",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "filled-radio",
    category: "inputs",
    name: "Filled Radio",
    description: "Fills completely with a white center dot",
    data: {
      variant: "filled",
      subtype: "radio",
      css: {
        default: {
          width: "18px",
          height: "18px",
          border: "2px solid __border",
          borderRadius: "9999px",
          backgroundColor: "transparent",
          transition: "background-color 150ms ease, border-color 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          borderColor: "__primary",
          boxShadow: "inset 0 0 0 3px __surface",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "card-radio",
    category: "inputs",
    name: "Card Radio",
    description: "Full card with border highlight when selected",
    data: {
      variant: "card",
      subtype: "radio",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "10px",
          padding: "12px 16px",
          backgroundColor: "__surface",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__primary",
          borderWidth: "2px",
          backgroundColor: "__primary-06",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "segmented-radio",
    category: "inputs",
    name: "Segmented Control",
    description: "Button group where one segment is active",
    data: {
      variant: "segmented",
      subtype: "radio",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "8px",
          padding: "6px 14px",
          backgroundColor: "transparent",
          transition: "background-color 150ms ease, color 150ms ease",
        },
        focus: {
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary",
          color: "__primaryForeground",
          borderColor: "__primary",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "chip-radio",
    category: "inputs",
    name: "Chip / Tag",
    description: "Pill-shaped chip that fills when selected",
    data: {
      variant: "chip",
      subtype: "radio",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "9999px",
          padding: "4px 14px",
          backgroundColor: "transparent",
          transition: "background-color 150ms ease, border-color 150ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          backgroundColor: "__primary-15",
          borderColor: "__primary",
          color: "__primary",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },

  // ── Search ──────────────────────────────────────────────

  {
    id: "simple-search",
    category: "inputs",
    name: "Simple Search",
    description: "Clean bordered input with a search icon",
    data: {
      variant: "simple",
      subtype: "search",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "8px",
          padding: "8px 12px 8px 34px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "expanding-search",
    category: "inputs",
    name: "Expanding Search",
    description: "Compact icon that expands into a full input on focus",
    data: {
      variant: "expanding",
      subtype: "search",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "9999px",
          padding: "8px 12px 8px 34px",
          backgroundColor: "transparent",
          width: "180px",
          transition: "width 300ms ease, border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          width: "280px",
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "command-palette",
    category: "inputs",
    name: "Command Palette",
    description: "Cmd+K style with elevated shadow and large padding",
    data: {
      variant: "command-palette",
      subtype: "search",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "12px",
          padding: "12px 16px 12px 40px",
          backgroundColor: "__surface",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25), 0 0 0 2px __primary-20",
        },
        filled: {},
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "pill-search",
    category: "inputs",
    name: "Pill Search",
    description: "Fully rounded search bar",
    data: {
      variant: "pill",
      subtype: "search",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "9999px",
          padding: "8px 18px 8px 38px",
          backgroundColor: "__surface",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "filter-search",
    category: "inputs",
    name: "Filter Search",
    description: "Search with filter chip slots below",
    data: {
      variant: "filter",
      subtype: "search",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "10px",
          padding: "10px 14px 10px 38px",
          backgroundColor: "transparent",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },

  // ── Slider ──────────────────────────────────────────────

  {
    id: "standard-slider",
    category: "inputs",
    name: "Standard Slider",
    description: "Clean range slider with primary-colored track",
    data: {
      variant: "standard",
      subtype: "slider",
      css: {
        default: {
          height: "4px",
          borderRadius: "2px",
          backgroundColor: "__border",
          appearance: "none",
          outline: "none",
          __thumbSize: "16px",
          __thumbBg: "__primary",
          __thumbRadius: "9999px",
          __trackFillBg: "__primary",
          transition: "background-color 200ms ease",
        },
        focus: {
          __thumbShadow: "0 0 0 3px __primary-20",
        },
        filled: {},
        error: {
          __trackFillBg: "__error",
          __thumbBg: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "stepped-slider",
    category: "inputs",
    name: "Stepped Slider",
    description: "Range slider with visible step marks along the track",
    data: {
      variant: "stepped",
      subtype: "slider",
      css: {
        default: {
          height: "6px",
          borderRadius: "3px",
          backgroundColor: "__border",
          appearance: "none",
          outline: "none",
          __thumbSize: "18px",
          __thumbBg: "__primary",
          __thumbRadius: "9999px",
          __trackFillBg: "__primary",
          __showSteps: "true",
          transition: "background-color 200ms ease",
        },
        focus: {
          __thumbShadow: "0 0 0 3px __primary-20",
        },
        filled: {},
        error: {
          __trackFillBg: "__error",
          __thumbBg: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "labeled-slider",
    category: "inputs",
    name: "Labeled Slider",
    description: "Slider with a floating value tooltip above the thumb",
    data: {
      variant: "labeled",
      subtype: "slider",
      css: {
        default: {
          height: "4px",
          borderRadius: "2px",
          backgroundColor: "__border",
          appearance: "none",
          outline: "none",
          __thumbSize: "18px",
          __thumbBg: "__primary",
          __thumbRadius: "9999px",
          __trackFillBg: "__primary",
          __showLabel: "true",
          transition: "background-color 200ms ease",
        },
        focus: {
          __thumbShadow: "0 0 0 3px __primary-20",
        },
        filled: {},
        error: {
          __trackFillBg: "__error",
          __thumbBg: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
        },
      },
      hasFloatingLabel: false,
    },
  },

  // ── Textarea ────────────────────────────────────────────

  {
    id: "bordered-textarea",
    category: "inputs",
    name: "Bordered Textarea",
    description: "Full border box textarea — classic and clean",
    data: {
      variant: "bordered",
      subtype: "textarea",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "6px",
          padding: "10px 12px",
          backgroundColor: "transparent",
          minHeight: "80px",
          resize: "vertical",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
          resize: "none",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "filled-textarea",
    category: "inputs",
    name: "Filled Textarea",
    description: "Solid fill textarea with no visible border",
    data: {
      variant: "filled",
      subtype: "textarea",
      css: {
        default: {
          border: "2px solid transparent",
          borderRadius: "8px",
          padding: "10px 12px",
          backgroundColor: "__surface",
          minHeight: "80px",
          resize: "vertical",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderColor: "__primary",
        },
        filled: {},
        error: {
          borderColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
          resize: "none",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "floating-label-textarea",
    category: "inputs",
    name: "Floating Label Textarea",
    description: "Textarea with animated label moving up on focus",
    data: {
      variant: "floating-label",
      subtype: "textarea",
      css: {
        default: {
          border: "1px solid __border",
          borderRadius: "6px",
          padding: "18px 12px 8px",
          backgroundColor: "transparent",
          minHeight: "80px",
          resize: "vertical",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        },
        focus: {
          borderColor: "__primary",
          boxShadow: "0 0 0 2px __primary-20",
        },
        filled: {
          borderColor: "__textMuted",
        },
        error: {
          borderColor: "__error",
          boxShadow: "0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
          resize: "none",
        },
      },
      hasFloatingLabel: true,
    },
  },
  {
    id: "flush-textarea",
    category: "inputs",
    name: "Flush Textarea",
    description: "Minimal textarea with no boundary — focus underline",
    data: {
      variant: "flush",
      subtype: "textarea",
      css: {
        default: {
          border: "none",
          borderBottom: "1px solid transparent",
          borderRadius: "0",
          padding: "8px 0",
          backgroundColor: "transparent",
          minHeight: "60px",
          resize: "vertical",
          transition: "border-color 200ms ease",
        },
        focus: {
          borderBottomColor: "__primary",
        },
        filled: {
          borderBottomColor: "__border",
        },
        error: {
          borderBottomColor: "__error",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
          resize: "none",
        },
      },
      hasFloatingLabel: false,
    },
  },
  {
    id: "neumorphic-textarea",
    category: "inputs",
    name: "Neumorphic Textarea",
    description: "Soft inset shadows for a pressed-in textarea",
    data: {
      variant: "neumorphic",
      subtype: "textarea",
      css: {
        default: {
          border: "none",
          borderRadius: "12px",
          padding: "12px 14px",
          backgroundColor: "__surface",
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.06)",
          minHeight: "80px",
          resize: "vertical",
          transition: "box-shadow 200ms ease",
        },
        focus: {
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.06), 0 0 0 2px __primary-20",
        },
        filled: {},
        error: {
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.06), 0 0 0 2px __error-20",
        },
        disabled: {
          opacity: "0.5",
          cursor: "not-allowed",
          resize: "none",
        },
      },
      hasFloatingLabel: false,
    },
  },
];
