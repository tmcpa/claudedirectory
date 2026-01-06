import { Plugin } from "@/lib/types";

export const ultrathinkPlugin: Plugin = {
  slug: "ultrathink",
  title: "Ultrathink",
  description: "Advanced workflow orchestration with enhanced reasoning, planning, and multi-step problem solving",
  tags: ["thinking", "reasoning", "planning", "workflow", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ultrathink",
  },
  repoUrl: "https://github.com/ultrathink/claude-ultrathink",
  installCommand: "npx claude-plugins install ultrathink",
  config: `{
  "enabledPlugins": {
    "ultrathink": true
  }
}`,
  commands: [
    { name: "/think", description: "Enter deep thinking mode for complex problems" },
    { name: "/plan", description: "Create a detailed execution plan" },
    { name: "/reason", description: "Break down reasoning step by step" },
  ],
};
