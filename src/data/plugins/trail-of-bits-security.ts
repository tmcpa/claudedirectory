import { Plugin } from "@/lib/types";

export const trailOfBitsSecurityPlugin: Plugin = {
  slug: "trail-of-bits-security",
  title: "Trail of Bits Security",
  description:
    "Opinionated security-first Claude Code configuration with sandboxing, permission rules, hooks, and security audit skills from professional security researchers",
  tags: ["security", "audit", "hardening", "configuration", "community"],
  featured: false,
  author: {
    name: "Trail of Bits",
    url: "https://github.com/trailofbits",
  },
  repoUrl: "https://github.com/trailofbits/claude-code-config",
  installCommand: "/plugin install trail-of-bits-security",
  commands: [
    {
      name: "/security:audit",
      description: "Run a security audit on the current codebase",
    },
    {
      name: "/security:harden",
      description: "Apply security hardening to Claude Code settings",
    },
    {
      name: "/security:review",
      description: "Security-focused code review of recent changes",
    },
  ],
};
