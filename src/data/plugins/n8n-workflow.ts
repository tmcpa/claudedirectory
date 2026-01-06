import { Plugin } from "@/lib/types";

export const n8nWorkflowPlugin: Plugin = {
  slug: "n8n-workflow",
  title: "n8n Workflow Builder",
  description: "Design, create, and manage n8n automation workflows directly from Claude Code",
  tags: ["n8n", "automation", "workflow", "integration", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/n8n-io",
  },
  repoUrl: "https://github.com/n8n-io/claude-n8n-plugin",
  installCommand: "npx claude-plugins install n8n-workflow",
  config: `{
  "enabledPlugins": {
    "n8n-workflow": true
  }
}`,
  commands: [
    { name: "/workflow", description: "Create a new n8n workflow" },
    { name: "/automate", description: "Suggest automation for a task" },
  ],
};
