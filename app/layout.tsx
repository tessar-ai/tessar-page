import type { Metadata } from "next";
import localFont from "next/font/local";
import type { CSSProperties } from "react";
import { themeScript } from "./components/site/theme";
import brand from "../public/brand/tessar/manifest.json";
import "./globals.css";

const plexSans = localFont({
  src: "../public/fonts/ibmplexsans.ttf",
  variable: "--font-plex-sans",
  weight: "100 700",
  display: "swap",
});

const plexMono = localFont({
  src: "../public/fonts/ibmplexmono.ttf",
  variable: "--font-plex-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tessar — Anything can be plugin.",
  description: "A TypeScript framework for CLI agents and application integrations. Build with the plugins you choose.",
  icons: { icon: "/brand/tessar/favicon.svg" },
  openGraph: {
    title: "Tessar — Anything can be plugin.",
    description: "A TypeScript framework for CLI agents and application integrations. Extend the core with the capabilities you choose.",
    type: "website",
  },
  twitter: { card: "summary", title: "Tessar — Anything can be plugin." },
  other: { "page-type": "software", "site-kind": "software" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-type="software"
      data-theme="dark"
      style={{ "--brand-primary": brand.primary } as CSSProperties}
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
