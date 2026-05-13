import { Plugin } from "@/lib/types";

export const mcpRegistryPlugin: Plugin = {
  slug: "mcp-registry",
  title: "MCP Registry",
  description: "Search the public MCP server registry from inside Claude Code. List connectors, search by capability, and get server suggestions based on what you're working on — without leaving your terminal.",
  tags: ["official", "anthropic", "mcp", "registry", "discovery"],
  featured: false,
  dateAdded: "2026-02-15",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "/plugin install mcp-registry@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "mcp-registry@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/mcp search", description: "Search the MCP registry by keyword or capability" },
    { name: "/mcp list", description: "List available connectors in the registry" },
    { name: "/mcp suggest", description: "Get MCP server suggestions based on your current work" },
  ],
  relatedItems: [
    { type: "skill", slug: "mcp-builder", relationship: "works-with" },
  ],
};
