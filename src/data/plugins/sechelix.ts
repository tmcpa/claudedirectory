import { Plugin } from "@/lib/types";

export const sechelixPlugin: Plugin = {
  slug: "sechelix",
  title: "SecHelix",
  description:
    "Evidence-first application-security review for code you own or are authorized to test. Maps the attack surface and trust boundaries, checks only the security hypotheses that apply, and sends every candidate finding to an independent verifier whose job is to disprove it. High and Critical findings need regression proof, and the release gate returns PASS, PASS_WITH_KNOWN_RISK, BLOCKED or INCOMPLETE — never a clean result for a run that could not check.",
  tags: ["security", "audit", "appsec", "code-review", "authorization", "mcp", "community"],
  featured: false,
  author: {
    name: "Omar Mohelal",
    url: "https://github.com/omarmohelal",
  },
  installCommand:
    "/plugin marketplace add omarmohelal/sechelix-marketplace && /plugin install sechelix@sechelix",
  repoUrl: "https://github.com/omarmohelal/SecHelix",
};
