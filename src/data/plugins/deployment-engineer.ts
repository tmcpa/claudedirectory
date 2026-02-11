import { Plugin } from "@/lib/types";

export const deploymentEngineerPlugin: Plugin = {
  slug: "deployment-engineer",
  title: "Deployment Engineer",
  description: "Set up CI/CD pipelines, configure Docker containers, deploy to cloud platforms, set up Kubernetes clusters, and automate deployment workflows",
  tags: ["deployment", "ci-cd", "docker", "kubernetes", "devops", "community"],
  featured: false,
  author: {
    name: "Jure Sunic",
    url: "https://github.com/ccplugins/awesome-claude-code-plugins",
  },
  repoUrl: "https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/deployment-engineer",
  installCommand: "claude plugins:add ccplugins/awesome-claude-code-plugins/plugins/deployment-engineer",
};
