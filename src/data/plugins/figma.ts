import { Plugin } from "@/lib/types";

export const figmaPlugin: Plugin = {
  slug: "figma",
  title: "Figma",
  description: "Figma design tool integration. Extract design specs, generate code from designs, access component libraries, and bridge the gap between design and development.",
  tags: ["design", "ui", "collaboration", "official"],
  featured: false,
  author: {
    name: "Figma",
    url: "https://figma.com",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/figma",
  installCommand: "claude plugins add figma@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "figma@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/figma-inspect", description: "Extract design specs from Figma file" },
    { name: "/figma-code", description: "Generate code from Figma component" },
    { name: "/figma-tokens", description: "Export design tokens" },
    { name: "/figma-assets", description: "Download assets from Figma" },
  ],
  relatedItems: [
    { type: "plugin", slug: "frontend-design", relationship: "works-with" },
    { type: "mcp-server", slug: "figma", relationship: "requires" },
  ],
};
