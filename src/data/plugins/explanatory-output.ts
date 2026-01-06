import { Plugin } from "@/lib/types";

export const explanatoryOutputPlugin: Plugin = {
  slug: "explanatory-output",
  title: "Explanatory Output Style",
  description: "Educational insights about implementation choices with SessionStart hook for enhanced learning context",
  tags: ["learning", "education", "documentation", "style", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add explanatory-output-style@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "explanatory-output-style@claude-plugins-official": true
  }
}`,
};
