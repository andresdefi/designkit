import type { TypeScale, TypeStep } from "./types";

export interface TypeScalePreset {
  id: string;
  label: string;
  ratio: number;
}

export const TYPE_SCALE_PRESETS: TypeScalePreset[] = [
  { id: "compact", label: "Compact", ratio: 1.125 },
  { id: "default", label: "Default", ratio: 1.2 },
  { id: "comfortable", label: "Comfortable", ratio: 1.25 },
  { id: "expressive", label: "Expressive", ratio: 1.333 },
  { id: "dramatic", label: "Dramatic", ratio: 1.5 },
];

/**
 * Generates a full TypeScale from a base size and ratio.
 * Sizes are in rem, rounded to 1 decimal place.
 */
export function generateTypeScale(
  baseSizePx: number,
  ratio: number,
  headingWeight: number,
  bodyWeight: number
): TypeScale {
  const base = baseSizePx / 16; // Convert to rem

  function step(exp: number, weight: number, lhMultiplier: number, ls?: string): TypeStep {
    const size = Math.round(base * Math.pow(ratio, exp) * 10) / 10;
    const lineHeight = Math.round(size * lhMultiplier * 10) / 10;
    return {
      size: `${size}rem`,
      lineHeight: `${lineHeight}rem`,
      weight,
      ...(ls ? { letterSpacing: ls } : {}),
    };
  }

  return {
    h1: step(5, headingWeight, 1.2, "-0.02em"),
    h2: step(4, headingWeight, 1.25, "-0.015em"),
    h3: step(3, headingWeight, 1.3, "-0.01em"),
    h4: step(2, headingWeight, 1.35),
    h5: step(1, headingWeight, 1.4),
    h6: step(0, headingWeight, 1.4),
    body: step(0, bodyWeight, 1.6),
    bodySmall: step(-1, bodyWeight, 1.5),
    caption: step(-2, bodyWeight, 1.4, "0.02em"),
    overline: step(-2, bodyWeight + 100, 1.4, "0.08em"),
    button: step(0, bodyWeight + 100, 1, "0.02em"),
  };
}

export function getPresetByIdOrDefault(id: string): TypeScalePreset {
  return TYPE_SCALE_PRESETS.find((p) => p.id === id) ?? TYPE_SCALE_PRESETS[1];
}
