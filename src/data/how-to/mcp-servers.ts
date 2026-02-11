import { HowTo } from "@/lib/types";

export const mcpServersHowTo: HowTo = {
  slug: "mcp-servers",
  title: "Setting Up MCP Servers",
  description: "Connect Claude Code to external tools and services using the Model Context Protocol",
  difficulty: "intermediate",
  timeToComplete: "30 min",
  tags: ["mcp", "integration", "tools", "servers"],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Setting Up MCP Servers

The Model Context Protocol (MCP) lets Claude Code interact with external tools and services.

## Configuration Location

\`\`\`bash
# Settings file location
~/.claude/settings.json
\`\`\`

## Adding an MCP Server

### 1. Open settings

\`\`\`bash
# Edit directly or use Claude Code
claude settings
\`\`\`

### 2. Add server configuration

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
\`\`\`

## Popular MCP Servers

### GitHub Integration

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}
\`\`\`

### PostgreSQL Database

\`\`\`json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost/db"]
    }
  }
}
\`\`\`

### Puppeteer Browser Control

\`\`\`json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
\`\`\`

### Brave Search

\`\`\`json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<your-api-key>"
      }
    }
  }
}
\`\`\`

## Multiple Servers

You can run multiple MCP servers simultaneously:

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<token>"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}
\`\`\`

## Environment Variables

Sensitive data should use environment variables:

\`\`\`json
{
  "mcpServers": {
    "myserver": {
      "command": "npx",
      "args": ["-y", "@my/mcp-server"],
      "env": {
        "API_KEY": "$MY_API_KEY",
        "SECRET": "$MY_SECRET"
      }
    }
  }
}
\`\`\`

## Verifying Connection

After adding a server:

1. Restart Claude Code
2. Ask Claude what tools are available
3. Test a simple operation

## Troubleshooting

### Server not starting
- Check if the package exists: \`npx -y @package/name --help\`
- Verify paths are absolute
- Check environment variables are set

### Permission errors
- Ensure file paths are accessible
- Check API tokens have required scopes

### Connection issues
- Restart Claude Code after config changes
- Check server logs in \`~/.claude/logs/\`

## Security Considerations

- Only enable servers you trust
- Use minimal permissions (read-only when possible)
- Rotate API keys regularly
- Review server source code for sensitive operations
`,
};
