import { MCPServer } from "@/lib/types";

export const terraformServer: MCPServer = {
  slug: "terraform",
  title: "Terraform Server",
  description: "Access Terraform registry providers and modules for infrastructure-as-code workflows",
  tags: ["terraform", "iac", "devops", "infrastructure", "hashicorp", "community"],
  featured: false,
  author: {
    name: "HashiCorp Community",
    url: "https://github.com/hashicorp",
  },
  installCommand: "npm install -g @hashicorp/mcp-server-terraform",
  config: `{
  "mcpServers": {
    "terraform": {
      "command": "npx",
      "args": ["-y", "@hashicorp/mcp-server-terraform"]
    }
  }
}`,
};
