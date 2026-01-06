import { MCPServer } from "@/lib/types";

export const figmaServer: MCPServer = {
  slug: "figma",
  title: "Figma Server",
  description: "Access Figma designs with live structure, hierarchy, auto-layout, variants, and text styles for accurate code generation",
  tags: ["figma", "design", "ui", "official"],
  featured: true,
  author: {
    name: "Figma",
    url: "https://github.com/figma",
  },
  repoUrl: "https://github.com/figma/figma-mcp-server",
  installCommand: "npm install -g @anthropic-ai/mcp-server-figma",
  config: `{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-access-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "plugin", slug: "frontend-design", relationship: "works-with" },
  ],
};
