"use client";

import { useEffect, type ReactNode } from "react";
import { useDesignKit } from "@/lib/store";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { appTheme } = useDesignKit();

  useEffect(() => {
    document.documentElement.classList.toggle("light", appTheme === "light");
    document.documentElement.classList.toggle("dark", appTheme === "dark");
  }, [appTheme]);

  return <>{children}</>;
}
