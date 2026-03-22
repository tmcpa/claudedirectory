import { MCPServer } from "@/lib/types";

export const circleciServer: MCPServer = {
  slug: "circleci",
  title: "CircleCI",
  description:
    "Interact with CircleCI workflows, fix build failures, manage pipelines, and analyze CI/CD performance",
  tags: ["cicd", "circleci", "devops", "automation", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "CircleCI",
    url: "https://github.com/CircleCI-Public",
  },
  repoUrl: "https://github.com/CircleCI-Public/mcp-server-circleci",
  installCommand: "npx @circleci/mcp-server-circleci",
  config: `{
  "mcpServers": {
    "circleci": {
      "command": "npx",
      "args": ["-y", "@circleci/mcp-server-circleci"],
      "env": {
        "CIRCLECI_TOKEN": "your-circleci-token"
      }
    }
  }
}`,
};
