import { MCPServer } from "@/lib/types";

export const azureServer: MCPServer = {
  slug: "azure",
  title: "Azure",
  description:
    "Manage Azure resources including VMs, storage accounts, App Service, Azure SQL, and networking through the Azure Resource Manager API",
  tags: ["azure", "microsoft", "cloud", "infrastructure", "official"],
  featured: false,
  author: {
    name: "Microsoft",
    url: "https://github.com/microsoft",
  },
  repoUrl: "https://github.com/microsoft/azure-mcp",
  installCommand: "npm install -g @azure/mcp-server",
  config: `{
  "mcpServers": {
    "azure": {
      "command": "npx",
      "args": ["-y", "@azure/mcp-server"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id",
        "AZURE_TENANT_ID": "your-tenant-id",
        "AZURE_CLIENT_ID": "your-client-id",
        "AZURE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "terraform", relationship: "works-with" },
    { type: "mcp-server", slug: "kubernetes", relationship: "works-with" },
  ],
};
