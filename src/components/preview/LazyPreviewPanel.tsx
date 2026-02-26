"use client";

import dynamic from "next/dynamic";

const PreviewPanel = dynamic(
  () => import("./PreviewPanel").then((m) => m.PreviewPanel),
  { ssr: false }
);

export function LazyPreviewPanel() {
  return <PreviewPanel />;
}
