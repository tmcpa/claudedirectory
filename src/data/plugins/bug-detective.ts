import { Plugin } from "@/lib/types";

export const bugDetectivePlugin: Plugin = {
  slug: "bug-detective",
  title: "Bug Detective",
  description: "Systematically debug issues with step-by-step troubleshooting approaches",
  tags: ["debugging", "troubleshooting", "analysis", "community"],
  featured: false,
  author: {
    name: "Anonymous",
    url: "https://github.com/ccplugins/awesome-claude-code-plugins",
  },
  repoUrl: "https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-detective",
  installCommand: "/plugin marketplace add ccplugins/awesome-claude-code-plugins && /plugin install bug-detective@awesome-claude-code-plugins",
  commands: [
    { name: "/bug-detective", description: "Debug issues with step-by-step troubleshooting" },
  ],
};
