import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebsiteJsonLd } from "@/components/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Claude Directory - Prompts, MCP Servers, Hooks & Plugins for Claude Code",
    template: "%s | Claude Directory",
  },
  description:
    "Find the best prompts, MCP servers, hooks, skills, and plugins for Claude Code. A community-driven directory for Claude Code configurations.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "claude code",
    "claude",
    "anthropic",
    "ai",
    "mcp",
    "prompts",
    "hooks",
    "skills",
    "plugins",
    "claude code prompts",
    "mcp servers",
    "claude code hooks",
    "ai coding assistant",
  ],
  authors: [{ name: "Claude Directory" }],
  creator: "Claude Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Claude Directory",
    title: "Claude Directory - Prompts, MCP Servers, Hooks & Plugins for Claude Code",
    description:
      "Find the best prompts, MCP servers, hooks, skills, and plugins for Claude Code. A community-driven directory for Claude Code configurations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Directory - Prompts, MCP Servers, Hooks & Plugins for Claude Code",
    description:
      "Find the best prompts, MCP servers, hooks, skills, and plugins for Claude Code. A community-driven directory for Claude Code configurations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2JZHN6PMXE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2JZHN6PMXE');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <WebsiteJsonLd
          url={BASE_URL}
          name="Claude Directory"
          description="Find the best prompts, MCP servers, hooks, skills, and plugins for Claude Code. A community-driven directory for Claude Code configurations."
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
