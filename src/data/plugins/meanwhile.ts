import { Plugin } from "@/lib/types";

export const meanwhilePlugin: Plugin = {
  slug: "meanwhile",
  title: "Meanwhile",
  description: "Adds a disclosed, revenue-sharing status line to Claude Code: while the agent is thinking it shows a rotating tip, and occasionally a clearly-labeled \"(sponsored)\" line. Half of what a sponsor line earns is paid to you over PayPal. Also works with Copilot CLI and VS Code.",
  tags: ["statusline", "monetization", "cli", "vscode", "copilot-cli"],
  author: {
    name: "Nirmeet Trivedi",
    url: "https://github.com/heenatrivedi321-max",
  },
  repoUrl: "https://github.com/heenatrivedi321-max/deadtime",
  installCommand: "npx trymeanwhile",
  commands: [
    { name: "npx trymeanwhile claim", description: "Check what you've earned and register a payout email" },
  ],
};
