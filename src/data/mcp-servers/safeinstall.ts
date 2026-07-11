import { MCPServer } from "@/lib/types";

export const safeinstallServer: MCPServer = {
  slug: "safeinstall",
  title: "SafeInstall",
  description: "Local-first supply-chain security gate for npm, pnpm, and bun — checks typosquats, release age, and Sigstore provenance before an agent installs",
  tags: ["security", "supply-chain", "npm", "package-management", "community"],
  featured: false,
  author: {
    name: "Mickdownunder",
    url: "https://github.com/Mickdownunder",
  },
  repoUrl: "https://github.com/Mickdownunder/SafeInstall",
  installCommand: "npm install -g safeinstall-cli",
  config: `{
  "mcpServers": {
    "safeinstall": {
      "command": "npx",
      "args": ["safeinstall-cli", "mcp"]
    }
  }
}`,
};
