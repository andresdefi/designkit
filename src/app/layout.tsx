import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { SelectionPanel } from "@/components/layout/SelectionPanel";
import { LazyPreviewPanel } from "@/components/preview/LazyPreviewPanel";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { GeneratePanel } from "@/components/ai/GeneratePanel";
import { CommandPalette } from "@/components/layout/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesignKit",
  description: "Local design identity builder — browse, pick, export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=JSON.parse(localStorage.getItem("designkit-selections")||"{}");var t=d.state&&d.state.appTheme;if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex h-dvh overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
            <LazyPreviewPanel />
            <SelectionPanel />
          </div>
          <GeneratePanel />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
