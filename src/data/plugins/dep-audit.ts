import { Plugin } from "@/lib/types";

export const depAuditPlugin: Plugin = {
  slug: "dep-audit",
  title: "Dependency Auditor",
  description: "Audit project dependencies for security vulnerabilities, license compliance issues, outdated packages, and unused dependencies",
  tags: ["security", "dependencies", "audit", "npm", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add dep-audit",
  commands: [
    { name: "/deps:audit", description: "Scan dependencies for known vulnerabilities" },
    { name: "/deps:outdated", description: "List outdated packages with upgrade paths" },
    { name: "/deps:unused", description: "Detect unused dependencies in the project" },
    { name: "/deps:license", description: "Check dependency licenses for compliance" },
  ],
};
