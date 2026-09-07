import { MCPServer } from "@/lib/types";

export const provenskillsServer: MCPServer = {
  slug: "provenskills",
  title: "ProvenSkills",
  description:
    "Skill packs written by domain experts, delivered over a hosted MCP connector. Add one link per seller and every pack update arrives on its own. Five free packs: Meeting Ops, Plain Writing, Retention Desk, Claims Desk Field Kit, Skill Author Kit.",
  tags: ["skills", "productivity", "writing", "business", "sales", "customer-success", "insurance"],
  author: {
    name: "ProvenSkills",
    url: "https://provenskills.ai",
  },
  docsUrl: "https://provenskills.ai/how-it-works",
  dateAdded: "2026-09-07",
  installCommand: "claude mcp add --transport http provenskills-labs https://mcp.provenskills.ai/labs/mcp",
  config: `{
  "mcpServers": {
    "provenskills-labs": {
      "type": "http",
      "url": "https://mcp.provenskills.ai/labs/mcp"
    }
  }
}`,
};
