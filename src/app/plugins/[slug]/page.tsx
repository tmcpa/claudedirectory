import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems } from "@/components/related-items";
import { plugins, getPluginBySlug } from "@/data/plugins";
import { ArrowLeft, Puzzle, User, Terminal, ExternalLink } from "lucide-react";

const BASE_URL = "https://claudedirectory.org";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return plugins.map((plugin) => ({
    slug: plugin.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const plugin = getPluginBySlug(params.slug);
  if (!plugin) return { title: "Plugin Not Found" };

  const url = `${BASE_URL}/plugins/${plugin.slug}`;

  return {
    title: `${plugin.title} Plugin - Claude Code`,
    description: plugin.description,
    keywords: [...plugin.tags, "claude code", "plugin", "extension"],
    openGraph: {
      title: `${plugin.title} Plugin - Claude Code`,
      description: plugin.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${plugin.title} Plugin - Claude Code`,
      description: plugin.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PluginDetailPage(props: Props) {
  const params = await props.params;
  const plugin = getPluginBySlug(params.slug);

  if (!plugin) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/plugins/${plugin.slug}`;

  return (
    <div className="container py-8 max-w-4xl">
      <ItemJsonLd
        type="SoftwareApplication"
        name={plugin.title}
        description={plugin.description}
        url={pageUrl}
        author={plugin.author}
        tags={plugin.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Plugins", url: `${BASE_URL}/plugins` },
          { name: plugin.title, url: pageUrl },
        ]}
      />
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/plugins">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plugins
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <Puzzle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{plugin.title}</h1>
            <p className="text-muted-foreground">{plugin.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {plugin.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {plugin.author.url ? (
              <a
                href={plugin.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {plugin.author.name}
              </a>
            ) : (
              plugin.author.name
            )}
          </span>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Installation</h2>
            <CopyButton text={plugin.installCommand} />
          </div>
          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <code>{plugin.installCommand}</code>
          </div>
        </div>

        {plugin.config && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Configuration</h2>
              <CopyButton text={plugin.config} />
            </div>
            <CodeBlock code={plugin.config} language="json" />
          </div>
        )}

        {plugin.commands && plugin.commands.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Commands</h2>
            <div className="space-y-2">
              {plugin.commands.map((command) => (
                <div
                  key={command.name}
                  className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                >
                  <code className="font-mono text-sm font-semibold text-primary">
                    {command.name}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {command.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How to install</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Open Claude Code in your terminal</li>
            <li>Run the installation command above</li>
            <li>The plugin will be enabled automatically</li>
            <li>Use the plugin&apos;s features in your Claude Code sessions</li>
          </ol>
        </div>

        {plugin.repoUrl && (
          <div>
            <a
              href={plugin.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View source on GitHub
            </a>
          </div>
        )}

        {plugin.relatedItems && plugin.relatedItems.length > 0 && (
          <>
            <Separator />
            <RelatedItems items={plugin.relatedItems} />
          </>
        )}
      </div>
    </div>
  );
}
