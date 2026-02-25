# DesignKit

DesignKit is a browser-based design identity builder. Users assemble colors, typography, spacing, radius, shadows, buttons, and inputs via the UI. The MCP server exposes these live selections to Claude Code.

## MCP Tools

When building UI for a project that uses DesignKit, use these tools to match the user's chosen design identity:

| Tool | When to use |
|------|-------------|
| `designkit_get_config` | Building a full screen or page — gives you everything (colors, typography, spacing, radius, shadows, component prefs) |
| `designkit_get_colors` | You only need colors (light + dark mode + primary scale) |
| `designkit_get_typography` | You only need fonts and type scale |
| `designkit_get_selections` | You want to see raw selection IDs without resolved tokens |
| `designkit_get_export` | You need a specific export format (`json`, `css`, `tailwind`, `swift`, `kotlin`, `claude-md`) |
| `designkit_get_token` | Quick lookup of a single value by dot-path (e.g. `colors.light.primary`, `spacing.scale.4`) |

## Workflow

1. Start the dev server: `npm run dev`
2. Open DesignKit in the browser and make design selections
3. Selections auto-sync to the API and disk (`~/.designkit/state.json`)
4. In Claude Code, call `designkit_get_config` to get the full resolved config
5. Use the tokens when generating UI code

## Setup

```bash
cd mcp && npm install && npm run build
npx designkit-mcp init      # registers with Claude Code
npx designkit-mcp doctor    # verify everything is connected
```

## Rules

- Always use the design tokens from DesignKit when building UI — never hardcode colors, fonts, or spacing
- Support both light and dark mode using the color tokens
- Use the component preferences (button style, input style) to match the user's chosen patterns
- When the user says "use my design system" or "match my DesignKit config", call `designkit_get_config` first
