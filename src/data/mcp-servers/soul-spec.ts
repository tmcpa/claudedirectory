import { MCPServer } from "@/lib/types";

export const soulSpec: MCPServer = {
  slug: "soul-spec",
  title: "Soul Spec",
  description:
    "Browse, install, and manage AI agent personas. Search 80+ personas from the Soul Spec registry, preview as CLAUDE.md, and install directly into your project.",
  tags: ["ai-persona", "soul-spec", "persona", "identity", "agent"],
  author: { name: "ClawSouls", url: "https://clawsouls.ai" },
  installCommand: "npx -y soul-spec-mcp",
  config: `{
  "mcpServers": {
    "soul-spec": {
      "command": "npx",
      "args": ["-y", "soul-spec-mcp"]
    }
  }
}`,
};
