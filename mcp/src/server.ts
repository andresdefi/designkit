import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const STATE_FILE = join(homedir(), ".designkit", "state.json");

interface FetchOptions {
  httpUrl: string;
}

async function fetchApi<T>(path: string, opts: FetchOptions): Promise<T> {
  const url = `${opts.httpUrl}${path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }
    return (await res.text()) as unknown as T;
  } catch (err) {
    // Dev server unreachable — fallback to disk
    if (
      err instanceof TypeError &&
      (err.message.includes("fetch failed") || err.message.includes("ECONNREFUSED"))
    ) {
      throw new Error(`Dev server unreachable at ${opts.httpUrl}. Is 'npm run dev' running?`);
    }
    throw err;
  }
}

function readDiskState(): Record<string, unknown> | null {
  try {
    const raw = readFileSync(STATE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getNestedValue(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function createMcpServer(httpUrl: string = "http://localhost:3000") {
  const opts: FetchOptions = { httpUrl };

  const server = new McpServer({
    name: "designkit",
    version: "0.1.0",
  });

  // Tool 1: Full resolved config
  server.tool(
    "designkit_get_config",
    "Get the full resolved DesignConfig (colors, typography, spacing, radius, shadows, component prefs). Use this when building complete UI screens.",
    {},
    async () => {
      try {
        const config = await fetchApi("/api/designkit/config", opts);
        return { content: [{ type: "text", text: JSON.stringify(config, null, 2) }] };
      } catch {
        const state = readDiskState();
        if (state) {
          return {
            content: [
              {
                type: "text",
                text: `[Fallback: raw state from disk — dev server not reachable]\n\n${JSON.stringify(state, null, 2)}`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text",
              text: "No DesignKit state available. Open DesignKit in the browser (npm run dev) and make some selections first.",
            },
          ],
        };
      }
    }
  );

  // Tool 2: Colors only
  server.tool(
    "designkit_get_colors",
    "Get just the color system (light mode, dark mode, primary scale). Use when you only need colors.",
    {},
    async () => {
      try {
        const config = await fetchApi<Record<string, unknown>>("/api/designkit/config", opts);
        const tokens = config.tokens as Record<string, unknown> | undefined;
        const colors = tokens?.colors;
        if (!colors) {
          return {
            content: [{ type: "text", text: "No color palette selected in DesignKit." }],
          };
        }
        return { content: [{ type: "text", text: JSON.stringify(colors, null, 2) }] };
      } catch {
        const state = readDiskState();
        const colorPicks = state?.colorPicks;
        if (colorPicks) {
          return {
            content: [
              {
                type: "text",
                text: `[Fallback: raw color picks from disk]\n\n${JSON.stringify(colorPicks, null, 2)}`,
              },
            ],
          };
        }
        return {
          content: [{ type: "text", text: "No color data available." }],
        };
      }
    }
  );

  // Tool 3: Typography only
  server.tool(
    "designkit_get_typography",
    "Get font families and the full type scale. Use when you need typography info.",
    {},
    async () => {
      try {
        const config = await fetchApi<Record<string, unknown>>("/api/designkit/config", opts);
        const tokens = config.tokens as Record<string, unknown> | undefined;
        const typography = tokens?.typography;
        if (!typography) {
          return {
            content: [{ type: "text", text: "No typography selected in DesignKit." }],
          };
        }
        return { content: [{ type: "text", text: JSON.stringify(typography, null, 2) }] };
      } catch {
        return {
          content: [{ type: "text", text: "Could not fetch typography. Is the dev server running?" }],
        };
      }
    }
  );

  // Tool 4: Raw selections
  server.tool(
    "designkit_get_selections",
    "Get the raw selection IDs per category. Useful for checking what the user has picked without resolving tokens.",
    {},
    async () => {
      try {
        const state = await fetchApi<Record<string, unknown>>("/api/designkit/state", opts);
        return { content: [{ type: "text", text: JSON.stringify(state, null, 2) }] };
      } catch {
        const state = readDiskState();
        if (state) {
          return {
            content: [
              {
                type: "text",
                text: `[Fallback: disk state]\n\n${JSON.stringify(state, null, 2)}`,
              },
            ],
          };
        }
        return {
          content: [{ type: "text", text: "No selections available." }],
        };
      }
    }
  );

  // Tool 5: Export in a specific format
  server.tool(
    "designkit_get_export",
    "Get the design tokens exported in a specific format. Formats: json, css, tailwind, swift, kotlin, claude-md.",
    { format: z.enum(["json", "css", "tailwind", "swift", "kotlin", "claude-md"]).describe("Export format") },
    async ({ format }) => {
      try {
        const text = await fetchApi<string>(`/api/designkit/export/${format}`, opts);
        return { content: [{ type: "text", text: typeof text === "string" ? text : JSON.stringify(text, null, 2) }] };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `Could not export format "${format}". ${err instanceof Error ? err.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );

  // Tool 6: Single token by dot-path
  server.tool(
    "designkit_get_token",
    "Get a single design token by dot-path (e.g. 'colors.light.primary', 'typography.headingFont', 'spacing.scale.4'). Use for quick lookups.",
    { path: z.string().describe("Dot-separated token path, e.g. 'colors.light.primary'") },
    async ({ path }) => {
      try {
        const config = await fetchApi<Record<string, unknown>>("/api/designkit/config", opts);
        const tokens = config.tokens;
        const value = getNestedValue(tokens, path);
        if (value === undefined) {
          return {
            content: [
              {
                type: "text",
                text: `Token "${path}" not found. Available top-level keys: ${tokens ? Object.keys(tokens as object).join(", ") : "none"}`,
              },
            ],
          };
        }
        const text = typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
        return { content: [{ type: "text", text }] };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `Could not fetch token. ${err instanceof Error ? err.message : "Unknown error"}`,
            },
          ],
        };
      }
    }
  );

  return server;
}
