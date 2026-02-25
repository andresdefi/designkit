import { createMcpServer } from "./server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { execFileSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const args = process.argv.slice(2);
const command = args[0] ?? "server";

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
      stdio: "inherit",
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

  // Check Node version
  const nodeVersion = process.versions.node;
  const major = parseInt(nodeVersion.split(".")[0], 10);
  if (major >= 18) {
    console.log(`  Node.js ${nodeVersion} ... ok`);
  } else {
    console.log(`  Node.js ${nodeVersion} ... FAIL (need >= 18)`);
    allPassed = false;
  }

  // Check state file
  const stateFile = join(homedir(), ".designkit", "state.json");
  if (existsSync(stateFile)) {
    try {
      const raw = readFileSync(stateFile, "utf-8");
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

  // Check Claude Code config
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

  // Check dev server
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

async function checkDevServer(): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:3000/api/designkit/state");
    return res.ok || res.status === 404;
  } catch {
    return false;
  }
}

function runServer() {
  const httpUrlIndex = args.indexOf("--http-url");
  const httpUrl =
    httpUrlIndex !== -1 && args[httpUrlIndex + 1]
      ? args[httpUrlIndex + 1]
      : "http://localhost:3000";

  const server = createMcpServer(httpUrl);
  const transport = new StdioServerTransport();

  server.connect(transport).catch((err) => {
    console.error("Failed to start MCP server:", err);
    process.exit(1);
  });
}
