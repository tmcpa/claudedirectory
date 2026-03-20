import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebsiteJsonLd } from "@/components/json-ld";
import { BASE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Claude Directory - Best Prompts, MCP Servers, Skills & Plugins for Claude Code",
    template: "%s | Claude Directory",
  },
  description:
    "The #1 directory for Claude Code configurations. Browse 100+ community-curated prompts, MCP servers, hooks, skills, plugins, and agents. Copy-paste setup in seconds.",
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
    "claude code directory",
    "claude code configurations",
    "CLAUDE.md",
    "claude code agents",
  ],
  authors: [{ name: "Claude Directory" }],
  creator: "Claude Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Claude Directory",
    title: "Claude Directory - Best Prompts, MCP Servers, Skills & Plugins for Claude Code",
    description:
      "The #1 directory for Claude Code configurations. Browse 100+ community-curated prompts, MCP servers, hooks, skills, plugins, and agents. Copy-paste setup in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Directory - Best Prompts, MCP Servers, Skills & Plugins for Claude Code",
    description:
      "The #1 directory for Claude Code configurations. Browse 100+ community-curated prompts, MCP servers, hooks, skills, plugins, and agents. Copy-paste setup in seconds.",
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
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
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
          description="The #1 directory for Claude Code configurations. Browse 100+ community-curated prompts, MCP servers, hooks, skills, plugins, and agents. Copy-paste setup in seconds."
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
