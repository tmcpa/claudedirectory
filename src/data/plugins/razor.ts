import { Plugin } from "@/lib/types";

export const razorPlugin: Plugin = {
  slug: "razor",
  title: "razor",
  description:
    "Stops Claude from adding code nobody needed: one evidence-backed check before every new package, file or abstraction, so a one-line feature stays a one-line feature instead of a new library and five helper files",
  tags: ["yagni", "dependencies", "hooks", "code-quality", "community"],
  featured: false,
  author: {
    name: "Victor Villegas",
    url: "https://github.com/V-Songbird",
  },
  repoUrl: "https://github.com/V-Songbird/razor",
  installCommand: "/plugin marketplace add V-Songbird/foundry && /plugin install razor@foundry",
  commands: [
    {
      name: "/razor:unused",
      description: "Find dependencies in the manifest that no source file imports",
    },
  ],
};
