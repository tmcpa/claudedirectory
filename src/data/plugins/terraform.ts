import { Plugin } from "@/lib/types";

export const terraformPlugin: Plugin = {
  slug: "terraform",
  title: "Terraform",
  description: "Manage Terraform infrastructure as code with plan previews, state inspection, module documentation, and drift detection directly from Claude Code",
  tags: ["infrastructure", "iac", "terraform", "devops", "external"],
  featured: false,
  author: {
    name: "HashiCorp",
    url: "https://github.com/hashicorp",
  },
  installCommand: "claude plugins add @hashicorp/terraform",
  repoUrl: "https://github.com/hashicorp/terraform-mcp-server",
  commands: [
    { name: "/tf:plan", description: "Preview infrastructure changes" },
    { name: "/tf:state", description: "Inspect current Terraform state" },
    { name: "/tf:docs", description: "Generate module documentation" },
  ],
};
