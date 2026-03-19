import { Skill } from "@/lib/types";

export const securityAuditSkill: Skill = {
  slug: "security-audit",
  title: "Security Audit",
  description:
    "Run a comprehensive security audit covering OWASP Top 10, dependency vulnerabilities, secrets detection, and code injection risks",
  tags: ["security", "audit", "owasp", "vulnerabilities", "code-review"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Security Audit Skill

Comprehensive security analysis covering common vulnerability patterns, dependency risks, and configuration weaknesses.

## Usage
\`\`\`
/security-audit
\`\`\`

## Behavior
1. Scan for OWASP Top 10 vulnerabilities in application code
2. Check dependencies for known CVEs
3. Detect hardcoded secrets, API keys, and credentials
4. Review authentication and authorization patterns
5. Analyze input validation and output encoding

## Audit Categories

### Injection Risks
- SQL injection via string concatenation
- Command injection through shell execution
- XSS via unescaped user input in templates
- Path traversal in file operations

### Authentication & Authorization
- Weak session management
- Missing CSRF protection
- Broken access control patterns
- Insecure password handling

### Configuration
- Debug mode enabled in production configs
- Overly permissive CORS settings
- Missing security headers
- Exposed error details

### Dependencies
- Known CVEs in direct and transitive dependencies
- Outdated packages with security patches available
- Packages with known malicious versions

## Output
- Severity-ranked findings (Critical, High, Medium, Low)
- Code locations with line references
- Remediation guidance for each finding
- Summary scorecard

## Example
\`\`\`
/security-audit
\`\`\`
Produces a detailed security report with prioritized findings and fix recommendations.
`,
};
