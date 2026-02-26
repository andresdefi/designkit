# DesignKit — Project Plan

> A local design identity builder. Browse a massive visual catalog, pick what you like,
> preview it all together, and export a config that drives consistent AI-generated screens.

---

## Phase 1: Foundation ✅

Project scaffolding, architecture, and the systems that everything else plugs into.

- [x] Initialize Next.js project with TypeScript, Tailwind CSS, App Router
- [x] Set up project structure (pages, components, lib, data, public)
- [x] Design the data schema for catalog items (id, category, subcategory, name, variant, light/dark, metadata)
- [x] Build the design token data format (JSON schema for colors, spacing, typography, radius, shadows, elevation)
- [x] Create the selection store (Zustand — tracks what the user has picked per category)
- [x] Build the config export engine (reads selection store → outputs JSON, Tailwind config, Swift extensions, Kotlin theme, CSS variables, CLAUDE.md)
- [x] Set up the catalog data layer (static TypeScript files in /data)
- [x] Create the base layout shell (sidebar nav, main content area, selection panel)

**Checkpoint:** ✅ App runs locally. Navigate between category pages. Selection store works (pick/unpick). Export produces valid config files in 6 formats.

---

## Phase 2: Core UI Shell ✅

The browsing experience — the app chrome that makes the catalog usable.

- [x] Build the category sidebar navigation (all categories listed, active state, collapsible groups)
- [x] Build the catalog grid component (responsive grid of item cards, handles any category)
- [x] Build the item card component (renders a preview, name, select/deselect toggle)
- [x] Build the isolated vs in-context view toggle
- [x] Build the light/dark mode toggle (switches preview background for all items)
- [x] Build the selection sidebar panel (shows all current picks across categories, remove button)
- [x] Build the combined preview panel (live sample screen using current color selections)
- [x] Build the export modal (choose format, preview output, copy to clipboard, download)
- [x] Build app-level light/dark mode (CSS variable-based theming with toggle)
- [x] Basic responsive layout

**Checkpoint:** ✅ Full browsing UI works end-to-end. Navigate categories, toggle views, select items, see them in the sidebar, view combined preview, and export a config.

---

## Phase 3: Color Palettes ✅

The foundation that everything else builds on. Colors define mood more than any other element.

- [x] Define palette data structure (primary, secondary, accent, background, surface, text, border, semantic — each with light + dark variants)
- [x] Build color palette card component (renders swatches with hex values, shows light and dark)
- [x] Individual color picking (click a swatch to pick just that color, click card name to select all)
- [x] "Your Palette" summary bar showing assembled picks
- [x] Create 42 palettes across 7 groups:
  - [x] Neutral/Minimal (4): Stone, Slate, Zinc, Silver
  - [x] Warm (6): Ember, Honey, Terracotta, Rose, Blush, Copper
  - [x] Cool (6): Ocean, Forest, Sage, Teal, Arctic, Cyan
  - [x] Vibrant (6): Electric, Violet, Fuchsia, Scarlet, Lime
  - [x] Dark/Moody (4): Midnight, Obsidian, Charcoal, Void
  - [x] Pastel (5): Lavender, Peach, Mint, Sky, Cotton Candy
  - [x] Earth Tones (3): Sand, Olive, Clay
  - [x] Brand-inspired (5): GitHub, Stripe, Linear, Vercel, Notion
  - [x] Creative (7): Aurora, Sunset, Neon, Wine, Royal, Spring, Coral, Monochrome

**Checkpoint:** ✅ 42 color palettes browsable. Each shows light + dark variants. Individual color picking works. Selecting colors updates the combined preview. Export includes selected color tokens.

---

## Phase 4: Typography ✅

Font pairings and type scales that set the voice of the app.

- [x] Define typography data structure (headingFont, bodyFont, monoFont, typeScale with sizes/weights/lineHeights for: h1-h6, body, bodySmall, caption, overline, button)
- [x] Build typography preview card (shows heading + body text in context, paragraph sample, hierarchy demo)
- [x] Load Google Fonts dynamically based on pairings
- [x] Create pairings — Modern/Clean:
  - [x] Inter + Inter (all-purpose workhorse)
  - [x] Geist + Geist (Vercel-style modern)
  - [x] SF Pro + SF Pro (iOS native feel)
  - [x] Roboto + Roboto (Android native feel)
  - [x] DM Sans + DM Sans (geometric friendly)
- [x] Create pairings — Editorial/Expressive:
  - [x] Playfair Display + Source Sans 3 (classic editorial)
  - [x] Fraunces + Inter (warm editorial)
  - [x] Lora + Merriweather Sans (literary)
  - [x] Cormorant Garamond + Montserrat (elegant contrast)
  - [x] Libre Baskerville + Source Sans 3 (traditional authority)
- [x] Create pairings — Technical/Precise:
  - [x] JetBrains Mono + Inter (developer-focused)
  - [x] IBM Plex Sans + IBM Plex Mono (systematic)
  - [x] Space Grotesk + Space Mono (geometric technical)
  - [x] Outfit + Fira Code (modern tech)
- [x] Create pairings — Bold/Statement:
  - [x] Clash Display + Satoshi (strong geometric)
  - [x] Cabinet Grotesk + General Sans (heavy modern)
  - [x] Plus Jakarta Sans + Plus Jakarta Sans (dense, strong)
  - [x] Sora + Sora (futuristic bold)
  - [x] Manrope + Manrope (wide bold)
- [x] Create pairings — Friendly/Rounded:
  - [x] Nunito + Nunito (soft rounded)
  - [x] Quicksand + Open Sans (playful + readable)
  - [x] Comfortaa + Karla (bubbly + grounded)
  - [x] Baloo 2 + Work Sans (fun + professional)
  - [x] Poppins + Poppins (geometric friendly)
- [x] Create pairings — Minimal/Neutral:
  - [x] Helvetica Neue + system stack (Swiss minimalism)
  - [x] Archivo + Archivo (tight neutral)
  - [x] Albert Sans + Albert Sans (clean modern)
  - [x] Switzer + Switzer (neo-grotesque)
- [x] Create type scales (each pairing gets scale options):
  - [x] Compact (1.125 major second — dense UI)
  - [x] Default (1.200 minor third — balanced)
  - [x] Comfortable (1.250 major third — spacious)
  - [x] Expressive (1.333 perfect fourth — editorial)
  - [x] Dramatic (1.500 perfect fifth — hero-heavy)

**Checkpoint:** ✅ 50 typography pairings browsable across 6 groups, each with 5 scale options. Type scale specimen viewer with collapsible panel. Selecting one updates the combined preview. Export includes font references + full type scale tokens.

---

## Phase 5: Spacing, Radius & Shadows ✅

The invisible structure that makes designs feel different.

- [x] Define spacing data structure (base unit, scale: 4px-based or 8px-based, named values: xs through 3xl)
- [x] Build spacing preview (visual blocks showing the scale, plus a sample layout using it)
- [x] Create 24 spacing systems:
  - [x] Tight (base 2px — dense, data-heavy UIs)
  - [x] Compact (base 4px — efficient, professional)
  - [x] Default (base 4px, scale ×2 — balanced)
  - [x] Comfortable (base 8px — breathing room)
  - [x] Spacious (base 8px, scale ×2 — editorial, luxury)
  - [x] Airy (base 12px — ultra-open, landing pages)
  - [x] Fibonacci (1,2,3,5,8,13,21,34 — organic harmony)
  - [x] Golden Ratio (×1.618 steps — mathematically harmonious)
  - [x] Linear (equal 8px increments — predictable)
  - [x] Tailwind Default (industry-standard 4px scale)
  - [x] Material (8px grid + 4px half-grid)
  - [x] Fluid (clamp()-based responsive values)
  - [x] Bootstrap (based on Bootstrap's spacing utilities)
  - [x] Ant Design (follows Ant's 4px base with modular scale)
  - [x] Carbon (IBM Carbon's 2/4/8px mini-grid)
  - [x] Chakra (Chakra UI's 4px scale with named tokens)
  - [x] iOS (Apple HIG point-based spacing)
  - [x] Dense (2px base, aggressive compression)
  - [x] Geometric (power-of-2 progression: 1,2,4,8,16,32)
  - [x] Asymmetric (different horizontal vs vertical rhythm)
  - [x] Modular (6px base — divides evenly by 2 and 3)
  - [x] Proportional (percentage-based for responsive)
  - [x] Micro (1px base — pixel-precise control)
  - [x] Cinematic (16px base — widescreen editorial)
- [x] Define radius data structure (none, sm, md, lg, xl, 2xl, full/pill, named component radii)
- [x] Build radius preview (same button/card shown at each radius philosophy)
- [x] Create 24 radius systems:
  - [x] Sharp (0px everywhere — brutalist, technical)
  - [x] Subtle (2-4px — professional, minimal)
  - [x] Moderate (6-8px — balanced, modern)
  - [x] Rounded (12-16px — friendly, approachable)
  - [x] Pill (full radius on buttons/badges, large on cards — playful, soft)
  - [x] Mixed (sharp containers + pill buttons — contrasting)
  - [x] Squircle (iOS-like continuous corners)
  - [x] Chunky (20-28px — bold, trendy)
  - [x] iOS Default (Apple HIG continuous corners)
  - [x] Material Default (MD3 shape system)
  - [x] Asymmetric (top rounded, bottom sharp)
  - [x] Notched (corner cut effect)
  - [x] Soft Square (4-6px — barely there)
  - [x] Blob (organic irregular — variable values)
  - [x] Chamfer (angled corners — industrial)
  - [x] Tailwind Default (Tailwind's standard radius scale)
  - [x] Bootstrap Default (Bootstrap 5 radius values)
  - [x] Fluent (Microsoft Fluent 2 corner styles)
  - [x] Ant Design (Ant's radius system)
  - [x] Carbon (IBM Carbon rounded corners)
  - [x] Retro (harsh 2px + full pill — brutalist)
  - [x] Inverted (bottom rounded, top sharp)
  - [x] Diagonal (top-left and bottom-right only)
  - [x] Scalloped (alternating round and sharp)
- [x] Define shadow/elevation data structure (levels 0-5, named: none/sm/md/lg/xl, color tint option)
- [x] Build shadow preview (cards at each elevation level)
- [x] Create 36 shadow systems:
  - [x] None/Flat (no shadows at all)
  - [x] Subtle (barely visible elevation)
  - [x] Material (multi-layer Material Design elevation)
  - [x] Soft (large blur, low opacity — modern SaaS)
  - [x] Crisp (tight blur, higher opacity — precise edges)
  - [x] Layered (triple-stacked — premium depth)
  - [x] Colored (tinted by primary color — vibrant)
  - [x] Neumorphic (dual highlight + shadow — soft-extruded)
  - [x] Glow (outward color glow — neon/futuristic)
  - [x] Hard Offset (no blur, solid offset — retro/brutalist)
  - [x] Dreamy (extra-large blur — ethereal/atmospheric)
  - [x] Ambient (all-around diffuse — floating)
  - [x] Long Shadow (extended directional — cinematic)
  - [x] Inset (all elevations use inset — recessed)
  - [x] Ring (outline-style box-shadow — focus-ring aesthetic)
  - [x] Paper Curl (bottom-heavy asymmetric)
  - [x] Top-lit (top highlight + bottom shadow)
  - [x] Dark Mode Optimized (higher opacity for dark surfaces)
  - [x] Tailwind Default (matches Tailwind's shadow utilities)
  - [x] iOS (Apple platform-style subtle shadows)
  - [x] Material Elevated (MD3 tonal elevation)
  - [x] Carbon (IBM Carbon elevation tokens)
  - [x] Ant Design (Ant's shadow levels)
  - [x] Chakra (Chakra UI shadow tokens)
  - [x] Bootstrap (Bootstrap 5 shadow utilities)
  - [x] Warm (warm-tinted shadows — cozy/organic)
  - [x] Cool (blue-tinted shadows — professional/tech)
  - [x] Dramatic (extreme contrast — hero sections)
  - [x] Frosted (glass-like glow + blur simulation)
  - [x] Neon (vivid colored multi-glow — cyberpunk)
  - [x] Retro (hard offset + colored — vintage)
  - [x] Minimal Border (1px ring only — ultra-flat)
  - [x] Floating (large offset + soft — card-above-page)
  - [x] Recessed Panel (inner shadow + subtle outer)
  - [x] Spotlight (top-down directional — focused lighting)
  - [x] Letterpress (inset text-style shadows — embossed)
- [x] Wire spacing, radius, and shadow tokens into PreviewPanel (SampleApp applies selected tokens to all elements)
- [x] Update ExportModal buildConfig() to resolve spacing, radius, and shadow selections
- [x] Update export.ts: add shadows to Swift/Kotlin, add spacing + shadows to CLAUDE.md

> **Important for all future phases:** Each phase MUST wire its tokens into the PreviewPanel's SampleApp component so that selecting items produces visible changes in the live preview. This is a critical integration step — without it, selections appear to have no effect.

**Checkpoint:** ✅ 24 spacing + 24 radius + 36 shadow systems browsable. Combined preview responds to all three — spacing changes padding/gaps, radius changes corners, shadows change elevation. Export includes all three token types in all 6 formats.

---

## Phase 6: Buttons ✅

The most-interacted-with element. Where personality shows most.

- [x] Define button data structure (variant, sizes: sm/md/lg, states: default/hover/active/disabled/loading, shape, icon support)
- [x] Build button preview card (shows all sizes + states for each variant)
- [x] Create button styles — Solid/Filled:
  - [x] Flat solid (no shadow, clean)
  - [x] Elevated solid (subtle shadow)
  - [x] Gradient solid (gradient fill)
  - [x] Solid with hover lift (rises on hover)
  - [x] Solid with press shrink (scales down on press)
  - [x] Bold solid (heavy weight, uppercase)
  - [x] Shadow pop (strong shadow on hover)
  - [x] Rounded solid (extra border-radius)
- [x] Create button styles — Outline:
  - [x] Thin outline (1px border)
  - [x] Thick outline (2px border)
  - [x] Outline fill-on-hover (fills solid on hover)
  - [x] Dashed outline (dashed border)
  - [x] Double border (two borders with gap)
  - [x] Glow outline (glowing border on hover)
  - [x] Morph outline (morphs to solid on hover)
- [x] Create button styles — Ghost/Text:
  - [x] Ghost (transparent bg, hover shows bg)
  - [x] Text only (no bg ever, underline on hover)
  - [x] Text with arrow (→ animates on hover)
  - [x] Underline slide (underline animates in)
  - [x] Tinted ghost (subtle tinted bg on hover)
  - [x] Scale ghost (scales up on hover)
- [x] Create button styles — Soft/Muted:
  - [x] Tinted background (light tint of primary)
  - [x] Frosted glass (backdrop blur + transparency)
  - [x] Pastel solid (desaturated fill)
  - [x] Soft shadow (light bg + shadow)
  - [x] Muted soft (very subtle tint)
- [x] Create button styles — Special:
  - [x] Neumorphic raised (embossed appearance)
  - [x] Neumorphic pressed (inset appearance)
  - [x] 3D/layered (visible depth, bottom edge)
  - [x] Brutalist (heavy border, offset shadow)
  - [x] Retro/pixel (pixelated border look)
  - [x] Shimmer on hover (animated shine sweep)
  - [x] Magnetic (follows cursor slightly)
  - [x] Morphing (shape change on hover)
  - [x] Glow pulse (pulsing glow animation)
  - [x] Sliding background (color slides in from edge)
  - [x] Sliding fill (fills from left on hover)
  - [x] Icon reveal (icon appears on hover)
  - [x] Split button (action + dropdown arrow)
  - [x] FAB (floating action button, round)
  - [x] FAB extended (round + label)
  - [x] Pill with dot indicator
  - [x] Loading spinner integration
  - [x] Success/error state animation
  - [x] Sliding border (border animates in)
  - [x] Neon glow (neon text + glow)
  - [x] Glassmorphic (glass effect)
  - [x] Skeuomorphic (realistic 3D)
  - [x] Paper fold (fold effect on hover)
  - [x] Cyberpunk (glitch aesthetic)
  - [x] Minimal line (single line accent)
- [x] Create button shape variants per style:
  - [x] Rectangle (follows radius system)
  - [x] Pill (full-rounded)
  - [x] Circle/Square icon button
- [x] Animated buttons respect `prefers-reduced-motion`
- [x] Wire button style into PreviewPanel SampleApp
- [x] Wire button style into export (CLAUDE.md includes button rules)

**Checkpoint:** ✅ 50 button styles browsable across 5 groups, each shown in Default/Hover/Press states. Interactive row with S/M/L sizes, pill shape, and disabled state. Combined preview uses selected button style. Animated buttons (shimmer, glow-pulse, spinner) respect `prefers-reduced-motion`. Export includes button style details in all formats.

---

## Phase 7: Inputs & Form Elements ✅

Every app has forms. These define the input experience.

- [x] Define input data structure (variant, states: default/focus/filled/error/disabled, label style, helper text)
- [x] Build input preview card (shows all states for each variant)
- [x] Create text input styles:
  - [x] Underline only (Material-style)
  - [x] Bordered (full border box)
  - [x] Filled background (gray fill, no border)
  - [x] Floating label (label animates up on focus)
  - [x] Inset label (label inside, moves to border on focus)
  - [x] Pill input (fully rounded)
  - [x] Flush (no visible boundary, focus underline)
  - [x] Neumorphic inset
  - [x] Frosted glass
  - [x] Bordered with thick focus ring
  - [x] Left-accent (colored left border)
- [x] Create select/dropdown styles (matching each input variant)
- [x] Create checkbox styles:
  - [x] Standard square
  - [x] Rounded checkbox
  - [x] Circle checkbox
  - [x] Toggle switch (iOS-style)
  - [x] Toggle switch (Android-style)
  - [x] Animated check (draw-in animation)
  - [x] Fill checkbox (fills with color on check)
- [x] Create radio styles:
  - [x] Standard circle
  - [x] Filled circle
  - [x] Card radio (full card is clickable)
  - [x] Segmented control / button group radio
  - [x] Chip/tag radio
- [x] Create search bar styles:
  - [x] Simple with icon
  - [x] Expanding search (grows on focus)
  - [x] Command palette style (⌘K)
  - [x] Pill search
  - [x] With filter chips
- [x] Create slider/range styles
- [x] Create textarea styles (matching input variants)

**Checkpoint:** All form elements browsable with full state demos. Interactable (can actually type, toggle, check). Combined preview includes a sample form section.

---

## Phase 8: MCP Server — Claude Code Integration ✅

Wire DesignKit directly into Claude Code so your design selections are instantly available when building apps. Inspired by agentation.dev's architecture.

Architecture:
```
DesignKit Browser (Zustand state)
       ↓ POST /api/designkit/state (auto-sync on every change)
Next.js API Route → writes state to disk
       ↑ HTTP GET /api/designkit/*
MCP Server (stdio, thin client)
       ↓ exposes tools
Claude Code Agent
```

- [x] Add Next.js API route `POST /api/designkit/state` — browser pushes full state on every change
- [x] Add Next.js API route `GET /api/designkit/state` — returns current state as JSON
- [x] Add Next.js API route `GET /api/designkit/config` — returns resolved DesignConfig
- [x] Add Next.js API route `GET /api/designkit/export/:format` — returns specific export format
- [x] Write state to disk (`~/.designkit/state.json`) as fallback for when dev server is down
- [x] Add auto-sync hook in Zustand store — POST state to API on every change (debounced)
- [x] Build MCP server (`designkit-mcp`) as a standalone Node.js script:
  - [x] `designkit_get_config` — full resolved design config (colors, typography, spacing, etc.)
  - [x] `designkit_get_colors` — just the color system (resolved light + dark)
  - [x] `designkit_get_typography` — just the typography tokens
  - [x] `designkit_get_selections` — what's currently selected per category
  - [x] `designkit_get_export` — get a specific export format (css, tailwind, swift, kotlin, claude-md)
  - [x] `designkit_get_token` — get a specific token by path (e.g. "colors.primary")
- [x] Add SSE endpoint `GET /api/designkit/events` for real-time state change notifications
- [x] MCP server uses SSE watch for live updates (optional, poll-based fallback)
- [x] CLI setup command: `npx designkit-mcp init` — adds MCP server to Claude Code config
- [x] CLI doctor command: `npx designkit-mcp doctor` — checks connectivity + config
- [x] Write CLAUDE.md instructions for using the MCP tools when building apps
- [x] Test end-to-end: select a design identity in DesignKit → ask Claude Code to "build a settings screen using my DesignKit config" → verify it uses the correct tokens

**Checkpoint:** Claude Code can read your live DesignKit selections. When building any app, you say "use my DesignKit config" and Claude generates screens matching your chosen identity — correct colors, fonts, spacing, radius, shadows, and button styles. No manual export needed.

---

## Phase 9: Cards ✅

40 card styles across 7 groups — the primary content container with extensive visual variety.

- [x] Define card data structure (variant, css, hoverCss, hasImage, layout)
- [x] Build card preview component (shows card with sample content, hover states, color token resolution)
- [x] Create card styles — Flat (5):
  - [x] Flat (no shadow, no border)
  - [x] Flat + border (subtle 1px border)
  - [x] Minimal text (just text, no chrome)
  - [x] Dotted border (lightweight dotted outline)
  - [x] Outlined dashed (dashed border, sketchy feel)
- [x] Create card styles — Elevated (6):
  - [x] Soft shadow (modern SaaS)
  - [x] Material elevated (MD3 elevation)
  - [x] Heavy shadow (dramatic depth)
  - [x] Colored shadow (shadow matches primary color)
  - [x] Floating (extra-large soft shadow, detached feel)
  - [x] Gradient shadow (primary + accent tinted shadow)
- [x] Create card styles — Glass & Gradient (5):
  - [x] Glassmorphic (frosted glass + blur)
  - [x] Gradient border (gradient on border only)
  - [x] Gradient fill (gradient background)
  - [x] Frosted dark (dark glassmorphic — blur on dark translucent bg)
  - [x] Split card (two-tone background via hard-stop gradient)
- [x] Create card styles — Accented (5):
  - [x] Accent top border
  - [x] Accent left border
  - [x] Outlined bold (thick border)
  - [x] Card with ribbon/badge
  - [x] Sectioned (distinct header/body/footer zones with dividers)
- [x] Create card styles — Neumorphic (3):
  - [x] Neumorphic raised
  - [x] Neumorphic inset
  - [x] Inset recessed (sunken into page — darker bg + inner shadow)
- [x] Create card styles — Special (10):
  - [x] Brutalist (offset shadow, hard borders)
  - [x] Image header card (image bleeds to top)
  - [x] Full-bleed image card (image is background)
  - [x] Horizontal card (image left, content right)
  - [x] Interactive tilt card (3D tilt on hover)
  - [x] Expandable card (expands on click)
  - [x] Card with hover reveal (extra info on hover)
  - [x] Stacked cards (overlapping z-index effect)
  - [x] Paper stack (multiple offset rotated layers behind card)
  - [x] Cutout window (transparent inner section creating a "window" effect)
- [x] Create card styles — Expressive (6):
  - [x] Neon glow (vivid primary-colored glow border + shadow)
  - [x] Retro pixel (pixelated 8-bit aesthetic with stepped borders)
  - [x] Claymorphism (rounded, colored, inflated 3D look)
  - [x] Spotlight (radial gradient highlight on hover)
  - [x] Overlay pattern (subtle repeating geometric dot pattern)
  - [x] Morphing border (border color shifts on hover, primary → accent)
- [x] Wire card style into PreviewPanel (resolveCardSpecialKeys handles all __token patterns)
- [x] Fix color token resolution for compound CSS values (global regex replace with proper ordering)

**Checkpoint:** ✅ 40 card styles browsable across 7 groups (Flat, Elevated, Glass & Gradient, Accented, Neumorphic, Special, Expressive). Hover interactions visible. Combined preview uses selected card style with full color token resolution. All styles render correctly in both catalog and preview panel.

---

## Phase 10: Navigation & Structural ✅

Navbars, tabs, sidebars — the skeleton of every app.

- [x] Build navigation preview (each rendered as a mini app frame)
- [x] Create top navigation bars:
  - [x] Simple centered
  - [x] Logo left + links right
  - [x] Logo left + links center + actions right
  - [x] Transparent overlay (for hero sections)
  - [x] Bordered bottom
  - [x] Filled/solid background
  - [x] Blurred/frosted
  - [x] Slim (compact height)
  - [x] Mega menu (expandable sections)
- [x] Create mobile navigation:
  - [x] Bottom tab bar (iOS-style)
  - [x] Bottom tab bar (Material-style)
  - [x] Bottom tab bar with FAB center
  - [x] Hamburger slide-out
  - [x] Bottom sheet nav
  - [x] Floating bottom pill
- [x] Create sidebar styles:
  - [x] Fixed full-height
  - [x] Collapsible icon-only
  - [x] Floating sidebar (gap from edge)
  - [x] Grouped sections with headers
  - [x] Minimal icon sidebar
  - [x] Dark sidebar + light content
- [x] Create tab styles:
  - [x] Underline tabs
  - [x] Pill/button tabs
  - [x] Bordered tabs
  - [x] Vertical tabs
  - [x] Scrollable tabs
  - [x] Icon + label tabs
- [x] Create breadcrumb styles
- [x] Create header/hero sections:
  - [x] Centered text hero
  - [x] Split hero (text left, image right)
  - [x] Full-image background hero
  - [x] Gradient background hero
  - [x] Animated/particle hero
  - [x] Minimal hero (just large text)
  - [x] Hero with floating cards
  - [x] Video background hero
- [x] Create modal/sheet styles:
  - [x] Center modal (standard)
  - [x] Bottom sheet (mobile-style)
  - [x] Side drawer (right)
  - [x] Full-screen modal
  - [x] Popup/popover (attached to trigger)
  - [x] Command palette overlay
  - [x] Toast/notification position variants
- [x] Create footer styles:
  - [x] Simple centered
  - [x] Multi-column
  - [x] Minimal one-line
  - [x] CTA footer (with action)
  - [x] Fat footer (lots of links + newsletter)

**Checkpoint:** ✅ All 50 navigation and structural elements browsable across 6 categories (navigation, tabs, sidebars, heroes, modals, footers), rendered in mini frames showing context. Combined preview uses selected nav/hero/footer styles. Export includes all structural component preferences.

---

## Phase 11: Content Components ✅

Badges, avatars, lists, tables, pricing, testimonials, stats, dividers, image treatments.

- [x] Define content component data structures (variant, sizes, color integration, state variations)
- [x] Build content component preview cards (each renders in-context with current color/type tokens)
- [x] Create badge/chip/tag styles:
  - [x] Solid filled (primary color fill)
  - [x] Outline (border only, no fill)
  - [x] Soft/tinted (light background tint)
  - [x] Dot indicator (small dot + text)
  - [x] Pill shape (fully rounded)
  - [x] With icon (icon + label)
  - [x] Removable (with ✕ dismiss)
  - [x] Status badge (online/offline/away dot)
  - [x] Counter badge (number in circle)
  - [x] Gradient badge
- [x] Create avatar styles:
  - [x] Circle image
  - [x] Rounded square image
  - [x] Square image
  - [x] Initials (letter fallback)
  - [x] With status dot (online/offline)
  - [x] With notification badge
  - [x] Avatar group/stack (overlapping)
  - [x] Avatar with ring/border
  - [x] Placeholder silhouette
- [x] Create list item styles:
  - [x] Simple text row
  - [x] With leading icon
  - [x] With leading avatar
  - [x] With trailing action (arrow, toggle, button)
  - [x] With description subtitle
  - [x] Swipeable with actions (iOS-style)
  - [x] Grouped with section headers
  - [x] Inset grouped (rounded sections)
  - [x] With checkbox selection
  - [x] With toggle switch
  - [x] Expandable/accordion row
- [x] Create table styles:
  - [x] Simple clean (minimal borders)
  - [x] Striped rows (alternating background)
  - [x] Bordered (full grid lines)
  - [x] Hoverable rows (highlight on hover)
  - [x] Compact dense (small padding)
  - [x] Card rows (each row is a card)
  - [x] Sticky header
  - [x] With row selection checkboxes
- [x] Create pricing card styles:
  - [x] Simple vertical (price + features list)
  - [x] Featured/highlighted (popular plan emphasized)
  - [x] Horizontal layout (side-by-side comparison)
  - [x] Toggle monthly/yearly (with savings badge)
  - [x] Comparison table (feature matrix grid)
  - [x] Minimal (just price + CTA)
  - [x] Gradient header accent
  - [x] With free trial badge
- [x] Create testimonial styles:
  - [x] Simple quote with attribution
  - [x] With avatar + name + role
  - [x] Card testimonial (contained in card)
  - [x] Large pull quote (oversized quotation marks)
  - [x] Carousel-ready (horizontal scroll)
  - [x] Star rating + review text
  - [x] Tweet/social-style embed
  - [x] Video testimonial placeholder
- [x] Create stat/metric display styles:
  - [x] Large number + label
  - [x] With leading icon
  - [x] With trend arrow (up/down + percentage)
  - [x] Card stat (number in a card)
  - [x] Inline stat (horizontal layout)
  - [x] Progress ring/donut
  - [x] Sparkline mini chart
  - [x] Comparison stat (vs previous period)
- [x] Create divider/separator styles:
  - [x] Solid line
  - [x] Dashed line
  - [x] Dotted line
  - [x] With centered text label
  - [x] Gradient fade (fades at edges)
  - [x] Thick decorative bar
  - [x] With icon centered
- [x] Create image treatment styles:
  - [x] Rounded corners
  - [x] Circle crop
  - [x] With color overlay
  - [x] With gradient overlay
  - [x] With text overlay (caption on image)
  - [x] Parallax-ready (overflow + scroll offset)
  - [x] With border frame
  - [x] Aspect ratio locked (16:9, 4:3, 1:1)

**Checkpoint:** ✅ 77 content component variants browsable across 9 categories (badges 10, avatars 9, lists 11, tables 8, pricing 8, testimonials 8, stats 8, dividers 7, images 8). Each renders with current color/type tokens. Combined preview applies badge, avatar, stat, and divider styles to existing SampleApp elements. Export includes all 9 content component preferences in JSON and CLAUDE.md formats.

---

## Phase 12: UX Patterns ✅

The screens and states that make apps feel complete and different.

- [x] Define UX pattern data structures (variant, layout, content slots, animation integration)
- [x] Build UX pattern preview (each rendered as a mini-screen in a device frame)
- [x] Create empty state patterns:
  - [x] Illustration-centered (large illustration + text + CTA)
  - [x] Icon + text (simple icon with message)
  - [x] Action-focused (prominent CTA button)
  - [x] Friendly/fun (playful illustration, warm copy)
  - [x] Minimal (just text, no decoration)
  - [x] Error-themed (something went wrong + retry)
  - [x] Onboarding-step (first-time user guidance)
  - [x] Search no results (try different keywords)
  - [x] Permissions needed (explain why + enable)
- [x] Create loading patterns:
  - [x] Skeleton shimmer (animated gradient sweep)
  - [x] Skeleton pulse (opacity fade in/out)
  - [x] Spinner centered (full-page spinner)
  - [x] Progress bar (determinate linear bar)
  - [x] Content placeholder (gray blocks matching layout)
  - [x] Lazy image blur-up (blurred placeholder → sharp)
  - [x] Skeleton with stagger animation (rows appear sequentially)
  - [x] Pull-to-refresh indicator
  - [x] Inline button loading (spinner replaces button text)
- [x] Create onboarding flow patterns:
  - [x] Carousel/swipe (horizontal page dots)
  - [x] Single-page welcome (hero + get started)
  - [x] Progressive disclosure (step-by-step reveal)
  - [x] Checklist (complete these to get started)
  - [x] Tooltip tour (highlight UI elements sequentially)
  - [x] Video intro (short explainer video + skip)
  - [x] Benefit cards (swipeable feature highlights)
- [x] Create error screen patterns:
  - [x] 404 not found (lost page, go home CTA)
  - [x] Connection error (no internet, retry CTA)
  - [x] Generic error (something went wrong)
  - [x] Form validation summary (list of field errors)
  - [x] Timeout error (took too long, retry)
  - [x] Maintenance mode (scheduled downtime notice)
  - [x] Permission denied (403, request access CTA)
- [x] Create success state patterns:
  - [x] Checkmark animation (animated circle + check)
  - [x] Confetti celebration (particle burst)
  - [x] Simple text confirmation (green text + icon)
  - [x] Redirect countdown (success → redirecting in 3s)
  - [x] Card flip reveal (flips to show result)
- [x] Create permission/prompt patterns:
  - [x] Bottom sheet permission (iOS-style)
  - [x] Modal permission dialog (centered)
  - [x] Inline banner (non-blocking, dismissable)
  - [x] Full-screen explanation (why we need this + allow)
  - [x] Pre-permission primer (explain before system prompt)
- [x] Create notification/alert patterns:
  - [x] Toast top (slides down from top)
  - [x] Toast bottom (slides up from bottom)
  - [x] Banner (full-width, sticky top)
  - [x] Inline alert (within content flow)
  - [x] Snackbar with action (bottom bar + undo)
  - [x] Floating notification (corner-anchored)
  - [x] Alert with icon + color coding (success/warning/error/info)
  - [x] Dismissable vs auto-dismiss variants

**Checkpoint:** ✅ 50 UX patterns browsable as full mini-screens in device frames across 6 categories (empty-states 9, loading 9, onboarding 7, errors 7, success 5, notifications 13 including 5 permission prompts). Each pattern renders with current design tokens. Combined preview includes selected patterns as UX Pattern indicators. Export includes all 6 pattern preferences in JSON and CLAUDE.md formats.

---

## Phase 13: Motion & Animation ✅

How things move defines how the app feels.

- [x] Define animation data structure (type, duration, easing, trigger, CSS keyframes or spring config)
- [x] Build animation preview cards (interactive — click/hover to trigger, replay button)
- [x] Define easing presets:
  - [x] Linear (constant speed)
  - [x] Ease-out (fast start, slow end — most common for entrances)
  - [x] Ease-in-out (smooth both ends)
  - [x] Spring (physics-based bounce)
  - [x] Bounce (overshoots + settles)
  - [x] Snap (fast, minimal overshoot)
- [x] Create button press animations:
  - [x] Scale down (shrink to 95%)
  - [x] Ripple (Material-style expanding circle)
  - [x] Color flash (brief brightness pulse)
  - [x] Bounce (press + spring back)
  - [x] Glow pulse (shadow pulses outward)
  - [x] None (instant state change)
  - [x] 3D push (perspective tilt inward)
- [x] Create hover animations:
  - [x] Lift + shadow (translateY + shadow increase)
  - [x] Scale up (grow to 102-105%)
  - [x] Color shift (background color transition)
  - [x] Underline slide (underline animates from left)
  - [x] Glow (soft colored glow appears)
  - [x] Background slide (color wipes in from edge)
  - [x] Border reveal (border fades in)
  - [x] Icon nudge (icon shifts right →)
- [x] Create page transition patterns:
  - [x] Fade (opacity crossfade)
  - [x] Slide left (new page slides in from right)
  - [x] Slide up (new page slides in from bottom)
  - [x] Scale (zoom in/out transition)
  - [x] Shared element morph (element transforms between pages)
  - [x] None (instant swap)
  - [x] Blur transition (blur out → blur in)
- [x] Create loading animations:
  - [x] Shimmer sweep (gradient slides across skeleton) — covered in Phase 12 loading category
  - [x] Pulse fade (opacity pulses) — covered in Phase 12 loading category
  - [x] Spinner circular (rotating arc) — covered in Phase 12 loading category
  - [x] Spinner dots (bouncing dots) — covered in Phase 12 loading category
  - [x] Progress bar (animated fill) — covered in Phase 12 loading category
  - [x] Skeleton wave (wave effect across placeholders) — covered in Phase 12 loading category
- [x] Create micro-interactions:
  - [x] Toggle flip (iOS-style switch animation)
  - [x] Checkbox draw (checkmark draws in with path animation)
  - [x] Heart/like pop (scale up + particle burst)
  - [x] Pull-to-refresh (stretch + release + spin)
  - [x] Swipe to delete (slide + fade + collapse)
  - [x] Count-up numbers (animated number increment)
  - [x] Tooltip fade in (delayed appearance)
  - [x] Menu expand (stagger children in)
- [x] Create entrance animations:
  - [x] Fade in (opacity 0 → 1)
  - [x] Slide up + fade (translateY + opacity)
  - [x] Stagger children (each child delays slightly)
  - [x] Scale in (from 90% → 100%)
  - [x] Slide from left/right
  - [x] Clip reveal (rectangle clip expands)
  - [x] Typewriter (text characters appear sequentially)
- [x] Create scroll-triggered animations:
  - [x] Parallax (background scrolls slower than foreground)
  - [x] Reveal on scroll (fade in when element enters viewport)
  - [x] Sticky header transition (header shrinks on scroll)
  - [x] Progress indicator (reading progress bar)
  - [x] Counter animate on visible (numbers count up when scrolled to)
  - [x] Image zoom on scroll (Ken Burns-style) — folded into parallax entrance animation
- [x] Define animation speed presets:
  - [x] Instant (0ms — no animation)
  - [x] Fast (100-150ms — micro-interactions)
  - [x] Normal (200-300ms — most transitions)
  - [x] Slow (400-500ms — page transitions, reveals)
  - [x] Dramatic (600-1000ms — hero animations)

**Checkpoint:** 43 animation variants across 5 categories (loading animations covered in Phase 12, scroll-triggered folded into entrance-animations), all interactive and triggerable in the preview. Each item carries its own easing and duration. Combined preview shows selected animation styles as Motion indicator badges.

---

## Phase 14: Combined Preview System ✅

The live preview that shows all your picks working together.

- [x] Design the full sample app template:
  - [x] Navigation bar section (uses selected nav style)
  - [x] Hero/header section (uses selected typography + colors + buttons)
  - [x] Stats/metrics row (uses selected stat display style)
  - [x] Content section with cards (uses selected card style + list items)
  - [x] Form section (uses selected input styles + buttons)
  - [x] Table/data section (uses selected table style)
  - [x] Alert/notification examples (uses selected notification style)
  - [x] Footer section (uses selected footer style)
- [x] Wire every token category to the preview:
  - [x] Colors (background, surface, text, semantic — all resolved)
  - [x] Typography (heading font, body font, type scale applied)
  - [x] Spacing (padding, gaps, margins from selected spacing system)
  - [x] Border radius (all corners use selected radius system)
  - [x] Shadows (elevation levels from selected shadow system)
  - [x] Buttons (all CTAs use selected button style)
  - [x] Inputs (form fields use selected input style)
  - [x] Cards (content cards use selected card style)
  - [x] Navigation (top/bottom nav uses selected nav style)
  - [x] Content components (badges, avatars, lists from selections)
  - [x] Animations (transitions, hovers, entrances from selected motion)
- [x] Build the device frame selector:
  - [x] Mobile phone frame (375px width, with notch/status bar)
  - [x] Tablet frame (768px width, landscape option)
  - [x] Desktop browser frame (1280px width, with browser chrome)
  - [x] Frameless/responsive (no device chrome, raw preview)
- [x] Build the isolated view vs in-context view toggle per category
- [x] Add "randomize" button (randomly picks one item per category for inspiration)
- [x] Add "randomize category" (randomize just one category, keep the rest)
- [x] Add "reset category" and "reset all" buttons
- [x] Add "lock selection" per category (randomize skips locked categories)
- [x] Build preview zoom controls (50%, 75%, 100%, fit to panel)

**Checkpoint:** ✅ Changing any selection instantly updates the combined preview. Preview supports mobile/tablet/desktop/frameless frames with realistic device chrome. Zoom controls (50%/75%/100%/fit) work via CSS transform. Randomize generates random selections across all 33 categories, respecting locked categories. Per-category randomize and lock buttons in SelectionPanel. Context view mode adds mini sidebar + breadcrumb shell. Table section renders with selected table style. Button animations (scale-down/bounce/3d-push) play on press. Hover animations (lift-shadow/scale-up/glow/border-reveal/color-shift) trigger on card hover. Entrance animations inject CSS keyframes and replay on variant change.

---

## Phase 15: Config Export System ✅

Turn selections into usable files for your projects.

- [x] Expand JSON export to include all token categories:
  - [x] Color tokens (light + dark mode, semantic, primary scale)
  - [x] Typography tokens (fonts, type scale, weights, line heights)
  - [x] Spacing tokens (base unit, named scale values)
  - [x] Border radius tokens (named size values)
  - [x] Shadow tokens (elevation levels with full box-shadow values)
  - [x] Component preferences (selected button, input, card, nav style IDs)
  - [x] Animation tokens (easing curves, duration presets, selected motion styles)
- [x] Expand Tailwind config export:
  - [x] Color theme extension (all color tokens mapped)
  - [x] Font family extension (heading, body, mono fonts)
  - [x] Font size extension (type scale with line heights)
  - [x] Spacing extension (custom spacing scale)
  - [x] Border radius extension (named radius values)
  - [x] Box shadow extension (elevation levels)
  - [x] Animation/keyframes extension (selected motion presets)
- [x] Expand Swift export:
  - [x] Color+DesignKit.swift (light/dark adaptive colors)
  - [x] Font+DesignKit.swift (heading, body, mono font extensions)
  - [x] Spacing.swift (spacing scale as CGFloat constants)
  - [x] Theme.swift (radius, shadows, combined theme struct)
  - [x] Typography.swift (type scale with Dynamic Type mapping)
- [x] Expand Kotlin export:
  - [x] Color.kt (Material3 ColorScheme, light + dark)
  - [x] Type.kt (Typography object with TextStyle definitions)
  - [x] Shape.kt (Shapes with corner radii)
  - [x] Spacing.kt (dimension resource values)
  - [x] Theme.kt (combined MaterialTheme wrapper)
- [x] Expand CLAUDE.md export:
  - [x] Color rules (exact hex values, when to use each color)
  - [x] Typography rules (font families, scale usage, hierarchy rules)
  - [x] Spacing rules (base unit, when to use each size)
  - [x] Radius rules (which radius for which element type)
  - [x] Shadow rules (which elevation level for which context)
  - [x] Button rules (selected style description, sizes, states)
  - [x] Input rules (selected style description, label behavior, validation)
  - [x] Component rules (card style, list style, nav style descriptions)
  - [x] Animation rules (easing, duration, which animations for which triggers)
- [x] Expand CSS custom properties export:
  - [x] Color variables (--color-primary, --color-bg, etc., with light/dark)
  - [x] Typography variables (--font-heading, --font-body, --text-base, etc.)
  - [x] Spacing variables (--space-xs through --space-3xl)
  - [x] Radius variables (--radius-sm through --radius-full)
  - [x] Shadow variables (--shadow-sm through --shadow-xl)
  - [x] Animation variables (--ease-default, --duration-fast, etc.)
- [x] Add Flutter/Dart export:
  - [x] ThemeData definition (colors, typography, shapes)
  - [x] ColorScheme (light + dark)
  - [x] TextTheme (type scale mapping)
- [x] Add React Native export:
  - [x] StyleSheet constants (colors, spacing, typography, shadows)
  - [x] Theme object compatible with common RN theming libraries
- [x] Add "copy to clipboard" for individual tokens
- [x] Add "copy as" per token (CSS, Swift, Kotlin, JS)
- [x] Add download as ZIP (all selected export formats bundled)
- [x] Add import/load config (drag & drop a previous JSON export to restore selections)

**Checkpoint:** ✅ Export produces valid, usable files for 8 formats (JSON, CSS, Tailwind, Swift, Kotlin, CLAUDE.md, Flutter, React Native). All token categories included. ZIP download bundles everything. Import restores previous exports.

---

## Phase 16: Generative Expansion (CLI) ✅

Structure the project so new variations can be added via Claude Code.

- [x] Document the data format for each category:
  - [x] Color palette format (ColorPaletteData with light/dark/primaryScale)
  - [x] Typography pairing format (fonts, weights, type scale definition)
  - [x] Spacing system format (base unit, named values)
  - [x] Radius system format (named values per element type)
  - [x] Shadow system format (named levels with box-shadow values)
  - [x] Button style format (variant definition, CSS/class mapping, state styles)
  - [x] Input style format (variant definition, label behavior, state styles)
  - [x] Card style format (variant definition, padding, elevation, border)
  - [x] Navigation style format (layout, items, responsive behavior)
  - [x] Content component format (variant per sub-category)
  - [x] UX pattern format (layout, content slots, animation refs)
  - [x] Animation format (keyframes, easing, duration, trigger type)
- [x] Create `.claude/CLAUDE.md` for the designkit project itself:
  - [x] Project architecture overview (pages, components, lib, data)
  - [x] Data file locations and naming conventions
  - [x] How to add a new catalog item (step-by-step with code example)
  - [x] How to add a new category (route, data file, sidebar entry, types)
  - [x] Code style rules (functional components, named exports, app-* theme classes)
  - [x] Testing guidance (what to verify after adding items)
- [x] Test generative expansion:
  - [x] Ask Claude Code to "add 5 more button styles that feel playful" → verify they appear
  - [x] Ask Claude Code to "add a new color palette inspired by the ocean at sunset" → verify it works
  - [x] Ask Claude Code to "add a typography pairing using Outfit + DM Sans" → verify it loads
- [x] Structure for future in-app AI panel:
  - [x] API route stub (`POST /api/generate`) for AI-assisted generation
  - [x] Chat component placeholder (floating panel, message input)
  - [x] Prompt template library (pre-built prompts for each category)

**Checkpoint:** ✅ You can expand the library by chatting with Claude Code. The `.claude/CLAUDE.md` gives Claude full context. `src/data/DATA_FORMATS.md` documents all 30 data types with examples. New items follow existing data formats and appear in the app after refresh. Validated with 3 expansion tests (buttons, colors, typography). Future in-app AI panel stubbed with GeneratePanel component, API route, and 20 prompt templates.

---

## Phase 17: Polish & QA ✅

Final pass to make the tool itself feel solid.

- [x] Keyboard navigation:
  - [x] Arrow keys to browse catalog items (left/right within grid)
  - [x] Enter to select/deselect focused item
  - [x] Escape to deselect current category or close modals
  - [x] Tab navigation through all interactive elements
  - [x] ⌘K command palette (quick jump to any category, search items)
- [x] Persistent state:
  - [x] Selections survive browser refresh (localStorage — already via Zustand persist)
  - [x] Named presets (save current selections as "My Fintech Theme", load later)
  - [x] Import/export selections as JSON file
  - [x] Undo/redo for selection changes (Cmd+Z / Cmd+Shift+Z)
- [x] Performance audit:
  - [x] Lazy-load catalog items per category (hardcoded ID registry, no data imports)
  - [x] Virtualize long grid lists (not needed — max 55 items per category)
  - [x] Lazy-load Google Fonts (useGoogleFonts hook, deduplication)
  - [x] Image optimization (no raster images in app)
  - [x] Measure and optimize initial load time (1.4s compile, ~1.5MB split)
- [x] Accessibility audit:
  - [x] All interactive elements have visible focus indicators (:focus-visible global)
  - [x] Color contrast passes WCAG AA for all app theme elements
  - [x] Screen reader labels on all buttons and cards (ARIA)
  - [x] Reduced motion mode (respect `prefers-reduced-motion`)
  - [x] Keyboard-only usability test (complete full flow without mouse)
- [x] Visual polish pass:
  - [x] Consistent spacing across all pages (no one-off margins)
  - [x] Smooth transitions on all state changes (no layout jank)
  - [x] Loading states for any async operations (font loading, export generation)
  - [x] Empty states on every page (before any items exist in category)
  - [x] Hover/active states on all interactive elements
  - [x] Scrollbar styling consistent across browsers
- [x] Cross-browser testing:
  - [x] Chrome (primary target)
  - [x] Safari (macOS)
- [x] Export validation:
  - [x] Test JSON export → import into a fresh project
  - [x] Test Tailwind config → verify it compiles without errors
  - [x] Test Swift export → verify it compiles in Xcode
  - [x] Test Kotlin export → verify syntax
  - [x] Test CSS export → verify variables resolve in a plain HTML page
  - [x] Test CLAUDE.md export → give to Claude Code, verify it follows the rules
  - [x] Test Flutter export → verify syntax
  - [x] Test React Native export → verify syntax
- [x] Stress testing:
  - [x] Select one item from every 34 categories → config resolves all tokens
  - [x] Rapidly toggle selections (20 concurrent) → no state corruption
  - [x] Large color pick count (60 individual colors) → SelectionPanel handles it
  - [x] Export with all categories selected → all 8 formats produce valid output
- [x] Final documentation:
  - [x] `.claude/CLAUDE.md` updated with resolve-config, all 8 export formats, registry instructions
  - [x] In-app help tooltip in sidebar (keyboard shortcuts, workflow overview)

**Checkpoint:** ✅ Tool feels polished and production-quality. Keyboard navigation works end-to-end. All exports validated. Accessibility passes (WCAG AA, ARIA, reduced motion). Named presets, undo/redo, command palette. No visual jank or broken states.

---

## Phase 18: In-App AI Generation

Activate the AI Generate panel — turn the "Coming Soon" stub into a working feature that generates new catalog items via Claude API.

- [ ] Backend — API route (`POST /api/generate`):
  - [ ] Integrate Claude API (Anthropic SDK) for item generation
  - [ ] Build category-aware system prompts with data schema + existing items as context
  - [ ] Load the user's current selections for style context
  - [ ] Validate generated items against the TypeScript schema before returning
  - [ ] Stream responses for real-time feedback in the UI
  - [ ] Rate limiting / error handling for API failures
- [ ] Frontend — GeneratePanel activation:
  - [ ] Remove "Coming Soon" overlay and enable all controls
  - [ ] Wire category selector, quick prompts, and custom prompt to the API
  - [ ] Show streaming generation progress (typing indicator / partial preview)
  - [ ] Display generated item as a preview card before saving
  - [ ] "Add to catalog" action — persist generated item to the data layer
  - [ ] "Regenerate" action — try again with the same prompt
  - [ ] Error states (API key missing, rate limit, generation failed)
- [ ] Prompt engineering:
  - [ ] Category-specific system prompts (one per data type) with schema examples
  - [ ] Include user's current selections as style context ("match this vibe")
  - [ ] Template variable interpolation for quick prompts
  - [ ] Free-form custom prompt with guardrails
- [ ] Data persistence:
  - [ ] Save generated items to a user-local catalog extension (separate from built-in data)
  - [ ] Generated items appear in the catalog grid alongside built-in items
  - [ ] Mark generated items with a visual indicator (badge/icon)
  - [ ] Delete generated items (built-in items remain protected)
- [ ] Configuration:
  - [ ] API key management (env variable or in-app settings)
  - [ ] Model selection (default to Claude Sonnet for speed, option for Opus for quality)
  - [ ] Generation settings (temperature, max items per generation)

**Checkpoint:** Users can type a prompt like "a brutalist button with thick borders" and get a working catalog item generated, previewed, and added to their catalog. The generate panel works for all 34 categories.

---

## Estimated scope

| Phase | Items | Complexity |
|-------|-------|------------|
| 1. Foundation | 8 tasks | ✅ Complete |
| 2. UI Shell | 10 tasks | ✅ Complete |
| 3. Colors | 42 palettes | ✅ Complete |
| 4. Typography | 51 pairings | ✅ Complete |
| 5. Spacing/Radius/Shadows | 84 systems | ✅ Complete |
| 6. Buttons | 55 styles | ✅ Complete |
| 7. Inputs | 41 styles | ✅ Complete |
| 8. MCP Server | 12 tasks | ✅ Complete |
| 9. Cards | 40 styles | ✅ Complete |
| 10. Navigation | 30+ patterns | ✅ Complete |
| 11. Content components | 77 variants | ✅ Complete |
| 12. UX patterns | 50 screens | ✅ Complete |
| 13. Motion | 60+ animations | ✅ Complete |
| 14. Combined preview | 25+ tasks | ✅ Complete |
| 15. Config export | 40+ tasks | ✅ Complete |
| 16. Generative expansion | 20+ tasks | ✅ Complete |
| 17. Polish & QA | 41 tasks | ✅ Complete |
| 18. In-App AI Generation | 20+ tasks | Pending — Claude API integration |

**Total catalog items: 400+**

This is a large project. We build it phase by phase — each phase produces a working, usable increment.

---
---

# Sources & References

Everything we draw from to build the catalog. Browse these to get a feel for what's out there.

---

## Design Systems (Component & Pattern Reference)

These are battle-tested design systems from major companies. Each defines colors, typography, spacing, components, and patterns. We study their approaches and create our own variations.

| System | By | Why it matters | Link |
|---|---|---|---|
| **Material Design 3** | Google | The Android standard. Dynamic color, elevation, motion. | [m3.material.io](https://m3.material.io/) |
| **Apple HIG** | Apple | The iOS/macOS standard. SF Pro, vibrancy, large titles. | [developer.apple.com/design](https://developer.apple.com/design/human-interface-guidelines/) |
| **Carbon** | IBM | Extremely comprehensive. Great component guidelines. | [carbondesignsystem.com](https://carbondesignsystem.com/) |
| **Primer** | GitHub | Developer-first. Strong CSS framework, open-source focus. | [primer.style](https://primer.style/) |
| **Pajamas** | GitLab | Comprehensive with Vue.js + Rails code examples. | [design.gitlab.com](https://design.gitlab.com/) |
| **Polaris** | Shopify | Commerce-focused. Excellent pattern guidance. | [polaris.shopify.com](https://polaris.shopify.com/) |
| **Lightning** | Salesforce | Enterprise-grade. Rich component library. | [lightningdesignsystem.com](https://www.lightningdesignsystem.com/) |
| **Fluent** | Microsoft | Cross-platform (web, Windows, mobile). | [fluent2.microsoft.design](https://fluent2.microsoft.design/) |
| **Atlassian Design** | Atlassian | Token picker tool, great color/spacing foundations. | [atlassian.design](https://atlassian.design/) |
| **Ant Design** | Ant Group | Massive component library, popular in Asia. | [ant.design](https://ant.design/) |
| **Spectrum** | Adobe | Design for creative tools. Accessible, well-documented. | [spectrum.adobe.com](https://spectrum.adobe.com/) |
| **Base Web** | Uber | Clean, functional, data-heavy UI patterns. | [baseweb.design](https://baseweb.design/) |
| **Chakra UI** | Community | Accessible, composable React components. | [chakra-ui.com](https://www.chakra-ui.com/) |

**Browsable index of design systems:**
- [Design Systems Repo](https://designsystemsrepo.com/design-systems/) — catalog of hundreds of public design systems
- [Open UI](https://open-ui.org/design-systems/) — W3C community tracking design system patterns
- [Storybook Showcase](https://storybook.js.org/showcase/) — live Storybook instances from real teams

---

## Component Libraries (Code Reference)

Actual code libraries we reference for component variants, patterns, and implementation approaches.

| Library | What it is | Link |
|---|---|---|
| **shadcn/ui** | Copy-paste React components built on Radix + Tailwind. The foundation standard. | [ui.shadcn.com](https://ui.shadcn.com/) |
| **Radix UI** | Unstyled, accessible primitives. The accessibility layer. | [radix-ui.com](https://www.radix-ui.com/) |
| **Radix Themes** | Styled Radix components with a color system. | [radix-ui.com/themes](https://www.radix-ui.com/themes) |
| **DaisyUI** | 63 Tailwind components with 30+ built-in themes. Great for theme variation study. | [daisyui.com](https://daisyui.com/) |
| **Headless UI** | Unstyled accessible components by Tailwind Labs. | [headlessui.com](https://headlessui.com/) |
| **Aceternity UI** | 200+ animated components (Tailwind + Framer Motion). Visual effects reference. | [ui.aceternity.com](https://ui.aceternity.com/) |
| **Magic UI** | Animated React components, premium feel. | [magicui.design](https://magicui.design/) |
| **Flowbite** | Tailwind component library with floating labels, forms, etc. | [flowbite.com](https://flowbite.com/) |
| **Neobrutalism Components** | shadcn-based brutalist style components. | [shadcn.io/template/neobrutalism](https://www.shadcn.io/template/ekmas-neobrutalism-components) |

---

## Color Resources

### Palette Generators & Tools

| Tool | What it does | Link |
|---|---|---|
| **Coolors** | Fast palette generator. Browse, lock, adjust. | [coolors.co](https://coolors.co/) |
| **Radix Colors** | 12-step accessible color scales with auto dark mode. | [radix-ui.com/colors](https://www.radix-ui.com/colors/) |
| **Huemint** | AI-generated color schemes for brands/UIs. | [huemint.com](https://huemint.com/) |
| **Khroma** | AI learns your preferences, suggests palettes. | [khroma.co](https://www.khroma.co/) |
| **PaletteMaker** | Generate palettes and preview on real UI designs. | [palettemaker.com](https://palettemaker.com/) |
| **ColorMagic** | AI palette generator from text descriptions. | [colormagic.app](https://colormagic.app/) |
| **Colormind** | Neural net-based palette generation. | [colormind.io](http://colormind.io/) |
| **The Color Palette Studio** | Build, fix, and test brand palettes. | [thecolorpalettestudio.com](https://thecolorpalettestudio.com/) |
| **Open Color** | Open-source color scheme optimized for UI. | [yeun.github.io/open-color](https://yeun.github.io/open-color/) |

### Color Systems to Study

- **Radix Colors** — 12-step scale, each step has a specific use case (1=app bg, 12=high contrast text). APCA-based contrast. Same class name works in light + dark mode. [GitHub](https://github.com/radix-ui/colors)
- **Tailwind default palette** — 11 shades per hue (50-950). Industry standard scale.
- **Material 3 dynamic color** — Palette generated from a single seed color. [m3.material.io/styles/color](https://m3.material.io/styles/color/overview)

---

## Typography Resources

### Font Pairing Guides

| Resource | Link |
|---|---|
| **Fontpair** — 1000+ curated Google Font pairings with preview | [fontpair.co](https://www.fontpair.co/) |
| **Typewolf** — 40 best Google Fonts, curated | [typewolf.com/google-fonts](https://www.typewolf.com/google-fonts) |
| **Best Google Font Pairings for UI (2025)** — Matt Medley | [medley.ltd](https://medley.ltd/blog/best-google-font-pairings-for-ui-design-in-2025/) |
| **20+ Pairings for 2026 Websites** — LandingPageFlow | [landingpageflow.com](https://www.landingpageflow.com/post/google-font-pairings-for-websites) |
| **30 Google Font Pairings (2026)** — The Brief | [thebrief.ai](https://www.thebrief.ai/blog/google-font-pairings-for-websites/) |
| **Inspotype** — Visual font pairing guide | [inspotype.com](https://www.inspotype.com/blog/pairings/google-fonts) |

### Type Scale Tools

| Tool | What it does | Link |
|---|---|---|
| **Type Scale** | Generate scales with CSS/SCSS/JSON export | [typescale.net](https://typescale.net/) |
| **Precise Type** | Modular scale with natural rhythm | [precise-type.com](https://precise-type.com/) |
| **Modular Scale** | The original, by Tim Brown | [modularscale.com](https://www.modularscale.com/) |
| **Baseline Type Scale Generator** | Clean generator with presets | [baseline.is/tools/type-scale-generator](https://baseline.is/tools/type-scale-generator/) |
| **Layout Grid Calculator** | Type scale + grid system | [layoutgridcalculator.com/type-scale](https://www.layoutgridcalculator.com/type-scale/) |

### Common Modular Ratios

| Ratio | Name | Feel |
|---|---|---|
| 1.067 | Minor Second | Very tight, almost flat |
| 1.125 | Major Second | Compact, dense UI |
| 1.200 | Minor Third | Balanced, most common |
| 1.250 | Major Third | Comfortable, clear hierarchy |
| 1.333 | Perfect Fourth | Spacious, editorial |
| 1.500 | Perfect Fifth | Dramatic, hero-heavy |
| 1.618 | Golden Ratio | High contrast, expressive |

---

## Spacing & Layout

### Spacing Systems

- **4px base grid** — More granular. Scale: 4, 8, 12, 16, 20, 24, 32, 48, 64. Used by Palantir Blueprint, many modern systems.
- **8px base grid** — The standard. Scale: 8, 16, 24, 32, 40, 48, 64, 80. Used by Material Design, most design systems.
- **Naming conventions**: Numeric (100, 200, 300), multiplier (x1, x2, x3), t-shirt (xs, sm, md, lg, xl).

### Reference Articles

- [Spacing Systems & Scales in UI Design](https://blog.designary.com/p/spacing-systems-and-scales-ui-design) — Designary
- [How to Define a Spacing Scale](https://medium.com/felix-oginni-s-blog/how-to-define-a-spacing-scale-for-your-design-system-5f569327b671) — Felix Oginni
- [The 8pt Grid](https://notadesigner.io/p/8px-grid) — Not a Designer
- [Designer's Ultimate Spacing Guide](https://hakan-ertan.com/designers-ultimate-spacing-guide-from-design-tokens-to-final-design/) — Hakan Ertan
- [Atlassian Spacing Foundations](https://atlassian.design/foundations/spacing/) — Atlassian

---

## Border Radius

### Approaches

| Style | Values | Feel |
|---|---|---|
| **Sharp** | 0px everywhere | Brutalist, technical, editorial |
| **Subtle** | 2-4px | Professional, minimal, corporate |
| **Moderate** | 6-8px | Balanced, modern default |
| **Rounded** | 12-16px | Friendly, approachable, consumer |
| **Pill** | Full radius on buttons/badges | Playful, soft, mobile-first |
| **Squircle** | Superellipse (iOS-style smooth corners) | Premium, Apple-like |
| **Mixed** | Sharp containers + pill buttons | Contrasting, contemporary |

### Key Development: CSS `corner-shape`

As of 2025, CSS now supports `corner-shape: squircle` in Chrome 139+. This creates iOS-style superellipse corners natively. [Frontend Masters deep dive](https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/)

- [CSS-Tricks: What can we do with corner-shape?](https://css-tricks.com/what-can-we-actually-do-with-corner-shape/)
- [2026: Year of the Squircle](https://flyingw.press/article/2026-the-year-of-the-squircle/)

---

## Shadows & Elevation

### Design Principles

- Bigger shadows = more elevation = closer to user
- Layer multiple shadows for realism (tight + soft)
- Higher elevation → larger blur, lower opacity
- Most systems need 4-6 levels max

### Reference

- [Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/) — Josh Comeau (essential read)
- [Shadow Palette Generator](https://www.joshwcomeau.com/css/introducing-shadow-palette-generator/) — Josh Comeau's tool
- [Elevation Design Patterns: Tokens, Shadows, and Roles](https://designsystems.surf/articles/depth-with-purpose-how-elevation-adds-realism-and-hierarchy) — Design Systems Surf
- [Shadows Generator](https://shadows.joeczubiak.com/) — Multi-layer shadow tool

### Shadow Styles to Catalog

| Style | Characteristics |
|---|---|
| None / flat | Borders only, no shadows |
| Subtle soft | Large blur, very low opacity |
| Material | Google's elevation system (levels 1-24) |
| Crisp | Small blur, harder edge |
| Colored | Shadow tinted by element's color |
| Layered | Multiple shadow layers (2-3) for depth |
| Neumorphic | Light + dark shadow, embossed look |
| Glow | Colored glow instead of gray shadow |
| Long/dramatic | Extended directional shadow |
| Inset | Pressed-in appearance |

---

## Button & Component Design Styles

### Major Visual Movements

| Movement | Characteristics | Link |
|---|---|---|
| **Flat Design** | No gradients, no shadows, solid colors | Standard modern approach |
| **Material Design** | Subtle shadows, elevation, ripple effects | [m3.material.io](https://m3.material.io/) |
| **Neumorphism** | Soft UI, embossed look, light + dark shadows | [87 CSS examples](https://freefrontend.com/css-neumorphism-examples/) |
| **Glassmorphism** | Frosted glass, backdrop blur, transparency | [12 UI features & examples](https://uxpilot.ai/blogs/glassmorphism-ui) |
| **Neobrutalism** | Bold borders, high contrast, raw aesthetics | [Neobrutalism components](https://www.shadcn.io/template/ekmas-neobrutalism-components) |
| **Skeuomorphism** | Realistic textures, mimics physical objects | Classic iOS pre-7 |

### CSS Examples Collections

- [87 CSS Neumorphism Examples](https://freefrontend.com/css-neumorphism-examples/) — FreeFrontend
- [44 CSS Glassmorphism Examples](https://wpdean.com/css-glassmorphism/) — WPDean
- [185 CSS Cards](https://freefrontend.com/css-cards/) — FreeFrontend
- [50 Microinteraction Examples](https://codemyui.com/tag/microinteractions/) — CodeMyUI
- [54 Input Field Design Examples](https://www.eleken.co/blog-posts/input-field-design) — Eleken

---

## Animation & Motion

### Libraries for Implementation

| Library | Size | Best for | Link |
|---|---|---|---|
| **Motion (Framer Motion)** | ~32KB | React declarative animations, scroll-linked | [motion.dev](https://motion.dev) |
| **GSAP** | ~23KB | Complex timelines, framework-agnostic, precise control | [gsap.com](https://gsap.com/) |
| **React Spring** | ~20KB | Physics-based, gestures, Three.js | [react-spring.dev](https://www.react-spring.dev/) |
| **Tailwind CSS Motion** | ~5KB | Pure CSS animations via Tailwind classes | CSS-only |
| **Auto Animate** | ~2KB | Drop-in transition animations | [auto-animate.formkit.com](https://auto-animate.formkit.com/) |

### Animation Reference Collections

- [Aceternity UI Components](https://ui.aceternity.com/components) — 200+ animated components with code
- [Awwwards Animation Collection](https://www.awwwards.com/awwwards/collections/animation/) — Curated web animation inspiration
- [CodeMyUI Microinteractions](https://codemyui.com/tag/microinteractions/) — 50+ coded examples
- [UI Microinteractions Collection](https://medium.com/@alexpronsky/collection-of-ui-microinteractions-ea66e4da34aa) — Curated Medium collection

---

## UX Patterns

### Empty States

- [Mobbin Empty State Glossary](https://mobbin.com/glossary/empty-state) — Real app examples
- [Carbon Empty States Pattern](https://carbondesignsystem.com/patterns/empty-states-pattern/) — IBM's approach
- [Blank Slate UI: 20 Examples](https://userpilot.com/blog/blank-slate-ui-design-examples/) — Userpilot
- [Empty State UX Rules](https://www.eleken.co/blog-posts/empty-state-ux) — Eleken
- [NN/g: Designing Empty States](https://www.nngroup.com/articles/empty-state-interface-design/) — Nielsen Norman Group

### Navigation Patterns

- [9 Mobile Navigation Patterns: Pros & Cons](https://medium.com/@lyubovkurach/9-mobile-navigation-patterns-usage-pros-cons-45ba10d6f59e) — Lyubov Kurach
- [Mobile Navigation UX (2026)](https://www.designstudiouiux.com/blog/mobile-navigation-ux/) — Design Studio
- [Bottom Tab Bar Best Practices](https://uxplanet.org/bottom-tab-bar-navigation-design-best-practices-48d46a3b0c36) — UX Planet
- [Mobile Navigation Patterns & Examples](https://www.justinmind.com/blog/mobile-navigation/) — Justinmind

### Form Design

- [54 Input Field Design Examples](https://www.eleken.co/blog-posts/input-field-design) — Eleken
- [Material Design Text Fields](https://mui.com/material-ui/react-text-field/) — MUI (filled, outlined, standard variants)
- [Smashing Mag: Material Text Fields Critique](https://www.smashingmagazine.com/2021/02/material-design-text-fields/) — UX analysis

---

## Design Inspiration (Browse Real Apps)

| Platform | Focus | Link |
|---|---|---|
| **Mobbin** | Real mobile + web app screenshots, filterable by pattern | [mobbin.com](https://mobbin.com) |
| **Banani** | 1000+ screens, free, no registration | [banani.co/references](https://www.banani.co/references) |
| **Refero** | Web-first UI research, SaaS patterns | Referenced in [Product Hunt](https://www.producthunt.com/products/mobbin/alternatives) |
| **Appshots** | Screen recordings showing transitions + timing | Referenced in Mobbin alternatives |
| **Dribbble** | Visual design inspiration (concept work) | [dribbble.com](https://dribbble.com) |
| **Awwwards** | Award-winning web design | [awwwards.com](https://www.awwwards.com/) |
| **SaaS Landing Page** | SaaS-specific design inspiration | [saaslandingpage.com](https://saaslandingpage.com/) |

---

## Icon Libraries

| Library | Icons | Styles | Link |
|---|---|---|---|
| **Phosphor** | 6,000+ | Thin, light, regular, bold, fill, duotone | [phosphoricons.com](https://phosphoricons.com/) |
| **Tabler** | 5,862+ | Outline, filled | [tabler.io/icons](https://tabler.io/icons) |
| **Lucide** | 1,000+ | Stroke-based (Feather fork) | [lucide.dev](https://lucide.dev/) |
| **Heroicons** | 290+ | Outline, solid (by Tailwind Labs) | [heroicons.com](https://heroicons.com/) |
| **Feather** | 287 | Minimalist stroke | [feathericons.com](https://feathericons.com/) |

---

## Design Tokens Standard

The W3C Design Tokens spec reached its **first stable version** in October 2025. This is the standard format for our config export.

- [W3C Design Tokens Spec (2025.10)](https://www.designtokens.org/tr/drafts/format/) — Official spec
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — W3C community
- [Style Dictionary](https://styledictionary.com/) — Transform tokens to any platform (CSS, iOS, Android, Tailwind)
- [Style Dictionary + Tailwind integration](https://www.michaelmang.dev/blog/integrating-design-tokens-with-tailwind/) — Michael Mangialardi
- [Figma to Tailwind via Style Dictionary](https://www.xtivia.com/blog/bringing-your-figma-design-system-to-tailwind-using-style-dictionary/) — Xtivia

---

## MCP Server Reference (Phase 8)

Architecture and implementation reference from agentation.dev.

| Resource | What it is |
|---|---|
| **Agentation repo** | `/Users/bastianvidela/agentation` — local clone, full reference implementation |
| **MCP SDK** | `@modelcontextprotocol/sdk` — official MCP TypeScript SDK |
| **Claude Code MCP docs** | How to add MCP servers to Claude Code config |

### Key patterns from agentation:
- **Single source of truth**: HTTP server holds state, MCP is a thin client that fetches on demand
- **Event-driven**: EventBus pub/sub enables real-time SSE streams without polling
- **Stateless MCP**: stdio-based, survives reconnects via sequence-based event replay
- **CLI setup**: `npx <tool> init` adds the MCP server to `~/.claude.json` automatically
- **SSE watch**: blocking tool that waits for state changes, returns batch after collection window

---

## Concerns & Things to Check Yourself

A few links where I'd suggest you browse and form your own opinion:

1. **Neumorphism accessibility** — it can have contrast issues. Browse the [CSS-Tricks article](https://css-tricks.com/neumorphism-and-css/) and decide if you want it in the catalog (I'd include it with a warning label).

2. **Glassmorphism performance** — `backdrop-filter: blur()` can be expensive on mobile. The [Fineart agency guide](https://fineartdesign.agency/how-to-use-neo-brutalism-and-glassmorphism-without-ruining-your-ux/) covers when to use/avoid it.

3. **Material Design text field critique** — Smashing Magazine argues floating labels have UX problems. Worth reading: [Material Design Text Fields Are Badly Designed](https://www.smashingmagazine.com/2021/02/material-design-text-fields/). We'll still include them (they're ubiquitous) but it's good to know the trade-offs.

4. **Squircle browser support** — `corner-shape: squircle` is Chrome 139+ only as of mid-2025. We'll need a CSS fallback for other browsers. Check [Frontend Masters deep dive](https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/).

5. **Animation performance** — Framer Motion at 32KB is heavier than pure CSS solutions. For the catalog app itself it's fine, but for mobile apps consider lighter alternatives. [LogRocket comparison](https://blog.logrocket.com/best-react-animation-libraries/).

6. **DaisyUI's 30+ themes** — Worth browsing to see how they achieve variety with the same components. Their [theme comparison](https://daisyui.com/docs/themes/) could inspire our catalog structure.
