import { Plugin } from "@/lib/types";

export const documentSkillsPlugin: Plugin = {
  slug: "document-skills",
  title: "Document Skills",
  description: "Process and generate Excel, Word, PowerPoint, and PDF documents with AI assistance",
  tags: ["documents", "excel", "word", "powerpoint", "pdf", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "/plugin marketplace add anthropics/skills && /plugin install document-skills@anthropic-agent-skills",
  config: `{
  "enabledPlugins": {
    "document-skills@anthropic-agent-skills": true
  }
}`,
  commands: [
    { name: "/excel", description: "Create or analyze Excel spreadsheets" },
    { name: "/word", description: "Generate or edit Word documents" },
    { name: "/ppt", description: "Create PowerPoint presentations" },
    { name: "/pdf", description: "Analyze and extract data from PDFs" },
  ],
};
