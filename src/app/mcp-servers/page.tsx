import type { Metadata } from "next";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { mcpServers } from "@/data/mcp-servers";
import { MCPServersListing } from "./_components/mcp-servers-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Best MCP Servers for Claude Code (2026) - Ready-to-Paste Configs",
  description:
    "Connect Claude Code to GitHub, Slack, PostgreSQL, AWS, and 60+ services. Each MCP server includes a copy-paste JSON config — add it to settings and go.",
  keywords: [
    "mcp servers",
    "claude code mcp",
    "model context protocol",
    "best mcp servers",
    "claude code integrations",
  ],
  openGraph: {
    title: "Best MCP Servers for Claude Code",
    description:
      "Discover the best MCP servers for Claude Code. Connect to GitHub, databases, cloud platforms, and 60+ services with ready-to-use Model Context Protocol configurations.",
    url: `${BASE_URL}/mcp-servers`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best MCP Servers for Claude Code",
    description:
      "Discover the best MCP servers for Claude Code. Connect to GitHub, databases, cloud platforms, and 60+ services.",
  },
  alternates: {
    canonical: `${BASE_URL}/mcp-servers`,
  },
};

export default function MCPServersPage() {
  return (
    <div className="container py-8">
      <CollectionPageJsonLd
        name="MCP Servers for Claude Code"
        description="Model Context Protocol servers that connect Claude Code to databases, APIs, cloud platforms, and development tools."
        url={`${BASE_URL}/mcp-servers`}
        itemCount={mcpServers.length}
      />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">MCP Servers</h1>
        <p className="text-muted-foreground leading-relaxed">
          Model Context Protocol servers that connect Claude Code to databases, APIs,
          cloud platforms, and development tools. Each listing includes a ready-to-paste
          JSON configuration — add it to your settings, restart Claude Code, and the
          integration is live. Browse 60+ servers for GitHub, Slack, PostgreSQL, AWS,
          and more.
        </p>
      </div>

      <MCPServersListing />
    </div>
  );
}
