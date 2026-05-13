import { HowTo } from "@/lib/types";

export const pluginsHowTo: HowTo = {
  slug: "plugins",
  title: "Installing and Using Plugins",
  description: "Extend Claude Code with official and community plugins for enhanced functionality",
  difficulty: "beginner",
  timeToComplete: "15 min",
  tags: ["plugins", "customization", "developer-tools"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "plugin", slug: "code-review", relationship: "recommends" },
    { type: "plugin", slug: "feature-dev", relationship: "recommends" },
    { type: "plugin", slug: "frontend-design", relationship: "recommends" },
    { type: "plugin", slug: "plugin-dev", relationship: "recommends" },
  ],
  content: `# Installing and Using Plugins

Plugins extend Claude Code with additional capabilities like code review, feature development workflows, and specialized tools.

## What Are Plugins?

Plugins are bundles that can include:
- Custom skills and commands
- MCP server integrations
- Specialized prompts
- Workflow automation

## Finding Plugins

Plugins live in **marketplaces**. The official Anthropic marketplace (\`claude-plugins-official\`) is built in and available the moment you start Claude Code — you don't have to add it.

Run \`/plugin\` to open the plugin manager. It has four tabs:

- **Discover** — browse plugins from all your marketplaces
- **Installed** — view, enable, disable, or uninstall plugins
- **Marketplaces** — add or remove marketplaces
- **Errors** — view plugin load errors

## Installing Plugins

### From the official marketplace

\`\`\`shell
# Inside Claude Code
/plugin install code-review@claude-plugins-official
\`\`\`

### From another marketplace

You need two steps: register the marketplace, then install:

\`\`\`shell
# Add a GitHub marketplace using owner/repo
/plugin marketplace add anthropics/claude-code

# Now install plugins from it
/plugin install commit-commands@anthropics-claude-code
\`\`\`

You can also point at a Git URL (GitLab, Bitbucket, self-hosted), a local directory containing \`.claude-plugin/marketplace.json\`, or a remote URL.

## Managing Plugins

Most management happens in the interactive \`/plugin\` UI, but there are direct commands too:

\`\`\`shell
# Disable without uninstalling
/plugin disable code-review@claude-plugins-official

# Re-enable
/plugin enable code-review@claude-plugins-official

# Uninstall
/plugin uninstall code-review@claude-plugins-official

# Refresh a marketplace's catalog
/plugin marketplace update claude-plugins-official

# Reload after install/enable/disable changes
/reload-plugins
\`\`\`

## Popular Plugins

### Code Review

\`\`\`shell
/plugin install code-review@claude-plugins-official
\`\`\`

Provides:
- Automated PR reviews
- Security vulnerability scanning
- Code quality analysis

### Feature Development

\`\`\`shell
/plugin install feature-dev@claude-plugins-official
\`\`\`

Provides:
- Guided feature planning
- Architecture analysis
- Implementation workflows

### Frontend Design

\`\`\`shell
/plugin install frontend-design@claude-plugins-official
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

Open the \`/plugin\` UI and check the **Errors** tab for load failures. To force a reinstall:

\`\`\`shell
/plugin uninstall code-review@claude-plugins-official
/plugin install code-review@claude-plugins-official
/reload-plugins
\`\`\`

If the plugin still doesn't show up, clear the plugin cache and restart Claude Code:

\`\`\`bash
rm -rf ~/.claude/plugins/cache
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
