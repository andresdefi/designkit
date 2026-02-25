#!/usr/bin/env node

// src/server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
var STATE_FILE = join(homedir(), ".designkit", "state.json");
async function fetchApi(path, opts) {
  const url = `${opts.httpUrl}${path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }
    return await res.text();
  } catch (err) {
    if (err instanceof TypeError && (err.message.includes("fetch failed") || err.message.includes("ECONNREFUSED"))) {
      throw new Error(`Dev server unreachable at ${opts.httpUrl}. Is 'npm run dev' running?`);
    }
    throw err;
  }
}
function readDiskState() {
  try {
    const raw = readFileSync(STATE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function getNestedValue(obj, path) {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return void 0;
    current = current[part];
  }
  return current;
}
function createMcpServer(httpUrl = "http://localhost:3000") {
  const opts = { httpUrl };
  const server = new McpServer({
    name: "designkit",
    version: "0.1.0"
  });
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
                text: `[Fallback: raw state from disk \u2014 dev server not reachable]

${JSON.stringify(state, null, 2)}`
              }
            ]
          };
        }
        return {
          content: [
            {
              type: "text",
              text: "No DesignKit state available. Open DesignKit in the browser (npm run dev) and make some selections first."
            }
          ]
        };
      }
    }
  );
  server.tool(
    "designkit_get_colors",
    "Get just the color system (light mode, dark mode, primary scale). Use when you only need colors.",
    {},
    async () => {
      try {
        const config = await fetchApi("/api/designkit/config", opts);
        const tokens = config.tokens;
        const colors = tokens?.colors;
        if (!colors) {
          return {
            content: [{ type: "text", text: "No color palette selected in DesignKit." }]
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
                text: `[Fallback: raw color picks from disk]

${JSON.stringify(colorPicks, null, 2)}`
              }
            ]
          };
        }
        return {
          content: [{ type: "text", text: "No color data available." }]
        };
      }
    }
  );
  server.tool(
    "designkit_get_typography",
    "Get font families and the full type scale. Use when you need typography info.",
    {},
    async () => {
      try {
        const config = await fetchApi("/api/designkit/config", opts);
        const tokens = config.tokens;
        const typography = tokens?.typography;
        if (!typography) {
          return {
            content: [{ type: "text", text: "No typography selected in DesignKit." }]
          };
        }
        return { content: [{ type: "text", text: JSON.stringify(typography, null, 2) }] };
      } catch {
        return {
          content: [{ type: "text", text: "Could not fetch typography. Is the dev server running?" }]
        };
      }
    }
  );
  server.tool(
    "designkit_get_selections",
    "Get the raw selection IDs per category. Useful for checking what the user has picked without resolving tokens.",
    {},
    async () => {
      try {
        const state = await fetchApi("/api/designkit/state", opts);
        return { content: [{ type: "text", text: JSON.stringify(state, null, 2) }] };
      } catch {
        const state = readDiskState();
        if (state) {
          return {
            content: [
              {
                type: "text",
                text: `[Fallback: disk state]

${JSON.stringify(state, null, 2)}`
              }
            ]
          };
        }
        return {
          content: [{ type: "text", text: "No selections available." }]
        };
      }
    }
  );
  server.tool(
    "designkit_get_export",
    "Get the design tokens exported in a specific format. Formats: json, css, tailwind, swift, kotlin, claude-md.",
    { format: z.enum(["json", "css", "tailwind", "swift", "kotlin", "claude-md"]).describe("Export format") },
    async ({ format }) => {
      try {
        const text = await fetchApi(`/api/designkit/export/${format}`, opts);
        return { content: [{ type: "text", text: typeof text === "string" ? text : JSON.stringify(text, null, 2) }] };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `Could not export format "${format}". ${err instanceof Error ? err.message : "Unknown error"}`
            }
          ]
        };
      }
    }
  );
  server.tool(
    "designkit_get_token",
    "Get a single design token by dot-path (e.g. 'colors.light.primary', 'typography.headingFont', 'spacing.scale.4'). Use for quick lookups.",
    { path: z.string().describe("Dot-separated token path, e.g. 'colors.light.primary'") },
    async ({ path }) => {
      try {
        const config = await fetchApi("/api/designkit/config", opts);
        const tokens = config.tokens;
        const value = getNestedValue(tokens, path);
        if (value === void 0) {
          return {
            content: [
              {
                type: "text",
                text: `Token "${path}" not found. Available top-level keys: ${tokens ? Object.keys(tokens).join(", ") : "none"}`
              }
            ]
          };
        }
        const text = typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
        return { content: [{ type: "text", text }] };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `Could not fetch token. ${err instanceof Error ? err.message : "Unknown error"}`
            }
          ]
        };
      }
    }
  );
  return server;
}

// src/cli.ts
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { execFileSync } from "child_process";
import { existsSync, readFileSync as readFileSync2 } from "fs";
import { join as join2 } from "path";
import { homedir as homedir2 } from "os";
var args = process.argv.slice(2);
var command = args[0] ?? "server";
switch (command) {
  case "init":
    runInit();
    break;
  case "doctor":
    runDoctor();
    break;
  case "server":
    runServer();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error("Usage: designkit-mcp [init|doctor|server] [--http-url URL]");
    process.exit(1);
}
function runInit() {
  console.log("Registering DesignKit MCP server with Claude Code...\n");
  try {
    execFileSync("claude", ["mcp", "add", "designkit", "--", "npx", "designkit-mcp", "server"], {
      stdio: "inherit"
    });
    console.log("\nDesignKit MCP registered successfully.");
    console.log("Restart Claude Code to activate the tools.");
  } catch {
    console.error("Failed to register. Make sure Claude Code CLI is installed.");
    process.exit(1);
  }
}
function runDoctor() {
  let allPassed = true;
  const nodeVersion = process.versions.node;
  const major = parseInt(nodeVersion.split(".")[0], 10);
  if (major >= 18) {
    console.log(`  Node.js ${nodeVersion} ... ok`);
  } else {
    console.log(`  Node.js ${nodeVersion} ... FAIL (need >= 18)`);
    allPassed = false;
  }
  const stateFile = join2(homedir2(), ".designkit", "state.json");
  if (existsSync(stateFile)) {
    try {
      const raw = readFileSync2(stateFile, "utf-8");
      const state = JSON.parse(raw);
      const selectionCount = Object.keys(state.selections ?? {}).length;
      console.log(`  State file ... ok (${selectionCount} selections)`);
    } catch {
      console.log("  State file ... FAIL (corrupt JSON)");
      allPassed = false;
    }
  } else {
    console.log("  State file ... missing (open DesignKit and make selections first)");
    allPassed = false;
  }
  try {
    const result = execFileSync("claude", ["mcp", "list"], { encoding: "utf-8" });
    if (result.includes("designkit")) {
      console.log("  Claude MCP config ... ok (designkit registered)");
    } else {
      console.log("  Claude MCP config ... not registered (run: designkit-mcp init)");
      allPassed = false;
    }
  } catch {
    console.log("  Claude Code CLI ... not found");
    allPassed = false;
  }
  checkDevServer().then((ok) => {
    if (ok) {
      console.log("  Dev server ... ok (reachable)");
    } else {
      console.log("  Dev server ... not reachable (run: npm run dev)");
      allPassed = false;
    }
    console.log("");
    if (allPassed) {
      console.log("All checks passed.");
    } else {
      console.log("Some checks failed. See above for details.");
    }
  });
}
async function checkDevServer() {
  try {
    const res = await fetch("http://localhost:3000/api/designkit/state");
    return res.ok || res.status === 404;
  } catch {
    return false;
  }
}
function runServer() {
  const httpUrlIndex = args.indexOf("--http-url");
  const httpUrl = httpUrlIndex !== -1 && args[httpUrlIndex + 1] ? args[httpUrlIndex + 1] : "http://localhost:3000";
  const server = createMcpServer(httpUrl);
  const transport = new StdioServerTransport();
  server.connect(transport).catch((err) => {
    console.error("Failed to start MCP server:", err);
    process.exit(1);
  });
}
