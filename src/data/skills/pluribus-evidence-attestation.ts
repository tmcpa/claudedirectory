import { Skill } from "@/lib/types";

export const pluribusEvidenceAttestationSkill: Skill = {
  slug: "pluribus-evidence-attestation",
  title: "Pluribus Evidence Attestation",
  description:
    "Emit privacy-safe claim/evidence/verdict packets for agent reviews, handoffs, approvals, scores, and skills.",
  tags: ["evidence", "attestation", "agent-skills", "review", "privacy", "git"],
  featured: false,
  dateAdded: "2026-07-07",
  author: {
    name: "Caio Ribeiro / Pluribus",
    url: "https://github.com/caioribeiroclw-pixel/pluribus",
  },
  repoUrl: "https://github.com/caioribeiroclw-pixel/pluribus/tree/main/skills/evidence-attestation",
  content: `# Pluribus Evidence Attestation

Use this skill when an agent, reviewer, CI job, or registry needs a compact proof object instead of raw prompts, transcripts, source code, secrets, or customer data.

## What it emits

A \`pluribus.evidence_attestation.v1\` packet with:

- subject: what claim, change, skill, score, approval, or handoff is being attested
- evidence_refs: privacy-safe pointers to artifacts such as commits, CI runs, docs, checks, or signed outputs
- claims: supported, contradicted, or unresolved statements
- omissions and limits: what was not checked and why
- privacy: booleans proving raw prompts, transcripts, source, secrets, and customer data were not embedded
- verdict: supported, review_required, contradicted, or unsafe
- stale_if: the conditions that invalidate reuse of this attestation later

## Good fits

- PR/review evidence where a later reviewer needs to know which checks actually ran
- agent-change manifests attached to Git commits or trailers
- leaderboard score provenance without leaking transcripts or diffs
- skill registry review where the verifier needs source and test evidence
- approval or handoff records that must survive outside one chat session

## Not a fit

Do not use it to store private transcripts, raw source, secrets, customer data, or as a generic memory layer. The skill is for reduced evidence and replay-safe authority windows.

## Runnable example

Pluribus includes a fixture and checker:

\`examples/evidence-attestation/evidence-attestation.json\`
\`examples/evidence-attestation/check-evidence-attestation.mjs\`

Use the checker to fail fast when the packet embeds private payloads, lacks evidence references, omits claim status, or forgets staleness conditions.
`,
};
