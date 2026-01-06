import { MCPServer } from "@/lib/types";

export const kubernetesServer: MCPServer = {
  slug: "kubernetes",
  title: "Kubernetes Server",
  description: "Manage Kubernetes clusters, pods, deployments, and services through natural language commands",
  tags: ["kubernetes", "k8s", "containers", "devops", "infrastructure", "community"],
  featured: false,
  author: {
    name: "MCP Community",
    url: "https://github.com/modelcontextprotocol",
  },
  installCommand: "npm install -g @mcp/kubernetes-server",
  config: `{
  "mcpServers": {
    "kubernetes": {
      "command": "npx",
      "args": ["-y", "@mcp/kubernetes-server"],
      "env": {
        "KUBECONFIG": "~/.kube/config"
      }
    }
  }
}`,
};
