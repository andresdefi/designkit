"use client";

import type { ReactNode } from "react";
import type { ColorMode } from "@/lib/types";

interface MiniAppFrameProps {
  colors: ColorMode;
  topSlot?: ReactNode;
  bottomSlot?: ReactNode;
  centerSlot?: ReactNode;
  height?: number;
  hideContentLines?: boolean;
}

export function MiniAppFrame({
  colors,
  topSlot,
  bottomSlot,
  centerSlot,
  height = 160,
  hideContentLines = false,
}: MiniAppFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        borderRadius: "8px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {topSlot && <div style={{ flexShrink: 0 }}>{topSlot}</div>}

      {centerSlot ? (
        <div style={{ flex: 1, overflow: "hidden" }}>{centerSlot}</div>
      ) : !hideContentLines ? (
        <div
          style={{
            flex: 1,
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "4px",
              width: "70%",
              borderRadius: "2px",
              backgroundColor: colors.textMuted + "30",
            }}
          />
          <div
            style={{
              height: "4px",
              width: "50%",
              borderRadius: "2px",
              backgroundColor: colors.textMuted + "20",
            }}
          />
          <div
            style={{
              height: "4px",
              width: "60%",
              borderRadius: "2px",
              backgroundColor: colors.textMuted + "20",
            }}
          />
          <div
            style={{
              height: "4px",
              width: "40%",
              borderRadius: "2px",
              backgroundColor: colors.textMuted + "15",
            }}
          />
        </div>
      ) : null}

      {bottomSlot && <div style={{ flexShrink: 0 }}>{bottomSlot}</div>}
    </div>
  );
}

export function MiniSidebarFrame({
  colors,
  sidebarSlot,
  height = 160,
}: {
  colors: ColorMode;
  sidebarSlot: ReactNode;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        borderRadius: "8px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flexShrink: 0, height: "100%" }}>{sidebarSlot}</div>
      <div
        style={{
          flex: 1,
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "4px",
            width: "80%",
            borderRadius: "2px",
            backgroundColor: colors.textMuted + "30",
          }}
        />
        <div
          style={{
            height: "4px",
            width: "55%",
            borderRadius: "2px",
            backgroundColor: colors.textMuted + "20",
          }}
        />
        <div
          style={{
            height: "4px",
            width: "65%",
            borderRadius: "2px",
            backgroundColor: colors.textMuted + "20",
          }}
        />
        <div
          style={{
            height: "4px",
            width: "45%",
            borderRadius: "2px",
            backgroundColor: colors.textMuted + "15",
          }}
        />
      </div>
    </div>
  );
}
