import { Skill } from "@/lib/types";

export const depsAuditSkill: Skill = {
  slug: "deps-audit",
  title: "Dependency Audit",
  description:
    "Audit project dependencies for security vulnerabilities, outdated packages, and license compliance",
  tags: ["dependencies", "security", "audit", "npm", "packages"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Dependency Audit Skill

Comprehensive dependency analysis covering security vulnerabilities, outdated packages, unused dependencies, and license compliance.

## Usage
\`\`\`
/deps-audit
\`\`\`

## Behavior
1. Run the package manager's built-in audit (npm audit, yarn audit, pip audit)
2. Check for outdated packages and available updates
3. Detect unused dependencies via depcheck or equivalent
4. Analyze license compatibility for the project

## Audit Report Sections

### Security Vulnerabilities
- Critical and high severity issues with remediation steps
- Transitive dependency vulnerabilities
- Known exploit availability

### Outdated Packages
- Packages with available major, minor, and patch updates
- Breaking change warnings for major version bumps
- Migration guide links where available

### Unused Dependencies
- Packages in package.json not imported anywhere
- DevDependencies that could be removed
- Duplicate packages providing the same functionality

### License Compliance
- License types for all direct dependencies
- Copyleft license warnings (GPL, AGPL)
- License compatibility matrix for the project

## Output
- Summary table with actionable recommendations
- Priority-ranked list of updates to apply
- One-command fix suggestions where safe

## Example
\`\`\`
/deps-audit
\`\`\`
Produces a full dependency health report with prioritized action items.
`,
};
