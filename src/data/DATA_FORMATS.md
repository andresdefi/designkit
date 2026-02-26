# DesignKit Data Format Reference

Complete reference for every catalog data type in DesignKit. Use this document to correctly add new items to any category.

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Foundations](#foundations)
   - [ColorPaletteData](#1-colorpalettedata)
   - [TypographyData](#2-typographydata)
   - [SpacingData](#3-spacingdata)
   - [RadiusData](#4-radiusdata)
   - [ShadowData](#5-shadowdata)
3. [Components](#components)
   - [ButtonStyleData](#6-buttonstyledata)
   - [InputStyleData](#7-inputstyledata)
   - [CardStyleData](#8-cardstyledata)
4. [Structure](#structure)
   - [NavigationStyleData](#9-navigationstyledata)
   - [TabStyleData](#10-tabstyledata)
   - [SidebarStyleData](#11-sidebarstyledata)
   - [HeroStyleData](#12-herostyledata)
   - [ModalStyleData](#13-modalstyledata)
   - [FooterStyleData](#14-footerstyledata)
5. [Content](#content)
   - [BadgeStyleData](#15-badgestyledata)
   - [AvatarStyleData](#16-avatarstyledata)
   - [ListStyleData](#17-liststyledata)
   - [TableStyleData](#18-tablestyledata)
   - [PricingStyleData](#19-pricingstyledata)
   - [TestimonialStyleData](#20-testimonialstyledata)
   - [StatStyleData](#21-statstyledata)
   - [DividerStyleData](#22-dividerstyledata)
   - [ImageStyleData](#23-imagestyledata)
6. [Patterns](#patterns)
   - [EmptyStateStyleData](#24-emptystatestyledata)
   - [LoadingStyleData](#25-loadingstyledata)
   - [OnboardingStyleData](#26-onboardingstyledata)
   - [ErrorStyleData](#27-errorstyledata)
   - [SuccessStyleData](#28-successstyledata)
   - [NotificationStyleData](#29-notificationstyledata)
7. [Motion](#motion)
   - [AnimationData](#30-animationdata)

---

## Core Concepts

### The `CatalogItem<T>` Wrapper

Every item in DesignKit is wrapped in a `CatalogItem<T>` generic:

```typescript
interface CatalogItem<T = Record<string, unknown>> {
  id: string;          // Unique within this category (kebab-case)
  category: Category;  // Must match the category's key
  name: string;        // Human-readable display name
  description: string; // Short description shown in the UI
  data: T;             // Category-specific payload (see below)
}
```

### The `Category` Union

```typescript
type Category =
  | "colors" | "typography" | "spacing" | "radius" | "shadows"
  | "buttons" | "inputs" | "cards"
  | "navigation" | "tabs" | "sidebars" | "modals" | "heroes" | "footers"
  | "badges" | "avatars" | "lists" | "tables" | "pricing"
  | "testimonials" | "stats" | "dividers" | "images"
  | "empty-states" | "loading" | "onboarding" | "errors" | "success" | "notifications"
  | "button-animations" | "hover-animations" | "page-transitions"
  | "micro-interactions" | "entrance-animations";
```

### The `CategoryGroup` Union

```typescript
type CategoryGroup = "foundations" | "components" | "content" | "structure" | "patterns" | "motion";
```

### ID Conventions

- **Format**: `kebab-case`, lowercase, hyphens separating words
- **Uniqueness**: Must be unique within a category
- **Prefixing**: Some categories use a category prefix (e.g., `nav-`, `hero-`, `modal-`, `sidebar-`, `footer-`, `tab-`, `ea-`). Others do not (buttons, cards, badges, etc.). Follow the existing convention for the category.
- **Descriptive**: IDs should be self-documenting (e.g., `flat-solid`, `outline-fill-hover`, `skeleton-shimmer`)

### Color Token Placeholders

CSS values in `data` objects use special `__` prefixed tokens that the renderer resolves at runtime from the active color palette:

| Token Pattern | Resolves To | Example |
|---|---|---|
| `__primary` | `colors.primary` | `"color": "__primary"` |
| `__primaryForeground` | `colors.primaryForeground` | `"color": "__primaryForeground"` |
| `__secondary` | `colors.secondary` | |
| `__accent` | `colors.accent` | |
| `__surface` | `colors.surface` | `"backgroundColor": "__surface"` |
| `__surfaceAlt` | `colors.surfaceAlt` | |
| `__background` | `colors.background` | |
| `__border` | `colors.border` | `"border": "1px solid __border"` |
| `__text` | `colors.text` | |
| `__textSecondary` | `colors.textSecondary` | |
| `__textMuted` | `colors.textMuted` | |
| `__error` | `colors.semantic.error` | |
| `__primary-NN` | `rgba(primary, 0.NN)` | `"backgroundColor": "__primary-15"` (15% opacity) |
| `__accent-NN` | `rgba(accent, 0.NN)` | `"boxShadow": "0 4px 14px __primary-25"` |
| `__surface-NN` | `rgba(surface, 0.NN)` | `"backgroundColor": "__surface-80"` |

The number after the hyphen is an integer opacity percentage (05 = 5%, 10 = 10%, 80 = 80%).

Tokens can appear **inside compound CSS values**: `"border": "1px solid __border"`, `"background": "linear-gradient(135deg, __primary-15, __accent-15)"`.

### Button-Specific Hover Override Tokens

Buttons use additional `__hover*` tokens in their CSS state objects:

| Token | Meaning |
|---|---|
| `__hoverBg: "primary-10"` | Set hover background to rgba(primary, 0.10) |
| `__hoverBg: "primary-solid"` | Set hover background to solid primary color |
| `__hoverText: "primaryForeground"` | Set hover text to primaryForeground |
| `__hoverBorder: "primary"` | Set hover border color to primary |
| `__hoverBorderBottom: "primary"` | Set hover bottom border to primary |
| `__hoverShadow: "glow"` | Apply a glow box-shadow effect |
| `__hoverShadow: "neon"` | Apply a neon glow box-shadow effect |
| `__hoverShadow: "pulse"` | Apply a pulsing glow |
| `__defaultBg: "primary-05"` | Set default (resting) background to rgba(primary, 0.05) |

### CSS State Keys

Components that have interactive states use a CSS object with named state keys:

**Buttons** use: `default`, `hover`, `active`, `disabled`
**Inputs** use: `default`, `focus`, `filled`, `error`, `disabled`

Each state key maps to a `Record<string, string>` of CSS property/value pairs.

### Data File Subcategory Groups

Each data file exports a `*_META` array and `*_GROUPS` constant that organizes items into visual subcategories for the UI. When adding a new item, also add a corresponding entry to the `*_META` array and assign it to the appropriate group. The groups are file-local display categories (e.g., `"Solid" | "Outline" | "Ghost"` for buttons).

### Catalog Registry

All items are registered in `src/lib/catalog-registry.ts`. Each category maps to an array of IDs extracted from the data arrays. The registry is auto-derived from the data exports -- no manual registration needed (just export the item from the data file).

---

## Foundations

### 1. ColorPaletteData

**Category**: `"colors"` | **Group**: `"foundations"` | **File**: `src/data/colors.ts`

```typescript
interface ColorScale {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string;
}

interface SemanticColors {
  success: string; warning: string; error: string; info: string;
}

interface ColorMode {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  semantic: SemanticColors;
}

interface ColorPaletteData {
  light: ColorMode;
  dark: ColorMode;
  primaryScale: ColorScale;
}
```

**Annotated Example**:
```typescript
{
  id: "stone",                                    // kebab-case, unique within "colors"
  category: "colors",                             // always "colors"
  name: "Stone",                                  // display name
  description: "Warm grays with subtle brown undertones", // short description
  data: {
    light: {                                       // light mode token set
      background: "#FAFAF9",                       // page background
      surface: "#FFFFFF",                          // card/panel backgrounds
      surfaceAlt: "#F5F5F4",                       // alternate surface (hover states, stripes)
      border: "#E7E5E4",                           // default border color
      text: "#1C1917",                             // primary text
      textSecondary: "#44403C",                    // secondary/supporting text
      textMuted: "#A8A29E",                        // muted/placeholder text
      primary: "#78716C",                          // primary brand color
      primaryForeground: "#FFFFFF",                // text on primary color
      secondary: "#D6D3D1",                        // secondary color
      secondaryForeground: "#1C1917",              // text on secondary
      accent: "#A16207",                           // accent/highlight color
      accentForeground: "#FFFFFF",                 // text on accent
      semantic: {
        success: "#16A34A",                        // success state
        warning: "#CA8A04",                        // warning state
        error: "#DC2626",                          // error state
        info: "#2563EB",                           // info state
      },
    },
    dark: {                                        // dark mode — same structure as light
      background: "#0C0A09",
      surface: "#1C1917",
      surfaceAlt: "#292524",
      border: "#44403C",
      text: "#FAFAF9",
      textSecondary: "#D6D3D1",
      textMuted: "#78716C",
      primary: "#A8A29E",
      primaryForeground: "#0C0A09",
      secondary: "#44403C",
      secondaryForeground: "#FAFAF9",
      accent: "#EAB308",
      accentForeground: "#0C0A09",
      semantic: { success: "#22C55E", warning: "#EAB308", error: "#EF4444", info: "#3B82F6" },
    },
    primaryScale: {                                // 11-step primary hue ramp
      50: "#FAFAF9", 100: "#F5F5F4", 200: "#E7E5E4", 300: "#D6D3D1",
      400: "#A8A29E", 500: "#78716C", 600: "#57534E", 700: "#44403C",
      800: "#292524", 900: "#1C1917", 950: "#0C0A09",
    },
  },
}
```

**Field Descriptions**:

| Field | Type | Required | Description |
|---|---|---|---|
| `light` | `ColorMode` | Yes | Complete token set for light mode |
| `dark` | `ColorMode` | Yes | Complete token set for dark mode |
| `primaryScale` | `ColorScale` | Yes | 11-step shade ramp (50-950) for the primary hue |

**ID Convention**: Simple descriptive names: `stone`, `slate`, `indigo`, `ocean-breeze`.

---

### 2. TypographyData

**Category**: `"typography"` | **Group**: `"foundations"` | **File**: `src/data/typography.ts`

```typescript
interface TypeStep {
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing?: string;
}

interface TypeScale {
  h1: TypeStep; h2: TypeStep; h3: TypeStep; h4: TypeStep; h5: TypeStep; h6: TypeStep;
  body: TypeStep; bodySmall: TypeStep; caption: TypeStep; overline: TypeStep; button: TypeStep;
}

interface TypographyData {
  headingFont: string;
  headingFontUrl?: string;
  bodyFont: string;
  bodyFontUrl?: string;
  monoFont?: string;
  monoFontUrl?: string;
  scaleRatio: number;
  scaleName: string;
  scale: TypeScale;
}
```

**Note**: Typography items are generated dynamically via `getTypographyItems(scaleId)`. The font pairings are defined as `FontPairing` objects in `FONT_PAIRINGS`, and the type scale is computed from a ratio preset. To add a new pairing, add to `FONT_PAIRINGS`.

**Annotated Example** (FontPairing input):
```typescript
{
  id: "inter",                                     // kebab-case unique ID
  group: "Modern / Clean",                         // display group
  name: "Inter",                                   // display name
  description: "The workhorse — highly legible at every size",
  headingFont: "Inter",                            // CSS font-family for headings
  headingFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  bodyFont: "Inter",                               // CSS font-family for body text
  bodyFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  // monoFont, monoFontUrl: optional monospace font
  headingWeight: 700,                              // font-weight for headings
  bodyWeight: 400,                                 // font-weight for body
}
```

**Field Descriptions** (TypographyData):

| Field | Type | Required | Description |
|---|---|---|---|
| `headingFont` | `string` | Yes | CSS font-family string for headings |
| `headingFontUrl` | `string` | No | Google Fonts / Fontshare URL for heading font |
| `bodyFont` | `string` | Yes | CSS font-family string for body text |
| `bodyFontUrl` | `string` | No | URL to load body font |
| `monoFont` | `string` | No | CSS font-family for monospace |
| `monoFontUrl` | `string` | No | URL to load mono font |
| `scaleRatio` | `number` | Yes | Scale ratio used (e.g., 1.25 for Major Third) |
| `scaleName` | `string` | Yes | Human name of the scale preset |
| `scale` | `TypeScale` | Yes | Computed scale with all 11 type steps |

**ID Convention**: Font family name in kebab-case: `inter`, `playfair-source`, `jetbrains-inter`.

**Typography Groups**: `"Modern / Clean"`, `"Editorial / Expressive"`, `"Technical / Precise"`, `"Bold / Statement"`, `"Friendly / Rounded"`, `"Minimal / Neutral"`.

---

### 3. SpacingData

**Category**: `"spacing"` | **Group**: `"foundations"` | **File**: `src/data/spacing.ts`

```typescript
interface SpacingData {
  baseUnit: number;
  scale: Record<string, string>;
}
```

**Annotated Example**:
```typescript
{
  id: "default",                                   // unique kebab-case ID
  category: "spacing",                             // always "spacing"
  name: "Default",                                 // display name
  description: "4px base with x2 progression — balanced and versatile",
  data: {
    baseUnit: 4,                                   // base unit in px used to derive the scale
    scale: {                                       // named steps mapping to CSS values
      "0": "0px",
      "0.5": "2px",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "6": "24px",
      "8": "32px",
      "12": "48px",
      "16": "64px",
      "20": "80px",
      "24": "96px",
      "32": "128px",
      "40": "160px",
    },
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `baseUnit` | `number` | Yes | Base value in pixels that the scale derives from |
| `scale` | `Record<string, string>` | Yes | Map of step names to CSS size values (px, %, clamp(), etc.) |

**ID Convention**: Descriptive single words: `tight`, `compact`, `default`, `comfortable`, `spacious`, `fibonacci`, `tailwind`, `material`.

**Special Notes**: Scale keys can be numeric strings (`"1"`, `"2"`) or named (`"xxs"`, `"xs"`, `"sm"`, `"h1"`, `"v1"`). Values can be `px`, `%`, or `clamp()` expressions.

---

### 4. RadiusData

**Category**: `"radius"` | **Group**: `"foundations"` | **File**: `src/data/radius.ts`

```typescript
interface RadiusData {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
  button: string;
  card: string;
  input: string;
  badge: string;
  modal: string;
}
```

**Annotated Example**:
```typescript
{
  id: "moderate",                                  // unique kebab-case ID
  category: "radius",                              // always "radius"
  name: "Moderate",
  description: "6-8px — comfortable and universally appealing",
  data: {
    none: "0px",                                   // no rounding
    sm: "4px",                                     // small elements
    md: "6px",                                     // medium elements
    lg: "8px",                                     // large elements
    xl: "12px",                                    // extra large
    "2xl": "16px",                                 // 2x extra large
    full: "9999px",                                // fully round (circle/pill)
    button: "6px",                                 // default button radius
    card: "8px",                                   // default card radius
    input: "6px",                                  // default input radius
    badge: "4px",                                  // default badge radius
    modal: "12px",                                 // default modal radius
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `none` | `string` | Yes | Always `"0px"` |
| `sm` through `2xl` | `string` | Yes | Generic size scale tokens |
| `full` | `string` | Yes | Full rounding (typically `"9999px"`) |
| `button` | `string` | Yes | Default border-radius for buttons |
| `card` | `string` | Yes | Default border-radius for cards |
| `input` | `string` | Yes | Default border-radius for inputs |
| `badge` | `string` | Yes | Default border-radius for badges |
| `modal` | `string` | Yes | Default border-radius for modals |

**ID Convention**: Descriptive adjectives: `sharp`, `subtle`, `moderate`, `rounded`, `pill`, `squircle`, `chunky`.

**Special Notes**: Values can be single values (`"8px"`) or multi-corner shorthand (`"6px 6px 0px 0px"`, `"4px 8px 6px 10px"`).

---

### 5. ShadowData

**Category**: `"shadows"` | **Group**: `"foundations"` | **File**: `src/data/shadows.ts`

```typescript
interface ShadowData {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}
```

**Annotated Example**:
```typescript
{
  id: "soft",                                      // unique kebab-case ID
  category: "shadows",                             // always "shadows"
  name: "Soft",
  description: "Large blur, low opacity — gentle floating effect",
  data: {
    none: "none",                                  // no shadow
    sm: "0 2px 8px rgba(0,0,0,0.06)",             // small elevation
    md: "0 4px 16px rgba(0,0,0,0.08)",            // medium elevation
    lg: "0 8px 30px rgba(0,0,0,0.10)",            // large elevation
    xl: "0 12px 40px rgba(0,0,0,0.12)",           // extra-large elevation
    "2xl": "0 20px 60px rgba(0,0,0,0.14)",        // maximum elevation
    inner: "inset 0 2px 8px rgba(0,0,0,0.06)",    // inset/pressed shadow
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `none` | `string` | Yes | Always `"none"` |
| `sm` through `2xl` | `string` | Yes | Increasing elevation levels as CSS `box-shadow` values |
| `inner` | `string` | Yes | Inset shadow for pressed/recessed states |

**ID Convention**: Descriptive: `flat`, `subtle`, `material`, `soft`, `crisp`, `neumorphic`, `glow`, `hard-offset`.

**Shadow Groups**: `"Minimal"`, `"Classic"`, `"Stylistic"`, `"Atmospheric"`, `"Specialty"`, `"Framework"`, `"Tinted"`, `"Extreme"`.

**Special Notes**: Values are raw CSS `box-shadow` strings. Multi-layer shadows use commas. Framework-specific shadows (Tailwind, iOS, Material, Carbon, Ant, Chakra, Bootstrap) match their respective design system values.

---

## Components

### 6. ButtonStyleData

**Category**: `"buttons"` | **Group**: `"components"` | **File**: `src/data/buttons.ts`

```typescript
type ButtonColorStrategy = "solid" | "outline" | "ghost" | "soft" | "surface" | "gradient";

interface ButtonStyleData {
  variant: string;
  colorStrategy: ButtonColorStrategy;
  css: {
    default: Record<string, string>;
    hover: Record<string, string>;
    active: Record<string, string>;
    disabled: Record<string, string>;
  };
  supportsSizes: boolean;
  supportsIcons: boolean;
  animation?: string;
}
```

**Annotated Example**:
```typescript
{
  id: "elevated-solid",                            // unique kebab-case ID
  category: "buttons",                             // always "buttons"
  name: "Elevated Solid",
  description: "Material-style elevation with layered shadow",
  data: {
    variant: "solid",                              // visual variant name
    colorStrategy: "solid",                        // how colors are applied (see below)
    css: {
      default: {                                   // resting state CSS
        border: "none",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3)",
        transition: "box-shadow 200ms ease, transform 200ms ease",
      },
      hover: {                                     // hover state CSS overrides
        boxShadow: "0 6px 12px rgba(0,0,0,0.25), 0 3px 6px rgba(0,0,0,0.2)",
        transform: "translateY(-1px)",
      },
      active: {                                    // active/pressed state
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        transform: "translateY(1px)",
      },
      disabled: {                                  // disabled state
        opacity: "0.5",
        cursor: "not-allowed",
        boxShadow: "none",
      },
    },
    supportsSizes: true,                           // can be rendered at sm/md/lg sizes
    supportsIcons: true,                           // supports leading/trailing icon slots
    // animation: "lift",                          // optional animation name reference
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant label (e.g., `"solid"`, `"outline"`, `"ghost"`, `"soft"`, `"special"`) |
| `colorStrategy` | `ButtonColorStrategy` | Yes | How the renderer applies palette colors |
| `css.default` | `Record<string, string>` | Yes | Resting state CSS properties |
| `css.hover` | `Record<string, string>` | Yes | Hover state CSS overrides |
| `css.active` | `Record<string, string>` | Yes | Active/pressed state CSS overrides |
| `css.disabled` | `Record<string, string>` | Yes | Disabled state CSS overrides |
| `supportsSizes` | `boolean` | Yes | Whether size variants (sm/md/lg) are supported |
| `supportsIcons` | `boolean` | Yes | Whether icon slots are available |
| `animation` | `string` | No | Named animation reference (e.g., `"lift"`, `"press"`, `"shimmer"`) |

**Color Strategy Options**:
- `"solid"` -- Primary bg, primaryForeground text
- `"outline"` -- Transparent bg, primary border + text
- `"ghost"` -- Transparent bg, primary text, no border
- `"soft"` -- Light primary tint bg, primary text
- `"surface"` -- Surface bg + border, text color
- `"gradient"` -- Primary-to-accent gradient bg

**Button Groups**: `"Solid"`, `"Outline"`, `"Ghost"`, `"Soft"`, `"Special"`.

**ID Convention**: No prefix. Descriptive: `flat-solid`, `thin-outline`, `ghost`, `frosted-glass`, `brutalist`, `cyberpunk`.

**Special Notes**: CSS is **structural only** -- colors are dynamically resolved from the palette via `colorStrategy`. Hover states can use `__hover*` tokens (see Core Concepts). Always include `transition` in `default` for smooth state changes.

---

### 7. InputStyleData

**Category**: `"inputs"` | **Group**: `"components"` | **File**: `src/data/inputs.ts`

```typescript
interface InputStyleData {
  variant: string;
  subtype: "text" | "select" | "checkbox" | "radio" | "toggle" | "search" | "slider" | "textarea";
  css: {
    default: Record<string, string>;
    focus: Record<string, string>;
    filled: Record<string, string>;
    error: Record<string, string>;
    disabled: Record<string, string>;
  };
  hasFloatingLabel: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "underline-text",                            // unique ID
  category: "inputs",                              // always "inputs"
  name: "Underline",
  description: "Material-style bottom border only — minimal, elegant",
  data: {
    variant: "underline",                          // visual variant name
    subtype: "text",                               // input type classification
    css: {
      default: {                                   // resting state
        border: "none",
        borderBottom: "2px solid __border",         // uses color token
        borderRadius: "0",
        padding: "8px 2px",
        backgroundColor: "transparent",
        transition: "border-color 200ms ease",
      },
      focus: {                                     // focused state
        borderBottomColor: "__primary",
        boxShadow: "0 1px 0 0 __primary",
      },
      filled: {                                    // has-value state
        borderBottomColor: "__textMuted",
      },
      error: {                                     // validation error state
        borderBottomColor: "__error",
        boxShadow: "0 1px 0 0 __error",
      },
      disabled: {                                  // disabled state
        opacity: "0.5",
        cursor: "not-allowed",
        borderBottomStyle: "dashed",
      },
    },
    hasFloatingLabel: false,                       // whether label floats on focus
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Visual variant name |
| `subtype` | enum | Yes | Input type: `"text"`, `"select"`, `"checkbox"`, `"radio"`, `"toggle"`, `"search"`, `"slider"`, `"textarea"` |
| `css.default` | `Record<string, string>` | Yes | Resting state |
| `css.focus` | `Record<string, string>` | Yes | Focus state |
| `css.filled` | `Record<string, string>` | Yes | Has-value state |
| `css.error` | `Record<string, string>` | Yes | Error state |
| `css.disabled` | `Record<string, string>` | Yes | Disabled state |
| `hasFloatingLabel` | `boolean` | Yes | Whether the label animates from inside to above |

**Input Groups**: `"Text Inputs"`, `"Select"`, `"Checkbox"`, `"Radio"`, `"Search"`, `"Slider"`, `"Textarea"`.

**ID Convention**: Format is `{variant}-{subtype}`: `underline-text`, `bordered-select`, `standard-checkbox`, `standard-radio`, `search-pill`, `range-slider`, `neumorphic-textarea`.

---

### 8. CardStyleData

**Category**: `"cards"` | **Group**: `"components"` | **File**: `src/data/cards.ts`

```typescript
interface CardStyleData {
  variant: string;
  css: Record<string, string>;
  hoverCss?: Record<string, string>;
  hasImage: boolean;
  layout: "vertical" | "horizontal";
}
```

**Annotated Example**:
```typescript
{
  id: "soft-shadow",                               // unique ID
  category: "cards",                               // always "cards"
  name: "Soft Shadow",
  description: "Gentle elevation with a diffuse, soft box shadow",
  data: {
    variant: "soft-shadow",                        // visual variant name
    css: {                                         // default state CSS
      backgroundColor: "__surface",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
      transition: "box-shadow 300ms ease, transform 300ms ease",
    },
    hoverCss: {                                    // optional hover overrides
      boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
      transform: "translateY(-2px)",
    },
    hasImage: false,                               // whether the card includes an image zone
    layout: "vertical",                            // content stacking direction
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Visual variant name |
| `css` | `Record<string, string>` | Yes | Default state CSS (single flat object, NOT state-keyed) |
| `hoverCss` | `Record<string, string>` | No | Hover state CSS overrides |
| `hasImage` | `boolean` | Yes | Whether the card has an image zone |
| `layout` | `"vertical" \| "horizontal"` | Yes | Content flow direction |

**Card Groups**: `"Flat"`, `"Elevated"`, `"Glass & Gradient"`, `"Accented"`, `"Neumorphic"`, `"Special"`, `"Expressive"`.

**ID Convention**: No prefix. Descriptive: `flat`, `flat-border`, `soft-shadow`, `glassmorphic`, `brutalist`, `neon-glow`.

**Special Notes**: Unlike buttons, cards use a **flat CSS object** (not state-keyed). `hoverCss` is optional and merges with `css` on hover.

---

## Structure

### 9. NavigationStyleData

**Category**: `"navigation"` | **Group**: `"structure"` | **File**: `src/data/navigation.ts`

```typescript
interface NavigationStyleData {
  variant: string;
  subtype: "topbar" | "mobile-bottom" | "breadcrumb";
  layout: string;
  css: Record<string, string>;
  hoverCss?: Record<string, string>;
  hasLogo: boolean;
  hasAvatar: boolean;
  position: "static" | "sticky" | "fixed";
}
```

**Annotated Example**:
```typescript
{
  id: "nav-logo-links-right",                      // prefixed with "nav-"
  category: "navigation",
  name: "Logo + Links Right",
  description: "Logo left, navigation links right — standard layout",
  data: {
    variant: "logo-links-right",                   // variant name
    subtype: "topbar",                             // nav type classification
    layout: "logo-left-links-right",               // layout description string
    css: {
      backgroundColor: "__surface",
      borderBottom: "1px solid __border",
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    hasLogo: true,                                 // includes logo area
    hasAvatar: false,                              // includes user avatar
    position: "sticky",                            // CSS position behavior
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `subtype` | enum | Yes | `"topbar"`, `"mobile-bottom"`, or `"breadcrumb"` |
| `layout` | `string` | Yes | Descriptive layout name (e.g., `"centered"`, `"logo-left-links-right"`, `"icons-with-labels"`, `"slash"`) |
| `css` | `Record<string, string>` | Yes | Container CSS |
| `hoverCss` | `Record<string, string>` | No | Hover state CSS |
| `hasLogo` | `boolean` | Yes | Whether nav includes a logo slot |
| `hasAvatar` | `boolean` | Yes | Whether nav includes a user avatar slot |
| `position` | enum | Yes | `"static"`, `"sticky"`, or `"fixed"` |

**Navigation Groups**: `"Top Bars"`, `"Mobile Nav"`, `"Breadcrumbs"`.

**ID Convention**: Always prefixed with `nav-`: `nav-simple-centered`, `nav-bottom-ios`, `nav-breadcrumb-slash`.

---

### 10. TabStyleData

**Category**: `"tabs"` | **Group**: `"structure"` | **File**: `src/data/tabs.ts`

```typescript
interface TabStyleData {
  variant: string;
  orientation: "horizontal" | "vertical";
  containerCss: Record<string, string>;
  tabCss: Record<string, string>;
  activeTabCss: Record<string, string>;
  hoverTabCss?: Record<string, string>;
  hasIcons: boolean;
  indicatorStyle: "underline" | "pill" | "border" | "filled" | "none";
}
```

**Annotated Example**:
```typescript
{
  id: "tab-underline",                             // prefixed with "tab-"
  category: "tabs",
  name: "Underline",
  description: "Active tab has bottom border indicator — most common",
  data: {
    variant: "underline",
    orientation: "horizontal",                     // tab layout direction
    containerCss: {                                // outer tab bar container
      display: "flex",
      borderBottom: "1px solid __border",
      gap: "0",
    },
    tabCss: {                                      // individual tab item (default)
      padding: "8px 14px",
      borderBottom: "2px solid transparent",
      color: "__textMuted",
      transition: "color 150ms ease, border-color 150ms ease",
    },
    activeTabCss: {                                // active tab overrides
      color: "__primary",
      borderBottomColor: "__primary",
    },
    hoverTabCss: {                                 // hover tab overrides (optional)
      color: "__text",
    },
    hasIcons: false,                               // whether tabs include icons
    indicatorStyle: "underline",                   // visual indicator type
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `orientation` | enum | Yes | `"horizontal"` or `"vertical"` |
| `containerCss` | `Record<string, string>` | Yes | Tab bar container CSS |
| `tabCss` | `Record<string, string>` | Yes | Default individual tab CSS |
| `activeTabCss` | `Record<string, string>` | Yes | Active tab CSS overrides |
| `hoverTabCss` | `Record<string, string>` | No | Hover tab CSS overrides |
| `hasIcons` | `boolean` | Yes | Whether tabs support icon slots |
| `indicatorStyle` | enum | Yes | `"underline"`, `"pill"`, `"border"`, `"filled"`, or `"none"` |

**Tab Groups**: `"Horizontal"`, `"Vertical"`.

**ID Convention**: Prefixed with `tab-`: `tab-underline`, `tab-pill`, `tab-bordered`, `tab-vertical`.

---

### 11. SidebarStyleData

**Category**: `"sidebars"` | **Group**: `"structure"` | **File**: `src/data/sidebars.ts`

```typescript
interface SidebarStyleData {
  variant: string;
  css: Record<string, string>;
  itemCss: Record<string, string>;
  activeItemCss: Record<string, string>;
  hoverItemCss?: Record<string, string>;
  isCollapsible: boolean;
  hasGroupHeaders: boolean;
  width: string;
  collapsedWidth?: string;
}
```

**Annotated Example**:
```typescript
{
  id: "sidebar-collapsible",                       // prefixed with "sidebar-"
  category: "sidebars",
  name: "Collapsible Icon-Only",
  description: "Toggle between full labels and icon-only — space efficient",
  data: {
    variant: "collapsible",
    css: {                                         // sidebar container CSS
      backgroundColor: "__surface",
      borderRight: "1px solid __border",
      height: "100%",
      padding: "12px 0",
      transition: "width 200ms ease",
    },
    itemCss: {                                     // nav item default CSS
      padding: "8px 12px",
      color: "__textSecondary",
      borderRadius: "6px",
      margin: "0 8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 150ms ease",
    },
    activeItemCss: {                               // active item overrides
      color: "__primary",
      backgroundColor: "__primary-10",
    },
    hoverItemCss: {                                // hover item overrides
      backgroundColor: "__surfaceAlt",
      color: "__text",
    },
    isCollapsible: true,                           // can collapse to icon-only
    hasGroupHeaders: false,                        // has section headers
    width: "200px",                                // expanded width
    collapsedWidth: "56px",                        // width when collapsed
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `css` | `Record<string, string>` | Yes | Sidebar container CSS |
| `itemCss` | `Record<string, string>` | Yes | Default nav item CSS |
| `activeItemCss` | `Record<string, string>` | Yes | Active item CSS overrides |
| `hoverItemCss` | `Record<string, string>` | No | Hover item CSS overrides |
| `isCollapsible` | `boolean` | Yes | Whether sidebar can collapse |
| `hasGroupHeaders` | `boolean` | Yes | Whether items are grouped under section headers |
| `width` | `string` | Yes | Expanded width (CSS value) |
| `collapsedWidth` | `string` | No | Width when collapsed (only if `isCollapsible`) |

**ID Convention**: Prefixed with `sidebar-`: `sidebar-fixed`, `sidebar-collapsible`, `sidebar-floating`, `sidebar-dark`.

---

### 12. HeroStyleData

**Category**: `"heroes"` | **Group**: `"structure"` | **File**: `src/data/heroes.ts`

```typescript
interface HeroStyleData {
  variant: string;
  layout: string;
  css: Record<string, string>;
  contentCss?: Record<string, string>;
  hasImage: boolean;
  hasGradient: boolean;
  minHeight: string;
}
```

**Annotated Example**:
```typescript
{
  id: "hero-gradient",                             // prefixed with "hero-"
  category: "heroes",
  name: "Gradient Background",
  description: "Bold gradient bg with centered text — modern SaaS",
  data: {
    variant: "gradient",
    layout: "centered",                            // layout type description
    css: {                                         // hero container CSS
      background: "linear-gradient(135deg, __primary, __accent)",
      padding: "40px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    // contentCss: { ... },                        // optional inner content wrapper CSS
    hasImage: false,                               // includes background/hero image
    hasGradient: true,                             // uses gradient background
    minHeight: "320px",                            // minimum hero height
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `layout` | `string` | Yes | Layout type: `"centered"`, `"split"`, `"full-image"` |
| `css` | `Record<string, string>` | Yes | Hero container CSS |
| `contentCss` | `Record<string, string>` | No | Inner content wrapper CSS (for overlay text on images) |
| `hasImage` | `boolean` | Yes | Whether hero has a background image |
| `hasGradient` | `boolean` | Yes | Whether hero uses a gradient background |
| `minHeight` | `string` | Yes | CSS min-height value |

**Hero Groups**: `"Text-Focused"`, `"Image-Focused"`, `"Decorative"`.

**ID Convention**: Prefixed with `hero-`: `hero-centered-text`, `hero-split`, `hero-full-image`, `hero-gradient`.

---

### 13. ModalStyleData

**Category**: `"modals"` | **Group**: `"structure"` | **File**: `src/data/modals.ts`

```typescript
interface ModalStyleData {
  variant: string;
  subtype: "center" | "bottom-sheet" | "drawer" | "fullscreen" | "popover" | "command" | "toast";
  css: Record<string, string>;
  panelCss: Record<string, string>;
  hasOverlay: boolean;
  animationDirection: "center" | "bottom" | "right" | "top" | "none";
}
```

**Annotated Example**:
```typescript
{
  id: "modal-center",                              // prefixed with "modal-"
  category: "modals",
  name: "Center Dialog",
  description: "Standard centered modal with overlay — confirmations",
  data: {
    variant: "center",
    subtype: "center",                             // modal type
    css: {                                         // overlay/backdrop CSS
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)",
    },
    panelCss: {                                    // modal panel/content CSS
      backgroundColor: "__surface",
      border: "1px solid __border",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
      maxWidth: "400px",
      width: "100%",
    },
    hasOverlay: true,                              // has background overlay
    animationDirection: "center",                  // animation entry direction
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `subtype` | enum | Yes | `"center"`, `"bottom-sheet"`, `"drawer"`, `"fullscreen"`, `"popover"`, `"command"`, `"toast"` |
| `css` | `Record<string, string>` | Yes | Overlay/backdrop CSS |
| `panelCss` | `Record<string, string>` | Yes | Modal panel CSS |
| `hasOverlay` | `boolean` | Yes | Whether there is a background overlay |
| `animationDirection` | enum | Yes | Entry animation direction: `"center"`, `"bottom"`, `"right"`, `"top"`, `"none"` |

**Modal Groups**: `"Dialogs"`, `"Sheets & Drawers"`, `"Overlays"`.

**ID Convention**: Prefixed with `modal-`: `modal-center`, `modal-bottom-sheet`, `modal-drawer-right`, `modal-popover`.

---

### 14. FooterStyleData

**Category**: `"footers"` | **Group**: `"structure"` | **File**: `src/data/footers.ts`

```typescript
interface FooterStyleData {
  variant: string;
  columns: number;
  css: Record<string, string>;
  hasCta: boolean;
  hasNewsletter: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "footer-multi-column",                       // prefixed with "footer-"
  category: "footers",
  name: "Multi-Column",
  description: "3-4 link columns + branding — standard corporate",
  data: {
    variant: "multi-column",
    columns: 4,                                    // number of link columns (0 = no columns)
    css: {
      backgroundColor: "__surface",
      borderTop: "1px solid __border",
      padding: "24px",
    },
    hasCta: false,                                 // has a call-to-action section
    hasNewsletter: false,                          // has newsletter signup section
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `columns` | `number` | Yes | Number of link columns (0 for no columns) |
| `css` | `Record<string, string>` | Yes | Footer container CSS |
| `hasCta` | `boolean` | Yes | Whether footer includes a CTA section |
| `hasNewsletter` | `boolean` | Yes | Whether footer has a newsletter signup |

**Footer Groups**: `"Simple"`, `"Rich"`.

**ID Convention**: Prefixed with `footer-`: `footer-simple`, `footer-minimal`, `footer-multi-column`, `footer-cta`, `footer-fat`.

---

## Content

### 15. BadgeStyleData

**Category**: `"badges"` | **Group**: `"content"` | **File**: `src/data/badges.ts`

```typescript
interface BadgeStyleData {
  variant: string;
  shape: "circle" | "pill" | "square";
  css: Record<string, string>;
  hasDismiss: boolean;
  hasIcon: boolean;
  hasDot: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "soft-badge",                                // no prefix
  category: "badges",
  name: "Soft",
  description: "Muted primary tint background with matching text",
  data: {
    variant: "soft",
    shape: "pill",                                 // badge shape
    css: {
      backgroundColor: "__primary-15",             // 15% opacity primary
      color: "__primary",
      borderRadius: "9999px",
      padding: "2px 10px",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "1.5",
      display: "inline-flex",
      alignItems: "center",
    },
    hasDismiss: false,                             // has close/X button
    hasIcon: false,                                // has leading icon
    hasDot: false,                                 // has status dot
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `shape` | enum | Yes | `"circle"`, `"pill"`, or `"square"` |
| `css` | `Record<string, string>` | Yes | Badge CSS (single flat object) |
| `hasDismiss` | `boolean` | Yes | Has a dismiss/close button |
| `hasIcon` | `boolean` | Yes | Has a leading icon slot |
| `hasDot` | `boolean` | Yes | Has a colored status dot |

**Badge Groups**: `"Solid"`, `"Outline"`, `"Soft"`, `"Special"`.

**ID Convention**: No prefix, descriptive with `-badge` suffix where helpful: `solid-badge`, `outline-badge`, `dot-indicator`, `counter-badge`, `gradient-badge`.

---

### 16. AvatarStyleData

**Category**: `"avatars"` | **Group**: `"content"` | **File**: `src/data/avatars.ts`

```typescript
interface AvatarStyleData {
  variant: string;
  shape: "circle" | "rounded" | "square";
  css: Record<string, string>;
  hasStatus: boolean;
  hasBadge: boolean;
  hasRing: boolean;
  supportsGroup: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "with-status-dot",                           // descriptive ID
  category: "avatars",
  name: "With Status Dot",
  description: "Circle avatar with a small colored status indicator",
  data: {
    variant: "status-dot",
    shape: "circle",                               // avatar shape
    css: {
      width: "40px",
      height: "40px",
      borderRadius: "9999px",
      overflow: "hidden",
      backgroundColor: "__primary-15",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    hasStatus: true,                               // shows online/offline dot
    hasBadge: false,                               // shows notification count badge
    hasRing: false,                                // has colored ring border
    supportsGroup: false,                          // can be used in overlapping stacks
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `shape` | enum | Yes | `"circle"`, `"rounded"`, or `"square"` |
| `css` | `Record<string, string>` | Yes | Avatar CSS |
| `hasStatus` | `boolean` | Yes | Shows online/offline status dot |
| `hasBadge` | `boolean` | Yes | Shows notification count badge |
| `hasRing` | `boolean` | Yes | Has a colored ring border |
| `supportsGroup` | `boolean` | Yes | Designed for overlapping group display |

**Avatar Groups**: `"Image"`, `"Initials"`, `"Status"`, `"Group"`.

**ID Convention**: No prefix. Descriptive: `circle-image`, `rounded-square`, `initials`, `with-status-dot`, `avatar-group`, `with-ring`.

---

### 17. ListStyleData

**Category**: `"lists"` | **Group**: `"content"` | **File**: `src/data/lists.ts`

```typescript
interface ListStyleData {
  variant: string;
  css: Record<string, string>;
  itemCss: Record<string, string>;
  activeItemCss?: Record<string, string>;
  hasLeadingElement: boolean;
  hasTrailingElement: boolean;
  isGrouped: boolean;
  isExpandable: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "with-leading-icon",
  category: "lists",
  name: "With Leading Icon",
  description: "List items with an icon on the left side",
  data: {
    variant: "leading-icon",
    css: {                                         // list container CSS
      display: "flex",
      flexDirection: "column",
    },
    itemCss: {                                     // individual list item CSS
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      borderBottom: "1px solid __border",
      color: "__text",
      fontSize: "14px",
    },
    // activeItemCss: { ... },                     // optional selected item overrides
    hasLeadingElement: true,                       // has left-side element (icon/avatar)
    hasTrailingElement: false,                     // has right-side element (action/toggle)
    isGrouped: false,                              // items organized under section headers
    isExpandable: false,                           // items can expand/collapse (accordion)
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `css` | `Record<string, string>` | Yes | List container CSS |
| `itemCss` | `Record<string, string>` | Yes | Individual item CSS |
| `activeItemCss` | `Record<string, string>` | No | Selected/active item CSS overrides |
| `hasLeadingElement` | `boolean` | Yes | Has icon/avatar on the left |
| `hasTrailingElement` | `boolean` | Yes | Has action/toggle on the right |
| `isGrouped` | `boolean` | Yes | Items are under section headers |
| `isExpandable` | `boolean` | Yes | Items can expand/collapse |

**List Groups**: `"Simple"`, `"With Leading"`, `"With Trailing"`, `"Grouped"`, `"Interactive"`.

**ID Convention**: Descriptive: `simple-text-row`, `with-leading-icon`, `with-trailing-action`, `expandable-accordion`.

---

### 18. TableStyleData

**Category**: `"tables"` | **Group**: `"content"` | **File**: `src/data/tables.ts`

```typescript
interface TableStyleData {
  variant: string;
  containerCss: Record<string, string>;
  headerCss: Record<string, string>;
  rowCss: Record<string, string>;
  altRowCss?: Record<string, string>;
  hoverRowCss?: Record<string, string>;
  hasStickyHeader: boolean;
  hasRowSelection: boolean;
  density: "compact" | "default" | "relaxed";
}
```

**Annotated Example**:
```typescript
{
  id: "striped-rows",
  category: "tables",
  name: "Striped Rows",
  description: "Alternating row backgrounds for easy scanning",
  data: {
    variant: "striped",
    containerCss: {                                // table element CSS
      width: "100%",
      borderCollapse: "collapse",
    },
    headerCss: {                                   // header cell CSS
      padding: "8px 12px",
      borderBottom: "2px solid __border",
      backgroundColor: "__surface",
      color: "__textMuted",
      fontSize: "12px",
      fontWeight: "600",
      textAlign: "left",
    },
    rowCss: {                                      // body row cell CSS
      padding: "10px 12px",
      color: "__text",
      fontSize: "14px",
    },
    altRowCss: {                                   // alternating row overrides
      backgroundColor: "__surfaceAlt",
    },
    // hoverRowCss: { ... },                       // optional hover row overrides
    hasStickyHeader: false,                        // header sticks on scroll
    hasRowSelection: false,                        // rows have checkboxes
    density: "default",                            // row height density
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `containerCss` | `Record<string, string>` | Yes | Table container CSS |
| `headerCss` | `Record<string, string>` | Yes | Header cell CSS |
| `rowCss` | `Record<string, string>` | Yes | Body row CSS |
| `altRowCss` | `Record<string, string>` | No | Alternating row CSS |
| `hoverRowCss` | `Record<string, string>` | No | Hover row CSS |
| `hasStickyHeader` | `boolean` | Yes | Whether header sticks on scroll |
| `hasRowSelection` | `boolean` | Yes | Whether rows have checkboxes |
| `density` | enum | Yes | `"compact"`, `"default"`, or `"relaxed"` |

**Table Groups**: `"Standard"`, `"Styled"`, `"Interactive"`.

**ID Convention**: Descriptive: `simple-clean`, `striped-rows`, `bordered`, `hoverable-rows`, `card-rows`, `with-selection`.

---

### 19. PricingStyleData

**Category**: `"pricing"` | **Group**: `"content"` | **File**: `src/data/pricing.ts`

```typescript
interface PricingStyleData {
  variant: string;
  layout: "vertical" | "horizontal";
  css: Record<string, string>;
  headerCss?: Record<string, string>;
  priceCss?: Record<string, string>;
  isFeatured: boolean;
  hasToggle: boolean;
  hasTrialBadge: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "featured-highlighted",
  category: "pricing",
  name: "Featured Highlighted",
  description: "Elevated featured plan with primary accent border and badge",
  data: {
    variant: "featured",
    layout: "vertical",                            // card layout direction
    css: {                                         // pricing card container CSS
      backgroundColor: "__surface",
      border: "2px solid __primary",
      borderRadius: "12px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      boxShadow: "0 4px 24px __primary-20",
      position: "relative",
    },
    headerCss: {                                   // plan name CSS
      color: "__text",
      fontSize: "18px",
      fontWeight: "600",
    },
    priceCss: {                                    // price display CSS
      fontSize: "36px",
      fontWeight: "700",
      color: "__primary",
      lineHeight: "1.1",
    },
    isFeatured: true,                              // highlighted/recommended plan
    hasToggle: false,                              // monthly/annual toggle
    hasTrialBadge: false,                          // free trial badge
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `layout` | enum | Yes | `"vertical"` or `"horizontal"` |
| `css` | `Record<string, string>` | Yes | Card container CSS |
| `headerCss` | `Record<string, string>` | No | Plan name/header CSS |
| `priceCss` | `Record<string, string>` | No | Price display CSS |
| `isFeatured` | `boolean` | Yes | Whether this is a featured/recommended plan style |
| `hasToggle` | `boolean` | Yes | Has billing period toggle |
| `hasTrialBadge` | `boolean` | Yes | Has free trial badge |

**Pricing Groups**: `"Simple"`, `"Featured"`, `"Special"`.

---

### 20. TestimonialStyleData

**Category**: `"testimonials"` | **Group**: `"content"` | **File**: `src/data/testimonials.ts`

```typescript
interface TestimonialStyleData {
  variant: string;
  layout: "card" | "inline" | "pull-quote" | "social";
  css: Record<string, string>;
  quoteCss?: Record<string, string>;
  hasAvatar: boolean;
  hasRating: boolean;
  hasMedia: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "card-testimonial",
  category: "testimonials",
  name: "Card Testimonial",
  description: "Quote wrapped in a card container with surface background",
  data: {
    variant: "card",
    layout: "card",                                // testimonial layout style
    css: {                                         // container CSS
      backgroundColor: "__surface",
      border: "1px solid __border",
      borderRadius: "12px",
      padding: "20px",
    },
    quoteCss: {                                    // quote text CSS
      fontSize: "14px",
      lineHeight: "1.6",
      color: "__text",
      marginBottom: "12px",
    },
    hasAvatar: true,                               // shows author avatar
    hasRating: false,                              // shows star rating
    hasMedia: false,                               // has video/media area
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `layout` | enum | Yes | `"card"`, `"inline"`, `"pull-quote"`, or `"social"` |
| `css` | `Record<string, string>` | Yes | Container CSS |
| `quoteCss` | `Record<string, string>` | No | Quote text CSS |
| `hasAvatar` | `boolean` | Yes | Shows author avatar |
| `hasRating` | `boolean` | Yes | Shows star rating |
| `hasMedia` | `boolean` | Yes | Has video/media content |

**Testimonial Groups**: `"Quote"`, `"Card"`, `"Social"`.

---

### 21. StatStyleData

**Category**: `"stats"` | **Group**: `"content"` | **File**: `src/data/stats.ts`

```typescript
interface StatStyleData {
  variant: string;
  layout: "stacked" | "inline" | "card";
  css: Record<string, string>;
  valueCss?: Record<string, string>;
  hasIcon: boolean;
  hasTrend: boolean;
  hasChart: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "card-stat",
  category: "stats",
  name: "Card Stat",
  description: "Stat enclosed in a card container with surface background",
  data: {
    variant: "card",
    layout: "card",                                // stat display layout
    css: {
      backgroundColor: "__surface",
      border: "1px solid __border",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    valueCss: {                                    // numeric value CSS
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1.1",
      color: "__text",
    },
    hasIcon: false,                                // has icon decoration
    hasTrend: true,                                // shows up/down trend indicator
    hasChart: false,                               // has chart visualization
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `layout` | enum | Yes | `"stacked"`, `"inline"`, or `"card"` |
| `css` | `Record<string, string>` | Yes | Container CSS |
| `valueCss` | `Record<string, string>` | No | Numeric value CSS |
| `hasIcon` | `boolean` | Yes | Has decorative icon |
| `hasTrend` | `boolean` | Yes | Shows trend arrow/percentage |
| `hasChart` | `boolean` | Yes | Has chart visualization (ring, sparkline, etc.) |

**Stat Groups**: `"Simple"`, `"Card"`, `"Visual"`.

---

### 22. DividerStyleData

**Category**: `"dividers"` | **Group**: `"content"` | **File**: `src/data/dividers.ts`

```typescript
interface DividerStyleData {
  variant: string;
  css: Record<string, string>;
  style: "solid" | "dashed" | "dotted" | "gradient" | "decorative";
  hasLabel: boolean;
  hasIcon: boolean;
  thickness: string;
}
```

**Annotated Example**:
```typescript
{
  id: "gradient-fade",
  category: "dividers",
  name: "Gradient Fade",
  description: "Line that fades from primary to transparent at both ends",
  data: {
    variant: "gradient",
    css: {
      height: "1px",
      width: "100%",
      background: "linear-gradient(to right, transparent, __primary-40, transparent)",
    },
    style: "gradient",                             // visual line style
    hasLabel: false,                               // has centered text label
    hasIcon: false,                                // has centered icon
    thickness: "1px",                              // line thickness
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `css` | `Record<string, string>` | Yes | Divider CSS |
| `style` | enum | Yes | `"solid"`, `"dashed"`, `"dotted"`, `"gradient"`, or `"decorative"` |
| `hasLabel` | `boolean` | Yes | Has centered text label (e.g., "or") |
| `hasIcon` | `boolean` | Yes | Has centered icon |
| `thickness` | `string` | Yes | CSS thickness value |

**Divider Groups**: `"Line"`, `"Decorative"`.

---

### 23. ImageStyleData

**Category**: `"images"` | **Group**: `"content"` | **File**: `src/data/images.ts`

```typescript
interface ImageStyleData {
  variant: string;
  css: Record<string, string>;
  overlayCss?: Record<string, string>;
  shape: "rounded" | "circle" | "square";
  hasOverlay: boolean;
  hasCaption: boolean;
  aspectRatio?: string;
}
```

**Annotated Example**:
```typescript
{
  id: "color-overlay",
  category: "images",
  name: "Color Overlay",
  description: "Image with a semi-transparent primary color overlay",
  data: {
    variant: "color-overlay",
    css: {                                         // image container CSS
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    },
    overlayCss: {                                  // overlay element CSS
      position: "absolute",
      inset: "0",
      backgroundColor: "__primary-40",
      mixBlendMode: "multiply",
    },
    shape: "rounded",                              // image shape
    hasOverlay: true,                              // has overlay layer
    hasCaption: false,                             // has caption text
    aspectRatio: "16/9",                           // CSS aspect-ratio value
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `css` | `Record<string, string>` | Yes | Image container CSS |
| `overlayCss` | `Record<string, string>` | No | Overlay layer CSS |
| `shape` | enum | Yes | `"rounded"`, `"circle"`, or `"square"` |
| `hasOverlay` | `boolean` | Yes | Has overlay element |
| `hasCaption` | `boolean` | Yes | Has caption text below/on image |
| `aspectRatio` | `string` | No | CSS aspect-ratio value (e.g., `"16/9"`, `"1/1"`, `"3/2"`) |

**Image Groups**: `"Shape"`, `"Overlay"`, `"Frame"`.

---

## Patterns

### 24. EmptyStateStyleData

**Category**: `"empty-states"` | **Group**: `"patterns"` | **File**: `src/data/empty-states.ts`

```typescript
interface EmptyStateStyleData {
  variant: string;
  layout: "centered" | "top-heavy" | "split";
  containerCss: Record<string, string>;
  illustrationCss: Record<string, string>;
  hasIllustration: boolean;
  hasIcon: boolean;
  hasCta: boolean;
  hasSecondaryAction: boolean;
  tone: "neutral" | "friendly" | "error" | "info";
}
```

**Annotated Example**:
```typescript
{
  id: "illustration-centered",
  category: "empty-states",
  name: "Illustration Centered",
  description: "Large illustration with heading, body text, and a primary CTA button",
  data: {
    variant: "illustration-centered",
    layout: "centered",                            // content layout style
    containerCss: {                                // outer container CSS
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "24px",
    },
    illustrationCss: {                             // illustration/icon area CSS
      width: "80px",
      height: "80px",
      borderRadius: "9999px",
      marginBottom: "16px",
    },
    hasIllustration: true,                         // shows illustration image
    hasIcon: false,                                // shows icon (alternative to illustration)
    hasCta: true,                                  // has primary action button
    hasSecondaryAction: false,                     // has secondary action link
    tone: "neutral",                               // emotional tone of the message
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `layout` | enum | Yes | `"centered"`, `"top-heavy"`, or `"split"` |
| `containerCss` | `Record<string, string>` | Yes | Container CSS |
| `illustrationCss` | `Record<string, string>` | Yes | Illustration area CSS (can be `{}`) |
| `hasIllustration` | `boolean` | Yes | Shows illustration image |
| `hasIcon` | `boolean` | Yes | Shows icon (mutually exclusive with illustration) |
| `hasCta` | `boolean` | Yes | Has primary CTA button |
| `hasSecondaryAction` | `boolean` | Yes | Has secondary action |
| `tone` | enum | Yes | `"neutral"`, `"friendly"`, `"error"`, or `"info"` |

**Empty State Groups**: `"Illustration"`, `"Minimal"`, `"Action"`.

---

### 25. LoadingStyleData

**Category**: `"loading"` | **Group**: `"patterns"` | **File**: `src/data/loading.ts`

```typescript
interface LoadingStyleData {
  variant: string;
  type: "skeleton" | "spinner" | "progress" | "placeholder" | "inline";
  containerCss: Record<string, string>;
  elementCss: Record<string, string>;
  animationStyle: "shimmer" | "pulse" | "spin" | "fill" | "stagger" | "blur";
  lineCount: number;
  isFullPage: boolean;
}
```

**Annotated Example**:
```typescript
{
  id: "skeleton-shimmer",
  category: "loading",
  name: "Skeleton Shimmer",
  description: "Skeleton placeholder lines with a sliding shimmer gradient",
  data: {
    variant: "skeleton-shimmer",
    type: "skeleton",                              // loading indicator type
    containerCss: {                                // container CSS
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "16px",
    },
    elementCss: {                                  // individual element/line CSS
      height: "12px",
      borderRadius: "4px",
    },
    animationStyle: "shimmer",                     // animation style
    lineCount: 4,                                  // number of skeleton lines (0 for non-skeleton)
    isFullPage: false,                             // takes up full viewport
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `type` | enum | Yes | `"skeleton"`, `"spinner"`, `"progress"`, `"placeholder"`, or `"inline"` |
| `containerCss` | `Record<string, string>` | Yes | Container CSS |
| `elementCss` | `Record<string, string>` | Yes | Loading element CSS (line, spinner, bar) |
| `animationStyle` | enum | Yes | `"shimmer"`, `"pulse"`, `"spin"`, `"fill"`, `"stagger"`, or `"blur"` |
| `lineCount` | `number` | Yes | Number of skeleton lines (0 for non-skeleton types) |
| `isFullPage` | `boolean` | Yes | Whether it covers the full viewport |

**Loading Groups**: `"Skeleton"`, `"Full Page"`, `"Inline"`.

---

### 26. OnboardingStyleData

**Category**: `"onboarding"` | **Group**: `"patterns"` | **File**: `src/data/onboarding.ts`

```typescript
interface OnboardingStyleData {
  variant: string;
  layout: "carousel" | "single-page" | "stepped" | "checklist" | "tooltip" | "video" | "cards";
  containerCss: Record<string, string>;
  stepIndicatorCss: Record<string, string>;
  hasStepIndicator: boolean;
  hasSkipButton: boolean;
  hasIllustration: boolean;
  stepCount: number;
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `layout` | enum | Yes | Onboarding layout type |
| `containerCss` | `Record<string, string>` | Yes | Container CSS |
| `stepIndicatorCss` | `Record<string, string>` | Yes | Step indicator/dots CSS |
| `hasStepIndicator` | `boolean` | Yes | Shows step dots/progress |
| `hasSkipButton` | `boolean` | Yes | Has skip/dismiss button |
| `hasIllustration` | `boolean` | Yes | Has illustration per step |
| `stepCount` | `number` | Yes | Number of onboarding steps |

---

### 27. ErrorStyleData

**Category**: `"errors"` | **Group**: `"patterns"` | **File**: `src/data/errors.ts`

```typescript
interface ErrorStyleData {
  variant: string;
  errorType: "404" | "connection" | "generic" | "validation" | "timeout" | "maintenance" | "permission";
  containerCss: Record<string, string>;
  iconCss: Record<string, string>;
  hasIcon: boolean;
  hasErrorCode: boolean;
  hasCta: boolean;
  hasSecondaryAction: boolean;
  tone: "serious" | "friendly" | "minimal";
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `errorType` | enum | Yes | Error classification |
| `containerCss` | `Record<string, string>` | Yes | Container CSS |
| `iconCss` | `Record<string, string>` | Yes | Error icon/illustration CSS |
| `hasIcon` | `boolean` | Yes | Shows error icon |
| `hasErrorCode` | `boolean` | Yes | Shows error code (e.g., "404") |
| `hasCta` | `boolean` | Yes | Has primary action (e.g., "Go Home") |
| `hasSecondaryAction` | `boolean` | Yes | Has secondary action |
| `tone` | enum | Yes | `"serious"`, `"friendly"`, or `"minimal"` |

---

### 28. SuccessStyleData

**Category**: `"success"` | **Group**: `"patterns"` | **File**: `src/data/success.ts`

```typescript
interface SuccessStyleData {
  variant: string;
  type: "checkmark" | "confetti" | "text" | "countdown" | "card-flip";
  containerCss: Record<string, string>;
  iconCss: Record<string, string>;
  hasAnimation: boolean;
  hasRedirect: boolean;
  hasCta: boolean;
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `type` | enum | Yes | Success visualization type |
| `containerCss` | `Record<string, string>` | Yes | Container CSS |
| `iconCss` | `Record<string, string>` | Yes | Success icon CSS |
| `hasAnimation` | `boolean` | Yes | Has success animation |
| `hasRedirect` | `boolean` | Yes | Auto-redirects after success |
| `hasCta` | `boolean` | Yes | Has action button |

---

### 29. NotificationStyleData

**Category**: `"notifications"` | **Group**: `"patterns"` | **File**: `src/data/notifications.ts`

```typescript
interface NotificationStyleData {
  variant: string;
  subtype: "toast" | "banner" | "inline-alert" | "snackbar" | "floating"
    | "permission-sheet" | "permission-modal" | "permission-banner"
    | "permission-fullscreen" | "permission-primer";
  position: "top" | "bottom" | "center" | "inline" | "corner";
  containerCss: Record<string, string>;
  contentCss: Record<string, string>;
  hasIcon: boolean;
  hasAction: boolean;
  hasCloseButton: boolean;
  isAutoDismiss: boolean;
  semanticColor: "success" | "warning" | "error" | "info" | "neutral";
}
```

**Annotated Example**:
```typescript
{
  id: "toast-top",
  category: "notifications",
  name: "Toast Top",
  description: "Brief notification that slides in from the top and auto-dismisses",
  data: {
    variant: "toast-top",
    subtype: "toast",                              // notification type
    position: "top",                               // screen position
    containerCss: {                                // outer container CSS
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      borderRadius: "8px",
      maxWidth: "320px",
    },
    contentCss: {                                  // inner content CSS
      flex: "1",
    },
    hasIcon: true,                                 // has semantic icon
    hasAction: false,                              // has action button (undo, etc.)
    hasCloseButton: true,                          // has dismiss X button
    isAutoDismiss: true,                           // auto-dismisses after timeout
    semanticColor: "success",                      // color theme for this notification
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `subtype` | enum | Yes | Notification type (see type definition for all options) |
| `position` | enum | Yes | `"top"`, `"bottom"`, `"center"`, `"inline"`, or `"corner"` |
| `containerCss` | `Record<string, string>` | Yes | Container CSS |
| `contentCss` | `Record<string, string>` | Yes | Content area CSS |
| `hasIcon` | `boolean` | Yes | Has leading semantic icon |
| `hasAction` | `boolean` | Yes | Has action button |
| `hasCloseButton` | `boolean` | Yes | Has close/dismiss button |
| `isAutoDismiss` | `boolean` | Yes | Auto-dismisses after a timer |
| `semanticColor` | enum | Yes | `"success"`, `"warning"`, `"error"`, `"info"`, or `"neutral"` |

**Notification Groups**: `"Toasts"`, `"Banners & Alerts"`, `"Permissions"`.

**Special Notes**: Permission subtypes (`permission-sheet`, `permission-modal`, etc.) are for native permission request UIs (notifications, location, camera, etc.).

---

## Motion

### 30. AnimationData

**Categories**: `"button-animations"`, `"hover-animations"`, `"page-transitions"`, `"micro-interactions"`, `"entrance-animations"` | **Group**: `"motion"`

All five motion categories share the same `AnimationData` type:

```typescript
interface AnimationData {
  variant: string;
  subtype: string;
  duration: string;
  easing: string;
  trigger: "hover" | "click" | "mount" | "scroll" | "focus";
  cssKeyframes?: string;
  cssProperties?: Record<string, string>;
}
```

**Annotated Example (Button Animation)**:
```typescript
{
  id: "bounce-press",                              // unique within category
  category: "button-animations",                   // one of the 5 motion categories
  name: "Bounce Press",
  description: "Button bounces down on press with elastic overshoot",
  data: {
    variant: "bounce-press",                       // variant name
    subtype: "bounce",                             // animation classification
    duration: "400ms",                             // CSS duration value
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",  // CSS easing function
    trigger: "click",                              // what triggers the animation
    cssKeyframes: `@keyframes dk-btn-bounce {      // full @keyframes block
  0% { transform: scale(1); }
  30% { transform: scale(0.92); }
  50% { transform: scale(1.02); }
  70% { transform: scale(0.98); }
  100% { transform: scale(1); }
}`,
    cssProperties: { transform: "scale(0.92)" },   // key CSS properties for the animation
  },
}
```

**Annotated Example (Entrance Animation)**:
```typescript
{
  id: "ea-slide-up-fade",                          // prefixed with "ea-"
  category: "entrance-animations",
  name: "Slide Up Fade",
  description: "Element slides up from below while fading in",
  data: {
    variant: "slide-up-fade",
    subtype: "slide",                              // animation type classification
    duration: "500ms",
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    trigger: "mount",                              // triggered on component mount
    cssKeyframes: `@keyframes dk-ea-slide-up-fade {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}`,
  },
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `variant` | `string` | Yes | Variant name |
| `subtype` | `string` | Yes | Animation type (e.g., `"scale"`, `"bounce"`, `"ripple"`, `"fade"`, `"slide"`, `"scroll"`, `"stagger"`) |
| `duration` | `string` | Yes | CSS duration (e.g., `"200ms"`, `"1500ms"`, `"continuous"`) |
| `easing` | `string` | Yes | CSS easing function (e.g., `"ease-out"`, `"cubic-bezier(..."`, `"linear"`, `"steps(20, end)"`) |
| `trigger` | enum | Yes | `"hover"`, `"click"`, `"mount"`, `"scroll"`, or `"focus"` |
| `cssKeyframes` | `string` | No | Complete `@keyframes` block(s). Name convention: `dk-{category-prefix}-{name}` |
| `cssProperties` | `Record<string, string>` | No | Key CSS properties affected by the animation |

**Motion Category ID Conventions**:
- `button-animations`: No prefix. `scale-down`, `bounce-press`, `ripple`, `none`
- `hover-animations`: No prefix. (follow same pattern as button-animations)
- `page-transitions`: No prefix.
- `micro-interactions`: No prefix.
- `entrance-animations`: Prefixed with `ea-`: `ea-fade-in`, `ea-slide-up-fade`, `ea-parallax`, `ea-reveal-on-scroll`

**Keyframe Naming Convention**: `dk-{short-category}-{variant-name}`:
- Button: `dk-btn-scale-down`, `dk-btn-bounce`, `dk-btn-ripple`
- Entrance: `dk-ea-fade-in`, `dk-ea-slide-up-fade`, `dk-ea-stagger-child`

**Animation Groups by Category**:
- Button Animations: `"Scale & Bounce"`, `"Effects"`
- Entrance Animations: `"Fade & Slide"`, `"Stagger & Reveal"`, `"Scroll-Triggered"`

**Special Notes**:
- `cssKeyframes` contains the full `@keyframes` block as a string (can contain multiple blocks, e.g., typewriter has both `dk-ea-typewriter` and `dk-ea-blink`).
- `cssProperties` captures the peak/target transform for quick programmatic access.
- `duration: "continuous"` means the animation runs as long as the trigger condition holds (e.g., parallax on scroll).
- The `"none"` variant (id: `"none"`) represents no animation with `duration: "0ms"`.

---

## Quick Reference: Adding a New Item

1. **Choose the correct data file** in `src/data/`.
2. **Create the `CatalogItem<T>` object** following the exact type definition above.
3. **Set `id`** as unique kebab-case within the category; follow the category's prefix convention.
4. **Set `category`** to the exact `Category` string for that file.
5. **Use `__` color tokens** in CSS values -- never hardcode colors that should come from the palette.
6. **Add structural CSS only** -- colors are resolved dynamically at render time.
7. **Always include `transition`** in default/resting CSS for smooth state changes.
8. **Add a metadata entry** to the file's `*_META` array with the `id` and `group`.
9. **Export** is automatic -- items in the exported array are auto-registered via `catalog-registry.ts`.
