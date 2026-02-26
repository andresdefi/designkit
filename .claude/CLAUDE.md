# DesignKit

DesignKit is a browser-based design identity builder. Users assemble colors, typography, spacing, radius, shadows, components, patterns, and motion via the UI. The MCP server exposes these live selections to Claude Code.

---

## Section 1: Using DesignKit (Consumer Guide)

### MCP Tools

When building UI for a project that uses DesignKit, use these tools to match the user's chosen design identity:

| Tool | When to use |
|------|-------------|
| `designkit_get_config` | Building a full screen or page — gives you everything (colors, typography, spacing, radius, shadows, component prefs) |
| `designkit_get_colors` | You only need colors (light + dark mode + primary scale) |
| `designkit_get_typography` | You only need fonts and type scale |
| `designkit_get_selections` | You want to see raw selection IDs without resolved tokens |
| `designkit_get_export` | You need a specific export format (`json`, `css`, `tailwind`, `swift`, `kotlin`, `flutter`, `react-native`, `claude-md`) |
| `designkit_get_token` | Quick lookup of a single value by dot-path (e.g. `colors.light.primary`, `spacing.scale.4`) |

### Workflow

1. Start the dev server: `npm run dev`
2. Open DesignKit in the browser and make design selections
3. Selections auto-sync to the API and disk (`~/.designkit/state.json`)
4. In Claude Code, call `designkit_get_config` to get the full resolved config
5. Use the tokens when generating UI code

### Setup

```bash
cd mcp && npm install && npm run build
npx designkit-mcp init      # registers with Claude Code
npx designkit-mcp doctor    # verify everything is connected
```

### Rules

- Always use the design tokens from DesignKit when building UI — never hardcode colors, fonts, or spacing
- Support both light and dark mode using the color tokens
- Use the component preferences (button style, input style, etc.) to match the user's chosen patterns
- When the user says "use my design system" or "match my DesignKit config", call `designkit_get_config` first

### Using Component CSS from the Config

Each `*Details` object in `componentPreferences` contains the **full CSS properties** for that component. Apply these values directly — do not guess or approximate the styling.

**Stateful CSS** (buttons, inputs) — has `css.default`, `css.hover`, `css.active`, `css.disabled`:
```json
"buttonStyleDetails": {
  "css": {
    "default": { "borderRadius": "6px", "boxShadow": "0 5px 0 rgba(0,0,0,0.3)", "transition": "transform 80ms ease, box-shadow 80ms ease" },
    "hover": { "boxShadow": "0 6px 0 rgba(0,0,0,0.3)", "transform": "translateY(-1px)" },
    "active": { "boxShadow": "0 1px 0 rgba(0,0,0,0.3)", "transform": "translateY(4px)" },
    "disabled": { "opacity": "0.5", "cursor": "not-allowed" }
  }
}
```

**Flat CSS** (cards, badges, navigation, etc.) — has `css` as a direct `Record<string, string>`, often with `hoverCss` or variant-specific CSS fields (`panelCss`, `itemCss`, `activeItemCss`, etc.):
```json
"cardStyleDetails": {
  "css": { "borderRadius": "12px", "border": "1px solid rgba(0,0,0,0.1)" },
  "hoverCss": { "boxShadow": "0 8px 24px rgba(0,0,0,0.12)" }
}
```

Use the CSS property names directly as React `style` keys (they are already camelCase). For CSS classes or Tailwind, convert to kebab-case.

---

## Section 2: Contributing to DesignKit (Contributor Guide)

### Architecture Overview

```
src/
  app/          Next.js App Router pages — one route per category + API routes
  components/
    layout/     Sidebar, TopBar, SelectionPanel, ThemeProvider
    catalog/    CatalogGrid, CatalogCard (reusable grid + selection card)
    preview/    PreviewPanel (combined live preview of all selections)
    export/     ExportModal (multi-format export dialog)
    ui/         Shared UI primitives
  data/         One file per category, each exports a typed CatalogItem[] array
  lib/
    types.ts        ALL data type definitions — start here
    categories.ts   Category groups and metadata (id, label, group, description, icon)
    catalog-registry.ts  Maps every category to its item IDs — must update when adding items
    store.ts        Zustand state (selections, color picks, UI state) with localStorage + API sync
    export.ts       Export engine — generates JSON, CSS, Tailwind, Swift, Kotlin, Flutter, React Native, claude-md
  hooks/        Custom React hooks (e.g. useGoogleFonts)
mcp/            MCP server for Claude Code integration
public/         Static assets
```

### Key Files

- `src/lib/types.ts` — ALL data type definitions. Start here when learning the codebase.
- `src/lib/categories.ts` — Category metadata (id, label, group, description, icon). Sidebar auto-populates from this.
- `src/lib/catalog-registry.ts` — Maps every category to its item ID arrays. Must be updated when adding items.
- `src/lib/store.ts` — Zustand store. Selections are `Partial<Record<Category, string>>` (one item ID per category).
- `src/lib/resolve-config.ts` — Builds the full `DesignConfig` from state (resolves colors, typography, spacing, radius, shadows, component prefs).
- `src/lib/export.ts` — Export engine. Formats the resolved config into JSON, CSS, Tailwind, Swift, Kotlin, Flutter, React Native, and claude-md.
- `src/data/DATA_FORMATS.md` — Detailed schema docs with examples for every data type (if it exists; otherwise refer to types.ts).

### How to Add a New Catalog Item

1. Open `src/data/{category}.ts`
2. Add a new entry to the exported array, following `CatalogItem<T>` where T is the category's data type (e.g. `ButtonStyleData`, `CardStyleData`)
3. The item ID must be kebab-case and unique within its category
4. Add the new item's ID to `src/lib/catalog-registry.ts` in the corresponding category array (IDs are hardcoded for performance — the registry does not import data files)
5. Verify: item appears in the catalog grid, is selectable, shows in preview panel, and exports correctly

### How to Add a New Category

1. Add the category ID to the `Category` union type in `src/lib/types.ts`
2. Define the data type (e.g. `NewStyleData`) in `src/lib/types.ts`
3. Create `src/data/{new-category}.ts` exporting a `CatalogItem<NewStyleData>[]` array
4. Add the new category's item IDs to `src/lib/catalog-registry.ts` (hardcoded ID array — no imports)
5. Add metadata in `src/lib/categories.ts` (id, label, group, description, icon)
6. Create `src/app/{new-category}/page.tsx` — follow existing page patterns (use `TopBar`, `CatalogGrid`, `CatalogCard` or custom cards)
7. Update `src/lib/export.ts` to include the new category in `DesignConfig.componentPreferences`
8. Sidebar auto-populates from `categories.ts` — no manual sidebar edit needed

### Code Conventions

- React 19, Next.js App Router, TypeScript strict mode
- Functional components, named exports preferred
- Tailwind CSS 4 for styling
- `app-*` CSS classes for theme-aware styling (e.g. `app-bg`, `app-text`, `app-border`, `app-card-bg`, `app-card-bg-hover`, `app-card-bg-selected`)
- All catalog items use the `CatalogItem<T>` wrapper type from `types.ts`
- Item IDs are kebab-case, unique within their category
- Color token placeholders in CSS data (e.g. `__primaryBg`, `__hoverBg`, `__hoverText`, `__hoverShadow`) — these are resolved at render time by page components, not raw CSS. The `__` prefix marks keys for special color-strategy resolution (see `buttons/page.tsx` for the pattern).
- Animated items must respect `prefers-reduced-motion` — wrap animations in `@media (prefers-reduced-motion: no-preference)`
- State management: one Zustand store (`useDesignKit`), persisted to localStorage, auto-synced to `/api/designkit/state`
- The layout uses `h-dvh` (not `h-screen`) with Sidebar | main | PreviewPanel | SelectionPanel

### Testing After Changes

- Run `npm run dev` and verify the item renders in its category page
- Click to select/deselect — verify selection state toggles correctly
- Check the combined preview panel reflects the selection
- Export (JSON, CSS, Tailwind) and verify the new item's tokens appear in output
- Test both light and dark mode (toggle via the app theme switcher)
- For animated items: verify animation plays and stops with `prefers-reduced-motion: reduce`
