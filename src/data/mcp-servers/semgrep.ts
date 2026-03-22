import { MCPServer } from "@/lib/types";

export const semgrepServer: MCPServer = {
  slug: "semgrep",
  title: "Semgrep",
  description:
    "Scan code for security vulnerabilities, bugs, and anti-patterns using Semgrep static analysis rules",
  tags: ["security", "semgrep", "static-analysis", "sast", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Semgrep",
    url: "https://github.com/semgrep",
  },
  repoUrl: "https://github.com/semgrep/mcp",
  installCommand: "npx @semgrep/mcp",
  config: `{
  "mcpServers": {
    "semgrep": {
      "command": "npx",
      "args": ["-y", "@semgrep/mcp"],
      "env": {
        "SEMGREP_APP_TOKEN": "your-semgrep-token"
      }
    }
  }
}`,
};
