import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import type { DesignKitState } from "./resolve-config";

const STATE_DIR = join(homedir(), ".designkit");
const STATE_FILE = join(STATE_DIR, "state.json");

export function getState(): DesignKitState | null {
  try {
    const raw = readFileSync(STATE_FILE, "utf-8");
    return JSON.parse(raw) as DesignKitState;
  } catch {
    return null;
  }
}

export function setState(state: DesignKitState): void {
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch {
    // Disk write failed — state lost
  }
}
