import { Plugin } from "@/lib/types";

export const demodayPlugin: Plugin = {
  slug: "demoday",
  title: "DemoDay",
  description:
    "Creates demo videos for your projects. Claude is given tools to drive the browser/cli, make recordings, and uses FAL.ai, ElevenLabs, and remotion to build a demo video with scene transitions. Supports both 16:9 promo/tutorial demos, and Short cut 9:16 listicle/cohost videos. Open source and MIT licensed.",
  tags: ["demo-video", "ai video", "indie hacker tools", "eleven labs", "fal ai", "remotion", "screen-recording", "macos"],
  featured: false,
  dateAdded: "2026-08-25",
  author: {
    name: "Mark Rieck",
    url: "https://github.com/mrieck",
  },
  repoUrl: "https://github.com/mrieck/demoday-claude-plugin",
  installCommand:
    "/plugin marketplace add mrieck/claude-plugins && /plugin install demoday@productive-mark",
  config: `{
  "enabledPlugins": {
    "demoday@productive-mark": true
  }
}`,
  commands: [
    {
      name: "/demoday:create-demo-video",
      description:
        "Plan, rehearse, record, narrate and render a demo video of the current project (16:9 launch/tutorial/explainer styles, or a 9:16 Short cut from the same captures)",
    },
  ],
};
