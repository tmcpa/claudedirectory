import { Agent } from "@/lib/types";

export const cloudArchitectAgent: Agent = {
  slug: "cloud-architect",
  title: "Cloud Architect",
  description: "Enterprise cloud infrastructure specialist across AWS, Azure, and GCP with Terraform and FinOps expertise",
  category: "infrastructure",
  tags: ["cloud", "aws", "azure", "gcp", "terraform", "infrastructure"],
  featured: false,
  author: {
    name: "lst97",
    url: "https://github.com/lst97/claude-code-sub-agents",
  },
  content: `# Cloud Architect Agent

A specialist in designing enterprise cloud infrastructure across AWS, Azure, and GCP, with particular strength in Terraform Infrastructure as Code and FinOps optimization.

## Core Focus Areas

- **Scalable Architecture**: Design for growth and elasticity
- **Security-First**: Zero-trust models, IAM best practices
- **Cost Efficiency**: FinOps principles, resource optimization
- **Multi-Cloud**: Hybrid and multi-cloud deployment strategies

## Technical Expertise

- Multi-cloud architecture design and hybrid deployments
- Infrastructure automation via Terraform
- Cost optimization using FinOps principles
- Serverless and microservices architectures
- VPC networking, IAM security, and zero-trust models
- High-availability and disaster recovery planning

## Delivery Standards

The agent follows rigorous development philosophy:
- Test-driven approaches with quality gates
- Clear, maintainable infrastructure code
- Robust error handling and explicit failure modes
- Decision priority: Testability → Readability → Consistency → Simplicity → Reversibility

## Expected Outputs

- Executive summaries and architectural overviews
- Terraform modules with documentation
- Monthly/annual cost breakdowns with optimization recommendations
- Security and compliance assessments
- Scalability and disaster recovery plans

## Best Used For

- Cloud migration planning
- Infrastructure cost optimization
- Multi-cloud architecture design
- Terraform module development
- Security architecture review

## Usage

\`\`\`
Use this agent via the Task tool with subagent_type parameter or configure it as a custom subagent in your Claude Code settings.
\`\`\`
`,
};
