"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useDesignKit } from "@/lib/store";
import { buildConfig } from "@/lib/resolve-config";
import type { DesignConfig } from "@/lib/types";
import type { Category } from "@/lib/types";
import {
  exportJSON,
  exportCSS,
  exportTailwind,
  exportSwift,
  exportKotlin,
  exportFlutter,
  exportReactNative,
  exportClaudeMd,
} from "@/lib/export";
import JSZip from "jszip";

const FORMATS = [
  { id: "json", label: "JSON Tokens", ext: "design-tokens.json", description: "Universal design tokens" },
  { id: "css", label: "CSS Variables", ext: "design-tokens.css", description: "CSS custom properties" },
  { id: "tailwind", label: "Tailwind Config", ext: "tailwind.config.ts", description: "Tailwind CSS theme config" },
  { id: "swift", label: "Swift", ext: "Theme.swift", description: "SwiftUI adaptive colors" },
  { id: "kotlin", label: "Kotlin", ext: "Theme.kt", description: "Material3 Compose theme" },
  { id: "flutter", label: "Flutter", ext: "theme.dart", description: "Flutter ThemeData + colors" },
  { id: "react-native", label: "React Native", ext: "theme.ts", description: "TypeScript theme constants" },
  { id: "claude", label: "CLAUDE.md", ext: "CLAUDE.md", description: "AI design rules for Claude" },
] as const;

type FormatId = (typeof FORMATS)[number]["id"];

type TokenFormat = "css" | "js" | "swift" | "kotlin";

interface FlatToken {
  path: string;
  value: string;
  group: string;
}

function flattenTokens(config: DesignConfig): FlatToken[] {
  const result: FlatToken[] = [];

  if (config.tokens.colors) {
    const c = config.tokens.colors;
    for (const [key, val] of Object.entries(c.light)) {
      if (typeof val === "string") {
        result.push({ path: `colors.light.${key}`, value: val, group: "Colors (Light)" });
      } else if (typeof val === "object" && val !== null) {
        for (const [sk, sv] of Object.entries(val as Record<string, string>)) {
          result.push({ path: `colors.light.${key}.${sk}`, value: sv, group: "Colors (Light)" });
        }
      }
    }
    for (const [key, val] of Object.entries(c.dark)) {
      if (typeof val === "string") {
        result.push({ path: `colors.dark.${key}`, value: val, group: "Colors (Dark)" });
      } else if (typeof val === "object" && val !== null) {
        for (const [sk, sv] of Object.entries(val as Record<string, string>)) {
          result.push({ path: `colors.dark.${key}.${sk}`, value: sv, group: "Colors (Dark)" });
        }
      }
    }
  }

  if (config.tokens.typography) {
    const t = config.tokens.typography;
    result.push({ path: "typography.headingFont", value: t.headingFont, group: "Typography" });
    result.push({ path: "typography.bodyFont", value: t.bodyFont, group: "Typography" });
    for (const [key, step] of Object.entries(t.scale)) {
      result.push({ path: `typography.scale.${key}.size`, value: step.size, group: "Typography" });
      result.push({ path: `typography.scale.${key}.lineHeight`, value: step.lineHeight, group: "Typography" });
      result.push({ path: `typography.scale.${key}.weight`, value: String(step.weight), group: "Typography" });
    }
  }

  if (config.tokens.spacing) {
    for (const [key, val] of Object.entries(config.tokens.spacing.scale)) {
      result.push({ path: `spacing.${key}`, value: val, group: "Spacing" });
    }
  }

  if (config.tokens.radius) {
    for (const [key, val] of Object.entries(config.tokens.radius)) {
      result.push({ path: `radius.${key}`, value: val, group: "Radius" });
    }
  }

  if (config.tokens.shadows) {
    for (const [key, val] of Object.entries(config.tokens.shadows)) {
      result.push({ path: `shadows.${key}`, value: val, group: "Shadows" });
    }
  }

  return result;
}

function formatTokenValue(path: string, value: string, format: TokenFormat): string {
  const lastKey = path.split(".").pop() ?? path;
  const isColor = path.startsWith("colors.");

  switch (format) {
    case "css": {
      const varName = path.replace(/\./g, "-");
      return `--${varName}: ${value};`;
    }
    case "js":
      return `${lastKey}: "${value}",`;
    case "swift": {
      if (isColor && value.startsWith("#")) {
        const clean = value.replace("#", "");
        const r = parseInt(clean.substring(0, 2), 16) / 255;
        const g = parseInt(clean.substring(2, 4), 16) / 255;
        const b = parseInt(clean.substring(4, 6), 16) / 255;
        return `static let ${lastKey} = Color(red: ${r.toFixed(3)}, green: ${g.toFixed(3)}, blue: ${b.toFixed(3)})`;
      }
      return `static let ${lastKey} = "${value}"`;
    }
    case "kotlin": {
      if (isColor && value.startsWith("#")) {
        const clean = value.replace("#", "").toUpperCase();
        return `val ${lastKey.charAt(0).toUpperCase() + lastKey.slice(1)} = Color(0xFF${clean})`;
      }
      return `val ${lastKey.charAt(0).toUpperCase() + lastKey.slice(1)} = "${value}"`;
    }
  }
}

export function ExportModal({ onClose }: { onClose: () => void }) {
  const { selections, colorPicks, typeScale, select, pickColor, resetAll } = useDesignKit();
  const [selectedFormats, setSelectedFormats] = useState<Set<FormatId>>(new Set(["json"]));
  const [copied, setCopied] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "tokens">("preview");
  const [tokenFormat, setTokenFormat] = useState<TokenFormat>("css");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  function toggleFormat(id: FormatId) {
    setSelectedFormats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function generateOutput(formatId: FormatId): string {
    const config = buildConfig({ selections, colorPicks, typeScale });
    switch (formatId) {
      case "json": return exportJSON(config);
      case "css": return exportCSS(config);
      case "tailwind": return exportTailwind(config);
      case "swift": return exportSwift(config);
      case "kotlin": return exportKotlin(config);
      case "flutter": return exportFlutter(config);
      case "react-native": return exportReactNative(config);
      case "claude": return exportClaudeMd(config);
    }
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDownload() {
    const selected = FORMATS.filter((f) => selectedFormats.has(f.id));

    if (selected.length >= 2) {
      const zip = new JSZip();
      for (const format of selected) {
        zip.file(format.ext, generateOutput(format.id));
      }
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, "designkit-export.zip");
    } else {
      for (const format of selected) {
        const content = generateOutput(format.id);
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        downloadBlob(blob, format.ext);
      }
    }
  }

  async function handleCopy(text: string, id: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function handleImportFile(file: File) {
    setImportError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!data.selections || typeof data.selections !== "object") {
          setImportError("Invalid config: missing 'selections' object");
          return;
        }
        resetAll();
        for (const [cat, itemId] of Object.entries(data.selections)) {
          if (typeof itemId === "string") {
            select(cat as Category, itemId);
          }
        }
        if (data.colorPicks && typeof data.colorPicks === "object") {
          const cp = data.colorPicks as { light?: Record<string, string>; dark?: Record<string, string> };
          if (cp.light) {
            for (const [key, value] of Object.entries(cp.light)) {
              pickColor("light", key, value);
            }
          }
          if (cp.dark) {
            for (const [key, value] of Object.entries(cp.dark)) {
              pickColor("dark", key, value);
            }
          }
        }
        setImporting(false);
        onClose();
      } catch {
        setImportError("Failed to parse JSON file");
      }
    };
    reader.readAsText(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.name.endsWith(".json")) {
      handleImportFile(file);
    } else {
      setImportError("Please drop a .json file");
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Preview the first selected format
  const previewFormat = [...selectedFormats][0];
  const previewContent = previewFormat ? generateOutput(previewFormat) : "";

  // Token browser data
  const config = buildConfig({ selections, colorPicks, typeScale });
  const allTokens = flattenTokens(config);
  const groups = [...new Set(allTokens.map((t) => t.group))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-app-bg border border-app-border rounded-2xl shadow-2xl w-[780px] max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-app-border shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-app-text">Export Design Config</h2>
            <p className="text-xs text-app-text-muted mt-0.5">
              Choose formats and download your design tokens
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-app-text-muted hover:text-app-text transition-colors text-lg leading-none p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Format selection */}
        <div className="px-6 py-4 border-b border-app-border shrink-0">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted mb-2">
            Formats
          </div>
          <div className="grid grid-cols-4 gap-2">
            {FORMATS.map((format) => {
              const isSelected = selectedFormats.has(format.id);
              return (
                <button
                  key={format.id}
                  onClick={() => toggleFormat(format.id)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-app-border hover:border-app-border-hover hover:bg-app-card-bg-hover"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${isSelected ? "text-blue-400" : "text-app-text"}`}>
                      {format.label}
                    </span>
                    {isSelected && <span className="text-blue-400 text-[10px]">✓</span>}
                  </div>
                  <div className="text-[10px] text-app-text-muted mt-0.5 truncate">{format.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Import overlay */}
        {importing ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 min-h-0">
            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-full max-w-md border-2 border-dashed border-app-border rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors"
            >
              <div className="text-sm text-app-text mb-2">Drop a .json config file here</div>
              <div className="text-xs text-app-text-muted mb-4">or</div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                Browse files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportFile(file);
                }}
              />
              {importError && (
                <div className="mt-3 text-xs text-red-400">{importError}</div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* View toggle + Preview/Tokens */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("preview")}
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded transition-colors ${
                      viewMode === "preview"
                        ? "bg-blue-500/15 text-blue-400"
                        : "text-app-text-muted hover:text-app-text"
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setViewMode("tokens")}
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded transition-colors ${
                      viewMode === "tokens"
                        ? "bg-blue-500/15 text-blue-400"
                        : "text-app-text-muted hover:text-app-text"
                    }`}
                  >
                    Tokens
                  </button>
                </div>
                {viewMode === "preview" && previewFormat && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-app-text-muted">
                      {FORMATS.find((f) => f.id === previewFormat)?.ext}
                    </span>
                    <button
                      onClick={() => handleCopy(previewContent, `preview-${previewFormat}`)}
                      className="text-[10px] text-app-text-secondary hover:text-blue-400 transition-colors"
                    >
                      {copied === `preview-${previewFormat}` ? "Copied!" : "Copy to clipboard"}
                    </button>
                  </div>
                )}
                {viewMode === "tokens" && (
                  <select
                    value={tokenFormat}
                    onChange={(e) => setTokenFormat(e.target.value as TokenFormat)}
                    className="text-[10px] bg-app-surface border border-app-border rounded px-2 py-1 text-app-text"
                  >
                    <option value="css">CSS</option>
                    <option value="js">JS</option>
                    <option value="swift">Swift</option>
                    <option value="kotlin">Kotlin</option>
                  </select>
                )}
              </div>

              {viewMode === "preview" ? (
                <div className="flex-1 overflow-auto rounded-lg border border-app-border bg-app-surface p-4">
                  <pre className="text-[11px] font-mono text-app-text-secondary whitespace-pre-wrap break-all leading-relaxed">
                    {previewContent}
                  </pre>
                </div>
              ) : (
                <div className="flex-1 overflow-auto rounded-lg border border-app-border bg-app-surface">
                  {groups.map((group) => {
                    const groupTokens = allTokens.filter((t) => t.group === group);
                    return (
                      <div key={group}>
                        <div className="sticky top-0 bg-app-surface/95 backdrop-blur-sm px-4 py-2 border-b border-app-border">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted">
                            {group}
                          </span>
                        </div>
                        {groupTokens.map((token) => {
                          const formatted = formatTokenValue(token.path, token.value, tokenFormat);
                          return (
                            <div
                              key={token.path}
                              className="flex items-center gap-3 px-4 py-1.5 border-b border-app-border/50 hover:bg-app-card-bg-hover transition-colors"
                            >
                              {token.value.startsWith("#") && (
                                <div
                                  className="w-3 h-3 rounded-sm shrink-0 border border-app-border"
                                  style={{ backgroundColor: token.value }}
                                />
                              )}
                              <span className="text-[10px] font-mono text-app-text-muted flex-1 truncate">
                                {token.path}
                              </span>
                              <span className="text-[10px] font-mono text-app-text-secondary shrink-0">
                                {token.value}
                              </span>
                              <button
                                onClick={() => handleCopy(formatted, token.path)}
                                className="text-[10px] text-app-text-muted hover:text-blue-400 transition-colors shrink-0"
                              >
                                {copied === token.path ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-app-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-xs text-app-text-muted">
              {selectedFormats.size} format{selectedFormats.size !== 1 ? "s" : ""} selected
              {selectedFormats.size >= 2 && " (ZIP)"}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setImporting((prev) => !prev);
                setImportError(null);
              }}
              className="px-4 py-2 text-xs text-app-text-secondary hover:text-app-text border border-app-border rounded-lg transition-colors"
            >
              {importing ? "Back" : "Import"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-app-text-secondary hover:text-app-text border border-app-border rounded-lg transition-colors"
            >
              Cancel
            </button>
            {!importing && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                Download {selectedFormats.size >= 2 ? "ZIP" : ""}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
