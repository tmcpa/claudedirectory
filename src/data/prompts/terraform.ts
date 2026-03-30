import { Prompt } from "@/lib/types";

export const terraformPrompt: Prompt = {
  slug: "terraform",
  title: "Terraform / Infrastructure as Code",
  description:
    "CLAUDE.md for Terraform and OpenTofu projects with module patterns and state management",
  tags: ["terraform", "iac", "infrastructure", "devops", "cloud"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Terraform / Infrastructure as Code Project

This is a Terraform project managing cloud infrastructure as code.

## Project Structure
- \`modules/\` - Reusable Terraform modules
- \`environments/\` - Per-environment configurations (dev, staging, prod)
- \`variables.tf\` - Input variable declarations
- \`outputs.tf\` - Output value declarations
- \`main.tf\` - Root module resource definitions
- \`providers.tf\` - Provider configuration and version constraints
- \`backend.tf\` - State backend configuration
- \`terraform.tfvars\` - Variable values (do NOT commit secrets)

## Code Style
- Use snake_case for all resource names, variables, and outputs
- Prefix resource names with the module or service name
- Group related resources in the same file
- Use locals for computed or repeated values
- Tag all resources with environment, team, and project
- Keep modules small and single-purpose

## State Management
- Remote state is stored in S3/GCS with locking via DynamoDB/GCS
- Never edit .tfstate files manually
- Use \`terraform import\` for existing resources
- Use workspaces or separate backends per environment

## Security
- Never hardcode secrets — use variables or secret managers
- Pin provider versions in required_providers blocks
- Use least-privilege IAM policies
- Enable encryption at rest for storage and databases
- Use security groups with minimal ingress rules

## Module Conventions
- Every module has a README.md with usage examples
- All inputs have descriptions and type constraints
- Use validation blocks for complex input rules
- Outputs should expose IDs, ARNs, and connection strings

## Commands
- \`terraform init\` - Initialize providers and backend
- \`terraform plan\` - Preview changes
- \`terraform apply\` - Apply changes
- \`terraform fmt\` - Format all .tf files
- \`terraform validate\` - Validate configuration
- \`terraform state list\` - List managed resources
- \`tflint\` - Run linter
- \`checkov -d .\` - Run security scanner
`,
};
