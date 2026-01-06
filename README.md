# Claude's Codes

A community-driven directory for Claude Code configurations. Find and share prompts, MCP servers, hooks, skills, and settings.

**[Live Site](https://claudescodes.com)** · **[Contributing Guide](CONTRIBUTING.md)** · **[Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)**

## What is Claude Code?

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's official CLI tool for Claude. It allows you to interact with Claude directly from your terminal to help with software development tasks.

## What's in this Directory?

| Category | Description |
|----------|-------------|
| **Prompts** | CLAUDE.md templates to customize Claude's behavior for your projects |
| **MCP Servers** | Model Context Protocol servers to extend Claude Code's capabilities |
| **Hooks** | Pre/post tool-use automation scripts |
| **Skills** | Custom slash commands and workflows |
| **Plugins** | Official and community plugins to extend functionality |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tmcpa/claudescodes.git
cd claudescodes

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── prompts/           # Prompts listing and detail pages
│   ├── mcp-servers/       # MCP servers listing and detail pages
│   ├── hooks/             # Hooks listing and detail pages
│   ├── skills/            # Skills listing and detail pages
│   └── plugins/           # Plugins listing and detail pages
├── components/            # React components
│   ├── cards/             # Card components for each content type
│   ├── layout/            # Header, Footer
│   └── ui/                # shadcn/ui components
├── data/                  # Content data (TypeScript files)
│   ├── prompts/           # Prompt definitions
│   ├── mcp-servers/       # MCP server definitions
│   ├── hooks/             # Hook definitions
│   ├── skills/            # Skill definitions
│   └── plugins/           # Plugin definitions
└── lib/                   # Utilities and types
```

## Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Add new prompts, MCP servers, hooks, or skills
- Report bugs or request features
- Submit pull requests

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tmcpa/claudescodes)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tmcpa/claudescodes)

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Inspired by [cursor.directory](https://cursor.directory)
- Built for the [Claude Code](https://docs.anthropic.com/en/docs/claude-code) community
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

**Questions?** Open an issue or start a discussion. We'd love to hear from you!
