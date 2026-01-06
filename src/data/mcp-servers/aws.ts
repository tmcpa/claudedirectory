import { MCPServer } from "@/lib/types";

export const awsServer: MCPServer = {
  slug: "aws",
  title: "AWS Server",
  description: "Access AWS documentation, billing data, and service metadata for cloud infrastructure management",
  tags: ["cloud", "aws", "infrastructure", "devops", "official"],
  featured: true,
  author: {
    name: "AWS Labs",
    url: "https://github.com/awslabs",
  },
  installCommand: "npm install -g @awslabs/mcp-server-aws",
  config: `{
  "mcpServers": {
    "aws": {
      "command": "npx",
      "args": ["-y", "@awslabs/mcp-server-aws"],
      "env": {
        "AWS_ACCESS_KEY_ID": "your-access-key-id",
        "AWS_SECRET_ACCESS_KEY": "your-secret-access-key",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}`,
};
