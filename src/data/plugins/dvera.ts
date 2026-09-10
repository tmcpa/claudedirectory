import { Plugin } from "@/lib/types";

export const dveraPlugin: Plugin = {
  slug: "dvera",
  title: "DVERA",
  description:
    "Prepare and coordinate C/C++ verification with CT (Controller Tester) for mission-critical software. 14 Skills cover project setup, analysis, test generation and execution, statement/branch/MC-DC coverage review, GoogleTest reuse, and regression follow-up. CT itself performs the analysis, builds, execution, and measurement.",
  tags: [
    "testing",
    "c",
    "cpp",
    "embedded",
    "unit-testing",
    "test-automation",
    "code-coverage",
    "mcdc",
    "mission-critical",
    "regression-testing",
    "iso-26262",
    "community",
  ],
  featured: false,
  author: {
    name: "Suresoft Technologies",
    url: "https://github.com/SuresoftTechnologies",
  },
  repoUrl: "https://github.com/SuresoftTechnologies/dvera-plugin",
  installCommand:
    "/plugin marketplace add SuresoftTechnologies/dvera-plugin && /plugin install dvera@suresofttech",
  config: `{
  "enabledPlugins": {
    "dvera@suresofttech": true
  }
}`,
  commands: [
    {
      name: "/dvera:ct-init-project",
      description:
        "Run the CT pipeline from initial setup through macro extraction, analysis, and testing",
    },
    {
      name: "/dvera:ct-orchestrator",
      description: "Continue an existing session from its recorded state",
    },
    {
      name: "/dvera:ct-extract-macro",
      description: "Extract the target compiler's default macros",
    },
    {
      name: "/dvera:ct-make-conf",
      description: "Generate the conversion .conf and toolchain metadata",
    },
    {
      name: "/dvera:ct-setup-project",
      description:
        "Create the CT toolchain and project, and apply compile flags",
    },
    {
      name: "/dvera:ct-analysis-loop",
      description:
        "Classify analysis errors and retry fixes until analysis succeeds",
    },
    {
      name: "/dvera:ct-test-loop",
      description:
        "Generate and run tests, correcting build failures through a feedback loop",
    },
    {
      name: "/dvera:ct-req-to-test",
      description:
        "Generate a CT AI test for one function from user-approved requirements",
    },
    {
      name: "/dvera:ct-run-gtest",
      description:
        "Re-run GoogleTest assets already registered in a CT project",
    },
    {
      name: "/dvera:ct-regression",
      description:
        "Rerun tests after a change and report new failures and coverage deltas",
    },
    {
      name: "/dvera:ct-self-healing",
      description:
        "Collect regression evidence and identify tests needing review",
    },
    {
      name: "/dvera:ct-report",
      description: "Export test results and coverage as PDF, HTML, or XLSX",
    },
    {
      name: "/dvera:ct-kb-update",
      description: "Append attempt results to the observations record",
    },
    {
      name: "/dvera:ct-open",
      description: "Launch CT with the current workspace for visual inspection",
    },
  ],
};
