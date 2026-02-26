import type { DesignConfig, ColorMode, ColorPaletteData, TypographyData, SpacingData, RadiusData, ShadowData } from "./types";

// ============================================================
// JSON export — universal design tokens
// ============================================================

export function exportJSON(config: DesignConfig): string {
  return JSON.stringify(config, null, 2);
}

// ============================================================
// CSS custom properties export
// ============================================================

export function exportCSS(config: DesignConfig): string {
  const lines: string[] = ["/* DesignKit — Generated CSS Custom Properties */", ""];

  const { tokens } = config;

  if (tokens.colors) {
    lines.push("/* Colors — Light Mode */", ":root {");
    appendColorVars(lines, tokens.colors.light, "  ");
    lines.push("}", "");
    lines.push("/* Colors — Dark Mode */", '@media (prefers-color-scheme: dark) {', "  :root {");
    appendColorVars(lines, tokens.colors.dark, "    ");
    lines.push("  }", "}", "");
  }

  if (tokens.typography) {
    lines.push("/* Typography */", ":root {");
    lines.push(`  --font-heading: '${tokens.typography.headingFont}', sans-serif;`);
    lines.push(`  --font-body: '${tokens.typography.bodyFont}', sans-serif;`);
    if (tokens.typography.monoFont) {
      lines.push(`  --font-mono: '${tokens.typography.monoFont}', monospace;`);
    }
    const scale = tokens.typography.scale;
    for (const [key, step] of Object.entries(scale)) {
      lines.push(`  --text-${key}-size: ${step.size};`);
      lines.push(`  --text-${key}-line-height: ${step.lineHeight};`);
      lines.push(`  --text-${key}-weight: ${step.weight};`);
    }
    lines.push("}", "");
  }

  if (tokens.spacing) {
    lines.push("/* Spacing */", ":root {");
    for (const [key, val] of Object.entries(tokens.spacing.scale)) {
      lines.push(`  --space-${key}: ${val};`);
    }
    lines.push("}", "");
  }

  if (tokens.radius) {
    lines.push("/* Border Radius */", ":root {");
    for (const [key, val] of Object.entries(tokens.radius)) {
      lines.push(`  --radius-${key}: ${val};`);
    }
    lines.push("}", "");
  }

  if (tokens.shadows) {
    lines.push("/* Shadows */", ":root {");
    for (const [key, val] of Object.entries(tokens.shadows)) {
      lines.push(`  --shadow-${key}: ${val};`);
    }
    lines.push("}", "");
  }

  // Animation variables
  const animEntries: { key: string; details: { easing: string; duration: string; cssKeyframes?: string } }[] = [];
  const cp = config.componentPreferences;
  if (cp.buttonAnimationDetails) animEntries.push({ key: "button", details: cp.buttonAnimationDetails });
  if (cp.hoverAnimationDetails) animEntries.push({ key: "hover", details: cp.hoverAnimationDetails });
  if (cp.pageTransitionDetails) animEntries.push({ key: "page-transition", details: cp.pageTransitionDetails });
  if (cp.microInteractionDetails) animEntries.push({ key: "micro-interaction", details: cp.microInteractionDetails });
  if (cp.entranceAnimationDetails) animEntries.push({ key: "entrance", details: cp.entranceAnimationDetails });

  if (animEntries.length > 0) {
    lines.push("/* Animation */", ":root {");
    for (const { key, details } of animEntries) {
      lines.push(`  --ease-${key}: ${details.easing};`);
      lines.push(`  --duration-${key}: ${details.duration};`);
    }
    lines.push("}", "");

    for (const { details } of animEntries) {
      if (details.cssKeyframes) {
        lines.push(details.cssKeyframes, "");
      }
    }
  }

  // Component CSS classes
  appendComponentCssClasses(lines, config);

  return lines.join("\n");
}

function appendColorVars(lines: string[], colors: ColorMode, indent: string) {
  for (const [key, val] of Object.entries(colors as unknown as Record<string, unknown>)) {
    if (typeof val === "string") {
      lines.push(`${indent}--color-${camelToKebab(key)}: ${val};`);
    } else if (typeof val === "object" && val !== null) {
      for (const [subKey, subVal] of Object.entries(val as Record<string, string>)) {
        lines.push(`${indent}--color-${camelToKebab(key)}-${camelToKebab(subKey)}: ${subVal};`);
      }
    }
  }
}

// ============================================================
// Tailwind config export
// ============================================================

export function exportTailwind(config: DesignConfig): string {
  const { tokens } = config;
  const theme: Record<string, unknown> = {};

  if (tokens.colors) {
    const c = tokens.colors.light;
    theme.colors = {
      background: c.background,
      surface: c.surface,
      border: c.border,
      foreground: c.text,
      primary: { DEFAULT: c.primary, foreground: c.primaryForeground },
      secondary: { DEFAULT: c.secondary, foreground: c.secondaryForeground },
      accent: { DEFAULT: c.accent, foreground: c.accentForeground },
      success: c.semantic.success,
      warning: c.semantic.warning,
      error: c.semantic.error,
      info: c.semantic.info,
    };
  }

  if (tokens.radius) {
    theme.borderRadius = { ...tokens.radius };
  }

  if (tokens.shadows) {
    theme.boxShadow = { ...tokens.shadows };
  }

  if (tokens.spacing) {
    theme.spacing = { ...tokens.spacing.scale };
  }

  if (tokens.typography) {
    theme.fontFamily = {
      heading: [`'${tokens.typography.headingFont}'`, "sans-serif"],
      body: [`'${tokens.typography.bodyFont}'`, "sans-serif"],
    };
    if (tokens.typography.monoFont) {
      (theme.fontFamily as Record<string, unknown>).mono = [`'${tokens.typography.monoFont}'`, "monospace"];
    }

    const fontSize: Record<string, [string, { lineHeight: string; fontWeight: string }]> = {};
    for (const [key, step] of Object.entries(tokens.typography.scale)) {
      fontSize[key] = [step.size, { lineHeight: step.lineHeight, fontWeight: String(step.weight) }];
    }
    theme.fontSize = fontSize;
  }

  // Animation entries from component preferences
  const animConfig: Record<string, string> = {};
  const keyframeBlocks: string[] = [];
  const cp = config.componentPreferences;
  const animSources = [
    { key: "button-press", details: cp.buttonAnimationDetails },
    { key: "hover", details: cp.hoverAnimationDetails },
    { key: "page-transition", details: cp.pageTransitionDetails },
    { key: "micro-interaction", details: cp.microInteractionDetails },
    { key: "entrance", details: cp.entranceAnimationDetails },
  ] as const;

  for (const { key, details } of animSources) {
    if (!details?.cssKeyframes) continue;
    const nameMatch = details.cssKeyframes.match(/@keyframes\s+([\w-]+)/);
    if (nameMatch) {
      animConfig[key] = `${nameMatch[1]} ${details.duration} ${details.easing}`;
      keyframeBlocks.push(details.cssKeyframes);
    }
  }

  if (Object.keys(animConfig).length > 0) {
    theme.animation = animConfig;
  }

  let output = `import type { Config } from "tailwindcss";

// DesignKit — Generated Tailwind Config
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: ${JSON.stringify(theme, null, 6).replace(/"([^"]+)":/g, "$1:")},
  },
  plugins: [],
};

export default config;
`;

  if (keyframeBlocks.length > 0) {
    output += `\n/*\n * Add these @keyframes to your global CSS:\n *\n${keyframeBlocks.map((k) => k.split("\n").map((l) => ` * ${l}`).join("\n")).join("\n *\n")}\n */\n`;
  }

  return output;
}

// ============================================================
// Swift export
// ============================================================

export function exportSwift(config: DesignConfig): string {
  const lines: string[] = [
    "// DesignKit — Generated Swift Theme",
    "import SwiftUI",
    "import UIKit",
    "",
  ];

  if (tokens(config).colors) {
    const c = tokens(config).colors!;
    lines.push("// MARK: - Colors", "extension Color {");
    lines.push("    enum Theme {");
    appendSwiftAdaptiveColor(lines, "background", c.light.background, c.dark.background);
    appendSwiftAdaptiveColor(lines, "surface", c.light.surface, c.dark.surface);
    appendSwiftAdaptiveColor(lines, "primary", c.light.primary, c.dark.primary);
    appendSwiftAdaptiveColor(lines, "primaryForeground", c.light.primaryForeground, c.dark.primaryForeground);
    appendSwiftAdaptiveColor(lines, "secondary", c.light.secondary, c.dark.secondary);
    appendSwiftAdaptiveColor(lines, "accent", c.light.accent, c.dark.accent);
    appendSwiftAdaptiveColor(lines, "text", c.light.text, c.dark.text);
    appendSwiftAdaptiveColor(lines, "textSecondary", c.light.textSecondary, c.dark.textSecondary);
    appendSwiftAdaptiveColor(lines, "success", c.light.semantic.success, c.dark.semantic.success);
    appendSwiftAdaptiveColor(lines, "warning", c.light.semantic.warning, c.dark.semantic.warning);
    appendSwiftAdaptiveColor(lines, "error", c.light.semantic.error, c.dark.semantic.error);
    appendSwiftAdaptiveColor(lines, "info", c.light.semantic.info, c.dark.semantic.info);
    lines.push("    }", "}", "");
  }

  if (tokens(config).typography) {
    const t = tokens(config).typography!;
    lines.push("// MARK: - Typography", "extension Font {");
    lines.push("    enum Theme {");
    lines.push(`        static let headingFamily = "${t.headingFont}"`);
    lines.push(`        static let bodyFamily = "${t.bodyFont}"`);
    for (const [key, step] of Object.entries(t.scale)) {
      const size = parseFloat(step.size);
      lines.push(`        static let ${key} = Font.custom(${key.startsWith("h") ? '"\\(headingFamily)"' : '"\\(bodyFamily)"'}, size: ${size})`);
    }
    lines.push("    }", "}", "");
  }

  if (tokens(config).spacing) {
    const s = tokens(config).spacing!;
    lines.push("// MARK: - Spacing", "enum Spacing {");
    for (const [key, val] of Object.entries(s.scale)) {
      lines.push(`    static let ${key}: CGFloat = ${parseFloat(val)}`);
    }
    lines.push("}", "");
  }

  if (tokens(config).radius) {
    const r = tokens(config).radius!;
    lines.push("// MARK: - Corner Radius", "enum CornerRadius {");
    for (const [key, val] of Object.entries(r)) {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        lines.push(`    static let ${key}: CGFloat = ${num}`);
      }
    }
    lines.push("}", "");
  }

  if (tokens(config).shadows) {
    const s = tokens(config).shadows!;
    lines.push("// MARK: - Shadows", "enum AppShadow {");
    for (const [key, val] of Object.entries(s)) {
      lines.push(`    static let ${key} = "${val}"`);
    }
    lines.push("}", "");
  }

  return lines.join("\n");
}

function swiftRgb(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `red: ${(r / 255).toFixed(3)}, green: ${(g / 255).toFixed(3)}, blue: ${(b / 255).toFixed(3)}`;
}

function appendSwiftAdaptiveColor(lines: string[], name: string, lightHex: string, darkHex: string) {
  lines.push(`        static let ${name} = Color(UIColor { tc in`);
  lines.push(`            tc.userInterfaceStyle == .dark`);
  lines.push(`                ? UIColor(${swiftRgb(darkHex)}, alpha: 1)`);
  lines.push(`                : UIColor(${swiftRgb(lightHex)}, alpha: 1)`);
  lines.push(`        })`);
}

// ============================================================
// Kotlin (Jetpack Compose) export
// ============================================================

export function exportKotlin(config: DesignConfig): string {
  const lines: string[] = [
    "// DesignKit — Generated Kotlin Theme",
    "package com.app.theme",
    "",
    "import androidx.compose.foundation.isSystemInDarkTheme",
    "import androidx.compose.material3.ColorScheme",
    "import androidx.compose.material3.darkColorScheme",
    "import androidx.compose.material3.lightColorScheme",
    "import androidx.compose.runtime.Composable",
    "import androidx.compose.ui.graphics.Color",
    "import androidx.compose.ui.unit.dp",
    "import androidx.compose.ui.unit.sp",
    "",
  ];

  if (tokens(config).colors) {
    const c = tokens(config).colors!;
    lines.push("object LightColors {");
    appendKotlinColor(lines, "Background", c.light.background);
    appendKotlinColor(lines, "Surface", c.light.surface);
    appendKotlinColor(lines, "Primary", c.light.primary);
    appendKotlinColor(lines, "PrimaryForeground", c.light.primaryForeground);
    appendKotlinColor(lines, "Secondary", c.light.secondary);
    appendKotlinColor(lines, "Accent", c.light.accent);
    appendKotlinColor(lines, "Text", c.light.text);
    appendKotlinColor(lines, "TextSecondary", c.light.textSecondary);
    appendKotlinColor(lines, "Success", c.light.semantic.success);
    appendKotlinColor(lines, "Warning", c.light.semantic.warning);
    appendKotlinColor(lines, "Error", c.light.semantic.error);
    appendKotlinColor(lines, "Info", c.light.semantic.info);
    lines.push("}", "");

    lines.push("object DarkColors {");
    appendKotlinColor(lines, "Background", c.dark.background);
    appendKotlinColor(lines, "Surface", c.dark.surface);
    appendKotlinColor(lines, "Primary", c.dark.primary);
    appendKotlinColor(lines, "PrimaryForeground", c.dark.primaryForeground);
    appendKotlinColor(lines, "Secondary", c.dark.secondary);
    appendKotlinColor(lines, "Accent", c.dark.accent);
    appendKotlinColor(lines, "Text", c.dark.text);
    appendKotlinColor(lines, "TextSecondary", c.dark.textSecondary);
    appendKotlinColor(lines, "Success", c.dark.semantic.success);
    appendKotlinColor(lines, "Warning", c.dark.semantic.warning);
    appendKotlinColor(lines, "Error", c.dark.semantic.error);
    appendKotlinColor(lines, "Info", c.dark.semantic.info);
    lines.push("}", "");

    lines.push("@Composable");
    lines.push("fun appColorScheme(darkTheme: Boolean = isSystemInDarkTheme()): ColorScheme {");
    lines.push("    return if (darkTheme) {");
    lines.push("        darkColorScheme(");
    lines.push("            primary = DarkColors.Primary,");
    lines.push("            secondary = DarkColors.Secondary,");
    lines.push("            background = DarkColors.Background,");
    lines.push("            surface = DarkColors.Surface,");
    lines.push("            error = DarkColors.Error,");
    lines.push("        )");
    lines.push("    } else {");
    lines.push("        lightColorScheme(");
    lines.push("            primary = LightColors.Primary,");
    lines.push("            secondary = LightColors.Secondary,");
    lines.push("            background = LightColors.Background,");
    lines.push("            surface = LightColors.Surface,");
    lines.push("            error = LightColors.Error,");
    lines.push("        )");
    lines.push("    }");
    lines.push("}", "");
  }

  if (tokens(config).typography) {
    const t = tokens(config).typography!;
    lines.push("object AppTypography {");
    lines.push(`    const val HeadingFamily = "${t.headingFont}"`);
    lines.push(`    const val BodyFamily = "${t.bodyFont}"`);
    if (t.monoFont) {
      lines.push(`    const val MonoFamily = "${t.monoFont}"`);
    }
    for (const [key, step] of Object.entries(t.scale)) {
      const size = parseFloat(step.size);
      lines.push(`    val ${key} = ${size}.sp`);
    }
    lines.push("}", "");
  }

  if (tokens(config).spacing) {
    const s = tokens(config).spacing!;
    lines.push("object AppSpacing {");
    for (const [key, val] of Object.entries(s.scale)) {
      lines.push(`    val ${key} = ${parseFloat(val)}.dp`);
    }
    lines.push("}", "");
  }

  if (tokens(config).radius) {
    const r = tokens(config).radius!;
    lines.push("object AppRadius {");
    for (const [key, val] of Object.entries(r)) {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        lines.push(`    val ${key} = ${num}.dp`);
      }
    }
    lines.push("}", "");
  }

  if (tokens(config).shadows) {
    const s = tokens(config).shadows!;
    lines.push("object AppShadows {");
    for (const [key, val] of Object.entries(s)) {
      lines.push(`    const val ${key} = "${val}"`);
    }
    lines.push("}", "");
  }

  return lines.join("\n");
}

function appendKotlinColor(lines: string[], name: string, hex: string) {
  const clean = hex.replace("#", "");
  lines.push(`    val ${name} = Color(0xFF${clean.toUpperCase()})`);
}

// ============================================================
// CLAUDE.md export — design rules for AI-generated screens
// ============================================================

export function exportClaudeMd(config: DesignConfig): string {
  const lines: string[] = [
    "# Design System — Generated by DesignKit",
    "",
    "When generating UI for this project, follow these design rules exactly.",
    "",
  ];

  if (tokens(config).colors) {
    const c = tokens(config).colors!;
    lines.push("## Colors", "");
    lines.push("### Light Mode");
    lines.push(`- Background: ${c.light.background}`);
    lines.push(`- Surface: ${c.light.surface}`);
    lines.push(`- Primary: ${c.light.primary}`);
    lines.push(`- Secondary: ${c.light.secondary}`);
    lines.push(`- Accent: ${c.light.accent}`);
    lines.push(`- Text: ${c.light.text}`);
    lines.push(`- Text Secondary: ${c.light.textSecondary}`);
    lines.push("");
    lines.push("### Dark Mode");
    lines.push(`- Background: ${c.dark.background}`);
    lines.push(`- Surface: ${c.dark.surface}`);
    lines.push(`- Primary: ${c.dark.primary}`);
    lines.push(`- Text: ${c.dark.text}`);
    lines.push("");
  }

  if (tokens(config).typography) {
    const t = tokens(config).typography!;
    lines.push("## Typography", "");
    lines.push(`- Heading font: ${t.headingFont}`);
    lines.push(`- Body font: ${t.bodyFont}`);
    if (t.monoFont) lines.push(`- Mono font: ${t.monoFont}`);
    lines.push(`- Scale ratio: ${t.scaleRatio} (${t.scaleName})`);
    lines.push("");
  }

  if (tokens(config).spacing) {
    const s = tokens(config).spacing!;
    lines.push("## Spacing", "");
    lines.push(`- Base unit: ${s.baseUnit}px`);
    lines.push("- Scale:");
    for (const [key, val] of Object.entries(s.scale)) {
      lines.push(`  - ${key}: ${val}`);
    }
    lines.push("");
  }

  if (tokens(config).radius) {
    lines.push("## Border Radius", "");
    for (const [key, val] of Object.entries(tokens(config).radius!)) {
      lines.push(`- ${key}: ${val}`);
    }
    lines.push("");
  }

  if (tokens(config).shadows) {
    lines.push("## Shadows", "");
    for (const [key, val] of Object.entries(tokens(config).shadows!)) {
      lines.push(`- ${key}: ${val}`);
    }
    lines.push("");
  }

  if (config.componentPreferences.buttonStyle) {
    lines.push(`## Button Style: ${config.componentPreferences.buttonStyle}`, "");
    const details = config.componentPreferences.buttonStyleDetails;
    if (details) {
      const strategyMap: Record<string, string> = {
        solid: "bg=primary, text=primaryForeground",
        outline: "bg=transparent, text=primary, border=primary",
        ghost: "bg=transparent, text=primary",
        soft: "bg=primary@10%, text=primary",
        surface: "bg=surface, text=text, border=border",
        gradient: "bg=primary->accent, text=primaryForeground",
      };
      lines.push(`- Color strategy: ${details.colorStrategy} (${strategyMap[details.colorStrategy] ?? details.colorStrategy})`);
      if (details.animation) {
        lines.push(`- Animation: ${details.animation}`);
      }
      lines.push(`- Supports sizes: ${details.supportsSizes ? "sm, md, lg" : "no"}`);
      lines.push(`- Supports icons: ${details.supportsIcons ? "yes" : "no"}`);
      lines.push("");
      appendStatefulCss(lines, details.css);
    }
  }
  if (config.componentPreferences.cardStyle) {
    lines.push(`## Card Style: ${config.componentPreferences.cardStyle}`, "");
    const d = config.componentPreferences.cardStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Has image: ${d.hasImage ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "default", d.css);
      if (d.hoverCss) appendFlatCss(lines, "hover", d.hoverCss);
    }
  }
  if (config.componentPreferences.inputStyle) {
    lines.push(`## Input Style: ${config.componentPreferences.inputStyle}`, "");
    const d = config.componentPreferences.inputStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Subtype: ${d.subtype}`);
      lines.push(`- Floating label: ${d.hasFloatingLabel ? "yes" : "no"}`);
      lines.push("");
      appendStatefulCss(lines, d.css);
    }
  }

  if (config.componentPreferences.navigationStyle) {
    lines.push(`## Navigation Style: ${config.componentPreferences.navigationStyle}`, "");
    const d = config.componentPreferences.navigationStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Subtype: ${d.subtype}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Has logo: ${d.hasLogo ? "yes" : "no"}`);
      lines.push(`- Has avatar: ${d.hasAvatar ? "yes" : "no"}`);
      lines.push(`- Position: ${d.position}`);
      lines.push("");
      appendFlatCss(lines, "default", d.css);
      if (d.hoverCss) appendFlatCss(lines, "hover", d.hoverCss);
    }
  }

  if (config.componentPreferences.tabStyle) {
    lines.push(`## Tab Style: ${config.componentPreferences.tabStyle}`, "");
    const d = config.componentPreferences.tabStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Orientation: ${d.orientation}`);
      lines.push(`- Indicator: ${d.indicatorStyle}`);
      lines.push(`- Has icons: ${d.hasIcons ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "tab", d.tabCss);
      appendFlatCss(lines, "active tab", d.activeTabCss);
      if (d.hoverTabCss) appendFlatCss(lines, "hover tab", d.hoverTabCss);
    }
  }

  if (config.componentPreferences.sidebarStyle) {
    lines.push(`## Sidebar Style: ${config.componentPreferences.sidebarStyle}`, "");
    const d = config.componentPreferences.sidebarStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Collapsible: ${d.isCollapsible ? "yes" : "no"}`);
      lines.push(`- Group headers: ${d.hasGroupHeaders ? "yes" : "no"}`);
      lines.push(`- Width: ${d.width}`);
      if (d.collapsedWidth) lines.push(`- Collapsed width: ${d.collapsedWidth}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      appendFlatCss(lines, "item", d.itemCss);
      appendFlatCss(lines, "active item", d.activeItemCss);
      if (d.hoverItemCss) appendFlatCss(lines, "hover item", d.hoverItemCss);
    }
  }

  if (config.componentPreferences.heroStyle) {
    lines.push(`## Hero Style: ${config.componentPreferences.heroStyle}`, "");
    const d = config.componentPreferences.heroStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Has image: ${d.hasImage ? "yes" : "no"}`);
      lines.push(`- Has gradient: ${d.hasGradient ? "yes" : "no"}`);
      lines.push(`- Min height: ${d.minHeight}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      if (d.contentCss) appendFlatCss(lines, "content", d.contentCss);
    }
  }

  if (config.componentPreferences.modalStyle) {
    lines.push(`## Modal Style: ${config.componentPreferences.modalStyle}`, "");
    const d = config.componentPreferences.modalStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Subtype: ${d.subtype}`);
      lines.push(`- Has overlay: ${d.hasOverlay ? "yes" : "no"}`);
      lines.push(`- Animation direction: ${d.animationDirection}`);
      lines.push("");
      appendFlatCss(lines, "overlay", d.css);
      appendFlatCss(lines, "panel", d.panelCss);
    }
  }

  if (config.componentPreferences.footerStyle) {
    lines.push(`## Footer Style: ${config.componentPreferences.footerStyle}`, "");
    const d = config.componentPreferences.footerStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Columns: ${d.columns}`);
      lines.push(`- Has CTA: ${d.hasCta ? "yes" : "no"}`);
      lines.push(`- Has newsletter: ${d.hasNewsletter ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "default", d.css);
    }
  }

  if (config.componentPreferences.badgeStyle) {
    lines.push(`## Badge Style: ${config.componentPreferences.badgeStyle}`, "");
    const d = config.componentPreferences.badgeStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Shape: ${d.shape}`);
      lines.push(`- Has dismiss: ${d.hasDismiss ? "yes" : "no"}`);
      lines.push(`- Has icon: ${d.hasIcon ? "yes" : "no"}`);
      lines.push(`- Has dot: ${d.hasDot ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "default", d.css);
    }
  }

  if (config.componentPreferences.avatarStyle) {
    lines.push(`## Avatar Style: ${config.componentPreferences.avatarStyle}`, "");
    const d = config.componentPreferences.avatarStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Shape: ${d.shape}`);
      lines.push(`- Has status: ${d.hasStatus ? "yes" : "no"}`);
      lines.push(`- Has badge: ${d.hasBadge ? "yes" : "no"}`);
      lines.push(`- Has ring: ${d.hasRing ? "yes" : "no"}`);
      lines.push(`- Supports group: ${d.supportsGroup ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "default", d.css);
    }
  }

  if (config.componentPreferences.listStyle) {
    lines.push(`## List Style: ${config.componentPreferences.listStyle}`, "");
    const d = config.componentPreferences.listStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Leading element: ${d.hasLeadingElement ? "yes" : "no"}`);
      lines.push(`- Trailing element: ${d.hasTrailingElement ? "yes" : "no"}`);
      lines.push(`- Grouped: ${d.isGrouped ? "yes" : "no"}`);
      lines.push(`- Expandable: ${d.isExpandable ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      appendFlatCss(lines, "item", d.itemCss);
      if (d.activeItemCss) appendFlatCss(lines, "active item", d.activeItemCss);
    }
  }

  if (config.componentPreferences.tableStyle) {
    lines.push(`## Table Style: ${config.componentPreferences.tableStyle}`, "");
    const d = config.componentPreferences.tableStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Sticky header: ${d.hasStickyHeader ? "yes" : "no"}`);
      lines.push(`- Row selection: ${d.hasRowSelection ? "yes" : "no"}`);
      lines.push(`- Density: ${d.density}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "header", d.headerCss);
      appendFlatCss(lines, "row", d.rowCss);
      if (d.altRowCss) appendFlatCss(lines, "alt row", d.altRowCss);
      if (d.hoverRowCss) appendFlatCss(lines, "hover row", d.hoverRowCss);
    }
  }

  if (config.componentPreferences.pricingStyle) {
    lines.push(`## Pricing Style: ${config.componentPreferences.pricingStyle}`, "");
    const d = config.componentPreferences.pricingStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Featured: ${d.isFeatured ? "yes" : "no"}`);
      lines.push(`- Has toggle: ${d.hasToggle ? "yes" : "no"}`);
      lines.push(`- Has trial badge: ${d.hasTrialBadge ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      if (d.headerCss) appendFlatCss(lines, "header", d.headerCss);
      if (d.priceCss) appendFlatCss(lines, "price", d.priceCss);
    }
  }

  if (config.componentPreferences.testimonialStyle) {
    lines.push(`## Testimonial Style: ${config.componentPreferences.testimonialStyle}`, "");
    const d = config.componentPreferences.testimonialStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Has avatar: ${d.hasAvatar ? "yes" : "no"}`);
      lines.push(`- Has rating: ${d.hasRating ? "yes" : "no"}`);
      lines.push(`- Has media: ${d.hasMedia ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      if (d.quoteCss) appendFlatCss(lines, "quote", d.quoteCss);
    }
  }

  if (config.componentPreferences.statStyle) {
    lines.push(`## Stat Style: ${config.componentPreferences.statStyle}`, "");
    const d = config.componentPreferences.statStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Has icon: ${d.hasIcon ? "yes" : "no"}`);
      lines.push(`- Has trend: ${d.hasTrend ? "yes" : "no"}`);
      lines.push(`- Has chart: ${d.hasChart ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      if (d.valueCss) appendFlatCss(lines, "value", d.valueCss);
    }
  }

  if (config.componentPreferences.dividerStyle) {
    lines.push(`## Divider Style: ${config.componentPreferences.dividerStyle}`, "");
    const d = config.componentPreferences.dividerStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Style: ${d.style}`);
      lines.push(`- Has label: ${d.hasLabel ? "yes" : "no"}`);
      lines.push(`- Has icon: ${d.hasIcon ? "yes" : "no"}`);
      lines.push(`- Thickness: ${d.thickness}`);
      lines.push("");
      appendFlatCss(lines, "default", d.css);
    }
  }

  if (config.componentPreferences.imageStyle) {
    lines.push(`## Image Style: ${config.componentPreferences.imageStyle}`, "");
    const d = config.componentPreferences.imageStyleDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Shape: ${d.shape}`);
      lines.push(`- Has overlay: ${d.hasOverlay ? "yes" : "no"}`);
      lines.push(`- Has caption: ${d.hasCaption ? "yes" : "no"}`);
      if (d.aspectRatio) lines.push(`- Aspect ratio: ${d.aspectRatio}`);
      lines.push("");
      appendFlatCss(lines, "container", d.css);
      if (d.overlayCss) appendFlatCss(lines, "overlay", d.overlayCss);
    }
  }

  if (config.componentPreferences.emptyStatePattern) {
    lines.push(`## Empty State Pattern: ${config.componentPreferences.emptyStatePattern}`, "");
    const d = config.componentPreferences.emptyStatePatternDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Has illustration: ${d.hasIllustration ? "yes" : "no"}`);
      lines.push(`- Has CTA: ${d.hasCta ? "yes" : "no"}`);
      lines.push(`- Tone: ${d.tone}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "illustration", d.illustrationCss);
    }
  }

  if (config.componentPreferences.loadingPattern) {
    lines.push(`## Loading Pattern: ${config.componentPreferences.loadingPattern}`, "");
    const d = config.componentPreferences.loadingPatternDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Type: ${d.type}`);
      lines.push(`- Animation: ${d.animationStyle}`);
      lines.push(`- Line count: ${d.lineCount}`);
      lines.push(`- Full page: ${d.isFullPage ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "element", d.elementCss);
    }
  }

  if (config.componentPreferences.onboardingPattern) {
    lines.push(`## Onboarding Pattern: ${config.componentPreferences.onboardingPattern}`, "");
    const d = config.componentPreferences.onboardingPatternDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Layout: ${d.layout}`);
      lines.push(`- Step indicator: ${d.hasStepIndicator ? "yes" : "no"}`);
      lines.push(`- Skip button: ${d.hasSkipButton ? "yes" : "no"}`);
      lines.push(`- Step count: ${d.stepCount}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "step indicator", d.stepIndicatorCss);
    }
  }

  if (config.componentPreferences.errorPattern) {
    lines.push(`## Error Pattern: ${config.componentPreferences.errorPattern}`, "");
    const d = config.componentPreferences.errorPatternDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Error type: ${d.errorType}`);
      lines.push(`- Has error code: ${d.hasErrorCode ? "yes" : "no"}`);
      lines.push(`- Has CTA: ${d.hasCta ? "yes" : "no"}`);
      lines.push(`- Tone: ${d.tone}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "icon", d.iconCss);
    }
  }

  if (config.componentPreferences.successPattern) {
    lines.push(`## Success Pattern: ${config.componentPreferences.successPattern}`, "");
    const d = config.componentPreferences.successPatternDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Type: ${d.type}`);
      lines.push(`- Has animation: ${d.hasAnimation ? "yes" : "no"}`);
      lines.push(`- Has redirect: ${d.hasRedirect ? "yes" : "no"}`);
      lines.push(`- Has CTA: ${d.hasCta ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "icon", d.iconCss);
    }
  }

  if (config.componentPreferences.notificationPattern) {
    lines.push(`## Notification Pattern: ${config.componentPreferences.notificationPattern}`, "");
    const d = config.componentPreferences.notificationPatternDetails;
    if (d) {
      lines.push(`- Variant: ${d.variant}`);
      lines.push(`- Subtype: ${d.subtype}`);
      lines.push(`- Position: ${d.position}`);
      lines.push(`- Has icon: ${d.hasIcon ? "yes" : "no"}`);
      lines.push(`- Has action: ${d.hasAction ? "yes" : "no"}`);
      lines.push(`- Auto-dismiss: ${d.isAutoDismiss ? "yes" : "no"}`);
      lines.push("");
      appendFlatCss(lines, "container", d.containerCss);
      appendFlatCss(lines, "content", d.contentCss);
    }
  }

  // Motion & Animation section
  const hasMotion = config.componentPreferences.buttonAnimation ||
    config.componentPreferences.hoverAnimation ||
    config.componentPreferences.pageTransition ||
    config.componentPreferences.microInteraction ||
    config.componentPreferences.entranceAnimation;

  if (hasMotion) {
    lines.push("## Motion & Animation", "");
  }

  const animSections: { name: string; label: string; details?: { variant: string; subtype: string; duration: string; easing: string; trigger: string; cssKeyframes?: string; cssProperties?: Record<string, string> } }[] = [
    { name: config.componentPreferences.buttonAnimation ?? "", label: "Button Animation", details: config.componentPreferences.buttonAnimationDetails },
    { name: config.componentPreferences.hoverAnimation ?? "", label: "Hover Animation", details: config.componentPreferences.hoverAnimationDetails },
    { name: config.componentPreferences.pageTransition ?? "", label: "Page Transition", details: config.componentPreferences.pageTransitionDetails },
    { name: config.componentPreferences.microInteraction ?? "", label: "Micro-interaction", details: config.componentPreferences.microInteractionDetails },
    { name: config.componentPreferences.entranceAnimation ?? "", label: "Entrance Animation", details: config.componentPreferences.entranceAnimationDetails },
  ];

  for (const { name, label, details } of animSections) {
    if (!name || !details) continue;
    lines.push(`### ${label}: ${name}`);
    lines.push(`- Duration: ${details.duration}`);
    lines.push(`- Easing: ${details.easing}`);
    lines.push(`- Trigger: ${details.trigger}`);
    if (details.cssProperties) {
      lines.push("");
      appendFlatCss(lines, "properties", details.cssProperties);
    }
    if (details.cssKeyframes) {
      lines.push("```css", details.cssKeyframes, "```");
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ============================================================
// Flutter / Dart export
// ============================================================

const FLUTTER_TEXT_MAP: Record<string, string> = {
  h1: "displayLarge",
  h2: "displayMedium",
  h3: "displaySmall",
  h4: "headlineMedium",
  h5: "titleLarge",
  h6: "titleMedium",
  body: "bodyLarge",
  bodySmall: "bodyMedium",
  caption: "bodySmall",
  button: "labelLarge",
};

export function exportFlutter(config: DesignConfig): string {
  const lines: string[] = [
    "// DesignKit — Generated Flutter Theme",
    "import 'package:flutter/material.dart';",
    "",
  ];

  if (tokens(config).colors) {
    const c = tokens(config).colors!;
    lines.push("class AppColors {");
    lines.push("  static const lightScheme = ColorScheme.light(");
    lines.push(`    primary: Color(${hexToFlutterColor(c.light.primary)}),`);
    lines.push(`    secondary: Color(${hexToFlutterColor(c.light.secondary)}),`);
    lines.push(`    surface: Color(${hexToFlutterColor(c.light.surface)}),`);
    lines.push(`    error: Color(${hexToFlutterColor(c.light.semantic.error)}),`);
    lines.push(`    onPrimary: Color(${hexToFlutterColor(c.light.primaryForeground)}),`);
    lines.push(`    onSecondary: Color(${hexToFlutterColor(c.light.secondaryForeground)}),`);
    lines.push(`    onSurface: Color(${hexToFlutterColor(c.light.text)}),`);
    lines.push("  );");
    lines.push("");
    lines.push("  static const darkScheme = ColorScheme.dark(");
    lines.push(`    primary: Color(${hexToFlutterColor(c.dark.primary)}),`);
    lines.push(`    secondary: Color(${hexToFlutterColor(c.dark.secondary)}),`);
    lines.push(`    surface: Color(${hexToFlutterColor(c.dark.surface)}),`);
    lines.push(`    error: Color(${hexToFlutterColor(c.dark.semantic.error)}),`);
    lines.push(`    onPrimary: Color(${hexToFlutterColor(c.dark.primaryForeground)}),`);
    lines.push(`    onSecondary: Color(${hexToFlutterColor(c.dark.secondaryForeground)}),`);
    lines.push(`    onSurface: Color(${hexToFlutterColor(c.dark.text)}),`);
    lines.push("  );");
    lines.push("}", "");
  }

  if (tokens(config).typography) {
    const t = tokens(config).typography!;
    lines.push("class AppTypography {");
    lines.push(`  static const headingFamily = '${t.headingFont}';`);
    lines.push(`  static const bodyFamily = '${t.bodyFont}';`);
    lines.push("");
    lines.push("  static final textTheme = TextTheme(");
    for (const [key, step] of Object.entries(t.scale)) {
      const flutterName = FLUTTER_TEXT_MAP[key];
      if (!flutterName) continue;
      const size = parseFloat(step.size);
      const weight = step.weight;
      const lh = parseFloat(step.lineHeight);
      const family = key.startsWith("h") ? "headingFamily" : "bodyFamily";
      lines.push(`    ${flutterName}: TextStyle(fontFamily: ${family}, fontSize: ${size}, fontWeight: FontWeight.w${weight}, height: ${lh}),`);
    }
    lines.push("  );");
    lines.push("}", "");
  }

  if (tokens(config).spacing) {
    const s = tokens(config).spacing!;
    lines.push("class AppSpacing {");
    for (const [key, val] of Object.entries(s.scale)) {
      lines.push(`  static const double ${key} = ${parseFloat(val)};`);
    }
    lines.push("}", "");
  }

  if (tokens(config).radius) {
    const r = tokens(config).radius!;
    lines.push("class AppRadius {");
    for (const [key, val] of Object.entries(r)) {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        lines.push(`  static const double ${key} = ${num};`);
      }
    }
    lines.push("}", "");
  }

  // Theme constructors
  lines.push("ThemeData lightTheme() => ThemeData(");
  if (tokens(config).colors) lines.push("  colorScheme: AppColors.lightScheme,");
  if (tokens(config).typography) lines.push("  textTheme: AppTypography.textTheme,");
  lines.push(");");
  lines.push("");
  lines.push("ThemeData darkTheme() => ThemeData(");
  if (tokens(config).colors) lines.push("  colorScheme: AppColors.darkScheme,");
  if (tokens(config).typography) lines.push("  textTheme: AppTypography.textTheme,");
  lines.push(");");
  lines.push("");

  return lines.join("\n");
}

// ============================================================
// React Native export
// ============================================================

export function exportReactNative(config: DesignConfig): string {
  const lines: string[] = [
    "// DesignKit — Generated React Native Theme",
    "",
  ];

  if (tokens(config).colors) {
    const c = tokens(config).colors!;
    lines.push("export const colors = {");
    lines.push("  light: {");
    appendRNColorEntries(lines, c.light, "    ");
    lines.push("  },");
    lines.push("  dark: {");
    appendRNColorEntries(lines, c.dark, "    ");
    lines.push("  },");
    lines.push("} as const;");
    lines.push("");
  }

  if (tokens(config).typography) {
    const t = tokens(config).typography!;
    lines.push("export const typography = {");
    lines.push(`  headingFamily: "${t.headingFont}",`);
    lines.push(`  bodyFamily: "${t.bodyFont}",`);
    if (t.monoFont) lines.push(`  monoFamily: "${t.monoFont}",`);
    lines.push("  scale: {");
    for (const [key, step] of Object.entries(t.scale)) {
      const size = parseFloat(step.size);
      const lh = Math.round(size * parseFloat(step.lineHeight));
      lines.push(`    ${key}: { fontSize: ${size}, lineHeight: ${lh}, fontWeight: "${step.weight}" as const },`);
    }
    lines.push("  },");
    lines.push("} as const;");
    lines.push("");
  }

  if (tokens(config).spacing) {
    const s = tokens(config).spacing!;
    lines.push("export const spacing = {");
    for (const [key, val] of Object.entries(s.scale)) {
      lines.push(`  ${key}: ${parseFloat(val)},`);
    }
    lines.push("} as const;");
    lines.push("");
  }

  if (tokens(config).radius) {
    const r = tokens(config).radius!;
    lines.push("export const radius = {");
    for (const [key, val] of Object.entries(r)) {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        lines.push(`  ${key}: ${num},`);
      }
    }
    lines.push("} as const;");
    lines.push("");
  }

  if (tokens(config).shadows) {
    const s = tokens(config).shadows!;
    lines.push("export const shadows = {");
    for (const [key, val] of Object.entries(s)) {
      lines.push(`  ${key}: "${val}",`);
    }
    lines.push("} as const;");
    lines.push("");
  }

  lines.push("export const theme = {");
  if (tokens(config).colors) lines.push("  colors,");
  if (tokens(config).typography) lines.push("  typography,");
  if (tokens(config).spacing) lines.push("  spacing,");
  if (tokens(config).radius) lines.push("  radius,");
  if (tokens(config).shadows) lines.push("  shadows,");
  lines.push("} as const;");
  lines.push("");

  return lines.join("\n");
}

function appendRNColorEntries(lines: string[], colors: ColorMode, indent: string) {
  lines.push(`${indent}background: "${colors.background}",`);
  lines.push(`${indent}surface: "${colors.surface}",`);
  lines.push(`${indent}surfaceAlt: "${colors.surfaceAlt}",`);
  lines.push(`${indent}border: "${colors.border}",`);
  lines.push(`${indent}text: "${colors.text}",`);
  lines.push(`${indent}textSecondary: "${colors.textSecondary}",`);
  lines.push(`${indent}textMuted: "${colors.textMuted}",`);
  lines.push(`${indent}primary: "${colors.primary}",`);
  lines.push(`${indent}primaryForeground: "${colors.primaryForeground}",`);
  lines.push(`${indent}secondary: "${colors.secondary}",`);
  lines.push(`${indent}secondaryForeground: "${colors.secondaryForeground}",`);
  lines.push(`${indent}accent: "${colors.accent}",`);
  lines.push(`${indent}accentForeground: "${colors.accentForeground}",`);
  lines.push(`${indent}success: "${colors.semantic.success}",`);
  lines.push(`${indent}warning: "${colors.semantic.warning}",`);
  lines.push(`${indent}error: "${colors.semantic.error}",`);
  lines.push(`${indent}info: "${colors.semantic.info}",`);
}

// ============================================================
// Helpers
// ============================================================

function tokens(config: DesignConfig) {
  return config.tokens;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/** Emit a CSS rule block: .selector { props } */
function cssRule(lines: string[], selector: string, css: Record<string, string>) {
  if (Object.keys(css).length === 0) return;
  lines.push(`${selector} {`);
  for (const [k, v] of Object.entries(css)) {
    lines.push(`  ${camelToKebab(k)}: ${v};`);
  }
  lines.push("}");
}

/** Generate component CSS classes from componentPreferences */
function appendComponentCssClasses(lines: string[], config: DesignConfig) {
  const cp = config.componentPreferences;
  const hasAny = cp.buttonStyleDetails || cp.inputStyleDetails || cp.cardStyleDetails ||
    cp.navigationStyleDetails || cp.tabStyleDetails || cp.sidebarStyleDetails ||
    cp.modalStyleDetails || cp.heroStyleDetails || cp.footerStyleDetails ||
    cp.badgeStyleDetails || cp.avatarStyleDetails || cp.listStyleDetails ||
    cp.tableStyleDetails || cp.pricingStyleDetails || cp.testimonialStyleDetails ||
    cp.statStyleDetails || cp.dividerStyleDetails || cp.imageStyleDetails ||
    cp.emptyStatePatternDetails || cp.loadingPatternDetails || cp.onboardingPatternDetails ||
    cp.errorPatternDetails || cp.successPatternDetails || cp.notificationPatternDetails;

  if (!hasAny) return;
  lines.push("", "/* Component Styles */", "");

  // Buttons — stateful CSS (default, hover, active, disabled)
  if (cp.buttonStyleDetails) {
    const css = cp.buttonStyleDetails.css;
    cssRule(lines, `.dk-btn`, css.default);
    cssRule(lines, `.dk-btn:hover`, css.hover);
    cssRule(lines, `.dk-btn:active`, css.active);
    cssRule(lines, `.dk-btn:disabled`, css.disabled);
    lines.push("");
  }

  // Inputs — stateful CSS
  if (cp.inputStyleDetails) {
    const css = cp.inputStyleDetails.css;
    cssRule(lines, `.dk-input`, css.default);
    cssRule(lines, `.dk-input:focus`, css.focus);
    cssRule(lines, `.dk-input.filled`, css.filled);
    cssRule(lines, `.dk-input.error`, css.error);
    cssRule(lines, `.dk-input:disabled`, css.disabled);
    lines.push("");
  }

  // Cards — flat CSS + hover
  if (cp.cardStyleDetails) {
    cssRule(lines, `.dk-card`, cp.cardStyleDetails.css);
    if (cp.cardStyleDetails.hoverCss) cssRule(lines, `.dk-card:hover`, cp.cardStyleDetails.hoverCss);
    lines.push("");
  }

  // Navigation
  if (cp.navigationStyleDetails) {
    cssRule(lines, `.dk-nav`, cp.navigationStyleDetails.css);
    if (cp.navigationStyleDetails.hoverCss) cssRule(lines, `.dk-nav a:hover`, cp.navigationStyleDetails.hoverCss);
    lines.push("");
  }

  // Tabs
  if (cp.tabStyleDetails) {
    const d = cp.tabStyleDetails;
    cssRule(lines, `.dk-tabs`, d.containerCss);
    cssRule(lines, `.dk-tab`, d.tabCss);
    cssRule(lines, `.dk-tab.active`, d.activeTabCss);
    if (d.hoverTabCss) cssRule(lines, `.dk-tab:hover`, d.hoverTabCss);
    lines.push("");
  }

  // Sidebar
  if (cp.sidebarStyleDetails) {
    const d = cp.sidebarStyleDetails;
    cssRule(lines, `.dk-sidebar`, d.css);
    cssRule(lines, `.dk-sidebar-item`, d.itemCss);
    cssRule(lines, `.dk-sidebar-item.active`, d.activeItemCss);
    if (d.hoverItemCss) cssRule(lines, `.dk-sidebar-item:hover`, d.hoverItemCss);
    lines.push("");
  }

  // Modal
  if (cp.modalStyleDetails) {
    cssRule(lines, `.dk-modal-overlay`, cp.modalStyleDetails.css);
    cssRule(lines, `.dk-modal-panel`, cp.modalStyleDetails.panelCss);
    lines.push("");
  }

  // Hero
  if (cp.heroStyleDetails) {
    cssRule(lines, `.dk-hero`, cp.heroStyleDetails.css);
    if (cp.heroStyleDetails.contentCss) cssRule(lines, `.dk-hero-content`, cp.heroStyleDetails.contentCss);
    lines.push("");
  }

  // Footer
  if (cp.footerStyleDetails) {
    cssRule(lines, `.dk-footer`, cp.footerStyleDetails.css);
    lines.push("");
  }

  // Badge
  if (cp.badgeStyleDetails) {
    cssRule(lines, `.dk-badge`, cp.badgeStyleDetails.css);
    lines.push("");
  }

  // Avatar
  if (cp.avatarStyleDetails) {
    cssRule(lines, `.dk-avatar`, cp.avatarStyleDetails.css);
    lines.push("");
  }

  // List
  if (cp.listStyleDetails) {
    const d = cp.listStyleDetails;
    cssRule(lines, `.dk-list`, d.css);
    cssRule(lines, `.dk-list-item`, d.itemCss);
    if (d.activeItemCss) cssRule(lines, `.dk-list-item.active`, d.activeItemCss);
    lines.push("");
  }

  // Table
  if (cp.tableStyleDetails) {
    const d = cp.tableStyleDetails;
    cssRule(lines, `.dk-table`, d.containerCss);
    cssRule(lines, `.dk-table th`, d.headerCss);
    cssRule(lines, `.dk-table td`, d.rowCss);
    if (d.altRowCss) cssRule(lines, `.dk-table tr:nth-child(even) td`, d.altRowCss);
    if (d.hoverRowCss) cssRule(lines, `.dk-table tr:hover td`, d.hoverRowCss);
    lines.push("");
  }

  // Pricing
  if (cp.pricingStyleDetails) {
    const d = cp.pricingStyleDetails;
    cssRule(lines, `.dk-pricing`, d.css);
    if (d.headerCss) cssRule(lines, `.dk-pricing-header`, d.headerCss);
    if (d.priceCss) cssRule(lines, `.dk-pricing-price`, d.priceCss);
    lines.push("");
  }

  // Testimonial
  if (cp.testimonialStyleDetails) {
    cssRule(lines, `.dk-testimonial`, cp.testimonialStyleDetails.css);
    if (cp.testimonialStyleDetails.quoteCss) cssRule(lines, `.dk-testimonial-quote`, cp.testimonialStyleDetails.quoteCss);
    lines.push("");
  }

  // Stat
  if (cp.statStyleDetails) {
    cssRule(lines, `.dk-stat`, cp.statStyleDetails.css);
    if (cp.statStyleDetails.valueCss) cssRule(lines, `.dk-stat-value`, cp.statStyleDetails.valueCss);
    lines.push("");
  }

  // Divider
  if (cp.dividerStyleDetails) {
    cssRule(lines, `.dk-divider`, cp.dividerStyleDetails.css);
    lines.push("");
  }

  // Image
  if (cp.imageStyleDetails) {
    cssRule(lines, `.dk-image`, cp.imageStyleDetails.css);
    if (cp.imageStyleDetails.overlayCss) cssRule(lines, `.dk-image-overlay`, cp.imageStyleDetails.overlayCss);
    lines.push("");
  }

  // Empty state
  if (cp.emptyStatePatternDetails) {
    cssRule(lines, `.dk-empty-state`, cp.emptyStatePatternDetails.containerCss);
    cssRule(lines, `.dk-empty-state-illustration`, cp.emptyStatePatternDetails.illustrationCss);
    lines.push("");
  }

  // Loading
  if (cp.loadingPatternDetails) {
    cssRule(lines, `.dk-loading`, cp.loadingPatternDetails.containerCss);
    cssRule(lines, `.dk-loading-element`, cp.loadingPatternDetails.elementCss);
    lines.push("");
  }

  // Onboarding
  if (cp.onboardingPatternDetails) {
    cssRule(lines, `.dk-onboarding`, cp.onboardingPatternDetails.containerCss);
    cssRule(lines, `.dk-onboarding-steps`, cp.onboardingPatternDetails.stepIndicatorCss);
    lines.push("");
  }

  // Error
  if (cp.errorPatternDetails) {
    cssRule(lines, `.dk-error`, cp.errorPatternDetails.containerCss);
    cssRule(lines, `.dk-error-icon`, cp.errorPatternDetails.iconCss);
    lines.push("");
  }

  // Success
  if (cp.successPatternDetails) {
    cssRule(lines, `.dk-success`, cp.successPatternDetails.containerCss);
    cssRule(lines, `.dk-success-icon`, cp.successPatternDetails.iconCss);
    lines.push("");
  }

  // Notification
  if (cp.notificationPatternDetails) {
    cssRule(lines, `.dk-notification`, cp.notificationPatternDetails.containerCss);
    cssRule(lines, `.dk-notification-content`, cp.notificationPatternDetails.contentCss);
    lines.push("");
  }
}

/** Format a flat Record<string, string> as a CSS code block for claude-md */
function appendFlatCss(lines: string[], label: string, css: Record<string, string>) {
  if (Object.keys(css).length === 0) return;
  lines.push("```css", `/* ${label} */`);
  for (const [k, v] of Object.entries(css)) {
    lines.push(`${camelToKebab(k)}: ${v};`);
  }
  lines.push("```", "");
}

/** Format a stateful CSS object (e.g. { default, hover, active, disabled }) as a CSS code block */
function appendStatefulCss(lines: string[], css: Record<string, Record<string, string>>) {
  if (Object.keys(css).length === 0) return;
  lines.push("```css");
  const states = Object.entries(css);
  for (let i = 0; i < states.length; i++) {
    const [state, props] = states[i];
    lines.push(`/* ${state} */`);
    for (const [k, v] of Object.entries(props)) {
      lines.push(`${camelToKebab(k)}: ${v};`);
    }
    if (i < states.length - 1) lines.push("");
  }
  lines.push("```", "");
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function hexToFlutterColor(hex: string): string {
  const clean = hex.replace("#", "");
  return `0xFF${clean.toUpperCase()}`;
}

// ============================================================
// Bundle all exports into a ZIP-ready object
// ============================================================

export function generateAllExports(config: DesignConfig): Record<string, string> {
  return {
    "design-tokens.json": exportJSON(config),
    "design-tokens.css": exportCSS(config),
    "tailwind.config.ts": exportTailwind(config),
    "Theme.swift": exportSwift(config),
    "Theme.kt": exportKotlin(config),
    "theme.dart": exportFlutter(config),
    "theme.ts": exportReactNative(config),
    "CLAUDE.md": exportClaudeMd(config),
  };
}
