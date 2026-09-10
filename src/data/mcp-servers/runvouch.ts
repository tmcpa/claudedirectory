import { MCPServer } from "@/lib/types";

export const runvouchServer: MCPServer = {
  slug: "runvouch",
  title: "RunVouch",
  description:
    "Dead man's switch for unattended agents: ask why last night's run is missing, stalled, failed or unproven, check cost caps, and read the tamper-evident proof of a finished run.",
  tags: ["monitoring", "observability", "cron", "alerting", "self-hosted"],
  author: { name: "RunVouch", url: "https://github.com/runvouch/runvouch" },
  docsUrl: "https://runvouch.com/docs/mcp",
  config: `{
  "mcpServers": {
    "runvouch": {
      "url": "https://api.runvouch.com/mcp",
      "headers": {
        "X-API-Key": "rv_YOUR_KEY"
      }
    }
  }
}`,
};
