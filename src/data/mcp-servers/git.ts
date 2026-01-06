import { MCPServer } from "@/lib/types";

export const gitServer: MCPServer = {
  slug: "git",
  title: "Git Server",
  description: "Git repository operations including status, diff, commit, branch management, and history",
  tags: ["git", "vcs", "version-control", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "npm install -g @anthropic-ai/mcp-server-git",
  config: `{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-git",
        "--repository",
        "/path/to/your/repo"
      ]
    }
  }
}`,
};
