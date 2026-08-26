import { MCPServer } from "@/lib/types";

export const parallelSearchServer: MCPServer = {
  slug: "parallel-search",
  title: "Parallel Search",
  description:
    "Search the live web and fetch clean Markdown from URLs through a free remote MCP server, with no account or API key required",
  tags: ["search", "web", "research", "data-extraction", "official"],
  featured: false,
  author: {
    name: "Parallel",
    url: "https://parallel.ai",
  },
  docsUrl: "https://docs.parallel.ai/integrations/mcp/search-mcp",
  config: `{
  "mcpServers": {
    "parallel-search": {
      "url": "https://search.parallel.ai/mcp"
    }
  }
}`,
};
