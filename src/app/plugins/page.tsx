import type { Metadata } from "next";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { plugins } from "@/data/plugins";
import { PluginsListing } from "./_components/plugins-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Best Claude Code Plugins (2026) - Install in One Command",
  description:
    "Browse 30+ Claude Code plugins for frontend, backend, DevOps, security, and more. One-command install. Community-built and official plugins to extend your AI coding assistant.",
  keywords: [
    "claude code plugins",
    "extend claude code",
    "claude code extensions",
    "best claude code plugins",
    "ai coding plugins",
  ],
  openGraph: {
    title: "Best Claude Code Plugins (2026) - Install in One Command",
    description:
      "Browse 30+ Claude Code plugins for frontend, backend, DevOps, security, and more. One-command install. Community-built and official plugins to extend your AI coding assistant.",
    url: `${BASE_URL}/plugins`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best Claude Code Plugins (2026) - Install in One Command",
    description:
      "Browse 30+ Claude Code plugins for frontend, backend, DevOps, security, and more. One-command install. Community-built and official plugins to extend your AI coding assistant.",
  },
  alternates: {
    canonical: `${BASE_URL}/plugins`,
  },
};

export default function PluginsPage() {
  return (
    <div className="container py-8">
      <CollectionPageJsonLd
        name="Claude Code Plugins"
        description="Installable packages that bundle MCP servers, hooks, skills, and configuration to add entire workflows to Claude Code."
        url={`${BASE_URL}/plugins`}
        itemCount={plugins.length}
      />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Plugins</h1>
        <p className="text-muted-foreground leading-relaxed">
          Installable packages that bundle MCP servers, hooks, skills, and configuration
          to add entire workflows to Claude Code in a single command. Most plugins install
          with npm or pip and integrate automatically. Browse community-built and official
          plugins for frontend, backend, DevOps, security, and more.
        </p>
      </div>

      <PluginsListing />
    </div>
  );
}
