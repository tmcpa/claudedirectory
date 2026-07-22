import { Skill } from "@/lib/types";

export const incidentReportingNavigatorSkill: Skill = {
  slug: "incident-reporting-navigator",
  title: "Incident Reporting Navigator (EU)",
  description:
    "Screens one security incident across NIS2, GDPR, DORA, and the Cyber Resilience Act, resolving the receiving authority per EU member state and reporting deadlines with citations fetched live from official sources.",
  tags: ["security", "compliance", "incident-response", "gdpr", "nis2", "dora", "eu-regulation", "mcp"],
  featured: false,
  dateAdded: "2026-07-22",
  author: {
    name: "Ansvar Systems AB",
    url: "https://github.com/Ansvar-Systems",
  },
  repoUrl: "https://github.com/Ansvar-Systems/incident-reporting-navigator-skill",
  content: `# Incident Reporting Navigator (EU)

One security event can trigger several EU reporting regimes at once, each with its own trigger test, receiving authority, and clock. Given the incident facts and the organisation's profile, this skill produces a cited notification map: which regimes fire for which legal entity, which do not and why, which authority to notify, and by when.

## Overview

Screens a single incident across four EU reporting regimes — NIS2, GDPR, DORA, and the Cyber Resilience Act — determining which duties fire for each involved entity's roles, resolving the receiving authority per regime and member state from served national law, and producing a deadline table in which every duty, authority, and deadline is cited from official publisher text fetched live through the Ansvar Gateway MCP connector.

## Requirements

- The Ansvar Gateway MCP connector: \`https://gateway.ansvar.eu/mcp\` (OAuth 2.1 with Dynamic Client Registration; free signup at ansvar.eu).
- Works in MCP-capable agents: Claude, ChatGPT, Microsoft Copilot, Gemini, and others.

## Key Features

- **Four-regime screening** for NIS2, GDPR, DORA, and CRA applicability, per involved entity and role.
- **Member-state authority resolution** using national transposition texts, not the directive alone.
- **Per-entity timestamp tracking** so each entity's clock starts from its own awareness date.
- **In-force verification** checking the temporal applicability of each duty before citing it.
- **Honest failure modes** distinguishing answered, unmatched, and retrieval-failed outcomes — never guessing an authority or a deadline from model memory.

## Example Usage

"We just discovered a breach affecting customer data — who do we need to notify and by when?" — the skill gathers the incident facts and the organisation's entity/role profile, screens each regime's trigger test against fetched legal text, resolves the receiving authority per member state, and returns a deadline table with every duty, authority, and deadline cited to its source.

## Repository

[github.com/Ansvar-Systems/incident-reporting-navigator-skill](https://github.com/Ansvar-Systems/incident-reporting-navigator-skill)
`,
};
