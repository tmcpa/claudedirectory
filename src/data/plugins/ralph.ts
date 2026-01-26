import { Plugin } from "@/lib/types";

export const ralphPlugin: Plugin = {
  slug: "ralph",
  title: "Ralph Autonomous Mode",
  description: "Autonomous overnight coding with fresh context management. Perfect for long-running tasks that need to maintain coherence across extended sessions",
  tags: ["autonomous", "overnight", "context", "long-running", "community"],
  featured: false,
  author: {
    name: "gmickel",
    url: "https://github.com/gmickel",
  },
  repoUrl: "https://github.com/gmickel/gmickel-claude-marketplace",
  installCommand: "/plugin marketplace add gmickel/gmickel-claude-marketplace && /plugin install ralph@gmickel-claude-marketplace",
  config: `{
  "enabledPlugins": {
    "ralph@gmickel-claude-marketplace": true
  }
}`,
  commands: [
    { name: "/ralph", description: "Start Ralph autonomous coding mode" },
    { name: "/ralph-status", description: "Check status of autonomous session" },
    { name: "/ralph-stop", description: "Stop autonomous coding session" },
  ],
};
