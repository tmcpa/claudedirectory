import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptCard } from "@/components/cards/prompt-card";
import { MCPCard } from "@/components/cards/mcp-card";
import { HookCard } from "@/components/cards/hook-card";
import { SkillCard } from "@/components/cards/skill-card";
import { PluginCard } from "@/components/cards/plugin-card";
import { HowToCard } from "@/components/cards/how-to-card";
import { AgentCard } from "@/components/cards/agent-card";
import { BlogCard } from "@/components/cards/blog-card";
import { UniversalSearch } from "@/components/universal-search";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { getFeaturedPrompts, prompts } from "@/data/prompts";
import { getFeaturedMCPServers, mcpServers } from "@/data/mcp-servers";
import { getFeaturedHooks, hooks } from "@/data/hooks";
import { getFeaturedSkills, skills } from "@/data/skills";
import { getFeaturedPlugins, plugins } from "@/data/plugins";
import { getFeaturedHowTos } from "@/data/how-to";
import { getFeaturedAgents, agents } from "@/data/agents";
import { getFeaturedBlogPosts } from "@/data/blog";
import { getRecentlyAdded } from "@/data/recently-added";
import { RecentItemCard } from "@/components/cards/recent-item-card";
import { useCases } from "@/data/use-cases";
import { getUseCaseCounts } from "@/lib/use-cases";
import { Terminal, ArrowRight, Clock, Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Claude Directory – Community Alternative to claude.ai/directory",
  },
  description:
    "The community-curated Claude AI directory. Browse 300+ prompts, MCP servers, hooks, skills, plugins, and agents for Claude Code. Copy-paste setup in seconds.",
  openGraph: {
    title: "Claude Directory – Community Alternative to claude.ai/directory",
    description:
      "The community-curated Claude AI directory. Browse 300+ prompts, MCP servers, hooks, skills, plugins, and agents for Claude Code. Copy-paste setup in seconds.",
  },
  twitter: {
    title: "Claude Directory – Community Alternative to claude.ai/directory",
    description:
      "The community-curated Claude AI directory. Browse 300+ prompts, MCP servers, hooks, skills, plugins, and agents for Claude Code. Copy-paste setup in seconds.",
  },
};

const exampleSearches = [
  { label: "code review", href: "/agents" },
  { label: "PR automation", href: "/skills" },
  { label: "test runner", href: "/hooks" },
  { label: "CLAUDE.md template", href: "/prompts" },
  { label: "GitHub MCP", href: "/mcp-servers" },
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
  const recentlyAdded = getRecentlyAdded(6);
  const useCaseCounts = getUseCaseCounts();

  const totalConfigs =
    prompts.length +
    mcpServers.length +
    hooks.length +
    skills.length +
    plugins.length +
    agents.length;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <Terminal className="h-4 w-4" />
            <span>{totalConfigs}+ community-curated configurations</span>
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
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-muted-foreground">
              <span className="text-muted-foreground/70">Try:</span>
              {exampleSearches.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="rounded-full border bg-background/60 px-2.5 py-1 hover:bg-accent hover:text-foreground transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button asChild size="lg">
              <Link href="/skills">
                Browse Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/how-to">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started Guide
              </Link>
            </Button>
          </div>

          {/* Compact inline newsletter — one row, no card */}
          <div className="mt-10 w-full max-w-2xl">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                One short Claude Code email a week.{" "}
                <span className="text-foreground">Join 1,000+ subscribers.</span>
              </p>
              <NewsletterSignup
                source="home_hero_inline"
                className="w-full sm:w-auto sm:min-w-[340px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Use Case */}
      <section className="container py-12 border-t">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Browse by Use Case</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/for">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Skills, agents, plugins, MCP servers, prompts, hooks, and guides — grouped by what you&apos;re trying to do.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {useCases.map((useCase) => (
            <Link key={useCase.slug} href={`/for/${useCase.slug}`}>
              <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{useCase.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {useCaseCounts[useCase.slug] ?? 0} items
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      {recentlyAdded.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Recently Added</h2>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/whats-new">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyAdded.map((recent) => (
              <RecentItemCard
                key={`${recent.type}-${recent.item.slug}`}
                item={recent.item}
                type={recent.type}
                dateAdded={recent.dateAdded}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured — unified tabbed section */}
      <section className="container py-12 border-t">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured</h2>
        </div>
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="plugins">Plugins</TabsTrigger>
            <TabsTrigger value="mcp">MCP Servers</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="hooks">Hooks</TabsTrigger>
            <TabsTrigger value="how-to">How-To</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <FeaturedGrid viewAllHref="/skills">
              {featuredSkills.slice(0, 3).map((skill) => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="agents">
            <FeaturedGrid viewAllHref="/agents">
              {featuredAgents.slice(0, 3).map((agent) => (
                <AgentCard key={agent.slug} agent={agent} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="plugins">
            <FeaturedGrid viewAllHref="/plugins">
              {featuredPlugins.slice(0, 3).map((plugin) => (
                <PluginCard key={plugin.slug} plugin={plugin} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="mcp">
            <FeaturedGrid viewAllHref="/mcp-servers">
              {featuredMCPServers.slice(0, 3).map((server) => (
                <MCPCard key={server.slug} server={server} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="prompts">
            <FeaturedGrid viewAllHref="/prompts">
              {featuredPrompts.slice(0, 3).map((prompt) => (
                <PromptCard key={prompt.slug} prompt={prompt} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="hooks">
            <FeaturedGrid viewAllHref="/hooks">
              {featuredHooks.slice(0, 3).map((hook) => (
                <HookCard key={hook.slug} hook={hook} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="how-to">
            <FeaturedGrid viewAllHref="/how-to">
              {featuredHowTos.slice(0, 3).map((howTo) => (
                <HowToCard key={howTo.slug} howTo={howTo} />
              ))}
            </FeaturedGrid>
          </TabsContent>
          <TabsContent value="blog">
            <FeaturedGrid viewAllHref="/blog">
              {featuredBlogPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </FeaturedGrid>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function FeaturedGrid({
  children,
  viewAllHref,
}: {
  children: React.ReactNode;
  viewAllHref: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="ghost" asChild>
          <Link href={viewAllHref}>
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
