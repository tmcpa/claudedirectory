import { Plugin } from "@/lib/types";

export const hushPlugin: Plugin = {
  slug: "hush",
  title: "hush",
  description:
    "Keeps Claude quiet until the job is done: one short answer at the end that leads with the result and names the file to open, plus hooks that trim long command output and logs before they pile up in the session",
  tags: ["output-style", "tokens", "hooks", "productivity", "adhd", "community"],
  featured: false,
  author: {
    name: "Victor Villegas",
    url: "https://github.com/V-Songbird",
  },
  repoUrl: "https://github.com/V-Songbird/hush",
  installCommand: "/plugin marketplace add V-Songbird/foundry && /plugin install hush@foundry",
  commands: [
    {
      name: "/hush:craft-style",
      description: "Build a voice of your own on hush's quiet frame",
    },
    {
      name: "/hush:pick-style",
      description: "Switch between your voices, or go back to the stock one",
    },
  ],
};
