import { HowTo } from "@/lib/types";

export const multiPlatformSetupHowTo: HowTo = {
  slug: "multi-platform-setup",
  title: "Setting Up Claude Code on Every Platform",
  description:
    "Step-by-step guide to installing and configuring Claude Code on CLI, desktop (Mac/Windows), web, and IDE extensions (VS Code, JetBrains)",
  difficulty: "beginner",
  timeToComplete: "15 min",
  tags: [
    "getting-started",
    "installation",
    "setup",
    "multi-platform",
    "vscode",
    "jetbrains",
    "desktop",
    "cli",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "how-to", slug: "getting-started", relationship: "works-with" },
    {
      type: "blog",
      slug: "claude-opus-4-million-token-era",
      relationship: "documented-by",
    },
    { type: "how-to", slug: "memory", relationship: "recommends" },
  ],
  content: `# Setting Up Claude Code on Every Platform

Claude Code is available as a CLI tool, desktop app, web app, and IDE extension. This guide walks through setting up each platform and configuring them to share your settings, memory, and CLAUDE.md files.

---

## Platform Overview

| Platform | Best For | Install Time |
|---|---|---|
| **CLI** | Power users, automation, CI/CD, background agents | 2 min |
| **Desktop App** | Focused coding sessions, native OS integration | 3 min |
| **Web App** | Quick access from any device, no installation needed | 0 min |
| **VS Code Extension** | Inline assistance while coding in VS Code | 2 min |
| **JetBrains Extension** | Inline assistance in IntelliJ, WebStorm, PyCharm, etc. | 2 min |

---

## CLI Installation

The CLI is the most full-featured platform and the foundation for all other integrations.

### macOS / Linux

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

### Verify Installation

\`\`\`bash
claude --version
\`\`\`

### First Run

Navigate to your project directory and start a session:

\`\`\`bash
cd your-project
claude
\`\`\`

On first run, you'll be prompted to authenticate. Follow the instructions to connect your Anthropic account.

### Key CLI Features

- **Full agent capabilities**: Background agents, worktrees, subagents
- **Hooks and skills**: All automation features work here
- **Memory system**: Persistent context across sessions
- **Fast mode**: Toggle with \`/fast\` for faster output

---

## Desktop App

### macOS

1. Download from the official Anthropic website or install via Homebrew:
   \`\`\`bash
   brew install --cask claude-code
   \`\`\`
2. Open the app and sign in with your Anthropic account
3. Open a project folder to start working

### Windows

1. Download the installer from the official Anthropic website
2. Run the installer and follow the prompts
3. Open the app and sign in

### Desktop App Features

- Native window management and keyboard shortcuts
- System notifications for background agent completion
- Drag-and-drop file support
- Automatic project detection from opened folders

---

## Web App

The web app requires no installation:

1. Navigate to **claude.ai/code** in your browser
2. Sign in with your Anthropic account
3. Start a session

### Web App Considerations

- Works from any device with a modern browser
- Great for quick tasks, code review, and remote access
- Some features (like local file system access and hooks) require the CLI or desktop app
- Sessions sync with your account, so you can start on web and continue on desktop

---

## VS Code Extension

### Installation

1. Open VS Code
2. Go to the Extensions panel (\`Cmd+Shift+X\` / \`Ctrl+Shift+X\`)
3. Search for **"Claude Code"**
4. Click **Install**

Or install from the command line:

\`\`\`bash
code --install-extension anthropic.claude-code
\`\`\`

### Configuration

After installing, the extension integrates directly into your editor:

- **Inline chat**: Highlight code and ask Claude about it
- **Side panel**: Full conversation interface alongside your code
- **Command palette**: Access Claude Code features via \`Cmd+Shift+P\` → "Claude Code"

### VS Code Tips

- Use the extension for quick, contextual questions about the file you're editing
- For larger tasks (multi-file refactors, feature development), consider switching to the CLI
- The extension reads your project's CLAUDE.md automatically

---

## JetBrains Extension

### Installation

1. Open your JetBrains IDE (IntelliJ IDEA, WebStorm, PyCharm, etc.)
2. Go to **Settings** → **Plugins** → **Marketplace**
3. Search for **"Claude Code"**
4. Click **Install** and restart the IDE

### Configuration

The JetBrains extension provides:

- **Tool window**: Full conversation panel in the IDE
- **Context menu**: Right-click on code to ask Claude about it
- **Intention actions**: Claude-powered quick fixes in the editor
- **Project awareness**: Reads your CLAUDE.md and project structure

---

## Shared Configuration

All platforms share the same configuration system. Settings you configure once apply everywhere:

### CLAUDE.md Files

Your project's CLAUDE.md is read by all platforms automatically. Place it in your project root:

\`\`\`
your-project/
├── CLAUDE.md          # Read by CLI, desktop, and IDE extensions
├── src/
│   └── CLAUDE.md      # Directory-specific context
└── ...
\`\`\`

### Personal Settings

Your personal CLAUDE.md at \`~/.claude/CLAUDE.md\` applies across all projects and platforms:

\`\`\`markdown
# Personal Preferences
- Always use TypeScript strict mode
- Prefer functional components in React
- Use conventional commits for all commit messages
\`\`\`

### Memory

The memory system at \`~/.claude/projects/\` persists across sessions and platforms. Memories saved during a CLI session are available in the desktop app and vice versa.

---

## Recommended Setup

For the best experience, install at least two platforms:

1. **CLI** (always install this) — It's the most capable and powers background agents
2. **Your IDE extension** — For inline assistance while coding

Then use each platform for what it does best:

- **IDE extension** → Quick questions, inline fixes, small refactors
- **CLI** → Feature development, migrations, background agents, automation
- **Desktop app** → Focused sessions, long conversations, complex tasks
- **Web app** → Remote access, mobile review, sharing sessions

---

## Troubleshooting

### "Command not found" after CLI install

Make sure the npm global bin is in your PATH:

\`\`\`bash
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
\`\`\`

### IDE extension not detecting CLAUDE.md

Ensure you've opened the project folder (not a parent directory) in your IDE. The extension looks for CLAUDE.md relative to the workspace root.

### Settings not syncing across platforms

All platforms read from \`~/.claude/\` for user-level settings. Make sure you're signed into the same Anthropic account on all platforms.
`,
};
