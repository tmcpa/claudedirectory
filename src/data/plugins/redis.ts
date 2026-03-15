import { Plugin } from "@/lib/types";

export const redisPlugin: Plugin = {
  slug: "redis",
  title: "Redis",
  description: "Inspect Redis keys, monitor cache hit rates, debug pub/sub channels, and manage data structures through Claude Code",
  tags: ["database", "redis", "cache", "data", "external"],
  featured: false,
  author: {
    name: "Redis",
    url: "https://github.com/redis",
  },
  installCommand: "claude plugins add @redis/claude-plugin",
  commands: [
    { name: "/redis:keys", description: "Browse and inspect Redis keys by pattern" },
    { name: "/redis:monitor", description: "Monitor real-time Redis commands" },
    { name: "/redis:stats", description: "Show memory usage and cache hit rate statistics" },
  ],
};
