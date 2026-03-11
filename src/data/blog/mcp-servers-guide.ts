import { BlogPost } from "@/lib/types";

export const mcpServersGuide: BlogPost = {
  slug: "mcp-servers-guide",
  title: "The Complete Guide to MCP Servers: How to Give Claude Code Superpowers",
  description:
    "Learn what MCP servers are, how they work with Claude Code, and how to set up your first integration. Covers configuration, top servers, real-world workflows, and advanced patterns.",
  publishedDate: "2026-03-11",
  tags: [
    "claude-code",
    "mcp-servers",
    "model-context-protocol",
    "integrations",
    "tutorial",
    "developer-tools",
    "productivity",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "mcp-server",
      slug: "github",
      relationship: "works-with",
    },
    {
      type: "mcp-server",
      slug: "filesystem",
      relationship: "works-with",
    },
    {
      type: "mcp-server",
      slug: "postgres",
      relationship: "works-with",
    },
  ],
  content: `# The Complete Guide to MCP Servers: How to Give Claude Code Superpowers

Out of the box, Claude Code can read your files, write code, and run terminal commands. That alone makes it powerful. But what if it could also query your database, create GitHub issues, search the web, send Slack messages, manage your infrastructure, and pull designs from Figma — all without leaving the terminal?

That's exactly what **MCP servers** unlock. They're the plugin system for Claude Code, and they're transforming how developers build software with AI.

This guide covers everything: what MCP servers are, how to set them up, which ones matter most, and advanced patterns for teams using them in production.

## What Is the Model Context Protocol (MCP)?

The **Model Context Protocol** is an open standard created by Anthropic that lets AI assistants connect to external tools and data sources. Think of it like USB for AI — a universal interface that lets Claude Code plug into any service that speaks the protocol.

An MCP server is a small program that:
1. **Exposes tools** — functions Claude can call (e.g., "query this database", "create a GitHub PR")
2. **Provides resources** — data Claude can read (e.g., database schemas, API documentation)
3. **Runs locally or remotely** — on your machine, in a container, or as a hosted service

When you configure an MCP server, Claude Code gains new capabilities without any changes to Claude itself. The server handles the integration; Claude handles the reasoning.

### Why Not Just Use the Terminal?

You might wonder: Claude Code can already run shell commands, so why not just have it call \`curl\` or \`psql\` directly?

MCP servers are better for several reasons:

- **Structured I/O** — Claude gets typed responses, not raw terminal output to parse
- **Authentication handled** — Credentials are configured once, not passed per command
- **Scoped permissions** — A server exposes only the operations you allow
- **Better context** — Servers can provide schemas, documentation, and metadata alongside results
- **Safety** — No risk of Claude constructing dangerous shell commands against production systems

## How to Configure MCP Servers

MCP servers are configured in your Claude Code settings file. You have two options for where to put the configuration:

### Project-Level Configuration (Recommended)

Add to \`.mcp.json\` in your project root. This is checked into version control so your whole team gets the same tools.

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
      }
    }
  }
}
\`\`\`

### User-Level Configuration

Add to \`~/.claude/settings.json\` for servers you want available across all projects (like web search).

### The Configuration Format

Every MCP server entry has the same structure:

\`\`\`json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
\`\`\`

- **\`command\`** — How to start the server (\`npx\`, \`uvx\`, \`node\`, \`python\`, \`docker\`, etc.)
- **\`args\`** — Arguments passed to the command
- **\`env\`** — Environment variables the server needs (API keys, tokens, connection strings)

### Environment Variable Best Practices

Never hardcode secrets in \`.mcp.json\`. Use environment variable references:

\`\`\`json
{
  "env": {
    "DATABASE_URL": "\${DATABASE_URL}",
    "API_KEY": "\${MY_SERVICE_API_KEY}"
  }
}
\`\`\`

Claude Code resolves \`\${VAR_NAME}\` from your shell environment at startup. Keep your actual values in \`.env\` files or your shell profile, and add \`.mcp.json\` to version control safely.

## The Top MCP Servers Every Developer Should Know

With over 60 MCP servers available, it can be overwhelming to know where to start. Here are the ones that deliver the most value, organized by what they unlock.

### Essential Tier: Start Here

#### [GitHub](/mcp-servers/github)
The most popular MCP server by far. Lets Claude create issues, open PRs, review code, manage branches, search repositories, and read file contents — all through the GitHub API.

\`\`\`json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
    }
  }
}
\`\`\`

**Best for:** Any team using GitHub. Lets Claude handle the full PR lifecycle without switching to a browser.

#### [Filesystem](/mcp-servers/filesystem)
Gives Claude controlled access to files and directories outside the current project. Useful for accessing shared config files, reading documentation from other repos, or working with monorepo structures.

\`\`\`json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects", "/Users/you/docs"]
  }
}
\`\`\`

**Best for:** Cross-project work, referencing documentation, or accessing files outside the working directory.

#### [Postgres](/mcp-servers/postgres) / [SQLite](/mcp-servers/sqlite)
Connect Claude directly to your development database. It can explore schemas, run queries, and understand your data model — which makes it dramatically better at writing database code.

\`\`\`json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres"],
    "env": {
      "POSTGRES_URL": "\${DATABASE_URL}"
    }
  }
}
\`\`\`

**Best for:** Any project with a database. Claude writes better queries, migrations, and ORM code when it can see the actual schema.

### Productivity Tier: 10x Your Workflow

#### [Slack](/mcp-servers/slack)
Send messages, read channels, search conversations. Great for automated standup updates or pulling context from team discussions.

#### [Linear](/mcp-servers/linear)
Manage issues, projects, and cycles. Claude can create tickets from TODOs in code, or check issue status before starting work.

#### [Notion](/mcp-servers/notion)
Read and write to Notion pages and databases. Pull in product specs, update documentation, or reference design docs without leaving Claude Code.

#### [Figma](/mcp-servers/figma)
Read Figma designs and extract component specs. Claude can reference the actual design while implementing UI components.

### Infrastructure Tier: DevOps in Your Terminal

#### [Docker](/mcp-servers/docker)
Manage containers, images, and compose stacks. Claude can start services, check logs, and debug container issues.

#### [Kubernetes](/mcp-servers/kubernetes)
Query cluster state, read pod logs, and manage deployments. Powerful for debugging production issues.

#### [AWS](/mcp-servers/aws)
Interact with AWS services — S3, Lambda, DynamoDB, and more. Claude can check resource state and help debug cloud infrastructure.

#### [Terraform](/mcp-servers/terraform)
Read and manage Terraform state and configurations. Claude can help plan infrastructure changes with full context.

#### [Vercel](/mcp-servers/vercel) / [Cloudflare](/mcp-servers/cloudflare)
Manage deployments, check build status, and configure edge functions directly from Claude Code.

### Data Tier: Query Anything

#### [MongoDB](/mcp-servers/mongodb)
Query collections, inspect schemas, and manage indexes in MongoDB databases.

#### [Redis](/mcp-servers/redis)
Read and write Redis keys, inspect data structures, and manage cache state.

#### [Supabase](/mcp-servers/supabase)
Full Supabase access — database, auth, storage, and edge functions.

#### [BigQuery](/mcp-servers/bigquery) / [Snowflake](/mcp-servers/snowflake)
Run analytics queries against data warehouses. Claude can explore data and help build reports.

### Search Tier: Give Claude the Internet

#### [Brave Search](/mcp-servers/brave-search)
Web search without leaving Claude Code. Claude can look up documentation, find solutions, and research APIs.

#### [Exa](/mcp-servers/exa)
AI-native search that returns clean, relevant results. Better than traditional search for technical queries.

#### [Context7](/mcp-servers/context7)
Pulls up-to-date documentation for libraries and frameworks directly into Claude's context.

Browse the full collection of **[60+ MCP servers](/mcp-servers)** in the Claude Directory.

## Real-World Workflows

MCP servers become truly powerful when you combine them. Here are workflows that teams are using in production.

### Full-Stack Development with Database Context

**Servers:** [Postgres](/mcp-servers/postgres) + [GitHub](/mcp-servers/github)

\`\`\`json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "POSTGRES_URL": "\${DATABASE_URL}" }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}" }
    }
  }
}
\`\`\`

With this setup, you can say: *"Add a \`last_login\` column to the users table, create a migration, update the API endpoint, and open a PR."* Claude will:
1. Query the current schema to understand the table structure
2. Generate the correct migration
3. Update the relevant API code
4. Create a PR with a descriptive summary

### Design-to-Code Pipeline

**Servers:** [Figma](/mcp-servers/figma) + [Supabase](/mcp-servers/supabase)

Tell Claude: *"Implement the new dashboard card component from the Figma design and wire it up to the analytics data in Supabase."* Claude reads the Figma component specs, writes the frontend code, and queries Supabase to understand the data shape.

### Incident Response

**Servers:** [Sentry](/mcp-servers/sentry) + [Kubernetes](/mcp-servers/kubernetes) + [Slack](/mcp-servers/slack)

When an alert fires: *"Check the latest Sentry errors for the payments service, look at the Kubernetes pod logs, and post a summary to #incidents."* Claude pulls the error context, correlates it with pod state, and drafts the incident update.

### Documentation Sync

**Servers:** [GitHub](/mcp-servers/github) + [Notion](/mcp-servers/notion)

*"Read the API changes in the last 3 PRs and update the API reference page in Notion."* Claude reviews the merged PRs, identifies API changes, and updates the documentation.

## Advanced Patterns

### Running Multiple Servers

There's no limit to how many MCP servers you can run. A typical full-stack setup might include 4-6 servers:

\`\`\`json
{
  "mcpServers": {
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"], "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}" } },
    "postgres": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres"], "env": { "POSTGRES_URL": "\${DATABASE_URL}" } },
    "slack": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-slack"], "env": { "SLACK_BOT_TOKEN": "\${SLACK_BOT_TOKEN}" } },
    "brave-search": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-brave-search"], "env": { "BRAVE_API_KEY": "\${BRAVE_API_KEY}" } }
  }
}
\`\`\`

Each server runs as a separate process. Claude Code manages their lifecycles automatically.

### Docker-Based Servers

Some servers are better run via Docker, especially if they have complex dependencies:

\`\`\`json
{
  "playwright": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "mcr.microsoft.com/playwright/mcp"]
  }
}
\`\`\`

This keeps your local environment clean and ensures consistent behavior across team members.

### Team Configuration Strategy

For teams, use a layered approach:

1. **\`.mcp.json\` (project)** — Servers the whole team needs (GitHub, database, project management)
2. **\`~/.claude/settings.json\` (personal)** — Servers for individual preferences (web search, personal tools)

This mirrors how \`.editorconfig\` (shared) and personal IDE settings (individual) work together.

### Performance Considerations

MCP servers add startup time to your Claude Code sessions. Keep these tips in mind:

- Only configure servers you actively use
- \`npx\` servers download on first run — consider installing globally for frequently used ones
- Docker-based servers have higher startup overhead but better isolation
- If a server isn't responding, restart Claude Code to reset all connections

## Security Considerations

MCP servers have access to real systems. Treat their configuration with the same care as any credentials:

- **Use read-only tokens** where possible, especially for databases
- **Scope API permissions** to only what's needed (e.g., GitHub tokens with only \`repo\` scope)
- **Never point at production databases** during development — use dev/staging connections
- **Review server source code** before installing community servers
- **Keep \`.env\` files out of version control** — \`.mcp.json\` should reference variables, not contain secrets

## Troubleshooting Common Issues

### "Server not found" or "Connection refused"

- Verify the package name is correct
- Run the server command manually to check for errors: \`npx -y @modelcontextprotocol/server-github\`
- Check that required environment variables are set

### "Permission denied" errors

- Verify your API tokens have the correct scopes
- For database servers, confirm the connection string and user permissions

### Server starts but Claude doesn't use its tools

- Restart Claude Code after changing \`.mcp.json\`
- Check that the server name in config matches what you expect
- Use \`/mcp\` in Claude Code to see the status of connected servers

### Slow startup times

- Install frequently used servers globally: \`npm install -g @modelcontextprotocol/server-github\`
- Then use \`"command": "mcp-server-github"\` instead of \`npx\`

## Building Your Own MCP Server

If the existing servers don't cover your use case, building a custom one is surprisingly straightforward. The MCP SDK provides a simple interface:

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-custom-server",
  version: "1.0.0",
});

server.tool(
  "get_user",
  "Fetch a user by ID from our internal API",
  { userId: z.string() },
  async ({ userId }) => {
    const user = await fetchUser(userId);
    return {
      content: [{ type: "text", text: JSON.stringify(user) }],
    };
  }
);
\`\`\`

This is a powerful pattern for exposing internal APIs, proprietary databases, or custom business logic to Claude Code.

For a detailed walkthrough, check out the **[MCP Server Setup Guide](/how-to/mcp-servers)** in our how-to section.

## Getting Started

If you're new to MCP servers, here's the fastest path to value:

1. **Start with GitHub** — It's the most universally useful server. Create a personal access token and add the config to your \`.mcp.json\`.
2. **Add your database** — If your project has a database, connect it. The improvement in Claude's code quality is immediate and noticeable.
3. **Add one workflow tool** — Pick the tool your team uses most (Slack, Linear, Notion) and connect it.
4. **Iterate** — Once you see how MCP servers change the way you work, you'll naturally find more to add.

Browse the **[full MCP server directory](/mcp-servers)** to explore all available integrations, or check out the **[how-to guides](/how-to)** for step-by-step setup instructions.

## The Bottom Line

MCP servers are what make Claude Code feel less like an AI chatbot and more like a connected development environment. Instead of copy-pasting data between tools, you describe what you want and Claude handles the integration layer.

The protocol is open, the ecosystem is growing fast, and the gap between "AI assistant" and "AI-powered workflow" is getting smaller with every new server. Whether you start with one server or five, the productivity gains compound quickly.

Start with GitHub and your database. You'll wonder how you worked without them.
`,
};
