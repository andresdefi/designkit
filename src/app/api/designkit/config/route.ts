import { NextResponse } from "next/server";
import { getState } from "@/lib/state-cache";
import { buildConfig } from "@/lib/resolve-config";

export async function GET() {
  const state = getState();
  if (!state) {
    return NextResponse.json(
      { error: "No state available. Open DesignKit in the browser and make a selection first." },
      { status: 404 }
    );
  }

  const config = buildConfig(state);
  return NextResponse.json(config);
}
