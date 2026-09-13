import { MCPServer } from "@/lib/types";

export const selvedgeServer: MCPServer = {
  // Preserve the existing ingested URL and override its guessed npm package.
  slug: "masondelan-selvedge",
  title: "Selvedge",
  description:
    "Local decision history for AI coding agents. Record reasons and rejected approaches, then query prior attempts and outcomes by entity before editing. SQLite storage; recording and retrieval require tool calls.",
  tags: ["developer-tools", "ai", "agent"],
  author: {
    name: "masondelan",
    url: "https://github.com/masondelan",
  },
  repoUrl: "https://github.com/masondelan/selvedge",
  docsUrl: "https://selvedge.sh/start/quickstart/",
  installCommand: "npx -y selvedge-mcp",
  config: `{
  "mcpServers": {
    "selvedge": {
      "command": "npx",
      "args": ["-y", "selvedge-mcp"]
    }
  }
}`,
};
