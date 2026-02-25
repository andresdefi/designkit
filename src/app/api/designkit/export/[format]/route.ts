import { NextRequest, NextResponse } from "next/server";
import { getState } from "@/lib/state-cache";
import { buildConfig } from "@/lib/resolve-config";
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

const EXPORTERS: Record<string, (config: ReturnType<typeof buildConfig>) => string> = {
  json: exportJSON,
  css: exportCSS,
  tailwind: exportTailwind,
  swift: exportSwift,
  kotlin: exportKotlin,
  flutter: exportFlutter,
  "react-native": exportReactNative,
  "claude-md": exportClaudeMd,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ format: string }> }
) {
  const { format } = await params;
  const exporter = EXPORTERS[format];

  if (!exporter) {
    return NextResponse.json(
      { error: `Unknown format: ${format}. Valid: ${Object.keys(EXPORTERS).join(", ")}` },
      { status: 400 }
    );
  }

  const state = getState();
  if (!state) {
    return NextResponse.json(
      { error: "No state available. Open DesignKit in the browser and make a selection first." },
      { status: 404 }
    );
  }

  const config = buildConfig(state);
  const output = exporter(config);

  return new NextResponse(output, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
