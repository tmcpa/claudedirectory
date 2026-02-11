import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PromptCard } from "@/components/cards/prompt-card";
import { MCPCard } from "@/components/cards/mcp-card";
import { HookCard } from "@/components/cards/hook-card";
import { SkillCard } from "@/components/cards/skill-card";
import { PluginCard } from "@/components/cards/plugin-card";
import { HowToCard } from "@/components/cards/how-to-card";
import { AgentCard } from "@/components/cards/agent-card";
import { BlogCard } from "@/components/cards/blog-card";
import { UniversalSearch } from "@/components/universal-search";
import { getFeaturedPrompts } from "@/data/prompts";
import { getFeaturedMCPServers } from "@/data/mcp-servers";
import { getFeaturedHooks } from "@/data/hooks";
import { getFeaturedSkills } from "@/data/skills";
import { getFeaturedPlugins } from "@/data/plugins";
import { getFeaturedHowTos } from "@/data/how-to";
import { getFeaturedAgents } from "@/data/agents";
import { getFeaturedBlogPosts } from "@/data/blog";
import { Terminal, FileText, Server, Webhook, Zap, Puzzle, BookOpen, Bot, Newspaper, ArrowRight, Github } from "lucide-react";

const categories = [
  {
    name: "Prompts",
    description: "CLAUDE.md templates for your projects",
    href: "/prompts",
    icon: FileText,
  },
  {
    name: "MCP Servers",
    description: "Model Context Protocol integrations",
    href: "/mcp-servers",
    icon: Server,
  },
  {
    name: "Hooks",
    description: "Pre and post tool-use automation",
    href: "/hooks",
    icon: Webhook,
  },
  {
    name: "Skills",
    description: "Custom slash commands and workflows",
    href: "/skills",
    icon: Zap,
  },
  {
    name: "Plugins",
    description: "Extend Claude Code functionality",
    href: "/plugins",
    icon: Puzzle,
  },
  {
    name: "Agents",
    description: "Specialized Claude Code subagents",
    href: "/agents",
    icon: Bot,
  },
  {
    name: "How To",
    description: "Step-by-step tutorials and guides",
    href: "/how-to",
    icon: BookOpen,
  },
  {
    name: "Blog",
    description: "News and insights on AI development",
    href: "/blog",
    icon: Newspaper,
  },
];

export default function Home() {
  const featuredPrompts = getFeaturedPrompts();
  const featuredMCPServers = getFeaturedMCPServers();
  const featuredHooks = getFeaturedHooks();
  const featuredSkills = getFeaturedSkills();
  const featuredPlugins = getFeaturedPlugins();
  const featuredHowTos = getFeaturedHowTos();
  const featuredAgents = getFeaturedAgents();
  const featuredBlogPosts = getFeaturedBlogPosts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <Terminal className="h-4 w-4" />
            <span>Community-driven configurations</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Claude Code
            <br />
            <span className="text-muted-foreground">Directory</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Find the best prompts, MCP servers, hooks, and skills for Claude Code.
            Boost your productivity with community-curated configurations.
          </p>

          <div className="w-full mt-8">
            <UniversalSearch />
          </div>

          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link href="/how-to">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/tmcpa/claudedirectory/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Contribute
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-12 border-t">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader>
                  <category.icon className="h-8 w-8 mb-2 text-muted-foreground" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Prompts */}
      {featuredPrompts.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Prompts</h2>
            <Button variant="ghost" asChild>
              <Link href="/prompts">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPrompts.slice(0, 3).map((prompt) => (
              <PromptCard key={prompt.slug} prompt={prompt} />
            ))}
          </div>
        </section>
      )}

      {/* Featured MCP Servers */}
      {featuredMCPServers.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured MCP Servers</h2>
            <Button variant="ghost" asChild>
              <Link href="/mcp-servers">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredMCPServers.slice(0, 3).map((server) => (
              <MCPCard key={server.slug} server={server} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Hooks */}
      {featuredHooks.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Hooks</h2>
            <Button variant="ghost" asChild>
              <Link href="/hooks">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredHooks.slice(0, 3).map((hook) => (
              <HookCard key={hook.slug} hook={hook} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Skills */}
      {featuredSkills.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Skills</h2>
            <Button variant="ghost" asChild>
              <Link href="/skills">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSkills.slice(0, 3).map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Plugins */}
      {featuredPlugins.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Plugins</h2>
            <Button variant="ghost" asChild>
              <Link href="/plugins">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPlugins.slice(0, 3).map((plugin) => (
              <PluginCard key={plugin.slug} plugin={plugin} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Agents */}
      {featuredAgents.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Agents</h2>
            <Button variant="ghost" asChild>
              <Link href="/agents">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredAgents.slice(0, 3).map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        </section>
      )}

      {/* Featured How To Guides */}
      {featuredHowTos.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">How To Guides</h2>
            <Button variant="ghost" asChild>
              <Link href="/how-to">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredHowTos.slice(0, 3).map((howTo) => (
              <HowToCard key={howTo.slug} howTo={howTo} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Blog Posts */}
      {featuredBlogPosts.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">From the Blog</h2>
            <Button variant="ghost" asChild>
              <Link href="/blog">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBlogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
