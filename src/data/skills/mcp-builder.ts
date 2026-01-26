import { Skill } from "@/lib/types";

export const mcpBuilderSkill: Skill = {
  slug: "mcp-builder",
  title: "MCP Server Builder",
  description: "Guide for creating high-quality Model Context Protocol servers with best practices",
  tags: ["mcp", "server", "development", "protocol", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
  content: `# MCP Server Builder Skill

Build high-quality Model Context Protocol (MCP) servers following best practices.

## Overview

This official skill guides Claude Code through creating production-ready MCP servers:

- **Scaffolding** - Generate server boilerplate
- **Tools** - Define and implement MCP tools
- **Resources** - Expose data as MCP resources
- **Prompts** - Create reusable prompt templates

## Installation

This skill is included in the official Anthropic skills package:

\`\`\`bash
/plugin install example-skills@anthropic-agent-skills
\`\`\`

## Features

### Server Templates
- TypeScript server template
- Python server template
- Proper error handling patterns
- Logging and debugging setup

### Tool Development
- Tool schema definition
- Input validation
- Error responses
- Rate limiting patterns

### Resource Exposure
- Static and dynamic resources
- URI templates
- Content type handling
- Pagination support

### Best Practices
- Security considerations
- Performance optimization
- Testing strategies
- Documentation standards

## Example Usage

"Create an MCP server that connects to my PostgreSQL database"
"Add a tool to my MCP server for searching documents"
"Generate proper error handling for my MCP server"

## Related Resources

- [MCP Specification](https://modelcontextprotocol.io)
- [MCP Server Examples](https://github.com/modelcontextprotocol/servers)

## Repository

[github.com/anthropics/skills](https://github.com/anthropics/skills)
`,
  relatedItems: [
    { type: "how-to", slug: "mcp-servers", relationship: "documented-by" },
  ],
};
