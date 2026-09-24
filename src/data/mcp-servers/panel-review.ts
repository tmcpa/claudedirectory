import { MCPServer } from "@/lib/types";

export const panelReviewServer: MCPServer = {
  slug: "panel-review",
  title: "Panel Review",
  description: "Guardian agent for AI's highest-stakes coding decisions: four frontier models argue over an agent's riskiest designs, diffs, and commits before they execute, with review gates the agent cannot silently skip.",
  tags: ["code-review", "ai-agents", "mcp", "claude-code", "devsecops"],
  author: { name: "TruVerifAI", url: "https://truverif.ai" },
  repoUrl: "https://github.com/TruVerifAI/init",
  docsUrl: "https://truverif.ai/story",
  installCommand: "npx @truverifai/init",
  config: `{
  "mcpServers": {
    "truverifai": {
      "url": "https://mcp.truverif.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}`,
};
