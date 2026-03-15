import { Plugin } from "@/lib/types";

export const storybookPlugin: Plugin = {
  slug: "storybook",
  title: "Storybook",
  description: "Generate Storybook stories for components, manage visual regression tests, and browse existing stories from Claude Code",
  tags: ["frontend", "storybook", "testing", "components", "external"],
  featured: false,
  author: {
    name: "Storybook",
    url: "https://github.com/storybookjs",
  },
  installCommand: "claude plugins add @storybook/claude-plugin",
  commands: [
    { name: "/story:gen", description: "Generate stories for a component file" },
    { name: "/story:list", description: "List all stories in the project" },
    { name: "/story:visual", description: "Run visual regression tests" },
  ],
};
