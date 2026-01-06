import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems } from "@/components/related-items";
import { agents, getAgentBySlug } from "@/data/agents";
import { Agent } from "@/lib/types";
import { ArrowLeft, Bot, User } from "lucide-react";

const BASE_URL = "https://claudedirectory.org";

const categoryLabels: Record<Agent["category"], string> = {
  development: "Development",
  "data-ai": "Data & AI",
  infrastructure: "Infrastructure",
  "quality-testing": "Quality & Testing",
  security: "Security",
  business: "Business",
  specialization: "Specialization",
};

const categoryColors: Record<Agent["category"], string> = {
  development: "bg-blue-500/10 text-blue-500",
  "data-ai": "bg-purple-500/10 text-purple-500",
  infrastructure: "bg-green-500/10 text-green-500",
  "quality-testing": "bg-orange-500/10 text-orange-500",
  security: "bg-red-500/10 text-red-500",
  business: "bg-yellow-500/10 text-yellow-500",
  specialization: "bg-cyan-500/10 text-cyan-500",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return agents.map((agent) => ({
    slug: agent.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const agent = getAgentBySlug(params.slug);
  if (!agent) return { title: "Agent Not Found" };

  const url = `${BASE_URL}/agents/${agent.slug}`;

  return {
    title: `${agent.title} Agent - Claude Code`,
    description: agent.description,
    keywords: [...agent.tags, "claude code", "agent", "subagent", agent.category],
    openGraph: {
      title: `${agent.title} Agent - Claude Code`,
      description: agent.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${agent.title} Agent - Claude Code`,
      description: agent.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function AgentDetailPage(props: Props) {
  const params = await props.params;
  const agent = getAgentBySlug(params.slug);

  if (!agent) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/agents/${agent.slug}`;

  return (
    <div className="container py-8 max-w-4xl">
      <ItemJsonLd
        type="SoftwareApplication"
        name={agent.title}
        description={agent.description}
        url={pageUrl}
        author={agent.author}
        tags={agent.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Agents", url: `${BASE_URL}/agents` },
          { name: agent.title, url: pageUrl },
        ]}
      />
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/agents">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agents
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <Bot className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{agent.title}</h1>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={categoryColors[agent.category]} variant="secondary">
            {categoryLabels[agent.category]}
          </Badge>
          {agent.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {agent.author.url ? (
              <a
                href={agent.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {agent.author.name}
              </a>
            ) : (
              agent.author.name
            )}
          </span>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Agent Details</h2>
            <CopyButton text={agent.content} />
          </div>
          <CodeBlock code={agent.content} language="markdown" />
        </div>

        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How to use</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Copy the agent content above</li>
            <li>Configure as a custom subagent in your Claude Code settings</li>
            <li>Or use via the Task tool with a custom subagent_type</li>
            <li>Reference the agent when delegating specialized tasks</li>
          </ol>
        </div>

        {agent.relatedItems && agent.relatedItems.length > 0 && (
          <>
            <Separator />
            <RelatedItems items={agent.relatedItems} />
          </>
        )}
      </div>
    </div>
  );
}
