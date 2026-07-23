import { MCPServer } from "@/lib/types";

export const productosMcp: MCPServer = {
  slug: "productos-mcp",
  title: "ProductOS",
  description: "Turn any AI client (Cursor, Claude Code, Windsurf) into a full ProductOS coding agent. Access 41+ tools for project management, cloud sandboxes, file operations, databases, deployments — all remote-first with no local clone needed.",
  tags: ["workspace", "project-management", "coding-agent", "sandbox", "deployment", "database", "cloud"],
  author: {
    name: "Shreyash Singh",
  },
  featured: true,
  logoUrl: "https://beta.productos.dev/logo.png",
  config: `{
  "mcpServers": {
    "productos": {
      "url": "https://beta.productos.dev/api/mcp/"
    }
  }
}`,
};
