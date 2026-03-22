import { MCPServer } from "@/lib/types";

export const googleColabServer: MCPServer = {
  slug: "google-colab",
  title: "Google Colab",
  description:
    "Connect AI agents to Google Colab notebooks for running code, managing notebook cells, and executing data science workflows",
  tags: ["google", "colab", "notebooks", "data-science", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Google Colab",
    url: "https://github.com/googlecolab",
  },
  repoUrl: "https://github.com/googlecolab/colab-mcp",
  installCommand: "pip install colab-mcp",
  config: `{
  "mcpServers": {
    "google-colab": {
      "command": "uvx",
      "args": ["colab-mcp"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key"
      }
    }
  }
}`,
};
