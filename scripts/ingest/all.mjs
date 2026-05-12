// Run all ingesters in sequence.

import { spawnSync } from "node:child_process";

const STEPS = [
  "scripts/ingest/marketplaces.mjs",
  "scripts/ingest/awesome-mcp.mjs",
  "scripts/ingest/skills.mjs",
];

let failed = 0;
for (const step of STEPS) {
  console.error(`\n=== running ${step} ===`);
  const res = spawnSync("node", [step], { stdio: "inherit" });
  if (res.status !== 0) {
    failed++;
    console.error(`!!! ${step} exited with ${res.status}`);
  }
}
process.exit(failed > 0 ? 1 : 0);
