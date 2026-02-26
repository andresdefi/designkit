import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/lib/categories";
import type { Category } from "@/lib/types";

// TODO: This stub will eventually call an LLM (e.g. Claude API) to generate
// new CatalogItem entries based on the user's prompt. The flow will be:
//   1. Validate category + prompt
//   2. Load the user's current selections for context (via resolveConfig)
//   3. Build a system prompt with the category's data schema + existing items
//   4. Call the LLM to generate a new CatalogItem<T> matching the category type
//   5. Validate the generated item against the TypeScript schema
//   6. Return the item for preview, then optionally persist to the user's catalog

const validCategories = new Set<string>(categories.map((c) => c.id));

function isValidCategory(value: string): value is Category {
  return validCategories.has(value);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, prompt } = body as { category?: string; prompt?: string };

    if (!category || typeof category !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'category' field" },
        { status: 400 },
      );
    }

    if (!isValidCategory(category)) {
      return NextResponse.json(
        { error: `Invalid category '${category}'. Must be one of: ${[...validCategories].join(", ")}` },
        { status: 400 },
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt' field" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: "stub",
      message: "AI generation coming soon",
      category,
      prompt,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }
}
