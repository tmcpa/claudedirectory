import { MCPServer } from "@/lib/types";

export const dockerServer: MCPServer = {
  slug: "docker",
  title: "Docker Server",
  description: "Manage Docker containers, images, volumes, and networks through natural language commands",
  tags: ["docker", "containers", "devops", "infrastructure", "community"],
  featured: false,
  author: {
    name: "MCP Community",
    url: "https://github.com/modelcontextprotocol",
  },
  installCommand: "npm install -g @mcp/docker-server",
  config: `{
  "mcpServers": {
    "docker": {
      "command": "npx",
      "args": ["-y", "@mcp/docker-server"],
      "env": {
        "DOCKER_HOST": "unix:///var/run/docker.sock"
      }
    }
  }
}`,
};
