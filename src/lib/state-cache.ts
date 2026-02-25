import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import type { DesignKitState } from "./resolve-config";

const STATE_DIR = join(homedir(), ".designkit");
const STATE_FILE = join(STATE_DIR, "state.json");

let cached: DesignKitState | null = null;

export function getState(): DesignKitState | null {
  if (cached) return cached;

  try {
    const raw = readFileSync(STATE_FILE, "utf-8");
    cached = JSON.parse(raw) as DesignKitState;
    return cached;
  } catch {
    return null;
  }
}

export function setState(state: DesignKitState): void {
  cached = state;

  try {
    mkdirSync(STATE_DIR, { recursive: true });
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch {
    // Disk write is best-effort; memory cache is primary
  }
}
