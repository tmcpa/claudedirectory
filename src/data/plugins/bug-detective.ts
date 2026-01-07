import { Plugin } from "@/lib/types";

export const bugDetectivePlugin: Plugin = {
  slug: "bug-detective",
  title: "Bug Detective",
  description: "Systematically debug issues with step-by-step troubleshooting approaches",
  tags: ["debugging", "troubleshooting", "analysis", "community"],
  featured: false,
  author: {
    name: "Anonymous",
    url: "https://github.com/ccplugins/marketplace",
  },
  repoUrl: "https://github.com/ccplugins/marketplace/tree/main/plugins/bug-detective",
  commands: [
    { name: "/bug-detective", description: "Debug issues with step-by-step troubleshooting" },
  ],
};
