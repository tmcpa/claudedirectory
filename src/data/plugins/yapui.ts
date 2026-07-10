import { Plugin } from "@/lib/types";

export const yapuiPlugin: Plugin = {
  slug: "yapui",
  title: "YapUI",
  description: "Live HTML preview with an in-browser feedback loop: talk, point, record, screenshot, or type and a resident Claude agent applies the fix in seconds",
  tags: ["frontend", "html", "preview", "voice", "community"],
  featured: false,
  dateAdded: "2026-07-10",
  author: {
    name: "Tatendaz",
    url: "https://github.com/Tatendaz",
  },
  repoUrl: "https://github.com/Tatendaz/yapui",
  installCommand: "/plugin marketplace add Tatendaz/yapui && /plugin install yapui@yapui-marketplace",
  commands: [
    { name: "/yapui", description: "Preview an HTML file in the browser with the live feedback loop" },
  ],
};
