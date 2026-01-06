import { Plugin } from "@/lib/types";

export const firebasePlugin: Plugin = {
  slug: "firebase",
  title: "Firebase",
  description: "Google Firebase MCP integration. Comprehensive backend management including Firestore databases, authentication, cloud functions, hosting, and storage solutions integrated into your development workflow.",
  tags: ["database", "backend", "google", "authentication", "official"],
  featured: false,
  author: {
    name: "Google",
    url: "https://firebase.google.com",
  },
  installCommand: "claude plugins add firebase@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "firebase@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/firebase",
};
