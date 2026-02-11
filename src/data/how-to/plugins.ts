import { HowTo } from "@/lib/types";

export const pluginsHowTo: HowTo = {
  slug: "plugins",
  title: "Installing and Using Plugins",
  description: "Extend Claude Code with official and community plugins for enhanced functionality",
  difficulty: "beginner",
  timeToComplete: "15 min",
  tags: ["plugins", "extensions", "customization", "tools"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Installing and Using Plugins

Plugins extend Claude Code with additional capabilities like code review, feature development workflows, and specialized tools.

## What Are Plugins?

Plugins are bundles that can include:
- Custom skills and commands
- MCP server integrations
- Specialized prompts
- Workflow automation

## Finding Plugins

### Official Plugins

\`\`\`bash
# List official plugins
claude plugins list --official
\`\`\`

### Community Plugins

\`\`\`bash
# Search all plugins
claude plugins search <keyword>
\`\`\`

## Installing Plugins

### From Official Registry

\`\`\`bash
# Install an official plugin
claude plugins add code-review@claude-plugins-official
\`\`\`

### From GitHub

\`\`\`bash
# Install from a GitHub repository
claude plugins add username/plugin-name
\`\`\`

### From Local Path

\`\`\`bash
# Install a local plugin
claude plugins add ./my-plugin
\`\`\`

## Managing Plugins

### List Installed Plugins

\`\`\`bash
claude plugins list
\`\`\`

### Update Plugins

\`\`\`bash
# Update all plugins
claude plugins update

# Update specific plugin
claude plugins update code-review@claude-plugins-official
\`\`\`

### Remove Plugins

\`\`\`bash
claude plugins remove code-review@claude-plugins-official
\`\`\`

## Popular Plugins

### Code Review

\`\`\`bash
claude plugins add code-review@claude-plugins-official
\`\`\`

Provides:
- Automated PR reviews
- Security vulnerability scanning
- Code quality analysis

### Feature Development

\`\`\`bash
claude plugins add feature-dev@claude-plugins-official
\`\`\`

Provides:
- Guided feature planning
- Architecture analysis
- Implementation workflows

### Frontend Design

\`\`\`bash
claude plugins add frontend-design@claude-code-plugins
\`\`\`

Provides:
- UI component generation
- Design system integration
- Responsive layouts

## Configuration

### Enable/Disable Plugins

\`\`\`json
// ~/.claude/settings.json
{
  "enabledPlugins": {
    "code-review@claude-plugins-official": true,
    "feature-dev@claude-plugins-official": false
  }
}
\`\`\`

### Plugin-Specific Settings

\`\`\`json
{
  "plugins": {
    "code-review@claude-plugins-official": {
      "severity": "strict",
      "ignorePatterns": ["*.test.ts"]
    }
  }
}
\`\`\`

## Using Plugin Features

### Skills from Plugins

Plugins may add new slash commands:

\`\`\`
/review-pr 123        # From code-review plugin
/feature-dev          # From feature-dev plugin
/frontend-design      # From frontend-design plugin
\`\`\`

### Automatic Capabilities

Some plugins enhance Claude's abilities automatically without explicit invocation.

## Creating Your Own Plugin

### Plugin Structure

\`\`\`
my-plugin/
├── plugin.json       # Manifest file
├── skills/           # Custom skills
├── commands/         # Slash commands
└── README.md         # Documentation
\`\`\`

### Plugin Manifest

\`\`\`json
// plugin.json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My custom plugin",
  "author": "Your Name",
  "skills": ["skills/"],
  "commands": ["commands/"]
}
\`\`\`

## Troubleshooting

### Plugin Not Loading

\`\`\`bash
# Check plugin status
claude plugins status code-review@claude-plugins-official

# Reinstall
claude plugins remove code-review@claude-plugins-official
claude plugins add code-review@claude-plugins-official
\`\`\`

### Conflicts Between Plugins

If plugins conflict, disable one:

\`\`\`json
{
  "enabledPlugins": {
    "conflicting-plugin": false
  }
}
\`\`\`

## Best Practices

1. **Start minimal**: Only install plugins you need
2. **Keep updated**: Regularly update for bug fixes
3. **Check compatibility**: Verify plugin works with your Claude Code version
4. **Review permissions**: Understand what each plugin can access
`,
};
