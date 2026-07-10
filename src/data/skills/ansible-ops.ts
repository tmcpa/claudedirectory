import { Skill } from "@/lib/types";

export const ansibleOpsSkill: Skill = {
  slug: "ansible-ops",
  title: "Ansible Ops",
  description:
    "Write, review, lint, convert, and debug Ansible with production best practices — FQCN, idempotency, validated templates, no_log secrets, and ansible-lint/yamllint",
  tags: ["ansible", "devops", "linting", "infrastructure", "automation"],
  featured: false,
  author: {
    name: "Sajjad Hassanzadeh",
    url: "https://github.com/Hassanzadeh-sd",
  },
  repoUrl: "https://github.com/Hassanzadeh-sd/ansible-ops-toolkit",
  content: `# Ansible Ops Skill

Turns Claude into a senior Ansible engineer that produces idempotent, lint-clean,
production-grade Ansible — and reviews or fixes existing Ansible to the same bar.

## Usage
\`\`\`
/ansible-ops
\`\`\`

## Behavior
The skill detects and respects the project's existing conventions, then applies four
workflows depending on the request.

### Write / scaffold
- Playbooks, roles (standard layout), inventory, group_vars/host_vars, and Jinja2 templates
- FQCN modules, named tasks, role-prefixed variables, validated templates, notify/handlers

### Review & lint
- Runs \`ansible-playbook --syntax-check\`, \`yamllint\`, and \`ansible-lint\`
- Produces a severity-ranked report (error / warning / nit) and offers fixes via diff
- Scaffolds \`.yamllint\`, \`.ansible-lint\`, and pre-commit config when missing

### Convert bash → Ansible
- Maps each shell command to its native module instead of wrapping in \`command:\`
- Extracts literals into role defaults; wraps module-less commands with \`changed_when\`/\`creates\`

### Debug
- Triages failing plays: connection/auth/become, module arg errors, idempotency drift

## What it enforces
- Fully-qualified collection names (\`ansible.builtin.*\`)
- Idempotency (\`changed_when\` / \`creates\` on commands)
- \`no_log: true\` on secret-handling tasks; Ansible Vault for secrets
- Explicit \`mode:\` on copy/template/file; \`validate:\` before writing config
- Multi-OS guards and pinned collections
- Never overwrite files silently — diff and confirm first

## Notes
Ships with a lint-clean example role that passes ansible-lint's strictest (production)
profile, verified in CI on every push. MIT licensed.
`,
};
