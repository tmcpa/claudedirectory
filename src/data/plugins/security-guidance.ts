import { Plugin } from "@/lib/types";

export const securityGuidancePlugin: Plugin = {
  slug: "security-guidance",
  title: "Security Guidance",
  description: "Real-time security linter detecting injection vulnerabilities, authentication flaws, and OWASP Top 10 issues. Monitors 9 common vulnerability patterns including SQL injection, XSS, CSRF, and insecure deserialization during file editing.",
  tags: ["security", "vulnerability", "analysis", "hooks", "official", "owasp"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "claude plugins add security-guidance@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "security-guidance@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/security-scan", description: "Run full security scan on codebase or specific files" },
    { name: "/audit", description: "Security audit with OWASP Top 10 checklist" },
    { name: "/secrets-check", description: "Scan for hardcoded secrets and credentials" },
    { name: "/dependency-audit", description: "Check dependencies for known vulnerabilities" },
  ],
  relatedItems: [
    { type: "agent", slug: "security-agent", relationship: "works-with" },
    { type: "how-to", slug: "plugins", relationship: "documented-by" },
  ],
};
