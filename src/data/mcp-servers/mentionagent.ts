import { MCPServer } from "@/lib/types";

export const mentionagentServer: MCPServer = {
  slug: "mentionagent",
  title: "MentionAgent Server",
  description:
    "Link building outreach from your own agent: read drafted outreach emails, edit or approve the batch, answer publisher replies, record placements and change a campaign in plain English. Remote, bearer key.",
  tags: ["seo", "link-building", "outreach", "email", "marketing", "remote"],
  featured: false,
  author: {
    name: "MentionAgent",
    url: "https://mentionagent.ai",
  },
  docsUrl: "https://mentionagent.ai/mcp/",
  repoUrl: "https://github.com/BuildsbyMatt/mentionagent-claude-skill",
  installCommand:
    'claude mcp add --transport http mentionagent https://mentionagent.ai/mcp --header "Authorization: Bearer ma_live_your_key"',
  config: `{
  "mcpServers": {
    "mentionagent": {
      "type": "http",
      "url": "https://mentionagent.ai/mcp",
      "headers": { "Authorization": "Bearer ma_live_your_key" }
    }
  }
}`,
};
