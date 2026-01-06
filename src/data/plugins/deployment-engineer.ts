import { Plugin } from "@/lib/types";

export const deploymentEngineerPlugin: Plugin = {
  slug: "deployment-engineer",
  title: "Deployment Engineer",
  description: "Streamline deployments with CI/CD pipeline generation, infrastructure as code, and deployment automation",
  tags: ["deployment", "ci-cd", "devops", "infrastructure", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/deployment-engineer",
  installCommand: "npx claude-plugins install deployment-engineer",
  config: `{
  "enabledPlugins": {
    "deployment-engineer": true
  }
}`,
  commands: [
    { name: "/deploy", description: "Generate deployment configuration" },
    { name: "/pipeline", description: "Create CI/CD pipeline" },
    { name: "/infra", description: "Generate infrastructure as code" },
  ],
  relatedItems: [
    { type: "agent", slug: "deployment-engineer", relationship: "works-with" },
    { type: "mcp-server", slug: "terraform", relationship: "works-with" },
  ],
};
