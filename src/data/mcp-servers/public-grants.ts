import { MCPServer } from "@/lib/types";

export const publicGrantsServer: MCPServer = {
  slug: "public-grants",
  title: "Public Grants",
  description:
    "Grants advisor for French startups and AI agents. 21 tools: profile pre-fill, profile enrichment, eligibility DSL across 49 programmes (CIR, JEI, BPI, CNC, ADEME, EIC), drafting with .md/.docx export, and strategic briefing PDF. Rules coded from official legal texts - not hallucinated. Free discovery; EUR 49/dossier vs EUR 2,000-5,000 at a consulting firm. EU-hosted, RGPD compliant.",
  tags: ["grants", "france", "startup", "finance", "government", "ai-agents"],
  featured: false,
  author: {
    name: "PyratzLabs",
    url: "https://pyratzlabs.com",
  },
  config: `{
  "mcpServers": {
    "public-grants": {
      "url": "https://grants.mrchief.ai/mcp/"
    }
  }
}`,
};

