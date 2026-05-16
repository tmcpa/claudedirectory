import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/cards/skill-card";
import { AgentCard } from "@/components/cards/agent-card";
import { PluginCard } from "@/components/cards/plugin-card";
import { MCPCard } from "@/components/cards/mcp-card";
import { PromptCard } from "@/components/cards/prompt-card";
import { HookCard } from "@/components/cards/hook-card";
import { HowToCard } from "@/components/cards/how-to-card";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import {
  getUseCaseBySlug,
  getAllUseCaseSlugs,
  useCases,
} from "@/data/use-cases";
import { getMatchesForUseCase } from "@/lib/use-cases";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { buildUseCaseTitle, getCurrentMonthYear } from "@/lib/seo";

interface Props {
  params: Promise<{ useCase: string }>;
}

export function generateStaticParams() {
  return getAllUseCaseSlugs().map((useCase) => ({ useCase }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { useCase: slug } = await props.params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) return { title: "Use Case Not Found" };

  const url = `${BASE_URL}/for/${useCase.slug}`;
  const title = buildUseCaseTitle(useCase.title);
  const description = `${useCase.description} Updated ${getCurrentMonthYear()}.`;

  return {
    title,
    description,
    keywords: useCase.keywords,
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: url },
  };
}

export default async function UseCasePage(props: Props) {
  const { useCase: slug } = await props.params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) notFound();

  const matches = getMatchesForUseCase(useCase);
  if (matches.total === 0) notFound();

  const otherUseCases = useCases.filter((u) => u.slug !== useCase.slug);
  const url = `${BASE_URL}/for/${useCase.slug}`;

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Use Cases", url: `${BASE_URL}/for` },
          { name: useCase.title, url },
        ]}
      />
      <CollectionPageJsonLd
        name={useCase.headline}
        description={useCase.description}
        url={url}
        itemCount={matches.total}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/for">
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Use Cases
        </Link>
      </Button>

      <div className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">{useCase.headline}</h1>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {useCase.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {matches.total} {matches.total === 1 ? "item" : "items"} across skills,
          agents, plugins, MCP servers, prompts, hooks, and guides.
        </p>
      </div>

      {useCase.examples.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Example prompts</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Concrete things you can type into Claude Code for {useCase.title.toLowerCase()}.
            Each example uses a real skill, agent, slash command, hook, or MCP
            server listed below.
          </p>
          <ol className="space-y-4">
            {useCase.examples.map((example, i) => (
              <li
                key={i}
                className="rounded-lg border bg-card p-4"
              >
                <div className="text-sm font-medium mb-2">
                  {example.title}
                </div>
                <pre className="text-sm bg-muted/60 rounded px-3 py-2 overflow-x-auto whitespace-pre-wrap break-words font-mono">
                  {example.prompt}
                </pre>
              </li>
            ))}
          </ol>
        </section>
      )}

      {matches.skills.length > 0 && (
        <UseCaseSection
          title="Skills"
          count={matches.skills.length}
          viewAllHref={`/skills/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all skills"
        >
          {matches.skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </UseCaseSection>
      )}

      {matches.agents.length > 0 && (
        <UseCaseSection
          title="Agents"
          count={matches.agents.length}
          viewAllHref={`/agents/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all agents"
        >
          {matches.agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </UseCaseSection>
      )}

      {matches.plugins.length > 0 && (
        <UseCaseSection
          title="Plugins"
          count={matches.plugins.length}
          viewAllHref={`/plugins/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all plugins"
        >
          {matches.plugins.map((plugin) => (
            <PluginCard key={plugin.slug} plugin={plugin} />
          ))}
        </UseCaseSection>
      )}

      {matches.mcpServers.length > 0 && (
        <UseCaseSection
          title="MCP Servers"
          count={matches.mcpServers.length}
          viewAllHref={`/mcp-servers/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all MCP servers"
        >
          {matches.mcpServers.map((server) => (
            <MCPCard key={server.slug} server={server} />
          ))}
        </UseCaseSection>
      )}

      {matches.prompts.length > 0 && (
        <UseCaseSection
          title="Prompts"
          count={matches.prompts.length}
          viewAllHref={`/prompts/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all prompts"
        >
          {matches.prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </UseCaseSection>
      )}

      {matches.hooks.length > 0 && (
        <UseCaseSection
          title="Hooks"
          count={matches.hooks.length}
          viewAllHref={`/hooks/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all hooks"
        >
          {matches.hooks.map((hook) => (
            <HookCard key={hook.slug} hook={hook} />
          ))}
        </UseCaseSection>
      )}

      {matches.howTos.length > 0 && (
        <UseCaseSection
          title="How-To Guides"
          count={matches.howTos.length}
          viewAllHref={`/how-to/topic/${useCase.primaryTopic}`}
          viewAllLabel="Browse all how-tos"
        >
          {matches.howTos.map((howTo) => (
            <HowToCard key={howTo.slug} howTo={howTo} />
          ))}
        </UseCaseSection>
      )}

      <div className="border-t pt-6 mt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Other use cases
        </h2>
        <div className="flex flex-wrap gap-2">
          {otherUseCases.map((u) => (
            <Link key={u.slug} href={`/for/${u.slug}`}>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-accent"
              >
                {u.title}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function UseCaseSection({
  title,
  count,
  viewAllHref,
  viewAllLabel,
  children,
}: {
  title: string;
  count: number;
  viewAllHref: string;
  viewAllLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {title}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({count})
          </span>
        </h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href={viewAllHref}>
            {viewAllLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}
