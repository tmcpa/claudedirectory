import { Skill } from "@/lib/types";

export const regulatoryThreatModelSkill: Skill = {
  slug: "regulatory-threat-model",
  title: "Regulatory Threat Model (STRIDE + LINDDUN)",
  description:
    "STRIDE and LINDDUN threat modeling with a cited EU security-obligations screen (GDPR, NIS2, CRA, AI Act) and live CVE/CISA-KEV/EPSS dependency screening, run through the Ansvar Gateway MCP connector.",
  tags: ["security", "compliance", "threat-modeling", "gdpr", "nis2", "eu-regulation", "mcp"],
  featured: false,
  dateAdded: "2026-07-22",
  author: {
    name: "Ansvar Systems AB",
    url: "https://github.com/Ansvar-Systems",
  },
  repoUrl: "https://github.com/Ansvar-Systems/regulatory-threat-model-skill",
  content: `# Regulatory Threat Model (STRIDE + LINDDUN)

Turns an agent into the orchestrator of a real security review: a server-enforced STRIDE threat model, a LINDDUN privacy threat model when personal data flows, a dependency exposure screen against live vulnerability data, and a selected, non-exhaustive screen of EU security obligations — each cited from officially published legal text with its scope, role, and application-date limits stated.

## Overview

The threat-modeling workflows run on the Ansvar Gateway's workflow engine, which enforces steps and quality gates server-side. The skill's job is to feed the engine well and ground the regulatory layer; it never simulates the engine's output or answers legal questions from model memory.

## Requirements

- The Ansvar Gateway MCP connector: \`https://gateway.ansvar.eu/mcp\` (OAuth 2.1 with Dynamic Client Registration; free signup at ansvar.eu).
- Works in MCP-capable agents: Claude, ChatGPT, Microsoft Copilot, Gemini, and others.
- The STRIDE and LINDDUN workflow runs require a Premium plan or above (metered monthly). The dependency exposure screen and the obligations screen work on the Free plan.

## What It Covers

- **STRIDE threat modeling** — component-level threats, severity, asset impact, mitigations.
- **LINDDUN privacy analysis** — privacy threats for personal data flows.
- **Dependency exposure screen** — live CVE leads with CISA KEV status and EPSS scores, reported as confirmed / possible / unmatched with source attribution.
- **EU obligations screen** — GDPR (Articles 25, 32, 35), NIS2 (Articles 2, 21), CRA (Articles 2, 3, 13, 14, 69, 71), and AI Act (Article 15), each screened against scope, role, and application date and cited from the fetched text — never presented as a compliance verdict.

## Data Handling

Prose-only: the skill describes the system architecturally in the user's own words and never uploads source code, secrets, credentials, hostnames, or files.

## Example Usage

"Threat model this system" or "run a STRIDE and LINDDUN review before we ship" — the skill checks the connected plan, gathers an architecture-level system description, gets explicit consent before spending a metered workflow run, and assembles a deliverable with the workflow reports, the dependency exposure table, the obligations screen, and a record of what was searched, fetched, or left unresolved.

## Repository

[github.com/Ansvar-Systems/regulatory-threat-model-skill](https://github.com/Ansvar-Systems/regulatory-threat-model-skill)
`,
};
