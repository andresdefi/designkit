import { NextRequest, NextResponse } from "next/server";
import { getState, setState } from "@/lib/state-cache";
import { emit } from "@/lib/event-bus";
import type { DesignKitState } from "@/lib/resolve-config";

export async function GET() {
  const state = getState();
  if (!state) {
    return NextResponse.json(
      { error: "No state available" },
      { status: 404 }
    );
  }
  return NextResponse.json(state);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as DesignKitState;

  if (!body.selections || !body.colorPicks || !body.typeScale) {
    return NextResponse.json(
      { error: "Invalid state: requires selections, colorPicks, typeScale" },
      { status: 400 }
    );
  }

  setState(body);
  emit("state.updated");

  return NextResponse.json({ ok: true });
}
