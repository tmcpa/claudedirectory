import { Plugin } from "@/lib/types";

export const dockerPlugin: Plugin = {
  slug: "docker",
  title: "Docker",
  description: "Docker container management and orchestration. Build images, manage containers, work with Docker Compose, and handle container networking directly from Claude Code.",
  tags: ["docker", "containers", "devops", "official"],
  featured: false,
  author: {
    name: "Docker",
    url: "https://docker.com",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/docker",
  installCommand: "claude plugins add docker@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "docker@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/docker-build", description: "Build Docker image from Dockerfile" },
    { name: "/docker-compose", description: "Manage Docker Compose services" },
    { name: "/docker-run", description: "Run container with configuration" },
    { name: "/docker-logs", description: "View container logs" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "docker", relationship: "requires" },
  ],
};
